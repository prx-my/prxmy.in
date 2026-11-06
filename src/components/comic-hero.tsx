import Image from "next/image";
import { booking, hero, profile } from "@/content";
import { Arrow, ExtLink } from "@/components/ui";

// The homepage splash: the portfolio as a comic page being made.
// The art panel arrives as light-blue pencils and is inked in on load,
// echoing how a comic (and a product) moves from sketch to finished work.
export function ComicHero() {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section className="comic-hero page-width" aria-labelledby="hero-heading">
      <div className="comic-hero-copy">
        <p className="eyebrow comic-page-label">{hero.pageLabel}</p>
        <h1 id="hero-heading" className="comic-name">
          <span>{first}</span> <span>{rest.join(" ")}</span>
        </h1>
        <p className="comic-role"><span>{profile.role}</span></p>
        <p className="comic-intro">{hero.intro}</p>

        <div className="comic-cta-row">
          <a href="/book" className="comic-cta">
            <span>{hero.cta}</span>
            <span aria-hidden="true">↗</span>
            <svg className="comic-cta-border" viewBox="0 0 220 60" preserveAspectRatio="none" aria-hidden="true">
              <path d="M3 4.5 L217 2.5 L216.5 57 L2 58.5 Z" />
              <path d="M6 2 L214 5 L218.5 55 L4.5 56 Z" />
            </svg>
          </a>
          <p className="pencil-note">
            <svg viewBox="0 0 60 40" aria-hidden="true"><path d="M56 34 C40 36 18 30 8 10" /><path d="M2 16 L8 9 L15 14" /></svg>
            <span>{hero.ctaNote}</span>
          </p>
        </div>

        <div className="comic-secondary">
          <a href="#projects" className="link">See the work<Arrow /></a>
          <span aria-hidden="true">/</span>
          <a href="/resume" className="link">Résumé<Arrow /></a>
          <span aria-hidden="true">/</span>
          <a href="/book" className="link">{booking.navLabel}<Arrow /></a>
        </div>
        <ul className="hero-social-links">
          {profile.links.map((link) => (
            <li key={link.label}><ExtLink href={link.href}>{link.label}<Arrow /></ExtLink></li>
          ))}
        </ul>
      </div>

      <figure className="comic-panel-wrap">
        <div className="comic-panel">
          {/* Finished inks */}
          <Image
            src="/art/the-night-shift.webp"
            alt="Original noir illustration: a detective at a desk, studying diagrams under a red lamp"
            width={1000}
            height={1250}
            priority
            sizes="(min-width: 1100px) 440px, (min-width: 800px) 40vw, calc(100vw - 48px)"
            className="comic-panel-ink"
          />
          {/* Pencil pass, wiped away as the ink arrives */}
          <Image
            src="/art/the-night-shift.webp"
            alt=""
            aria-hidden="true"
            width={1000}
            height={1250}
            sizes="(min-width: 1100px) 440px, (min-width: 800px) 40vw, calc(100vw - 48px)"
            className="comic-panel-pencil"
          />
          <div className="comic-focus-lines" aria-hidden="true" />
          <div className="comic-rain" aria-hidden="true" />

          <svg className="comic-thought" viewBox="0 0 160 110" aria-hidden="true">
            <g className="cloud-outline">
              <circle cx="44" cy="46" r="26" /><circle cx="78" cy="34" r="30" /><circle cx="114" cy="42" r="26" />
              <circle cx="100" cy="66" r="24" /><circle cx="60" cy="68" r="24" />
              <circle cx="38" cy="94" r="7" /><circle cx="24" cy="106" r="4" />
            </g>
            <g className="cloud-fill">
              <circle cx="44" cy="46" r="23.5" /><circle cx="78" cy="34" r="27.5" /><circle cx="114" cy="42" r="23.5" />
              <circle cx="100" cy="66" r="21.5" /><circle cx="60" cy="68" r="21.5" />
              <circle cx="38" cy="94" r="4.5" /><circle cx="24" cy="106" r="1.5" />
            </g>
            <g className="cloud-dots"><circle cx="64" cy="52" r="4" /><circle cx="80" cy="52" r="4" /><circle cx="96" cy="52" r="4" /></g>
          </svg>

          <svg className="comic-burst" viewBox="0 0 120 100" aria-hidden="true">
            <polygon points="60,4 70,30 104,14 88,42 118,52 86,62 98,94 66,76 46,98 44,68 6,74 30,50 4,28 38,30 30,6" />
          </svg>

          <div className="comic-panel-edge" aria-hidden="true" />
        </div>
        <figcaption>
          <span>{hero.figLabel}</span>
          <span>{hero.figCaption}</span>
        </figcaption>
      </figure>
    </section>
  );
}
