import { BREATH } from "@/lib/sitting-plan";

/* ---------------------------------------------------------------------------
   The seconds the sitting counts down, read off the sitting's own clock.

   The breath counts 4, 3, 2, 1 on the way in and 6 .. 1 on the way out; the
   stillness counts its minute down. Each number is derived from `into`, the
   seconds into the part that the frame loop already keeps, and so is its
   fade. There is no second timer to drift: the words, the numbers and the
   river's swell all read the one clock, and a paused clock pauses them all.

   No React here, so the arithmetic is tested on its own.
   --------------------------------------------------------------------------- */

const CYCLE = BREATH.in + BREATH.out;

/** Summed frame deltas land a hair short of a whole second; that is not the second before. */
const EPSILON = 1e-6;

export type BreathCount = {
  /** Which way the breath is going. */
  rising: boolean;
  /** The second being counted: 4..1 on the way in, 6..1 on the way out. */
  n: number;
  /** How far through that second, 0 to just under 1. */
  frac: number;
};

/** Where the breath is, `into` seconds into the breath. */
export function breathCount(into: number): BreathCount {
  const at = ((into % CYCLE) + CYCLE + EPSILON) % CYCLE;
  const rising = at < BREATH.in;
  const within = rising ? at : at - BREATH.in;
  const whole = Math.floor(within);
  const length = rising ? BREATH.in : BREATH.out;
  return { rising, n: length - whole, frac: Number(Math.min(Math.max(within - whole, 0), 0.999).toFixed(3)) };
}

/**
 * A breath number fading away across its second: full at the start of it,
 * gone at the end, eased so it reads for most of the second.
 */
export function fadeAway(frac: number): number {
  return Number(Math.max(0, 1 - frac * frac).toFixed(3));
}

/** The stretch of each second over which a stillness number gives way:
    the old one fades from `OUT[0]` to `OUT[1]`, the new one in from `IN[0]` to
    the end. The two overlap only where both are faint, so the digits never
    sit one on the other at half strength. */
export const OUT = [0.4, 0.8] as const;
export const IN = [0.6, 1] as const;

export type StillCount = {
  /** The number on the screen, the seconds left rounded up. */
  now: number;
  /** The number arriving, one less, or null when `now` is the last. */
  next: number | null;
  /** How visible each of the two is. */
  nowOpacity: number;
  nextOpacity: number;
};

const ramp = (x: number, [a, b]: readonly [number, number]) => Math.min(Math.max((x - a) / (b - a), 0), 1);

/**
 * The stillness's seconds left, as a cross-fade: each number stands for most
 * of its second, fades as the next fades in, and the next lands at full ink
 * as its own second begins.
 */
export function stillCount(length: number, into: number): StillCount {
  const left = Math.max(0, length - into);
  const now = Math.max(0, Math.ceil(left - EPSILON));
  const next = now > 1 ? now - 1 : null;
  /* How far through the current second: 0 as it begins, 1 as it ends. */
  const through = now === 0 ? 0 : 1 - (left - (now - 1));
  if (next === null) return { now, next, nowOpacity: 1, nextOpacity: 0 };
  return {
    now,
    next,
    nowOpacity: Number((1 - ramp(through, OUT)).toFixed(3)),
    nextOpacity: Number(ramp(through, IN).toFixed(3)),
  };
}
