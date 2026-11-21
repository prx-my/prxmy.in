"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { openSource, projects } from "@/content";
import { Arrow } from "./interactions";

export function Ram({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`hw-ram ${compact ? "hw-ram-compact" : ""}`}
      aria-hidden="true"
    >
      <span className="hw-ram-chips">
        {Array.from({ length: compact ? 4 : 8 }, (_, i) => (
          <i key={i} />
        ))}
      </span>
      <span className="hw-ram-contacts" />
    </span>
  );
}

function MiniGpu() {
  return (
    <svg
      viewBox="0 0 190 88"
      fill="none"
      className="hw-mini-gpu"
      aria-hidden="true"
    >
      <path
        d="M10 7h12v9h158v57H22v8H10Z"
        fill="#e9e2ce"
        stroke="#e9e2ce"
        strokeWidth="3"
      />
      <path d="M25 23h147v42H25Z" fill="#172d93" />
      <path d="M35 73h118v8H35Z" fill="#e4bd69" />
      {[64, 134].map((x) => (
        <g key={x} transform={`translate(${x} 44)`}>
          <circle r="25" fill="#0f205c" stroke="#b4bfec" strokeWidth="2" />
          <g fill="#a5b3ea">
            {[0, 90, 180, 270].map((a) => (
              <path
                key={a}
                d="M0-3C-20-23-28 4-5 5Z"
                transform={`rotate(${a})`}
              />
            ))}
          </g>
          <circle r="5" fill="#e9e2ce" />
        </g>
      ))}
    </svg>
  );
}

export function Motherboard() {
  return (
    <nav
      className="hw-motherboard"
      aria-label="Explore the portfolio through computer components"
    >
      <svg
        className="hw-board-traces"
        viewBox="0 0 520 410"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="#7288d0" strokeWidth="2" opacity=".6">
          <path d="M160 148h70l35-35h103M170 160h74l30-30h94M162 175h57l64 63h60M160 187h46l66 66h60M145 175v82l-24 24v42M155 187v80l-24 24v32M137 160H50V80h49M137 170H38V67h62M378 110h84v91M388 123h62v78M356 253v72h-45M345 253v61h-34M56 345h196l41-41" />
        </g>
        <g stroke="#d8e7a4" strokeWidth="2">
          <path d="M173 150h59l33-33h97" />
          <path d="M166 182h50l61 61h71" />
          <path d="M147 181v76l-23 23v43" />
        </g>
        {[
          [49, 80],
          [100, 67],
          [460, 202],
          [311, 325],
          [57, 345],
          [253, 345],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#e3c77a" />
        ))}
      </svg>
      <span className="hw-board-screw hw-screw-tl" aria-hidden="true" />
      <span className="hw-board-screw hw-screw-tr" aria-hidden="true" />
      <span className="hw-board-screw hw-screw-bl" aria-hidden="true" />
      <span className="hw-board-screw hw-screw-br" aria-hidden="true" />
      <Link href="/resume" className="hw-board-cpu">
        <span className="hw-cpu-image">
          <Image
            src="/hardware/cpu.png"
            alt=""
            width={272}
            height={270}
            sizes="160px"
          />
          <span>PG</span>
        </span>
        <span>
          Résumé <Arrow />
        </span>
      </Link>
      <a href="#stack" className="hw-board-memory">
        <Ram compact />
        <Ram compact />
        <span>
          Tech stack <Arrow />
        </span>
      </a>
      <a href="#projects" className="hw-board-drives">
        <span className="hw-drive">
          <i />
          <span />
        </span>
        <span className="hw-drive">
          <i />
          <span />
        </span>
        <span className="hw-drive">
          <i />
          <span />
        </span>
        <span>
          Projects <Arrow />
        </span>
      </a>
      <a href="#open-source" className="hw-board-gpu">
        <MiniGpu />
        <span>
          Open source <Arrow />
        </span>
      </a>
      <a
        href="#contact"
        className="hw-board-mascot"
        aria-label="Contact Prakhar"
      >
        <Image
          src="/hardware/tux.svg"
          width={74}
          height={82}
          alt="Tux, the Linux penguin"
          unoptimized
        />
        <span>
          Contact <Arrow />
        </span>
      </a>
    </nav>
  );
}

