import type { Project } from "@/content";
import { Arrow, ExtLink } from "./ui";

export function Projects({ items }: { items: Project[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((p) => (
        <article
          key={p.name}
          className="rounded-xl border border-line p-5 transition-colors hover:bg-beige/50"
        >
          <header className="flex items-baseline justify-between gap-4">
            <h3 className="font-serif text-xl leading-tight">{p.name}</h3>
            <span className="shrink-0 font-mono text-xs text-faint">{p.year}</span>
          </header>
          {p.badge && <p className="mt-1 text-xs font-medium text-muted">{p.badge}</p>}

          <p className="mt-3 text-[0.95rem] leading-relaxed">{p.summary}</p>

          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
            <span className="font-serif italic text-ink">The hard part: </span>
            {p.hardPart}
          </p>

          <footer className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <p className="font-mono text-xs text-faint">{p.stack.join(" · ")}</p>
            <ul className="flex gap-4 text-sm">
              {p.links.map((l) => (
                <li key={l.label}>
                  <ExtLink href={l.href}>
                    {l.label}
                    <Arrow />
                  </ExtLink>
                </li>
              ))}
            </ul>
          </footer>
        </article>
      ))}
    </div>
  );
}
