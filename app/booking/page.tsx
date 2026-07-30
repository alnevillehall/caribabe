import { Suspense } from "react";
import BookingClient from "./BookingClient";

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="demo-route-loading">Preparing your booking…</div>}>
      <BookingClient />
    </Suspense>
  );
}
