import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { quietFigure } from "@/content/flow";

/* The quiet feed's figure row joins the state to the flow mid-sentence, so
   the English reads "717 m³/s, usual for the season", never a capital after
   the comma. Hindi has no case and keeps its words. */

it("lower-cases the joined English figure row", () => {
  expect(quietFigure("717 m³/s", "en")).toBe("717 m³/s, usual for the season");
  expect(quietFigure("717 m³/s", "en")).not.toMatch(/, [A-Z]/);
});

it("keeps the Hindi row as written", () => {
  expect(quietFigure("717 घन मी/से", "hi")).toBe("717 घन मी/से, इस ऋतु का सामान्य स्तर");
});

it("builds every quiet figure row through quietFigure", () => {
  for (const file of ["src/app/[lang]/page.tsx", "src/app/[lang]/(app)/today/page.tsx", "src/components/live/Reading.tsx"]) {
    const src = readFileSync(file, "utf8");
    expect(src).not.toContain("${words.stateMedian}");
    expect(src).toContain("quietFigure(flow, lang)");
  }
});
