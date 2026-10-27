import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      { source: "/aws~env/video", destination: "/aws-env/video", permanent: false },
      { source: "/aws~env/shrey-resume.pdf", destination: "/shrey/resume.pdf", permanent: false },
      { source: "/aws~env/shreyas-resume.pdf", destination: "/shreyas/resume.pdf", permanent: false },
      // www is the canonical host (see metadataBase in src/app/layout.tsx).
      { source: "/:path*", has: [{ type: "host", value: "prxmy.in" }], destination: "https://www.prxmy.in/:path*", permanent: true },
    ];
  },
  // Resume links submitted on the WeMakeDevs form; serve the PDFs at these exact URLs.
  async rewrites() {
    return [
      { source: "/resume.pdf", destination: "/prakhar-resume.pdf" },
      { source: "/shrey/resume.pdf", destination: "/shrey-resume.pdf" },
      { source: "/shreyas/resume.pdf", destination: "/Shreyas_resume.pdf" },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
