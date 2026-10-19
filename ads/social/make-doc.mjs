/* Writes docs/meta/facebook-calendar.md from calendar.mjs, so the calendar
   the daily task reads and the posts it publishes are one source.
   Run from the repo root: node ads/social/make-doc.mjs */
import { writeFileSync } from "node:fs";
import { POSTS, caption } from "./calendar.mjs";

const STYLE = { plain: "PLAIN", calendar: "calendar art", signboard: "signboard", matchbox: "matchbox" };
const asset = (p) => (p.motion ? `ads/social/posts/${p.date}/video.mp4` : `ads/social/posts/${p.date}/card.png`);
const when = (p) => new Date(`${p.date}T12:00:00Z`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

const out = [];
out.push(`# Facebook calendar, 17 October to 15 November 2026

Thirty posts for the Snanify Page, one a day, each ready to publish: the words, the card or
video, the link. Each is scheduled in Facebook's own scheduler for 05:00 New York, so Meta
publishes it; the daily task \`snanify-facebook-posts\` checks every morning that the next 3
days are in the Planner and schedules any that are missing. Generated from
\`ads/social/calendar.mjs\` by \`node ads/social/make-doc.mjs\`: edit the module, not this file.

**The mix.** Three buckets, in turn: the dates (occasions, the panchang, Kartik snan day by
day), the rivers (the six waters, their stories and names) and the practice (the sankalp,
the breath, the Patra, Kartik customs). Hindi every Saturday. Every post ends on the snan:
front and centre on a dated day and on the Friday Patra, lighter on a river or a practice day.

**The look.** The brand kit (\`brand/README.md\`; \`DESIGNSYSTEM.md\` is canonical). PLAIN by
default: solid marigold, ink capitals with the river's name in sindoor, the press on its ink
wall, the seal, the river at the foot. Calendar art for festival days, the signboard for a
few loud days, the matchbox label for the eleven-morning pack only. Hindi on the cards in
Noto Serif Devanagari with Devanagari numerals. Fifteen posts move (an MP4, 4:5, 7 seconds,
the breath 21, silent, its last frame as \`poster.png\`), in the brand's own motions only:
flow, pull, stamp, sink, breathe and count. Facebook publishes a Page video as a reel.

**The facts.** Dates from \`resolveOccasion()\`, hours from \`cityDay()\` and astronomy-engine at
each ghat, computed 16 October 2026 (\`ads/social/_sky.json\`). Stories from
\`src/content/rivers.ts\` and \`src/content/data/muhurat.json\`. Live river figures are left
out: each post sends the reader to today's. \`node ads/social/check.mjs\` holds every word to
the copy rules.

**Re-render** after an edit: \`node ads/social/render.mjs <date>\` (or all, with no date), then
\`node ads/social/make-doc.mjs\`.

| Date | Theme | Style | Asset | CTA | Link |
| --- | --- | --- | --- | --- | --- |`);
for (const p of POSTS) {
  out.push(`| ${when(p)} | ${p.theme} | ${STYLE[p.style]}${p.lang === "hi" ? ", Hindi" : ""} | ${p.motion ? "video" : "still"} | ${p.cta === "front" ? "front" : "light"} | \`${p.path}\` |`);
}
out.push("");
for (const p of POSTS) {
  out.push(`## ${when(p)}: ${p.theme}

- Asset: \`${asset(p)}\`${p.motion ? ` (poster \`ads/social/posts/${p.date}/poster.png\`)` : ""}
- Style: ${STYLE[p.style]}, ${p.lang === "hi" ? "Hindi" : "English"}, ${p.motion ? "video" : "still"}
- Post text, exactly as it goes up (also in \`ads/social/posts/${p.date}/post.txt\`):

\`\`\`text
${caption(p)}
\`\`\`
`);
}
writeFileSync("docs/meta/facebook-calendar.md", out.join("\n"));
console.log("docs/meta/facebook-calendar.md");
