import { readFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { Footer } from "@/components/site/Footer";

/* The owner, 18 October 2026: a river above Begin and another below it. The
   ready screen keeps its own; the page footer's river stays off /today. */

it("the footer closes on the river by default, and leaves it out on request", () => {
  expect(renderToStaticMarkup(React.createElement(Footer, { lang: "en" }))).toContain("flow-line");
  expect(renderToStaticMarkup(React.createElement(Footer, { lang: "en", river: false }))).not.toContain("flow-line");
});

it("/today renders every footer without its river", () => {
  const src = readFileSync(join(process.cwd(), "src/app/[lang]/(app)/today/page.tsx"), "utf8");
  const footers = src.match(/<Footer\b[^>]*\/>/g) ?? [];
  expect(footers.length).toBeGreaterThan(0);
  for (const f of footers) expect(f).toContain("river={false}");
});
