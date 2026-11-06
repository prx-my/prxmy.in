import type { Metadata } from "next";
import Link from "next/link";
import { Booking } from "@/components/booking";
import { booking, profile } from "@/content";

export const metadata: Metadata = {
  title: booking.navLabel,
  description: booking.intro,
  alternates: { canonical: "/book" },
};

export default function Book() {
  return (
    <main className="mx-auto max-w-[680px] px-6 pt-20 pb-28 sm:pt-28">
      <p className="font-mono text-xs tracking-wide text-faint uppercase">{booking.eyebrow}</p>
      <h1 className="mt-3 font-serif text-5xl leading-none tracking-tight">{booking.headline}</h1>
      <p className="mt-4 max-w-md text-lg leading-snug text-muted">{booking.intro}</p>

      <Booking />

      <footer className="mt-20 border-t border-line pt-6 font-mono text-xs text-faint">
        <Link href="/" className="link">
          ← {profile.name}
        </Link>
      </footer>
    </main>
  );
}
