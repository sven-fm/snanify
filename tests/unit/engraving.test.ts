import { describe, expect, it } from "vitest";
import { engrave, strokeOpacity, strokeWidth } from "@/lib/engraving";

const SEED = "4d5e3569e33055ac9f1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f6071";
const OTHER = "9f1b2c3d4e5f60714d5e3569e33055ac0a1b2c3d4e5f60718293a4b5c6d7e8f9";

describe("engrave", () => {
  it("draws the same river twice for the same seed", () => {
    const a = engrave({ seed: SEED, percentile: 74 });
    const b = engrave({ seed: SEED, percentile: 74 });
    expect(a.lines).toEqual(b.lines);
  });

  it("draws a different river for a different seed", () => {
    const a = engrave({ seed: SEED, percentile: 74 });
    const b = engrave({ seed: OTHER, percentile: 74 });
    expect(a.lines).not.toEqual(b.lines);
  });

  it("draws a river in spate denser than a slack one", () => {
    const slack = engrave({ seed: SEED, percentile: 5 });
    const spate = engrave({ seed: SEED, percentile: 95 });
    expect(spate.lines.length).toBeGreaterThan(slack.lines.length);
  });

  it("stands on the middle of the range when there is no percentile", () => {
    const median = engrave({ seed: SEED, percentile: null });
    const fifty = engrave({ seed: SEED, percentile: 50 });
    expect(median.lines).toEqual(fifty.lines);
  });

  it("rounds every coordinate, so the same path serialises identically everywhere", () => {
    /* A raw float writes as 56.69872981077808 in one runtime and
       56.698729810778076 in another. On a sheet that is a different image; in
       React it is a hydration mismatch. */
    for (const line of engrave({ seed: SEED, percentile: 74 }).lines) {
      for (const n of line.match(/-?\d+\.?\d*/g) ?? []) {
        expect(n).toMatch(/^-?\d+(\.\d{1,2})?$/);
      }
    }
  });

  it("keeps every line inside the band it is drawn in", () => {
    const { lines, height, width } = engrave({ seed: SEED, percentile: 100 });
    for (const line of lines) {
      const points = line.slice(2).split(" L ");
      for (const point of points) {
        const [x, y] = point.split(" ").map(Number);
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThanOrEqual(width);
        expect(y).toBeGreaterThan(-height);
        expect(y).toBeLessThan(height * 2);
      }
    }
  });

  it("survives a seed of all zeroes rather than drawing one flat line", () => {
    const flat = engrave({ seed: "0".repeat(64), percentile: 50 });
    expect(new Set(flat.lines).size).toBe(flat.lines.length);
  });

  it("gives the front lines more weight and more ink than the back", () => {
    expect(strokeWidth(30, 31)).toBeGreaterThan(strokeWidth(0, 31));
    expect(strokeOpacity(30, 31)).toBeGreaterThan(strokeOpacity(0, 31));
  });
});
