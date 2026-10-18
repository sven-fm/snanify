/* ---------------------------------------------------------------------------
   The engraving: a river drawn from a seed.

   Every Sankalp Patra carries a band of hatched water, and no two are alike.
   The lines come out of the sitting's seed, which is a SHA-256 of four facts
   printed on the sheet, so the picture is a function of the public record: a
   reader with the sheet can fetch the day's figure, recompute the seed, redraw
   this, and get the identical image. Forging one means forging the flood
   model's published record first.

   HOW THE RIVER'S OWN STATE SHOWS UP IN IT. The percentile decides how many
   lines there are and how far they travel: a river in spate is drawn dense and
   high, a slack one thin and low. So two sheets from the same water a month
   apart look related and different, the way the river was.

   DETERMINISM IS THE WHOLE POINT, so nothing here touches Math.random, Date,
   or any float that could serialise differently. Every coordinate is rounded to
   two decimals before it becomes a string, which is also what stops React
   reporting a hydration mismatch when the same path is drawn on both sides.
   --------------------------------------------------------------------------- */

import { horizonSun, sunPath, type WaveRow } from "@/lib/river-geometry";

/** A tiny deterministic generator, seeded from the hash. xorshift32. */
function generator(seedHex: string): () => number {
  let state = 0;
  for (let i = 0; i < 8; i += 1) {
    state = (state * 16 + parseInt(seedHex[i] ?? "0", 16)) >>> 0;
  }
  if (state === 0) state = 0x9e3779b9;

  return () => {
    state ^= state << 13;
    state >>>= 0;
    state ^= state >> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 0x100000000;
  };
}

export type Engraving = {
  /** SVG path `d` strings, back to front. */
  lines: string[];
  /** The viewBox these are drawn in. */
  width: number;
  height: number;
};

export type EngravingInput = {
  seed: string;
  /** 0 to 100. Null when the sheet stands on the seasonal median. */
  percentile: number | null;
  width?: number;
  height?: number;
  /** Even spacing edge to edge, for a drawing that tiles vertically. */
  flat?: boolean;
};

const round = (n: number) => Number(n.toFixed(2));

/**
 * Draw the band.
 *
 * The result is pure: the same seed and percentile always give byte-identical
 * path strings, on a server, in a browser and in five years.
 */
export function engrave({
  seed,
  percentile,
  width = 1000,
  height = 340,
  flat = false,
}: EngravingInput): Engraving {
  const random = generator(seed);

  /* A slack river gets eighteen lines, a river in spate thirty-four. The
     median stands at the middle of that range when there is no percentile. */
  const rank = percentile ?? 50;
  const count = Math.round(18 + (rank / 100) * 16);

  /* The gap between one line and the next, which is what the swing must stay
     inside: a crest taller than the gap crosses its neighbour and the band
     stops reading as water. */
  const spacing = height / (count + 1);

  /* How much of that gap a crest is allowed. A quiet river keeps a fifth of
     it; a river in spate uses more than half, and looks it. */
  const room = 0.18 + (rank / 100) * 0.38;

  const lines: string[] = [];

  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);

    /* Laid from the far bank forward, closer together at the top, so the band
       reads in perspective rather than as a grid. A flat drawing spaces them
       evenly with half a gap at each edge, so two copies stacked meet without
       a seam; that is what the flowing band on the pages is cut from. */
    const baseline = flat
      ? height * ((i + 0.5) / count)
      : height * (0.1 + 0.86 * (t * 0.55 + t * t * 0.45));

    const phase = random() * Math.PI * 2;
    /* Long, and longer at the back. Short wavelengths read as noise. A flat
       drawing has no back and no front, so every line gets the middle
       distance's wavelength and swing, and two copies stacked read as one
       water rather than two rivers. */
    const depth = flat ? 0.5 : t;
    const wavelength = width * (0.55 - 0.3 * depth) * (0.8 + random() * 0.5);
    const swing = spacing * room * (0.45 + 0.55 * depth) * (0.75 + random() * 0.5);

    /* One gentle second harmonic, at a fifth of the amplitude, so a crest is
       never a perfect sine and never a spike. */
    const secondPhase = random() * Math.PI * 2;

    const steps = 64;
    const points: string[] = [];

    for (let s = 0; s <= steps; s += 1) {
      const x = (width * s) / steps;
      const angle = phase + (x / wavelength) * Math.PI * 2;
      const y =
        baseline +
        Math.sin(angle) * swing +
        Math.sin(secondPhase + angle * 2.13) * swing * 0.2;

      points.push(`${round(x)} ${round(y)}`);
    }

    lines.push(`M ${points.join(" L ")}`);
  }

  return { lines, width, height };
}

