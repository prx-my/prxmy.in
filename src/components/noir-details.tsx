import type { ReactNode } from "react";

export function SectionTitle({ number, title, note }: { number: string; title: string; note?: string }) {
  return <div className="noir-section-heading"><p className="eyebrow"><span>{number}</span> / {note ?? "The portfolio"}</p><h2>{title}<span>.</span></h2></div>;
}

export function WebLines({ className="" }: { className?: string }) {
  return <svg className={`web-lines ${className}`} viewBox="0 0 240 240" fill="none" aria-hidden="true"><path d="M240 0 0 240M240 0 110 240M240 0 192 240M240 0 0 110M240 0 0 192" stroke="currentColor"/><path d="M35 94c24 3 41 16 51 33 21-2 37 5 48 18 15-6 34-5 50 2 13-13 32-18 52-15M1 143c32 4 58 21 71 48 27-1 50 7 66 28 19-7 40-7 60 2M97 38c15 2 27 11 33 22 14-2 27 3 35 13 12-4 24-4 35 1 8-9 20-13 36-12" stroke="currentColor"/></svg>;
}

export function TextButton({ href, children, variant="ink" }: {href:string; children:ReactNode;variant?:"ink"|"red"|"outline"}) {
  return <a href={href} className={`noir-button noir-button-${variant}`}><span>{children}</span><span aria-hidden="true">↗</span></a>;
}
