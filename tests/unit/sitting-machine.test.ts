import { describe, expect, it } from "vitest";
import { LIMB_ORDER, SITTING, TOTAL_SECONDS } from "@/lib/sitting-plan";
import {
  INITIAL,
  STILLNESS_NOTE_SECONDS,
  partNumber,
  progress,
  step,
  type SittingState,
} from "@/lib/sitting-machine";

/* ---------------------------------------------------------------------------
   The sitting's machine, run the way a browser runs it: many small ticks.

   These hold the product rules the copy prints. Pressing nothing is the three
   minute form to the second. "Next" leaves the reading and the breath early
   and nothing else. The vow waits for the thumb. The stillness cannot be
   left by any event but its own clock.
   --------------------------------------------------------------------------- */

const TICK = 0.05;

/** Run `seconds` of clock, thumb down or up throughout. */
function run(state: SittingState, seconds: number, holding = false): SittingState {
  let s = state;
  const ticks = Math.round(seconds / TICK);
  for (let i = 0; i < ticks; i += 1) s = step(s, { type: "tick", delta: TICK, holding });
  return s;
}

function started(): SittingState {
  return step(INITIAL, { type: "start" });
}

describe("the form, when nothing is pressed", () => {
  it("runs the five parts in order and ends", () => {
    const seen: string[] = [];
    let s = started();
    for (let t = 0; t <= TOTAL_SECONDS + 1; t += TICK) {
      if (seen[seen.length - 1] !== s.phase) seen.push(s.phase);
      s = step(s, { type: "tick", delta: TICK, holding: s.phase === "hold" });
    }
    expect(seen).toEqual([...LIMB_ORDER, "done"]);
  });

  it("takes exactly the three minutes the copy prints", () => {
    let s = started();
    s = run(s, SITTING.reading);
    expect(s.phase).toBe("breath");
    s = run(s, SITTING.breath);
    expect(s.phase).toBe("hold");
    s = run(s, SITTING.hold, true);
    expect(s.phase).toBe("stillness");
    s = run(s, SITTING.stillness);
    expect(s.phase).toBe("mark");
    s = run(s, SITTING.mark);
    expect(s.phase).toBe("done");
  });

  it("does nothing before start and after done", () => {
    expect(run(INITIAL, 10)).toEqual(INITIAL);
    const done: SittingState = { phase: "done", into: 0, held: 0 };
    expect(run(done, 10)).toEqual(done);
    expect(step(done, { type: "next" })).toEqual(done);
  });
});

describe("next", () => {
  it("leaves the reading early", () => {
    const s = step(run(started(), 2), { type: "next" });
    expect(s.phase).toBe("breath");
    expect(s.into).toBe(0);
  });

  it("leaves the breath early", () => {
    let s = step(started(), { type: "next" });
    s = step(run(s, 5), { type: "next" });
    expect(s.phase).toBe("hold");
  });

  it("does not move the vow, the stillness or the mark", () => {
    let s = step(step(started(), { type: "next" }), { type: "next" });
    expect(s.phase).toBe("hold");
    expect(step(s, { type: "next" }).phase).toBe("hold");

    s = run(s, SITTING.hold, true);
    expect(s.phase).toBe("stillness");
    expect(step(s, { type: "next" }).phase).toBe("stillness");

    s = run(s, SITTING.stillness);
    expect(s.phase).toBe("mark");
    expect(step(s, { type: "next" }).phase).toBe("mark");
  });
});

describe("the vow waits for the thumb", () => {
  function atVow(): SittingState {
    return step(step(started(), { type: "next" }), { type: "next" });
  }

  it("does not end on the clock", () => {
    const s = run(atVow(), SITTING.hold * 5);
    expect(s.phase).toBe("hold");
    expect(s.held).toBe(0);
  });

  it("ends after eleven unbroken seconds under a thumb", () => {
    let s = run(atVow(), SITTING.hold - 0.5, true);
    expect(s.phase).toBe("hold");
    s = run(s, 0.5, true);
    expect(s.phase).toBe("stillness");
  });

  it("starts the count again when the thumb lifts", () => {
    let s = run(atVow(), SITTING.hold - 1, true);
    expect(s.held).toBeGreaterThan(SITTING.hold - 1.1);
    s = run(s, 0.2, false);
    expect(s.held).toBe(0);
    s = run(s, SITTING.hold - 1, true);
    expect(s.phase).toBe("hold");
    s = run(s, 1, true);
    expect(s.phase).toBe("stillness");
  });
});

describe("the stillness", () => {
  function atStillness(): SittingState {
    const s = step(step(started(), { type: "next" }), { type: "next" });
    return run(s, SITTING.hold, true);
  }

  it("shows its instruction for a moment and then nothing", () => {
    const s = atStillness();
    expect(s.into).toBe(0);
    expect(run(s, STILLNESS_NOTE_SECONDS - 0.1).into).toBeLessThan(STILLNESS_NOTE_SECONDS);
    expect(run(s, STILLNESS_NOTE_SECONDS + 0.1).into).toBeGreaterThan(STILLNESS_NOTE_SECONDS);
  });

  it("lasts its full minute whatever is pressed", () => {
    let s = atStillness();
    s = run(s, 30);
    s = step(s, { type: "next" });
    s = step(s, { type: "start" });
    s = run(s, 29.9, true);
    expect(s.phase).toBe("stillness");
    s = run(s, 0.2);
    expect(s.phase).toBe("mark");
  });
});

describe("the bar across the top", () => {
  it("is empty before the start and full at the end", () => {
    expect(progress(INITIAL)).toEqual([0, 0, 0, 0, 0]);
    expect(progress({ phase: "done", into: 0, held: 0 })).toEqual([1, 1, 1, 1, 1]);
  });

  it("fills the current part with its clock and keeps passed parts full", () => {
    let s = started();
    s = run(s, SITTING.reading / 2);
    expect(progress(s)).toEqual([0.5, 0, 0, 0, 0]);
    s = step(s, { type: "next" });
    expect(progress(s)).toEqual([1, 0, 0, 0, 0]);
  });

  it("fills the vow with the thumb, not the clock", () => {
    let s = step(step(started(), { type: "next" }), { type: "next" });
    s = run(s, 20);
    expect(progress(s)[2]).toBe(0);
    s = run(s, SITTING.hold / 2, true);
    expect(progress(s)[2]).toBeCloseTo(0.5, 1);
  });

  it("numbers the parts one to five", () => {
    expect(partNumber("ready")).toBe(0);
    expect(partNumber("reading")).toBe(1);
    expect(partNumber("stillness")).toBe(4);
    expect(partNumber("done")).toBe(5);
  });
});

describe("retry", () => {
  it("returns to the beginning", () => {
    const s = run(started(), 40);
    expect(step(s, { type: "retry" })).toEqual(INITIAL);
  });
});
