import { alertOwner } from "@/lib/alert";
import { ordinal } from "@/lib/ordinal";
import "server-only";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import type { Sitting } from "@/db/schema";
import { flowContent } from "@/content/flow";
import { closingRiver } from "@/lib/engraving";
import { gaugeModel } from "@/lib/gauge";
import { SITE_ORIGIN, type Lang } from "@/lib/locales";
import { nthMorning } from "@/lib/mornings";
import { GAUGE_FILLS, PALETTE } from "@/lib/palette";
import { renderPatraV2 } from "@/lib/patra-image-v2";
import { patraView, type PatraView } from "@/lib/patra-view";
import type { FlowBand } from "@/lib/riverdata";
import { typeset, wrap, type Family, type Weight } from "@/lib/typeset";

export { IMAGE_VERSION } from "@/lib/patra-version";

/* ---------------------------------------------------------------------------
   The Sankalp Patra as a picture, v3 (spec 6.5).

   THE MEMENTO IS THE OWNER'S APPROVED CUT, docs/design/v3-mockups/
   patra-names-v3.html, which is this 1080 by 1920 page at a quarter of its
   size: every distance here is the mock's times four. Top to bottom: the
   header, the ghat, the portrait pinned on it with the morning's seal, the
   names one per line in capitals, where, the prayer, how the river ran with
   its gauge and its figure, the closing river, the foot. The 1080 by 1350
   sheet keeps that order with a shorter river; the 1200 by 630 link card
   carries the names, the state, the gauge and the river, and never a face or
   a seal, because a card unfurls in a group without anyone choosing to show
   it.

   EVERY LETTER IS AN OUTLINE (src/lib/typeset.ts), so the rasteriser never
   has to spell Devanagari. The groups that carry text the tests read are
   tagged with data attributes, which resvg ignores.

   THE SANKALP IS NEVER HERE. PatraView has never held it.

   A sheet already sent stays as it was sent: rows with no image version are
   redrawn by src/lib/patra-image-v2.ts, through `renderPatraFor`.
   --------------------------------------------------------------------------- */

const { day } = PALETTE;
const PAPER = day.paper;
const INK = day.ink;
const INK_2 = day.ink2;
const SINDOOR = day.sindoor;
const MARIGOLD = day.marigold;
const TEAL = day.teal;
const FILLS = GAUGE_FILLS.day;

const RIVER_COLOURS = { paper: PAPER, ink: INK, teal: TEAL, sindoor: SINDOOR, marigold: MARIGOLD };

/** The side margin and the column it leaves, on the 1080-wide formats. */
const M = 64;

const r = (n: number) => Number(n.toFixed(2));

/* --- the words on the sheet ----------------------------------------------- */

type PatraCopy = {
  title: string;
  specimenTitle: string;
  /** "at the ", river, ", ghat, city": the river is set in sindoor. */
  place: (view: PatraView) => [string, string, string];
  stop: string;
  rank: (n: number) => string;
  median: string;
  /** The seal's two lines: "7th" / "morning". */
  morning: (n: number) => [string, string];
};

const COPY = {
  en: {
    title: "Sankalp Patra",
    specimenTitle: "Sankalp Patra, specimen",
    place: (v) => ["at the ", v.water, `${v.ghat ? `, ${v.ghat}` : ""}${v.city ? `, ${v.city}` : ""}`],
    stop: ".",
    rank: (n) => `${ordinal(n, "en")} percentile since 1997`,
    median: "Seasonal median, 1997 to 2025",
    morning: (n) => [ordinal(n, "en"), "morning"],
  },
  hi: {
    title: "संकल्प पत्र",
    specimenTitle: "संकल्प पत्र, नमूना",
    place: (v) => ["", v.water, ` के तट पर${v.ghat ? `, ${v.ghat}` : ""}${v.city ? `, ${v.city}` : ""}`],
    stop: "।",
    rank: (n) => `1997 से ${n}वाँ प्रतिशतक`,
    median: "1997 से 2025 का सामान्य स्तर",
    morning: (n) => [nthMorning(n, "hi"), "सुबह"],
  },
} satisfies Record<Lang, PatraCopy>;

