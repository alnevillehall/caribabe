"use client";

import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Plus,
  Share2,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { DemoShell } from "../components/DemoShell";
import { DemoToast } from "../components/DemoToast";
import {
  starterTrip,
  tripSuggestions,
  type DemoTrip,
  type DemoTripItem,
} from "../demo-data";
import { useDemoStore } from "../hooks/useDemoStore";

export default function TripsPage() {
  const { user, trips, saveTrip } = useDemoStore();
  const [editedTrip, setEditedTrip] = useState<DemoTrip | null>(null);
  const [day, setDay] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const trip =
    editedTrip ??
    trips.find((item) => item.id === starterTrip.id) ??
    starterTrip;

  const dayItems = useMemo(
    () =>
      trip.items
        .filter((item) => item.day === day)
        .toSorted((a, b) => a.time.localeCompare(b.time)),
    [day, trip.items],
  );

  const commitTrip = useCallback(
    (next: DemoTrip, message: string) => {
      const updated = { ...next, updatedAt: new Date().toISOString() };
      setEditedTrip(updated);
      saveTrip(updated);
      setToast(message);
    },
    [saveTrip],
  );

  const addItem = (item: DemoTripItem) => {
    if (trip.items.some((current) => current.id === item.id)) {
      setToast("Already in your trip");
      return;
    }
    commitTrip(
      { ...trip, items: [...trip.items, item] },
      `${item.title} added to day ${item.day}`,
    );
    setDay(item.day);
  };

  const removeItem = (id: string) => {
    commitTrip(
      { ...trip, items: trip.items.filter((item) => item.id !== id) },
      "Removed from the itinerary",
    );
  };

  const share = async () => {
    const text = `Go Bjoun trip: ${trip.name} · ${trip.dates}`;
    try {
      await navigator.clipboard.writeText(text);
      setToast("Trip summary copied");
    } catch {
      setToast("Trip is saved on this device");
    }
  };

  return (
    <DemoShell
      eyebrow="Trip studio"
      title="Make room for the unplanned."
      intro="Build a relaxed island itinerary, move between days, and keep every idea in one place."
      actions={
        <button type="button" className="demo-secondary" onClick={share}>
          <Share2 size={17} /> Share trip
        </button>
      }
    >
      {!user ? (
        <div className="demo-callout">
          <div>
            <strong>Your trip is saving on this device.</strong>
            <span>Sign in to complete the account demo and see it in your profile.</span>
          </div>
          <Link href="/auth?next=/trips">
            Sign in <ArrowRight size={16} />
          </Link>
        </div>
      ) : null}

      <section className="trip-workspace">
        <div className="trip-plan">
          <header>
            <div>
              <p className="demo-eyebrow">{trip.island}</p>
              <h2>{trip.name}</h2>
              <span>
                <CalendarDays size={15} /> {trip.dates}
              </span>
            </div>
            <span className="demo-status">
              <Check size={14} /> Saved locally
            </span>
          </header>
          <div className="trip-days">
            {[1, 2, 3].map((item) => (
              <button
                type="button"
                key={item}
                className={day === item ? "active" : ""}
                onClick={() => setDay(item)}
              >
                <small>Day</small>
                <strong>{item}</strong>
              </button>
            ))}
          </div>
          <div className="trip-timeline">
            {dayItems.length > 0 ? (
              dayItems.map((item) => (
                <article key={item.id}>
                  <span className="trip-time">{item.time}</span>
                  <div>
                    <small>{item.type}</small>
                    <h3>{item.title}</h3>
                    <p>
                      <MapPin size={13} /> {item.location}
                    </p>
                  </div>
                  <button type="button" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.title}`}>
                    <Trash2 size={16} />
                  </button>
                </article>
              ))
            ) : (
              <div className="trip-empty-day">
                <Clock3 size={25} />
                <strong>Leave this day open—or add an idea.</strong>
              </div>
            )}
          </div>
        </div>

        <aside className="trip-suggestions">
          <p className="demo-eyebrow">Made for your pace</p>
          <h2>Add an island moment</h2>
          {tripSuggestions.map((item) => {
            const added = trip.items.some((current) => current.id === item.id);
            return (
              <article key={item.id}>
                <div>
                  <small>
                    Day {item.day} · {item.time}
                  </small>
                  <strong>{item.title}</strong>
                  <span>{item.location}</span>
                </div>
                <button
                  type="button"
                  disabled={added}
                  onClick={() => addItem(item)}
                  aria-label={`Add ${item.title}`}
                >
                  {added ? <Check size={17} /> : <Plus size={17} />}
                </button>
              </article>
            );
          })}
          <Link href="/discover">
            Browse every place <ArrowRight size={16} />
          </Link>
        </aside>
      </section>
      <DemoToast message={toast} onDone={() => setToast(null)} />
    </DemoShell>
  );
}
