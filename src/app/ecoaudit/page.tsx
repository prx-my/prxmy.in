import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiArxiv, SiX } from "react-icons/si";
import { awsVideo } from "@/content";
import "./page.css";

const headline = Newsreader({ subsets: ["latin"], weight: "600" });

const sourceUrl = "https://github.com/AWS-env/environmental-hacks";
const appUrl = "https://main.dz3ac51z9uzpr.amplifyapp.com/";
const paperUrl = "https://arxiv.org/pdf/2604.04809";
const articleUrl = "https://news.mit.edu/2025/explained-generative-ai-environmental-impact-0117";
const description = "EcoAudit helps spot unnecessary work that can waste computing power and energy. It checks code, AWS logs, and test reports without building or running your app. No LLM. No machine learning.";

export const metadata: Metadata = {
  title: { absolute: "EcoAudit — Software sustainability, backed by evidence" },
  description,
  applicationName: "EcoAudit",
  icons: { icon: [{ url: "/ecoaudit/favicon.ico", type: "image/x-icon" }, { url: "/ecoaudit/icon.svg", type: "image/svg+xml" }] },
  alternates: { canonical: "/ecoaudit" },
  openGraph: {
    title: "EcoAudit — Find avoidable compute waste",
    description,
    url: "/ecoaudit",
    siteName: "EcoAudit",
    type: "website",
    images: [{ url: "/portfolio/ecoaudit.jpg", alt: "EcoAudit project introduction" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoAudit — Find avoidable compute waste",
    description,
    images: ["/portfolio/ecoaudit.jpg"],
  },
  robots: { index: false },
};

const people = [
  { name: "Prakhar", icon: "/ecoaudit/team/prakhar.svg", portfolio: "https://prxmy.in", resume: "/resume.pdf", github: "https://github.com/prx-my", linkedin: "https://www.linkedin.com/in/prxmy/", x: "https://x.com/_prxmy", email: "prakhar06.work@gmail.com" },
  { name: "Medhansh", icon: "/ecoaudit/team/medhansh.svg", portfolio: "https://medhanshk.me", resume: "https://medhanshk.me/resume", github: "https://github.com/Medhansh-741", linkedin: "https://www.linkedin.com/in/medhansh-kapoor", x: "https://x.com/medhansh541", email: "medhansh541@gmail.com" },
  { name: "Shrey", icon: "/ecoaudit/team/shrey.png", portfolio: "https://folio-temp-one.vercel.app/", resume: "/shrey/resume.pdf", github: "https://github.com/MrPanda009", linkedin: "https://www.linkedin.com/in/shrey-singh-70898237b/", x: "https://x.com/MrPanda009w", email: "shrey33005@gmail.com" },
  { name: "Shreyas", icon: "/ecoaudit/team/shreyas-custom.png", portfolio: "https://shreyas-opal.vercel.app/", resume: "/shreyas/resume.pdf", github: "https://github.com/shryssssss-maker", linkedin: "https://www.linkedin.com/in/shreyas-singh-bbbb20384/", x: "https://x.com/shrysss3", email: "shreyassingh265@gmail.com" },
];
const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function AwsEnv() {
  return (
    <div className="eco-page" id="top">
      <a href="#main" className="eco-skip">Skip to content</a>
      <header className="eco-masthead eco-width">
        <a href="#top" className="eco-brand" aria-label="EcoAudit, top of page">
          <Image src="/ecoaudit/icon.svg" width={32} height={32} alt="" />
          EcoAudit
        </a>
        <nav aria-label="Project navigation" className="eco-navigation">
          <a href="#overview">Overview</a>
          <a href="#demo">Demo</a>
          <a href="#research">Research</a>
          <a href="#team">Team</a>
          <a href={sourceUrl} {...external}>Repository</a>
          <a href={appUrl} {...external} className="eco-navAction">Deployed app</a>
        </nav>
      </header>

      <main id="main" className="eco-width">
        <div className="eco-opening">
          <section id="overview" className="eco-summary" aria-labelledby="project-title">
            <h1 id="project-title" className={headline.className}>Find Avoidable Compute Waste.</h1>
            <p className="eco-description">EcoAudit flags waste such as repeated database queries and excess memory use.</p>
            <p className="eco-principles"><strong>No LLM. No machine learning. EcoAudit never builds or runs your app.</strong></p>

            <h2 id="inputs-title" className="eco-inputIntro">Three inputs drive the analysis</h2>
            <ul className="eco-inputs" aria-labelledby="inputs-title">
              <li><strong>Code:</strong> <span>From a public GitHub repo or a local project.</span></li>
              <li><strong>AWS logs:</strong> <span>Logs and monitoring data via read-only access.</span></li>
              <li><strong>Test reports and profiles:</strong> <span>From tests you run in your own environment.</span></li>
            </ul>
            <p className="eco-analysis">EcoAudit applies rules to the inputs you provide and shows the evidence behind each finding and what to improve.</p>
            <div className="eco-projectLinks">
              <a href={sourceUrl} {...external} className="eco-primary">GitHub repository</a>
              <a href={appUrl} {...external} className="eco-primary">Deployed app</a>
              <a href={sourceUrl + "#run-the-scanner-locally"} {...external} className="eco-local">Run locally</a>
            </div>
          </section>

          <section id="demo" className="eco-demo" aria-labelledby="demo-title">
            <div className="eco-sectionHeading">
              <h2 id="demo-title">Project demo</h2>
              <Link href="/ecoaudit/video" className="eco-fullScreen">Full screen</Link>
            </div>
            <div className="eco-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${awsVideo.id}?rel=0`}
                title="EcoAudit project demonstration"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </section>

          <section id="research" className="eco-research" aria-labelledby="research-title">
            <h2 id="research-title">Research basis</h2>
            <ul className="eco-researchEntries">
              <li>
                <a href={paperUrl} {...external} className="eco-sourceArxiv" title="Watts This Smell: A Comprehensive Taxonomy of Software Energy Smells">
                  <SiArxiv className="eco-sourceIcon" aria-hidden="true" />
                  <span>
                    <span className="eco-sourceLabel">arXiv · Research paper</span>
                    <span className="eco-researchTitle">Watts This Smell</span>
                    <span className="eco-researchNote">Strengthened our approach during development.</span>
                    <span className="eco-previewCredit">Mehditabar, Rajput &amp; Sharma · CC BY 4.0</span>
                  </span>
                  <span className="eco-researchPreview eco-paperPreview">
                    <Image src="/ecoaudit/watts-this-smell.png" fill sizes="(max-width: 760px) 76px, 112px" alt="First page of the paper" />
                    <FiArrowUpRight className="eco-sourceArrow" aria-hidden="true" />
                  </span>
                </a>
              </li>
              <li>
                <a href={articleUrl} {...external} className="eco-sourceMit" title="Explained: Generative AI’s environmental impact">
                  <Image src="/ecoaudit/mit-news.svg" className="eco-sourceIcon" width={24} height={24} alt="" />
                  <span>
                    <span className="eco-sourceLabel">MIT News · Article</span>
                    <span className="eco-researchTitle">Generative AI’s environmental impact</span>
                    <span className="eco-researchNote">Reinforced the environmental problem after we built EcoAudit.</span>
                    <span className="eco-previewCredit">Image: iStock; edited by MIT News</span>
                  </span>
                  <span className="eco-researchPreview">
                    <Image src="/ecoaudit/mit-ai-climate.jpg" fill sizes="(max-width: 760px) 76px, 112px" alt="Laptop connected to rows of servers" />
                    <FiArrowUpRight className="eco-sourceArrow" aria-hidden="true" />
                  </span>
                </a>
              </li>
            </ul>
          </section>

          <section id="team" className="eco-team" aria-labelledby="team-title">
            <h2 id="team-title">Team</h2>
            <ul className="eco-people">
              {people.map((person) => (
                <li key={person.name}>
                  <h3><Image src={person.icon} width={24} height={24} alt="" />{person.name}</h3>
                  <nav aria-label={`${person.name}’s links`} className="eco-personLinks">
                    <div className="eco-profileActions">
                      <a href={person.resume} {...external} aria-label={`View ${person.name}’s résumé`}>Résumé</a>
                      <a href={person.portfolio} {...external} aria-label={`Open ${person.name}’s portfolio`}>Portfolio</a>
                    </div>
                    <div className="eco-contactLinks">
                      <a href={person.github} {...external} aria-label={`${person.name} on GitHub`} title="GitHub"><FiGithub aria-hidden="true" /></a>
                      <a href={person.linkedin} {...external} aria-label={`${person.name} on LinkedIn`} title="LinkedIn"><FiLinkedin aria-hidden="true" /></a>
                      <a href={`mailto:${person.email}`} aria-label={`Email ${person.name}`} title="Email"><FiMail aria-hidden="true" /></a>
                      {person.x && <a href={person.x} {...external} aria-label={`${person.name} on X`} title="X"><SiX aria-hidden="true" /></a>}
                    </div>
                  </nav>
                </li>
              ))}
            </ul>
          </section>
        </div>

      </main>
      <footer className="eco-footer eco-width">
        <p className="eco-hackathon">
          <a href="https://techfest.org/competitions/aws" {...external}>Campus to Cloud Hackathon · Techfest, IIT Bombay</a>
          <span>Sponsored by AWS</span>
        </p>
        <p>EcoAudit · <a href={`${sourceUrl}/blob/main/LICENSE`} {...external}>MIT License</a></p>
      </footer>
    </div>
  );
}
