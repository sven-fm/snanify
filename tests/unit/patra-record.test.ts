import { describe, expect, it } from "vitest";
import { riverSlice, seedDay, seedFigure, skySlice } from "@/lib/patra-record";
import type { WaterState } from "@/lib/riverdata";
import type { SkyReading } from "@/lib/sky";

/* A water in the modelled arm: the flood model published a figure for today. */
function modelled(over: Record<string, unknown> = {}): WaterState {
  return {
    slug: "godavari-nashik",
    gauge: {
      slug: "godavari-nashik",
      ghat: [19.9975, 73.7898],
      elevationM: 584,
      cell: [19.925, 73.875],
      cellOffsetKm: 11.2,
    },
    discharge: {
      kind: "modelled",
      cumecs: 103.2349999,
      modelledFor: "2026-09-08",
      ageDays: 0,
      stale: false,
      percentile: { value: 73.6, capped: null, band: "full" },
      trend: "rising",
      deltaPct: 12,
      normal: { p10: 20, median: 82.4712, p90: 300 },
      series: [],
      ...(over.discharge as object),
    },
    sky: { kind: "observed", sunrise: "2026-09-08T06:20", sunset: "2026-09-08T18:44" },
    windows: [],
    current: null,
    next: null,
  } as unknown as WaterState;
}

/** The same water when the feed was quiet and the median stands in. */
function normal(): WaterState {
  return {
    ...modelled(),
    discharge: {
      kind: "normal",
      cumecs: 82.4712,
      normal: { p10: 20, median: 82.4712, p90: 300 },
      forDate: "2026-09-08",
    },
  } as unknown as WaterState;
}

const sky = {
  tithi: { name: { en: "Dwadashi", hi: "द्वादशी" }, paksha: "krishna", index: 27 },
  nakshatra: { nakshatra: { name: { en: "Pushya", hi: "पुष्य" } }, pada: 2, boundary: "settled" },
  phase: { name: "waning-crescent", illumination: 0.134 },
} as unknown as SkyReading;

describe("riverSlice", () => {
  it("keeps the figure at two decimals, which is what the sheet prints", () => {
    /* The seed is computed from the printed figure, so if the slice kept the
       raw float the reader could never reproduce the hash. */
    expect(riverSlice(modelled()).cumecs).toBe(103.23);
    expect(riverSlice(modelled()).median).toBe(82.47);
  });

  it("carries the provenance the sheet has to print", () => {
    const slice = riverSlice(modelled());
    expect(slice.kind).toBe("modelled");
    expect(slice.modelledFor).toBe("2026-09-08");
    expect(slice.percentile).toBe(74);
    expect(slice.band).toBe("full");
    expect(slice.source).toContain("Copernicus");
    expect(slice.cell).toEqual([19.925, 73.875]);
  });

  it("says so when it is standing on the seasonal median rather than a model day", () => {
    const slice = riverSlice(normal());
    expect(slice.kind).toBe("normal");
    expect(slice.modelledFor).toBeNull();
    expect(slice.percentile).toBeNull();
    expect(slice.median).toBe(82.47);
  });

  it("never invents a percentile for a figure nobody modelled", () => {
    expect(riverSlice(normal()).percentile).toBeNull();
  });
});

describe("skySlice", () => {
  it("composes what the sheet prints from the reading", () => {
    const slice = skySlice(sky, modelled());
    expect(slice.tithi).toBe("Dwadashi");
    expect(slice.paksha).toBe("krishna");
    expect(slice.nakshatra).toBe("Pushya");
    expect(slice.nakshatraPada).toBe(2);
    expect(slice.moonPct).toBe(13);
    expect(slice.sunrise).toBe("2026-09-08T06:20");
  });
});

describe("what the seed stands on", () => {
  it("hashes the figure the sheet shows, whichever arm it came from", () => {
    expect(seedFigure(riverSlice(modelled()))).toBe(103.23);
    expect(seedFigure(riverSlice(normal()))).toBe(82.47);
  });

  it("keys to the model day when there is one", () => {
    expect(seedDay(riverSlice(modelled()), "2026-09-07")).toBe("2026-09-08");
  });

  it("keys to the morning's own date when the feed was quiet", () => {
    /* Otherwise a sheet standing on the median would have no day in its seed
       and every such sheet for one water would hash alike. */
    expect(seedDay(riverSlice(normal()), "2026-09-07")).toBe("2026-09-07");
  });
});
