import { education, experience, profile } from "@/content";

// Identity graph for the home page. Every value comes from src/content.ts,
// so the schema cannot drift from the visible copy.
export function homeStructuredData() {
  const personId = `${profile.site}/#person`;
  const websiteId = `${profile.site}/#website`;
  const year = new Date().getFullYear();
  const studying = education.filter((school) => Number(school.period.slice(-4)) > year);
  const finished = education.filter((school) => !studying.includes(school));

  const person = {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    url: profile.site,
    jobTitle: profile.role,
    description: profile.tagline,
    address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressCountry: "IN" },
    worksFor: experience
      .filter((job) => job.period.endsWith("Present"))
      .map((job) => ({ "@type": "Organization", name: job.org, url: job.href })),
    // Only schools already finished count as alumni; the current one is an affiliation.
    alumniOf: finished.map((school) => ({ "@type": "EducationalOrganization", name: school.name })),
    affiliation: studying.map((school) => ({ "@type": "EducationalOrganization", name: school.name })),
    sameAs: profile.links.map((link) => link.href),
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: profile.site,
    name: profile.name,
    inLanguage: "en",
    publisher: { "@id": personId },
  };

  const webpage = {
    "@type": "ProfilePage",
    "@id": `${profile.site}/#webpage`,
    url: profile.site,
    name: `${profile.name}, ${profile.role}`,
    description: profile.summary,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
  };

  return { "@context": "https://schema.org", "@graph": [person, website, webpage] };
}

// Escape "<" so no value can close the script tag early.
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
