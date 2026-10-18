/* ---------------------------------------------------------------------------
   The two pictures the email carries (spec 6.8), rendered once and hosted on
   the site, because a mail client loads neither Eczar nor an inline SVG:

     public/email/river-600x120.png  the river, from src/lib/river-geometry.ts:
                                     teal ripples, the sindoor sun cut by the
                                     horizon, the marigold path on the water
     public/email/logo-480.png       the mark and the wordmark, the wordmark
                                     OUTLINED from Eczar 800 (src/lib/typeset.ts)

   Run after the river geometry, the mark or the palette changes, and commit
   what it writes:

     npm run email-art

   `--conditions=react-server` lets Node import typeset.ts, whose `server-only`
   guard is empty under that condition.
   --------------------------------------------------------------------------- */

import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { markSvg } from "../src/lib/logo-svg.ts";
import { PALETTE } from "../src/lib/palette.ts";
import { horizonSun, sunPath, waveRows } from "../src/lib/river-geometry.ts";
import { typeset } from "../src/lib/typeset.ts";

const P = PALETTE.day;
const out = (name) => fileURLToPath(new URL(`../public/email/${name}`, import.meta.url));
mkdirSync(out(""), { recursive: true });

/* --- the river, 600 x 120 ------------------------------------------------- */

const W = 600;
const H = 120;
const HORIZON = 34;
const SUN_X = 400;

function riverSvg() {
  const rows = waveRows({ width: W, height: H, rows: 16, top: HORIZON });
  const sun = horizonSun({ cx: SUN_X, horizonY: HORIZON, r: 20 });
  const waves = rows
    .map((row) => {
      /* The polyline spans 0..2W so the page can slide it; the email shows the first W. */
      const pts = row.points
        .split(" ")
        .filter((p) => Number(p.split(",")[0]) <= W + 6)
        .join(" ");
      return `<polyline points="${pts}" fill="none" stroke="${P.teal}" stroke-width="${row.stroke}" stroke-opacity="${row.opacity}"/>`;
    })
    .join("");
  const path = sunPath(rows, { sunX: SUN_X, width: W })
    .map((d) => `<rect x="${d.x}" y="${d.y}" width="${d.w}" height="${d.h}" fill="${P.marigold}"/>`)
    .join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<defs><clipPath id="sky"><rect width="${W}" height="${sun.clipBelow}"/></clipPath>` +
    `<clipPath id="water"><rect y="${HORIZON}" width="${W}" height="${H - HORIZON}"/></clipPath></defs>` +
    `<rect width="${W}" height="${H}" fill="${P.paper}"/>` +
    `<circle cx="${sun.cx}" cy="${sun.cy}" r="${sun.r}" fill="${P.sindoor}" clip-path="url(#sky)"/>` +
    `<rect y="${HORIZON}" width="${W}" height="2" fill="${P.ink}"/>` +
    `<g clip-path="url(#water)">${waves}${path}</g>` +
    `</svg>`
  );
}

await sharp(Buffer.from(riverSvg()), { density: 72 }).resize(W, H).png().toFile(out("river-600x120.png"));

/* --- the logo, 480 x 112 -------------------------------------------------- */

const LW = 480;
const LH = 112;
const MARK = 96;
const SIZE = 92;
const BASE = 82;
const TRACK = -0.015;

async function logoSvg() {
  const x0 = MARK + 18;
  /* The dotless i carries the bindu, as <Wordmark /> draws it: 0.237em across,
     foot 0.543em above the baseline, centred 53.6% into the i's box. */
  const head = await typeset("Snan", { size: SIZE, x: x0, y: BASE, weight: 800, fill: P.ink, tracking: TRACK });
  const i = await typeset("ı", { size: SIZE, x: x0 + head.width, y: BASE, weight: 800, fill: P.ink, tracking: TRACK });
  const tail = await typeset("fy", { size: SIZE, x: x0 + head.width + i.width, y: BASE, weight: 800, fill: P.ink, tracking: TRACK });
  const d = 0.237 * SIZE;
  const bx = x0 + head.width + i.width * 0.536;
  const by = BASE - 0.543 * SIZE - d / 2;
  const mark = markSvg({ size: MARK, day: { paper: P.paper, ink: P.ink, sun: P.sindoor, water: P.teal } }).replace(
    "<svg ",
    `<svg x="0" y="${(LH - MARK) / 2}" `,
  );
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${LW}" height="${LH}" viewBox="0 0 ${LW} ${LH}">` +
    mark +
    head.svg +
    i.svg +
    tail.svg +
    `<circle cx="${bx.toFixed(2)}" cy="${by.toFixed(2)}" r="${(d / 2).toFixed(2)}" fill="${P.sindoor}"/>` +
    `</svg>`
  );
}

await sharp(Buffer.from(await logoSvg()), { density: 72 }).resize(LW, LH).png().toFile(out("logo-480.png"));

console.log("email art: public/email/river-600x120.png, public/email/logo-480.png");
