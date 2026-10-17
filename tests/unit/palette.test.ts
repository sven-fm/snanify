import { expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { PALETTE, GAUGE_FILLS } from "@/lib/palette";
const css = readFileSync("src/app/globals.css", "utf8");
it("globals.css carries every day and night value from palette.ts", () => {
  const varName = { paper2: "paper-2", paper3: "paper-3", ink2: "ink-2" } as Record<string, string>;
  for (const [k, hex] of Object.entries(PALETTE.day)) expect(css).toMatch(new RegExp(`--${varName[k] ?? k}:\\s*${hex}`, "i"));
  for (const [k, hex] of Object.entries(PALETTE.night)) expect(css).toMatch(new RegExp(`--${varName[k] ?? k}:\\s*${hex}`, "i"));
  GAUGE_FILLS.day.forEach((hex, i) => expect(css).toMatch(new RegExp(`--gauge-${i + 1}:\\s*${hex}`, "i")));
});
it("pins the spec values", () => {
  expect(PALETTE.day.sindoor).toBe("#c8251d");
  expect(PALETTE.day.marigold).toBe("#f2c230");
  expect(PALETTE.day.teal).toBe("#1d5a6a");
  expect(PALETTE.night.wall).toBe("#000000");
});
it("leaves no retired token in src", () => {
  const out = execSync("grep -rEl '(--spot|--haldi-2|\\b(text|bg|border)-spot\\b|bg-haldi2|className=\"[^\"]*\\bwarm\\b)' src || true").toString();
  expect(out.trim()).toBe("");
});
