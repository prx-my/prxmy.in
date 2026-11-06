import Image from "next/image";
import type { OssRepo, PullRequest } from "@/content";
import { Arrow, ExtLink } from "./ui";

function PrRow({ pr }: { pr: PullRequest }) {
  return (
    <li className="grid grid-cols-[3.5rem_1fr_auto] gap-x-3 py-3">
      <ExtLink href={pr.href} className="font-mono text-xs leading-6 text-faint">
        #{pr.number}
      </ExtLink>
      <div>
        <p className="text-[0.95rem] leading-6">{pr.title}</p>
        {pr.why && <p className="mt-1 text-sm leading-relaxed text-muted">{pr.why}</p>}
      </div>
      <p className="font-mono text-xs leading-6 whitespace-nowrap">
        <span className="text-[#4f7a4b]">+{pr.added}</span>{" "}
        <span className="text-[#a4483b]">−{pr.removed}</span>
      </p>
    </li>
  );
}

export function OpenSource({ repos }: { repos: OssRepo[] }) {
  return (
    <div className="flex flex-col gap-10">
      {repos.map((r) => {
        const top = r.prs.filter((p) => p.highlight);
        const rest = r.prs.filter((p) => !p.highlight);
        return (
          <div key={r.href}>
            <header className="flex items-center gap-3 border-b border-line pb-3">
              <Image
                src={r.avatar}
                alt=""
                width={28}
                height={28}
                className="rounded-md border border-line"
              />
              <div className="min-w-0 flex-1">
                <ExtLink href={r.href} className="font-medium">
                  {r.org} / {r.repo}
                </ExtLink>
                <p className="truncate text-xs text-faint">{r.about}</p>
              </div>
              <ExtLink href={r.mergedHref} className="shrink-0 text-sm">
                <span className="font-serif text-lg">{r.prs.length}</span> merged
                <Arrow />
              </ExtLink>
            </header>

            <ul className="divide-y divide-line">
              {top.map((pr) => (
                <PrRow key={pr.number} pr={pr} />
              ))}
            </ul>

            {rest.length > 0 && (
              <details className="group">
                <summary className="cursor-pointer border-t border-line pt-3 text-sm text-muted hover:text-ink">
                  <span className="group-open:hidden">Show {rest.length} more</span>
                  <span className="hidden group-open:inline">Show less</span>
                </summary>
                <ul className="divide-y divide-line">
                  {rest.map((pr) => (
                    <PrRow key={pr.number} pr={pr} />
                  ))}
                </ul>
              </details>
            )}
          </div>
        );
      })}
    </div>
  );
}
