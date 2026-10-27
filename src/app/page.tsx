import { education, experience, openSource, profile, projects, wins } from "@/content";
import "./portfolio.css";

const featuredNames = ["Ecoaudit", "Bhumi Vikas Sahayak", "JanSamadhan", "Clarity SMS"];
const featured = featuredNames
  .map((name) => projects.find((project) => project.name === name))
  .filter((project): project is (typeof projects)[number] => Boolean(project));
const moreWork = projects.filter((project) => !featuredNames.includes(project.name));

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <span>0{index + 1} / SELECTED WORK</span><span>{project.year}</span>
      </div>
      <div>
        <p className="project-badge">{project.badge ?? "Independent project"}</p>
        <h3>{project.name}</h3>
        <p className="project-summary">{project.summary}</p>
        <p className="project-challenge">{project.hardPart}</p>
      </div>
      <div className="project-card-bottom">
        <span>{project.stack.slice(0, 4).join(" / ")}</span>
        <div>{project.links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>
        ))}</div>
      </div>
    </article>
  );
}

export default function Home() {
  const schrader = experience[0];
  return (
    <main className="portfolio">
      <div className="hero-wrap" id="top">
        <nav className="portfolio-nav page-container" aria-label="Main navigation">
          <a className="wordmark" href="#top" aria-label="Prakhar Gupta, back to top">
            <span className="wordmark-symbol">p.</span><span>prakhar gupta</span>
          </a>
          <div className="nav-links">
            <a href="#work">Work</a><a href="#experience">Experience</a>
            <a href="#open-source">Open source</a><a href="/resume">Resume ↗</a>
          </div>
        </nav>
        <section className="hero page-container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> AVAILABLE FOR SOFTWARE ENGINEERING INTERNSHIPS</p>
            <h1 id="hero-title">Useful software, <em>built to last.</em></h1>
            <p className="hero-intro">I&apos;m Prakhar, a full-stack developer building client websites at Schrader and contributing security fixes to OWASP. I like the hard problems behind simple interfaces.</p>
            <div className="hero-actions">
              <a className="button button-bright" href="#work">Explore my work <span aria-hidden="true">↘</span></a>
              <a className="button button-outline" href={`mailto:${profile.email}`}>Get in touch <span aria-hidden="true">↗</span></a>
            </div>
            <p className="hero-location">Based in Jaipur, India <span aria-hidden="true">•</span> Working globally</p>
          </div>
          <div className="hero-visual" aria-label="Selected work and contribution highlights">
            <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
            <div className="visual-monogram" aria-hidden="true">PG</div>
            <div className="visual-note visual-note-top"><span>NOW BUILDING</span><strong>Schrader Web Solutions</strong><small>Client and agency websites</small></div>
            <div className="visual-note visual-note-bottom"><span>OPEN SOURCE</span><strong>OWASP / cve-lite-cli</strong><small>Security tooling in TypeScript</small></div>
          </div>
        </section>
        <div className="hero-ribbon page-container">
          <span>01 / THE WORK</span><div>Schrader <i /> OWASP <i /> Sugar Labs <i /> Independent projects</div>
          <a href="#experience" aria-label="Scroll to experience">↓</a>
        </div>
      </div>

      <section className="portfolio-section experience-section page-container" id="experience">
        <div className="section-heading">
          <p className="section-kicker">01 / EXPERIENCE</p>
          <h2>Building for real people,<br /><em>with real constraints.</em></h2>
          <p>Production websites, agency collaboration, and products that people actually use.</p>
        </div>
        <article className="experience-feature">
          <div className="experience-feature-side"><span className="live-pill"><span /> CURRENT ROLE</span><p>{schrader.period}</p><p>{schrader.place}</p></div>
          <div className="experience-feature-main">
            <div className="experience-title-row">
              <div><p className="mini-label">WEB DEVELOPER</p><h3>{schrader.org}</h3></div>
              <a href={schrader.href} target="_blank" rel="noopener noreferrer" aria-label="Visit Schrader Web Solutions">↗</a>
            </div>
            <ul>{schrader.points.map((point) => <li key={point}>{point}</li>)}</ul>
            <div className="client-links"><span>SELECTED SITES</span>{schrader.links?.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>
            ))}</div>
          </div>
        </article>
        <div className="earlier-roles">{experience.slice(1).map((role) => (
          <article key={role.org}><span>{role.period}</span><h3>{role.org}</h3><p>{role.role}</p><p>{role.points[0]}</p></article>
        ))}</div>
      </section>

      <section className="portfolio-section work-section" id="work">
        <div className="page-container">
          <div className="section-heading section-heading-inline">
            <div><p className="section-kicker">02 / SELECTED WORK</p><h2>Built for<br /><em>a purpose.</em></h2></div>
            <p>From developer tools to public services, each project starts with a specific problem and ends with something people can try.</p>
          </div>
          <div className="project-grid">{featured.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}</div>
          <div className="more-work"><span>ALSO BUILT</span>{moreWork.map((project) => (
            <a key={project.name} href={project.links[0]?.href ?? "#work"} target="_blank" rel="noopener noreferrer">{project.name} ↗</a>
          ))}</div>
        </div>
      </section>

      <section className="portfolio-section oss-section" id="open-source">
        <div className="page-container">
          <div className="section-heading section-heading-inline">
            <div><p className="section-kicker">03 / OPEN SOURCE</p><h2>Small fixes.<br /><em>Real consequences.</em></h2></div>
            <p>I work on bugs that affect what users see, what a security scan reports, and whether an app behaves reliably.</p>
          </div>
          <div className="oss-list">{openSource.map((repo) => (
            <article className="oss-row" key={repo.href}>
              <div><p className="mini-label">{repo.org}</p><h3><a href={repo.href} target="_blank" rel="noopener noreferrer">{repo.repo} ↗</a></h3><p>{repo.about}</p></div>
              <div className="oss-example"><p>{repo.prs[0]?.title}</p><a href={repo.prs[0]?.href} target="_blank" rel="noopener noreferrer">Read PR #{repo.prs[0]?.number} ↗</a></div>
              <a className="oss-count" href={repo.mergedHref} target="_blank" rel="noopener noreferrer"><strong>{repo.mergedCount}</strong><span>merged PRs ↗</span></a>
            </article>
          ))}</div>
        </div>
      </section>

      <section className="portfolio-section close-section page-container" id="about">
        <div className="close-grid">
          <div><p className="section-kicker">04 / ABOUT</p><h2>Curious about the<br /><em>details that matter.</em></h2>
            <p className="about-copy">I&apos;m a Computer Science student at Manipal University Jaipur. I care about clear interfaces, sound engineering, and proving that a system works beyond the happy path.</p>
            <p className="about-copy">Recent work spans agency sites, open-source security fixes, and civic technology for Delhi.</p>
            <a className="text-link" href="/resume">Read my resume ↗</a>
          </div>
          <div className="close-details">
            <div><p className="mini-label">RECOGNITION</p>{wins.map((win) => <p key={win.title}><strong>{win.title}</strong><span>{win.context} · {win.year}</span></p>)}</div>
            <div><p className="mini-label">EDUCATION</p>{education.slice(0, 1).map((school) => <p key={school.name}><strong>{school.name}</strong><span>{school.degree} · {school.period}</span></p>)}</div>
          </div>
        </div>
      </section>

      <footer className="portfolio-footer"><div className="page-container">
        <p className="section-kicker">LET&apos;S CONNECT</p><h2>Have a problem<br /><em>worth solving?</em></h2>
        <a className="footer-email" href={`mailto:${profile.email}`}>{profile.email} ↗</a>
        <div className="footer-bottom"><span>© 2026 Prakhar Gupta · Jaipur, India</span><div>
          {profile.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}
          <a href="#top">Back to top ↑</a>
        </div></div>
      </div></footer>
    </main>
  );
}
