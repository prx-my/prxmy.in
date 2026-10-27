// Crawl and metadata smoke test. Run against a local `next start` in CI and
// against production after each deploy and daily:
//   node scripts/smoke.ts [base URL, default http://localhost:3000]
import { argv, exit } from "node:process";

const base = (argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const site = "https://www.prxmy.in";
const failures: string[] = [];

function check(ok: unknown, message: string) {
  if (!ok) failures.push(message);
}

function local(url: string) {
  return url.replace(site, base);
}

async function get(path: string, redirect: RequestRedirect = "manual") {
  return fetch(path.startsWith("http") ? path : `${base}${path}`, { redirect, signal: AbortSignal.timeout(20000) });
}

function tag(html: string, pattern: RegExp) {
  return html.match(pattern)?.[1]?.trim() ?? "";
}

const robots = await (await get("/robots.txt")).text();
check(robots.includes(`Sitemap: ${site}/sitemap.xml`), "robots.txt does not point at the sitemap");
check(!/^Disallow: \/\s*$/m.test(robots), "robots.txt blocks the whole site");

const sitemap = await (await get("/sitemap.xml")).text();
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
check(pages.length > 0, "sitemap.xml lists no URLs");

const titles = new Map<string, string>();
const descriptions = new Map<string, string>();
const links = new Set<string>();

for (const url of pages) {
  const response = await get(local(url));
  if (response.status !== 200) {
    check(false, `${url} returned ${response.status}, expected 200`);
    continue;
  }
  const html = await response.text();
  const title = tag(html, /<title>([^<]*)<\/title>/);
  const description = tag(html, /<meta name="description" content="([^"]*)"/);
  check(title, `${url} has no <title>`);
  check(description, `${url} has no meta description`);
  check(titles.get(title) === undefined, `${url} repeats the title of ${titles.get(title)}`);
  check(descriptions.get(description) === undefined, `${url} repeats the description of ${descriptions.get(description)}`);
  titles.set(title, url);
  descriptions.set(description, url);
  check(tag(html, /<link rel="canonical" href="([^"]*)"/) === url, `${url} canonical is not self-referencing`);
  check(tag(html, /<meta property="og:url" content="([^"]*)"/) === url, `${url} og:url does not match the page`);
  check(html.includes('<meta property="og:image"'), `${url} has no og:image`);
  check(html.includes('<meta name="twitter:card" content="summary_large_image"'), `${url} has no large X card`);
  check(!/<meta name="robots" content="[^"]*noindex/.test(html), `${url} is in the sitemap but noindex`);
  for (const match of html.matchAll(/href="(\/[^"#]*)/g)) {
    if (!match[1].startsWith("/_next/")) links.add(match[1].replace(/&amp;/g, "&"));
  }
}

const home = await (await get("/")).text();
const jsonLd = tag(home, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
try {
  const graph: { "@id"?: string }[] = JSON.parse(jsonLd)["@graph"];
  check(graph.some((node) => node["@id"] === `${site}/#person`), "home JSON-LD has no Person with a stable @id");
} catch {
  check(false, "home JSON-LD is missing or invalid");
}

for (const link of links) {
  const response = await get(link, "follow");
  check(response.ok, `internal link ${link} returned ${response.status}`);
}

// A random slug, so the first request is never a cached response.
const nonce = Math.random().toString(36).slice(2);
for (const path of [`/projects/missing-${nonce}`, `/missing-${nonce}`]) {
  check((await get(path)).status === 404, `${path} should return 404`);
}

const aws = await (await get("/aws~env")).text();
check(/<meta name="robots" content="[^"]*noindex/.test(aws), "/aws~env should be noindex");

const teammate = await get("/shrey/resume.pdf");
check(teammate.headers.get("x-robots-tag")?.includes("noindex"), "teammate résumés should send X-Robots-Tag: noindex");

const headers = (await get("/")).headers;
for (const name of ["content-security-policy", "x-content-type-options", "referrer-policy", "permissions-policy", "x-frame-options"]) {
  check(headers.get(name), `/ is missing the ${name} header`);
}
check(!headers.get("x-powered-by"), "/ still sends X-Powered-By");

for (const path of ["/llms.txt", "/favicon.ico", "/icon.svg", "/apple-icon", "/opengraph-image", "/resume.pdf"]) {
  check((await get(path)).status === 200, `${path} should return 200`);
}

if (failures.length) {
  console.error(`Smoke test failed against ${base}:\n${failures.map((failure) => `  ✗ ${failure}`).join("\n")}`);
  exit(1);
}
console.log(`Smoke test passed against ${base}: ${pages.length} pages, ${links.size} internal links.`);
