import type { MetadataRoute } from "next";
import { profile, projects } from "@/content";

// Only indexable pages belong here. /aws~env and /aws-env/video are noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.site, changeFrequency: "monthly", priority: 1 },
    { url: `${profile.site}/resume`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${profile.site}/book`, changeFrequency: "monthly", priority: 0.6 },
    ...projects.map((project) => ({
      url: `${profile.site}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
