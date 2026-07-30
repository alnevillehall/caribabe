"use client";

import {
  Bookmark,
  Compass,
  Heart,
  Menu,
  Plane,
  Search,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useDemoStore } from "../hooks/useDemoStore";

const links = [
  { href: "/discover", label: "Discover" },
  { href: "/trips", label: "Plan a trip" },
  { href: "/saved", label: "Saved" },
  { href: "/journal", label: "Stories" },
];

export function DemoShell({
  children,
  eyebrow,
  title,
  intro,
  actions,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
  intro?: string;
  actions?: ReactNode;
}) {
  const pathname = usePathname();
  const { user, savedPlaceIds } = useDemoStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="demo-page">
      <header className="demo-header">
        <Link href="/" className="demo-brand" aria-label="Go Bjoun home">
          <Image
            src="/brand/go-bjoun-logo.svg"
            alt="Go Bjoun"
            width={760}
            height={180}
            priority
          />
        </Link>
        <nav className="demo-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={pathname === link.href ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="demo-header-actions">
          <Link href="/discover" className="demo-icon-button" aria-label="Search">
            <Search size={18} />
          </Link>
          <Link href="/saved" className="demo-icon-button saved-count" aria-label="Saved">
            <Heart size={18} />
            {savedPlaceIds.length > 0 ? <span>{savedPlaceIds.length}</span> : null}
          </Link>
          <Link
            href={user ? "/account" : "/auth"}
            className="demo-account-button"
          >
            <UserRound size={18} />
            <span>{user ? user.name.split(" ")[0] : "Sign in"}</span>
          </Link>
          <button
            className="demo-icon-button demo-menu-button"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {menuOpen ? (
          <nav className="demo-mobile-menu" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/partner" onClick={() => setMenuOpen(false)}>
              Partner with us
            </Link>
            <Link href="/support" onClick={() => setMenuOpen(false)}>
              Get help
            </Link>
          </nav>
        ) : null}
      </header>

      <section className="demo-hero">
        <div>
          <p className="demo-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {intro ? <p>{intro}</p> : null}
        </div>
        {actions ? <div className="demo-hero-actions">{actions}</div> : null}
      </section>

      <main className="demo-main">{children}</main>

      <footer className="demo-footer">
        <div>
          <Image
            src="/brand/go-bjoun-logo.svg"
            alt="Go Bjoun"
            width={760}
            height={180}
          />
          <p>Where will you go?</p>
        </div>
        <nav>
          <Link href="/about">Our story</Link>
          <Link href="/partner">For businesses</Link>
          <Link href="/support">Get help</Link>
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
            Place attribution
          </a>
        </nav>
      </footer>

      <nav className="demo-bottom-nav" aria-label="Quick navigation">
        <Link href="/discover" className={pathname === "/discover" ? "active" : ""}>
          <Compass size={18} />
          Explore
        </Link>
        <Link href="/trips" className={pathname === "/trips" ? "active" : ""}>
          <Plane size={18} />
          Trips
        </Link>
        <Link href="/saved" className={pathname === "/saved" ? "active" : ""}>
          <Bookmark size={18} />
          Saved
        </Link>
        <Link href={user ? "/account" : "/auth"}>
          <UserRound size={18} />
          You
        </Link>
      </nav>
    </div>
  );
}
