import type { Metadata } from "next";
import Image from "next/image";
import { cacheLife } from "next/cache";
import { AwsLogo } from "@/components/aws-logo";
import { OpenSource } from "@/components/open-source";
import { GitHubActivity } from "@/components/github-activity";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ExperienceList } from "@/components/ExperienceList";
import { RightNavbar } from "@/components/RightNavbar";
import { QuickNavigation } from "@/components/quick-navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import SoftPillButton from "@/components/pixel-perfect/soft-pill-button";
import { FlipCoverButton } from "@/components/pixel-perfect/flip-cover-button";
import SocialHoverCard from "@/components/pixel-perfect/social-hover-card";
import { Technology } from "@/components/technology";
import { FooterBackground } from "@/components/FooterBackground";
import { Feedback } from "@/components/feedback";
import { Arrow, ExtLink, Section } from "@/components/ui";
import { SocialGlyph, type SocialKind } from "@/components/social-icon";
import { about, booking, education, experience, feedback, openSource, portfolio, profile, projects, toolkit, wins } from "@/content";
import { getGitHubData } from "@/lib/github";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const index = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#activity" },
  { label: "Open source", href: "#open-source" },
  { label: "Skills", href: "#skills" },
  { label: "Recognition", href: "#wins" },
  { label: "Contact", href: "#contact" },
];

export default async function Home() {
  "use cache";
  cacheLife({ stale: 300, revalidate: 3600, expire: 86400 });
  const github = await getGitHubData();

  return (
    <div className="reference-page">
      <a className="skip-link" href="#main">Skip to content</a>
      <RightNavbar items={index} />
      <main id="main" className="reference-column">
        <div className="profile-banner">
          <Image src="/portfolio/banner.jpg" alt="" fill priority sizes="(min-width: 768px) 640px, 100vw" className="banner-image" />
          <div className="banner-wash" aria-hidden="true" />
          <span className="banner-wordmark">PG.</span>
          <span className="banner-caption">JAIPUR, INDIA <span aria-hidden="true">/</span> PORTFOLIO ’26</span>
        </div>

        <header className="profile-header">
          <div className="profile-identity">
            <div className="profile-photo-frame"><Image src="/portfolio/avatar.png" alt="Prakhar’s GitHub avatar" width={80} height={80} priority /></div>
            <div><h1>{profile.name}<span>.</span></h1><p>{profile.role}</p></div>
          </div>
          <div className="profile-controls"><QuickNavigation items={portfolio.index} /><ThemeToggle /></div>
        </header>

        <div className="reference-content">
          <section id="about" aria-label="About Prakhar" className="profile-intro">
            <p>{profile.tagline}</p>
            <ul className="intro-points">{about.map((paragraph) => <li key={paragraph}>{paragraph}</li>)}</ul>
            <p className="profile-now"><span>Currently</span>{profile.now}</p>
            <p className="profile-availability"><i aria-hidden="true"/>{profile.availability}</p>
            <div className="profile-actions">
              <FlipCoverButton href="/book" label={booking.navLabel} />
              <SoftPillButton as="a" href={`mailto:${profile.email}`} className="profile-email-button"><SocialGlyph kind="email" />Send an email</SoftPillButton>
              <SoftPillButton as="a" href="/resume" className="profile-resume-button">Résumé<Arrow /></SoftPillButton>
            </div>
            <div className="profile-social-block">
              <p>Find me on</p>
              <div className="profile-socials">{profile.links.map((link) => (
                <SocialHoverCard key={link.label} socialName={link.label} href={link.href}><SocialGlyph kind={link.label.toLowerCase() as SocialKind} /><span>{link.label}</span></SocialHoverCard>
              ))}<a className="social-pill aws-pill" href="/aws~env"><AwsLogo small /><span>AWS project ↗</span></a></div>
            </div>
          </section>

          <Section id="experience" title="Experience">
            <ExperienceList items={experience} />
            <Feedback quote={feedback.client} />
          </Section>

          <Section id="projects" title="Projects">
            <ProjectsGrid items={projects} />
          </Section>

          <Section id="activity" title="GitHub activity">
            <GitHubActivity github={github} />
          </Section>

          <Section id="open-source" title="Open source contributions">
            <OpenSource repos={openSource} github={github} />
            <Feedback quote={feedback.upstream} />
          </Section>

          <Section id="skills" title="Skills & technologies">
            <div className="reference-skills">
              {toolkit.map((group) => <div key={group.label}><h3>{group.label}</h3><ul>{group.items.map((name) => <li key={name}><Technology name={name}/></li>)}</ul></div>)}
            </div>
          </Section>

          <Section id="wins" title="Recognition">
            <ul className="reference-recognition">{wins.map((win) => <li key={win.title}><span className="recognition-year">{win.year}</span><h3>{win.title}</h3><p>{win.context}</p></li>)}</ul>
          </Section>

          <Section id="education" title="Education">
            <div className="education-list">{education.map((school) => <article key={school.name}><div><h3>{school.name}</h3><p>{school.degree}</p><p className="education-note">{school.note} · {school.place}</p></div><span>{school.period}</span></article>)}</div>
          </Section>

          <Section id="contact" title="Let’s build something">
            <p className="contact-intro">{portfolio.contactIntro}</p>
            <div className="contact-actions"><FlipCoverButton href="/book" label={booking.navLabel}/><ExtLink href={`mailto:${profile.email}`}>{profile.email}<Arrow /></ExtLink></div>
          </Section>

          <footer className="reference-footer">
            <p className="footer-signature">{profile.name}<span>.</span></p>
            <p>Backend, full-stack & a little curiosity.</p>
            <div><span>© 2026 · {profile.location}</span><a className="link" href="#main">Back to top ↑</a></div>
          </footer>
        </div>
        <div className="reference-footer-grid" aria-hidden="true"><FooterBackground /></div>
      </main>
    </div>
  );
}
