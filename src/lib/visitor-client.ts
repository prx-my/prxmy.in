export type VisitorSnapshot = {
  visitors: number;
  pageviews: number;
  from: string;
  through: string;
  fetchedAt: string;
};

export function parseVisitorSnapshot(payload: unknown, fetchedAt = new Date().toISOString()): VisitorSnapshot {
  const value = payload as { data?: { visitors?: unknown; pageviews?: unknown }; query?: { since?: unknown; until?: unknown } } | null;
  const visitors = value?.data?.visitors;
  const pageviews = value?.data?.pageviews;
  const from = value?.query?.since;
  const through = value?.query?.until;
  if (typeof visitors !== "number" || !Number.isSafeInteger(visitors) || visitors < 0 ||
      typeof pageviews !== "number" || !Number.isSafeInteger(pageviews) || pageviews < visitors ||
      typeof from !== "string" || !Number.isFinite(Date.parse(from)) ||
      typeof through !== "string" || !Number.isFinite(Date.parse(through)) || Date.parse(through) < Date.parse(from)) {
    throw new Error("Invalid visitor analytics response");
  }
  // Vercel's default range can end at the next UTC midnight. The visible
  // timestamp must never imply that future traffic has already been counted.
  const countedThrough = new Date(Math.min(Date.parse(through), Date.parse(fetchedAt))).toISOString();
  return { visitors, pageviews, from, through: countedThrough, fetchedAt };
}

export async function fetchVisitorSnapshot({ token, projectId, teamId, fetcher = fetch }: {
  token: string;
  projectId: string;
  teamId: string;
  fetcher?: typeof fetch;
}): Promise<VisitorSnapshot> {
  if (!token) throw new Error("Visitor analytics token is not configured");
  const url = new URL("https://api.vercel.com/v1/query/web-analytics/visits/count");
  url.searchParams.set("projectId", projectId);
  url.searchParams.set("teamId", teamId);
  const response = await fetcher(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`Visitor analytics request failed (${response.status})`);
  return parseVisitorSnapshot(await response.json());
}

export async function withVisitorFallback(load: () => Promise<VisitorSnapshot>, saved: VisitorSnapshot) {
  try {
    return { snapshot: await load(), source: "live" as const };
  } catch {
    return { snapshot: saved, source: "saved" as const };
  }
}
