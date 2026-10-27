import Link from "next/link";
import type { Project } from "@/content";
import { ProjectVisual } from "./project-visual";
import { Arrow, ExtLink } from "./ui";

export function NoirProjects({ items }: { items: Project[] }) {
  return (
    <div className="case-files">
      {items.map((project, index) => (
        <article key={project.slug} className={`case-file ${index === 0 ? "case-featured" : ""}`}>
          <div className="case-art">
            <div className="case-art-meta"><span>CASE {String(index+1).padStart(2,"0")}</span><span>{project.year}</span></div>
            <Link href={`/projects/${project.slug}`} aria-label={`Explore ${project.name}`} className="case-art-link"><ProjectVisual slug={project.slug}/></Link>
            <span className="case-category">{project.slug === "ecoaudit" ? "Developer tools" : project.slug === "railmind" ? "Decision support" : project.slug === "oracle-academy" ? "Developer tools" : "Civic technology"}</span>
          </div>
          <div className="case-copy">
            <span className="eyebrow case-index">Selected work / {String(index+1).padStart(2,"0")}</span>
            <h3><Link href={`/projects/${project.slug}`}>{project.name}<span aria-hidden="true">↗</span></Link></h3>
            {project.badge && <p className="case-badge">{project.badge}</p>}
            <p className="case-description">{project.summary}</p>
            <details className="case-engineering">
              <summary>The engineering <span aria-hidden="true">+</span></summary>
              <p>{project.hardPart}</p>
            </details>
            <ul className="case-tech" aria-label="Technologies">{project.stack.map(name=><li key={name}>{name}</li>)}</ul>
            <ul className="case-links"><li><Link href={`/projects/${project.slug}`} className="link">Explore project<Arrow/></Link></li>{project.links.map(link=><li key={link.label}><ExtLink href={link.href}>{link.label}<Arrow/></ExtLink></li>)}</ul>
          </div>
        </article>
      ))}
    </div>
  );
}
