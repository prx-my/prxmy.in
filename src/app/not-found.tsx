import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { TextButton, WebLines } from "@/components/noir-details";

export const metadata: Metadata = {
  title: "Page not found · Prakhar Gupta",
  description: "This trail went cold. Head back to Prakhar Gupta’s portfolio and explore the projects.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="noir-page lost-page">
      <header className="page-width noir-masthead">
        <Link href="/" className="noir-wordmark" aria-label="Prakhar Gupta, home">PG<span>.</span></Link>
        <ThemeToggle />
      </header>
      <main className="page-width lost-layout">
        <div className="lost-copy">
          <p className="eyebrow">Page not found</p>
          <h1>The trail<br/>went <em>cold.</em></h1>
          <p>This page has slipped off the map. The work is still here — let’s get you back to it.</p>
          <div className="lost-actions">
            <TextButton href="/" variant="red">Back to portfolio</TextButton>
            <Link href="/#projects" className="link">Explore the projects ↗</Link>
          </div>
        </div>
        <div className="lost-case" aria-hidden="true">
          <WebLines className="lost-web" />
          <span className="lost-case-label">CASE NO.</span>
          <span className="lost-code">404</span>
          <span className="lost-stamp">MISSING</span>
          <svg className="lost-glass" viewBox="0 0 160 160" fill="none"><circle cx="65" cy="65" r="44" stroke="currentColor" strokeWidth="8"/><circle cx="65" cy="65" r="33" stroke="currentColor" strokeWidth="1"/><path d="m98 98 43 43" stroke="currentColor" strokeWidth="18"/><path d="M43 52c3-9 10-15 20-16" stroke="var(--signal)" strokeWidth="5"/></svg>
        </div>
      </main>
      <footer className="page-width lost-footer"><span>Prakhar Gupta</span><span>One wrong turn. Plenty left to explore.</span></footer>
    </div>
  );
}
