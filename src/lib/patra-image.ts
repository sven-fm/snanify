import { ordinal } from "@/lib/ordinal";
import "server-only";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { SITE_ORIGIN } from "@/lib/locales";
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
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${PAPER_2}" />` +
    `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${drawn.width} ${drawn.height}" preserveAspectRatio="none">${paths}</svg>`
  );
}

/* ---------------------------------------------------------------------------
   The ghat, as ink on the paper.

   public/waters/<slug>.webp is the same five-tone mask /live prints through
   CSS: ink in the colour channels, density in the alpha. Flattened onto the
   plate's paper it is the picture, and it is cut to the plate's own size so
   the SVG carries it without scaling. Read from disk where the files are
   beside the code, which is every local run, and fetched from the site's own
   origin where they are not, which is the deployed function. Six pictures,
   each made once per process.
   --------------------------------------------------------------------------- */
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
        .resize(w, h, { fit: "cover", position: "attention" })
        .flatten({ background: PAPER_2 })
        .png({ compressionLevel: 9 })
        .toBuffer();
      return `data:image/png;base64,${png.toString("base64")}`;
    } catch (error) {
      /* A sheet without its picture is still a sheet; the band alone is what
         every sheet carried before 16 September 2026. */
      console.error("patra: plate failed", slug, error);
      return null;
    }
  })();
  plates.set(key, made);
  return made;
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
    (await typeset(view.specimen ? "SANKALP PATRA, SPECIMEN" : "SANKALP PATRA", { size: 23, x: M, y: 84, fill: SPOT, tracking: 0.26 })).svg,
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

  /* --- the portrait, the ghat and the river ------------------------------ */
  const artTop = y + 48;
  const artHeight = 300;
  const plateHeight = 204;

  const artX = view.portraitUrl ? M + 268 : M;
  const artW = view.portraitUrl ? INNER - 268 : INNER;

  if (view.portraitUrl) {
    parts.push(
      `<image href="${view.portraitUrl}" x="${M}" y="${artTop}" width="240" height="${artHeight}" preserveAspectRatio="xMidYMid slice" />` +
        `<rect x="${M}" y="${artTop}" width="240" height="${artHeight}" fill="none" stroke="${RULE}" />`,
    );
  }

  /* The ghat above, its water below, one frame around both. */
  const plate = await ghatPlate(view.waterSlug, artW, plateHeight);
  if (plate) {
    parts.push(`<image href="${plate}" x="${artX}" y="${artTop}" width="${artW}" height="${plateHeight}" />`);
    parts.push(band(view, artX, artTop + plateHeight, artW, artHeight - plateHeight));
  } else {
    parts.push(band(view, artX, artTop, artW, artHeight));
  }
  parts.push(`<rect x="${artX}" y="${artTop}" width="${artW}" height="${artHeight}" fill="none" stroke="${RULE}" />`);

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

  /* --- the prayer, in the room between the art and the register ---------- */
  let after = artTop + artHeight + 56;
  /* Five names push the art down and the register does not move, so the
     prayer takes what room is left: every Devanagari line that fits, and the
     roman line only if it fits under them. Nothing is ever set over a rule. */
  const limit = footTop - 26 - 20;

  if (view.prayer) {
    lines: for (const line of view.prayer.devanagari) {
      const fitted = await wrap(line, { size: 30, maxWidth: INNER });
      for (const piece of fitted) {
        if (after > limit) break lines;
        parts.push((await typeset(piece, { size: 30, x: M, y: after, fill: INK })).svg);
        after += 46;
      }
    }

    const roman = view.prayer.roman.join(" / ");
    const romanPieces = await wrap(roman, { size: 20, maxWidth: INNER });
    if (after + 6 + romanPieces.length * 30 <= limit) {
      for (const piece of romanPieces) {
        parts.push((await typeset(piece, { size: 20, x: M, y: after + 6, fill: INK_2 })).svg);
        after += 30;
      }
    }
  }

  parts.push(rule(footTop - 26, true));

  let rowY = footTop + 8;
  for (const [k, v] of rows) {
    parts.push(await row(k, v, rowY));
    rowY += rowHeight;
  }

  /* A specimen has no page of its own, so it carries the site rather than
     an address that would answer 404. */
  parts.push(
    (
      await typeset(view.specimen ? "snanify.com" : `snanify.com/p/${view.id}`, {
        size: 18,
        x: M,
        y: rowY + 30,
        fill: INK_2,
      })
    ).svg,
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

/* ---------------------------------------------------------------------------
   The memento, 1080 by 1920: the sheet as a phone sees it.

   This is what a morning leaves and what gets sent. A phone-shaped page
   rather than a sheet of paper: the names large, the ghat and its water,
   the prayer, and two figures, on paper with the water drawn faintly across
   the whole of it. The A4 sheet with every field stays as the print
   version on the page; this one is for a thumb and a family group.
   --------------------------------------------------------------------------- */

export const MEMENTO_SIZE = { width: 1080, height: 1920 };

export async function mementoSvg(view: PatraView): Promise<string> {
  const W = MEMENTO_SIZE.width;
  const H = MEMENTO_SIZE.height;
  const MM = 72;
  const R = W - MM;
  const IN = R - MM;

  const parts: string[] = [`<rect width="${W}" height="${H}" fill="${PAPER}" />`];

  /* The water, faintly, across the whole page: the same lines the band
     draws, cut flat and spread over the page's height. */
  const ground = engrave({ seed: view.seed, percentile: view.percentile, width: W, height: H, flat: true });
  parts.push(
    `<g opacity="0.16">` +
      ground.lines
        .map(
          (d, i) =>
            `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${(strokeWidth(i, ground.lines.length) * 1.6).toFixed(2)}" stroke-opacity="${strokeOpacity(i, ground.lines.length)}" />`,
        )
        .join("") +
      `</g>`,
  );

  /* --- masthead --------------------------------------------------------- */
  parts.push((await typeset(view.specimen ? "SANKALP PATRA, SPECIMEN" : "SANKALP PATRA", { size: 26, x: MM, y: 118, fill: SPOT, tracking: 0.26 })).svg);
  parts.push((await typeset(view.keptDate, { size: 26, x: R, y: 118, fill: INK_2, anchor: "end" })).svg);
  parts.push(`<rect x="${MM}" y="142" width="${IN}" height="3" fill="${INK}" />`);
  parts.push(`<rect x="${MM}" y="149" width="${IN}" height="1" fill="${INK}" />`);

  /* --- the ghat and its water ------------------------------------------- */
  const artTop = 190;
  const plateH = 430;
  const bandH = 150;
  const artH = plateH + bandH;
  const plate = await ghatPlate(view.waterSlug, IN, plateH);
  if (plate) {
    parts.push(`<image href="${plate}" x="${MM}" y="${artTop}" width="${IN}" height="${plateH}" />`);
    parts.push(band(view, MM, artTop + plateH, IN, bandH));
  } else {
    parts.push(band(view, MM, artTop, IN, artH));
  }
  parts.push(`<rect x="${MM}" y="${artTop}" width="${IN}" height="${artH}" fill="none" stroke="${INK}" stroke-width="2" />`);

  /* --- the names, and the portrait beside them --------------------------- */
  let y = artTop + artH + 96;
  const names = view.names.slice(0, 5);
  const nameSize = names.length > 3 ? 50 : names.length > 2 ? 56 : 66;
  const portraitW = 280;
  const portraitH = 350;
  const nameX = view.portraitUrl ? MM + portraitW + 40 : MM;
  const nameMax = R - nameX;

  if (view.portraitUrl) {
    parts.push(
      `<image href="${view.portraitUrl}" x="${MM}" y="${y - 52}" width="${portraitW}" height="${portraitH}" preserveAspectRatio="xMidYMid slice" />` +
        `<rect x="${MM}" y="${y - 52}" width="${portraitW}" height="${portraitH}" fill="none" stroke="${RULE}" />`,
    );
  }

  let namesBottom = y;
  for (const name of names) {
    for (const piece of await wrap(name, { size: nameSize, weight: 600, maxWidth: nameMax })) {
      parts.push((await typeset(piece, { size: nameSize, x: nameX, y: namesBottom, weight: 600, fill: INK })).svg);
      namesBottom += nameSize * 1.22;
    }
  }
  const placeY = Math.max(namesBottom + 8, view.portraitUrl ? y - 52 + portraitH + 44 : 0);
  parts.push((await typeset(`${view.water}, ${view.ghat}, ${view.city}`, { size: 30, x: MM, y: placeY, fill: INK_2 })).svg);
  y = placeY + 70;

  /* --- the figures, before the prayer, so they are never squeezed out ---- */
  const footTop = H - MM - 40;
  const figuresTop = footTop - 168;
  parts.push(`<rect x="${MM}" y="${figuresTop}" width="${IN}" height="2" fill="${INK}" />`);
  parts.push((await typeset("FLOW", { size: 20, x: MM, y: figuresTop + 40, fill: INK_2, tracking: 0.08 })).svg);
  parts.push((await typeset(view.flow, { size: 46, x: MM, y: figuresTop + 100, weight: 600, fill: INK })).svg);
  if (view.rank) {
    parts.push((await typeset("RANKED", { size: 20, x: R, y: figuresTop + 40, fill: INK_2, tracking: 0.08, anchor: "end" })).svg);
    parts.push((await typeset(`${ordinal(Number(view.rank))} percentile`, { size: 46, x: R, y: figuresTop + 100, weight: 600, fill: INK, anchor: "end" })).svg);
    parts.push((await typeset("since 1997", { size: 22, x: R, y: figuresTop + 136, fill: INK_2, anchor: "end" })).svg);
  }
  parts.push((await typeset(`${view.keptTime} ${view.keptZone}, ${view.keptIst} IST`, { size: 22, x: MM, y: figuresTop + 136, fill: INK_2 })).svg);

  /* --- the prayer, in the room that is left ------------------------------ */
  if (view.prayer) {
    const limit = figuresTop - 40;
    lines: for (const line of view.prayer.devanagari) {
      for (const piece of await wrap(line, { size: 38, maxWidth: IN })) {
        if (y + 38 > limit) break lines;
        parts.push((await typeset(piece, { size: 38, x: MM, y, fill: INK })).svg);
        y += 58;
      }
    }
    const roman = await wrap(view.prayer.roman.join(" / "), { size: 24, maxWidth: IN });
    if (y + 8 + roman.length * 34 <= limit) {
      for (const piece of roman) {
        parts.push((await typeset(piece, { size: 24, x: MM, y: y + 8, fill: INK_2 })).svg);
        y += 34;
      }
    }
  }

  /* --- foot --------------------------------------------------------------- */
  parts.push((await typeset(view.specimen ? "snanify.com" : `snanify.com/p/${view.id}`, { size: 20, x: MM, y: footTop + 14, fill: INK_2 })).svg);
  parts.push((await typeset(`seed ${view.seedShort}`, { size: 20, x: R, y: footTop + 14, fill: INK_2, anchor: "end" })).svg);

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ` +
    `width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${parts.join("")}</svg>`
  );
}

/** The memento as a PNG: what a morning leaves, and what gets sent. */
export async function renderPatra(view: PatraView): Promise<Buffer> {
  return rasterise(await mementoSvg(view), MEMENTO_SIZE.width);
}

/** The four-by-five sheet, kept for anything that still wants a sheet of paper. */
export async function renderPatraSheet(view: PatraView): Promise<Buffer> {
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
