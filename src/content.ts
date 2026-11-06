// Every word on the site lives here. Layout code never hardcodes copy.

export type Link = { label: string; href: string };

export type Experience = {
  org: string;
  href?: string;
  role: string;
  place: string;
  period: string;
  points: string[];
  links?: Link[];
};

export type Project = {
  name: string;
  year: string;
  badge?: string;
  summary: string;
  hardPart: string;
  stack: string[];
  links: Link[];
};

export type PullRequest = {
  number: number;
  href: string;
  title: string;
  why?: string;
  added: number;
  removed: number;
  highlight?: boolean;
};

export type OssRepo = {
  org: string;
  repo: string;
  href: string;
  avatar: string;
  about: string;
  mergedHref: string;
  prs: PullRequest[];
};

export type Win = { title: string; context: string; year: string; href?: string };

export type School = {
  name: string;
  degree: string;
  place: string;
  period: string;
  note?: string;
};


export const profile = {
  name: "Prakhar Gupta",
  role: "Backend & Full-Stack Developer",
  site: "https://prxmy.in",
  initials: "PG",
  location: "Jaipur, India",
  tagline: "Backend & full-stack developer. Second year of CS at Manipal University Jaipur.",
  summary:
    "Backend and full-stack developer from Jaipur. Web developer at Schrader, contributor to OWASP and Sugar Labs, and winner of the India Innovates '26 grand finale.",
  now: "Writing compute-waste detectors at WeMakeDevs × AWS Environmental Hacks. Fixing bugs in OWASP cve-lite-cli.",
  email: "prakhar06.work@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/prx-my" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/prxmy/" },
    { label: "X", href: "https://x.com/_prxmy" },
  ] satisfies Link[],
};

export const booking = {
  navLabel: "Book a call",
  eyebrow: "Booking",
  headline: "Book a call",
  intro:
    "Pick a slot and it lands on my calendar with a Google Meet link. I'm in Jaipur, so times are shown in yours.",
  // Cal.com event type slug to preselect. Must be one of the non-hidden event
  // types on the account; ignored if it isn't there.
  preferredSlug: "30min",
  empty: "Nothing open in the next two weeks.",
  fallback: "Nothing that works?",
  confirmed: "You're on the calendar. A confirmation with the Google Meet link is on its way to you.",
  another: "Book another time",
};

export const awsVideo = {
  id: "YWgCT_omVGM",
  title: "EcoAudit: See Your Code's Energy, CO₂ and Water Footprint",
};

export const about: string[] = [
  "I build client websites at Schrader, a digital marketing agency in Michigan, and contribute to open source in my spare time: 9 merged PRs at OWASP, 5 at Sugar Labs.",
  "Most of my own projects are civic tools for Delhi. The latest, JanSamadhan, routes complaints to 10 city authorities and won the India Innovates '26 grand finale.",
];

export const experience: Experience[] = [
  {
    org: "Schrader",
    href: "https://schrader.co",
    role: "Web Developer",
    place: "Traverse City, Michigan · Remote",
    period: "Jul 2026 – Present",
    points: [
      "Joined as a freelancer, now on the team. 57 merged PRs across the agency's client and in-house sites.",
      "Rebuilt the agency's own site in Next.js, including a PageSpeed and Lighthouse audit tool used in sales pitches.",
      "Built and maintain sites for local businesses, with contact forms backed by Resend and Turso.",
    ],
    links: [
      { label: "Aces Marine & Salvage", href: "https://aces-marine.vercel.app" },
      { label: "Grace Electric", href: "https://graceelectric-blond.vercel.app" },
      { label: "Hot Tub Solutions", href: "https://hottubsolutions.vercel.app" },
      { label: "schrader.co", href: "https://schrader.co" },
    ],
  },
];

