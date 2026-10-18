import "server-only";
import { Resvg } from "@resvg/resvg-js";
import { PALETTE } from "@/lib/palette";
import { typeset, wrap } from "@/lib/typeset";
import { withSamvat } from "@/lib/occasions";
import { content } from "@/lib/content";
import type { Lang } from "@/lib/locales";
import { getGhat } from "@/content/rivers";
import { waterName } from "@/content/names";
import { HERO_WATER } from "@/lib/hero-water";
import { closingRiver } from "@/lib/engraving";
import { markSvg } from "@/lib/logo-svg";

/* ---------------------------------------------------------------------------
   The card a chat app unfurls when somebody pastes the site's link.

   Design system v3: paper ground, the logo and the edition's line across the
   top, the landing's headline in heavy capitals (the river in sindoor), the
   share line in small sans, and the full river with its sun across the foot,
   drawn by the Patra's own closing river. Every letter is shaped to outlines
   by HarfBuzz, as on the Sankalp Patra, so the Hindi edition spells itself
   correctly. Hindi has no capitals and keeps its own case at the same weight.
   --------------------------------------------------------------------------- */

export const SITE_CARD_SIZE = { width: 1200, height: 630 };

const PAPER = PALETTE.day.paper;
const INK = PALETTE.day.ink;
const SINDOOR = PALETTE.day.sindoor;
const MARGIN = 64;
/** The river's fixed seed and rank: the card is the same every day. */
const SEED = "snanify-site-card";
const RANK = 62;

export async function siteCardSvg(lang: Lang): Promise<string> {
  const t = content[lang];
  const { width, height } = SITE_CARD_SIZE;
  const parts: string[] = [`<rect width="${width}" height="${height}" fill="${PAPER}" />`];
  const measureWidth = width - 2 * MARGIN;

  /* --- the logo and the edition ------------------------------------------- */
  const mark = markSvg({ size: 56, day: { paper: PAPER, ink: INK, sun: SINDOOR, water: PALETTE.day.teal }, id: "card-mark" })
    .replace("<svg ", `<svg x="${MARGIN}" y="40" `);
  parts.push(mark);
  const root = await typeset("Snan", { size: 44, x: MARGIN + 72, y: 84, weight: 800, fill: INK });
  parts.push(root.svg);
  parts.push((await typeset("ify", { size: 44, x: MARGIN + 72 + root.width, y: 84, weight: 700, fill: INK })).svg);
  parts.push((await typeset(withSamvat(t.edition, lang), { size: 22, x: width - MARGIN, y: 80, family: "sans", fill: PALETTE.day.ink2, anchor: "end" })).svg);

  /* --- the headline, one sentence to a line -------------------------------- */
  const ghat = getGhat(HERO_WATER);
  const river = ghat ? waterName(ghat, "river", lang) : "Ganga";
  const cased = (text: string) => (lang === "en" ? text.toUpperCase() : text);
  const size = lang === "hi" ? 84 : 86;
  const lead = lang === "hi" ? 100 : 92;
  const [before, after = ""] = t.hero.title.split("{river}");
  const sentences = `${before}${river}${after}`.split(/(?<=[.।])\s+/);
  let y = 190;
  for (const sentence of sentences) {
    const [pre, post = ""] = sentence.includes(river) ? sentence.split(river) : [sentence, ""];
    if (!sentence.includes(river)) {
      for (const line of await wrap(cased(sentence), { size, weight: 800, maxWidth: measureWidth })) {
        parts.push((await typeset(line, { size, x: MARGIN, y, weight: 800, fill: INK })).svg);
        y += lead;
      }
      continue;
    }
    /* The sentence with the river in it: set in three runs on one line, the
       river in sindoor. */
    let x = MARGIN;
    for (const [run, fill] of [[cased(pre), INK], [cased(river), SINDOOR], [cased(post), INK]] as const) {
      if (!run) continue;
      const set = await typeset(run, { size, x, y, weight: 800, fill });
      parts.push(set.svg);
      x += set.width;
    }
    y += lead;
  }

  /* --- the share line ------------------------------------------------------ */
  y += 6;
  for (const line of await wrap(t.share, { size: 24, family: "sans", maxWidth: measureWidth })) {
    if (y > 440) break;
    parts.push((await typeset(line, { size: 24, x: MARGIN, y, family: "sans", fill: PALETTE.day.ink2 })).svg);
    y += 36;
  }

  /* --- the full river with its sun, across the foot ------------------------- */
  const riverTop = 470;
  parts.push(
    `<g transform="translate(0 ${riverTop})">` +
      closingRiver({
        seed: SEED,
        percentile: RANK,
        width,
        height: height - riverTop,
        horizon: 34,
        sunX: width - 190,
        sunR: 46,
        colours: { paper: PAPER, ink: INK, teal: PALETTE.day.teal, sindoor: SINDOOR, marigold: PALETTE.day.marigold },
      }) +
      `</g>`,
  );
  /* The address stands on the water, in a paper plate with an ink rule. */
  const site = await typeset("snanify.com", { size: 36, x: MARGIN, y: height - 44, family: "sans", weight: 700, fill: INK });
  parts.push(`<rect x="${MARGIN - 16}" y="${height - 86}" width="${site.width + 32}" height="58" fill="${PAPER}" stroke="${INK}" stroke-width="4" />`);
  parts.push(site.svg);

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
