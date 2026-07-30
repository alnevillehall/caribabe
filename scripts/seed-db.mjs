import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getDb } from "../db/index.js";
import { experiences } from "../db/schema.js";

const DATA_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../public/data/jamaica-locations.json",
);

async function main() {
  const data = await readFile(DATA_PATH, "utf8");
  const payload = JSON.parse(data);
  const locations = payload.locations;

  const db = getDb();
  console.log(`Seeding ${locations.length} experiences into Neon DB...`);

  for (const loc of locations) {
    const category = loc.category.toLowerCase();
    const photoUrl = `https://loremflickr.com/800/600/jamaica,${category}?lock=${loc.id.replace(/\D/g, '').substring(0, 5)}`;
    
    await db.insert(experiences).values({
      id: loc.id,
      title: loc.name,
      description: loc.description || `A wonderful ${category} experience in ${loc.parish || 'Jamaica'}.`,
      type: loc.category,
      country: "Jamaica",
      area: loc.parish || "Jamaica",
      photos: [photoUrl],
      lat: String(loc.lat),
      lon: String(loc.lng),
    }).onConflictDoUpdate({
      target: experiences.id,
      set: {
        title: loc.name,
        type: loc.category,
        photos: [photoUrl],
      }
    });
  }

  console.log("Seed complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
