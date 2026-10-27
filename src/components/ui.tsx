import type { ReactNode } from "react";

export function Section({
  id,
  title,
  children,
  number,
  intro,
}: {
  id: string;
  title: string;
  children: ReactNode;
  number?: string;
  intro?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="portfolio-section">
      <div className="section-heading">
        {number && <span aria-hidden="true" className="eyebrow section-number">{number}</span>}
        <h2 id={`${id}-heading`}>{title}</h2>
      </div>
      {intro && <p className="section-intro">{intro}</p>}
      {children}
    </section>
  );
}

export function ExtLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={`link ${className}`}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}

export function Arrow() {
  return (
    <span aria-hidden className="ml-0.5 inline-block text-faint">
      ↗
    </span>
  );
}
