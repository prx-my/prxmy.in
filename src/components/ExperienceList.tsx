// Adapted from Ashutoshx7/Portfolio-v2- ExperienceList; native disclosures keep
// the original compact row interaction accessible to keyboard and touch users.
import type { Experience } from "@/content";
import { Arrow, ExtLink } from "./ui";

export function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <div className="reference-experience">
      {items.map((item) => (
        <details key={item.org} className="experience-disclosure">
          <summary>
            <span className="experience-logo" aria-hidden="true">{item.org.slice(0,1)}</span>
            <span className="experience-identity"><strong>{item.org}</strong><span>{item.role}</span></span>
            <span className="experience-dates">{item.period}<span>{item.place}</span></span>
            <span className="experience-chevron" aria-hidden="true">⌄</span>
          </summary>
          <div className="experience-body">
            <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
            {item.links && <ul className="reference-client-links">{item.links.map((link) => <li key={link.href}><ExtLink href={link.href}>{link.label}<Arrow /></ExtLink></li>)}</ul>}
            {item.href && <ExtLink href={item.href} className="agency-link">Visit {item.org}<Arrow /></ExtLink>}
            <p className="data-note">Agency work and outcomes are curated separately from public GitHub activity.</p>
          </div>
        </details>
      ))}
    </div>
  );
}
