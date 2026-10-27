import type { Metadata } from "next";
import Link from "next/link";
import { EditorialPage } from "@/components/editorial-page";
import { AwsLogo } from "@/components/aws-logo";
import { SocialIcon, type SocialKind } from "@/components/social-icon";
import { awsVideo, projects } from "@/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata({ title: "aws~env", description: `${awsVideo.title}. The team behind EcoAudit at WeMakeDevs × AWS Environmental Hacks.`, path: "/aws~env" }),
  robots: { index: false },
};

const people: {
  name: string;
  href: string;
  socials: Partial<Record<SocialKind, string>>;
}[] = [
  {
    name: "Prakhar",
    href: "/resume.pdf",
    socials: {
      github: "https://github.com/prx-my",
      linkedin: "https://www.linkedin.com/in/prxmy/",
      x: "https://x.com/_prxmy",
      email: "mailto:prakhar06.work@gmail.com",
    },
  },
  {
    name: "Medhansh",
    href: "https://medhanshk.me/resume",
    socials: {
      github: "https://github.com/Medhansh-741",
      linkedin: "https://www.linkedin.com/in/medhansh-kapoor",
      x: "https://x.com/medhansh541",
      email: "mailto:medhansh541@gmail.com",
    },
  },
  {
    name: "Shrey",
    href: "/shrey/resume.pdf",
    socials: {
      github: "https://github.com/MrPanda009",
      linkedin: "https://www.linkedin.com/in/shrey-singh-70898237b/",
      email: "mailto:shrey33005@gmail.com",
    },
  },
  {
    name: "Shreyas",
    href: "/shreyas/resume.pdf",
    socials: {
      github: "https://github.com/shryssssss-maker",
      linkedin: "https://www.linkedin.com/in/shreyas-singh-bbbb20384/",
      x: "https://x.com/shrysss3",
      email: "mailto:shreyassingh265@gmail.com",
    },
  },
];

const order: SocialKind[] = ["github", "linkedin", "x", "email"];

export default function AwsEnv() {
  return (
    <EditorialPage current="aws">
      <header className="editorial-heading aws-heading">
        <div>
          <p className="eyebrow">WeMakeDevs × AWS Environmental Hacks</p>
          <h1>aws~env<span>.</span></h1>
          <p className="editorial-lead">A closer look at the cost of code.</p>
        </div>
        <AwsLogo />
      </header>

      <dl className="aws-footprint" aria-label="Environmental footprint categories">
        <div><dt>01 / Energy</dt><dd>Compute has a cost.</dd></div>
        <div><dt>02 / Carbon</dt><dd>Make emissions visible.</dd></div>
        <div><dt>03 / Water</dt><dd>Look beyond the code.</dd></div>
      </dl>

      <div className="aws-layout">
        <section aria-labelledby="demo-heading" className="aws-demo">
          <div className="editorial-section-label"><span className="eyebrow">01 / The demo</span><h2 id="demo-heading">EcoAudit</h2></div>
          <figure className="aws-video">
            <div className="aws-video-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${awsVideo.id}`}
                title={awsVideo.title}
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <figcaption><span>{awsVideo.title}</span><a href="/aws-env/video" className="link">Full screen <span aria-hidden="true">↗</span></a></figcaption>
          </figure>
          <div className="aws-project-note">
            <p className="eyebrow">Behind the build</p>
            <p>Find the waste.<br/>Follow the evidence.</p>
            <p className="aws-project-description">{projects.find(project => project.slug === "ecoaudit")?.summary}</p>
            <div className="aws-project-links">
              <Link href="/projects/ecoaudit" className="noir-button noir-button-red">Explore the project ↗</Link>
              <a href="https://github.com/AWS-env/environmental-hacks" target="_blank" rel="noopener noreferrer" className="link">View source ↗</a>
            </div>
          </div>
        </section>

        <nav aria-labelledby="team-heading" className="aws-team">
          <div className="editorial-section-label"><span className="eyebrow">02 / The people</span><h2 id="team-heading">Meet the team<span>.</span></h2></div>
          <p className="aws-team-intro">Four developers. One shared build.<br/>Résumés and places to find us.</p>
          <ul className="aws-team-list">
            {people.map((p, index) => (
              <li key={p.name}>
                <span className="eyebrow team-number">0{index + 1}</span>
                <div>
                  <a href={p.href} className="team-name link">{p.name} <span aria-hidden="true">↗</span></a>
                  <p className="team-resume">View résumé</p>
                  <ul className="team-socials" aria-label={`${p.name}'s links`}>
                    {order.map((k) => p.socials[k] && <li key={k}><SocialIcon kind={k} href={p.socials[k]!} person={p.name} /></li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </EditorialPage>
  );
}
