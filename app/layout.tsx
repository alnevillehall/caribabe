import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import "./demo.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "bjoun.com";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Go Bjoun — Where will you go?",
    description:
      "Discover and save memorable beaches, food, culture, stays, and adventures across Jamaica.",
    metadataBase: new URL(origin),
    openGraph: {
      title: "Go Bjoun — Where will you go?",
      description:
        "Explore 160 community-mapped places across Jamaica and go beyond the postcard with Go Bjoun.",
      type: "website",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1672,
          height: 941,
          alt: "Go Bjoun — Where will you go?",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Go Bjoun — Where will you go?",
      description:
        "A more beautiful way to discover and plan Jamaica.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
