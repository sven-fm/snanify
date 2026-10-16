/* Writes docs/meta/facebook-calendar.md from calendar.mjs, so the calendar
   the daily task reads and the posts it publishes are one source.
   Run from the repo root: node ads/social/make-doc.mjs */
import { writeFileSync } from "node:fs";
import { POSTS, caption } from "./calendar.mjs";

const STYLE = { B1: "B1 calendar art", B2: "B2 matchbox", B4: "B4 signboard" };
const asset = (p) => (p.motion ? `ads/social/posts/${p.date}/video.mp4` : `ads/social/posts/${p.date}/card.png`);
const when = (p) => new Date(`${p.date}T12:00:00Z`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

const out = [];
out.push(`# Facebook calendar, 17 October to 15 November 2026

Thirty posts for the Snanify Page, one a day, each ready to publish: the words, the card or
video, the link. The daily task \`snanify-facebook-posts\` reads this file each morning, takes
the day's row and schedules it for about 05:00 New York. Generated from
\`ads/social/calendar.mjs\` by \`node ads/social/make-doc.mjs\`: edit the module, not this file.

**The mix.** Three buckets, in turn: the dates (occasions, the panchang, Kartik snan day by
day), the rivers (the six waters, their stories and names) and the practice (the sankalp,
the breath, the Patra, Kartik customs). Hindi every Saturday. Every post ends on the snan:
front and centre on a dated day and on the Friday Patra, lighter on a river or a practice day.

**The look.** B1 calendar art for festival days and the panchang, B2 the matchbox label for
the rivers and the price, B4 the painted signboard for the loud days. Fifteen posts move (an
MP4, 4:5, 7 to 21 seconds, silent, its last frame as \`poster.png\`); fifteen are still.

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
