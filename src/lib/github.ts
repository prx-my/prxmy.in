import "server-only";
import { cacheLife } from "next/cache";
import { openSource } from "@/content";
import savedSnapshot from "@/data/github.json";
import { fetchGitHubSnapshot, withGitHubFallback, type GitHubSnapshot } from "./github-client";

// The committed snapshot survives cold starts and deploys. A warm instance also
// retains the most recent successful refresh. No secrets or private PRs are saved.
let lastKnownGood = savedSnapshot as GitHubSnapshot | null;

export async function getGitHubData() {
  "use cache";
  cacheLife({ stale: 300, revalidate: 3600, expire: 86400 });

  const result = await withGitHubFallback(() => fetchGitHubSnapshot({
    token: process.env.GITHUB_TOKEN ?? "",
    username: "prx-my",
    repositories: openSource.map((repo) => ({
      fullName: new URL(repo.href).pathname.slice(1),
      pullRequests: repo.prs.map((pr) => pr.number),
    })),
  }), lastKnownGood);
  if (result.source === "live") lastKnownGood = result.snapshot;
  return result;
}
