import { describe, expect, it } from "vitest";
import { BREATH, SITTING } from "@/lib/sitting-plan";
import { IN, OUT, breathCount, fadeAway, stillCount } from "@/lib/countdown";

/* The breath counts 4..1 in and 6..1 out, the stillness its minute, and every
   number and its fade come from the sitting's one clock. */

describe("the breath's countdown", () => {
  it("counts 4, 3, 2, 1 on the way in", () => {
    expect([0, 1, 2, 3].map((s) => breathCount(s + 0.5))).toEqual(
      [4, 3, 2, 1].map((n) => ({ rising: true, n, frac: 0.5 })),
    );
  });

  it("counts 6 down to 1 on the way out", () => {
    expect([4, 5, 6, 7, 8, 9].map((s) => breathCount(s + 0.25).n)).toEqual([6, 5, 4, 3, 2, 1]);
    expect(breathCount(4).rising).toBe(false);
  });

  it("starts over every ten seconds, for the whole breath", () => {
    const cycle = BREATH.in + BREATH.out;
    for (let s = 0; s < SITTING.breath; s += 0.5) {
      expect(breathCount(s)).toEqual(breathCount(s % cycle));
    }
    expect(breathCount(10)).toEqual({ rising: true, n: 4, frac: 0 });
  });

  it("turns at the whole second even when the summed frames land a hair short", () => {
    expect(breathCount(3.9999999).rising).toBe(false);
    expect(breathCount(3.9999999).n).toBe(6);
    expect(breathCount(0.9999999).n).toBe(3);
  });

  it("turns with the river's swell, which peaks at 40% of the cycle", () => {
    /* `breathe` rises from 0% to 40% of its ten seconds: the four seconds in. */
    expect(BREATH.in / (BREATH.in + BREATH.out)).toBe(0.4);
  });

  it("fades each number away across its second", () => {
    expect(fadeAway(0)).toBe(1);
    expect(fadeAway(0.5)).toBe(0.75);
    expect(fadeAway(0.999)).toBeLessThan(0.01);
    for (let f = 0; f < 1; f += 0.1) expect(fadeAway(f)).toBeGreaterThanOrEqual(fadeAway(f + 0.1));
  });
});

describe("the stillness's countdown", () => {
  const L = SITTING.stillness;

  it("shows the seconds left, rounded up, the way the machine counts them", () => {
    expect(stillCount(L, 0).now).toBe(60);
    expect(stillCount(L, 0.5).now).toBe(60);
    expect(stillCount(L, 1).now).toBe(59);
    expect(stillCount(L, 59.5).now).toBe(1);
    expect(stillCount(L, 60).now).toBe(0);
  });

  it("holds each number for most of its second, then cross-fades to the next", () => {
    expect(stillCount(L, 10)).toEqual({ now: 50, next: 49, nowOpacity: 1, nextOpacity: 0 });
    expect(stillCount(L, 10 + OUT[0] - 0.01).nowOpacity).toBe(1);
    expect(stillCount(L, 10 + IN[0] - 0.01).nextOpacity).toBe(0);
    const mid = stillCount(L, 10.7);
    expect(mid.nowOpacity).toBeCloseTo(0.25, 2);
    expect(mid.nextOpacity).toBeCloseTo(0.25, 2);
    expect(stillCount(L, 10.99).nextOpacity).toBeGreaterThan(0.95);
  });

  it("never sets both numbers at half strength or more, and never blanks the screen before the last", () => {
    for (let s = 0; s < L - 1; s += 0.05) {
      const c = stillCount(L, s);
      expect(Math.min(c.nowOpacity, c.nextOpacity)).toBeLessThanOrEqual(0.5);
      expect(Math.max(c.nowOpacity, c.nextOpacity)).toBeGreaterThanOrEqual(0.25);
    }
  });

  it("lands each new number at full strength as its second begins", () => {
    const c = stillCount(L, 20.9999999);
    expect(c.now).toBe(39);
    expect(c.nowOpacity).toBe(1);
  });

  it("fades the last number out on its own", () => {
    expect(stillCount(L, 59.1)).toEqual({ now: 1, next: null, nowOpacity: 1, nextOpacity: 0 });
    expect(stillCount(L, 59.6).nowOpacity).toBeCloseTo(0.5, 2);
    expect(stillCount(L, 59.9).nowOpacity).toBe(0);
    expect(stillCount(L, 60).nowOpacity).toBe(0);
  });
});
