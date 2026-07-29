import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html", host: "caribabe.travel" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Caribabe's public discovery experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Caribabe — The Caribbean, considered<\/title>/i);
  assert.match(html, /CARIBABE/);
  assert.match(html, /Community-mapped Jamaica/);
  assert.match(html, /Partner experience previews/);
  assert.match(html, /OpenStreetMap contributors/);
  assert.match(html, /availability go live only after each partner is verified/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("ships a curated, attributed and refreshable Jamaica catalogue", async () => {
  const [page, map, dataText, layout, packageText] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/DiscoveryMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/data/jamaica-locations.json", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  const data = JSON.parse(dataText);
  const categories = new Set(data.locations.map((place) => place.category));

  assert.equal(data.metadata.country, "Jamaica");
  assert.equal(data.metadata.count, 160);
  assert.equal(data.locations.length, 160);
  assert.equal(data.metadata.license, "Open Database License (ODbL) 1.0");
  assert.deepEqual(
    [...categories].sort(),
    ["Adventure", "Beaches", "Culture", "Food", "Nature", "Nightlife", "Stay"],
  );
  assert.match(map, /tiles\.openfreemap\.org\/styles\/liberty/);
  assert.match(page, /jamaica-locations\.json/);
  assert.match(page, /OpenStreetMap contributors/);
  assert.match(page, /caribabe:saved-places/);
  assert.match(layout, /Caribabe — The Caribbean, considered/);
  assert.match(packageText, /"data:refresh"/);
  assert.match(packageText, /"maplibre-gl"/);
});
