import type { Project } from "@/content";
import { Arrow, ExtLink } from "./ui";

export function Projects({ items }: { items: Project[] }) {
  return (
    <div className="project-list">
      {items.map((project, index) => (
        <article key={project.name} className="project-entry">
          <div className="project-meta eyebrow">
            <span>Project {String(index + 1).padStart(2, "0")}</span>
            <span>{project.year}</span>
          </div>
          <h3>{project.name}</h3>
          {project.badge && <p className="project-badge">{project.badge}</p>}
          <p className="project-summary">{project.summary}</p>
          <p className="project-challenge">
            <span>The engineering</span>
            {project.hardPart}
          </p>
          <footer className="project-footer">
            <ul aria-label="Technologies" className="tech-list">
              {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
            <ul className="project-links">
              {project.links.map((link) => (
                <li key={link.label}>
                  <ExtLink href={link.href}>{link.label}<Arrow /></ExtLink>
                </li>
              ))}
            </ul>
          </footer>
        </article>
      ))}
    </div>
  );
}
