import "server-only";
import { Resvg } from "@resvg/resvg-js";
import { PALETTE } from "@/lib/palette";
import { measure, typeset, wrap } from "@/lib/typeset";
import { withSamvat } from "@/lib/occasions";
import { content } from "@/lib/content";
import type { Lang } from "@/lib/locales";
import { getGhat } from "@/content/rivers";
import { waterName } from "@/content/names";
import { HERO_WATER } from "@/lib/hero-water";
import { closingRiver } from "@/lib/engraving";
import { markSvg } from "@/lib/logo-svg";
import { wordmarkSvg } from "@/lib/wordmark-svg";

/* ---------------------------------------------------------------------------
   The card a chat app unfurls when somebody pastes a link to the site.

   Design system v3: paper ground, the logo and the edition's line across the
   top, the page's headline in heavy capitals (its accent in sindoor, as the
   page sets it), the page's one plain sentence in small sans, and the full river with its sun across the foot,
   drawn by the Patra's own closing river. Every letter is shaped to outlines
   by HarfBuzz, as on the Sankalp Patra, so the Hindi edition spells itself
   correctly. Hindi has no capitals and keeps its own case at the same weight.

   One drawing, many cards. The homepage's comes from `homeCardSpec` through
   src/app/[lang]/opengraph-image.tsx; every other major page's from
   src/lib/page-cards.ts through src/app/opengraph-image/[lang]/[...page].
   When the drawing changes, bump CARD_DRAWING in page-cards.ts and touch the
   homepage's route file, so every chat app fetches the new cards.
   --------------------------------------------------------------------------- */

export const SITE_CARD_SIZE = { width: 1200, height: 630 };

const PAPER = PALETTE.day.paper;
const INK = PALETTE.day.ink;
const SINDOOR = PALETTE.day.sindoor;
const MARGIN = 64;
/** The homepage river's fixed seed and every card's rank: a card is the same every day. */
const SEED = "snanify-site-card";
const RANK = 62;
/** Nothing set above the river may stand lower than this baseline. */
const FLOOR = 440;

/**
 * What one card says: the page's headline with `{accent}` where the word set
 * in sindoor goes, the page's one plain sentence under it, and the seed its
 * river is drawn from. `src/lib/page-cards.ts` builds one per major page.
 */
export type CardSpec = {
  lang: Lang;
  title: string;
  accent: string;
  plain: string;
  edition: string;
  seed: string;
};

/** The homepage's card: the landing's headline with the hero water, and the share line. */
export function homeCardSpec(lang: Lang): CardSpec {
  const t = content[lang];
  const ghat = getGhat(HERO_WATER);
  const river = ghat ? waterName(ghat, "river", lang) : "Ganga";
  return {
    lang,
    title: t.hero.title.replace("{river}", "{accent}"),
    accent: river,
    plain: t.share,
    edition: withSamvat(t.edition, lang),
    seed: SEED,
  };
}

/** The headline sizes to try, largest first: [size, leading]. */
const SIZES: Record<Lang, readonly (readonly [number, number])[]> = {
  en: [[86, 92], [76, 82], [66, 72]],
  /* Devanagari carries its matras above and below the line, so it gets its
     own, looser leading at every size. */
  hi: [[84, 100], [74, 88], [64, 78]],
};

/** One word of a headline. `glued` is punctuation that touches the accent. */
type Word = { text: string; accent: boolean; glued?: boolean };

/** A sentence as words, each knowing whether it belongs to the accent. */
function words(sentence: string, accent: string, cased: (text: string) => string): Word[] {
  const out: Word[] = [];
  const [pre, post] = sentence.includes("{accent}") ? sentence.split("{accent}") : [sentence, null];
  const push = (text: string, isAccent: boolean) => {
    for (const w of text.split(/\s+/).filter(Boolean)) out.push({ text: cased(w), accent: isAccent });
  };
  /* A word glued to the accent ("{accent}," or "{accent}।") keeps its
     punctuation in ink, touching the accent with no space between. */
  push(pre, false);
  if (post !== null) {
    push(accent, true);
    const glued = post.match(/^\S+/)?.[0];
    if (glued) out.push({ text: cased(glued), accent: false, glued: true });
    push(glued ? post.slice(glued.length) : post, false);
  }
  return out;
}

type Line = Word[];

/** Greedy word wrap over coloured words, as `wrap` does over plain ones. */
async function wrapWords(list: Word[], size: number, maxWidth: number): Promise<Line[]> {
  const lines: Line[] = [];
  let line: Line = [];
  for (const word of list) {
    const candidate = [...line, word];
    const glued = word.glued;
    if (!line.length || glued || (await measure(joinLine(candidate), { size, weight: 800 })) <= maxWidth) {
      line = candidate;
    } else {
      lines.push(line);
      line = [word];
    }
  }
  if (line.length) lines.push(line);
  return lines;
}

