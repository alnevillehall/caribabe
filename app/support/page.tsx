"use client";

import { Check, Mail, MessageCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { DemoShell } from "../components/DemoShell";
import { DemoToast } from "../components/DemoToast";

const faqs = [
  ["Is this a real booking platform?", "This is a complete product demo. Booking confirmation is simulated and no payment or supplier reservation is made."],
  ["Where does place data come from?", "The Jamaica catalogue is sourced from OpenStreetMap contributors and refreshed through a curated Overpass import."],
  ["Are my saves private?", "Yes. In this demo, accounts, saves, trips, and bookings remain in this browser’s local storage."],
  ["How can a business join?", "Open the partner page to complete the local onboarding demo and preview the host dashboard."],
];

export default function SupportPage() {
  const [toast, setToast] = useState<string | null>(null);
  const [topic, setTopic] = useState("Trip planning");
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const request = { topic, message, createdAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(
        "go-bjoun:demo-support-request",
        JSON.stringify(request),
      );
    } catch {
      // The confirmation still demonstrates the flow if storage is unavailable.
    }
    setMessage("");
    setToast("Demo support request saved");
  };

  return (
    <DemoShell
      eyebrow="Go Bjoun support"
      title="A little help, without the runaround."
      intro="Browse the demo answers or leave a local support request to test the complete flow."
    >
      <section className="support-layout">
        <div className="support-faq">
          <p className="demo-eyebrow">Common questions</p>
          <h2>Good things to know</h2>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}<span>+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
        <form className="support-form" onSubmit={submit}>
          <MessageCircle size={24} />
          <p className="demo-eyebrow">Send a note</p>
          <h2>What can we help with?</h2>
          <label>
            <span>Topic</span>
            <select value={topic} onChange={(event) => setTopic(event.target.value)}>
              <option>Trip planning</option>
              <option>Booking help</option>
              <option>Correct a listing</option>
              <option>Partner support</option>
              <option>Something else</option>
            </select>
          </label>
          <label>
            <span>Message</span>
            <textarea
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell us what happened..."
              rows={5}
            />
          </label>
          <button type="submit" className="demo-primary">
            Save demo request <Send size={16} />
          </button>
          <small><Mail size={13} /> Production support will use a verified sender domain.</small>
        </form>
      </section>
      <section className="support-promise">
        <Check size={22} />
        <div>
          <strong>Listing corrections matter.</strong>
          <p>Every place detail includes its source, and the production workflow will give owners and travellers a clear way to report changes.</p>
        </div>
      </section>
      <DemoToast message={toast} onDone={() => setToast(null)} />
    </DemoShell>
  );
}
