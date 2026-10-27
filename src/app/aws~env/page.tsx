import type { Metadata } from "next";
import { AwsLogo } from "@/components/aws-logo";
import { SocialIcon, type SocialKind } from "@/components/social-icon";
import { awsVideo } from "@/content";
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
    <main className="mx-auto max-w-5xl px-6 pt-16 pb-24 sm:pt-24">
      <header className="flex flex-col-reverse gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs tracking-wide text-faint uppercase">Preview</p>
          <h1 className="mt-3 font-serif text-5xl leading-none tracking-tight">aws~env</h1>
        </div>
        <AwsLogo />
      </header>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
      <div>
        <div className="aspect-video w-full overflow-hidden rounded-lg border border-line bg-beige">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${awsVideo.id}`}
            title={awsVideo.title}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="size-full"
          />
        </div>
        <p className="mt-3 text-sm">
          <a
            href="/aws-env/video"
            className="link text-muted transition-colors hover:text-ink focus-visible:text-ink"
          >
            Full screen <span aria-hidden className="text-faint">↗</span>
          </a>
        </p>
      </div>

      <nav aria-label="People" className="min-w-0">
        <ul className="divide-y divide-line border-y border-line">
          {people.map((p) => (
            <li
              key={p.name}
              className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5"
            >
              <a
                href={p.href}
                className="link text-muted transition-colors hover:text-ink focus-visible:text-ink"
              >
                {p.name} <span aria-hidden className="text-faint">↗</span>
              </a>
              <ul className="-mr-1 flex items-center">
                {order.map(
                  (k) =>
                    p.socials[k] && (
                      <li key={k}>
                        <SocialIcon kind={k} href={p.socials[k]!} person={p.name} />
                      </li>
                    ),
                )}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      </div>
    </main>
  );
}
