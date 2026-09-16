import { ordinal } from "@/lib/ordinal";
import "server-only";
import { Resvg } from "@resvg/resvg-js";
import { engrave, strokeOpacity, strokeWidth } from "@/lib/engraving";
import { typeset, wrap } from "@/lib/typeset";
import type { PatraView } from "@/lib/patra-view";

/* ---------------------------------------------------------------------------
   The Sankalp Patra as a picture, 1080 by 1350.

   FOUR BY FIVE, BECAUSE THAT IS WHAT WHATSAPP SHOWS. It is the tallest ratio a
   chat thread renders without cropping, and the family group is where this
   sheet actually goes. The top third carries the names, the water and the
   date, because that band is what shows before anybody taps.

   IT IS PLAIN SVG, AND EVERY LETTER IS AN OUTLINE. See src/lib/typeset.ts for
   why: the two renderers that lay out text themselves both misspell
   Devanagari, and a keepsake with somebody's father's name spelled wrong is
   worse than no keepsake. HarfBuzz shapes each line into paths here, so the
   rasteriser only has to fill shapes and never has to know what a matra is.

   That also makes composing it plainer than it would be under a layout engine:
   the canvas is a fixed size, so everything is placed at a coordinate and the
   only measuring needed is the width of a line, which the typesetter returns.
   --------------------------------------------------------------------------- */

export const PATRA_SIZE = { width: 1080, height: 1350 };

const PAPER = "#faf6ea";
const PAPER_2 = "#f2ead9";
const INK = "#16130f";
const INK_2 = "#57513f";
const RULE = "#c3b697";
const SPOT = "#b32620";

const M = 64;
const RIGHT = PATRA_SIZE.width - M;
const INNER = RIGHT - M;

function rule(y: number, strong = false): string {
  return `<rect x="${M}" y="${y}" width="${INNER}" height="${strong ? 2.5 : 1}" fill="${strong ? INK : RULE}" />`;
}

/** The hatched band, drawn from the seed. */
function band(view: PatraView, x: number, y: number, w: number, h: number): string {
  const drawn = engrave({ seed: view.seed, percentile: view.percentile, width: 1000, height: 300 });

  const paths = drawn.lines
    .map(
      (d, i) =>
        `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${strokeWidth(i, drawn.lines.length)}" stroke-opacity="${strokeOpacity(i, drawn.lines.length)}" />`,
    )
    .join("");

  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${PAPER_2}" stroke="${RULE}" />` +
    `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${drawn.width} ${drawn.height}" preserveAspectRatio="none">${paths}</svg>`
  );
}

/** One ruled row of the register. */
async function row(k: string, v: string, y: number): Promise<string> {
  const key = await typeset(k.toUpperCase(), {
    size: 21,
    x: M,
    y,
    fill: INK_2,
    tracking: 0.06,
  });
  const value = await typeset(v, { size: 25, x: RIGHT, y, fill: INK, anchor: "end" });

  return key.svg + value.svg + rule(y + 16);
}

