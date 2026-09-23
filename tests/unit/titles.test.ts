import { describe, expect, it } from "vitest";
import { CITIES } from "@/content/cities";
import { OCCASIONS } from "@/content/muhurat";
import { occasionTitle } from "@/content/muhurat-index";
import { cityTitle } from "@/content/panchang-city";
import { LANGS } from "@/lib/locales";
import { TITLE_MAX, fitTitle } from "@/lib/seo";

/* ---------------------------------------------------------------------------
   Page titles, held to TITLE_MAX.

   The two templates that take a name are the ones that can run long: 301
   cities and every occasion, in both editions, for every year the calendar
   can print. Bing's site scan flagged 77 of them at over 70 characters in
   September 2026; this is the line that keeps them from coming back.
   --------------------------------------------------------------------------- */

describe("fitTitle", () => {
  it("takes the first candidate that fits, and the last when none does", () => {
    expect(fitTitle(["x".repeat(61), "short"])).toBe("short");
    expect(fitTitle(["fits", "also"])).toBe("fits");
    expect(fitTitle(["x".repeat(80), "y".repeat(70)])).toBe("y".repeat(70));
  });
});

describe("the city titles", () => {
  it("fit for every city in both editions", () => {
    for (const lang of LANGS) {
      for (const c of CITIES) {
        const t = cityTitle(lang, c.name[lang]);
        expect(t.length, t).toBeLessThanOrEqual(TITLE_MAX);
        expect(t, t).toContain(c.name[lang]);
      }
    }
  });

  it("keep the full title for an ordinary name and shorten only the long ones", () => {
    expect(cityTitle("en", "London")).toBe("London panchang today: sunrise, Brahma muhurat, tithi");
    expect(cityTitle("en", "Richmond, British Columbia")).toBe("Richmond, British Columbia panchang today");
  });

  it("are unique", () => {
    for (const lang of LANGS) {
      const all = CITIES.map((c) => cityTitle(lang, c.name[lang]));
      expect(new Set(all).size).toBe(all.length);
    }
  });
});

describe("the occasion titles", () => {
  it("fit for every occasion in both editions, in any year", () => {
    for (const lang of LANGS) {
      for (const o of OCCASIONS) {
        for (const year of ["2026", "2027", "2028", "2029", undefined]) {
          const t = occasionTitle(lang, o, year);
          expect(t.length, t).toBeLessThanOrEqual(TITLE_MAX);
        }
      }
    }
  });

  const bySlug = (slug: string) => OCCASIONS.find((o) => o.slug === slug)!;

  it("name the year and what is searched for", () => {
    expect(occasionTitle("en", bySlug("janmashtami-2027"), "2027")).toBe(
      "Krishna Janmashtami 2027: date and snan muhurat | Snanify",
    );
    expect(occasionTitle("hi", bySlug("janmashtami-2027"), "2027")).toBe(
      "कृष्ण जन्माष्टमी 2027: तिथि और स्नान मुहूर्त | Snanify",
    );
  });

  it("give a span the resolver leaves undated the year of its first month", () => {
    expect(occasionTitle("en", bySlug("magh-mela-2028"))).toBe("Magh Mela 2028: date and snan muhurat | Snanify");
  });

  it("name the month where one occasion falls twice in a year", () => {
    expect(occasionTitle("en", bySlug("somvati-amavasya-december-2027"), "2027")).toBe(
      "Somvati Amavasya December 2027: date and snan muhurat",
    );
  });

  it("are unique across every dated page, in both editions", () => {
    for (const lang of LANGS) {
      const all = OCCASIONS.map((o) => occasionTitle(lang, o, o.occurrence.months[0]?.slice(0, 4)));
      expect(all.filter((t, i) => all.indexOf(t) !== i)).toEqual([]);
    }
  });
});
