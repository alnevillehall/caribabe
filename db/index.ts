import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let cachedDb: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (cachedDb) return cachedDb;

  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Please add it to your environment variables.",
    );
  }

  const sql = neon(process.env.DATABASE_URL);
  cachedDb = drizzle(sql, { schema });
  return cachedDb;
}
