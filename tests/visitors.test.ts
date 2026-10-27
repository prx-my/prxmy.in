import { strict as assert } from "node:assert";
import { test } from "node:test";
import { fetchVisitorSnapshot, parseVisitorSnapshot, withVisitorFallback } from "../src/lib/visitor-client.ts";

const response = {
  query: { since: "2026-10-10T00:00:00.000Z", until: "2026-10-28T00:00:00.000Z" },
  data: { visitors: 51, pageviews: 88 },
};
const saved = parseVisitorSnapshot(response, "2026-10-27T21:50:00.000Z");

test("uses visitor totals, not page views, and never labels future time as counted", () => {
  assert.equal(saved.visitors, 51);
  assert.equal(saved.pageviews, 88);
  assert.equal(saved.through, saved.fetchedAt);
  assert.throws(() => parseVisitorSnapshot({ ...response, data: { pageviews: 88 } }));
  assert.throws(() => parseVisitorSnapshot({ ...response, data: { visitors: -1, pageviews: 88 } }));
});

test("missing credentials perform no network request and preserve the verified count", async () => {
  let calls = 0;
  const result = await withVisitorFallback(() => fetchVisitorSnapshot({
    token: "", projectId: "project", teamId: "team",
    fetcher: async () => { calls++; throw new Error("unexpected network request"); },
  }), saved);
  assert.equal(calls, 0);
  assert.equal(result.source, "saved");
  assert.equal(result.snapshot, saved);
});

test("API failures and malformed totals preserve the last good count", async () => {
  for (const fakeResponse of [new Response("unavailable", { status: 503 }), Response.json({ data: { visitors: "lots" } })]) {
    const result = await withVisitorFallback(() => fetchVisitorSnapshot({
      token: "test-token", projectId: "project", teamId: "team", fetcher: async () => fakeResponse,
    }), saved);
    assert.equal(result.source, "saved");
    assert.equal(result.snapshot.visitors, 51);
  }
});

test("only the Vercel API receives the credential and a valid response refreshes the count", async () => {
  const result = await fetchVisitorSnapshot({ token: "test-token", projectId: "project", teamId: "team", fetcher: async (input, init) => {
    const url = new URL(String(input));
    assert.equal(url.origin, "https://api.vercel.com");
    assert.equal(url.searchParams.get("projectId"), "project");
    assert.equal(new Headers(init?.headers).get("Authorization"), "Bearer test-token");
    return Response.json({ ...response, data: { visitors: 52, pageviews: 90 } });
  } });
  assert.equal(result.visitors, 52);
  assert.equal("token" in result, false);
});
