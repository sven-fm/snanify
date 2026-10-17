import "server-only";
import { Resvg } from "@resvg/resvg-js";
import { PALETTE } from "@/lib/palette";
import { typeset, wrap } from "@/lib/typeset";
import { withSamvat } from "@/lib/occasions";
import { content } from "@/lib/content";
import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The card a chat app unfurls when somebody pastes the site's link.

   It is set in the campaign layer's matchbox style (DESIGNSYSTEM.md,
   Campaigns), because a link preview is a poster in a feed, not a page of
   the site: a matchbox label on the left, a yellow ground in a black frame
   with an inner red rule, a rayed sun over three bars of water, and the
   label's name in capitals; the site's headline on the right, and the
   address on a black bar. Every letter is Eczar shaped to outlines by
   HarfBuzz, as on the Sankalp Patra, so the Hindi edition spells itself
   correctly.
   --------------------------------------------------------------------------- */

export const SITE_CARD_SIZE = { width: 1200, height: 630 };

const GROUND = PALETTE.day.paper;
const YELLOW = PALETTE.day.marigold;
const RED = PALETTE.day.sindoor;
const BLACK = PALETTE.day.ink;

/** The label's own words, per edition. Capitals in Latin, as a label is
    painted; Devanagari has no case. */
const LABEL: Record<Lang, { brand: string; name: [string, string]; tagline: string; tracking: number }> = {
  en: { brand: "SANKALP BRAND", name: ["DAILY", "SNAN"], tagline: "Three minutes, six rivers", tracking: 0.2 },
  hi: { brand: "संकल्प छाप", name: ["रोज़ का", "स्नान"], tagline: "तीन मिनट, छह नदियाँ", tracking: 0 },
};

/** The emblem: the seal's idea re-cut for a label. A rayed sun set into
    three bars of water, centred on `cx`, its waterline at `wy`. */
function emblem(cx: number, wy: number): string {
  const r = 58;
  const cy = wy - 6;
  const rays: string[] = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    if (Math.sin(a) > -0.2) continue;
    const pt = (rad: number, t: number) =>
      `${(cx + rad * Math.cos(t)).toFixed(2)},${(cy + rad * Math.sin(t)).toFixed(2)}`;
    rays.push(`<polygon points="${pt(r + 12, a - 0.09)} ${pt(r + 36, a)} ${pt(r + 12, a + 0.09)}" fill="${BLACK}" />`);
  }
  return (
    rays.join("") +
    `<clipPath id="sky"><rect x="${cx - 120}" y="${wy - 140}" width="240" height="140" /></clipPath>` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${RED}" clip-path="url(#sky)" />` +
    `<rect x="${cx - 62}" y="${wy + 8}" width="124" height="11" fill="${BLACK}" />` +
    `<rect x="${cx - 94}" y="${wy + 30}" width="188" height="11" fill="${BLACK}" />` +
    `<rect x="${cx - 132}" y="${wy + 52}" width="264" height="11" fill="${BLACK}" />`
  );
}

export async function siteCardSvg(lang: Lang): Promise<string> {
  const t = content[lang];
  const l = LABEL[lang];
  const { width, height } = SITE_CARD_SIZE;
  const parts: string[] = [`<rect width="${width}" height="${height}" fill="${GROUND}" />`];

  /* --- the label ---------------------------------------------------------- */
  const lx = 56;
  const ly = 56;
  const lw = 470;
  const lh = height - 112;
  const cx = lx + lw / 2;
  parts.push(
    `<rect x="${lx}" y="${ly}" width="${lw}" height="${lh}" fill="${YELLOW}" stroke="${BLACK}" stroke-width="10" />` +
      `<rect x="${lx + 18}" y="${ly + 18}" width="${lw - 36}" height="${lh - 36}" fill="none" stroke="${RED}" stroke-width="4" />`,
  );
  parts.push((await typeset(l.brand, { size: 22, x: cx, y: ly + 74, weight: 600, fill: RED, anchor: "middle", tracking: l.tracking })).svg);
  parts.push(emblem(cx, ly + 200));
  parts.push((await typeset(l.name[0], { size: 72, x: cx, y: ly + 352, weight: 600, fill: BLACK, anchor: "middle" })).svg);
  parts.push((await typeset(l.name[1], { size: 72, x: cx, y: ly + 428, weight: 600, fill: BLACK, anchor: "middle" })).svg);
  parts.push((await typeset(l.tagline, { size: 24, x: cx, y: ly + lh - 44, fill: BLACK, anchor: "middle" })).svg);

  /* --- the headline, the share line and the address ------------------------- */
  const x = lx + lw + 56;
  const right = width - 56;
  const measureWidth = right - x;

  /* The logotype: the root heavy, the suffix light. */
  const root = await typeset("Snan", { size: 44, x, y: 110, weight: 600, fill: BLACK });
  parts.push(root.svg);
  parts.push((await typeset("ify", { size: 44, x: x + root.width, y: 110, fill: BLACK })).svg);
  parts.push((await typeset(withSamvat(t.edition, lang), { size: 22, x: right, y: 108, fill: RED, anchor: "end" })).svg);

  /* The headline in its own two halves, one to a line, so it breaks at the
     comma in both editions rather than wherever the measure runs out. */
  let y = 210;
  for (const half of [t.hero.titleA, t.hero.titleB]) {
    for (const line of await wrap(half, { size: 56, weight: 600, maxWidth: measureWidth })) {
      parts.push((await typeset(line, { size: 56, x, y, weight: 600, fill: BLACK })).svg);
      y += lang === "hi" ? 74 : 64;
    }
  }
  y += 10;
  for (const line of await wrap(t.share, { size: 25, maxWidth: measureWidth })) {
    if (y > height - 160) break;
    parts.push((await typeset(line, { size: 25, x, y, fill: BLACK, opacity: 0.78 })).svg);
    y += 38;
  }

  const barY = height - 56 - 92;
  parts.push(`<rect x="${x}" y="${barY}" width="${measureWidth}" height="92" fill="${BLACK}" />`);
  parts.push((await typeset("snanify.com", { size: 44, x: x + measureWidth / 2, y: barY + 62, weight: 600, fill: YELLOW, anchor: "middle" })).svg);

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" ` +
    `viewBox="0 0 ${width} ${height}">${parts.join("")}</svg>`
  );
}

/** The card as a PNG. No external references, so nothing to resolve. */
export async function renderSiteCard(lang: Lang): Promise<Buffer> {
  const resvg = new Resvg(await siteCardSvg(lang), {
    font: { loadSystemFonts: false },
    background: GROUND,
    fitTo: { mode: "width", value: SITE_CARD_SIZE.width },
  });
  return Buffer.from(resvg.render().asPng());
}
