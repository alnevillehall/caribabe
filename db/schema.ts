import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  image: text("image"),
});

export const experiences = pgTable("experience", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type"), // food spot, adventure, nature, etc.
  country: text("country"),
  area: text("area"),
  photos: text("photos").array(), // URLs from Vercel Blob
  lat: text("lat"),
  lon: text("lon"),
  createdAt: timestamp("createdAt").defaultNow(),
});
