import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PALETTE } from "@/lib/palette";
import * as River from "@/components/RiverFlow";
import { WaterBand } from "@/components/WaterBand";

const source = readFileSync("src/components/RiverFlow.tsx", "utf8");
const landing = readFileSync("src/components/Landing.tsx", "utf8");
const html = (node: React.ReactNode) => renderToStaticMarkup(React.createElement(React.Fragment, null, node));

describe("RiverFlow in the palette", () => {
  it("names its inks from the palette: teal ripples, marigold glitter, sindoor sun", () => {
    expect(River.RIVER_INK).toEqual({ ripples: "teal", glitter: "marigold", sun: "sindoor" });
    for (const key of Object.values(River.RIVER_INK)) expect(PALETTE.day[key]).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("strokes the water teal and the glitter marigold, and never haldi", () => {
    const out = html(React.createElement(River.RiverFlow));
    expect(out).toContain('stroke="var(--teal)"');
    expect(out).toContain('stroke="var(--marigold)"');
    expect(out).toContain('fill="var(--sindoor)"');
    expect(out).not.toContain("haldi");
  });

  it("carries no petals", () => {
    expect(source).not.toMatch(/petal/i);
    expect(html(React.createElement(River.RiverFlow))).not.toMatch(/petal/i);
  });

  it("keeps the true-perspective engine: the 1/d projection and the trapezoid glitter", () => {
    expect(source).toMatch(/g\.horizon \+ g\.c \/ d/);
    expect(source).toContain("<polygon");
  });

  it("sits the sun on the horizon through horizonSun, its lower part cut by the water", () => {
    expect(source).toContain("horizonSun(");
    const s = River.placeSun({ sunX: 300, horizon: 120, sunR: 30 });
    expect(s.clipBelow).toBe(120);
    expect(s.cy).toBeLessThan(120);
    expect(s.cy + s.r).toBeGreaterThan(120);
  });

  it("keeps the whole dome under the top edge of a short sky", () => {
    const s = River.placeSun({ sunX: 300, horizon: 27, sunR: 40 });
    expect(s.cy - s.r).toBeGreaterThanOrEqual(0);
    expect(s.clipBelow).toBe(27);
  });

  it("no longer reads the headline's float", () => {
    expect(source).not.toMatch(/shape-outside|shapeOutside|sunAnchor/);
    expect(landing).not.toMatch(/shapeOutside|data-sun-anchor|sunAnchorSelector|petals/);
  });
});

describe("WaterBand is the strip", () => {
  it("renders the teal strip for a page band", () => {
    const out = html(WaterBand({ seed: "faq", className: "mt-8 h-14 w-full" }));
    expect(out).toContain("var(--teal)");
    expect(out).toContain("mt-8 h-14 w-full");
  });
});
