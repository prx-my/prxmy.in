# Prakhar Gupta — noir editorial direction

This is a developer's portfolio with a 1930s detective/newspaper/comic sensibility. It should feel personal, curious and in motion while keeping the work readable.

## Visual decisions

- Warm ivory paper, ink black, aged beige, and deliberate vermilion red. Red marks actions, section punctuation and emphasis.
- Bodoni is the nameplate; Geist keeps body copy clear; monospace labels carry dates and small metadata. The comic layer adds its own lettering faces (see "Lettering" below). Newsreader stays only where existing pages already use it.
- The personal imprint is `prxmy.`: a compact lowercase Bodoni wordmark in the masthead, footer, 404 and social card, with the existing vermilion period. Prakhar Gupta remains the primary name. The favicon reduces the imprint to an outlined Bodoni `p` and red period for legibility at tab sizes.
- The full name has no terminal period. The closing section returns to the page's paper palette before the footer, with a compact verified visitor count and an interactive souvenir stamp. Hover lifts the paper, activation presses a vermilion mark, and repeat activation replays it without altering analytics. Keyboard feedback and reduced motion are supported.
- Headlines and body copy must have a visible hierarchy. Main text should not shrink to fit more decoration.
- Use the shared type scale: 16px body, 14px supporting copy, 13px compact controls, 12px metadata, and 18px small headings. Preserve these sizes at smaller breakpoints; rearrange the layout instead of shrinking text. Large serif headings and the nameplate provide the comic/editorial hierarchy.
- Double rules, figure captions, numbered case files, line illustrations and small web details provide the newspaper/comic character.
- Large black sections interrupt the paper rhythm. Avoid repeating identical light cards for every section.
- Project illustrations are original explanatory compositions, not mock screenshots or invented product data.
- Buttons share one height, spacing system and clear hover/focus behavior. No layered 3D flip lids or ornamental pill stacks on buttons. (The cover comic that opens is an object, not a button; see "Cover".)
- Motion is brief and tied to an object: ink arriving, a cover opening, a letter folding, a burst popping once. Respect reduced motion and keep ordinary document scrolling.
- Existing project descriptions, GitHub verification, booking, résumé, links and endorsements remain functional content.

## Secondary pages

`/book` uses the portfolio's shared editorial masthead and footer, theme control, Bodoni headlines, red punctuation, and ruled sections. Booking keeps the Cal.com flow in a paper scheduling sheet with a two-week date grid, meeting durations, and a short booking guide.

`/ecoaudit` is an independent EcoAudit team project brief. It pairs a Newsreader headline with Geist body text on an off-white surface. The desktop grid pairs the project overview with the playable demo, then research with the team directory. Smaller screens stack those sections in that order. See `src/app/ecoaudit/DESIGN.md` for route-specific guidance.

## The Prxmy Files (redesign/comic-noir)

The homepage is one noir comic issue, *The Prxmy Files #1*. Every section is something a comic already has, so the reader never has to learn a new interface: projects are case files, experience is a night shift, open source is field reports, booking is the letters page, and the résumé is the coupon on the back cover. Under it all, the comic is still being made: pencils → inks → one spot colour, the way a product moves from sketch to shipped.

The visual reference board, with working mockups, designer's notes and phone versions of every section, is the private artifact [The Prxmy Files](https://claude.ai/artifact/GXM1PDGzd6PBekX6KUaPRQ). Where this file and the board disagree, this file wins.

### References, and what not to take

- From rishabjs.xyz: one metaphor carried into every corner, down to the metadata. Each content type gets its native object (there: drawing sheets, a building section, a site diary).
- From panelpress.online: show the making. Non-photo-blue pencils before ink, registration marks, a cover you can open.
- Spider-Man Noir is mood only. No mask, spider emblem, webs, "thwip", Marvel or DC panels, or any licensed character. The lead is the original fedora detective in `public/art/the-night-shift.webp`.

### Colour

Noir works because almost everything is black and paper. Colour appears only where something gives off light or asks to be touched. Rough budget per screen: about half ink, a third paper, a little tone, and only slivers of red, amber and blue.

