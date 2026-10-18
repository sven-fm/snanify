/* ---------------------------------------------------------------------------
   The horizon sun (spec 6.9), as numbers. One source for the page's <Mark />
   and for the renderers that have no React: scripts/icons.mjs today, the link
   cards and the email header later.

   A 48 grid. An ink ring on paper; inside it a sindoor sun whose lower half
   the ink horizon cuts off at y 24.6; below it teal water bands widening
   toward the viewer. The full mark has three bands and a 2.4 ring. The small
   cut, for 16 and 32 pixels, has a 3.6 ring, a larger sun and two thick bands,
   because at 16px three thin bands merge into one smudge.

   No imports and only erasable TypeScript, so Node runs this file directly.
   --------------------------------------------------------------------------- */

export type MarkCut = {
  ring: { r: number; stroke: number };
  sun: number;
  horizon: number;
  water: readonly (readonly [x: number, y: number, w: number, h: number])[];
};

/** Where the horizon cuts the sun, and the clip that trims the water. */
export const HORIZON_Y = 24.6;
export const CLIP_R = 20;

export const MARK_FULL: MarkCut = {
  ring: { r: 21.6, stroke: 2.4 },
  sun: 8.6,
  horizon: 1.4,
  water: [
    [8, 29, 32, 1.8],
    [5, 33.4, 38, 2],
    [2, 38, 44, 2.2],
  ],
};

export const MARK_SMALL: MarkCut = {
  ring: { r: 22, stroke: 3.6 },
  sun: 9.5,
  horizon: 1.8,
  water: [
    [6, 30, 36, 3],
    [2, 37, 44, 3.4],
  ],
};

const r2 = (n: number) => Number(n.toFixed(2));

/** The sun above the horizon: a half disc, so it needs no second clip. */
export function sunPath(r: number): string {
  return `M${r2(24 - r)} ${HORIZON_Y}A${r} ${r} 0 0 1 ${r2(24 + r)} ${HORIZON_Y}Z`;
}

export type MarkColours = { paper: string; ink: string; sun: string; water: string };

/**
 * The mark as a standalone SVG string. `night`, when given, is applied under
 * prefers-color-scheme: dark, which is what a browser tab follows.
 */
export function markSvg({
  small = false,
  size,
  day,
  night,
  id = "m",
}: {
  small?: boolean;
  size?: number;
  day: MarkColours;
  night?: MarkColours;
  id?: string;
}): string {
  const cut = small ? MARK_SMALL : MARK_FULL;
  const dims = size ? ` width="${size}" height="${size}"` : "";
  const style = night
    ? `<style>.p{fill:${day.paper};stroke:${day.ink}}.i{fill:${day.ink}}.s{fill:${day.sun}}.w{fill:${day.water}}` +
      `@media (prefers-color-scheme:dark){.p{fill:${night.paper};stroke:${night.ink}}.i{fill:${night.ink}}.s{fill:${night.sun}}.w{fill:${night.water}}}</style>`
    : "";
  const attr = (cls: string, value: string) => (night ? `class="${cls}"` : value);
  const water = cut.water.map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"${dims}>${style}` +
    `<defs><clipPath id="${id}"><circle cx="24" cy="24" r="${CLIP_R}"/></clipPath></defs>` +
    `<circle cx="24" cy="24" r="${cut.ring.r}" ${attr("p", `fill="${day.paper}" stroke="${day.ink}"`)} stroke-width="${cut.ring.stroke}"/>` +
    `<g clip-path="url(#${id})">` +
    `<path d="${sunPath(cut.sun)}" ${attr("s", `fill="${day.sun}"`)}/>` +
    `<rect y="${HORIZON_Y}" width="48" height="${cut.horizon}" ${attr("i", `fill="${day.ink}"`)}/>` +
    `<g ${attr("w", `fill="${day.water}"`)}>${water}</g>` +
    `</g></svg>`
  );
}