function langOf(view: PatraView): Lang {
  return view.locale === "hi" ? "hi" : "en";
}

function copyFor(view: PatraView): PatraCopy {
  return COPY[langOf(view)];
}

/** The plain sentence under the state, only for a figure the model published. */
function plainLine(view: PatraView): string | null {
  if (view.figureKind !== "modelled") return null;
  return flowContent[langOf(view)].plain[view.band as FlowBand] ?? null;
}

function hasDeva(text: string): boolean {
  return /[ऀ-ॿ]/.test(text);
}

/** Set a line, shrinking it until it fits `maxWidth` if it would not. */
async function fitted(
  text: string,
  o: {
    size: number;
    x: number;
    y: number;
    maxWidth: number;
    weight?: Weight;
    family?: Family;
    fill?: string;
    anchor?: "start" | "middle" | "end";
  },
): Promise<{ svg: string; width: number; size: number }> {
  let size = o.size;
  let set = await typeset(text, { ...o, size });
  if (set.width > o.maxWidth) {
    size = Math.floor((size * o.maxWidth) / set.width);
    set = await typeset(text, { ...o, size });
  }
  return { ...set, size };
}

/* --- the ghat --------------------------------------------------------------- */

/* public/waters/<slug>.webp is the five-tone mask /live prints: ink in the
   colour channels, density in the alpha. Flattened onto the sheet's own paper
   it is the picture, cut to the size it is shown at. Read from disk where the
   files are beside the code, fetched from the site where they are not. */
const plates = new Map<string, Promise<string | null>>();

