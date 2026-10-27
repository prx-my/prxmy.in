import type { NextConfig } from "next";

const dev = process.env.NODE_ENV === "development";

// Next.js hydrates with inline scripts, so script-src keeps 'unsafe-inline';
// nonces would force every page to render dynamically.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  // The résumé page frames its own PDF; the AWS pages embed the demo video.
  "frame-src 'self' https://www.youtube-nocookie.com",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Browser PDF viewers can trip over a page CSP, so PDFs skip it.
      { source: "/((?!.*\\.pdf$).*)", headers: [{ key: "Content-Security-Policy", value: csp }] },
      // Teammates' résumés stay reachable from /aws~env but out of search results for this domain.
      {
        source: "/:file(shrey-resume.pdf|Shreyas_resume.pdf|shrey/resume.pdf|shreyas/resume.pdf)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/aws~env/video", destination: "/aws-env/video", permanent: false },
      { source: "/aws~env/shrey-resume.pdf", destination: "/shrey/resume.pdf", permanent: false },
      { source: "/aws~env/shreyas-resume.pdf", destination: "/shreyas/resume.pdf", permanent: false },
      // www is the canonical host (see metadataBase in src/app/layout.tsx).
      { source: "/:path*", has: [{ type: "host", value: "prxmy.in" }], destination: "https://www.prxmy.in/:path*", permanent: true },
      // The previous portfolio domain. Takes effect once the domain is attached to this Vercel project.
      { source: "/:path*", has: [{ type: "host", value: "(?:www\\.)?prakhargupta\\.me" }], destination: "https://www.prxmy.in/:path*", permanent: true },
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