function joinLine(line: Line): string {
  return line.map((w, i) => (i && !w.glued ? " " : "") + w.text).join("");
}

/**
 * A line as runs of one colour. The space between two runs belongs to the ink
 * run beside it, never to the accent, so "YOUR " + "GANGA" + " SNAN." is set
 * exactly as the homepage card always set it.
 */
function runsOf(line: Line): { text: string; accent: boolean }[] {
  const runs: { text: string; accent: boolean }[] = [];
  line.forEach((w, i) => {
    const space = i && !w.glued ? " " : "";
    const last = runs[runs.length - 1];
    if (last && last.accent === w.accent) {
      last.text += space + w.text;
    } else if (last && w.accent) {
      last.text += space;
      runs.push({ text: w.text, accent: true });
    } else {
      runs.push({ text: space + w.text, accent: w.accent });
    }
  });
  return runs;
}

export async function cardSvg(spec: CardSpec): Promise<string> {
  const { lang } = spec;
  const { width, height } = SITE_CARD_SIZE;
  const parts: string[] = [`<rect width="${width}" height="${height}" fill="${PAPER}" />`];
  const measureWidth = width - 2 * MARGIN;

  /* --- the logo and the edition ------------------------------------------- */
  const mark = markSvg({ size: 56, day: { paper: PAPER, ink: INK, sun: SINDOOR, water: PALETTE.day.teal }, id: "card-mark" })
    .replace("<svg ", `<svg x="${MARGIN}" y="40" `);
  parts.push(mark);
  parts.push((await wordmarkSvg({ size: 44, x: MARGIN + 72, y: 84, ink: INK, bindu: SINDOOR })).svg);
  parts.push((await typeset(spec.edition, { size: 22, x: width - MARGIN, y: 80, family: "sans", fill: PALETTE.day.ink2, anchor: "end" })).svg);

  /* --- the headline, one sentence to a line -------------------------------- */
  /* Hindi has no capitals and keeps its own case at the same weight. */
  const cased = (text: string) => (lang === "en" ? text.toUpperCase() : text);
  const sentences = spec.title.split(/(?<=[.।?])\s+/);
  const plainSize = 24;
  const plainLead = 36;
  const plain = spec.plain ? await wrap(spec.plain, { size: plainSize, family: "sans", maxWidth: measureWidth }) : [];

  /* The first baseline: 190 at the edition's largest size, and higher by as
     much as a smaller size is smaller, so every headline hangs from one line. */
  const baseline = (size: number) => 190 - (SIZES[lang][0][0] - size);

  /* The largest size at which the headline and the plain line both stand
     clear of the river; failing that, the smallest, without the plain line. */
  let set: { size: number; lead: number; lines: Line[]; plain: string[] } | undefined;
  for (const [size, lead] of SIZES[lang]) {
    const lines: Line[] = [];
    for (const sentence of sentences) lines.push(...(await wrapWords(words(sentence, spec.accent, cased), size, measureWidth)));
    const top = baseline(size);
    const last = top + (lines.length - 1) * lead;
    const plainLast = last + lead + 6 + (plain.length - 1) * plainLead;
    if (plainLast <= FLOOR) {
      set = { size, lead, lines, plain };
      break;
    }
    set = { size, lead, lines, plain: [] };
  }
  const { size, lead, lines } = set!;

  let y = baseline(size);
  for (const line of lines) {
    let x = MARGIN;
    for (const run of runsOf(line)) {
      const out = await typeset(run.text, { size, x, y, weight: 800, fill: run.accent ? SINDOOR : INK });
      parts.push(out.svg);
      x += out.width;
    }
    y += lead;
  }

  /* --- the plain line ------------------------------------------------------ */
  y += 6;
  for (const line of set!.plain) {
    parts.push((await typeset(line, { size: plainSize, x: MARGIN, y, family: "sans", fill: PALETTE.day.ink2 })).svg);
    y += plainLead;
  }

  /* --- the full river with its sun, across the foot ------------------------- */
  const riverTop = 470;
  parts.push(
    `<g transform="translate(0 ${riverTop})">` +
      closingRiver({
        seed: spec.seed,
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

/** The homepage's card, as src/app/[lang]/opengraph-image.tsx draws it. */
export function siteCardSvg(lang: Lang): Promise<string> {
  return cardSvg(homeCardSpec(lang));
}

/** A card as a PNG. No external references, so nothing to resolve. */
export async function renderCard(spec: CardSpec): Promise<Buffer> {
  const resvg = new Resvg(await cardSvg(spec), {
    font: { loadSystemFonts: false },
    background: PAPER,
    fitTo: { mode: "width", value: SITE_CARD_SIZE.width },
  });
  return Buffer.from(resvg.render().asPng());
}

/** The homepage's card as a PNG. */
export function renderSiteCard(lang: Lang): Promise<Buffer> {
  return renderCard(homeCardSpec(lang));
}