- `--ink` and `--paper` / `--ivory` carry the page. Greys are never flat: tone is Ben-Day dots or hatching.
- `--accent` (vermilion) means "you can click this", plus sound effects and stamps. Exactly one red-filled button per screen.
- `--lamp` (new, amber, around `#f0b445`) means "light is coming from here": lamps, lit windows, caption boxes, focus rings. Never body text.
- `--pencil` / `--pencil-ink` (non-photo blue) means "not finished yet": sketch lines, margin notes, unwritten copy, the next job's empty panels. Never body copy or actions.
- The light/dark toggle is a variant cover: "Day edition" (paper ground) and "Night variant". Some sections are black in both (cover, Night Shift, city skyline) so the page keeps its paper/black rhythm.

### Lettering

Comics are lettered, not typeset. Each face has one job.

| Role | Face | Used for |
| --- | --- | --- |
| Nameplate | Bodoni Moda 900 | Section titles, case names, the `prxmy.` wordmark, big numbers |
| Sound | Bangers | The hero name, sound effects, stamps. At most one sound effect per screen |
| Dialogue | Comic Neue Bold | Balloons, caption boxes, buttons. Caps for short lines, mixed case for long quotes so they read fast |
| Reading | Geist | Everything a recruiter actually reads. Never shrunk for decoration |
| Credits | Geist Mono | Dates, issue and PR numbers, docket fields. Real metadata only |
| Pencils | Caveat | Margin notes in `--pencil-ink`, always with a drawn arrow to what they mean |

Bangers replaces Permanent Marker for the hero name. Comic Neue is new. Keep the shared type scale above.

- No eyebrow (kicker) labels above headings. A caption box above a title is allowed only when it carries a narration sentence ("Delhi. Ten authorities, one inbox."), never a category label.

### Comic devices and their jobs

Every effect points at something real. If it isn't directing the eye, carrying a voice or marking time, it doesn't ship. All of them are CSS or inline SVG, with no image files.

