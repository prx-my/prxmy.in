# Prakhar Gupta — noir editorial direction

This is a developer's portfolio with a 1930s detective/newspaper/comic sensibility. It should feel personal, curious and in motion while keeping the work readable.

## Visual decisions

- Warm ivory paper, ink black, aged beige, and deliberate vermilion red. Red marks actions, section punctuation and emphasis.
- Bodoni is the nameplate; Newsreader supplies editorial headlines and quotations; Geist keeps body copy clear; monospace labels carry dates and small metadata.
- The personal imprint is `prxmy.`: a compact lowercase Bodoni wordmark in the masthead, footer, 404 and social card, with the existing vermilion period. Prakhar Gupta remains the primary name. The favicon reduces the imprint to an outlined Bodoni `p` and red period for legibility at tab sizes.
- The full name has no terminal period. The closing section returns to the page's paper palette before the footer, with a compact verified visitor count and an interactive souvenir stamp. Hover lifts the paper, activation presses a vermilion mark, and repeat activation replays it without altering analytics. Keyboard feedback and reduced motion are supported.
- Headlines and body copy must have a visible hierarchy. Main text should not shrink to fit more decoration.
- Use the shared type scale: 16px body, 14px supporting copy, 13px compact controls, 12px metadata, and 18px small headings. Preserve these sizes at smaller breakpoints; rearrange the layout instead of shrinking text. Large serif headings and the nameplate provide the comic/editorial hierarchy.
- Double rules, figure captions, numbered case files, line illustrations and small web details provide the newspaper/comic character.
- Large black sections interrupt the paper rhythm. Avoid repeating identical light cards for every section.
- Project illustrations are original explanatory compositions, not mock screenshots or invented product data.
- Buttons share one height, spacing system and clear hover/focus behavior. No layered 3D flip lids or ornamental pill stacks.
- Motion is brief: hero arrival, small link movements and project-art hover feedback. Respect reduced motion and keep ordinary document scrolling.
- Existing project descriptions, GitHub verification, booking, résumé, links and endorsements remain functional content.

## Original artwork

`public/art/the-night-shift.webp` was generated specifically for this portfolio using the built-in image generation tool, then converted to WebP for delivery. It replaces the reference portfolio's banner. No reference image was supplied to the generation call.

Final generation prompt:

> Use case: illustration-story. Asset type: an original editorial illustration for Prakhar Gupta's developer portfolio, in a narrow portrait panel on the right of a newspaper-style hero. Create a new composition, not a website mockup. Scene: a solitary anonymous 1930s detective in a fedora and long coat, seen in three-quarter back view at an office desk late at night, investigating a technical case. His silhouette leans over a typewriter-like compact terminal and diagrams on paper. A severe shaft of light from venetian blinds cuts diagonally across the desk; a window behind him contains a few spare geometric building silhouettes and a tiny moon. A red thread connects three pins on one sheet, evoking a system diagram rather than a crime wall. Strong graphic composition with large areas of clean near-black shadow and cream negative space, angular graphic-novel inking, hand-cut linocut lines, limited fine halftone, tactile ink on warm newsprint. Distinctive high-contrast 1930s pulp detective editorial art. Palette limited to warm ivory #f1e7d2, ink black #151411, warm beige #d5c5a3 and one restrained but saturated vermilion red #bc3026 on the desk lamp and thread. Portrait aspect ratio approximately 4:5. Beautifully controlled negative space and bold readable silhouette at small display size. No text, typography, letters, numbers, logos, watermarks, existing comic panels, recognizable superhero costume, or recognizable actor. Original illustration, not copied from any portfolio reference. Image must fill the whole frame; no outer page border.

The project diagrams in `src/components/project-visual.tsx` are original code-native SVG compositions.
