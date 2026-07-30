"use client";

import { ArrowRight, Check, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { DemoShell } from "../components/DemoShell";
import { useDemoStore } from "../hooks/useDemoStore";

export default function AuthClient() {
  const router = useRouter();
  const params = useSearchParams();
  const { signIn } = useDemoStore();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const requestedNext = params.get("next");
  const next =
    requestedNext?.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/account";

  const submit = (event: FormEvent) => {
    event.preventDefault();
    signIn(email, name);
    router.push(next);
  };

  const demoSignIn = () => {
    signIn("maya@demo.gobjoun.com", "Maya Campbell");
    router.push(next);
  };

  return (
    <DemoShell
      eyebrow="Your island passport"
      title="Save the feeling. Pick it up anywhere."
      intro="This demo account lives only in your browser—no password leaves your device."
    >
      <section className="auth-layout">
        <div className="auth-panel">
          <div className="auth-tabs">
            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              onClick={() => setMode("signup")}
            >
              Create account
            </button>
            <button
              type="button"
              className={mode === "signin" ? "active" : ""}
              onClick={() => setMode("signin")}
            >
              Sign in
            </button>
          </div>
          <form onSubmit={submit}>
            {mode === "signup" ? (
              <label>
                <span>Your name</span>
                <div>
                  <UserRound size={18} />
                  <input
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Maya Campbell"
                  />
                </div>
              </label>
            ) : null}
            <label>
              <span>Email</span>
              <div>
                <Mail size={18} />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </label>
            <label>
              <span>Password</span>
              <div>
                <LockKeyhole size={18} />
                <input
                  required
                  minLength={6}
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 6 characters"
                />
              </div>
            </label>
            <button type="submit" className="demo-primary auth-submit">
              {mode === "signup" ? "Create local account" : "Sign in locally"}
              <ArrowRight size={17} />
            </button>
          </form>
          <div className="auth-divider"><span>or</span></div>
          <button type="button" className="demo-secondary auth-demo" onClick={demoSignIn}>
            Continue as demo traveller
          </button>
          <small>
            Demo only: credentials are not transmitted or authenticated by a server.
          </small>
        </div>
        <aside className="auth-benefits">
          <p className="demo-eyebrow">With your passport</p>
          <h2>Your Caribbean, kept together.</h2>
          {[
            "See saved places and experiences",
            "Build and revisit island itineraries",
            "Complete simulated bookings",
            "Keep profile and travel preferences",
          ].map((item) => (
            <span key={item}>
              <Check size={17} /> {item}
            </span>
          ))}
        </aside>
      </section>
    </DemoShell>
  );
}
