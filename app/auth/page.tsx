import { Suspense } from "react";
import AuthClient from "./AuthClient";

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="demo-route-loading">Opening your passport…</div>}>
      <AuthClient />
    </Suspense>
  );
}
