import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { buttonClass } from "@/components/ui";
import { Band, Gauge, Label, RiverHorizon, RiverStrip, Seal } from "@/components/kit";
import { PRICE } from "@/content/prices";

const css = readFileSync("src/app/globals.css", "utf8");
const html = (node: React.ReactNode) => renderToStaticMarkup(React.createElement(React.Fragment, null, node));

describe("the kit", () => {
  it("the press sinks: a .press with 6 wall steps", () => {
    expect(buttonClass()).toContain("press");
    expect(css).toMatch(/\.press\s*\{[^}]*6px 6px 0 var\(--wall\)/);
    expect(css).toMatch(/\.press:active\s*\{[^}]*translate\(6px,\s*6px\)/);
  });

  it("the share press is marigold, the quiet one is a link", () => {
    expect(buttonClass("share")).toContain("press-share");
    expect(buttonClass("quiet")).not.toMatch(/\bpress\b/);
    expect(css).toMatch(/\.press-share\s*\{[^}]*var\(--marigold\)/);
    expect(css).toMatch(/\.press-choice\s*\{[^}]*3px 3px 0 var\(--wall\)/);
  });

  it("the morning seal waits for the second morning", () => {
    expect(html(Seal({ kind: "morning", n: 1, lang: "en" }))).toBe("");
    expect(html(Seal({ kind: "morning", n: 7, lang: "en" }))).toContain("7th morning");
    expect(html(Seal({ kind: "morning", n: 7, lang: "hi" }))).toContain("सातवीं सुबह");
  });

  it("the price seal carries every currency for the head script to pick", () => {
    const out = html(Seal({ kind: "price", prices: PRICE.eleven, lang: "en" }));
    expect(out).toContain("cur-EUR");
    expect(out).toContain("€11");
    expect(out).toContain("rotate(-8deg)");
  });

  it("the gauge draws no dot when the feed is quiet", () => {
    expect(html(Gauge({ percentile: null, band: null, lang: "en" }))).not.toContain("data-today");
  });

  it("the gauge puts today at its percentile, over five fills", () => {
    const out = html(Gauge({ percentile: 86, band: "full", lang: "en", figure: "797 m³/s" }));
    expect(out).toContain("data-today");
    expect(out).toContain("left:86.00%");
    for (let i = 1; i <= 5; i++) expect(out).toContain(`var(--gauge-${i})`);
    for (const w of ["Thin", "Usual", "In spate", "797 m³/s"]) expect(out).toContain(w);
  });

  it("the strip carries no marigold", () => {
    expect(html(RiverStrip({}))).not.toMatch(/f2c230|marigold/i);
  });

  it("the full river cuts the sun and lays a marigold path", () => {
    const out = html(React.createElement(RiverHorizon, { height: 150, sun: true }));
    expect(out).toContain("var(--sindoor)");
    expect(out).toContain("var(--marigold)");
    const night = html(React.createElement(RiverHorizon, { height: 150, sun: true, night: true }));
    expect(night).toContain("#16404a");
    expect(night).not.toContain("var(--marigold)");
  });

  it("band and label speak in their own colours", () => {
    expect(html(Band({ children: "Three minutes." }))).toContain("rotate(-2deg)");
    expect(html(Label({ title: "Eleven mornings", price: PRICE.eleven }))).toContain("Eleven mornings");
  });

  it("every motion stops under reduced motion", () => {
    const block = css.match(/@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n\}/)![1];
    for (const n of ["sink", "breathe", "stamp", "flow"]) expect(block).toContain(n);
  });
});
