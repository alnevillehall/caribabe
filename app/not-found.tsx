import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";
import { DemoShell } from "./components/DemoShell";

export default function NotFound() {
  return (
    <DemoShell
      eyebrow="Lost, beautifully"
      title="This route drifted off the map."
      intro="The island is still here. Let’s get you back to something worth finding."
    >
      <section className="empty-state">
        <Compass size={32} />
        <h2>Nothing to see at this address</h2>
        <p>Try the full discovery guide or return to the Go Bjoun home page.</p>
        <div className="demo-inline-actions">
          <Link href="/discover" className="demo-primary-button">
            Explore places
          </Link>
          <Link href="/" className="demo-secondary-button">
            <ArrowLeft size={16} /> Back home
          </Link>
        </div>
      </section>
    </DemoShell>
  );
}
