import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

const DATA_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../public/data/jamaica-locations.json",
);

// Inline the table definition so the seed script runs independently of
// TypeScript source files (which Node cannot import directly).
const experiences = pgTable("experience", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type"),
  country: text("country"),
  area: text("area"),
  photos: text("photos").array(),
  lat: text("lat"),
  lon: text("lon"),
  createdAt: timestamp("created_at").defaultNow(),
});

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Export it before running this script.");
  }

  const raw = await readFile(DATA_PATH, "utf8");
  const { locations } = JSON.parse(raw);
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  console.log(`Seeding ${locations.length} experiences into Neon DB…`);

  const BATCH_SIZE = 25;
  for (let i = 0; i < locations.length; i += BATCH_SIZE) {
    const batch = locations.slice(i, i + BATCH_SIZE);
    const values = batch.map((loc) => {
      const category = loc.category.toLowerCase();
      const photoUrl = `https://loremflickr.com/800/600/jamaica,${category}?lock=${loc.id.replace(/\D/g, "").substring(0, 5)}`;
      return {
        id: loc.id,
        title: loc.name,
        description:
          loc.description ||
          `A wonderful ${category} experience in ${loc.parish || "Jamaica"}.`,
        type: loc.category,
        country: "Jamaica",
        area: loc.parish || "Jamaica",
        photos: [photoUrl],
        lat: String(loc.lat),
        lon: String(loc.lng),
      };
    });

    await db
      .insert(experiences)
      .values(values)
      .onConflictDoUpdate({
        target: experiences.id,
        set: {
          title: values[0].title, // placeholder — Drizzle requires a set object
          type: values[0].type,
        },
      });

    console.log(`  ✓ ${Math.min(i + BATCH_SIZE, locations.length)}/${locations.length}`);
  }

  console.log("Seed complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
