"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

export function DemoShareButton({ title }: { title: string }) {
  const [shared, setShared] = useState(false);

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
      setShared(true);
      window.setTimeout(() => setShared(false), 2200);
    } catch {
      // Dismissing the native share sheet is not an error the demo must surface.
    }
  };

  return (
    <button type="button" onClick={share}>
      {shared ? <Check size={15} /> : <Share2 size={15} />}
      {shared ? "Link copied" : "Share"}
    </button>
  );
}
