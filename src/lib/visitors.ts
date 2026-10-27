import "server-only";
import savedSnapshot from "@/data/visitors.json";
import { fetchVisitorSnapshot, withVisitorFallback, type VisitorSnapshot } from "./visitor-client";

let lastKnownGood: VisitorSnapshot = savedSnapshot;

export async function getVisitorStats() {
  // The cached homepage owns the hourly refresh. A second cache here would
  // let a stale inner result be recached for another full hour.
  const result = await withVisitorFallback(() => fetchVisitorSnapshot({
    token: process.env.VERCEL_ANALYTICS_TOKEN ?? "",
    projectId: "prj_imfOsYCFtH7JkqGw5ZXvcGXTlTYj",
    teamId: "team_g6EAiWuE5Ch2kMIZwgRIbNvT",
  }), lastKnownGood);
  if (result.source === "live") lastKnownGood = result.snapshot;
  return result;
}
