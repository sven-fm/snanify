import { describe, expect, it } from "vitest";
import { GHATS } from "@/content/muhurat";
import { isPrayerFor, PRAYER_BY_ID, PRAYERS, prayersFor } from "@/content/prayers";

describe("the prayer list", () => {
  it("gives every water something to choose from", () => {
    for (const ghat of GHATS) {
      expect(prayersFor(ghat.id).length).toBeGreaterThanOrEqual(3);
    }
  });

  it("names a source for every verse, because none of them is ours", () => {
    for (const p of PRAYERS) {
      expect(p.source.en.length).toBeGreaterThan(0);
      expect(p.source.hi.length).toBeGreaterThan(0);
    }
  });

  it("carries both scripts and a meaning in both editions", () => {
    for (const p of PRAYERS) {
      expect(p.devanagari.length).toBeGreaterThan(0);
      expect(p.roman.length).toBe(p.devanagari.length);
      for (const line of p.devanagari) expect(line).toMatch(/[ऀ-ॿ]/);
      for (const line of p.roman) expect(line).toMatch(/^[a-z' ]+$/);
      expect(p.meaning.en.length).toBeGreaterThan(0);
      expect(p.meaning.hi).toMatch(/[ऀ-ॿ]/);
    }
  });

  it("uses each id once", () => {
    expect(Object.keys(PRAYER_BY_ID)).toHaveLength(PRAYERS.length);
  });

  it("offers the river verses only to their own rivers", () => {
    expect(prayersFor("yamuna-mathura").map((p) => p.id)).toContain("yamunashtakam");
    expect(prayersFor("ganga-haridwar").map((p) => p.id)).not.toContain("yamunashtakam");
  });
});

describe("isPrayerFor", () => {
  it("accepts a verse the water offers", () => {
    expect(isPrayerFor("ganga-haridwar", "ganga-stotram")).toBe(true);
  });

  it("accepts none, because a prayer is optional", () => {
    expect(isPrayerFor("ganga-haridwar", null)).toBe(true);
  });

  it("refuses a verse from another river, and anything invented", () => {
    expect(isPrayerFor("ganga-haridwar", "yamunashtakam")).toBe(false);
    expect(isPrayerFor("ganga-haridwar", "made-up")).toBe(false);
  });
});
