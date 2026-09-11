import "server-only";
import { Resvg } from "@resvg/resvg-js";
import { engrave, strokeOpacity, strokeWidth } from "@/lib/engraving";
import { typeset, wrap } from "@/lib/typeset";
import { content } from "@/lib/content";
import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The card a chat app unfurls when somebody pastes the site's link.

   Set the same way as the Sankalp Patra's own card in src/lib/patra-image.ts:
   paper, one spot colour, Eczar shaped to outlines by HarfBuzz so the Hindi
   edition spells itself correctly, and the engraved water along the foot. It
   replaced a navy card with a gradient, a glow and a line of copy from the
   officiant era, which every WhatsApp preview of the site was still showing.

   The band is drawn from a fixed seed. It is decoration here, not a record,
   so it must never look like a particular morning's engraving.
   --------------------------------------------------------------------------- */

export const SITE_CARD_SIZE = { width: 1200, height: 630 };

const PAPER = "#faf6ea";
const INK = "#16130f";
const INK_2 = "#57513f";
const SPOT = "#b32620";

const BAND_SEED = "5ab1f0c4d9e3a72b6c8e1d4f9a0b3c5d7e2f4a6b8c0d1e3f5a7b9c2d4e6f8a1b";

/** The seal from src/components/Logo.tsx, as plain SVG at a given box. */
function mark(x: number, y: number, box: number): string {
  const s = box / 48;
  return (
    `<g transform="translate(${x} ${y}) scale(${s.toFixed(3)})">` +
    `<defs><clipPath id="seal"><circle cx="24" cy="24" r="20" /></clipPath></defs>` +
    `<circle cx="24" cy="24" r="23.2" fill="none" stroke="${INK}" stroke-width="1" />` +
    `<circle cx="24" cy="24" r="20" fill="none" stroke="${INK}" stroke-width="2" />` +
    `<g clip-path="url(#seal)">` +
    `<circle cx="24" cy="17.6" r="6.2" fill="${SPOT}" />` +
    `<g fill="${INK}"><rect x="14" y="27.4" width="20" height="2.2" /><rect x="9" y="32" width="30" height="2.2" /><rect x="3" y="36.6" width="42" height="2.2" /></g>` +
    `</g></g>`
  );
}

export async function siteCardSvg(lang: Lang): Promise<string> {
  const t = content[lang];
  const { width, height } = SITE_CARD_SIZE;
  const m = 72;
  const right = width - m;
  const parts: string[] = [`<rect width="${width}" height="${height}" fill="${PAPER}" />`];

  /* the water along the foot */
  parts.push(
    `<svg x="0" y="${height - 230}" width="${width}" height="230" viewBox="0 0 1000 300" preserveAspectRatio="none">` +
      engrave({ seed: BAND_SEED, percentile: 62, width: 1000, height: 300 })
        .lines.map(
          (d, i, all) =>
            `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${strokeWidth(i, all.length)}" stroke-opacity="${strokeOpacity(i, all.length) * 0.7}" />`,
        )
        .join("") +
      `</svg>`,
  );

  /* masthead: the seal and the name, over a strong rule */
  parts.push(mark(m, 56, 52));
  parts.push((await typeset("Snanify", { size: 40, x: m + 68, y: 96, weight: 600, fill: INK })).svg);
  parts.push(
    (await typeset(t.edition, { size: 22, x: right, y: 94, fill: INK_2, anchor: "end" })).svg,
  );
  parts.push(`<rect x="${m}" y="124" width="${right - m}" height="2.5" fill="${INK}" />`);

  /* the headline, one colour, one line */
  const title = `${t.hero.titleA} ${t.hero.titleB}`;
  parts.push((await typeset(title, { size: 78, x: m, y: 236, weight: 600, fill: INK })).svg);

  /* the one line under it */
  let y = 300;
  for (const line of await wrap(t.share, { size: 30, maxWidth: right - m - 160 })) {
    parts.push((await typeset(line, { size: 30, x: m, y, fill: INK_2 })).svg);
    y += 44;
  }

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" ` +
    `viewBox="0 0 ${width} ${height}">${parts.join("")}</svg>`
  );
}

/** The card as a PNG. No external references, so nothing to resolve. */
export async function renderSiteCard(lang: Lang): Promise<Buffer> {
  const resvg = new Resvg(await siteCardSvg(lang), {
    font: { loadSystemFonts: false },
    background: PAPER,
    fitTo: { mode: "width", value: SITE_CARD_SIZE.width },
  });
  return Buffer.from(resvg.render().asPng());
}
