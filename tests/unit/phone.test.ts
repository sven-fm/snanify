import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Phone, PHONE_GEOMETRY as G } from "@/components/kit/Phone";
import { Specimen } from "@/components/Specimen";
import { SittingLoop } from "@/components/snan/SittingLoop";

/* ---------------------------------------------------------------------------
   The shared phone (owner feedback, 18 Oct): one iPhone-like frame on the
   landing, /snan and /begin, with a small island in a status bar above the
   content, so the specimen sheet's top line is never covered.
   --------------------------------------------------------------------------- */

describe("the phone", () => {
  it("keeps the content box at the sheet's own ratio, nine by sixteen", () => {
    expect(G.CONTENT_H / G.SCREEN_W).toBeCloseTo(16 / 9, 5);
    expect(G.SCREEN_H).toBeCloseTo(G.STATUS + G.CONTENT_H, 5);
  });

  it("puts the island wholly inside the status bar, clear of the content", () => {
    const islandBottom = G.ISLAND.top + G.ISLAND.height;
    const contentTop = G.EDGE + G.STATUS;
    expect(islandBottom).toBeLessThan(contentTop);
    expect(G.ISLAND.top).toBeGreaterThan(G.EDGE);
  });

  it("is small in the island and iPhone-like in the corners", () => {
    expect(G.ISLAND.width / G.FRAME_W).toBeLessThanOrEqual(0.3);
    expect(G.ISLAND.height / G.FRAME_W).toBeLessThanOrEqual(0.09);
    expect(G.RADIUS / G.FRAME_W).toBeCloseTo(0.15, 2);
    expect(G.EDGE / G.FRAME_W).toBeLessThan(0.04);
  });

  it("renders its children in the content box", () => {
    const html = renderToStaticMarkup(React.createElement(Phone, null, React.createElement("i", { id: "x" })));
    expect(html).toMatch(/class="phone-content[^"]*"[^>]*><i id="x">/);
  });

  it("is the one frame used by the specimen and the looped sitting", () => {
    for (const lang of ["en", "hi"] as const) {
      const spec = renderToStaticMarkup(React.createElement(Specimen, { lang }));
      const loop = renderToStaticMarkup(React.createElement(SittingLoop, { lang }));
      for (const html of [spec, loop]) {
        expect(html.match(/class="phone /g)?.length).toBe(1);
        expect(html).toContain("phone-content");
      }
      // The sheet sits inside the content box, below the status bar.
      expect(spec).toMatch(/phone-content[^>]*><img/);
    }
  });
});
