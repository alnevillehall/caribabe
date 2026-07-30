"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  ExternalLink,
  Heart,
  ListFilter,
  Map as MapIcon,
  MapPin,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import { useDeferredValue, useMemo, useState } from "react";
import { DemoShell } from "../components/DemoShell";
import { DemoToast } from "../components/DemoToast";
import { DiscoveryMap, type LocationPlace } from "../components/DiscoveryMap";
import {
  demoExperiences,
  hotAreas,
  type HotArea,
} from "../demo-data";
import { useDemoStore, usePlaces } from "../hooks/useDemoStore";

const countries = [
  "All",
  "Jamaica",
  "Saint Lucia",
  "Barbados",
  "Curaçao",
  "Dominica",
] as const;

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
  const {
    savedPlaceIds,
    savedExperienceIds,
    togglePlace,
    toggleExperience,
  } = useDemoStore();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [country, setCountry] =
    useState<(typeof countries)[number]>("All");
  const [category, setCategory] =
    useState<(typeof categories)[number]>("All");
  const [view, setView] = useState<"areas" | "jamaica-map">("areas");
  const [selectedPlace, setSelectedPlace] = useState<LocationPlace | null>(null);
  const [selectedArea, setSelectedArea] = useState<HotArea | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const search = deferredQuery.trim().toLowerCase();
  const showJamaicaPlaces = country === "All" || country === "Jamaica";
  const filteredAreas = useMemo(
    () =>
      hotAreas.filter((area) => {
        const matchesCountry = country === "All" || area.country === country;
        const matchesSearch =
          !search ||
          `${area.name} ${area.country} ${area.vibe} ${area.highlights.join(" ")} ${area.foodMoment}`
            .toLowerCase()
            .includes(search);
        return matchesCountry && matchesSearch;
      }),
    [country, search],
  );
  const filteredPlaces = useMemo(
    () =>
      places.filter((place) => {
        const matchesCategory =
          category === "All" || place.category === category;
        const matchesSearch =
          !search ||
          `${place.name} ${place.kind} ${place.parish ?? ""} ${place.category}`
            .toLowerCase()
            .includes(search);
        return matchesCategory && matchesSearch;
      }),
    [category, places, search],
  );
  const filteredExperiences = useMemo(
    () =>
      demoExperiences.filter((experience) => {
        const matchesCountry = country === "All" || experience.island === country;
        const matchesSearch =
          !search ||
          `${experience.title} ${experience.location} ${experience.category} ${experience.tag}`
            .toLowerCase()
            .includes(search);
        return matchesCountry && matchesSearch;
      }),
    [country, search],
  );

  const savePlace = (place: LocationPlace) => {
    const wasSaved = savedPlaceIds.includes(place.id);
    togglePlace(place);
    setToast(wasSaved ? "Removed from saved places" : `${place.name} saved`);
  };

  return (
    <DemoShell
      eyebrow="Trip discovery"
      title="Build the trip around the places you’ll remember."
      intro="Start with a hot area, follow food and local rhythm, then add the moments that make the plan yours."
      actions={
        showJamaicaPlaces ? (
          <div className="demo-view-switch">
            <button
              type="button"
              className={view === "areas" ? "active" : ""}
              onClick={() => setView("areas")}
            >
              <Compass size={16} /> Areas
            </button>
            <button
              type="button"
              className={view === "jamaica-map" ? "active" : ""}
              onClick={() => setView("jamaica-map")}
            >
              <MapIcon size={16} /> Jamaica map
            </button>
          </div>
        ) : null
      }
    >
      <section className="discover-toolbar trip-discovery-toolbar">
        <label className="demo-search-box">
          <Search size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search an island, hot area, food moment…"
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
              <X size={17} />
            </button>
          ) : null}
        </label>
        <div className="country-filter-row" aria-label="Choose an island">
          {countries.map((item) => (
            <button
              type="button"
              key={item}
              className={country === item ? "active" : ""}
              onClick={() => {
                setCountry(item);
                setView("areas");
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {view === "areas" ? (
        <>
          <section className="trip-discovery-heading">
            <div>
              <p className="demo-eyebrow">Researched hot areas</p>
              <h2>{country === "All" ? "Start with the part of the island that fits." : `Find your pace in ${country}.`}</h2>
            </div>
            <span>{filteredAreas.length} places to begin</span>
          </section>
          <section className="hot-area-grid">
            {filteredAreas.map((area) => (
              <article key={area.id}>
                <button
                  type="button"
                  className="hot-area-image"
                  onClick={() => setSelectedArea(area)}
                  aria-label={`Explore ${area.name}`}
                >
                  <Image
                    src={area.image}
                    alt=""
                    fill
                    sizes="(max-width: 680px) 100vw, (max-width: 1050px) 50vw, 33vw"
                  />
                  <span>{area.country}</span>
                </button>
                <div className="hot-area-copy">
                  <p>{area.vibe}</p>
                  <button type="button" onClick={() => setSelectedArea(area)}>
                    <h3>{area.name}</h3>
                    <span>{area.highlights.join(" · ")}</span>
                  </button>
                </div>
              </article>
            ))}
          </section>
        </>
      ) : (
        <section className="discover-map-panel">
          <DiscoveryMap
            places={filteredPlaces}
            selectedPlace={selectedPlace}
            onSelect={setSelectedPlace}
          />
        </section>
      )}

      <section className="trip-food-section">
        <div className="trip-discovery-heading">
          <div>
            <p className="demo-eyebrow">Food, culture, and good timing</p>
            <h2>Experiences to make the trip feel local.</h2>
          </div>
          <span>No booking or prices yet—just ideas worth planning around.</span>
        </div>
        <div className="demo-experience-grid trip-experience-grid">
          {filteredExperiences.map((experience) => {
            const saved = savedExperienceIds.includes(experience.id);
            return (
              <article key={experience.id}>
                <div className="demo-experience-image">
                  <Image
                    src={experience.image}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                  <span>{experience.category}</span>
                </div>
                <div className="trip-experience-copy">
                  <small>{experience.location}</small>
                  <h3>{experience.title}</h3>
                  <p>{experience.description}</p>
                  <span>{experience.duration} · {experience.tag}</span>
                </div>
                <div className="trip-experience-actions">
                  <button
                    type="button"
                    className={`demo-save ${saved ? "saved" : ""}`}
                    onClick={() => {
                      toggleExperience(experience.id);
                      setToast(saved ? "Experience removed" : "Experience saved");
                    }}
                    aria-label={`Save ${experience.title}`}
                  >
                    <Heart size={18} fill={saved ? "currentColor" : "none"} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {showJamaicaPlaces ? (
        <section className="jamaica-places-section">
          <div className="trip-discovery-heading">
            <div>
              <p className="demo-eyebrow">Jamaica, mapped openly</p>
              <h2>Go deeper when an area pulls you in.</h2>
            </div>
            <span>{loading ? "Loading places…" : `${filteredPlaces.length} local places`}</span>
          </div>
          <div className="demo-filter-row" aria-label="Filter Jamaican places">
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
          <section className="place-grid">
            {filteredPlaces.slice(0, 24).map((place) => (
              <article className="place-card" key={place.id}>
                <button
                  type="button"
                  className="place-card-image"
                  onClick={() => setSelectedPlace(place)}
                  aria-label={`View ${place.name}`}
                >
                  <Image src={categoryImages[place.category]} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" />
                  <span>{place.category}</span>
                </button>
                <div>
                  <small><MapPin size={13} /> {place.parish ?? "Jamaica"}</small>
                  <button type="button" onClick={() => setSelectedPlace(place)}>
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
                  <Heart size={18} fill={savedPlaceIds.includes(place.id) ? "currentColor" : "none"} />
                </button>
              </article>
            ))}
          </section>
        </section>
      ) : null}

      <AnimatePresence>
        {selectedArea ? (
          <motion.div
            className="demo-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArea(null)}
          >
            <motion.aside
              className="demo-place-drawer hot-area-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedArea.name} details`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" onClick={() => setSelectedArea(null)} aria-label="Close">
                <X size={20} />
              </button>
              <div className="demo-place-drawer-image">
                <Image src={selectedArea.image} alt="" fill sizes="420px" />
              </div>
              <p className="demo-eyebrow">{selectedArea.country}</p>
              <h2>{selectedArea.name}</h2>
              <p>{selectedArea.vibe}</p>
              <ul className="hot-area-highlights">
                {selectedArea.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
              <div className="hot-area-food-note">
                <strong>Food moment</strong>
                <p>{selectedArea.foodMoment}</p>
              </div>
              <div className="demo-drawer-actions">
                <a className="demo-secondary" href={selectedArea.sourceUrl} target="_blank" rel="noreferrer">
                  Source <ExternalLink size={16} />
                </a>
              </div>
              <small className="trip-source-note">Curated from {selectedArea.sourceName}; confirm hours and access before travel.</small>
            </motion.aside>
          </motion.div>
        ) : null}
        {selectedPlace ? (
          <motion.div
            className="demo-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPlace(null)}
          >
            <motion.aside
              className="demo-place-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedPlace.name} details`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" onClick={() => setSelectedPlace(null)} aria-label="Close">
                <X size={20} />
              </button>
              <div className="demo-place-drawer-image">
                <Image src={categoryImages[selectedPlace.category]} alt="" fill sizes="420px" />
              </div>
              <p className="demo-eyebrow">{selectedPlace.category}</p>
              <h2>{selectedPlace.name}</h2>
              <p>{selectedPlace.kind} · {selectedPlace.parish ?? "Jamaica"}</p>
              {selectedPlace.address ? <p>{selectedPlace.address}</p> : null}
              {selectedPlace.openingHours ? (
                <div className="demo-fact"><span>Hours</span><strong>{selectedPlace.openingHours}</strong></div>
              ) : null}
              <div className="demo-drawer-actions">
                <button type="button" className="demo-primary" onClick={() => savePlace(selectedPlace)}>
                  <Heart size={17} />{savedPlaceIds.includes(selectedPlace.id) ? "Saved" : "Save place"}
                </button>
                <a className="demo-secondary" href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.lat},${selectedPlace.lng}`} target="_blank" rel="noreferrer">
                  Directions <ExternalLink size={16} />
                </a>
              </div>
              <a href={selectedPlace.osmUrl} target="_blank" rel="noreferrer" className="demo-source-link">
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
