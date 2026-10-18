/* ---------------------------------------------------------------------------
   brand/snanify-brand-book.pdf, from brand/book/book.html. Run after the
   palette, the kit, the logo or the approved references change, and commit
   what it writes:

     npm run brand          first, for tokens.json and the logo files
     npm run brand-book

   Every picture is a real render, never a redrawing:

     brand/book/assets/kit-*.png  cut from the approved kit check
                                  (docs/design/v3-mockups/kit-check-day.png)
     brand/book/assets/river.svg  the full river, drawn by src/lib/river-geometry.ts
                                  as the email header draws it, at the page's width

   The book reads the palette and the type from brand/tokens.json, handed in
   before the page loads, so the colour page cannot drift from palette.ts.
   Chromium prints it with Playwright's page.pdf().
   --------------------------------------------------------------------------- */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { PALETTE } from "../src/lib/palette.ts";
import { horizonSun, sunPath, waveRows } from "../src/lib/river-geometry.ts";

const at = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));

/* --- the kit, cut from the approved render ------------------------------- */

const KIT = "docs/design/v3-mockups/kit-check-day.png";
const CUTS = {
  seal: [0, 150, 420, 160],
  band: [0, 325, 780, 115],
  press: [0, 460, 780, 290],
  label: [0, 1035, 780, 215],
  gauge: [0, 1280, 780, 290],
  river: [0, 1740, 780, 400],
};
for (const [name, [left, top, width, height]] of Object.entries(CUTS)) {
  await sharp(at(KIT)).extract({ left, top, width, height }).png().toFile(at(`brand/book/assets/kit-${name}.png`));
}

/* --- the river, at the page's width -------------------------------------- */

const P = PALETTE.day;
const W = 1123;
const H = 210;
const HORIZON = 62;
const SUN_X = 800;
const rows = waveRows({ width: W, height: H, rows: 18, top: HORIZON });
const sun = horizonSun({ cx: SUN_X, horizonY: HORIZON, r: 38 });
const waves = rows
  .map((row) => {
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
writeFileSync(
  at("brand/book/assets/river.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<defs><clipPath id="sky"><rect width="${W}" height="${sun.clipBelow}"/></clipPath>` +
    `<clipPath id="water"><rect y="${HORIZON}" width="${W}" height="${H - HORIZON}"/></clipPath></defs>` +
    `<circle cx="${sun.cx}" cy="${sun.cy}" r="${sun.r}" fill="${P.sindoor}" clip-path="url(#sky)"/>` +
    `<rect y="${HORIZON}" width="${W}" height="2" fill="${P.ink}"/>` +
    `<g clip-path="url(#water)">${waves}${path}</g>` +
    `</svg>\n`,
);

/* --- the book ------------------------------------------------------------ */

const tokens = JSON.parse(readFileSync(at("brand/tokens.json"), "utf8"));
const browser = await chromium.launch();
const page = await browser.newPage();
await page.addInitScript((t) => {
  window.TOKENS = t;
}, tokens);
await page.goto(new URL("../brand/book/book.html", import.meta.url).href, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({
  path: at("brand/snanify-brand-book.pdf"),
  width: "297mm",
  height: "210mm",
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();

console.log("brand-book: brand/snanify-brand-book.pdf, brand/book/assets/{kit-*.png,river.svg}");
