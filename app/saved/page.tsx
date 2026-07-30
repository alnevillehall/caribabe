"use client";

import { ArrowRight, Heart, MapPin, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DemoShell } from "../components/DemoShell";
import { demoExperiences } from "../demo-data";
import { useDemoStore, usePlaces } from "../hooks/useDemoStore";

const placeImages = {
  Adventure: "/images/catamaran.jpg",
  Beaches: "/images/st-lucia.jpg",
  Culture: "/images/hero.jpg",
  Food: "/images/villa.jpg",
  Nature: "/images/waterfall.jpg",
  Nightlife: "/images/catamaran.jpg",
  Stay: "/images/resort.jpg",
} as const;

export default function SavedPage() {
  const { places, loading } = usePlaces();
  const {
    savedPlaceIds,
    savedExperienceIds,
    togglePlace,
    toggleExperience,
  } = useDemoStore();
  const savedPlaces = places.filter((place) => savedPlaceIds.includes(place.id));
  const savedExperiences = demoExperiences.filter((experience) =>
    savedExperienceIds.includes(experience.id),
  );
  const empty =
    !loading && savedPlaces.length === 0 && savedExperiences.length === 0;

  return (
    <DemoShell
      eyebrow="Your collection"
      title="The places you want to remember."
      intro="Everything saved on this device, ready to turn into an island plan."
      actions={
        <Link href="/discover" className="demo-primary">
          Keep exploring <ArrowRight size={17} />
        </Link>
      }
    >
      {empty ? (
        <section className="demo-empty">
          <Heart size={30} />
          <h2>Your collection is waiting.</h2>
          <p>Save beaches, restaurants, stays, and experiences as you explore.</p>
          <Link href="/discover" className="demo-primary">
            Discover Jamaica
          </Link>
        </section>
      ) : null}

      {savedPlaces.length > 0 ? (
        <section className="demo-section first">
          <div className="demo-section-heading">
            <div>
              <p className="demo-eyebrow">Places</p>
              <h2>Saved around Jamaica</h2>
            </div>
            <span>{savedPlaces.length} saved</span>
          </div>
          <div className="saved-grid">
            {savedPlaces.map((place) => (
              <article key={place.id}>
                <div className="saved-image">
                  <Image
                    src={placeImages[place.category]}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                </div>
                <small>
                  <MapPin size={13} /> {place.parish ?? "Jamaica"} · {place.category}
                </small>
                <h3>{place.name}</h3>
                <p>{place.kind}</p>
                <div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Directions
                  </a>
                  <button type="button" onClick={() => togglePlace(place)}>
                    <Trash2 size={15} /> Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {savedExperiences.length > 0 ? (
        <section className="demo-section">
          <div className="demo-section-heading">
            <div>
              <p className="demo-eyebrow">Experiences</p>
              <h2>Ready when you are</h2>
            </div>
          </div>
          <div className="saved-grid">
            {savedExperiences.map((experience) => (
              <article key={experience.id}>
                <div className="saved-image">
                  <Image
                    src={experience.image}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                </div>
                <small>{experience.location}</small>
                <h3>{experience.title}</h3>
                <p>From ${experience.price} · {experience.duration}</p>
                <div>
                  <Link href={`/booking?experience=${experience.id}`}>Book demo</Link>
                  <button type="button" onClick={() => toggleExperience(experience.id)}>
                    <Trash2 size={15} /> Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </DemoShell>
  );
}
