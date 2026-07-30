"use client";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CreditCard,
  LockKeyhole,
  Minus,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { DemoShell } from "../components/DemoShell";
import { demoExperiences, type DemoBooking } from "../demo-data";
import { useDemoStore } from "../hooks/useDemoStore";

export default function BookingClient() {
  const params = useSearchParams();
  const router = useRouter();
  const { user, addBooking } = useDemoStore();
  const experienceId = Number(params.get("experience") ?? 1);
  const experience =
    demoExperiences.find((item) => item.id === experienceId) ??
    demoExperiences[0];
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("2026-08-14");
  const [guests, setGuests] = useState(2);
  const total = useMemo(() => experience.price * guests, [experience.price, guests]);

  const confirm = () => {
    const booking: DemoBooking = {
      id: `GB-${Date.now().toString().slice(-7)}`,
      experienceId: experience.id,
      title: experience.title,
      date,
      guests,
      total,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    };
    addBooking(booking);
    setStep(3);
  };

  return (
    <DemoShell
      eyebrow="Demo checkout"
      title={step === 3 ? "You’re going." : "Almost on island time."}
      intro="A complete booking simulation—no card is charged and no reservation is sent."
    >
      <section className="booking-layout">
        <div className="booking-flow">
          <div className="booking-steps">
            {["Choose", "Review", "Confirmed"].map((label, index) => (
              <span key={label} className={step >= index + 1 ? "active" : ""}>
                <b>{step > index + 1 ? <Check size={14} /> : index + 1}</b>
                {label}
              </span>
            ))}
          </div>

          {step === 1 ? (
            <div className="booking-step-card">
              <h2>Choose your details</h2>
              <label>
                <span>
                  <CalendarDays size={17} /> Date
                </span>
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
              </label>
              <div className="guest-picker">
                <span>
                  <Users size={17} />
                  <span>
                    <strong>Travellers</strong>
                    <small>Ages 13+</small>
                  </span>
                </span>
                <div>
                  <button type="button" onClick={() => setGuests((value) => Math.max(1, value - 1))}>
                    <Minus size={16} />
                  </button>
                  <strong>{guests}</strong>
                  <button type="button" onClick={() => setGuests((value) => Math.min(8, value + 1))}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <button type="button" className="demo-primary" onClick={() => setStep(2)}>
                Review booking <ArrowRight size={17} />
              </button>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="booking-step-card">
              <h2>Review and confirm</h2>
              {!user ? (
                <div className="booking-auth-note">
                  <LockKeyhole size={20} />
                  <div>
                    <strong>Sign in before confirming</strong>
                    <p>Your booking will appear in your demo account.</p>
                  </div>
                  <Link
                    href={`/auth?next=${encodeURIComponent(
                      `/booking?experience=${experience.id}`,
                    )}`}
                  >
                    Sign in
                  </Link>
                </div>
              ) : (
                <div className="booking-auth-note ready">
                  <Check size={20} />
                  <div>
                    <strong>Booking as {user.name}</strong>
                    <p>{user.email}</p>
                  </div>
                </div>
              )}
              <div className="booking-review-row">
                <span>Date</span>
                <strong>{new Date(`${date}T12:00:00`).toLocaleDateString("en", { dateStyle: "long" })}</strong>
              </div>
              <div className="booking-review-row">
                <span>Travellers</span>
                <strong>{guests}</strong>
              </div>
              <div className="booking-payment-demo">
                <CreditCard size={20} />
                <div>
                  <strong>Demo payment</strong>
                  <span>•••• 4242 · no charge</span>
                </div>
                <ShieldCheck size={19} />
              </div>
              <div className="booking-flow-actions">
                <button type="button" className="demo-secondary" onClick={() => setStep(1)}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="button" className="demo-primary" disabled={!user} onClick={confirm}>
                  Confirm demo booking
                </button>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="booking-confirmed">
              <span><Check size={28} /></span>
              <h2>Booking confirmed</h2>
              <p>
                Your simulated reservation for <strong>{experience.title}</strong> is now in your account.
              </p>
              <div>
                <button type="button" className="demo-primary" onClick={() => router.push("/account")}>
                  View my bookings <ArrowRight size={17} />
                </button>
                <Link href="/discover" className="demo-secondary">Keep exploring</Link>
              </div>
            </div>
          ) : null}
        </div>

        <aside className="booking-summary">
          <div className="booking-summary-image">
            <Image src={experience.image} alt="" fill sizes="420px" />
          </div>
          <small>{experience.location}</small>
          <h2>{experience.title}</h2>
          <p>{experience.duration} · {experience.tag}</p>
          <div>
            <span>${experience.price} × {guests}</span>
            <strong>${total}</strong>
          </div>
          <div>
            <span>Demo service fee</span>
            <strong>$0</strong>
          </div>
          <div className="booking-total">
            <span>Total</span>
            <strong>USD ${total}</strong>
          </div>
        </aside>
      </section>
    </DemoShell>
  );
}
