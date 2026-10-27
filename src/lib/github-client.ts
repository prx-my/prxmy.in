// Framework-independent GitHub reader, shared by the server and snapshot command.
// Only the server wrapper may read GITHUB_TOKEN. No credential is returned here.
export type ContributionDay = { date: string; contributionCount: number };
export type ContributionCalendar = {
  from: string;
  to: string;
  totalContributions: number;
  weeks: { contributionDays: ContributionDay[] }[];
};

export type VerifiedPullRequest = {
  number: number;
  title: string;
  url: string;
  repository: string;
  mergedAt: string;
  additions: number;
  deletions: number;
};

export type GitHubRepository = {
  nameWithOwner: string;
  url: string;
  description: string | null;
  stars: number;
  mergedCount: number;
  highlights: VerifiedPullRequest[];
};

export type GitHubSnapshot = {
  version: 1;
  username: string;
  fetchedAt: string;
  calendar: ContributionCalendar;
  publicMergedCount: number;
  repositories: GitHubRepository[];
  recentMerges: VerifiedPullRequest[];
  recentSince: string;
  recentComplete: boolean;
};

export type RepositorySelection = { fullName: string; pullRequests: number[] };

export class GitHubError extends Error {
  readonly kind: "configuration" | "rate-limit" | "upstream" | "invalid-data";
  constructor(kind: GitHubError["kind"]) {
    super(`GitHub data unavailable (${kind}).`);
    this.name = "GitHubError";
    this.kind = kind;
  }
}

const DAY_MS = 86_400_000;

// Inclusive calendar dates: the day after the anniversary through today, UTC.
// Clamp leap day before advancing one day, so the interval never exceeds a year.
export function contributionPeriod(now: Date) {
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const year = end.getUTCFullYear() - 1;
  const month = end.getUTCMonth();
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const start = new Date(Date.UTC(year, month, Math.min(end.getUTCDate(), lastDay)) + DAY_MS);
  return { from: start.toISOString(), to: now.toISOString() };
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new GitHubError("invalid-data");
  return value as Record<string, unknown>;
}

function integer(value: unknown): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) throw new GitHubError("invalid-data");
  return value;
}

function string(value: unknown): string {
  if (typeof value !== "string" || !value) throw new GitHubError("invalid-data");
  return value;
}

function list(value: unknown): unknown[] {
  if (!Array.isArray(value)) throw new GitHubError("invalid-data");
  return value;
}

function githubUrl(value: unknown): string {
  const url = string(value);
  if (!url.startsWith("https://github.com/")) throw new GitHubError("invalid-data");
  return url;
}

function timestamp(value: unknown): string {
  const result = string(value);
  if (!Number.isFinite(Date.parse(result))) throw new GitHubError("invalid-data");
  return result;
}

export function parseCalendar(raw: unknown, period: { from: string; to: string }): ContributionCalendar {
  const calendar = record(raw);
  const firstDate = period.from.slice(0, 10);
  const lastDate = period.to.slice(0, 10);
  const seen = new Set<string>();
  const weeks = list(calendar.weeks).map((week) => ({
    contributionDays: list(record(week).contributionDays).map((rawDay) => {
      const day = record(rawDay);
      const date = string(day.date);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || seen.has(date)) throw new GitHubError("invalid-data");
      seen.add(date);
      return { date, contributionCount: integer(day.contributionCount) };
    }).filter((day) => day.date >= firstDate && day.date <= lastDate),
  })).filter((week) => week.contributionDays.length > 0);
  const days = weeks.flatMap((week) => week.contributionDays);
  const expectedDays = Math.round((Date.parse(lastDate) - Date.parse(firstDate)) / DAY_MS) + 1;
  if (days.length !== expectedDays || days.some((day, index) =>
    day.date !== new Date(Date.parse(firstDate) + index * DAY_MS).toISOString().slice(0, 10))) {
    throw new GitHubError("invalid-data");
  }
  const totalContributions = integer(calendar.totalContributions);
  // An incomplete calendar must not be passed off as a complete, verified period.
  if (days.reduce((sum, day) => sum + day.contributionCount, 0) !== totalContributions) {
    throw new GitHubError("invalid-data");
  }
  return { ...period, totalContributions, weeks };
}

function parsePullRequest(value: unknown, username: string): VerifiedPullRequest | null {
  if (value === null) return null;
  const pr = record(value);
  const repo = record(pr.repository);
  // Defense in depth: the query is public-only, and the output checks it again.
  if (repo.isPrivate !== false || pr.state !== "MERGED" || !pr.mergedAt ||
    record(pr.author).login?.toString().toLowerCase() !== username.toLowerCase()) return null;
  return {
    number: integer(pr.number), title: string(pr.title), url: githubUrl(pr.url),
    repository: string(repo.nameWithOwner), mergedAt: timestamp(pr.mergedAt),
    additions: integer(pr.additions), deletions: integer(pr.deletions),
  };
}

const PR_FIELDS = `number title url state mergedAt additions deletions
  author { login } repository { nameWithOwner isPrivate }`;

