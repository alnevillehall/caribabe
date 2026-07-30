import { ArrowRight, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DemoShell } from "../components/DemoShell";
import { journalStories } from "../demo-data";

export default function JournalPage() {
  const [lead, ...stories] = journalStories;

  return (
    <DemoShell
      eyebrow="Go Bjoun journal"
      title="Stories with sand in their shoes."
      intro="Local voices, slow routes, good tables, and the details that make an island stay with you."
    >
      <section className="journal-lead">
        <div className="journal-lead-image">
          <Image src={lead.image} alt="" fill sizes="(max-width: 800px) 100vw, 60vw" priority />
        </div>
        <div>
          <p className="demo-eyebrow">{lead.eyebrow}</p>
          <h2>{lead.title}</h2>
          <p>{lead.excerpt}</p>
          <span><Clock3 size={14} /> {lead.readTime} read</span>
          <Link href={`/journal/${lead.slug}`}>
            Read the story <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="journal-grid">
        {stories.map((story) => (
          <article key={story.slug}>
            <Link href={`/journal/${story.slug}`}>
              <div>
                <Image
                  src={story.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                />
              </div>
              <small>{story.eyebrow}</small>
              <h2>{story.title}</h2>
              <p>{story.excerpt}</p>
              <span><Clock3 size={14} /> {story.readTime} read</span>
            </Link>
          </article>
        ))}
      </section>
    </DemoShell>
  );
}
