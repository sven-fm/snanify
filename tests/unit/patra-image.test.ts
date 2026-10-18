import { describe, expect, it } from "vitest";
import { mementoSvg, patraCardSvg, patraSvg, renderPatraFor } from "@/lib/patra-image";
import { renderPatraV2 } from "@/lib/patra-image-v2";
import { patraView, type PatraView } from "@/lib/patra-view";
import { FIVE_LONG, OLD_ROW, PORTRAIT, SPECIMEN_VIEW } from "./helpers/patra";

const svg = (v: Partial<PatraView>) => mementoSvg({ ...SPECIMEN_VIEW, ...v });

describe("the Sankalp Patra image, v3", () => {
  it("sets names one per line at 84/68/56", async () => {
    expect((await svg({ names: ["A B", "C D"] })).match(/data-name-line="84"/g)).toHaveLength(2);
    expect((await svg({ names: ["A", "B", "C"] })).match(/data-name-line="68"/g)).toHaveLength(3);
    expect((await svg({ names: FIVE_LONG })).match(/data-name-line="56"/g)!.length).toBeGreaterThanOrEqual(5);
  });

  it("keeps every name line inside the 1080 column", async () => {
    for (const m of (await svg({ names: FIVE_LONG })).matchAll(/data-right="([\d.]+)"/g)) expect(+m[1]).toBeLessThanOrEqual(1080 - 64);
  });

  it("stamps the badge from the second morning, at the photo's top right", async () => {
    expect(await svg({ morning: 1 })).not.toContain("data-morning");
    expect(await svg({ morning: 7, portraitUrl: PORTRAIT })).toContain('data-morning="7"');
  });

  it("never carries a band, label, pack count or the sankalp", async () => {
    const s = await svg({ morning: 7 });
    expect(s).not.toMatch(/data-band|data-label|of 11/);
  });

  it("draws the gauge without a dot when the feed is quiet", async () => {
    expect(await svg({ percentile: null, figureKind: "normal" })).not.toContain("data-today");
  });

  it("keeps the link card free of a face and a badge", async () => {
    const c = await patraCardSvg({ ...SPECIMEN_VIEW, morning: 7, portraitUrl: PORTRAIT });
    expect(c).not.toMatch(/data-morning|data-portrait/);
  });

  it("still renders an old sitting through v2, unchanged", async () => {
    expect(await renderPatraFor({ ...OLD_ROW, imageVersion: null })).toEqual(await renderPatraV2(patraView(OLD_ROW)));
  });

  it("pins the portrait and the badge on the memento, and draws today's dot", async () => {
    const s = await svg({ morning: 7, portraitUrl: PORTRAIT });
    expect(s).toContain("data-portrait");
    expect(s).toContain("data-today");
  });

  it("adapts the same layout to the four by five sheet", async () => {
    const s = await patraSvg({ ...SPECIMEN_VIEW, names: FIVE_LONG, morning: 7, portraitUrl: PORTRAIT });
    expect(s).toContain('height="1350"');
    expect(s.match(/data-name-line="56"/g)!.length).toBeGreaterThanOrEqual(5);
    expect(s).toContain('data-morning="7"');
  });
});
