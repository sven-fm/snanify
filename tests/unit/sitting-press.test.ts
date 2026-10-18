import { readFileSync } from "node:fs";
import { expect, it } from "vitest";

/* Every control has a press state (CLAUDE.md), the stillness's leave cross
   and Next included: on the dark ground they press to the edge tone with the
   brighter line ink, set through the stillness custom properties. */
const src = readFileSync("src/components/snan/Sitting.tsx", "utf8");

function block(marker: string): string {
  const at = src.indexOf(marker);
  const start = src.lastIndexOf("<", src.lastIndexOf("className", at));
  return src.slice(start, at);
}

it("gives the stillness leave cross a press state", () => {
  const cross = block("data-leave");
  expect(cross).toMatch(/stillness\s*\?\s*"[^"]*active:bg-\[var\(--still-edge\)\][^"]*active:text-\[var\(--still-line\)\]/);
  expect(cross).toMatch(/:\s*"[^"]*active:bg-ink/);
});

it("gives the stillness Next a press state", () => {
  const next = block("data-next");
  expect(next).toMatch(/stillness\s*\?\s*"[^"]*active:bg-\[var\(--still-edge\)\][^"]*active:text-\[var\(--still-line\)\]/);
});

it("keeps the stillness tones from the palette, through custom properties", () => {
  expect(src).toMatch(/"--still-edge": STILLNESS_INK\.edge/);
  expect(src).toMatch(/"--still-line": STILLNESS_INK\.line/);
});
