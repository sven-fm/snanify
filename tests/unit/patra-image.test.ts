import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { mementoSvg, patraCardSvg, patraSvg, renderPatraFor } from "@/lib/patra-image";
import { mementoSvgV2, patraCardSvgV2, patraSvgV2, renderPatraV2 } from "@/lib/patra-image-v2";
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

  /* The golden hashes were computed from src/lib/patra-image.ts at 5af80e5,
     the last commit before v3, on OLD_ROW, in a throwaway worktree of that
     commit. An old sheet is a record: v2 must redraw it byte for byte. The
     "plate" hashes blank the ghat picture's PNG bytes (sharp's encoder may
     differ by platform) and pin everything this code decides: layout, fonts,
     colours. The full hashes, plate bytes and raster included, are pinned on
     the machine they were computed on. */
  const sha = (b: string | Buffer) => createHash("sha256").update(b).digest("hex");
  const plateless = (s: string) => s.replace(/data:image\/png;base64,[A-Za-z0-9+/=]+/g, "data:plate");
  const GOLDEN = {
    memento: "cb8c338793a90f638366661073af43eb308fbfd9c68625d61680b02b05523104",
    sheet: "0aa077579e9ee9a9d4d447db9b161bdba5ce2bd52deb95ac2d6b973199d5f683",
    card: "148634e84097cd5d9b16c54105a3c6d95cc3389dd77f4510b9636717cd6d37f3",
    mementoFull: "1487effbd789fc0c2b3a921f7d4a0a16e17e727599a667a504801e82206f40e0",
    png: "f426ef24857c21e304e25c0a4cde5f5bff274ac8cb927c54a65620d574422ed9",
  };

  it("redraws an old sitting through v2 exactly as 5af80e5 drew it", async () => {
    const v = patraView(OLD_ROW);
    expect(sha(plateless(await mementoSvgV2(v)))).toBe(GOLDEN.memento);
    expect(sha(plateless(await patraSvgV2(v)))).toBe(GOLDEN.sheet);
    expect(sha(await patraCardSvgV2(v))).toBe(GOLDEN.card);
  });

  it.runIf(process.platform === "darwin")("pins the old sitting's full SVG and PNG bytes", async () => {
    const v = patraView(OLD_ROW);
    expect(sha(await mementoSvgV2(v))).toBe(GOLDEN.mementoFull);
    expect(sha(await renderPatraV2(v))).toBe(GOLDEN.png);
    expect(sha(await renderPatraFor({ ...OLD_ROW, imageVersion: null }))).toBe(GOLDEN.png);
  });

  it("routes a row with no image version to v2", async () => {
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

describe("the memento with five very long names", () => {
  const LONG = Array.from({ length: 5 }, (_, i) => `${"Venkataraghavan Subrahmanyam ".repeat(2)}${i}`.padEnd(60, "x").slice(0, 60));

  /* Each format's river box ends at H - 120, over the foot, and keeps a floor
     of 160 (memento) or 100 (sheet); nothing above may push it shorter. */
  for (const [name, render, H, floor] of [
    ["memento", mementoSvg, 1920, 160],
    ["sheet", patraSvg, 1350, 100],
  ] as const) {
    it(`keeps the ${name}'s river above its foot, prayer or none`, async () => {
      for (const prayer of [SPECIMEN_VIEW.prayer, null]) {
        const s = await render({ ...SPECIMEN_VIEW, names: LONG, prayer });
        const riverTop = Number(s.match(/data-river="" transform="translate\(0 ([\d.]+)\)"/)![1]);
        expect(riverTop).toBeLessThanOrEqual(H - 120 - floor);
        expect(s.match(/data-name-line=/g)!.length).toBeGreaterThanOrEqual(5);
      }
    });
  }

  it("steps the names down a tier rather than overlap", async () => {
    const s = await mementoSvg({ ...SPECIMEN_VIEW, names: LONG });
    const tiers = new Set([...s.matchAll(/data-name-line="(\d+)"/g)].map((m) => Number(m[1])));
    expect(Math.max(...tiers)).toBeLessThan(56);
  });
});
