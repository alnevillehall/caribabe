"use client";

import { useCallback, useEffect, useState } from "react";
import type { LocationPlace } from "../components/DiscoveryMap";
import {
  starterTrip,
  storageKeys,
  type DemoTrip,
  type DemoUser,
  type PartnerProfile,
} from "../demo-data";

const storeEvent = "go-bjoun:store-change";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Keep the in-memory demo usable if the browser blocks local storage.
  }
  window.dispatchEvent(new Event(storeEvent));
}

export function useDemoStore() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<DemoUser | null>(null);
  const [savedPlaceIds, setSavedPlaceIds] = useState<string[]>([]);
  const [savedExperienceIds, setSavedExperienceIds] = useState<number[]>([]);
  const [trips, setTrips] = useState<DemoTrip[]>([]);
  const [partner, setPartner] = useState<PartnerProfile | null>(null);

  const load = useCallback(() => {
    setUser(readJson<DemoUser | null>(storageKeys.user, null));
    setSavedPlaceIds(readJson<string[]>(storageKeys.places, []));
    setSavedExperienceIds(readJson<number[]>(storageKeys.experiences, []));
    setTrips(readJson<DemoTrip[]>(storageKeys.trips, []));
    setPartner(readJson<PartnerProfile | null>(storageKeys.partner, null));
    setReady(true);
  }, []);

  useEffect(() => {
    queueMicrotask(load);
    window.addEventListener(storeEvent, load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener(storeEvent, load);
      window.removeEventListener("storage", load);
    };
  }, [load]);

  const signIn = (email: string, name?: string) => {
    const nextUser: DemoUser = {
      name: name?.trim() || email.split("@")[0] || "Island traveller",
      email,
      homeAirport: "KIN",
      travelStyle: "Slow island days",
      joinedAt: new Date().toISOString(),
    };
    writeJson(storageKeys.user, nextUser);
    setUser(nextUser);
    return nextUser;
  };

  const updateUser = (nextUser: DemoUser) => {
    writeJson(storageKeys.user, nextUser);
    setUser(nextUser);
  };

  const signOut = () => {
    try {
      window.localStorage.removeItem(storageKeys.user);
    } catch {
      // The current page can still sign out even when storage is unavailable.
    }
    window.dispatchEvent(new Event(storeEvent));
    setUser(null);
  };

  const togglePlace = (place: Pick<LocationPlace, "id">) => {
    const next = savedPlaceIds.includes(place.id)
      ? savedPlaceIds.filter((id) => id !== place.id)
      : [...savedPlaceIds, place.id];
    writeJson(storageKeys.places, next);
    setSavedPlaceIds(next);
  };

  const toggleExperience = (id: number) => {
    const next = savedExperienceIds.includes(id)
      ? savedExperienceIds.filter((item) => item !== id)
      : [...savedExperienceIds, id];
    writeJson(storageKeys.experiences, next);
    setSavedExperienceIds(next);
  };

  const saveTrip = (trip: DemoTrip) => {
    const next = [trip, ...trips.filter((item) => item.id !== trip.id)];
    writeJson(storageKeys.trips, next);
    setTrips(next);
  };

  const ensureStarterTrip = () => {
    const existing =
      trips.find((trip) => trip.id === starterTrip.id) ?? starterTrip;
    if (!trips.some((trip) => trip.id === starterTrip.id)) {
      saveTrip({ ...starterTrip, updatedAt: new Date().toISOString() });
    }
    return existing;
  };

  const savePartner = (profile: PartnerProfile) => {
    writeJson(storageKeys.partner, profile);
    setPartner(profile);
  };

  return {
    ready,
    user,
    savedPlaceIds,
    savedExperienceIds,
    trips,
    partner,
    signIn,
    updateUser,
    signOut,
    togglePlace,
    toggleExperience,
    saveTrip,
    ensureStarterTrip,
    savePartner,
  };
}

export function usePlaces() {
  const [places, setPlaces] = useState<LocationPlace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/data/jamaica-locations.json")
      .then((response) => response.json())
      .then((data: { locations: LocationPlace[] }) => {
        if (active) setPlaces(data.locations);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { places, loading };
}