async function maskBytes(slug: string): Promise<Buffer> {
  const local = path.join(process.cwd(), "public", "waters", `${slug}.webp`);
  try {
    return await readFile(local);
  } catch {
    const res = await fetch(`${SITE_ORIGIN}/waters/${slug}.webp`);
    if (!res.ok) throw new Error(`no plate for ${slug}: ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }
}

function ghatPlate(slug: string, w: number, h: number): Promise<string | null> {
  const key = `${slug}:${w}x${h}`;
  const cached = plates.get(key);
  if (cached) return cached;
  const made = (async () => {
    try {
      const png = await sharp(await maskBytes(slug))
        .resize(w, h, { fit: "cover", position: "centre" })
        .flatten({ background: PAPER })
        .png({ compressionLevel: 9 })
        .toBuffer();
      return `data:image/png;base64,${png.toString("base64")}`;
    } catch (error) {
      /* A sheet without its picture is still a sheet: the names, the water
         and the river carry it. */
      console.error("patra: plate failed", slug, error);
      void alertOwner("patra: plate failed", `${slug}\n${String(error)}`);
      return null;
    }
  })();
  plates.set(key, made);
  return made;
}

/* --- the pieces of the kit -------------------------------------------------- */

/** Black and white with a touch of contrast, for the pinned print. */
const PRINT_FILTER =
  `<filter id="patra-print" color-interpolation-filters="sRGB">` +
  `<feColorMatrix type="saturate" values="0" />` +
  `<feComponentTransfer>` +
  `<feFuncR type="linear" slope="1.1" intercept="-0.05" />` +
  `<feFuncG type="linear" slope="1.1" intercept="-0.05" />` +
  `<feFuncB type="linear" slope="1.1" intercept="-0.05" />` +
  `</feComponentTransfer>` +
  `</filter>`;

/**
 * The morning seal (spec 5.2): a sindoor disc with a hard ink offset, a
 * dashed marigold ring inset, the count in marigold Eczar 800, turned 10deg.
 * Drawn about its own centre.
 */
async function seal(view: PatraView, n: number, cx: number, cy: number, d: number): Promise<string> {
  const rad = d / 2;
  const [first, second] = copyFor(view).morning(n);
  const size = r(d * 0.15);
  const step = r(size * (langOf(view) === "hi" ? 1.2 : 1.05));
  const lift = r(size * 0.34);
  const top = await typeset(first, { size, x: 0, y: r(lift - step / 2), weight: 800, fill: MARIGOLD, anchor: "middle" });
  const bottom = await typeset(second, { size, x: 0, y: r(lift + step / 2), weight: 800, fill: MARIGOLD, anchor: "middle" });
  const ring = r(d * 0.09);
  return (
    `<g data-morning="${n}" transform="translate(${r(cx)} ${r(cy)}) rotate(10)">` +
    `<circle cx="${r(d * 0.05)}" cy="${r(d * 0.05)}" r="${r(rad)}" fill="${INK}" />` +
    `<circle cx="0" cy="0" r="${r(rad)}" fill="${SINDOOR}" />` +
    `<circle cx="0" cy="0" r="${r(rad - ring)}" fill="none" stroke="${MARIGOLD}" stroke-width="${r(d * 0.026)}" stroke-dasharray="${r(d * 0.055)} ${r(d * 0.04)}" />` +
    top.svg +
    bottom.svg +
    `</g>`
  );
}

/**
 * The gauge (spec 5.5): five fills at 1 : 2 : 4 : 2 : 1, an ink frame, a
 * dashed ink line at "usual", and today's sindoor dot ringed in ink. A quiet
 * feed draws no dot and claims nothing about today.
 */
function gauge(percentile: number | null, x: number, y: number, w: number, h: number): string {
  const model = gaugeModel(percentile);
  const frame = r(h / 8);
  const parts = model.segments.map(
    (s, i) =>
      `<rect x="${r(x + s.from * w)}" y="${r(y)}" width="${r((s.to - s.from) * w)}" height="${r(h)}" fill="${FILLS[i]}" />`,
  );
  parts.push(
    `<rect x="${r(x + frame / 2)}" y="${r(y + frame / 2)}" width="${r(w - frame)}" height="${r(h - frame)}" fill="none" stroke="${INK}" stroke-width="${frame}" />`,
  );
  const reach = r(h * 0.33);
  parts.push(
    `<line x1="${r(x + w / 2)}" y1="${r(y - reach)}" x2="${r(x + w / 2)}" y2="${r(y + h + reach)}" stroke="${INK}" stroke-width="${frame}" stroke-dasharray="${r(frame * 3)} ${r(frame * 2)}" />`,
  );
  if (model.dot !== null) {
    parts.push(
      `<g data-today=""><circle cx="${r(x + model.dot * w)}" cy="${r(y + h / 2)}" r="${r(h * 0.5)}" fill="${SINDOOR}" stroke="${INK}" stroke-width="${frame}" /></g>`,
    );
  }
  return `<g data-gauge="">${parts.join("")}</g>`;
}

/** The figure and its rank, or the median it stands on when the feed was quiet. */
function proof(view: PatraView): [string, string] {
  const c = copyFor(view);
  if (view.figureKind === "modelled" && view.rank !== null) return [view.flow, c.rank(Number(view.rank))];
  return [view.flow, c.median];
}

/** "at the Ganga, Har Ki Pauri, Haridwar", the river in sindoor. */
async function placeLine(view: PatraView, x: number, y: number, size: number, maxWidth: number): Promise<string> {
  const [before, river, after] = copyFor(view).place(view);
  const widthAt = async (s: number) =>
    (await typeset(before, { size: s, x: 0, y: 0, family: "sans" })).width +
    (await typeset(river, { size: s, x: 0, y: 0, family: "sans", weight: 700 })).width +
    (await typeset(after, { size: s, x: 0, y: 0, family: "sans" })).width;
  let s = size;
  const whole = await widthAt(s);
  if (whole > maxWidth) s = Math.floor((s * maxWidth) / whole);
  const a = await typeset(before, { size: s, x, y, family: "sans", fill: INK });
  const b = await typeset(river, { size: s, x: r(x + a.width), y, family: "sans", weight: 700, fill: SINDOOR });
  const c = await typeset(after, { size: s, x: r(x + a.width + b.width), y, family: "sans", fill: INK });
  return a.svg + b.svg + c.svg;
}

/** The names, one per line in capitals, at the size their count calls for. */
type NameLine = { text: string; tier: number; step: number };

async function nameLines(
  names: string[],
  tiers: readonly [number, number, number],
  maxWidth: number,
): Promise<NameLine[]> {
  const kept = names.slice(0, 5).filter((n) => n.trim());
  const tier = kept.length <= 2 ? tiers[0] : kept.length === 3 ? tiers[1] : tiers[2];
  const out: NameLine[] = [];
  for (const name of kept) {
    /* A long name wraps under itself; never two names on one line. */
    for (const piece of await wrap(name.toUpperCase(), { size: tier, weight: 800, maxWidth })) {
      out.push({ text: piece, tier, step: r(tier * (hasDeva(piece) ? 1.22 : 1.05)) });
    }
  }
  return out;
}

async function setNames(
  lines: NameLine[],
  x: number,
  top: number,
  maxWidth: number,
): Promise<{ svg: string; bottom: number }> {
  let y = top;
  let svg = "";
  for (const line of lines) {
    const baseline = r(y + line.tier * (hasDeva(line.text) ? 0.92 : 0.8));
    /* A single word wider than the column is set smaller rather than broken. */
    const set = await fitted(line.text, { size: line.tier, x, y: baseline, maxWidth, weight: 800, fill: INK });
    svg += `<g data-name-line="${line.tier}" data-right="${r(x + set.width)}">${set.svg}</g>`;
    y += line.step;
  }
  return { svg, bottom: r(y) };
}

/* --- the tall formats: the memento and the four by five sheet --------------- */

type Format = {
  width: number;
  height: number;
  /** The ghat picture's height. */
  pic: number;
  /** The pinned print's mount height; its width follows at 5 : 6. */
  mount: number;
  /** Space above the names, the prayer, the state and the river. */
  gapNames: number;
  gapPrayer: number;
  gapState: number;
  gapRiver: number;
  prayerSize: number;
  /** The shortest the closing river may get before the prayer gives way. */
  riverMin: number;
  /** The sun on the closing river's horizon. */
  sunR: number;
};

const MEMENTO: Format = {
  width: 1080,
  height: 1920,
  pic: 440,
  mount: 288,
  gapNames: 72,
  gapPrayer: 64,
  gapState: 72,
  gapRiver: 120,
  prayerSize: 46,
  riverMin: 160,
  sunR: 68,
};

const SHEET: Format = {
  width: 1080,
  height: 1350,
  pic: 240,
  mount: 200,
  gapNames: 52,
  gapPrayer: 40,
  gapState: 44,
  gapRiver: 88,
  prayerSize: 40,
  riverMin: 100,
  sunR: 46,
};

export const MEMENTO_SIZE = { width: MEMENTO.width, height: MEMENTO.height };
export const PATRA_SIZE = { width: SHEET.width, height: SHEET.height };

function sheetTitle(view: PatraView): string {
  const c = copyFor(view);
  return view.specimen ? c.specimenTitle : c.title;
}

/** The name sizes for one or two, three, and four or five names, largest
    first; the tall formats step down a row only when the river needs room. */
const NAME_TIERS = [
  [84, 68, 56],
  [72, 58, 48],
  [60, 50, 40],
  [48, 40, 34],
] as const;

/** The horizon sits this far into the river's box; the sun rises above it. */
const HORIZON = 24;

async function tallSvg(view: PatraView, f: Format): Promise<string> {
  const W = f.width;
  const H = f.height;
  const R = W - M;
  const IN = R - M;
  const c = copyFor(view);
  const parts: string[] = [`<rect width="${W}" height="${H}" fill="${PAPER}" />`];

  /* --- header: the sheet's name in sindoor, the date and the tithi --------- */
  const headY = 100;
  const title = await typeset(sheetTitle(view), { size: 36, x: M, y: headY, weight: 700, fill: SINDOOR });
  parts.push(title.svg);
  parts.push(
    (
      await fitted(`${view.keptDate} · ${view.tithi}`, {
        size: 30,
        x: R,
        y: headY,
        family: "sans",
        fill: INK_2,
        anchor: "end",
        maxWidth: IN - title.width - 32,
      })
    ).svg,
  );

  /* --- the ghat, full width ------------------------------------------------- */
  const picTop = 152;
  const picBottom = picTop + f.pic;
  const plate = await ghatPlate(view.waterSlug, IN, f.pic);
  if (plate) parts.push(`<image href="${plate}" x="${M}" y="${picTop}" width="${IN}" height="${f.pic}" />`);

  /* --- the print, pinned right and centred on the picture, and the seal ----- */
  const n = view.morning ?? 0;
  if (view.portraitUrl) {
    const mh = f.mount;
    const mw = r((mh * 5) / 6);
    const pad = r(mh / 24);
    const mx = r(R - mh * 0.36 - mw);
    const my = r(picTop + (f.pic - mh) / 2);
    const turn = `rotate(3 ${r(mx + mw / 2)} ${r(my + mh / 2)})`;
    let print =
      `<rect x="${r(mx + pad)}" y="${r(my + pad)}" width="${mw}" height="${mh}" fill="${INK}" />` +
      `<rect x="${mx}" y="${my}" width="${mw}" height="${mh}" fill="${PAPER}" />` +
      `<image href="${view.portraitUrl}" x="${r(mx + pad)}" y="${r(my + pad)}" width="${r(mw - 2 * pad)}" height="${r(mh - 2 * pad)}" preserveAspectRatio="xMidYMid slice" filter="url(#patra-print)" />` +
      `<rect x="${r(mx + pad)}" y="${r(my + pad)}" width="${r(mw - 2 * pad)}" height="${r(mh - 2 * pad)}" fill="none" stroke="${INK}" stroke-width="${r(pad / 3)}" />`;
    /* Set outward from the print's top-right corner, so it only just touches
       the photograph and stays clear of a face. */
    if (n >= 2) {
      const d = r(mh * 0.53);
      print += await seal(view, n, mx + mw + d * 0.18, my - d * 0.13, d);
    }
    parts.push(`<defs>${PRINT_FILTER}</defs><g data-portrait="" transform="${turn}">${print}</g>`);
  } else if (n >= 2) {
    /* With no print to pin it to, the seal sits at the picture's corner. */
    const d = r(f.mount * 0.53);
    parts.push(await seal(view, n, R - d / 2 - 20, picTop + d * 0.37, d));
  }

  /* --- the parts below the picture, measured before they are placed --------- */
  const prayerLines: string[] = [];
  if (view.prayer) {
    for (const line of view.prayer.devanagari) {
      prayerLines.push(...(await wrap(line, { size: f.prayerSize, maxWidth: IN })));
    }
  }
  const prayerStep = r(f.prayerSize * 1.5);
  const plain = plainLine(view);

  const namesTop = picBottom + f.gapNames;
  const footBaseline = H - 56;
  const riverBottom = H - 120;
  /* The state block: the word, the plain line, the gauge. */
  const stateHeight = 56 + (plain ? 48 : 0) + 28 + 48;
  const height = (lines: NameLine[]) => lines.reduce((sum, l) => sum + l.step, 0);
  /* Where the river's box starts, under names of a height and k prayer lines. */
  const riverTopAt = (namesHeight: number, k: number) =>
    r(namesTop + namesHeight + 50) + 14 + (k > 0 ? f.gapPrayer + k * prayerStep : 0) + f.gapState + stateHeight + f.gapRiver - HORIZON;
  const fits = (namesHeight: number, k: number) => riverBottom - riverTopAt(namesHeight, k) >= f.riverMin;

  /* Names first at the size their count calls for. When five long names
     would push the river past its floor even with the prayer gone, they step
     down a tier at a time; at the last tier, lines leave from the end. */
  let names: NameLine[] = [];
  for (const tiers of NAME_TIERS) {
    names = await nameLines(view.names, tiers, IN);
    if (fits(height(names), 0)) break;
  }
  while (names.length > 1 && !fits(height(names), 0)) names = names.slice(0, -1);
  const placeBaseline = r(namesTop + height(names) + 50);
  const placeBottom = placeBaseline + 14;

  /* The river shortens as names are added. When even its shortest would not
     fit, the prayer gives up lines from the end, as the v2 sheet's did. */
  let keep = prayerLines.length;
  while (keep > 0 && !fits(height(names), keep)) keep -= 1;

  /* --- names, place, prayer -------------------------------------------------- */
  parts.push((await setNames(names, M, namesTop, IN)).svg);
  parts.push(await placeLine(view, M, placeBaseline, 40, IN));

  let y = placeBottom;
  if (keep > 0) {
    y += f.gapPrayer;
    for (const line of prayerLines.slice(0, keep)) {
      parts.push((await typeset(line, { size: f.prayerSize, x: M, y: r(y + f.prayerSize * 0.95), fill: INK })).svg);
      y += prayerStep;
    }
  }

  /* --- how the river ran ------------------------------------------------------ */
  y += f.gapState;
  parts.push(
    (await fitted(`${view.state}${c.stop}`, { size: 60, x: M, y: r(y + 46), weight: 800, fill: INK, maxWidth: IN })).svg,
  );
  y += 56;
  if (plain) {
    parts.push((await fitted(plain, { size: 34, x: M, y: r(y + 38), family: "sans", fill: INK_2, maxWidth: IN })).svg);
    y += 48;
  }
  y += 28;
  const gaugeTop = y;
  const gaugeH = 48;
  /* The figure and the rank, small at the right, level with the gauge's foot. */
  const [figure, rank] = proof(view);
  const figureSet = await typeset(figure, { size: 30, x: R, y: r(gaugeTop + gaugeH - 42), family: "sans", fill: INK_2, anchor: "end" });
  const rankSet = await typeset(rank, { size: 30, x: R, y: r(gaugeTop + gaugeH), family: "sans", fill: INK_2, anchor: "end" });
  parts.push(figureSet.svg, rankSet.svg);
  const gaugeW = r(IN - Math.max(figureSet.width, rankSet.width) - 40);
  parts.push(gauge(view.percentile, M, gaugeTop, gaugeW, gaugeH));
  y = gaugeTop + gaugeH;

  /* --- the closing river, drawn from the day's seed --------------------------- */
  const riverTop = r(y + f.gapRiver - HORIZON);
  const riverH = r(Math.max(riverBottom - riverTop, 48));
  parts.push(
    `<g data-river="" transform="translate(0 ${riverTop})">` +
      closingRiver({
        seed: view.seed,
        percentile: view.percentile,
        width: W,
        height: riverH,
        horizon: HORIZON,
        sunX: W - 104 - f.sunR,
        sunR: f.sunR,
        colours: RIVER_COLOURS,
      }) +
      `</g>`,
  );

  /* --- the foot: the person's clock, India's, the distance, the address ------- */
  const site = await typeset("snanify.com", { size: 32, x: R, y: footBaseline, family: "sans", weight: 700, fill: INK, anchor: "end" });
  parts.push(site.svg);
  parts.push(
    (
      await fitted([view.keptLocal, `${view.keptIst} IST`, view.distance].filter(Boolean).join(" · "), {
        size: 32,
        x: M,
        y: footBaseline,
        family: "sans",
        fill: INK_2,
        maxWidth: IN - site.width - 32,
      })
    ).svg,
  );

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ` +
    `width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${parts.join("")}</svg>`
  );
}

/** The memento, 1080 by 1920: what a morning leaves and what gets sent. */
export function mementoSvg(view: PatraView): Promise<string> {
  return tallSvg(view, MEMENTO);
}

/** The four by five sheet, 1080 by 1350, for the ad renderer: same order, a shorter river. */
export function patraSvg(view: PatraView): Promise<string> {
  return tallSvg(view, SHEET);
}

/* --- the link card ------------------------------------------------------------ */

export const CARD_SIZE = { width: 1200, height: 630 };

/**
 * The link preview, 1200 by 630: the names, where, how the river ran with its
 * gauge, and the river with its sun. WITHOUT THE PORTRAIT AND WITHOUT THE SEAL.
 * A card unfurls in a group on its own; whose face appears there is the
 * sharer's choice, made by sending the sheet itself.
 */
export async function patraCardSvg(view: PatraView): Promise<string> {
  const { width: W, height: H } = CARD_SIZE;
  const m = 64;
  const R = W - m;
  const c = copyFor(view);
  const parts: string[] = [`<rect width="${W}" height="${H}" fill="${PAPER}" />`];

  const headY = 92;
  const title = await typeset(c.title, { size: 34, x: m, y: headY, weight: 700, fill: SINDOOR });
  parts.push(title.svg);
  parts.push(
    (
      await fitted(`${view.keptDate} · ${view.tithi}`, {
        size: 26,
        x: R,
        y: headY,
        family: "sans",
        fill: INK_2,
        anchor: "end",
        maxWidth: R - m - title.width - 32,
      })
    ).svg,
  );

  /* The names on the left, the river's state on the right, the river below. */
  const leftW = 640;
  const rightX = m + leftW + 56;
  const rightW = R - rightX;
  const riverTop = 452;
  const namesTop = 132;
  const placeRoom = 56;

  let names: NameLine[] = [];
  for (const tiers of [
    [72, 60, 48],
    [60, 50, 40],
    [48, 40, 34],
  ] as const) {
    names = await nameLines(view.names, tiers, leftW);
    if (names.reduce((s, l) => s + l.step, 0) + placeRoom <= riverTop - 40 - namesTop) break;
  }
  const set = await setNames(names, m, namesTop, leftW);
  parts.push(set.svg);
  parts.push(await placeLine(view, m, r(set.bottom + 40), 28, leftW));

  const plain = plainLine(view);
  let y = 176;
  parts.push((await fitted(`${view.state}${c.stop}`, { size: 46, x: rightX, y, weight: 800, fill: INK, maxWidth: rightW })).svg);
  if (plain) {
    for (const line of await wrap(plain, { size: 24, family: "sans", maxWidth: rightW })) {
      y += 36;
      parts.push((await typeset(line, { size: 24, x: rightX, y, family: "sans", fill: INK_2 })).svg);
    }
  }
  y += 40;
  parts.push(gauge(view.percentile, rightX, y, rightW, 36));
  y += 36 + 44;
  const [figure, rank] = proof(view);
  parts.push(
    (await fitted(`${figure}, ${rank}`, { size: 22, x: rightX, y, family: "sans", fill: INK_2, maxWidth: rightW })).svg,
  );

  parts.push(
    `<g data-river="" transform="translate(0 ${riverTop})">` +
      closingRiver({
        seed: view.seed,
        percentile: view.percentile,
        width: W,
        height: H - riverTop,
        horizon: 22,
        sunX: W - 96 - 56,
        sunR: 56,
        colours: RIVER_COLOURS,
        rule: 4,
        weight: 2,
      }) +
      `</g>`,
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${parts.join("")}</svg>`;
}

/* --- rasterising -------------------------------------------------------------- */

/** The memento as a PNG: what a morning leaves, and what gets sent. */
export async function renderPatra(view: PatraView): Promise<Buffer> {
  return rasterise(await mementoSvg(view), MEMENTO_SIZE.width);
}

/** The four by five sheet, for anything that wants a sheet of paper. */
export async function renderPatraSheet(view: PatraView): Promise<Buffer> {
  return rasterise(await patraSvg(view), PATRA_SIZE.width);
}

/** The link preview as a PNG. No portrait, so nothing to fetch. */
export async function renderPatraCard(view: PatraView): Promise<Buffer> {
  return rasterise(await patraCardSvg(view), CARD_SIZE.width);
}

/**
 * The memento for a stored sitting, by the renderer of its version: a row
 * from before the image was versioned is redrawn by v2, as it was sent.
 */
export async function renderPatraFor(sitting: Sitting): Promise<Buffer> {
  const view = patraView(sitting);
  return sitting.imageVersion === null || sitting.imageVersion === undefined
    ? renderPatraV2(view)
    : renderPatra(view);
}

async function rasterise(svg: string, width: number): Promise<Buffer> {
  const resvg = new Resvg(svg, {
    /* No text is left in the document, so no font is needed to rasterise it. */
    font: { loadSystemFonts: false },
    background: PAPER,
    fitTo: { mode: "width", value: width },
  });

  /* The portrait is the one external reference in the document. resvg fetches
     it itself only when told to resolve images, so it is handed over here. */
  for (const url of resvg.imagesToResolve()) {
    try {
      const response = await fetch(url);
      if (response.ok) resvg.resolveImage(url, Buffer.from(await response.arrayBuffer()));
    } catch {
      /* A portrait that will not load leaves an empty mount rather than
         failing the whole sheet. */
    }
  }

  return Buffer.from(resvg.render().asPng());
}
