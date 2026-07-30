"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Grid2X2,
  Heart,
  ListFilter,
  Map as MapIcon,
  MapPin,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { DemoShell } from "../components/DemoShell";
import { DemoToast } from "../components/DemoToast";
import { DiscoveryMap, type LocationPlace } from "../components/DiscoveryMap";
import { demoExperiences } from "../demo-data";
import { useDemoStore, usePlaces } from "../hooks/useDemoStore";

const categories = [
  "All",
  "Beaches",
  "Nature",
  "Culture",
  "Food",
  "Nightlife",
  "Stay",
  "Adventure",
] as const;

const categoryImages: Record<LocationPlace["category"], string> = {
  Adventure: "/images/catamaran.jpg",
  Beaches: "/images/st-lucia.jpg",
  Culture: "/images/hero.jpg",
  Food: "/images/villa.jpg",
  Nature: "/images/waterfall.jpg",
  Nightlife: "/images/catamaran.jpg",
  Stay: "/images/resort.jpg",
};

export default function DiscoverPage() {
  const { places, loading } = usePlaces();
  const { savedPlaceIds, savedExperienceIds, togglePlace, toggleExperience } =
    useDemoStore();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [category, setCategory] =
    useState<(typeof categories)[number]>("All");
  const [view, setView] = useState<"grid" | "map">("grid");
  const [selected, setSelected] = useState<LocationPlace | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const search = deferredQuery.trim().toLowerCase();
    return places.filter((place) => {
      const matchesCategory =
        category === "All" || place.category === category;
      const matchesSearch =
        !search ||
        `${place.name} ${place.kind} ${place.parish ?? ""} ${place.category}`
          .toLowerCase()
          .includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [category, deferredQuery, places]);

  const savePlace = (place: LocationPlace) => {
    const wasSaved = savedPlaceIds.includes(place.id);
    togglePlace(place);
    setToast(wasSaved ? "Removed from saved places" : `${place.name} saved`);
  };

  return (
    <DemoShell
      eyebrow="Explore Jamaica"
      title="Find the place that changes the plan."
      intro="Search 160 community-mapped places, switch to the island map, and save anything that feels like your kind of day."
      actions={
        <div className="demo-view-switch">
          <button
            type="button"
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            <Grid2X2 size={16} /> Grid
          </button>
          <button
            type="button"
            className={view === "map" ? "active" : ""}
            onClick={() => setView("map")}
          >
            <MapIcon size={16} /> Map
          </button>
        </div>
      }
    >
      <section className="discover-toolbar">
        <label className="demo-search-box">
          <Search size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search beach, parish, food, culture..."
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
              <X size={17} />
            </button>
          ) : null}
        </label>
        <div className="demo-filter-row">
          <ListFilter size={17} />
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <div className="demo-result-line">
        <span>
          {loading ? "Loading the island…" : `${filtered.length} places`}
        </span>
        <small>OpenStreetMap contributors · updated July 2026</small>
      </div>

      {view === "map" ? (
        <section className="discover-map-panel">
          <DiscoveryMap
            places={filtered}
            selectedPlace={selected}
            onSelect={setSelected}
          />
        </section>
      ) : (
        <section className="place-grid">
          {filtered.slice(0, 80).map((place) => (
            <article className="place-card" key={place.id}>
              <button
                type="button"
                className="place-card-image"
                onClick={() => setSelected(place)}
                aria-label={`View ${place.name}`}
              >
                <Image
                  src={categoryImages[place.category]}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                />
                <span>{place.category}</span>
              </button>
              <div>
                <small>
                  <MapPin size={13} /> {place.parish ?? "Jamaica"}
                </small>
                <button type="button" onClick={() => setSelected(place)}>
                  <strong>{place.name}</strong>
                  <span>{place.kind}</span>
                </button>
              </div>
              <button
                type="button"
                className={`demo-save ${savedPlaceIds.includes(place.id) ? "saved" : ""}`}
                onClick={() => savePlace(place)}
                aria-label={`Save ${place.name}`}
              >
                <Heart
                  size={18}
                  fill={savedPlaceIds.includes(place.id) ? "currentColor" : "none"}
                />
              </button>
            </article>
          ))}
        </section>
      )}

      <section className="demo-section">
        <div className="demo-section-heading">
          <div>
            <p className="demo-eyebrow">Bookable demo</p>
            <h2>Experiences with a little more story.</h2>
          </div>
          <span>Simulated checkout · no charge</span>
        </div>
        <div className="demo-experience-grid">
          {demoExperiences.map((experience) => (
            <article key={experience.id}>
              <Link href={`/booking?experience=${experience.id}`}>
                <div className="demo-experience-image">
                  <Image
                    src={experience.image}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                  <span>{experience.tag}</span>
                </div>
                <small>{experience.location}</small>
                <h3>{experience.title}</h3>
                <p>
                  {experience.duration} · From ${experience.price}
                </p>
              </Link>
              <button
                type="button"
                className={`demo-save ${savedExperienceIds.includes(experience.id) ? "saved" : ""}`}
                onClick={() => {
                  toggleExperience(experience.id);
                  setToast(
                    savedExperienceIds.includes(experience.id)
                      ? "Experience removed"
                      : "Experience saved",
                  );
                }}
                aria-label={`Save ${experience.title}`}
              >
                <Heart
                  size={18}
                  fill={
                    savedExperienceIds.includes(experience.id)
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </article>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected ? (
          <motion.div
            className="demo-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.aside
              className="demo-place-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" onClick={() => setSelected(null)} aria-label="Close">
                <X size={20} />
              </button>
              <div className="demo-place-drawer-image">
                <Image
                  src={categoryImages[selected.category]}
                  alt=""
                  fill
                  sizes="420px"
                />
              </div>
              <p className="demo-eyebrow">{selected.category}</p>
              <h2>{selected.name}</h2>
              <p>
                {selected.kind} · {selected.parish ?? "Jamaica"}
              </p>
              {selected.address ? <p>{selected.address}</p> : null}
              {selected.openingHours ? (
                <div className="demo-fact">
                  <span>Hours</span>
                  <strong>{selected.openingHours}</strong>
                </div>
              ) : null}
              <div className="demo-drawer-actions">
                <button type="button" className="demo-primary" onClick={() => savePlace(selected)}>
                  <Heart size={17} />
                  {savedPlaceIds.includes(selected.id) ? "Saved" : "Save place"}
                </button>
                <a
                  className="demo-secondary"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Directions <ExternalLink size={16} />
                </a>
              </div>
              <a href={selected.osmUrl} target="_blank" rel="noreferrer" className="demo-source-link">
                View source data <ArrowRight size={15} />
              </a>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <DemoToast message={toast} onDone={() => setToast(null)} />
    </DemoShell>
  );
}