export const projects: Project[] = [
  {
    name: "JanSamadhan",
    year: "2026",
    badge: "Grand Finale winner, India Innovates '26",
    summary:
      "Civic grievance platform for Delhi, running as a ward pilot. 300+ users, all organic from X, Reddit and campus. Complaints come in through a Gemini chatbot, a web form or WhatsApp and go to one of 10 authorities against an SLA.",
    hardPart:
      "Catching duplicate complaints within 20 m with PostGIS before they're filed, scoring 250 ward polygons live, and escalating overdue tickets inside Postgres instead of app code.",
    stack: ["Next.js", "FastAPI", "PostGIS", "Supabase", "Gemini", "Redis"],
    links: [
      { label: "Live", href: "https://jansamadhan.perkkk.dev" },
      { label: "Demo", href: "https://youtu.be/JvkJd1MAV3M" },
      { label: "Source", href: "https://github.com/prx-my/ps-crmdev1" },
    ],
  },
  {
    name: "Compute-waste scanner",
    year: "2026",
    badge: "WeMakeDevs × AWS Environmental Hacks · in progress",
    summary:
      "Clones any public repo and reports code, infra, logging and LLM patterns that waste compute, with the exact line as evidence. I wrote 45 of its ~120 detectors and the AWS scan API.",
    hardPart:
      "Proving waste from static evidence alone, never running the scanned code, and making detectors written in Python and TypeScript by four people pass one shared contract.",
    stack: ["Python", "TypeScript", "AWS Lambda", "API Gateway", "S3", "Next.js"],
    links: [{ label: "Source", href: "https://github.com/AWS-env/environmental-hacks" }],
  },
  {
    name: "RailMind",
    year: "2026",
    summary:
      "Dispatch decision support for Indian Railways on a simulated 437 km Delhi–Kanpur corridor. Cuts cascade delay by 10% against first-come-first-served dispatch.",
    hardPart:
      "A beam-search lookahead (depth 4, width 8) that plans train conflicts in under 200 ms, behind a safety layer that rejects any unsafe plan.",
    stack: ["Python", "React", "Vite"],
    links: [
      { label: "Live", href: "https://railmind-nu.vercel.app" },
      { label: "Source", href: "https://github.com/prx-my/railmind" },
    ],
  },
  {
    name: "oracle-academy",
    year: "2026",
    summary:
      "A terminal client for Oracle Academy's Student Hub: sign in once via SSO, then list classes and work through sections from the CLI.",
    hardPart:
      "Oracle's edge blocks headless Chromium, so it keeps one real browser alive over CDP, imports cookies from your browser (including Chrome's App-Bound Encryption on Windows), and falls back to Docker with noVNC.",
    stack: ["Node.js", "Playwright", "Docker"],
    links: [{ label: "Source", href: "https://github.com/prx-my/oracle-academy" }],
  },
  {
    name: "Leafline",
    year: "2026",
    badge: "1st Place, InnovateNSUT '26",
    summary:
      "Civic issue reporter for Delhi and the prototype that became JanSamadhan. I built the role logic, citizen and authority dashboards, and the chat assistant's backend.",
    hardPart:
      "Routing free-text and spoken complaints to the right department, using Groq for classification and Google Speech for voice input.",
    stack: ["Next.js", "FastAPI", "Groq", "Supabase", "Leaflet"],
    links: [
      { label: "Live", href: "https://leaf-line-ivory.vercel.app" },
      { label: "Source", href: "https://github.com/MrPanda009/LeafLine" },
    ],
  },
];

const merged = (repo: string) =>
  `https://github.com/${repo}/pulls?q=is%3Apr+author%3Aprx-my+is%3Amerged`;

