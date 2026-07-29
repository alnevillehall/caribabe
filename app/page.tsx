"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  Car,
  Check,
  ChevronRight,
  Clock3,
  CloudSun,
  Compass,
  Heart,
  Hotel,
  LocateFixed,
  MapPin,
  Menu,
  Mountain,
  Music2,
  Navigation,
  Plane,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  SunMedium,
  UserRound,
  Users,
  Utensils,
  WalletCards,
  Waves,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Experience = {
  id: number;
  title: string;
  location: string;
  image: string;
  duration: string;
  rating: string;
  reviews: number;
  price: number;
  tag: string;
  description: string;
};

const categories: { label: string; icon: LucideIcon }[] = [
  { label: "For you", icon: Sparkles },
  { label: "Beaches", icon: Waves },
  { label: "Food", icon: Utensils },
  { label: "Events", icon: Music2 },
  { label: "Stay", icon: Hotel },
  { label: "Adventure", icon: Mountain },
  { label: "Rentals", icon: Car },
];

const destinations = [
  {
    name: "Jamaica",
    note: "Salt air, slow mornings",
    count: "428 experiences",
    image: "/images/curacao.jpg",
    className: "destination-jamaica",
  },
  {
    name: "Saint Lucia",
    note: "Wild by nature",
    count: "186 experiences",
    image: "/images/st-lucia.jpg",
    className: "destination-lucia",
  },
  {
    name: "Barbados",
    note: "Come for the rhythm",
    count: "294 experiences",
    image: "/images/barbados.jpg",
    className: "destination-barbados",
  },
  {
    name: "Curaçao",
    note: "Colour at every turn",
    count: "215 experiences",
    image: "/images/jamaica.jpg",
    className: "destination-curacao",
  },
];

const experiences: Experience[] = [
  {
    id: 1,
    title: "Catamaran into golden hour",
    location: "Montego Bay, Jamaica",
    image: "/images/catamaran.jpg",
    duration: "3.5 hours",
    rating: "4.96",
    reviews: 318,
    price: 125,
    tag: "Guest favourite",
    description:
      "Sail beyond the shoreline with a small local crew, swim in a quiet cove, and watch the sky turn coral over the Caribbean.",
  },
  {
    id: 2,
    title: "Hidden falls & forest table",
    location: "Roseau, Dominica",
    image: "/images/waterfall.jpg",
    duration: "5 hours",
    rating: "4.91",
    reviews: 204,
    price: 98,
    tag: "Rare find",
    description:
      "Follow a naturalist through rainforest trails to a secluded swimming hole, then share a seasonal Dominican lunch in the forest.",
  },
  {
    id: 3,
    title: "Barefoot villa supper",
    location: "Soufrière, Saint Lucia",
    image: "/images/villa.jpg",
    duration: "2.5 hours",
    rating: "4.98",
    reviews: 126,
    price: 170,
    tag: "Caribabe exclusive",
    description:
      "A private, open-air dinner shaped by island ingredients, a chef’s tasting menu, and an uninterrupted sea view.",
  },
];

const searchIdeas = [
  {
    title: "Soufrière",
    meta: "Saint Lucia · town",
    image: "/images/st-lucia.jpg",
  },
  {
    title: "Catamaran sunset cruise",
    meta: "Jamaica · experience",
    image: "/images/catamaran.jpg",
  },
  {
    title: "Tropical hideaways",
    meta: "24 handpicked stays",
    image: "/images/resort.jpg",
  },
  {
    title: "Waterfall adventures",
    meta: "Dominica · collection",
    image: "/images/waterfall.jpg",
  },
];

