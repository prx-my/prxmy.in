"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

export type SocialKind = "github" | "linkedin" | "x" | "email";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const icons: Record<SocialKind, { label: string; svg: ReactNode }> = {
  github: {
    label: "GitHub",
    svg: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="size-4" aria-hidden>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
  linkedin: {
    label: "LinkedIn",
    svg: (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden {...stroke}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  x: {
    label: "X",
    svg: (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden {...stroke}>
        <path d="M4 4l11.733 16h4.267l-11.733-16z" />
        <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
      </svg>
    ),
  },
  email: {
    label: "Email",
    svg: (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden {...stroke}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
};

// Pulls the icon toward the cursor while hovered, springs back on leave.
const PULL = 0.4;

export function SocialIcon({
  kind,
  href,
  person,
}: {
  kind: SocialKind;
  href: string;
  person: string;
}) {
  const wrap = useRef<HTMLSpanElement>(null);
  const icon = useRef<HTMLAnchorElement>(null);
  const { label, svg } = icons[kind];

  function move(e: PointerEvent<HTMLSpanElement>) {
    if (e.pointerType !== "mouse" || !wrap.current || !icon.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = wrap.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * PULL;
    const dy = (e.clientY - (r.top + r.height / 2)) * PULL;
    icon.current.style.transition = "transform 0.15s ease-out, background-color 0.2s, color 0.2s";
    icon.current.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  function leave() {
    if (!icon.current) return;
    icon.current.style.transition =
      "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.2s, color 0.2s";
    icon.current.style.transform = "";
  }

  return (
    <span ref={wrap} onPointerMove={move} onPointerLeave={leave} className="inline-flex p-1">
      <a
        ref={icon}
        href={href}
        aria-label={`${person} on ${label}`}
        title={label}
        {...(!href.startsWith("mailto:") && { target: "_blank", rel: "noopener noreferrer" })}
        className="flex size-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:bg-ink hover:text-ivory focus-visible:border-ink focus-visible:bg-ink focus-visible:text-ivory"
      >
        {svg}
      </a>
    </span>
  );
}
