import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "caribabe.travel";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Caribabe — The Caribbean, considered",
    description:
      "Discover, plan, book, and experience the most memorable places across the Caribbean.",
    metadataBase: new URL(origin),
    openGraph: {
      title: "Caribabe — Find your own rhythm",
      description:
        "Places with a pulse. People with a story. Go beyond the postcard with Caribabe.",
      type: "website",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1536,
          height: 864,
          alt: "Caribabe — Find your own rhythm",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Caribabe — Find your own rhythm",
      description:
        "A more beautiful way to discover and plan the Caribbean.",
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
