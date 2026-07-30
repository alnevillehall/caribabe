import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OVERPASS_ENDPOINT = "https://overpass-api.de/api/interpreter";
const OUTPUT_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../public/data/jamaica-locations.json",
);

const query = `
[out:json][timeout:90];
area["ISO3166-1"="JM"]["boundary"="administrative"]->.jamaica;
(
  nwr["name"]["natural"~"beach|waterfall|peak|cave_entrance|spring"](area.jamaica);
  nwr["name"]["tourism"~"attraction|museum|gallery|viewpoint|hotel|guest_house|hostel|resort|camp_site"](area.jamaica);
  nwr["name"]["amenity"~"restaurant|cafe|ice_cream|marketplace|bar|nightclub|arts_centre|theatre"](area.jamaica);
  nwr["name"]["leisure"~"nature_reserve|park|marina|water_park"](area.jamaica);
  nwr["name"]["historic"](area.jamaica);
);
out center tags;
`;

const limits = {
  Beaches: 24,
  Nature: 24,
  Culture: 26,
  Food: 34,
  Nightlife: 14,
  Stay: 20,
  Adventure: 18,
};

const blockedNames = [
  /^kfc$/i,
  /^chill spot/i,
  /computer electronics/i,
  /^ys falls office$/i,
  /^y\.?s\.? falls visitor centre$/i,
  /^logan shed$/i,
  /^builder'?s depot$/i,
  /^dormac'?s$/i,
  /^coral reef$/i,
  /^national galery of jamaica$/i,
  /cementery$/i,
];

