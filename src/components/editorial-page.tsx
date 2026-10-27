import type { ReactNode } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";

export function EditorialPage({ current, children }: { current: "book" | "aws"; children: ReactNode }) {
  return (
    <div className="noir-page editorial-page">
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="page-width noir-masthead editorial-masthead">
        <Link href="/" className="noir-wordmark" aria-label="prxmy — Prakhar Gupta, home"><Wordmark /></Link>
        <nav aria-label="Main navigation">
          <Link href="/#projects">The work</Link>
          <Link href="/aws~env" aria-current={current === "aws" ? "page" : undefined}>AWS project</Link>
          <Link href="/book" aria-current={current === "book" ? "page" : undefined}>Book a call</Link>
        </nav>
        <div className="masthead-tools"><ThemeToggle /></div>
      </header>
      <main id="main" className="page-width editorial-main">{children}</main>
      <footer className="page-width noir-footer editorial-footer">
        <Link href="/" className="footer-mark" aria-label="Back to portfolio"><Wordmark /></Link>
        <p>Prakhar Gupta · Developer</p>
        <Link href="/" className="link editorial-back">← Back to portfolio</Link>
      </footer>
    </div>
  );
}
