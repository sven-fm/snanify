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
    /* Long, and longer at the back. Short wavelengths read as noise. */
    const wavelength = width * (0.55 - 0.3 * t) * (0.8 + random() * 0.5);
    const swing = spacing * room * (0.45 + 0.55 * t) * (0.75 + random() * 0.5);

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
