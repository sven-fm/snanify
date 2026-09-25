import { describe, expect, it } from "vitest";
import { CITY_SLUGS } from "@/content/cities";
import { OCCASIONS } from "@/content/muhurat";
import { INDEXABLE_CITIES, isIndexable } from "@/lib/indexable";

const DAY = new Date("2026-09-25T06:00:00Z");

describe("the index", () => {
  it("lists only cities that exist", () => {
    for (const slug of INDEXABLE_CITIES) expect(CITY_SLUGS).toContain(slug);
  });

  // The pages Search Console showed earning impressions on 25 September 2026.
  it.each([
    "/", "/live", "/panchang", "/muhurat", "/rivers/ganga-haridwar", "/rivers/godavari-nashik",
    "/rivers/shipra-ujjain", "/rivers/yamuna-mathura", "/muhurat/amavasya", "/muhurat/purnima",
    "/muhurat/pitru-paksha-2026", "/muhurat/kartik-snan-2026", "/muhurat/tula-sankramana-2026",
    "/muhurat/kartik-purnima-2026", "/muhurat/yam-dwitiya-2026", "/muhurat/ganga-dussehra-2027",
  ])("keeps %s indexed", (path) => {
    expect(isIndexable(path, DAY)).toBe(true);
  });

  it.each(["/privacy", "/terms", "/panchang/plainsboro", "/muhurat/mahashivratri-2028"])(
    "leaves %s out",
    (path) => expect(isIndexable(path, DAY)).toBe(false),
  );

  it("drops a dated occasion once its months are past", () => {
    expect(isIndexable("/muhurat/pitru-paksha-2026", new Date("2026-11-02T00:00:00Z"))).toBe(false);
  });

  it("keeps the shraddha guide, which shares the city route's shape", () => {
    expect(isIndexable("/panchang/shraddha", DAY)).toBe(true);
  });

  it("indexes every monthly occasion", () => {
    for (const o of OCCASIONS.filter((x) => x.cadence === "monthly")) {
      expect(isIndexable(`/muhurat/${o.slug}`, DAY)).toBe(true);
    }
  });
});
