import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import {
  contributionPeriod, fetchGitHubSnapshot, GitHubError, parseCalendar, withGitHubFallback,
  type GitHubSnapshot,
} from "../src/lib/github-client.ts";

const now = new Date("2026-10-27T13:00:00.000Z");
const period = contributionPeriod(now);
const selection = [{ fullName: "OWASP/cve-lite-cli", pullRequests: [12, 13] }];

function rawCalendar(from = period.from, to = period.to) {
  const days = [];
  for (let time = Date.parse(from.slice(0, 10)); time <= Date.parse(to.slice(0, 10)); time += 86_400_000) {
    days.push({ date: new Date(time).toISOString().slice(0, 10), contributionCount: time % 3 });
  }
  return { totalContributions: days.reduce((sum, day) => sum + day.contributionCount, 0), weeks: [{ contributionDays: days }] };
}

function pr(number: number, mergedAt = "2026-10-20T00:00:00Z", overrides = {}) {
  return {
    number, title: `Verified PR ${number}`, url: `https://github.com/OWASP/cve-lite-cli/pull/${number}`,
    state: "MERGED", mergedAt, additions: 5, deletions: 2,
    author: { login: "prx-my" }, repository: { nameWithOwner: "OWASP/cve-lite-cli", isPrivate: false },
    ...overrides,
  };
}

function responseData() {
  return {
    user: { contributionsCollection: { contributionCalendar: rawCalendar() } },
    allMerged: { issueCount: 321 },
    repo0: {
      nameWithOwner: "OWASP/cve-lite-cli", url: "https://github.com/OWASP/cve-lite-cli",
      description: "Vulnerability scanner", stargazerCount: 774, isPrivate: false,
      pr12: pr(12), pr13: pr(13, "2026-10-21T00:00:00Z"),
    },
    merged0: { issueCount: 45 },
    recent: { nodes: [pr(12)], pageInfo: { hasNextPage: false, endCursor: null as string | null } },
  };
}

function mockFetch(data: unknown, inspect?: (init: RequestInit) => void): typeof fetch {
  return (async (_url, init) => {
    inspect?.(init!);
    return new Response(JSON.stringify({ data }), { status: 200 });
  }) as typeof fetch;
}

test("rolling period includes today and spans twelve calendar months in UTC", () => {
  assert.deepEqual(period, { from: "2025-10-28T00:00:00.000Z", to: now.toISOString() });
  assert.equal(contributionPeriod(new Date("2026-01-01T00:00:00Z")).from, "2025-01-02T00:00:00.000Z");
  assert.equal(contributionPeriod(new Date("2024-02-29T12:00:00Z")).from, "2023-03-01T00:00:00.000Z");
  const leap = contributionPeriod(new Date("2025-02-28T12:00:00Z"));
  assert.equal(leap.from, "2024-02-29T00:00:00.000Z");
});

test("calendar checks date coverage, duplicate days, and API totals", () => {
  const valid = rawCalendar();
  const calendar = parseCalendar(valid, period);
  assert.equal(calendar.weeks.flatMap((week) => week.contributionDays).length, 365);
  assert.equal(calendar.totalContributions, valid.totalContributions);
  assert.throws(() => parseCalendar({ ...valid, totalContributions: valid.totalContributions + 1 }, period), GitHubError);
  const missing = structuredClone(valid);
  missing.weeks[0].contributionDays.splice(30, 1);
  assert.throws(() => parseCalendar(missing, period), GitHubError);
  const duplicate = structuredClone(valid);
  duplicate.weeks[0].contributionDays[20] = duplicate.weeks[0].contributionDays[21];
  assert.throws(() => parseCalendar(duplicate, period), GitHubError);
});

test("uses authoritative count fields independently of fetched PR page sizes", async () => {
  const snapshot = await fetchGitHubSnapshot({
    token: "test-secret", username: "prx-my", repositories: selection, now,
    fetcher: mockFetch(responseData(), (init) => {
      const body = JSON.parse(init.body as string);
      assert.match(body.variables.all, /is:pr is:merged is:public author:prx-my/);
      assert.match(body.query, /repo:OWASP\/cve-lite-cli/);
      assert.equal(init.cache, "no-store");
      assert.equal((init.headers as Record<string, string>).Authorization, "Bearer test-secret");
    }),
  });
  assert.equal(snapshot.publicMergedCount, 321);
  assert.equal(snapshot.repositories[0].mergedCount, 45);
  assert.equal(snapshot.repositories[0].highlights.length, 2);
  assert.equal(snapshot.recentMerges.length, 1);
  assert.ok(!JSON.stringify(snapshot).includes("test-secret"));
});

