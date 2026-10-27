import Image from "next/image";
import type { OssRepo, PullRequest } from "@/content";
import type { GitHubResult, VerifiedPullRequest } from "@/lib/github-client";
import { Arrow, ExtLink } from "./ui";

function PrRow({ curated, verified }: { curated: PullRequest; verified?: VerifiedPullRequest }) {
  return (
    <li className="pr-row">
      <span className="pr-number">#{curated.number}</span>
      <div>
        <ExtLink href={verified?.url ?? curated.href} className="pr-title">
          {verified?.title ?? curated.title}
        </ExtLink>
        {verified && <p className="pr-description">{curated.title}</p>}
        {curated.why && <p className="pr-impact">{curated.why}</p>}
        {verified && (
          <p className="pr-meta">
            <span>Merged <time dateTime={verified.mergedAt}>{new Date(verified.mergedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</time></span>
            <span aria-label={`${verified.additions} lines added, ${verified.deletions} lines removed`}>+{verified.additions.toLocaleString("en-US")} / −{verified.deletions.toLocaleString("en-US")}</span>
          </p>
        )}
      </div>
    </li>
  );
}

export function OpenSource({ repos, github }: { repos: OssRepo[]; github: GitHubResult }) {
  const snapshot = github.snapshot;
  const total = snapshot?.repositories.reduce((sum, repo) => sum + repo.mergedCount, 0);
  return (
    <>
      {total !== undefined && <p className="upstream-total"><strong>{total}</strong> merged PRs across these three upstream projects <span>· all time</span></p>}
      <div className="oss-list">
        {repos.map((repo) => {
          const verified = snapshot?.repositories.find((item) => item.url.toLowerCase() === repo.href.toLowerCase());
          const selected = verified ? repo.prs.filter((pr) => verified.highlights.some((item) => item.number === pr.number)) : repo.prs;
          const highlighted = selected.filter((pr) => pr.highlight).slice(0, 2);
          const top = highlighted.length ? highlighted : selected.slice(0, 2);
          const rest = selected.filter((pr) => !top.includes(pr));
          const row = (pr: PullRequest) => <PrRow key={pr.number} curated={pr} verified={verified?.highlights.find((item) => item.number === pr.number)} />;
          return (
            <article key={repo.href} className="oss-entry">
              <header className="oss-heading">
                <Image src={repo.avatar} alt="" width={32} height={32} className="oss-avatar" />
                <div className="oss-heading-copy">
                  <h3><ExtLink href={verified?.url ?? repo.href}>{repo.org}<span className="repo-slash"> / </span><span className="repo-name">{repo.repo}</span></ExtLink></h3>
                  <p>{repo.about.replace(/ · [\d,.]+ stars$/, "")}</p>
                </div>
                <div className="oss-count">
                  <ExtLink href={repo.mergedHref}>{verified ? <><strong>{verified.mergedCount}</strong> merged<Arrow /></> : <>View PRs<Arrow /></>}</ExtLink>
                  {verified && <span>{verified.stars.toLocaleString("en-US")} stars</span>}
                </div>
              </header>
              <ul className="pr-list">{top.map(row)}</ul>
              {rest.length > 0 && (
                <details className="pr-details">
                  <summary><span>More selected contributions ({rest.length})</span><span className="details-plus" aria-hidden="true">+</span></summary>
                  <ul className="pr-list">{rest.map(row)}</ul>
                </details>
              )}
            </article>
          );
        })}
      </div>
      <p className="data-note">Featured contributions are hand-picked; merged status, counts, and stars are verified through GitHub.{snapshot ? " Refresh details below." : " Verification is temporarily unavailable."}</p>
    </>
  );
}
