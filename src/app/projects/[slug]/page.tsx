import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content";
import { Arrow, ExtLink } from "@/components/ui";
import { Technology } from "@/components/technology";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProjectVisual } from "@/components/project-visual";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return {
    title: `${project.name} · Prakhar Gupta`, description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: `${project.name} · Prakhar Gupta`, description: project.summary, type: "website" },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return (
    <main className="project-detail-page">
      <header><Link href="/#projects" className="link">← All projects</Link><ThemeToggle /></header>
      <p className="eyebrow">{project.year}</p>
      <h1>{project.name}<span>.</span></h1>
      {project.badge && <p className="detail-badge">{project.badge}</p>}
      <div className="detail-preview"><ProjectVisual slug={project.slug}/></div>
      <section aria-labelledby="overview"><h2 id="overview">The project</h2><p>{project.summary}</p></section>
      <section aria-labelledby="engineering"><h2 id="engineering">The engineering</h2><p>{project.hardPart}</p></section>
      <section aria-labelledby="stack"><h2 id="stack">Built with</h2><ul className="detail-stack">{project.stack.map((name) => <li key={name}><Technology name={name}/></li>)}</ul></section>
      <ul className="detail-links">{project.links.map((link) => <li key={link.label}><ExtLink href={link.href}>{link.label}<Arrow /></ExtLink></li>)}</ul>
      <footer><Link href="/#projects" className="link">← Back to the portfolio</Link><Link href="/book" className="link">Book a call ↗</Link></footer>
    </main>
  );
}
