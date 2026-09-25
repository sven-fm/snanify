import { describe, expect, it } from "vitest";
import { CITIES } from "@/content/cities";
import { OCCASIONS } from "@/content/muhurat";
import { occasionDescription } from "@/content/muhurat-index";
import { cityDescription } from "@/content/panchang-city";
import { RIVERS } from "@/content/rivers";
import { riverDescription } from "@/content/rivers-index";
import { horizonFrom, resolveOccasion, sayResolved } from "@/lib/occasions";
import { LANGS } from "@/lib/locales";
import { DESCRIPTION_MAX, DESCRIPTION_MIN, fitDescription } from "@/lib/seo";

/* ---------------------------------------------------------------------------
   Meta descriptions, held to 120 to 155 characters. Bing's site scan flagged
   88 outside it in September 2026. The templates that take a name are the
   ones that drift: every city, every occasion with its computed day, every
   water.
   --------------------------------------------------------------------------- */

const inRange = (d: string) => {
  expect.soft(d.length, d).toBeGreaterThanOrEqual(DESCRIPTION_MIN);
  expect.soft(d.length, d).toBeLessThanOrEqual(DESCRIPTION_MAX);
};

describe("fitDescription", () => {
  it("takes the first in range, else the first not too long, else the last", () => {
    expect(fitDescription(["x".repeat(160), "y".repeat(130)])).toBe("y".repeat(130));
    expect(fitDescription(["x".repeat(160), "y".repeat(100)])).toBe("y".repeat(100));
    expect(fitDescription(["x".repeat(170), "y".repeat(160)])).toBe("y".repeat(160));
  });
});

describe("the templated descriptions", () => {
  it("fit for every city in both editions", () => {
    for (const lang of LANGS) for (const c of CITIES) inRange(cityDescription(lang, c.name[lang]));
  });

  it("fit for every water in both editions", () => {
    for (const lang of LANGS) for (const g of RIVERS) inRange(riverDescription(lang, g));
  });

  it("fit for every occasion in both editions, with and without its computed day", () => {
    const { from, to } = horizonFrom(new Date("2026-09-25T06:00:00Z"));
    for (const o of OCCASIONS) {
      const next = resolveOccasion(o, from, to)[0];
      for (const lang of LANGS) {
        inRange(occasionDescription(lang, o));
        if (next) inRange(occasionDescription(lang, o, sayResolved(next, lang)));
      }
    }
  });
});
