import { describe, expect, it } from "vitest";
import { gaugeModel } from "@/lib/gauge";
import { bandFor } from "@/lib/riverdata";
import { flowContent } from "@/content/flow";

describe("gaugeModel", () => {
  it("cuts the strip at the band edges", () => {
    expect(gaugeModel(50).segments.map((s) => [s.from, s.to])).toEqual([
      [0, 0.1],
      [0.1, 0.3],
      [0.3, 0.7],
      [0.7, 0.9],
      [0.9, 1],
    ]);
  });
  it("puts today at its percentile and names the band", () => {
    expect(gaugeModel(86)).toMatchObject({ dot: 0.86, band: "full" });
    expect(gaugeModel(0).dot).toBe(0);
    expect(gaugeModel(100).dot).toBe(1);
  });
  it("clamps out-of-range percentiles", () => {
    expect(gaugeModel(-5).dot).toBe(0);
    expect(gaugeModel(140).dot).toBe(1);
  });
  it("agrees with bandFor", () => {
    for (const p of [0, 9.9, 10, 29, 30, 69, 70, 89, 90, 100]) {
      expect(gaugeModel(p).band).toBe(bandFor(p));
    }
  });
  it("shows no dot when the feed is quiet", () => {
    expect(gaugeModel(null)).toMatchObject({ dot: null, band: null });
    expect(gaugeModel(null).segments).toHaveLength(5);
  });
});

describe("plain river words", () => {
  it("says 'for this time of year' in every English plain line", () => {
    for (const line of Object.values(flowContent.en.plain)) expect(line).toMatch(/for this time of year\.$/);
    expect(flowContent.en.plain.full).toBe("Fuller than usual for this time of year.");
  });
  it("has a Hindi line for every band", () => {
    expect(Object.keys(flowContent.hi.plain)).toEqual(Object.keys(flowContent.en.plain));
    for (const line of Object.values(flowContent.hi.plain)) expect(line).toMatch(/^इस समय के हिसाब से .*।$/);
  });
});