/** The whole sheet, as an SVG document. */
export async function patraSvg(view: PatraView): Promise<string> {
  const parts: string[] = [
    `<rect width="${PATRA_SIZE.width}" height="${PATRA_SIZE.height}" fill="${PAPER}" />`,
  ];

  /* --- masthead --------------------------------------------------------- */
  parts.push(
    (await typeset("SANKALP PATRA", { size: 23, x: M, y: 84, fill: SPOT, tracking: 0.26 })).svg,
  );
  parts.push(
    (await typeset(view.keptDate, { size: 23, x: RIGHT, y: 84, fill: INK_2, anchor: "end" })).svg,
  );
  parts.push(rule(108, true));

  /* --- the names, which are the reason the sheet exists ----------------- */
  let y = 176;
  const names = view.names.slice(0, 5);
  const nameSize = names.length > 3 ? 44 : names.length > 2 ? 50 : 58;

  for (const name of names) {
    parts.push((await typeset(name, { size: nameSize, x: M, y, weight: 600, fill: INK })).svg);
    y += nameSize * 1.28;
  }

  parts.push(
    (
      await typeset(`${view.water}, ${view.ghat}, ${view.city}`, {
        size: 29,
        x: M,
        y: y + 12,
        fill: INK_2,
      })
    ).svg,
  );

  /* --- the portrait and the river --------------------------------------- */
  const artTop = y + 48;
  const artHeight = 300;

  if (view.portraitUrl) {
    parts.push(
      `<image href="${view.portraitUrl}" x="${M}" y="${artTop}" width="240" height="${artHeight}" preserveAspectRatio="xMidYMid slice" />` +
        `<rect x="${M}" y="${artTop}" width="240" height="${artHeight}" fill="none" stroke="${RULE}" />`,
    );
    parts.push(band(view, M + 268, artTop, INNER - 268, artHeight));
  } else {
    parts.push(band(view, M, artTop, INNER, artHeight));
  }

  /* --- the prayer -------------------------------------------------------- */
  let after = artTop + artHeight + 56;

  if (view.prayer) {
    for (const line of view.prayer.devanagari) {
      const fitted = await wrap(line, { size: 30, maxWidth: INNER });
      for (const piece of fitted) {
        parts.push((await typeset(piece, { size: 30, x: M, y: after, fill: INK })).svg);
        after += 46;
      }
    }

    const roman = view.prayer.roman.join(" / ");
    for (const piece of await wrap(roman, { size: 20, maxWidth: INNER })) {
      parts.push((await typeset(piece, { size: 20, x: M, y: after + 6, fill: INK_2 })).svg);
      after += 30;
    }
  }

  /* --- the register, pinned to the foot ---------------------------------- */
  const rows: [string, string][] = [
    ["Flow", view.flow],
    ...(view.rank ? ([["Ranked", `${ordinal(Number(view.rank))} percentile since 1997`]] as [string, string][]) : []),
    ["Kept", `${view.keptTime} ${view.keptZone}, ${view.keptIst} IST`],
    ["Tithi", view.tithi],
    ["Nakshatra", `${view.nakshatra}, moon ${view.moon}`],
  ];

  const rowHeight = 52;
  const footTop = PATRA_SIZE.height - M - 74 - rows.length * rowHeight;

  parts.push(rule(footTop - 26, true));

  let rowY = footTop + 8;
  for (const [k, v] of rows) {
    parts.push(await row(k, v, rowY));
    rowY += rowHeight;
  }

  parts.push(
    (await typeset(`snanify.com/p/${view.id}`, { size: 18, x: M, y: rowY + 30, fill: INK_2 })).svg,
  );
  parts.push(
    (
      await typeset(`seed ${view.seedShort}`, {
        size: 18,
        x: RIGHT,
        y: rowY + 30,
        fill: INK_2,
        anchor: "end",
      })
    ).svg,
  );

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ` +
    `width="${PATRA_SIZE.width}" height="${PATRA_SIZE.height}" ` +
    `viewBox="0 0 ${PATRA_SIZE.width} ${PATRA_SIZE.height}">${parts.join("")}</svg>`
  );
}

export const CARD_SIZE = { width: 1200, height: 630 };

/**
 * The link preview, 1200 by 630.
 *
 * The same facts as the sheet, in the shape a chat app unfurls, and WITHOUT
 * THE PORTRAIT. Whose face appears where is a decision the sharer makes by
 * choosing to send the sheet; putting it in a card that unfurls automatically
 * in a group makes that decision for them.
 */
export async function patraCardSvg(view: PatraView): Promise<string> {
  const { width, height } = CARD_SIZE;
  const m = 72;
  const right = width - m;
  const parts: string[] = [`<rect width="${width}" height="${height}" fill="${PAPER}" />`];

  parts.push(
    `<svg x="0" y="${height - 250}" width="${width}" height="250" viewBox="0 0 1000 300" preserveAspectRatio="none">` +
      engrave({ seed: view.seed, percentile: view.percentile, width: 1000, height: 300 })
        .lines.map(
          (d, i, all) =>
            `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${strokeWidth(i, all.length)}" stroke-opacity="${strokeOpacity(i, all.length) * 0.7}" />`,
        )
        .join("") +
      `</svg>`,
  );

  parts.push(
    (await typeset("SANKALP PATRA", { size: 24, x: m, y: 90, fill: SPOT, tracking: 0.26 })).svg,
  );
  parts.push(
    (await typeset(view.keptDate, { size: 24, x: right, y: 90, fill: INK_2, anchor: "end" })).svg,
  );
  parts.push(`<rect x="${m}" y="116" width="${right - m}" height="2.5" fill="${INK}" />`);

  let y = 200;
  for (const name of view.names.slice(0, 3)) {
    parts.push((await typeset(name, { size: 56, x: m, y, weight: 600, fill: INK })).svg);
    y += 72;
  }

  parts.push(
    (
      await typeset(`${view.water}, ${view.ghat}, ${view.city}`, {
        size: 30,
        x: m,
        y: y + 16,
        fill: INK_2,
      })
    ).svg,
  );

  parts.push(
    (
      await typeset(`${view.flow}${view.rank ? `, ${ordinal(Number(view.rank))} percentile since 1997` : ""}`, {
        size: 26,
        x: m,
        y: y + 62,
        fill: INK_2,
      })
    ).svg,
  );

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" ` +
    `viewBox="0 0 ${width} ${height}">${parts.join("")}</svg>`
  );
}

/** The sheet as a PNG. */
export async function renderPatra(view: PatraView): Promise<Buffer> {
  return rasterise(await patraSvg(view), PATRA_SIZE.width);
}

/** The link preview as a PNG. No portrait, so nothing to fetch. */
export async function renderPatraCard(view: PatraView): Promise<Buffer> {
  return rasterise(await patraCardSvg(view), CARD_SIZE.width);
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
  const images = resvg.imagesToResolve();
  for (const url of images) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        resvg.resolveImage(url, Buffer.from(await response.arrayBuffer()));
      }
    } catch {
      /* A portrait that will not load leaves an empty frame rather than
         failing the whole sheet. */
    }
  }

  return Buffer.from(resvg.render().asPng());
}
