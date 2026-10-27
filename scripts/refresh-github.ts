import { writeFile, rename } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fetchGitHubSnapshot } from "../src/lib/github-client.ts";
import { openSource } from "../src/content.ts";

// --gh uses the existing local GitHub CLI session in memory only. The deployed
// app always uses GITHUB_TOKEN; neither it nor this script serializes credentials.
async function main() {
  const token = process.argv.includes("--gh")
    ? execFileSync("gh", ["auth", "token"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim()
    : process.env.GITHUB_TOKEN ?? "";
  const snapshot = await fetchGitHubSnapshot({
    token, username: "prx-my",
    repositories: openSource.map((repo) => ({
      fullName: new URL(repo.href).pathname.slice(1),
      pullRequests: repo.prs.map((pr) => pr.number),
    })),
  });
  const destination = new URL("../src/data/github.json", import.meta.url);
  const temporary = new URL("../src/data/github.json.tmp", import.meta.url);
  await writeFile(temporary, JSON.stringify(snapshot, null, 2) + "\n");
  await rename(temporary, destination);
  console.log(`Verified GitHub snapshot saved (${snapshot.fetchedAt}).`);
  console.log(`${snapshot.calendar.totalContributions} contributions; ${snapshot.publicMergedCount} public merged PRs.`);
}

main().catch(() => {
  console.error("GitHub refresh failed. Check authentication and connectivity. The previous snapshot was preserved.");
  process.exitCode = 1;
});
