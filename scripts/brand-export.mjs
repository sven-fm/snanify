/* ---------------------------------------------------------------------------
   The brand kit's generated files, from the app's own sources, so the kit
   cannot drift. Run after the palette, the type, the mark or the wordmark
   changes, and commit what it writes:

     npm run brand

     brand/tokens.json        the palette and the type (scripts/brand-tokens.mjs)
     brand/logo/*.svg, *.png  the mark (src/lib/logo-svg.ts) and the wordmark
                              (src/lib/wordmark-svg.ts, outlined from Eczar 800
                              by src/lib/typeset.ts), light, dark and on marigold

   `--conditions=react-server` empties the `server-only` guard; the resolve
   hook below maps the app's `@/` alias, which wordmark-svg.ts imports through.
   --------------------------------------------------------------------------- */

import { mkdirSync, writeFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { brandTokens } from "./brand-tokens.mjs";

const SRC = new URL("../src/", import.meta.url);
registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith("@/")) return next(new URL(`${specifier.slice(2)}.ts`, SRC).href, context);
    return next(specifier, context);
  },
});

const { markSvg } = await import("../src/lib/logo-svg.ts");
const { PALETTE } = await import("../src/lib/palette.ts");
const { wordmarkSvg } = await import("../src/lib/wordmark-svg.ts");

const out = (name) => fileURLToPath(new URL(`../brand/${name}`, import.meta.url));
mkdirSync(out("logo"), { recursive: true });

writeFileSync(out("tokens.json"), JSON.stringify(brandTokens(), null, 2) + "\n");

/* --- the editions ---------------------------------------------------------
   light: day colours, for paper and any light ground.
   dark: night colours, for the night paper and any dark ground.
   on-marigold: day colours on a marigold field, the ads' ground; type on
   marigold is the day ink in both editions (--on-marigold). */

const D = PALETTE.day;
const N = PALETTE.night;
const EDITIONS = {
  light: { mark: { paper: D.paper, ink: D.ink, sun: D.sindoor, water: D.teal }, ink: D.ink, bindu: D.sindoor },
  dark: { mark: { paper: N.paper, ink: N.ink, sun: N.sindoor, water: N.teal }, ink: N.ink, bindu: N.sindoor },
  "on-marigold": {
    mark: { paper: D.paper, ink: D.ink, sun: D.sindoor, water: D.teal },
    ink: D.ink,
    bindu: D.sindoor,
    ground: D.marigold,
  },
};

const svgDoc = (w, h, body, ground) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
  (ground ? `<rect width="${w}" height="${h}" fill="${ground}"/>` : "") +
  body +
  `</svg>\n`;

/** The 48-grid mark placed at (x, y), `size` across. */
const placedMark = (colours, x, y, size, id) => {
  const inner = markSvg({ day: colours, id }).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  return `<g transform="translate(${x} ${y}) scale(${(size / 48).toFixed(4)})">${inner}</g>`;
};

async function write(name, svg, width) {
  writeFileSync(out(`logo/${name}.svg`), svg);
  await sharp(Buffer.from(svg), { density: 72 }).resize(width).png().toFile(out(`logo/${name}.png`));
}

/* The wordmark's box is one em tall at line-height 1, the baseline 0.2455em
   above its foot (globals.css, .wordmark). */
const BASELINE = 1 - 0.2455;

for (const [edition, c] of Object.entries(EDITIONS)) {
  /* The mark alone: 512 square, a ground only on marigold. */
  const pad = c.ground ? 64 : 0;
  const M = 512 - 2 * pad;
  await write(`mark-${edition}`, svgDoc(512, 512, placedMark(c.mark, pad, pad, M, "m"), c.ground), 1024);

  /* The wordmark alone, 200px Eczar 800, padded by a tenth of the size. */
  const size = 200;
  const p = size * 0.1;
  const probe = await wordmarkSvg({ size, x: 0, y: 0, ink: c.ink, bindu: c.bindu });
  const ww = Math.ceil(probe.width + 2 * p);
  const wh = Math.ceil(size + 2 * p);
  const word = await wordmarkSvg({ size, x: p, y: p + size * BASELINE, ink: c.ink, bindu: c.bindu });
  await write(`wordmark-${edition}`, svgDoc(ww, wh, word.svg, c.ground), ww * 2);

  /* The lockup, as <Logo />: a 30px mark beside a 24px word, 8px apart,
     centred on each other. Drawn at five times that. */
  const k = 5;
  const markPx = 30 * k;
  const wordPx = 24 * k;
  const gap = 8 * k;
  const lp = c.ground ? 24 * k * 0.5 : 0;
  const lh = markPx + 2 * lp;
  const wordTop = lp + (markPx - wordPx) / 2;
  const lock = await wordmarkSvg({ size: wordPx, x: lp + markPx + gap, y: wordTop + wordPx * BASELINE, ink: c.ink, bindu: c.bindu });
  const lw = Math.ceil(lp + markPx + gap + lock.width + lp);
  await write(
    `lockup-${edition}`,
    svgDoc(lw, lh, placedMark(c.mark, lp, lp, markPx, "l") + lock.svg, c.ground),
    lw * 2,
  );
}

console.log("brand: tokens.json, logo/{mark,wordmark,lockup}-{light,dark,on-marigold}.{svg,png}");
