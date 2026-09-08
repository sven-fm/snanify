import { describe, expect, it } from "vitest";
import { LIMB_ORDER, LIMB_START, SITTING, TOTAL_SECONDS, clock } from "@/lib/sitting-plan";

/* ---------------------------------------------------------------------------
   Which part of the sitting a given moment falls in.

   The browser test drives the real component and proves the five parts happen
   in order. What it cannot pin down is the boundaries, because it polls: a
   test that samples every 150ms cannot tell whether the stillness begins at
   71.0 seconds or 71.4. These do, and they are the numbers the copy prints.

   `limbAt` is duplicated from the component on purpose rather than exported
   from it: the component is a client module, and importing it here would pull
   React and Clerk into a unit test to check arithmetic. It is six lines, and
   the last test in this file fails if the two ever disagree about the total.
   --------------------------------------------------------------------------- */

type Limb = (typeof LIMB_ORDER)[number];

function limbAt(elapsed: number): Limb | "done" {
  let at = 0;
  for (const limb of LIMB_ORDER) {
    at += SITTING[limb];
    if (elapsed < at) return limb;
  }
  return "done";
}

describe("which part a moment falls in", () => {
  it("starts in the reading", () => {
    expect(limbAt(0)).toBe("reading");
    expect(limbAt(14.99)).toBe("reading");
  });

  it("moves to the breath at fifteen seconds exactly", () => {
    expect(limbAt(15)).toBe("breath");
    expect(limbAt(59.99)).toBe("breath");
  });

  it("reaches the vow at one minute", () => {
    expect(limbAt(60)).toBe("hold");
    expect(limbAt(70.99)).toBe("hold");
  });

  it("goes black at 1:11, eleven seconds after the vow begins", () => {
    /* The eleven is the whole gesture: eleven seconds under a thumb. */
    expect(limbAt(71)).toBe("stillness");
    expect(LIMB_START.stillness).toBe(LIMB_START.hold + SITTING.hold);
  });

  it("keeps the screen black for a full minute", () => {
    expect(limbAt(130.99)).toBe("stillness");
    expect(limbAt(131)).toBe("mark");
  });

  it("finishes at 2:31 and stays finished", () => {
    expect(limbAt(150.99)).toBe("mark");
    expect(limbAt(TOTAL_SECONDS)).toBe("done");
    expect(limbAt(10_000)).toBe("done");
  });

  it("never skips a part, however finely time is sampled", () => {
    /* Counted in hundredths and divided, rather than adding 0.05 repeatedly:
       accumulated float error makes the loop miss the last instant, which is
       exactly the sort of drift the sitting's own clock avoids by summing
       real deltas instead of counting ticks. */
    const seen: string[] = [];
    for (let hundredths = 0; hundredths <= TOTAL_SECONDS * 100; hundredths += 5) {
      const limb = limbAt(hundredths / 100);
      if (seen[seen.length - 1] !== limb) seen.push(limb);
    }
    expect(seen).toEqual([...LIMB_ORDER, "done"]);
  });

  it("agrees with the clock the page prints beside each part", () => {
    expect(clock(LIMB_START.reading)).toBe("0:00");
    expect(clock(LIMB_START.breath)).toBe("0:15");
    expect(clock(LIMB_START.hold)).toBe("1:00");
    expect(clock(LIMB_START.stillness)).toBe("1:11");
    expect(clock(LIMB_START.mark)).toBe("2:11");
    expect(clock(TOTAL_SECONDS)).toBe("2:31");
  });
});