export async function fetchGitHubSnapshot({
  token, username, repositories, now = new Date(), fetcher = fetch,
}: {
  token: string;
  username: string;
  repositories: RepositorySelection[];
  now?: Date;
  fetcher?: typeof fetch;
}): Promise<GitHubSnapshot> {
  if (!token.trim()) throw new GitHubError("configuration");
  if (!/^[a-z\d-]+$/i.test(username) || repositories.some((repo) =>
    !/^[\w.-]+\/[\w.-]+$/.test(repo.fullName) || repo.pullRequests.some((number) => !Number.isSafeInteger(number) || number < 1))) {
    throw new GitHubError("configuration");
  }
  const period = contributionPeriod(now);
  const recentSince = new Date(now.getTime() - 90 * DAY_MS).toISOString().slice(0, 10);
  const search = `is:pr is:merged is:public author:${username}`;
  const recentQuery = `${search} merged:>=${recentSince} sort:updated-desc`;

  async function query(document: string, variables: Record<string, unknown>) {
    let response: Response;
    try {
      response = await fetcher("https://api.github.com/graphql", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "User-Agent": "prxmy-portfolio" },
        body: JSON.stringify({ query: document, variables }),
        cache: "no-store",
        signal: AbortSignal.timeout(12_000),
      });
    } catch {
      throw new GitHubError("upstream");
    }
    if (!response.ok) {
      throw new GitHubError(response.status === 429 || (response.status === 403 && response.headers.get("x-ratelimit-remaining") === "0") ? "rate-limit" : "upstream");
    }
    const body = record(await response.json());
    if (Array.isArray(body.errors) && body.errors.length) {
      throw new GitHubError(body.errors.some((error) => record(error).type === "RATE_LIMITED") ? "rate-limit" : "upstream");
    }
    return record(body.data);
  }

  const repoFields = repositories.map((repo, index) => {
    const [owner, name] = repo.fullName.split("/");
    return `repo${index}: repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(name)}) {
      nameWithOwner url description stargazerCount isPrivate
      ${repo.pullRequests.map((number) => `pr${number}: pullRequest(number: ${number}) { ${PR_FIELDS} }`).join("\n")}
    }
    merged${index}: search(query: ${JSON.stringify(`${search} repo:${repo.fullName}`)}, type: ISSUE, first: 1) { issueCount }`;
  }).join("\n");

  const data = await query(`query Portfolio($username: String!, $from: DateTime!, $to: DateTime!, $recent: String!, $all: String!) {
    user(login: $username) { contributionsCollection(from: $from, to: $to) {
      contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } }
    } }
    allMerged: search(query: $all, type: ISSUE, first: 1) { issueCount }
    recent: search(query: $recent, type: ISSUE, first: 100) {
      pageInfo { hasNextPage endCursor }
      nodes { ... on PullRequest { ${PR_FIELDS} } }
    }
    ${repoFields}
  }`, { username, ...period, recent: recentQuery, all: search });

  const calendar = parseCalendar(record(record(data.user).contributionsCollection).contributionCalendar, period);
  const verifiedRepos = repositories.map((selection, index): GitHubRepository => {
    const repo = record(data[`repo${index}`]);
    if (repo.isPrivate !== false) throw new GitHubError("invalid-data");
    return {
      nameWithOwner: string(repo.nameWithOwner), url: githubUrl(repo.url),
      description: repo.description === null ? null : string(repo.description),
      stars: integer(repo.stargazerCount), mergedCount: integer(record(data[`merged${index}`]).issueCount),
      highlights: selection.pullRequests.map((number) => parsePullRequest(repo[`pr${number}`], username))
        .filter((pr): pr is VerifiedPullRequest => pr !== null),
    };
  });

  let recent = record(data.recent);
  const recentMerges: VerifiedPullRequest[] = [];
  let recentComplete = false;
  // GitHub search exposes at most 1,000 results. Counts above use issueCount,
  // never the number of nodes. Paginate recent merges before sorting by mergedAt.
  for (let page = 0; page < 10; page++) {
    for (const node of list(recent.nodes)) {
      const pr = parsePullRequest(node, username);
      if (pr && pr.mergedAt.slice(0, 10) >= recentSince) recentMerges.push(pr);
    }
    const pageInfo = record(recent.pageInfo);
    if (pageInfo.hasNextPage === false) { recentComplete = true; break; }
    if (page === 9) break;
    const next = await query(`query Recent($query: String!, $after: String!) {
      recent: search(query: $query, type: ISSUE, first: 100, after: $after) {
        pageInfo { hasNextPage endCursor }
        nodes { ... on PullRequest { ${PR_FIELDS} } }
      }
    }`, { query: recentQuery, after: string(pageInfo.endCursor) });
    recent = record(next.recent);
  }

  return {
    version: 1, username, fetchedAt: now.toISOString(), calendar,
    publicMergedCount: integer(record(data.allMerged).issueCount), repositories: verifiedRepos,
    recentMerges: [...new Map(recentMerges.map((pr) => [pr.url, pr])).values()]
      .sort((a, b) => b.mergedAt.localeCompare(a.mergedAt)).slice(0, 8),
    recentSince, recentComplete,
  };
}

export type GitHubResult = {
  snapshot: GitHubSnapshot | null;
  source: "live" | "saved" | "unavailable";
};

export async function withGitHubFallback(
  fetchSnapshot: () => Promise<GitHubSnapshot>,
  lastKnownGood: GitHubSnapshot | null,
): Promise<GitHubResult> {
  try {
    return { snapshot: await fetchSnapshot(), source: "live" };
  } catch {
    return { snapshot: lastKnownGood, source: lastKnownGood ? "saved" : "unavailable" };
  }
}
