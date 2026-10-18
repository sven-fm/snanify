import { describe, expect, it } from "vitest";
import { siteCardSvg } from "@/lib/site-card";
import { wordmarkSvg } from "@/lib/wordmark-svg";
import { typeset } from "@/lib/typeset";
import { PALETTE } from "@/lib/palette";
import { LANGS } from "@/lib/locales";

/* The link card's wordmark is the site's (spec 6.9): one weight, Eczar 800,
   the dotless i with the sindoor bindu as its dot. */

const ink = PALETTE.day.ink;
const bindu = PALETTE.day.sindoor;

describe("the link card's wordmark", () => {
  it("is the one-weight wordmark with the bindu, in both editions", async () => {
    const mark = await wordmarkSvg({ size: 44, x: 136, y: 84, ink, bindu });
    for (const lang of LANGS) {
      const svg = await siteCardSvg(lang);
      expect(svg).toContain(mark.svg);
      expect(svg.match(/data-bindu/g)).toHaveLength(1);
    }
  });

  it("sets the dotless i in 800, and never the old 700 'ify'", async () => {
    const mark = await wordmarkSvg({ size: 44, x: 136, y: 84, ink, bindu });
    const snan = await typeset("Snan", { size: 44, x: 136, y: 84, weight: 800, fill: ink, tracking: -0.015 });
    const dotless = await typeset("ı", { size: 44, x: 136 + snan.width, y: 84, weight: 800, fill: ink, tracking: -0.015 });
    expect(mark.svg).toContain(dotless.svg);
    const oldRoot = await typeset("Snan", { size: 44, x: 136, y: 84, weight: 800, fill: ink });
    const oldTail = await typeset("ify", { size: 44, x: 136 + oldRoot.width, y: 84, weight: 700, fill: ink });
    expect((await siteCardSvg("en")).includes(oldTail.svg)).toBe(false);
  });

  it("puts the bindu over the i, its foot 0.543em above the baseline", async () => {
    const mark = await wordmarkSvg({ size: 100, x: 0, y: 100, ink, bindu });
    const [, cx, cy, r] = mark.svg.match(/cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)"/)!.map(Number);
    const head = await typeset("Snan", { size: 100, x: 0, y: 100, weight: 800, tracking: -0.015 });
    const i = await typeset("ı", { size: 100, x: 0, y: 100, weight: 800, tracking: -0.015 });
    expect(cx).toBeGreaterThan(head.width);
    expect(cx).toBeLessThan(head.width + i.width);
    expect(cy + r).toBeCloseTo(100 - 54.3, 1);
  });
});
