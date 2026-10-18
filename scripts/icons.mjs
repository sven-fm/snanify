/* ---------------------------------------------------------------------------
   The icon files, from the one drawing of the mark (src/lib/logo-svg.ts) in
   the one palette (src/lib/palette.ts). Run after the mark or the palette
   changes, and commit what it writes:

     npm run icons

   Node runs the two .ts modules directly (type stripping), so the numbers
   cannot drift from <Mark />. Output is deterministic: sharp writes no
   metadata, and the .ico is assembled here byte by byte.

     public/icon.svg             the small cut, day colours, night colours
                                 under prefers-color-scheme (a tab follows it)
     public/favicon.ico          16, 32 and 48 from the small cut, PNG frames
     public/apple-touch-icon.png 180, the full mark on an OPAQUE paper square,
                                 because iOS composites transparency to black
     public/icon-192.png         the manifest's icons, opaque, the mark inside
     public/icon-512.png         the maskable safe circle (80%)
     public/brand-1024.png       for the Facebook Page avatar and the ad
                                 account, which crop to a circle
   --------------------------------------------------------------------------- */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { markSvg } from "../src/lib/logo-svg.ts";
import { PALETTE } from "../src/lib/palette.ts";

const out = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

const colours = (p) => ({ paper: p.paper, ink: p.ink, sun: p.sindoor, water: p.teal });
const DAY = colours(PALETTE.day);
const NIGHT = colours(PALETTE.night);

/** The mark alone, transparent outside the ring, at `size` pixels. */
async function markPng(size, small) {
  const svg = markSvg({ small, size, day: DAY });
  return sharp(Buffer.from(svg), { density: 72 }).resize(size, size).png().toBuffer();
}

/** The full mark on an opaque paper square, the mark `share` of the side. */
async function squarePng(size, share) {
  const inner = Math.round(size * share);
  const mark = await markPng(inner, false);
  return sharp({ create: { width: size, height: size, channels: 3, background: DAY.paper } })
    .composite([{ input: mark, left: Math.round((size - inner) / 2), top: Math.round((size - inner) / 2) }])
    .removeAlpha()
    .png()
    .toBuffer();
}

/** An ICO container holding PNG frames (Windows Vista onward, every browser). */
function ico(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);
  const dir = Buffer.alloc(16 * frames.length);
  let offset = 6 + dir.length;
  frames.forEach(({ size, png }, i) => {
    const at = i * 16;
    dir[at] = size >= 256 ? 0 : size;
    dir[at + 1] = size >= 256 ? 0 : size;
    dir[at + 2] = 0;
    dir[at + 3] = 0;
    dir.writeUInt16LE(1, at + 4);
    dir.writeUInt16LE(32, at + 6);
    dir.writeUInt32LE(png.length, at + 8);
    dir.writeUInt32LE(offset, at + 12);
    offset += png.length;
  });
  return Buffer.concat([header, dir, ...frames.map((f) => f.png)]);
}

writeFileSync(out("icon.svg"), markSvg({ small: true, day: DAY, night: NIGHT, id: "c" }) + "\n");

const frames = [];
for (const size of [16, 32, 48]) frames.push({ size, png: await markPng(size, true) });
writeFileSync(out("favicon.ico"), ico(frames));

writeFileSync(out("apple-touch-icon.png"), await squarePng(180, 0.84));
writeFileSync(out("icon-192.png"), await squarePng(192, 0.76));
writeFileSync(out("icon-512.png"), await squarePng(512, 0.76));
writeFileSync(out("brand-1024.png"), await squarePng(1024, 0.8));

console.log("icons: icon.svg, favicon.ico (16 32 48), apple-touch-icon.png, icon-192.png, icon-512.png, brand-1024.png");
