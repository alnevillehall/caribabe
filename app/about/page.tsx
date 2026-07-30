import { ArrowRight, Compass, HeartHandshake, Map, Plane } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DemoShell } from "../components/DemoShell";

export default function AboutPage() {
  return (
    <DemoShell
      eyebrow="Our story"
      title="Built for people who want more than the postcard."
      intro="Go Bjoun connects the Caribbean’s everyday magic with travellers curious enough to notice it."
    >
      <section className="about-lead">
        <div>
          <p className="demo-eyebrow">The name</p>
          <h2>“Where will you go?”</h2>
          <p>
            Bjoun is our invitation to move with curiosity. The mark begins as a
            route, becomes a subtle G, and lifts into flight—an identity made for
            the moment a possible trip becomes a real one.
          </p>
          <Link href="/discover" className="demo-primary">
            Start exploring <ArrowRight size={17} />
          </Link>
        </div>
        <div className="about-image">
          <Image src="/images/st-lucia.jpg" alt="" fill sizes="50vw" />
        </div>
      </section>
      <section className="about-values">
        {[
          {
            icon: Compass,
            title: "Discovery before inventory",
            copy: "We begin with what makes a place worth knowing, not what can be sold fastest.",
          },
          {
            icon: Map,
            title: "Open by default",
            copy: "Community mapping gives small, independent places a fairer chance to be found.",
          },
          {
            icon: HeartHandshake,
            title: "Local value stays local",
            copy: "The future marketplace is designed around verified partners and transparent economics.",
          },
          {
            icon: Plane,
            title: "Caribbean, connected",
            copy: "Jamaica is the beginning. Every island guide should feel specific, never copied and pasted.",
          },
        ].map(({ icon: Icon, title, copy }) => (
          <article key={title}>
            <Icon size={22} />
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>
    </DemoShell>
  );
}
