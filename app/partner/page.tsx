"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  CircleDollarSign,
  Eye,
  MapPin,
  Store,
  Users,
  X,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { DemoShell } from "../components/DemoShell";
import { DemoToast } from "../components/DemoToast";
import type { PartnerProfile } from "../demo-data";
import { useDemoStore } from "../hooks/useDemoStore";

const emptyProfile: PartnerProfile = {
  businessName: "",
  contactName: "",
  email: "",
  category: "Experience",
  description: "",
  submitted: false,
};

export default function PartnerPage() {
  const { ready, partner, savePartner } = useDemoStore();
  const [form, setForm] = useState<PartnerProfile>(partner ?? emptyProfile);
  const [toast, setToast] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  if (!ready) return <div className="demo-route-loading">Opening partner tools…</div>;

  const profile = partner ?? form;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next = { ...form, submitted: true };
    savePartner(next);
    setForm(next);
    setToast("Partner profile submitted locally");
  };

  if (profile.submitted) {
    return (
      <DemoShell
        eyebrow="Partner studio"
        title={`Welcome, ${profile.businessName}.`}
        intro="A working host-dashboard demo for listings, reach, bookings, and payouts."
        actions={
          <button
            type="button"
            className="demo-secondary"
            onClick={() => {
              const next = { ...profile, submitted: false };
              savePartner(next);
              setForm(next);
            }}
          >
            Edit profile
          </button>
        }
      >
        <section className="partner-stats">
          {[
            { icon: Eye, value: "1,248", label: "Listing views" },
            { icon: Users, value: "86", label: "Saves" },
            { icon: BarChart3, value: "12", label: "Demo bookings" },
            { icon: CircleDollarSign, value: "$1,440", label: "Demo revenue" },
          ].map(({ icon: Icon, value, label }) => (
            <article key={label}>
              <Icon size={20} />
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </section>
        <section className="partner-dashboard-grid">
          <div className="partner-listing-card">
            <div>
              <span><Store size={21} /></span>
              <div>
                <small>{profile.category} · Jamaica</small>
                <h2>{profile.businessName}</h2>
                <p>{profile.description}</p>
              </div>
            </div>
            <span className="demo-status"><Check size={14} /> Demo verified</span>
            <button type="button" onClick={() => setPreviewOpen(true)}>
              Preview listing <ArrowRight size={16} />
            </button>
          </div>
          <aside className="partner-checklist">
            <p className="demo-eyebrow">Launch checklist</p>
            <h2>3 of 5 complete</h2>
            {[
              ["Business profile", true],
              ["Contact verified", true],
              ["Listing description", true],
              ["Upload rights-cleared photos", false],
              ["Connect payouts", false],
            ].map(([label, done]) => (
              <span key={String(label)} className={done ? "done" : ""}>
                <b>{done ? <Check size={13} /> : null}</b>
                {label}
              </span>
            ))}
          </aside>
        </section>
        <AnimatePresence>
          {previewOpen ? (
            <motion.div
              className="partner-preview-backdrop"
              role="dialog"
              aria-modal="true"
              aria-label={`${profile.businessName} listing preview`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewOpen(false)}
            >
              <motion.article
                className="partner-preview"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  aria-label="Close listing preview"
                  onClick={() => setPreviewOpen(false)}
                >
                  <X size={19} />
                </button>
                <div className="partner-preview-image">
                  <span>{profile.category}</span>
                </div>
                <p className="demo-eyebrow">Go Bjoun partner preview</p>
                <h2>{profile.businessName}</h2>
                <span className="partner-preview-location">
                  <MapPin size={14} /> Jamaica
                </span>
                <p>{profile.description}</p>
                <div>
                  <span className="demo-status">
                    <Check size={14} /> Demo verified
                  </span>
                  <strong>From $85 / guest</strong>
                </div>
                <button
                  type="button"
                  className="demo-primary"
                  onClick={() => {
                    setPreviewOpen(false);
                    setToast("Preview complete — listing kept in draft");
                  }}
                >
                  Finish preview
                </button>
              </motion.article>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <DemoToast message={toast} onDone={() => setToast(null)} />
      </DemoShell>
    );
  }

  return (
    <DemoShell
      eyebrow="For Caribbean businesses"
      title="Put your place in the right story."
      intro="Complete the local onboarding demo and see how a host manages their Go Bjoun presence."
    >
      <section className="partner-onboarding">
        <div>
          <p className="demo-eyebrow">Why Go Bjoun</p>
          <h2>Discovery built around local character.</h2>
          {[
            "A richer profile than a pin on a map",
            "Transparent demo booking and payout tools",
            "Traveller saves and trip-plan visibility",
            "A correction and verification workflow",
          ].map((item) => (
            <span key={item}><Check size={17} /> {item}</span>
          ))}
        </div>
        <form onSubmit={submit}>
          <h2>Create a partner profile</h2>
          <div className="form-two">
            <label>
              <span>Business name</span>
              <input
                required
                value={form.businessName}
                onChange={(event) => setForm({ ...form, businessName: event.target.value })}
                placeholder="Island Rhythm Tours"
              />
            </label>
            <label>
              <span>Contact name</span>
              <input
                required
                value={form.contactName}
                onChange={(event) => setForm({ ...form, contactName: event.target.value })}
                placeholder="Alicia Brown"
              />
            </label>
          </div>
          <label>
            <span>Email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="hello@yourbusiness.com"
            />
          </label>
          <label>
            <span>Category</span>
            <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
              <option>Experience</option>
              <option>Restaurant</option>
              <option>Stay</option>
              <option>Attraction</option>
              <option>Transport</option>
            </select>
          </label>
          <label>
            <span>What makes it special?</span>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              placeholder="Tell travellers what they will remember..."
            />
          </label>
          <button type="submit" className="demo-primary">
            Open partner dashboard <ArrowRight size={17} />
          </button>
          <small>Demo only. No business data leaves this browser.</small>
        </form>
      </section>
    </DemoShell>
  );
}
