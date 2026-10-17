import { describe, expect, it } from "vitest";
import { horizonSun, sunPath, waveRows } from "@/lib/river-geometry";

describe("river geometry", () => {
  const rows = waveRows({ width: 390, height: 150, rows: 11 });
  it("bunches rows toward the horizon", () => {
    const gaps = rows.slice(1).map((r, i) => r.y - rows[i].y);
    gaps.slice(1).forEach((g, i) => expect(g).toBeGreaterThan(gaps[i]));
  });
  it("rounds every coordinate to two places", () => {
    for (const r of rows)
      for (const n of r.points.split(/[ ,]/)) expect(n).toMatch(/^-?\d+(\.\d{1,2})?$/);
  });
  it("runs the sun's path from under the sun toward the front, widening", () => {
    const dashes = sunPath(rows, { sunX: 300, width: 390 });
    const first = dashes[0], last = dashes[dashes.length - 1];
    expect(Math.abs(first.x + first.w / 2 - 300)).toBeLessThan(8);
    expect(last.x).toBeLessThan(first.x);
    expect(last.w * 3).toBeGreaterThan(first.w);
  });
  it("centres each dash on its wave line", () => {
    const dashes = sunPath(rows, { sunX: 300, width: 390 });
    for (const d of dashes) {
      const centre = d.y + d.h / 2;
      expect(rows.some((r) => Math.abs(r.y - centre) <= 0.01)).toBe(true);
    }
    expect(dashes[dashes.length - 1].y).toBeLessThan(rows[rows.length - 1].y);
  });
  it("cuts the sun at the horizon", () => {
    const s = horizonSun({ cx: 300, horizonY: 6, r: 20 });
    expect(s.cy).toBeLessThan(6);
    expect(s.cy + s.r).toBeGreaterThan(6);
    expect(s.clipBelow).toBe(6);
  });
});
