import "server-only";
import { typeset } from "@/lib/typeset";

/* ---------------------------------------------------------------------------
   The wordmark as outlines, for the renderers that have no stylesheet: the
   link card today. The same drawing as <Wordmark /> (spec 6.9): "Snanify" in
   one weight, Eczar 800 at -0.015em, the i set as the dotless U+0131 with the
   sindoor bindu as its dot. The bindu's numbers are the ones globals.css
   measured off the live face: 0.237em across, its foot 0.543em above the
   baseline, centred 53.6% into the i's box. scripts/email-art.mjs draws the
   email header's copy the same way.
   --------------------------------------------------------------------------- */

const TRACK = -0.015;

export async function wordmarkSvg({
  size,
  x,
  y,
  ink,
  bindu,
}: {
  size: number;
  x: number;
  /** The baseline. */
  y: number;
  ink: string;
  bindu: string;
}): Promise<{ svg: string; width: number }> {
  const set = { size, y, weight: 800 as const, fill: ink, tracking: TRACK };
  const head = await typeset("Snan", { ...set, x });
  const i = await typeset("ı", { ...set, x: x + head.width });
  const tail = await typeset("fy", { ...set, x: x + head.width + i.width });
  const d = 0.237 * size;
  const cx = x + head.width + i.width * 0.536;
  const cy = y - 0.543 * size - d / 2;
  const dot = `<circle data-bindu="" cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${(d / 2).toFixed(2)}" fill="${bindu}" />`;
  return {
    svg: `<g data-wordmark="">${head.svg}${i.svg}${tail.svg}${dot}</g>`,
    width: head.width + i.width + tail.width,
  };
}
