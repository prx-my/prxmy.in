import { execFileSync } from "node:child_process";
import { writeFile, rename } from "node:fs/promises";
import { parseVisitorSnapshot } from "../src/lib/visitor-client.ts";

// Uses the existing CLI login locally; no access token is written into the repo.
const query = new URLSearchParams({
  projectId: "prj_imfOsYCFtH7JkqGw5ZXvcGXTlTYj",
  teamId: "team_g6EAiWuE5Ch2kMIZwgRIbNvT",
});
const result = execFileSync("vercel", ["api", `/v1/query/web-analytics/visits/count?${query}`, "--scope", "prakhar-devs-projects", "--raw"], { encoding: "utf8", timeout: 15000, maxBuffer: 1024 * 1024 });
const snapshot = parseVisitorSnapshot(JSON.parse(result));
const target = new URL("../src/data/visitors.json", import.meta.url);
const temporary = new URL(`${target}.tmp`);
await writeFile(temporary, `${JSON.stringify(snapshot, null, 2)}\n`);
await rename(temporary, target);
console.log(`Saved ${snapshot.visitors} verified visitors through ${snapshot.through}.`);