/** Line weight for the nth line, thicker at the front. */
export function strokeWidth(index: number, count: number): number {
  return round(0.8 + (index / Math.max(count - 1, 1)) * 1.5);
}

/** Ink strength for the nth line, faint at the back. */
export function strokeOpacity(index: number, count: number): number {
  return round(0.22 + (index / Math.max(count - 1, 1)) * 0.5);
}

/* ---------------------------------------------------------------------------
   The closing river of the v3 Sankalp Patra (spec 6.5).

   The same engraving, restyled: teal lines under a thin ink horizon, a sindoor
   sun sitting on that horizon and cut by it, and the sun's path in marigold
   dashes running from under the sun toward the bottom centre, widening as it
   comes closer. `engrave()` still decides everything about the water: the
   seed lays the lines and the percentile decides how many, so a fuller river
   closes its sheet with more of them. Nothing here touches that logic.

   Pure, rounded and colour-agnostic: the caller hands in the hex values.
   --------------------------------------------------------------------------- */

export type ClosingRiverInput = {
  seed: string;
  percentile: number | null;
  /** The box the river is drawn in, from its own top-left corner. */
  width: number;
  height: number;
  /** How far down the box the horizon runs. */
  horizon: number;
  /** The sun's centre across the box, and its radius. */
  sunX: number;
  sunR: number;
  colours: { paper: string; ink: string; teal: string; sindoor: string; marigold: string };
  /** The horizon's weight. */
  rule?: number;
  /** How heavy the lines are against the engraving's own weights. */
  weight?: number;
};

export function closingRiver(input: ClosingRiverInput): string {
  const { seed, percentile, width, height, horizon, sunX, sunR, colours } = input;
  const rule = input.rule ?? 5;
  const weight = input.weight ?? 2.2;
  const r2 = (n: number) => round(n).toString();

  /* The sun first, so the water's paper hides its lower part: the horizon
     cuts it, as on every river the site draws (src/lib/river-geometry.ts). */
  const at = horizonSun({ cx: sunX, horizonY: horizon, r: sunR });
  const sun = `<circle cx="${r2(at.cx)}" cy="${r2(at.cy)}" r="${r2(at.r)}" fill="${colours.sindoor}" />`;
  const water = `<rect x="0" y="${r2(horizon)}" width="${r2(width)}" height="${r2(height - horizon)}" fill="${colours.paper}" />`;

  const top = horizon + rule;
  const depth = Math.max(1, height - top);
  const drawn = engrave({ seed, percentile, width, height: depth });
  const n = drawn.lines.length;

  const lines = drawn.lines
    .map(
      (d, i) =>
        `<path d="${d}" fill="none" stroke="${colours.teal}" stroke-width="${r2(strokeWidth(i, n) * weight)}" stroke-opacity="${r2(Math.min(1, strokeOpacity(i, n) * 1.25))}" />`,
    )
    .join("");

  /* The path lies on the drawing's own lines, about ten of them however many
     the river drew: each row of dashes sits at its line's mean height, so the
     glitter is on this river's water. A dash is never taller than half the
     gap to its neighbour, so a short river keeps its path broken. sunPath
     spaces and widens them, as on every river the site draws. */
  const every = Math.max(2, Math.round(n / 10));
  const means = drawn.lines.map((d) => {
    const ys = d
      .slice(2)
      .split(" L ")
      .map((p) => Number(p.split(" ")[1]));
    return ys.reduce((a, b) => a + b, 0) / ys.length;
  });
  const picked = means.map((y, i) => ({ y, i })).filter(({ i }) => i % every === 0);
  const rows: WaveRow[] = picked.map(({ y, i }, k) => {
    const gap = Math.abs((picked[k + 1]?.y ?? depth) - y) || depth;
    const stroke = Math.min(strokeWidth(i, n) * weight * 1.2, (gap * 0.5) / 3.6);
    return { y: round(y), amp: 0, period: 0, stroke: round(stroke), opacity: 1, points: "", drift: 0 };
  });
  const dashes = sunPath(rows, { sunX, width })
    .map((d) => `<rect x="${r2(d.x)}" y="${r2(d.y)}" width="${r2(d.w)}" height="${r2(d.h)}" fill="${colours.marigold}" />`)
    .join("");

  return (
    sun +
    water +
    `<g transform="translate(0 ${r2(top)})">${lines}${dashes}</g>` +
    `<rect x="0" y="${r2(horizon)}" width="${r2(width)}" height="${r2(rule)}" fill="${colours.ink}" />`
  );
}
