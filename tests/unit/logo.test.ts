import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { Logo, Mark, Wordmark } from "@/components/Logo";
import manifest from "@/app/manifest";

/* The v3 logo (spec 6.9): the horizon sun over teal water, no marigold, and
   one heavy wordmark with the sindoor bindu as the dot of the dotless i. */

const html = (node: React.ReactNode) => renderToStaticMarkup(React.createElement(React.Fragment, null, node));
const css = readFileSync("src/app/globals.css", "utf8");
const waterRects = (svg: string) => (svg.match(/<g fill="var\(--teal\)">(.*?)<\/g>/)?.[1].match(/<rect /g) ?? []).length;

describe("the mark", () => {
  const full = html(React.createElement(Mark));
  const small = html(React.createElement(Mark, { small: true }));

  it("is sindoor sun and teal water, with no marigold", () => {
    for (const svg of [full, small]) {
      expect(svg).toContain("var(--sindoor)");
      expect(svg).toContain("var(--teal)");
      expect(svg).not.toMatch(/#f2c230|marigold/i);
    }
  });

  it("cuts the sun at the horizon, y 24.6: a half disc above an ink line", () => {
    expect(full).toContain('<path d="M15.4 24.6A8.6 8.6 0 0 1 32.6 24.6Z" fill="var(--sindoor)"');
    expect(small).toContain('<path d="M14.5 24.6A9.5 9.5 0 0 1 33.5 24.6Z"');
    expect(full).toMatch(/<rect y="24.6" width="48" height="1.4" fill="currentColor"/);
  });

  it("the full mark has a 2.4 ring and three bands, the small cut 3.6 and two", () => {
    expect(full).toContain('stroke-width="2.4"');
    expect(waterRects(full)).toBe(3);
    expect(small).toContain('stroke-width="3.6"');
    expect(waterRects(small)).toBe(2);
  });
});

describe("the wordmark", () => {
  const out = html(React.createElement(Wordmark));

  it("sets the dotless i with an SVG bindu, and carries the name for readers", () => {
    expect(out).toContain("ı");
    expect(out).toMatch(/<svg[^>]*class="wordmark-bindu"/);
    expect(out).toContain('<span class="sr-only">Snanify</span>');
    expect(out).toMatch(/<span aria-hidden="true"[^>]*>Snan/);
  });

  it("is one weight: the two-weight split is gone", () => {
    expect(out).not.toMatch(/wordmark-root|wordmark-suffix/);
    expect(css).toMatch(/@utility wordmark \{[^}]*font-weight: 800/);
    expect(css).toMatch(/@utility wordmark \{[^}]*letter-spacing: -0\.015em/);
    expect(css).toMatch(/@utility wordmark \{[^}]*line-height: 1;/);
    expect(css).not.toMatch(/wordmark-root|wordmark-suffix/);
  });

  it("Eczar 800 is loaded for the Latin cut", () => {
    const fonts = readFileSync("src/lib/fonts.ts", "utf8");
    const latin = fonts.match(/const eczarLatin = Eczar\(\{[^}]*\}\)/)?.[0] ?? "";
    expect(latin).toContain('"800"');
  });

  it("the lockup is the mark and the word", () => {
    const lockup = html(React.createElement(Logo));
    expect(lockup).toContain("var(--sindoor)");
    expect(lockup).toContain("Snanify");
  });
});

describe("header and footer", () => {
  it("the masthead sits on the strip, the footer closes on the river", () => {
    const header = readFileSync("src/components/site/Header.tsx", "utf8");
    const footer = readFileSync("src/components/site/Footer.tsx", "utf8");
    expect(header).toContain("<RiverStrip");
    expect(footer).toContain("<RiverHorizon height={120}");
  });
});

describe("the icons", () => {
  const size = async (path: string) => {
    const m = await sharp(path).metadata();
    return [m.width, m.height];
  };

  it("exports PNGs at their sizes", async () => {
    expect(await size("public/apple-touch-icon.png")).toEqual([180, 180]);
    expect(await size("public/icon-192.png")).toEqual([192, 192]);
    expect(await size("public/icon-512.png")).toEqual([512, 512]);
    expect(await size("public/brand-1024.png")).toEqual([1024, 1024]);
  });

  it("the apple icon is opaque, since iOS composites transparency to black", async () => {
    const m = await sharp("public/apple-touch-icon.png").metadata();
    expect(m.hasAlpha).toBe(false);
  });

  it("icon.svg is the small cut, no marigold", () => {
    const svg = readFileSync("public/icon.svg", "utf8");
    expect(svg).toContain('stroke-width="3.6"');
    expect(svg).toContain("#1d5a6a");
    expect(svg).not.toMatch(/#f2c230/i);
  });

  it("favicon.ico holds 16, 32 and 48", () => {
    expect(existsSync("public/favicon.ico")).toBe(true);
    const ico = readFileSync("public/favicon.ico");
    expect(ico.readUInt16LE(2)).toBe(1);
    const count = ico.readUInt16LE(4);
    const sizes = Array.from({ length: count }, (_, i) => ico[6 + i * 16] || 256).sort((a, b) => a - b);
    expect(sizes).toEqual([16, 32, 48]);
  });

  it("the manifest lists 192 and 512", () => {
    const sizes = (manifest().icons ?? []).map((i) => i.sizes);
    expect(sizes).toContain("192x192");
    expect(sizes).toContain("512x512");
  });
});
