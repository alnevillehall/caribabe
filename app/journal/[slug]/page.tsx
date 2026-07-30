import { ArrowLeft, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoShell } from "../../components/DemoShell";
import { DemoShareButton } from "../../components/DemoShareButton";
import { journalStories } from "../../demo-data";

export function generateStaticParams() {
  return journalStories.map((story) => ({ slug: story.slug }));
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = journalStories.find((item) => item.slug === slug);
  if (!story) notFound();

  return (
    <DemoShell eyebrow={story.eyebrow} title={story.title} intro={story.excerpt}>
      <article className="story-article">
        <div className="story-meta">
          <span><Clock3 size={14} /> {story.readTime} read</span>
          <DemoShareButton title={story.title} />
        </div>
        <div className="story-hero-image">
          <Image src={story.image} alt="" fill sizes="100vw" priority />
        </div>
        <div className="story-copy">
          <p className="story-dek">{story.excerpt}</p>
          <p>
            The best island days rarely begin with a checklist. They begin with
            somebody telling you to take the longer road, arrive before the heat,
            or stay for one more song. This is a demo editorial, written to show
            how Go Bjoun can make local perspective part of planning—not an
            afterthought.
          </p>
          <h2>Start with the people who know the pace</h2>
          <p>
            Leave room between the landmarks. Ask what is cooking, what is
            playing, and where the water is calm today. A good host will change
            your route for the better, and the island will feel less like
            inventory and more like a place you were welcomed into.
          </p>
          <blockquote>
            Go with a plan loose enough for the island to answer back.
          </blockquote>
          <h2>Keep one thing unplanned</h2>
          <p>
            Save the places that pull you in, then build around just two anchors
            per day. The rest belongs to weather, appetite, and whoever you meet
            along the way.
          </p>
          <Link href="/journal"><ArrowLeft size={16} /> Back to the journal</Link>
        </div>
      </article>
    </DemoShell>
  );
}
