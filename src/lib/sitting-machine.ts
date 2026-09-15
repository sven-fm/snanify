import { LIMB_ORDER, SITTING, type Limb } from "@/lib/sitting-plan";

/* ---------------------------------------------------------------------------
   The sitting as a machine, with no React in it.

   Five parts in a fixed order. Four of them end on their own clock; the vow
   ends when the thumb has held for its whole length, however long that takes.
   The first two can be left early with "next". The stillness cannot be left
   at all: no event moves it on except its own sixty seconds, and that is the
   product decision from build-plan.md written where it can be tested.

   Pressing nothing gives the three minute form exactly, which the tests in
   tests/unit/sitting-machine.test.ts hold to the second.
   --------------------------------------------------------------------------- */

export type Phase = "ready" | Limb | "done";

export type SittingState = {
  phase: Phase;
  /** Seconds into the current part. */
  into: number;
  /** Unbroken seconds the thumb has been down, during the vow. */
  held: number;
};

export type SittingEvent =
  | { type: "start" }
  | { type: "tick"; delta: number; holding: boolean }
  | { type: "next" }
  | { type: "retry" };

export const INITIAL: SittingState = { phase: "ready", into: 0, held: 0 };

/** How long the stillness shows its one instruction before going fully black. */
export const STILLNESS_NOTE_SECONDS = 3;

/** Summed frame deltas land a hair short of a whole number; a microsecond is not a late part. */
const EPSILON = 1e-6;

/** The parts "next" may leave early. */
const SKIPPABLE: ReadonlySet<Phase> = new Set<Phase>(["reading", "breath"]);

function after(phase: Phase): Phase {
  if (phase === "ready") return LIMB_ORDER[0];
  if (phase === "done") return "done";
  const i = LIMB_ORDER.indexOf(phase);
  return i + 1 < LIMB_ORDER.length ? LIMB_ORDER[i + 1] : "done";
}

function advance(state: SittingState): SittingState {
  return { phase: after(state.phase), into: 0, held: 0 };
}

export function step(state: SittingState, event: SittingEvent): SittingState {
  switch (event.type) {
    case "start":
      return state.phase === "ready" ? advance(state) : state;

    case "retry":
      return INITIAL;

    case "next":
      return SKIPPABLE.has(state.phase) ? advance(state) : state;

    case "tick": {
      if (state.phase === "ready" || state.phase === "done") return state;
      const into = state.into + event.delta;

      if (state.phase === "hold") {
        /* Counted only while the thumb is down, and back to zero the moment
           it lifts, so eleven seconds means eleven unbroken seconds. */
        const held = event.holding ? state.held + event.delta : 0;
        return held + EPSILON >= SITTING.hold ? advance(state) : { ...state, into, held };
      }

      return into + EPSILON >= SITTING[state.phase] ? advance(state) : { ...state, into, held: 0 };
    }
  }
}

/**
 * How far each of the five parts has come, 0 to 1, for the bar across the
 * top. Parts already passed are full, parts to come are empty, and the vow
 * fills with the thumb rather than the clock. Rounded so the widths the
 * server and the browser print agree.
 */
export function progress(state: SittingState): number[] {
  const current = state.phase === "done" ? LIMB_ORDER.length : LIMB_ORDER.indexOf(state.phase as Limb);
  return LIMB_ORDER.map((limb, i) => {
    if (i < current) return 1;
    if (i > current) return 0;
    const fill = limb === "hold" ? state.held / SITTING.hold : state.into / SITTING[limb];
    return Number(Math.min(Math.max(fill, 0), 1).toFixed(3));
  });
}

/** Which part, one-based, for "Part 2 of 5". Zero before the start. */
export function partNumber(phase: Phase): number {
  if (phase === "ready") return 0;
  if (phase === "done") return LIMB_ORDER.length;
  return LIMB_ORDER.indexOf(phase) + 1;
}