const notes: Record<string, { kind: string; summary: string }> = {
  ecoaudit: {
    kind: "tools",
    summary:
      "Finds avoidable compute waste in public repositories. I wrote 45 detectors and the AWS scan API.",
  },
  jansamadhan: {
    kind: "civic",
    summary:
      "Routes civic complaints to 10 Delhi authorities. Built for a ward pilot with 300+ organic users.",
  },
  railmind: {
    kind: "tools",
    summary:
      "Dispatch decision support for a simulated 437 km Delhi–Kanpur railway corridor.",
  },
  "oracle-academy": {
    kind: "tools",
    summary:
      "An authenticated terminal client for Oracle Academy’s Student Hub.",
  },
  leafline: {
    kind: "civic",
    summary:
      "A civic issue reporter for Delhi, and the prototype that became JanSamadhan.",
  },
};

export function ProjectRack() {
  const [filter, setFilter] = useState("all");
  const id = useId();
  const visible = projects.filter(
    (p) => filter === "all" || notes[p.slug].kind === filter,
  );
  return (
    <div className="hw-projects">
      <div
        className="hw-project-filters"
        role="group"
        aria-label="Filter projects"
      >
        {[
          { id: "all", label: "All projects" },
          { id: "tools", label: "Tools & systems" },
          { id: "civic", label: "Civic technology" },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            aria-controls={id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div
        id={id}
        className="hw-project-grid"
        aria-live="polite"
        aria-relevant="additions removals"
      >
        {visible.map((project) => (
          <article
            className={`hw-project-card ${project.preview ? "hw-project-featured" : "hw-project-compact"}`}
            key={project.slug}
          >
            <div className="hw-module-edge" aria-hidden="true">
              <i />
              <span />
              <i />
            </div>
            {project.preview && (
              <Link
                href={`/projects/${project.slug}`}
                className="hw-project-preview"
                aria-label={`View ${project.name}`}
              >
                <Image
                  src={project.preview}
                  alt={project.previewAlt ?? `${project.name} project cover`}
                  fill
                  sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1200px) 46vw, 525px"
                  style={{ objectFit: project.slug === "jansamadhan" ? "contain" : "cover" }}
                />
              </Link>
            )}
            <div className="hw-project-copy">
              <div className="hw-project-title">
                <h3>
                  <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                </h3>
                <Link
                  href={`/projects/${project.slug}`}
                  aria-label={`Explore ${project.name}`}
                >
                  <Arrow />
                </Link>
              </div>
              <p>{notes[project.slug].summary}</p>
              {project.badge && (
                <p className="hw-project-award">
                  {project.slug === "jansamadhan"
                    ? "Winner · India Innovates ’26"
                    : project.slug === "leafline"
                      ? "1st place · InnovateNSUT ’26"
                      : "Campus to Cloud Hackathon · Techfest, IIT Bombay"}
                </p>
              )}
              <ul
                className="hw-project-stack"
                aria-label={`${project.name} technologies`}
              >
                {project.stack.slice(0, 4).map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <details className="hw-engineering">
                <summary>
                  Engineering details<span aria-hidden="true">+</span>
                </summary>
                <p>{project.hardPart}</p>
              </details>
              <div className="hw-project-actions">
                <Link href={`/projects/${project.slug}`}>
                  Case study <Arrow />
                </Link>
                {project.links
                  .filter((l) => l.label === "Source" || l.label === "Live")
                  .map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label}
                      <Arrow />
                    </a>
                  ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export type UpstreamSnapshot = {
  fetchedAt: string;
  repositories: {
    repository: string;
    count: number;
    pullRequest: { number: number; title: string; url: string } | null;
  }[];
};
const gpuPanels = [
  {
    slug: "owasp",
    name: "OWASP",
    fullName: "OWASP/cve-lite-cli",
    width: 825,
    center: 559,
    note: "Dependency vulnerability scanning",
    repoIndex: 0,
  },
  {
    slug: "sugar-labs",
    name: "Sugar Labs",
    fullName: "sugarlabs/musicblocks-v4",
    width: 565,
    center: 281,
    note: "Visual programming for music",
    repoIndex: 1,
  },
  {
    slug: "ecoaudit",
    name: "EcoAudit",
    fullName: "AWS-env/environmental-hacks",
    width: 782,
    center: 266,
    note: "Compute-waste detection",
    repoIndex: -1,
  },
];

function GpuArt({
  index,
  count,
  active,
}: {
  index: number;
  count: number | undefined;
  active: boolean;
}) {
  const p = gpuPanels[index];
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className="hw-gpu-art"
      data-active={active}
      viewBox={`0 0 ${p.width} 724`}
      aria-hidden="true"
    >
      <defs>
        <image
          id={`${id}-art`}
          width={p.width}
          height="724"
          href={`/hardware/gpu-${p.slug}.webp`}
        />
        <clipPath id={`${id}-rotor`}>
          <circle cx={p.center} cy="339" r="157" />
        </clipPath>
        <clipPath id={`${id}-hub`}>
          <circle cx={p.center} cy="339" r="54" />
        </clipPath>
      </defs>
      <use href={`#${id}-art`} />
      <g clipPath={`url(#${id}-rotor)`}>
        <g transform={`translate(${p.center} 339)`}>
          <g className="hw-gpu-rotor">
            <use
              href={`#${id}-art`}
              transform={`translate(-${p.center} -339)`}
            />
          </g>
        </g>
      </g>
      <g clipPath={`url(#${id}-hub)`}>
        <use href={`#${id}-art`} />
      </g>
      <circle
        cx={p.center}
        cy="339"
        r="45"
        fill={active ? "#dcf481" : "#fff2d1"}
      />
      <text
        x={p.center}
        y="339"
        dy=".35em"
        textAnchor="middle"
        fill="#11299e"
        fontFamily="Arial, sans-serif"
        fontSize="58"
        fontWeight="700"
      >
        {count ?? "—"}
      </text>
      <rect
        x={p.center - 175}
        y="548"
        width="350"
        height="49"
        fill="#12279c"
        rx="2"
      />
      <text
        x={p.center}
        y="581"
        textAnchor="middle"
        fill="#fff2d1"
        fontFamily="Arial, sans-serif"
        fontSize="25"
      >
        View contributions ↗
      </text>
    </svg>
  );
}

export function OpenSourceGpu({ snapshot }: { snapshot: UpstreamSnapshot }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const p = gpuPanels[active];
  const record = snapshot.repositories.find((r) => r.repository === p.fullName);
  const repo = p.repoIndex >= 0 ? openSource[p.repoIndex] : null;
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % 3
        : event.key === "ArrowLeft"
          ? (index + 2) % 3
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? 2
              : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }
  return (
    <div className="hw-gpu-bank">
      <div className="hw-gpu-visual" aria-hidden="true">
        {gpuPanels.map((panel, index) => (
          <div
            key={panel.slug}
            style={{ flex: panel.width }}
            onClick={() => setActive(index)}
          >
            <GpuArt
              index={index}
              count={
                snapshot.repositories.find(
                  (r) => r.repository === panel.fullName,
                )?.count
              }
              active={active === index}
            />
          </div>
        ))}
      </div>
      <div
        className="hw-gpu-tabs"
        role="tablist"
        aria-label="Open-source repositories"
      >
        {gpuPanels.map((panel, index) => (
          <button
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            tabIndex={active === index ? 0 : -1}
            key={panel.slug}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            onClick={() => setActive(index)}
            onKeyDown={(e) => navigate(e, index)}
          >
            <span>{panel.name}</span>
            <span>
              {snapshot.repositories.find(
                (r) => r.repository === panel.fullName,
              )?.count ?? "—"}{" "}
              merged PRs
            </span>
          </button>
        ))}
      </div>
      <div
        className="hw-contribution-panel"
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
      >
        <div className="hw-contribution-heading">
          <div>
            <h3>{p.fullName}</h3>
            <p>{p.note}</p>
          </div>
          <a
            href={`https://github.com/${p.fullName}/pulls?q=is%3Apr+is%3Amerged+author%3Aprx-my`}
            target="_blank"
            rel="noopener noreferrer"
          >
            All contributions <Arrow />
          </a>
        </div>
        {repo ? (
          <ul className="hw-pr-list">
            {repo.prs.slice(0, 3).map((pr) => (
              <li key={pr.number}>
                <a href={pr.href} target="_blank" rel="noopener noreferrer">
                  <span>#{pr.number}</span>
                  <span>{pr.title}</span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="hw-ecoaudit-evidence">
            <p>
              I wrote 45 of EcoAudit’s roughly 120 detectors and built the AWS
              API that runs repository scans. The detectors report exact lines
              of evidence without executing the scanned code.
            </p>
            {record?.pullRequest && (
              <a
                href={record.pullRequest.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                #{record.pullRequest.number} · {record.pullRequest.title}
                <Arrow />
              </a>
            )}
            <Link href="/projects/ecoaudit">
              Read the case study <Arrow />
            </Link>
          </div>
        )}
      </div>
      <p className="hw-data-note">
        Public GitHub PR counts, checked{" "}
        {new Date(snapshot.fetchedAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })}
        .
      </p>
    </div>
  );
}
