import type { Metadata } from "next";
import { profile } from "@/content";

export const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Prakhar Gupta — Backend & Full-Stack Developer. Client work, open source, and independent builds.",
};

// Nested metadata fields such as openGraph are replaced, not merged, so every
// page sets them in full instead of inheriting the home page's.
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} · ${profile.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: `${profile.brand} · ${profile.name}`, locale: "en_IN", type: "website", images: [socialImage] },
    twitter: { card: "summary_large_image", creator: "@_prxmy", title: fullTitle, description, images: [socialImage] },
  };
}
