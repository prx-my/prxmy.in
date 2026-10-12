import { AwsLogo } from "@/components/aws-logo";
import { Scribble } from "@/components/scribble";
import { OpenSource } from "@/components/open-source";
import { Projects } from "@/components/projects";
import { Arrow, ExtLink, Section } from "@/components/ui";
import {
  about,
  education,
  experience,
  openSource,
  profile,
  projects,
  wins,
} from "@/content";

export default function Home() {
  return (
    <main className="mx-auto max-w-[680px] px-6 pt-20 pb-28 sm:pt-28">
      <header className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-serif text-5xl leading-none tracking-tight">{profile.name}</h1>
          <p className="mt-4 max-w-md text-lg leading-snug text-muted">{profile.tagline}</p>
          <p className="mt-5 text-sm text-muted">
            <span className="mr-2 font-mono text-xs tracking-wide text-faint uppercase">Now</span>
            {profile.now}
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li>
              <ExtLink href={`mailto:${profile.email}`}>{profile.email}</ExtLink>
            </li>
            {profile.links.map((l) => (
              <li key={l.label}>
                <ExtLink href={l.href}>
                  {l.label}
                  <Arrow />
                </ExtLink>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="/resume"
              className="group relative inline-flex items-center gap-1 self-center text-sm font-medium"
            >
              Resume <span aria-hidden className="text-faint">↗</span>
              <Scribble />
            </a>
            <a
              href="/aws~env"
              aria-label="Open the aws~env page"
              className="group relative inline-flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100 focus-visible:opacity-100"
            >
              <AwsLogo small />
              <Scribble flip />
              <span
                aria-hidden
                className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
              >
                ↗
              </span>
            </a>
          </div>
        </div>
        <div
          aria-hidden
          className="flex size-24 shrink-0 items-center justify-center rounded-full border border-line bg-beige font-serif text-4xl tracking-tight select-none sm:size-28 sm:text-[2.6rem]"
        >
          {profile.initials}
        </div>
      </header>

      <Section id="about" title="About">
        <div className="flex flex-col gap-4 leading-relaxed">
          {about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section id="experience" title="Experience">
        <div className="flex flex-col gap-8">
          {experience.map((e) => (
            <div key={e.org}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium">
                  {e.href ? <ExtLink href={e.href}>{e.org}</ExtLink> : e.org}
                  <span className="font-normal text-muted">, {e.role}</span>
                </h3>
                <span className="font-mono text-xs text-faint">{e.period}</span>
              </div>
              <p className="text-sm text-faint">{e.place}</p>
              <ul className="mt-3 flex flex-col gap-2 text-[0.95rem] leading-relaxed text-muted">
                {e.points.map((pt) => (
                  <li key={pt} className="relative pl-4 before:absolute before:left-0 before:content-['–']">
                    {pt}
                  </li>
                ))}
              </ul>
              {e.links && (
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {e.links.map((l) => (
                    <li key={l.href}>
                      <ExtLink href={l.href}>
                        {l.label}
                        <Arrow />
                      </ExtLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects">
        <Projects items={projects} />
      </Section>

      {openSource.length > 0 && (
        <Section id="open-source" title="Open source">
          <OpenSource repos={openSource} />
        </Section>
      )}

      <Section id="wins" title="Recognition">
        <ul className="divide-y divide-line border-y border-line">
          {wins.map((w) => (
            <li key={w.title} className="flex items-baseline justify-between gap-4 py-3">
              <div>
                <p>{w.href ? <ExtLink href={w.href}>{w.title}</ExtLink> : w.title}</p>
                <p className="text-sm text-muted">{w.context}</p>
              </div>
              <span className="font-mono text-xs text-faint">{w.year}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="education" title="Education">
        <div className="flex flex-col gap-5">
          {education.map((s) => (
            <div key={s.name} className="flex flex-wrap items-baseline justify-between gap-x-4">
              <div>
                <h3 className="font-medium">{s.name}</h3>
                <p className="text-sm text-muted">
                  {s.degree}
                  {s.note && <span className="text-faint"> · {s.note}</span>}
                </p>
              </div>
              <span className="font-mono text-xs text-faint">{s.period}</span>
            </div>
          ))}
        </div>
      </Section>

      <footer className="mt-24 border-t border-line pt-10">
        <p className="font-serif text-3xl tracking-tight">Let&apos;s build something.</p>
        <p className="mt-3 max-w-md leading-relaxed text-muted">
          Open to backend and full-stack internships and interesting collaborations.
        </p>
        <ExtLink href={`mailto:${profile.email}`} className="mt-5 inline-block text-lg">
          {profile.email}
        </ExtLink>
        <p className="mt-16 font-mono text-xs text-faint">
          © 2026 {profile.name} · {profile.location}
        </p>
      </footer>
    </main>
  );
}
