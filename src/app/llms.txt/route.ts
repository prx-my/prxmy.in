import { about, education, experience, openSource, profile, projects } from "@/content";

// A plain-text guide for AI tools (https://llmstxt.org), built from the same
// curated copy as the pages so the two cannot disagree.
export function GET() {
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.summary}`,
    "",
    ...about.flatMap((paragraph) => [paragraph, ""]),
    `- Role: ${profile.role}`,
    `- Location: ${profile.location}`,
    `- Email: ${profile.email}`,
    ...profile.links.map((link) => `- ${link.label}: ${link.href}`),
    "",
    "## Pages",
    "",
    `- [Portfolio](${profile.site}/): projects, experience, open source and education`,
    `- [Résumé](${profile.site}/resume): résumé as a PDF`,
    `- [Book a call](${profile.site}/book): schedule a call`,
    "",
    "## Projects",
    "",
    ...projects.map((project) => `- [${project.name}](${profile.site}/projects/${project.slug}): ${project.summary}`),
    "",
    "## Experience",
    "",
    ...experience.map((job) => `- ${job.role}, ${job.org} (${job.period}): ${job.points.join(" ")}`),
    "",
    "## Open source",
    "",
    ...openSource.map((repo) => `- [${repo.org}/${repo.repo}](${repo.href}): ${repo.about}. Merged PRs: ${repo.mergedHref}`),
    "",
    "## Education",
    "",
    ...education.map((school) => `- ${school.degree}, ${school.name} (${school.period})`),
    "",
  ];

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