- **Focus lines**: tapered wedges that converge on the one primary action on the screen.
- **Speech balloon**: a person speaking (first-person lines, endorsements in the speaker's own words). The tail points at the speaker. For someone who isn't drawn, the tail leaves the panel.
- **Thought cloud**: the hard part of a project, as inner monologue (`hardPart`).
- **Caption box** (amber): the narrator, for time, place and impact ("Why it mattered: …").
- **Sound-effect burst**: an event happened (an award, a merge, shipped). It pops once when scrolled into view, then sits still. Only used when the event is real; no burst on projects without one.
- **Stamps** (MERGED, DUPLICATE, TEAM, BOOKED): a system or status decision, with its date where there is one.
- **Ben-Day dots and hatching**: depth without grey; also the hover state on art.
- **Gutter captions** ("Meanwhile, by day…"): a cut in time or place between sections, instead of a plain divider.
- **Editor's footnote** ("See Case File #05. — Ed."): links within the site.
- **Misregistration** (the colour plates slipping apart): hover and focus on text links. Instant, no motion.

### Running order

Order is information: the ten-second facts come first and the play comes later.

1. **Cover**: name, role, one button, the comic.
2. **Previously in…**: a three-line recap and the résumé link. On the homepage it is plain text under the hero, and it is also page 2 inside the cover comic.
3. **The Cases** (projects): the homepage shows only each case's splash panel, linking to its case file.
4. **The Night Shift** (experience and education).
5. **Field Reports** (open source).
6. **The City at Night** (GitHub contribution skyline).
7. **Word on the Street** (endorsements as balloons, wins as burst flashes).
8. **Letters** (contact and booking).
9. **Back cover** (the résumé as a mail-order coupon ad).

Not on the homepage for now: "Previously in…" as plain text (it lives inside the cover comic), "Word on the Street" (the two endorsements sit in the Night Shift and Field Reports instead), and the old About and toolkit sections.

### Cover

- Left, on a black desk lit by a warm lamp glow and soft blind shadows: the name in Bangers (paper fill, red offset) as the real `h1`; the role in a caption box; the summary; one red button ("Pitch me a story", to the letters page) with focus lines; a pencil note ("30 min, no slides"); text links to résumé, GitHub, LinkedIn and X.
- Right: issue #1 as a physical comic, tilted −3°. Its cover has a corner box (issue number, month, "FREE"), *The Prxmy Files* logo, the night-shift art, a balloon from the detective ("Got a case? I'm taking it.") with its tail on his hat, one OPEN TO WORK burst, cover lines teasing what's inside (plain text: links that small, on an object you can click, are hard to tap), and a barcode drawn from 52 weeks of contributions.
- The art inks in over blue pencils on load and finishes clean, inside a paper-bordered panel.
- The comic tilts with a mouse pointer. "Open the file" (or clicking the comic) swings the cover back to show page 2, the recap. The inside page is `inert` while closed.
- Phone: the comic drops below the copy, doesn't tilt, and slides right as it opens.

### Case file (`/projects/[slug]`)

Read in tiers, like a comic page:

1. A docket strip: case number, year filed, status, place, **my part**.
2. A splash panel: a caption box, the name, the summary, and original diagram art. An award, if there is one, gets the page's only burst.
3. Three panels with slanted gutters: the hard part told as a sequence (for JanSamadhan: comes in → checked for duplicates → routed on the clock). On phones the slants straighten into a stack.
4. A thought cloud on the page's one black panel, beside **Exhibits**: each number lettered A–E next to what it measures.
5. The stack as evidence tags; "Open it live" is the red button, Demo and Source are outlined.
6. An editor's footnote for related cases, and a **Next issue** teaser box as next-case navigation.

Every project needs a "my part" line in `content.ts`. Until it has one, the docket shows a pencil note ("needs your line") in development, so the gap is visible to the author; production leaves the field out. JanSamadhan, RailMind and oracle-academy don't have one yet.

### The Night Shift (experience)

The title is literal: Schrader is in Traverse City, Michigan, so the agency's 9-to-5 falls in Jaipur's night.

- Live clocks for Jaipur and Traverse City (`Asia/Kolkata`, `America/Detroit`). A clock face turns dark with a moon at night.
- The opening line is calculated, never hard-coded: "Their 9 a.m. is 7:30 p.m. in Jaipur" (6:30 p.m. during US daylight saving).
- A 24-hour bar of Jaipur's day with the agency's 9–5 ET drawn on it, a red "now" line, and a lamp that lights during agency hours. The daylight shading is approximate and labelled so; the lamp follows a weekday 9–5, not anyone's real status.
- One docket strip per job, then panels. For Schrader: a badge with "freelancer" crossed out and TEAM stamped; a wall of 57 tally marks, one per merged PR; a night street on Grand Traverse Bay whose shop signs link to the client sites (schrader.co is the red one); an audit gauge with no invented score; Bret Schrader's quote in a balloon whose tail leaves the panel.
- "Shift 02, still in pencils": empty panels in non-photo blue with the "Pitch me a story" button.
- "Meanwhile, by day…": education on bright paper panels with SGPA and Class XII marks as big numbers.
- When a job ends, it gets a SHIFT ENDED stamp and folds down to its docket plus one panel.

### Field Reports (open source)

- "Bugs I found and fixed in other people's code", a red "verified on GitHub, refreshed hourly" seal, and one total (public merged PRs) dated to the snapshot.
- One manila folder per project, with tabs (a proper tablist; arrow keys move between tabs). Each tab shows stars and how many PRs were merged, from `src/data/github.json`.
- Inside each folder:
  - **Lead report**: the PR with a `why` becomes a typed report. It has the PR number as the report number, the repo, the merge date and lines changed; the incident in plain English; a "Why it mattered" caption box; a MERGED stamp with the date; and a lines-added/lines-removed bar.
  - **Maintainer reply**: clipped to the lead report and linked to the comment. A folder without one shows a pencil note in development only. Sugar Labs and FaceGate need a quote.
  - **Other highlighted PRs**: smaller report slips.
  - **The rest**: a plain table (number, date, what changed, lines).
  - **"All N merged ↗"**: GitHub's own search, so the folder never claims more than it shows.

### Letters (contact and booking)

- "Prxmy Post", a letters column. **The Mailbag** holds the questions a recruiter would ask, signed playfully ("— A hiring manager, probably") so they never read as real letters, and each is answered with a red **ED:** using only facts on the site. The email address is selectable text with a Copy button.
- Booking is a letter on prxmy. letterhead that keeps the existing Cal.com flow, read as one sentence: "Dear Prakhar, I'd like a [length] call. How about [day] at [time]." Then "Signed," with name and email, and the optional note as a P.S. The spam trap stays.
  - The 14-day date grid strikes through days with nothing open.
  - Times show in the visitor's own time zone, and the zone is named.
  - The submit button names the slot ("Post it: Fri 13 Nov, 9:30 p.m.") and stays disabled until a time is picked.
- On success, the letter folds into an envelope with a Jaipur postmark and a BOOKED stamp, followed by the existing confirmation copy and "Book another time". Errors use the existing messages.
- A doodle margin under the mailbag: drag to draw in blue pencil, and the line turns to ink on release. It stays on the visitor's screen.
- Phone: the letter comes before the mailbag.

### Interactions and motion

- Ink-in: each art panel arrives as pencils and is inked once when it first scrolls into view. Text is never hidden while this runs.
- One burst per screen, popped once (scale 0.6 → 1, about 180 ms).
- The cover opening (about 1 s), the letter folding (about 0.4 s), and pointer tilt on the cover comic only.
- A "Just the facts" switch in the masthead shows a plain text version without balloons and sound effects, for screen readers and busy readers.
- With reduced motion, everything arrives inked and still, the rain stops, and the cover and letter swap instantly. Focus lines stay because they are drawing, not motion.
- No scroll-jacking or page-turn hijacks. The comic is in the art direction, not in the controls.

### Rules that keep it hireable

- Name, role, location, availability and the résumé are reachable in the first screen. Nothing important sits behind an interaction.
- Balloons, captions and stamps are real HTML or SVG text, in reading order.
- Numbers are exact and sourced: from `content.ts`, the GitHub snapshot, or calculated live. No invented scores, schedules or testimonials. Gaps in the copy show as pencil notes in development and are left out in production.
- Original art only, documented below like the current hero art.
- Copy for the hero lives in `hero` in `src/content.ts`.

## Original artwork

`public/art/the-night-shift.webp` was generated specifically for this portfolio using the built-in image generation tool, then converted to WebP for delivery. It replaces the reference portfolio's banner. No reference image was supplied to the generation call.

Final generation prompt:

> Use case: illustration-story. Asset type: an original editorial illustration for Prakhar Gupta's developer portfolio, in a narrow portrait panel on the right of a newspaper-style hero. Create a new composition, not a website mockup. Scene: a solitary anonymous 1930s detective in a fedora and long coat, seen in three-quarter back view at an office desk late at night, investigating a technical case. His silhouette leans over a typewriter-like compact terminal and diagrams on paper. A severe shaft of light from venetian blinds cuts diagonally across the desk; a window behind him contains a few spare geometric building silhouettes and a tiny moon. A red thread connects three pins on one sheet, evoking a system diagram rather than a crime wall. Strong graphic composition with large areas of clean near-black shadow and cream negative space, angular graphic-novel inking, hand-cut linocut lines, limited fine halftone, tactile ink on warm newsprint. Distinctive high-contrast 1930s pulp detective editorial art. Palette limited to warm ivory #f1e7d2, ink black #151411, warm beige #d5c5a3 and one restrained but saturated vermilion red #bc3026 on the desk lamp and thread. Portrait aspect ratio approximately 4:5. Beautifully controlled negative space and bold readable silhouette at small display size. No text, typography, letters, numbers, logos, watermarks, existing comic panels, recognizable superhero costume, or recognizable actor. Original illustration, not copied from any portfolio reference. Image must fill the whole frame; no outer page border.

The project diagrams in `src/components/project-visual.tsx` are original code-native SVG compositions.
