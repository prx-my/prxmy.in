"use client";

// Adapted from the cloned Ashutoshx7/Portfolio-v2- ProjectsGrid. The framed
// preview, hover motion, status pill and detail-page links follow its structure.
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content";
import { Technology } from "./technology";

export function ProjectsGrid({ items }: { items: Project[] }) {
  return (
    <div className="reference-projects-grid">
      {items.map((project, index) => (
        <article key={project.slug} className="reference-project-card">
          <Link href={`/projects/${project.slug}`} className="project-preview-link" aria-label={`View ${project.name} project`}>
            <motion.div className="project-preview" initial="rest" whileHover="hover" whileFocus="hover" animate="rest">
              <div className="preview-topline"><span>0{index + 1}</span><span aria-hidden="true">↗</span></div>
              <motion.div className="preview-frame" variants={{rest:{y:0,scale:1},hover:{y:4,scale:.96}}} transition={{duration:.18}}>
                {project.preview ? <Image src={project.preview} alt={`${project.name} demo preview`} fill sizes="(min-width: 768px) 290px, calc(100vw - 64px)" className="project-thumbnail" /> : (
                  <div className={`project-cover project-cover-${project.slug}`}>
                    <span className="cover-label">{project.coverLabel}</span>
                    {project.slug === "railmind" ? <div className="rail-cover-track" aria-hidden="true"><i/><i/><i/><i/><i/></div> : project.slug === "oracle-academy" ? <div className="terminal-cover" aria-hidden="true"><span>$ oracle-academy</span><span>› classes</span><span>› sections</span><span className="terminal-cursor">_</span></div> : <div className="civic-cover" aria-hidden="true"><i/><i/><i/></div>}
                    <strong>{project.name}</strong>
                    <span className="cover-stack">{project.stack.slice(0,3).join(" / ")}</span>
                  </div>
                )}
              </motion.div>
              <motion.span className="preview-open" variants={{rest:{opacity:0,y:-4,x:"-50%"},hover:{opacity:1,y:0,x:"-50%"}}} transition={{duration:.18}}>View project ↗</motion.span>
            </motion.div>
          </Link>
          <div className="project-card-heading">
            <h3><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3>
            <span className="project-state"><i aria-hidden="true"/>{project.slug === "ecoaudit" ? "Building" : project.year}</span>
          </div>
          {project.badge && <p className="project-card-badge">{project.badge}</p>}
          <p className="project-card-description">{project.summary.split(". ")[0].replace(/\.$/, "")}.</p>
          <ul className="project-card-tech" aria-label="Technologies">{project.stack.slice(0,4).map((name) => <li key={name}><Technology name={name}/></li>)}</ul>
          <div className="project-card-links"><Link href={`/projects/${project.slug}`}>View project <span aria-hidden="true">↗</span></Link>{project.links.find(link=>link.label==="Source") && <a href={project.links.find(link=>link.label==="Source")!.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} source code`}>Source <span aria-hidden="true">↗</span></a>}</div>
        </article>
      ))}
    </div>
  );
}
