import type { GitHubResult } from "@/lib/github-client";
import { ContributionCalendar } from "./contribution-calendar";
import { Arrow, ExtLink } from "./ui";

function date(value: string) {
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export function GitHubActivity({ github }: { github: GitHubResult }) {
  const snapshot = github.snapshot;
  if (!snapshot) {
    return <div className="activity-unavailable"><p>GitHub activity is temporarily unavailable.</p><ExtLink href="https://github.com/prx-my">View my GitHub profile<Arrow /></ExtLink></div>;
  }
  const { calendar } = snapshot;
  return (
    <>
      <div className="activity-stats">
        <div><strong>{calendar.totalContributions.toLocaleString("en-US")}</strong><span>Contributions · last 12 months</span></div>
        <div><strong>{snapshot.publicMergedCount.toLocaleString("en-US")}</strong><span>Public authored PRs merged · all time</span></div>
      </div>
      <div className="calendar-heading"><p>{date(calendar.from)} — {date(calendar.to)}</p><ExtLink href="https://github.com/prx-my">prx-my<Arrow /></ExtLink></div>
      <ContributionCalendar calendar={calendar} />
      <div className="activity-footnote">
        <p>Calendar totals follow GitHub’s contribution visibility and may include private activity as anonymous counts. Dates use UTC. PR totals include public repositories only.</p>
        <p>{github.source === "saved" ? "Showing the last verified snapshot · " : "Updated "}
          <time dateTime={snapshot.fetchedAt}>{new Date(snapshot.fetchedAt).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC</time>
        </p>
      </div>
      <details className="recent-merges pr-details">
        <summary><span>{snapshot.recentComplete ? "Recent merges" : "Selected recent merges"} <span className="recent-period">· past 90 days</span></span><span className="details-plus" aria-hidden="true">+</span></summary>
        {snapshot.recentMerges.length ? (
          <ul className="recent-list">{snapshot.recentMerges.map((pr) => (
            <li key={pr.url}><div><p className="pr-meta">{pr.repository} · #{pr.number}</p><ExtLink href={pr.url}>{pr.title}<Arrow /></ExtLink></div><time dateTime={pr.mergedAt}>{date(pr.mergedAt)}</time></li>
          ))}</ul>
        ) : <p className="data-note">No public authored PRs were merged in this period.</p>}
      </details>
    </>
  );
}
