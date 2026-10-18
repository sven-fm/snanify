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

/* ---------------------------------------------------------------------------
   The snan in v3 (spec 6.4, 7.2): its words, and each part as it renders.

   The parts are rendered from a given machine state with the clock stopped
   (speed 0), the way the screenshots are taken. The router and the server
   action are stubbed: neither is reached by a first render.
   --------------------------------------------------------------------------- */

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { vi } from "vitest";
import { todayContent } from "@/content/today";
import type { SittingState } from "@/lib/sitting-machine";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: () => {} }) }));
vi.mock("@/app/[lang]/(app)/today/actions", () => ({ keepThisMorning: async () => ({ id: null }) }));

const { Sitting } = await import("@/components/snan/Sitting");

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (value && typeof value === "object") for (const v of Object.values(value)) strings(v, out);
  return out;
}

function part(phase: SittingState["phase"], into = 0, lang: "en" | "hi" = "en") {
  return renderToStaticMarkup(
    React.createElement(Sitting, {
      lang,
      t: todayContent[lang],
      reading: {
        water: "Ganga",
        ghat: "Har Ki Pauri",
        city: "Haridwar",
        percentile: 86,
        band: "full",
        figure: "797 m³/s, 86th percentile since 1997",
        distance: "5,760 km",
      },
      sankalp: "For my mother, every morning this month.",
      names: ["Anjali Sharma", "Vikram Sharma"],
      waterSlug: "ganga-haridwar",
      outHref: "/begin?out=1",
      leaveHref: "/account",
      speed: 0,
      start: { phase, into, held: 0 },
    }),
  );
}

describe("the snan's words (spec 7.2)", () => {
  const en = todayContent.en;

  it("reads as the spec's table", () => {
    expect(en.begin.ready).toBe("Your {river}, this morning.");
    expect(en.begin.band).toBe("Three minutes. Phone on silent.");
    expect(en.stillness.line).toBe("Be still with the river.");
    expect(en.mark.done).toBe("Snan done.");
    expect(en.mark.after).toBe("Your family will want to see this.");
    expect(en.mark.cta).toBe("Send it to the family");
  });

  it("counts no pack, in either edition", () => {
    for (const lang of ["en", "hi"] as const) {
      for (const s of strings(todayContent[lang])) expect(s).not.toMatch(/of 1[1]|\bpack\b/i);
    }
  });
});

describe("the snan's parts (spec 6.4)", () => {
  it("ready: the capitals line with the river in sindoor, the band, the river, the press", () => {
    const out = part("ready");
    expect(out).toContain("Three minutes. Phone on silent.");
    expect(out).toMatch(/text-sindoor[^>]*>Ganga</);
    expect(out).toContain("this morning.");
    expect(out).toContain("press");
    expect(out).toContain("Begin");
    expect(out).toContain("flow-line");
  });

  it("the reading: the gauge and the figure row, without the old table", () => {
    const out = part("reading", 3);
    expect(out).toContain("data-today");
    expect(out).toContain("797 m³/s, 86th percentile since 1997");
    expect(out).toContain("Running full");
    expect(out).toMatch(/text-sindoor[^>]*>Ganga</);
    expect(out).not.toContain("Seasonal median");
  });

  it("the breath: the river breathes at the river's own amplitude, Out in teal", () => {
    const out = part("breath", 5);
    expect(out).toContain("breathe-waves");
    expect(out).toContain("--breathe-high:1.25");
    expect(out).toMatch(/text-teal[^>]*>Out</);
  });

  it("the breath of a thin river rises less than one in spate", () => {
    const thin = renderToStaticMarkup(
      React.createElement(Sitting, {
        lang: "en",
        t: todayContent.en,
        reading: { water: "Ganga", ghat: "", city: "", percentile: 4, band: "slack", figure: "", distance: null },
        sankalp: "",
        names: [],
        waterSlug: "ganga-haridwar",
        outHref: "/begin?out=1",
        leaveHref: "/account",
        speed: 0,
        start: { phase: "breath", into: 1, held: 0 },
      }),
    );
    expect(thin).toContain("--breathe-high:1.1");
  });

  it("the sankalp: a paper press that fills with sindoor, with no diya", () => {
    const out = part("hold");
    expect(out).toContain("For my mother, every morning this month.");
    expect(out).toContain("Anjali Sharma, Vikram Sharma");
    expect(out).toContain("press");
    expect(out).toContain("data-ink");
    expect(out).not.toContain("hold-box");
    expect(out).not.toContain("flicker");
  });

  it("the stillness: near black, the night river, the line", () => {
    const out = part("stillness", 12);
    expect(out).toContain("#0b0a08");
    expect(out).toContain("#16404a");
    expect(out).toContain("Be still with the river.");
    expect(out).toContain("data-next");
  });

  it("the mark: Snan done. in capitals, the line writing, no petals, no count", () => {
    const out = part("mark", 2);
    expect(out).toContain("Snan done.");
    expect(out).toContain("uppercase");
    expect(out).not.toContain("petal");
    expect(out).not.toMatch(/of 11|mornings left/i);
  });

  it("the Hindi mark is short", () => {
    expect(part("mark", 2, "hi")).toContain("स्नान हो गया।");
  });
});