function tagValues(value) {
  return String(value ?? "")
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

function categoryFor(tags) {
  const amenity = tagValues(tags.amenity);
  const tourism = tagValues(tags.tourism);
  const natural = tagValues(tags.natural);
  const leisure = tagValues(tags.leisure);

  if (natural.includes("beach")) return "Beaches";
  if (
    natural.some((value) =>
      ["waterfall", "peak", "cave_entrance", "spring"].includes(value),
    ) ||
    leisure.some((value) => ["nature_reserve", "park"].includes(value))
  ) {
    return "Nature";
  }
  if (
    tourism.some((value) => ["museum", "gallery"].includes(value)) ||
    amenity.some((value) =>
      ["arts_centre", "theatre", "marketplace"].includes(value),
    ) ||
    tags.historic
  ) {
    return "Culture";
  }
  if (
    amenity.some((value) =>
      ["restaurant", "cafe", "ice_cream", "fast_food"].includes(value),
    )
  ) {
    return "Food";
  }
  if (amenity.some((value) => ["bar", "nightclub"].includes(value))) {
    return "Nightlife";
  }
  if (
    tourism.some((value) =>
      ["hotel", "guest_house", "hostel", "resort", "camp_site"].includes(
        value,
      ),
    )
  ) {
    return "Stay";
  }
  return "Adventure";
}

function kindFor(tags) {
  const value =
    tags.natural ??
    tags.tourism ??
    tags.amenity ??
    tags.leisure ??
    tags.historic ??
    "place";
  return value.replaceAll("_", " ");
}

function titleCase(value) {
  return value.replace(/\b\w/g, (character) => character.toUpperCase());
}

function score(tags, category) {
  let total = 1;
  if (tags.wikidata) total += 6;
  if (tags.wikipedia) total += 6;
  if (tags.website || tags["contact:website"]) total += 4;
  if (tags.phone || tags["contact:phone"]) total += 2;
  if (tags.opening_hours) total += 2;
  if (tags["addr:city"] || tags["addr:street"]) total += 2;
  if (tags.description) total += 2;
  if (tags.cuisine) total += 2;
  if (tags.operator) total += 1;
  if (category === "Beaches" || category === "Nature") total += 3;
  return total;
}

function coordinateFor(element) {
  if (typeof element.lat === "number" && typeof element.lon === "number") {
    return { lat: element.lat, lng: element.lon };
  }
  if (
    typeof element.center?.lat === "number" &&
    typeof element.center?.lon === "number"
  ) {
    return { lat: element.center.lat, lng: element.center.lon };
  }
  return null;
}

function addressFor(tags) {
  return [
    [tags["addr:housenumber"], tags["addr:street"]].filter(Boolean).join(" "),
    tags["addr:city"],
  ]
    .filter(Boolean)
    .join(", ");
}

function normalize(element) {
  const tags = element.tags ?? {};
  const coordinate = coordinateFor(element);
  if (!tags.name || !coordinate) return null;
  const cleanName =
    tags.name.length > 70 && tags.name.includes(",")
      ? tags.name.split(",")[0].trim()
      : tags.name.trim();
  if (blockedNames.some((pattern) => pattern.test(cleanName))) {
    return null;
  }

  const category = categoryFor(tags);
  if (
    category === "Adventure" &&
    tags.amenity &&
    !["attraction", "viewpoint"].includes(tags.tourism)
  ) {
    return null;
  }
  const website = tags.website ?? tags["contact:website"] ?? null;
  const phone = tags.phone ?? tags["contact:phone"] ?? null;
  const parish =
    tags["addr:parish"] ??
    tags["is_in:parish"] ??
    tags["addr:city"] ??
    tags["is_in:city"] ??
    null;

  return {
    id: `osm-${element.type}-${element.id}`,
    name: cleanName,
    category,
    kind: titleCase(kindFor(tags)),
    lat: Number(coordinate.lat.toFixed(6)),
    lng: Number(coordinate.lng.toFixed(6)),
    parish,
    address: addressFor(tags) || null,
    website,
    phone,
    openingHours: tags.opening_hours ?? null,
    cuisine: tags.cuisine
      ? titleCase(tags.cuisine.replaceAll(";", ", ").replaceAll("_", " "))
      : null,
    description: tags.description ?? null,
    wheelchair: tags.wheelchair ?? null,
    fee: tags.fee ?? null,
    osmUrl: `https://www.openstreetmap.org/${element.type}/${element.id}`,
    _score: score(tags, category),
  };
}

function curate(elements) {
  const unique = new Map();

  for (const element of elements) {
    const place = normalize(element);
    if (!place) continue;

    const key = `${place.name.toLocaleLowerCase("en")}:${place.lat.toFixed(
      3,
    )}:${place.lng.toFixed(3)}`;
    const existing = unique.get(key);
    if (!existing || place._score > existing._score) unique.set(key, place);
  }

  const grouped = new Map(
    Object.keys(limits).map((category) => [category, []]),
  );

  for (const place of unique.values()) {
    grouped.get(place.category)?.push(place);
  }

  return [...grouped.entries()]
    .flatMap(([category, places]) =>
      places
        .sort(
          (a, b) =>
            b._score - a._score ||
            a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
        )
        .slice(0, limits[category]),
    )
    .map((place) => {
      const cleanPlace = { ...place };
      delete cleanPlace._score;
      return cleanPlace;
    })
    .sort(
      (a, b) =>
        a.category.localeCompare(b.category) ||
        a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
    );
}

async function main() {
  const response = await fetch(OVERPASS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "User-Agent":
        "GoBjounLocationImporter/1.0 (+https://bjoun.com; contact: hello@bjoun.com)",
    },
    body: new URLSearchParams({ data: query }),
    signal: AbortSignal.timeout(100_000),
  });

  if (!response.ok) {
    throw new Error(
      `Overpass request failed: ${response.status} ${response.statusText}`,
    );
  }

  const payload = await response.json();
  const locations = curate(payload.elements ?? []);
  const retrievedAt = new Date().toISOString();
  const output = {
    metadata: {
      country: "Jamaica",
      source: "OpenStreetMap contributors",
      sourceUrl: "https://www.openstreetmap.org/copyright",
      license: "Open Database License (ODbL) 1.0",
      retrievedAt,
      count: locations.length,
      note: "Place details can change. Verify opening hours, fees, and contact information before travelling.",
    },
    locations,
  };

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(
    `Saved ${locations.length} curated Jamaican locations to ${OUTPUT_PATH}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