export const openSource: OssRepo[] = [
  {
    org: "OWASP",
    repo: "cve-lite-cli",
    href: "https://github.com/OWASP/cve-lite-cli",
    avatar: "/logos/OWASP.png",
    about: "Dependency vulnerability scanner for JS/TS projects · 760 stars",
    mergedHref: merged("OWASP/cve-lite-cli"),
    prs: [
      {
        number: 1202,
        title: "The usage scanner silently stopped at 5,000 files, so --only-used could hide real vulnerabilities. It now flags the cut-off and keeps those findings.",
        why: "Before this, a vulnerable repo could scan green.",
        added: 702,
        removed: 103,
        highlight: true,
      },
      {
        number: 1183,
        title: "Fixed the semver check that four rules depend on: ^0.25.0 was matching every 0.x release instead of following npm's 0.x rule.",
        why: "It was reporting vulnerable versions npm could never install.",
        added: 36,
        removed: 5,
        highlight: true,
      },
      {
        number: 1271,
        title: "HTML reports printed fix commands relative to wherever the report was generated. They're now relative to the scanned project, so they actually run.",
        added: 111,
        removed: 23,
        highlight: true,
      },
      {
        number: 1231,
        title: "Compact mode showed three findings without saying more were hidden. It now states how many and how to see them.",
        added: 330,
        removed: 2,
      },
      {
        number: 1230,
        title: "Replaced 39 hard-coded CLI flag strings with constants, so a typo is a compile error instead of a silently ignored flag.",
        added: 173,
        removed: 93,
      },
      {
        number: 1229,
        title: "Merged seven copies of the flag-conflict error message into one helper.",
        added: 11,
        removed: 7,
      },
      {
        number: 1228,
        title: "Added braces to the last 11 single-line if statements in the CLI.",
        added: 33,
        removed: 11,
      },
      {
        number: 1181,
        title: "Fixed a pluralization bug in OA008 messages and sorted versions numerically instead of alphabetically.",
        added: 20,
        removed: 2,
      },
      {
        number: 1200,
        title: "Wrote the docs page for the OA010 Vulnerable Floor override rule.",
        added: 115,
        removed: 3,
      },
    ],
  },
  {
    org: "Sugar Labs",
    repo: "musicblocks-v4",
    href: "https://github.com/sugarlabs/musicblocks-v4",
    avatar: "/logos/sugarlabs.png",
    about: "Visual programming for music, used in classrooms · 125 stars",
    mergedHref: merged("sugarlabs/musicblocks-v4"),
    prs: [
      {
        number: 850,
        title: "Added Duplicate: copies a brick and everything attached below it into a new, independent tower, with undo and redo.",
        added: 408,
        removed: 11,
        highlight: true,
      },
      {
        number: 919,
        title: "Clicking empty workspace didn't clear the selection, because a pan layer was swallowing the click. Fixed it and wrote a test that actually catches it.",
        why: "The old test clicked the canvas directly, so it passed while the bug was live.",
        added: 274,
        removed: 22,
        highlight: true,
      },
      {
        number: 871,
        title: "Dropping a dragged brick left it selected, because the drag ended with a stray click. That click is now ignored.",
        added: 192,
        removed: 28,
        highlight: true,
      },
      {
        number: 942,
        title: "Moved the drag-click guard, copied in three places, into one shared hook after review feedback.",
        added: 131,
        removed: 23,
      },
      {
        number: 646,
        title: "Nested bricks with thick outlines were drawn too wide. Fixed two width formulas in the SVG path.",
        added: 3,
        removed: 1,
      },
    ],
  },
  {
    org: "FaceGate",
    repo: "FaceGate-Mac",
    href: "https://github.com/dweep-desai/FaceGate-Mac",
    avatar: "/logos/dweep-desai.jpg",
    about: "Face ID app locker for macOS · 560 stars",
    mergedHref: merged("dweep-desai/FaceGate-Mac"),
    prs: [
      {
        number: 124,
        title: "Shipped v1.3.0: the lock window is now reused instead of rebuilt, which fixed camera drops and a memory leak.",
        why: "Rapidly locking and unlocking could bypass face authentication.",
        added: 474,
        removed: 62,
        highlight: true,
      },
      {
        number: 140,
        title: "Shipped v1.3.1: fixed duplicate Touch ID prompts on multiple monitors, locked apps flashing before the lock screen, and a frozen overlay traced to cleanup running out of order.",
        added: 513,
        removed: 173,
        highlight: true,
      },
      {
        number: 110,
        title: "Rapid lock cycles could leave the camera stopped on a black screen. Camera start and stop now run in order on one queue.",
        added: 64,
        removed: 25,
        highlight: true,
      },
      {
        number: 105,
        title: "Added a setting to disable the emergency quit shortcut, so the app can't be killed by hotkey without authenticating.",
        added: 32,
        removed: 6,
      },
    ],
  },
].map((r) => ({
  ...r,
  prs: r.prs.map((pr) => ({ ...pr, href: `${r.href}/pull/${pr.number}` })),
}));

export const wins: Win[] = [
  {
    title: "Grand Finale Winner, India Innovates '26",
    context: "JanSamadhan",
    year: "2026",
  },
  {
    title: "1st Place, InnovateNSUT '26 (NSUT Avinya)",
    context: "Leafline",
    year: "2026",
  },
  {
    title: "2nd Place + Incubation Offer, IDEA2IPR Ideathon",
    context: "Selected for incubation after the demo",
    year: "2025",
  },
];

export const education: School[] = [
  {
    name: "Manipal University Jaipur",
    degree: "B.Tech, Computer Science & Engineering",
    place: "Jaipur",
    period: "2025 – 2029",
    note: "SGPA 8.45",
  },
  {
    name: "Mount Litera Zee School",
    degree: "Class XII, CBSE (PCM + Computer Science)",
    place: "Silvassa",
    period: "2024",
    note: "91%",
  },
];
