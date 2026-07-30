"use client";

import { ArrowRight, Heart, LogOut, MapPin, Plane, Save, UserRound } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { DemoShell } from "../components/DemoShell";
import { DemoToast } from "../components/DemoToast";
import type { DemoUser } from "../demo-data";
import { useDemoStore } from "../hooks/useDemoStore";

function ProfileForm({
  user,
  updateUser,
  onSaved,
}: {
  user: DemoUser;
  updateUser: (user: DemoUser) => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(user.name);
  const [airport, setAirport] = useState(user.homeAirport);
  const [style, setStyle] = useState(user.travelStyle);

  const saveProfile = (event: FormEvent) => {
    event.preventDefault();
    updateUser({ ...user, name, homeAirport: airport, travelStyle: style });
    onSaved();
  };

  return (
    <form onSubmit={saveProfile}>
      <label><span>Name</span><input value={name} onChange={(event) => setName(event.target.value)} /></label>
      <label><span>Email</span><input value={user.email} disabled /></label>
      <label>
        <span>Home airport</span>
        <input value={airport} onChange={(event) => setAirport(event.target.value.toUpperCase().slice(0, 3))} />
      </label>
      <label>
        <span>Travel style</span>
        <select value={style} onChange={(event) => setStyle(event.target.value)}>
          <option>Slow island days</option>
          <option>Food first</option>
          <option>Always outdoors</option>
          <option>Design and culture</option>
          <option>Night owl</option>
        </select>
      </label>
      <button type="submit" className="demo-primary"><Save size={16} /> Save profile</button>
    </form>
  );
}

export default function AccountPage() {
  const {
    ready,
    user,
    trips,
    savedPlaceIds,
    savedExperienceIds,
    updateUser,
    signOut,
  } = useDemoStore();
  const [toast, setToast] = useState<string | null>(null);

  if (!ready) return <div className="demo-route-loading">Opening your passport…</div>;

  if (!user) {
    return (
      <DemoShell
        eyebrow="Your account"
        title="Your passport is one tap away."
        intro="Sign in locally to keep your trip ideas, saves, and travel preferences together."
      >
        <section className="demo-empty">
          <UserRound size={31} />
          <h2>Sign in to continue</h2>
          <Link href="/auth" className="demo-primary">Open my passport <ArrowRight size={17} /></Link>
        </section>
      </DemoShell>
    );
  }

  return (
    <DemoShell
      eyebrow="Your island passport"
      title={`Welcome back, ${user.name.split(" ")[0]}.`}
      intro="Your trip ideas, local saves, and planning preferences in one place."
      actions={
        <button
          type="button"
          className="demo-secondary"
          onClick={() => {
            signOut();
            window.location.href = "/";
          }}
        >
          <LogOut size={16} /> Sign out
        </button>
      }
    >
      <section className="account-stats">
        <Link href="/saved"><Heart size={20} /><strong>{savedPlaceIds.length}</strong><span>Saved places</span></Link>
        <Link href="/trips"><Plane size={20} /><strong>{trips.length}</strong><span>Island trips</span></Link>
        <Link href="/saved"><Heart size={20} /><strong>{savedExperienceIds.length}</strong><span>Saved experiences</span></Link>
      </section>

      <section className="account-grid">
        <div className="account-card">
          <p className="demo-eyebrow">Profile</p>
          <h2>Travel preferences</h2>
          <ProfileForm key={user.email} user={user} updateUser={updateUser} onSaved={() => setToast("Profile saved on this device")} />
        </div>
        <div className="account-card">
          <p className="demo-eyebrow">Trip pulse</p>
          <h2>Build before you book.</h2>
          <div className="account-empty">
            <Plane size={24} />
            <p>Save the areas and food moments that make a trip feel like yours.</p>
            <Link href="/discover">Find your next idea</Link>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <div className="demo-section-heading">
          <div><p className="demo-eyebrow">Trips</p><h2>Your island plans</h2></div>
          <Link href="/trips">Open trip studio <ArrowRight size={16} /></Link>
        </div>
        <div className="account-trip-grid">
          {trips.length > 0 ? trips.map((trip) => (
            <Link href="/trips" key={trip.id}>
              <Plane size={19} /><small>{trip.island}</small><strong>{trip.name}</strong>
              <span><MapPin size={13} /> {trip.items.length} stops · {trip.dates}</span>
            </Link>
          )) : (
            <Link href="/trips"><Plane size={19} /><small>Start here</small><strong>Build your first island plan</strong><span>Open the trip studio</span></Link>
          )}
        </div>
      </section>
      <DemoToast message={toast} onDone={() => setToast(null)} />
    </DemoShell>
  );
}