test("never serializes private, unmerged, or differently authored pull requests", async () => {
  const data = responseData();
  data.repo0.pr12 = pr(12, "2026-10-20T00:00:00Z", { state: "OPEN", mergedAt: null });
  data.repo0.pr13 = pr(13, "2026-10-20T00:00:00Z", { author: { login: "someone-else" } });
  data.recent.nodes = [pr(12, "2026-10-20T00:00:00Z", { repository: { nameWithOwner: "secret/private", isPrivate: true } })];
  const snapshot = await fetchGitHubSnapshot({ token: "test", username: "prx-my", repositories: selection, now, fetcher: mockFetch(data) });
  assert.deepEqual(snapshot.repositories[0].highlights, []);
  assert.deepEqual(snapshot.recentMerges, []);
  assert.ok(!JSON.stringify(snapshot).includes("secret/private"));
});

test("paginates recent results and sorts by merge time instead of update order", async () => {
  const data = responseData();
  data.recent.pageInfo = { hasNextPage: true, endCursor: "next-page" };
  let requests = 0;
  const fetcher = (async (_url: unknown, init: RequestInit) => {
    requests++;
    if (requests === 1) return new Response(JSON.stringify({ data }));
    assert.equal(JSON.parse(init.body as string).variables.after, "next-page");
    return new Response(JSON.stringify({ data: { recent: {
      nodes: [pr(13, "2026-10-25T00:00:00Z"), pr(12)], pageInfo: { hasNextPage: false, endCursor: null },
    } } }));
  }) as typeof fetch;
  const snapshot = await fetchGitHubSnapshot({ token: "test", username: "prx-my", repositories: selection, now, fetcher });
  assert.equal(requests, 2);
  assert.deepEqual(snapshot.recentMerges.map((item) => item.number), [13, 12]);
  assert.equal(snapshot.recentComplete, true);
});

test("rate limits and GraphQL errors reject rather than becoming zero metrics", async () => {
  for (const response of [
    new Response("{}", { status: 429 }),
    new Response("{}", { status: 403, headers: { "x-ratelimit-remaining": "0" } }),
    new Response(JSON.stringify({ errors: [{ type: "RATE_LIMITED", message: "limited" }] })),
  ]) {
    await assert.rejects(fetchGitHubSnapshot({ token: "test", username: "prx-my", repositories: selection, now, fetcher: (async () => response) as typeof fetch }), { kind: "rate-limit" });
  }
  await assert.rejects(fetchGitHubSnapshot({ token: "test", username: "prx-my", repositories: selection, now, fetcher: (async () => { throw new Error("network offline"); }) as typeof fetch }), { kind: "upstream" });
  const data = responseData();
  const incomplete = { ...data, allMerged: {} };
  await assert.rejects(fetchGitHubSnapshot({ token: "test", username: "prx-my", repositories: selection, now, fetcher: mockFetch(incomplete) }), GitHubError);
});

test("missing token performs no request and returns the exact last verified snapshot", async () => {
  const saved = JSON.parse(readFileSync(new URL("../src/data/github.json", import.meta.url), "utf8")) as GitHubSnapshot;
  const failing = () => fetchGitHubSnapshot({ token: "", username: "prx-my", repositories: selection, now, fetcher: (() => { assert.fail("Must not fetch without a token"); }) as typeof fetch });
  const fallback = await withGitHubFallback(failing, saved);
  assert.equal(fallback.source, "saved");
  assert.equal(fallback.snapshot, saved);
  assert.equal(fallback.snapshot?.fetchedAt, saved.fetchedAt);
  assert.deepEqual(await withGitHubFallback(failing, null), { source: "unavailable", snapshot: null });
});

test("a successful refresh replaces stale data and preserves its genuine fetchedAt", async () => {
  const fresh = await fetchGitHubSnapshot({ token: "test", username: "prx-my", repositories: selection, now, fetcher: mockFetch(responseData()) });
  const result = await withGitHubFallback(async () => fresh, null);
  assert.equal(result.source, "live");
  assert.equal(result.snapshot?.fetchedAt, now.toISOString());
});

test("committed snapshot has a complete calendar and only public GitHub links", () => {
  const snapshot = JSON.parse(readFileSync(new URL("../src/data/github.json", import.meta.url), "utf8")) as GitHubSnapshot;
  assert.equal(snapshot.version, 1);
  assert.equal(snapshot.username, "prx-my");
  parseCalendar(snapshot.calendar, snapshot.calendar);
  assert.ok(snapshot.repositories.every((repo) => Number.isInteger(repo.mergedCount) && repo.url.startsWith("https://github.com/")));
  assert.ok(snapshot.recentMerges.every((pr) => pr.mergedAt && pr.url.startsWith("https://github.com/")));
});
