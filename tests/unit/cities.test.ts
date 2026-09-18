import { describe, expect, it } from "vitest";
import { CITIES, COUNTRIES, citiesByCountry } from "@/content/cities";
import { cityDay } from "@/lib/city-day";

/* The city registry: two hundred cities across the three countries the
   diaspora mostly lives in, every one with a real zone and a morning that
   computes. */

describe("cities", () => {
  it("has a unique slug per city, in URL form", () => {
    const slugs = CITIES.map((x) => x.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("names two hundred cities across the United States, Canada and the United Kingdom", () => {
    const core = CITIES.filter((x) => ["US", "CA", "UK"].includes(x.countryCode));
    expect(core.length).toBe(200);
    expect(CITIES.length).toBeGreaterThanOrEqual(300);
  });

  it("gives every city a zone Intl accepts and coordinates on the globe", () => {
    for (const city of CITIES) {
      expect(() => new Intl.DateTimeFormat("en-GB", { timeZone: city.zone })).not.toThrow();
      expect(Math.abs(city.lat)).toBeLessThanOrEqual(90);
      expect(Math.abs(city.lon)).toBeLessThanOrEqual(180);
      expect(city.name.en.length).toBeGreaterThan(0);
      expect(city.name.hi.length).toBeGreaterThan(0);
      if (city.region) expect(city.region.hi.length).toBeGreaterThan(0);
    }
  });

  it("keeps a name unique within each edition", () => {
    for (const lang of ["en", "hi"] as const) {
      const names = CITIES.map((x) => x.name[lang]);
      expect(new Set(names).size).toBe(names.length);
    }
  });

  it("computes a morning for every city", () => {
    for (const city of CITIES) {
      const day = cityDay(city);
      expect(day, city.slug).not.toBeNull();
      expect(day!.sunrise.getTime()).toBeLessThan(day!.sunset.getTime());
      expect(day!.brahma.end.getTime()).toBeLessThanOrEqual(day!.sunrise.getTime());
    }
  });

  it("groups every city under a listed country, alphabetically", () => {
    const groups = citiesByCountry("en");
    expect(groups.reduce((n, g) => n + g.cities.length, 0)).toBe(CITIES.length);
    expect(groups.map((g) => g.country.code)).toEqual(COUNTRIES.map((c) => c.code));
    for (const g of groups) {
      const names = g.cities.map((x) => x.name.en);
      expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "en")));
    }
  });
});
