# prxmy.in

Prakhar Gupta’s portfolio. Next.js App Router, TypeScript, Tailwind CSS v4, hosted on Vercel.

## Development

Use Node.js 22.18 or newer (the snapshot command and tests use native TypeScript support).

```bash
npm install
npm run dev
```

Curated biography, project descriptions, professional claims, links and education live in `src/content.ts`.

The current homepage is an original noir editorial design: ivory newsprint, ink-black panels, vermilion actions, a Bodoni nameplate and an original detective illustration. Project work is presented as numbered case files with custom SVG illustrations and full detail pages. See [DESIGN.md](DESIGN.md) for the design direction and artwork prompt, and [ATTRIBUTION.md](ATTRIBUTION.md) for provenance.

The previous reference-based design was committed as `da506ae` before the redesign. The copied banner and reference UI components have been removed. Existing GitHub data, Cal.com booking, résumé/PDF URLs, AWS pages, redirects, analytics and endorsements remain connected.

The keyboard index opens with its button or Cmd/Ctrl+K, supports search and arrow keys, and closes with Escape. Disclosure lists remain native controls; motion respects reduced-motion preferences. Featured work begins with EcoAudit, JanSamadhan and RailMind.

## Sharing, analytics, and visitors

`/opengraph-image` generates a 1200×630 social card using the portfolio artwork and bundled, OFL-licensed Bodoni and Geist fonts. Open Graph and X/Twitter large-image metadata use the canonical `https://www.prxmy.in` domain. The custom `not-found.tsx` covers unmatched URLs and missing projects, with a noindex tag and links back to the work.

Vercel Web Analytics is mounted once in the root layout and enabled on the existing Vercel project. The closing section before the footer uses the official Analytics `visits/count` API's **visitors** field, separately from page views. Counts follow Vercel's anonymized daily visitor methodology; they are not an all-time count of distinct people. The public section omits analytics labels and dates. Its keyboard-accessible souvenir stamp is a local visual interaction: it can be replayed, does not submit or store a guestbook entry, and never changes the verified visitor count. Animation respects reduced-motion preferences.

Set a dedicated, server-only `VERCEL_ANALYTICS_TOKEN` in Vercel Production to refresh the total hourly. Redeploy after adding the variable. The token is sent only to Vercel's API and is never passed to the browser. A timeout, invalid response, missing token, or API failure preserves the last verified total. Source dates remain in the sanitized snapshot for verification.

`src/data/visitors.json` is a real, sanitized Analytics snapshot. Refresh it using your existing local Vercel CLI login with `npm run visitors:refresh`; this writes only totals and timestamps and does not copy the CLI credential into the app. Official API reference: [Vercel Web Analytics API](https://vercel.com/docs/analytics/web-analytics-api).

This checkout is `noir-site`, separate from the workspace's `portfolio-site` copy and résumé drafts. For a preview alongside another checkout, use `npm run dev -- --port 3002`.

## Environment

Copy the entries you need from `.env.example` into `.env.local`. Keep this file out of Git.

- `CAL_API_KEY`: existing Cal.com integration.
- `GITHUB_TOKEN`: server-only GitHub token. Never use a `NEXT_PUBLIC_` prefix.

For GitHub, create a **fine-grained personal access token** with access to **public repositories only**, and no write permissions. Public repository read access is included by GitHub; this integration does not require access to private repositories, organization administration, workflow modification, or repository writes. Use an expiration date and rotate it when needed. The token stays in the server environment and the authorization header; only sanitized metrics reach the page.

Add `GITHUB_TOKEN` to the existing Vercel project’s Preview and Production environment settings, then redeploy. Adding an environment variable does not change an already-created deployment. Restart the dev server after adding it locally.

Official authentication reference: [GitHub GraphQL authentication](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-a-personal-access-token).

## GitHub data and refresh

The server calls the official GitHub GraphQL API. It retrieves:

- `contributionsCollection.contributionCalendar.totalContributions` and every date/count in `weeks.contributionDays` for a rolling twelve-month period, inclusive of today, in UTC. The period begins the day after the previous-year anniversary, with leap-day handling.
- All-time public authored merged PRs from `search.issueCount`, using `is:pr is:merged is:public author:prx-my`.
- Separate all-time counts for `OWASP/cve-lite-cli`, `sugarlabs/musicblocks-v4`, and `dweep-desai/FaceGate-Mac`. The latter is the actual repository owner behind the FaceGate project.
- Real star counts, public repository metadata, merged status, merge dates, and additions/deletions for curated PRs.
- Public PRs merged in the last 90 days, paginated and sorted by merge time. Search is capped at GitHub’s 1,000-result limit; if that cap is reached the UI says “Selected recent merges.”

Calendar totals follow GitHub’s visibility rules and can include anonymous private contribution counts. Private repository names, PR titles, and links are never fetched for display. Public merged-PR totals also include the owner’s public repositories, so they are deliberately distinguished from the three featured upstream projects. Agency outcomes and private work remain curated content.

Both the data function and rendered homepage use this version’s `use cache` / `cacheLife` APIs: 5-minute client staleness, **one-hour background revalidation**, and a one-day expiry. The statically rendered page is reused between refreshes on Vercel; visitors do not each make a GitHub API request. Refresh is traffic-triggered after the hour, not an exact scheduled cron. Development mode may re-fetch more often.

### Verified fallback

`src/data/github.json` is a sanitized snapshot fetched from GitHub, not sample data. It provides a usable first render without a token and survives serverless cold starts and deployments. A warm server also retains its latest successful refresh. Rate limits, timeouts, malformed responses, and missing credentials preserve the previous verified data; no failed count is replaced by zero. Without any verified data, the page links to GitHub and says activity is unavailable.

The UI always shows the successful fetch timestamp and the actual calendar date range. When a refresh fails, it explicitly labels the saved snapshot. A cold instance can fall back to the committed snapshot, which may be older than its last runtime refresh; refresh the snapshot before deployments to keep that fallback current.

```bash
# Reads GITHUB_TOKEN from .env.local or the environment.
npm run github:refresh

# Local alternative: use your existing authenticated GitHub CLI session.
# The CLI credential is held in memory and is never written to the project.
npm run github:refresh -- --gh
```

The command replaces the snapshot atomically, only after a complete successful fetch. Review and commit the JSON alongside deployment changes. No scheduled GitHub Actions workflow is needed for the current server-capable Vercel deployment.

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Tests cover date boundaries and leap years, calendar coverage, true count fields, PR pagination and ordering, private/unmerged PR filtering, API errors, and last-known-good fallbacks.

The calendar supports arrow-key navigation with one tab stop per visible panel; Home/End jump to the boundaries. Mobile layouts split the year into two panels with no nested scrolling. Disclosure lists use native details/summary, and motion respects reduced-motion preferences.

## Résumé

The existing résumé is `public/prakhar-resume.pdf`, served by both `/resume` and `/resume.pdf`. Replace that file when the updated résumé is ready. Keep the existing filename to preserve shared links. The older TeX source is retained separately and is not automatically synchronized with the PDF.
