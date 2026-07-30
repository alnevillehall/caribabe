"use client";

import { Check } from "lucide-react";
import { useEffect } from "react";

export function DemoToast({
  message,
  onDone,
}: {
  message: string | null;
  onDone: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onDone, 2400);
    return () => window.clearTimeout(timer);
  }, [message, onDone]);

  return message ? (
    <div className="demo-toast" role="status">
      <Check size={17} />
      {message}
    </div>
  ) : null;
}