const itinerary = [
  {
    time: "09:30",
    label: "Morning",
    title: "Blue Mountain coffee trail",
    detail: "2 hr 30 min · confirmed",
  },
  {
    time: "13:00",
    label: "Afternoon",
    title: "Lunch at Stush in the Bush",
    detail: "1 hr 45 min · table saved",
  },
  {
    time: "17:30",
    label: "Evening",
    title: "Catamaran into golden hour",
    detail: "3 hr 30 min · 24 min away",
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("For you");
  const [saved, setSaved] = useState<Set<number>>(new Set([2]));
  const [searchOpen, setSearchOpen] = useState(false);
  const [tripOpen, setTripOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"map" | "list">("map");
  const [activeExperience, setActiveExperience] = useState<Experience | null>(
    null,
  );
  const [toast, setToast] = useState<string | null>(null);

  const filteredIdeas = useMemo(() => {
    if (!query.trim()) return searchIdeas;
    const lowered = query.toLowerCase();
    return searchIdeas.filter(
      (idea) =>
        idea.title.toLowerCase().includes(lowered) ||
        idea.meta.toLowerCase().includes(lowered),
    );
  }, [query]);

  const overlayOpen =
    searchOpen || tripOpen || Boolean(activeExperience);

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setTripOpen(false);
        setActiveExperience(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  const toggleSaved = (id: number) => {
    const next = new Set(saved);
    if (next.has(id)) {
      next.delete(id);
      notify("Removed from your collection");
    } else {
      next.add(id);
      notify("Saved to your Caribbean list");
    }
    setSaved(next);
  };

  const exploreDestination = (name: string) => {
    setQuery(name);
    setSearchOpen(true);
  };

  return (
    <main>
      <section className="hero" id="explore">
        <img
          src="/images/st-lucia.jpg"
          alt="Palm-lined Caribbean beach seen from above"
          className="hero-image"
        />
        <div className="hero-shade" />

        <header className="site-header">
          <a className="brand" href="#explore" aria-label="Caribabe home">
            <span className="brand-mark" aria-hidden="true">
              C
            </span>
            <span>CARIBABE</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#discover">Discover</a>
            <button type="button" onClick={() => setTripOpen(true)}>
              Plan a trip
            </button>
            <a href="#nearby">Near me</a>
            <a href="#journal">Stories</a>
          </nav>

          <div className="header-tools">
            <div className="weather-pill" aria-label="Kingston weather">
              <SunMedium size={17} />
              <span>Kingston</span>
              <strong>29°</strong>
            </div>
            <button
              className="round-button profile-button"
              type="button"
              aria-label="Open profile"
              onClick={() => notify("Your travel passport is ready")}
            >
              <UserRound size={19} />
            </button>
            <button
              className="round-button mobile-menu"
              type="button"
              aria-label="Open menu"
              onClick={() => setSearchOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </header>

        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow light">The Caribbean, considered</p>
          <h1>
            Find your own
            <br />
            <em>rhythm.</em>
          </h1>
          <p className="hero-subtitle">
            Places with a pulse. People with a story.
            <br />
            Everything you need to go beyond the postcard.
          </p>
        </motion.div>

        <div className="hero-caption">
          <MapPin size={15} />
          <span>
            Anse Mamin
            <small>Soufrière, Saint Lucia</small>
          </span>
        </div>

        <div className="journey-search" aria-label="Trip search">
          <button
            className="search-segment location-segment"
            type="button"
            onClick={() => setSearchOpen(true)}
          >
            <span>Where</span>
            <strong>Choose an island</strong>
          </button>
          <button
            className="search-segment"
            type="button"
            onClick={() => setSearchOpen(true)}
          >
            <span>When</span>
            <strong>Add dates</strong>
          </button>
          <button
            className="search-segment"
            type="button"
            onClick={() => setSearchOpen(true)}
          >
            <span>Who</span>
            <strong>2 travellers</strong>
          </button>
          <button
            className="search-submit"
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search Caribabe"
          >
            <Search size={22} />
            <span>Search</span>
          </button>
        </div>
      </section>

      <section className="category-shell" aria-label="Explore by category">
        <div className="category-row">
          {categories.map(({ label, icon: Icon }) => (
            <button
              type="button"
              className={`category-button ${
                activeCategory === label ? "active" : ""
              }`}
              key={label}
              onClick={() => setActiveCategory(label)}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
          <button
            type="button"
            className="category-button filter-button"
            onClick={() => notify("Filters are ready for your next search")}
          >
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </button>
        </div>
      </section>

      <section className="editorial-intro page-shell" id="discover">
        <div>
          <p className="eyebrow">Made for wandering</p>
          <h2>
            A different kind
            <br />
            of Caribbean.
          </h2>
        </div>
        <div className="intro-copy">
          <p>
            Not a checklist. Not an all-inclusive. Caribabe brings together the
            places locals love and the moments you cannot plan for.
          </p>
          <button className="text-link" type="button" onClick={() => setSearchOpen(true)}>
            Start exploring <ArrowUpRight size={17} />
          </button>
        </div>
      </section>

      <section className="destination-section page-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Island by island</p>
            <h2>Where the mood takes you.</h2>
          </div>
          <button className="quiet-link" type="button" onClick={() => setSearchOpen(true)}>
            View all islands <ArrowRight size={17} />
          </button>
        </div>

        <div className="destination-grid">
          {destinations.map((destination, index) => (
            <motion.button
              type="button"
              className={`destination-card ${destination.className}`}
              key={destination.name}
              onClick={() => exploreDestination(destination.name)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
            >
              <img src={destination.image} alt="" />
              <span className="card-gradient" />
              {index === 0 && <span className="trending-badge">Trending now</span>}
              <span className="destination-content">
                <small>{destination.note}</small>
                <strong>{destination.name}</strong>
                <span>
                  {destination.count} <ArrowUpRight size={15} />
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="experience-section">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">This week&apos;s short list</p>
              <h2>Worth leaving the beach for.</h2>
            </div>
            <button className="quiet-link" type="button" onClick={() => setSearchOpen(true)}>
              See every experience <ArrowRight size={17} />
            </button>
          </div>

          <div className="experience-grid">
            {experiences.map((experience, index) => (
              <motion.article
                className={`experience-card ${index === 0 ? "experience-featured" : ""}`}
                key={experience.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
              >
                <button
                  className="experience-image-button"
                  type="button"
                  onClick={() => setActiveExperience(experience)}
                  aria-label={`View ${experience.title}`}
                >
                  <img src={experience.image} alt="" />
                  <span className="experience-tag">{experience.tag}</span>
                </button>
                <button
                  type="button"
                  className={`save-button ${saved.has(experience.id) ? "saved" : ""}`}
                  aria-label={
                    saved.has(experience.id)
                      ? `Remove ${experience.title} from saved`
                      : `Save ${experience.title}`
                  }
                  onClick={() => toggleSaved(experience.id)}
                >
                  <Heart
                    size={19}
                    fill={saved.has(experience.id) ? "currentColor" : "none"}
                  />
                </button>
                <button
                  className="experience-copy"
                  type="button"
                  onClick={() => setActiveExperience(experience)}
                >
                  <span className="experience-meta">
                    <MapPin size={14} />
                    {experience.location}
                  </span>
                  <strong>{experience.title}</strong>
                  <span className="experience-details">
                    <span>
                      <Star size={14} fill="currentColor" /> {experience.rating}
                      <small>({experience.reviews})</small>
                    </span>
                    <span>
                      <Clock3 size={14} /> {experience.duration}
                    </span>
                  </span>
                  <span className="experience-price">
                    From <b>${experience.price}</b> / person
                  </span>
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="nearby-section page-shell" id="nearby">
        <div className="nearby-copy">
          <p className="eyebrow">Right where you are</p>
          <h2>
            Let the island
            <br />
            surprise you.
          </h2>
          <p>
            Live music around the corner. A family-run kitchen down the road.
            One last swim before sunset.
          </p>
          <div className="view-switch" aria-label="Nearby view">
            <button
              type="button"
              className={view === "map" ? "active" : ""}
              onClick={() => setView("map")}
            >
              Map
            </button>
            <button
              type="button"
              className={view === "list" ? "active" : ""}
              onClick={() => setView("list")}
            >
              List
            </button>
          </div>
        </div>

        <div className="discovery-panel">
          <AnimatePresence mode="wait">
            {view === "map" ? (
              <motion.div
                key="map"
                className="map-surface"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="map-label label-water">Caribbean Sea</span>
                <span className="map-label label-town">Portland Parish</span>
                <span className="map-road road-one" />
                <span className="map-road road-two" />
                <button
                  type="button"
                  className="map-pin pin-one"
                  aria-label="Reach Falls"
                  onClick={() => notify("Reach Falls · 28 minutes away")}
                >
                  <Waves size={16} />
                </button>
                <button
                  type="button"
                  className="map-pin pin-two food-pin"
                  aria-label="Mille Fleurs restaurant"
                  onClick={() => notify("Mille Fleurs · open until 10 PM")}
                >
                  <Utensils size={16} />
                </button>
                <button
                  type="button"
                  className="map-pin pin-three music-pin"
                  aria-label="Live music"
                  onClick={() => notify("Live music begins at 8 PM")}
                >
                  <Music2 size={16} />
                </button>
                <span className="you-are-here">
                  <span />
                </span>
                <button
                  className="locate-button"
                  type="button"
                  aria-label="Locate me"
                  onClick={() => notify("Map centered on your area")}
                >
                  <LocateFixed size={19} />
                </button>
                <article className="map-place-card">
                  <img src="/images/resort.jpg" alt="" />
                  <div>
                    <small>12 min away · open now</small>
                    <strong>Frenchman&apos;s Cove</strong>
                    <span>
                      <Star size={13} fill="currentColor" /> 4.8 · Quiet beach
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label="View Frenchman's Cove"
                    onClick={() => notify("Added Frenchman’s Cove to your day")}
                  >
                    <ChevronRight size={18} />
                  </button>
                </article>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                className="nearby-list"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
              >
                {[
                  ["Frenchman’s Cove", "Quiet beach · 12 min", "/images/resort.jpg"],
                  ["Mille Fleurs", "Caribbean kitchen · 18 min", "/images/villa.jpg"],
                  ["Reach Falls", "Wild swimming · 28 min", "/images/waterfall.jpg"],
                ].map(([name, meta, image]) => (
                  <button
                    type="button"
                    className="nearby-list-item"
                    key={name}
                    onClick={() => notify(`${name} added to your day`)}
                  >
                    <img src={image} alt="" />
                    <span>
                      <small>{meta}</small>
                      <strong>{name}</strong>
                      <span>
                        <Star size={13} fill="currentColor" /> 4.8
                      </span>
                    </span>
                    <ChevronRight size={19} />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="journal-section" id="journal">
        <div className="journal-image">
          <img src="/images/hero.jpg" alt="Caribbean coastline from the air" />
          <span className="journal-number">01</span>
        </div>
        <div className="journal-copy">
          <p className="eyebrow light">Caribabe journal · Jamaica</p>
          <h2>The road that takes its time.</h2>
          <p>
            From the mist of the Blue Mountains to a night swim in Portland,
            one writer follows the north coast without a schedule.
          </p>
          <button
            type="button"
            className="journal-link"
            onClick={() => notify("Story saved for your next slow Sunday")}
          >
            Read the story <ArrowUpRight size={18} />
          </button>
          <span className="read-time">8 min read</span>
        </div>
      </section>

      <section className="planner-section page-shell" id="trips">
        <div className="planner-panel">
          <div className="planner-orbit" aria-hidden="true">
            <span className="orbit-ring ring-one" />
            <span className="orbit-ring ring-two" />
            <span className="orbit-dot dot-one" />
            <span className="orbit-dot dot-two" />
            <Plane size={32} />
          </div>
          <div className="planner-copy">
            <p className="eyebrow light">One beautiful plan</p>
            <h2>Dream it. We&apos;ll make the days fit.</h2>
            <p>
              Save places, shape an itinerary, track your budget, and keep
              every reservation together.
            </p>
            <button
              type="button"
              className="light-button"
              onClick={() => setTripOpen(true)}
            >
              Build a trip <Plus size={18} />
            </button>
          </div>
          <div className="planner-preview">
            <div className="preview-header">
              <span>
                <small>Your next chapter</small>
                <strong>Jamaica · 6 days</strong>
              </span>
              <div className="avatar-stack" aria-label="2 travellers">
                <span>AM</span>
                <span>JL</span>
              </div>
            </div>
            {itinerary.slice(0, 2).map((item) => (
              <div className="preview-item" key={item.time}>
                <span className="preview-time">{item.time}</span>
                <span>
                  <small>{item.label}</small>
                  <strong>{item.title}</strong>
                </span>
                <Check size={17} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-top page-shell">
          <div>
            <a className="brand footer-brand" href="#explore">
              <span className="brand-mark">C</span>
              <span>CARIBABE</span>
            </a>
            <p>The Caribbean, considered.</p>
          </div>
          <div className="footer-links">
            <div>
              <strong>Explore</strong>
              <a href="#discover">Destinations</a>
              <a href="#nearby">Near you</a>
              <a href="#journal">Journal</a>
            </div>
            <div>
              <strong>Caribabe</strong>
              <button type="button" onClick={() => notify("Our story is coming soon")}>Our story</button>
              <button type="button" onClick={() => notify("Business tools are coming soon")}>For businesses</button>
              <button type="button" onClick={() => notify("Concierge is online")}>Get help</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom page-shell">
          <span>© 2026 Caribabe</span>
          <span>Photography from Pexels · Made with love in the Caribbean</span>
        </div>
      </footer>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <a href="#explore" className="active">
          <Compass size={20} />
          <span>Explore</span>
        </a>
        <button type="button" onClick={() => setTripOpen(true)}>
          <Plane size={20} />
          <span>Trips</span>
        </button>
        <button type="button" onClick={() => notify("No bookings yet")}>
          <CalendarDays size={20} />
          <span>Bookings</span>
        </button>
        <button type="button" onClick={() => notify(`${saved.size} saved experiences`)}>
          <Bookmark size={20} />
          <span>Saved</span>
        </button>
        <button type="button" onClick={() => notify("Your travel passport is ready")}>
          <UserRound size={20} />
          <span>Profile</span>
        </button>
      </nav>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Search Caribabe"
          >
            <motion.div
              className="search-modal"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
            >
              <div className="modal-top">
                <span className="brand modal-brand">
                  <span className="brand-mark">C</span>
                  <span>CARIBABE</span>
                </span>
                <button
                  className="modal-close"
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="modal-search-field">
                <Search size={24} />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Where will the Caribbean take you?"
                  aria-label="Search islands, places, and experiences"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                  >
                    <X size={17} />
                  </button>
                )}
              </div>
              <div className="search-modal-content">
                <p className="eyebrow">
                  {query ? "Suggested for you" : "A few beautiful ideas"}
                </p>
                <div className="search-suggestions">
                  {filteredIdeas.map((idea) => (
                    <button
                      type="button"
                      key={idea.title}
                      onClick={() => {
                        setSearchOpen(false);
                        notify(`${idea.title} is ready to explore`);
                      }}
                    >
                      <img src={idea.image} alt="" />
                      <span>
                        <strong>{idea.title}</strong>
                        <small>{idea.meta}</small>
                      </span>
                      <ArrowUpRight size={17} />
                    </button>
                  ))}
                  {filteredIdeas.length === 0 && (
                    <div className="search-empty">
                      <Compass size={28} />
                      <strong>Keep wandering.</strong>
                      <span>Try an island, beach, restaurant, or experience.</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeExperience && (
          <motion.div
            className="overlay detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={activeExperience.title}
          >
            <motion.div
              className="experience-modal"
              initial={{ y: "8%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "6%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
            >
              <button
                className="detail-close"
                type="button"
                onClick={() => setActiveExperience(null)}
                aria-label="Close experience"
              >
                <X size={20} />
              </button>
              <div className="detail-image">
                <img src={activeExperience.image} alt="" />
                <span>{activeExperience.tag}</span>
              </div>
              <div className="detail-content">
                <div className="detail-main">
                  <span className="experience-meta">
                    <MapPin size={14} /> {activeExperience.location}
                  </span>
                  <h2>{activeExperience.title}</h2>
                  <div className="detail-rating">
                    <span>
                      <Star size={15} fill="currentColor" />{" "}
                      {activeExperience.rating} ({activeExperience.reviews} reviews)
                    </span>
                    <span>
                      <Clock3 size={15} /> {activeExperience.duration}
                    </span>
                  </div>
                  <p>{activeExperience.description}</p>
                  <div className="detail-includes">
                    <strong>What makes it special</strong>
                    <span>
                      <Check size={16} /> Small group, never more than eight
                    </span>
                    <span>
                      <Check size={16} /> Hosted by a local expert
                    </span>
                    <span>
                      <Check size={16} /> Free cancellation up to 24 hours
                    </span>
                  </div>
                </div>
                <aside className="booking-card">
                  <span>
                    From <strong>${activeExperience.price}</strong> / person
                  </span>
                  <button type="button" className="booking-field">
                    <CalendarDays size={18} />
                    <span>
                      <small>Date</small>
                      <strong>Fri, Aug 14</strong>
                    </span>
                  </button>
                  <button type="button" className="booking-field">
                    <Users size={18} />
                    <span>
                      <small>Guests</small>
                      <strong>2 travellers</strong>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="primary-book-button"
                    onClick={() => {
                      setActiveExperience(null);
                      notify("Beautiful choice — your spot is held");
                    }}
                  >
                    Check availability <ArrowRight size={18} />
                  </button>
                  <small>You won&apos;t be charged yet</small>
                </aside>
              </div>
            </motion.div>
          </motion.div>
        )}

        {tripOpen && (
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Jamaica trip plan"
            onClick={() => setTripOpen(false)}
          >
            <motion.aside
              className="trip-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="drawer-top">
                <span>
                  <small>Aug 12–18 · 2 travellers</small>
                  <strong>Jamaica in colour</strong>
                </span>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setTripOpen(false)}
                  aria-label="Close trip"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="trip-summary">
                <span>
                  <CloudSun size={20} />
                  <small>Weather</small>
                  <strong>29° · bright</strong>
                </span>
                <span>
                  <WalletCards size={20} />
                  <small>Budget</small>
                  <strong>$1,240 left</strong>
                </span>
                <span>
                  <Navigation size={20} />
                  <small>Driving</small>
                  <strong>1 hr 22 min</strong>
                </span>
              </div>
              <div className="drawer-day">
                <div className="drawer-day-heading">
                  <span>
                    <small>Day three</small>
                    <strong>Friday, August 14</strong>
                  </span>
                  <button
                    type="button"
                    aria-label="Add to day"
                    onClick={() => notify("A new moment was added to Friday")}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                {itinerary.map((item, index) => (
                  <article className="itinerary-item" key={item.time}>
                    <span className="itinerary-line">
                      <b>{item.time}</b>
                      {index < itinerary.length - 1 && <i />}
                    </span>
                    <span className="itinerary-card">
                      <small>{item.label}</small>
                      <strong>{item.title}</strong>
                      <span>{item.detail}</span>
                    </span>
                  </article>
                ))}
              </div>
              <button
                type="button"
                className="drawer-cta"
                onClick={() => notify("Your itinerary is ready to share")}
              >
                View full itinerary <ArrowRight size={18} />
              </button>
            </motion.aside>
          </motion.div>
        )}

        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            role="status"
          >
            <Check size={17} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
