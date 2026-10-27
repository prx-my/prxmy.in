import type { Metadata } from "next";
import Image from "next/image";
import { cacheLife } from "next/cache";
import { about, booking, education, experience, feedback, openSource, portfolio, profile, projects, toolkit, wins } from "@/content";
import { getGitHubData } from "@/lib/github";
import { QuickNavigation } from "@/components/quick-navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { NoirProjects } from "@/components/noir-projects";
import { SectionTitle, TextButton, WebLines } from "@/components/noir-details";
import { Arrow, ExtLink } from "@/components/ui";
import { OpenSource } from "@/components/open-source";
import { GitHubActivity } from "@/components/github-activity";
import { Feedback } from "@/components/feedback";
import { VisitorCounter } from "@/components/visitor-counter";
import { homeStructuredData, serializeJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  "use cache";
  cacheLife({ stale: 300, revalidate: 3600, expire: 86400 });
  const github = await getGitHubData();

  return (
    <div className="noir-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeStructuredData()) }} />
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="noir-header page-width">
        <div className="noir-masthead">
          <a className="noir-wordmark" href="#main" aria-label="Prakhar Gupta, home">PG<span>.</span></a>
          <nav aria-label="Main navigation"><a href="#projects">The work</a><a href="#about">About</a><a href="#open-source">Open source</a><a href="#contact">Contact</a></nav>
          <div className="masthead-tools"><QuickNavigation items={portfolio.index}/><ThemeToggle/></div>
        </div>
      </header>
      <main id="main">
        <section className="noir-hero page-width" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <h1 id="hero-heading"><span>Prakhar</span>{" "}<span>Gupta<span className="red-period">.</span></span></h1>
            <p className="hero-role">{profile.role}</p>
            <div className="hero-buttons"><TextButton href="#projects" variant="red">View the work</TextButton><TextButton href="/resume" variant="outline">Résumé</TextButton></div>
            <div className="hero-secondary"><a href="/book" className="link">{booking.navLabel}<Arrow/></a><span aria-hidden="true">/</span><a href="/aws~env" className="link">The AWS project<Arrow/></a></div>
            <ul className="hero-social-links">{profile.links.map(link=><li key={link.label}><ExtLink href={link.href}>{link.label}<Arrow/></ExtLink></li>)}</ul>
          </div>
          <figure className="hero-illustration">
            <div className="hero-art-frame"><Image src="/art/the-night-shift.webp" alt="Original noir illustration: a detective at a desk, studying diagrams under a red lamp" width={1000} height={1250} priority sizes="(min-width: 1100px) 420px, (min-width: 720px) 40vw, calc(100vw - 64px)"/><div className="hero-art-edge" aria-hidden="true"/></div>
            <span className="hero-art-tag">The night shift</span>
            <figcaption><span>Fig. 01</span><span>Curiosity doesn’t clock out.</span></figcaption>
          </figure>
          <WebLines className="hero-web"/>
        </section>

        <div className="work-wire page-width" aria-label="Work overview">
          <a href="#experience"><span>01</span><div><strong>Client work</strong><p>Currently at Schrader</p></div><span aria-hidden="true">↗</span></a>
          <a href="#open-source"><span>02</span><div><strong>Open source</strong><p>OWASP · Sugar Labs · FaceGate</p></div><span aria-hidden="true">↗</span></a>
          <a href="#projects"><span>03</span><div><strong>Independent builds</strong><p>Tools with a job to do</p></div><span aria-hidden="true">↗</span></a>
        </div>

        <section id="projects" className="noir-section page-width" aria-labelledby="projects-heading">
          <div id="projects-heading"><SectionTitle title="Projects"/></div>
          <NoirProjects items={projects}/>
        </section>

        <section id="about" className="noir-section page-width about-section" aria-labelledby="about-heading">
          <div id="about-heading"><SectionTitle title="About"/></div>
          <div className="about-layout">
            <p className="about-lead">{profile.tagline}</p>
            <div className="about-body">{about.map(paragraph=><p key={paragraph}>{paragraph}</p>)}<p className="now-note"><span>On the desk</span>{profile.now}</p></div>
          </div>
          <div className="toolkit-strip">{toolkit.map(group=><div key={group.label}><h3>{group.label}</h3><p>{group.items.join(" · ")}</p></div>)}</div>
        </section>

        <section id="experience" className="noir-section page-width" aria-labelledby="experience-heading">
          <div id="experience-heading"><SectionTitle title="Experience"/></div>
          <div className="experience-layout">
            <div className="experience-timeline">{experience.map(job=><article key={job.org}><p className="eyebrow job-date">{job.period}</p><h3>{job.href ? <ExtLink href={job.href}>{job.org}<Arrow/></ExtLink> : job.org}</h3><p className="job-role">{job.role}</p><p className="job-place">{job.place}</p><ul className="experience-points">{job.points.map(point=><li key={point}>{point}</li>)}</ul>{job.links && <ul className="client-links">{job.links.map(link=><li key={link.href}><ExtLink href={link.href}>{link.label}<Arrow/></ExtLink></li>)}</ul>}<p className="data-note">Agency outcomes are curated separately from public GitHub activity.</p></article>)}</div>
            <aside className="client-note"><span className="note-pin" aria-hidden="true"/><Feedback quote={feedback.client}/></aside>
          </div>
        </section>

        <section id="open-source" className="ink-section noir-section" aria-labelledby="oss-heading">
          <div className="page-width ink-inner"><div id="oss-heading"><SectionTitle title="Open source"/></div><p className="ink-intro">Security tooling. Music education. A safer desktop.<br/>A few places where I’ve left the code better.</p><div className="oss-reading"><OpenSource repos={openSource} github={github}/><Feedback quote={feedback.upstream}/></div><WebLines className="ink-web"/></div>
        </section>

        <section id="activity" className="noir-section page-width activity-section" aria-labelledby="activity-heading">
          <div id="activity-heading"><SectionTitle title="GitHub activity"/></div>
          <div className="activity-sheet"><div className="sheet-rule" aria-hidden="true"/><GitHubActivity github={github}/></div>
        </section>

        <div className="page-width closing-columns">
          <section id="wins" className="noir-section" aria-labelledby="wins-heading"><div id="wins-heading"><SectionTitle title="Recognition"/></div><ul className="noir-wins">{wins.map(win=><li key={win.title}><span>{win.year}</span><div><h3>{win.title}</h3><p>{win.context}</p></div></li>)}</ul></section>
          <section id="education" className="noir-section" aria-labelledby="education-heading"><div id="education-heading"><SectionTitle title="Education"/></div><div className="education-list">{education.map(school=><article key={school.name}><span className="eyebrow">{school.period}</span><h3>{school.name}</h3><p>{school.degree}</p><p className="education-note">{school.note} · {school.place}</p></article>)}</div></section>
        </div>

        <section id="contact" className="noir-contact noir-section" aria-labelledby="contact-heading">
          <div className="page-width contact-layout">
            <div><h2 id="contact-heading">Let’s build<br/><em>something</em><span>.</span></h2></div>
            <div className="contact-copy"><p>{portfolio.contactIntro}</p><TextButton href="/book" variant="red">{booking.navLabel}</TextButton><ExtLink href={`mailto:${profile.email}`} className="contact-email">{profile.email}<Arrow/></ExtLink></div>
            <WebLines className="contact-web"/>
          </div>
          <footer className="page-width noir-footer"><span className="footer-mark">PG.</span><p>© 2026 Prakhar Gupta · Jaipur, India</p><ul>{profile.links.map(link=><li key={link.label}><ExtLink href={link.href}>{link.label}<Arrow/></ExtLink></li>)}</ul><a href="#main" className="back-top" aria-label="Back to top">↑</a></footer>
          <VisitorCounter />
        </section>
      </main>
    </div>
  );
}
