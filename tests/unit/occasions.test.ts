import { describe, expect, it } from "vitest";
import { OCCASIONS, occasionBySlug } from "@/content/muhurat";
import { horizonFrom, resolveOccasion } from "@/lib/occasions";

/* ---------------------------------------------------------------------------
   Occasion dates, against the days Drik Panchang names.

   docs/panchang-check.md confirmed these against Drik for Haridwar on
   11 September 2026: the tithi at sunrise on each of the listed days. A
   date the resolver gets wrong here is a date a family would plan around.
   --------------------------------------------------------------------------- */

const FROM = "2026-09-01";
const TO = "2027-08-31";

function dates(slug: string): string[] {
  const o = occasionBySlug(slug);
  if (!o) throw new Error(`no occasion ${slug}`);
  return resolveOccasion(o, FROM, TO).map((r) => r.date);
}

describe("the recurring tithis, at Haridwar's sunrise", () => {
  it("names the amavasyas Drik names", () => {
    const d = dates("amavasya");
    expect(d).toContain("2026-09-11");
    expect(d).toContain("2026-10-10");
    expect(d).toContain("2027-03-08");
    expect(d.length).toBeGreaterThanOrEqual(12);
  });

  it("names the purnimas Drik names, the kshaya one in December included", () => {
    const d = dates("purnima");
    expect(d).toContain("2026-09-26");
    expect(d).toContain("2026-12-23");
    expect(d).toContain("2027-02-20");
  });

  it("names Rama Ekadashi", () => {
    expect(dates("ekadashi")).toContain("2026-11-05");
  });

  it("never lists two consecutive days for one tithi", () => {
    for (const slug of ["purnima", "amavasya", "ekadashi"]) {
      const d = dates(slug);
      for (let i = 1; i < d.length; i += 1) {
        const gap = (Date.parse(d[i]) - Date.parse(d[i - 1])) / 86_400_000;
        expect(gap, `${slug}: ${d[i - 1]} then ${d[i]}`).toBeGreaterThanOrEqual(12);
      }
    }
  });
});

describe("the dated occasions", () => {
  it("ends Pitru Paksha on Sarva Pitru Amavasya, 10 October 2026", () => {
    const o = occasionBySlug("pitru-paksha-2026")!;
    const [span] = resolveOccasion(o, FROM, TO);
    expect(span.kind).toBe("span");
    expect(span.to).toBe("2026-10-10");
    expect(span.date < "2026-10-10").toBe(true);
  });

  it("puts Kartik Purnima on 24 November 2026 and Kartik snan before it", () => {
    const [kp] = resolveOccasion(occasionBySlug("kartik-purnima-2026")!, FROM, TO);
    expect(kp.date).toBe("2026-11-24");
    const [ks] = resolveOccasion(occasionBySlug("kartik-snan-2026")!, FROM, TO);
    expect(ks.kind).toBe("span");
    expect(ks.to).toBe(kp.date);
  });

  it("finds Makar Sankranti in mid January 2027 with its instant", () => {
    const [ms] = resolveOccasion(occasionBySlug("makar-sankranti-2027")!, FROM, TO);
    expect(ms.kind).toBe("instant");
    /* Drik Panchang, Haridwar: the sun enters Makara at 21:14 IST on 14
       January 2027 and the day is kept on the 15th. */
    expect(ms.date).toBe("2027-01-15");
    expect(ms.instant).toMatch(/^2027-01-14T15:4[2-6]/);
  });

  it("lists twelve sankrantis a year", () => {
    expect(dates("sankranti").length).toBe(12);
  });

  it("keeps Mahashivratri in Magha, on 6 March 2027, not in the dark fortnight before", () => {
    const [m] = resolveOccasion(occasionBySlug("mahashivratri-2027")!, FROM, TO);
    expect(m.date).toBe("2027-03-06");
  });

  it("keeps Ganga Dussehra in Jyeshtha, 13 June 2027, and Yam Dwitiya on 11 November 2026", () => {
    expect(resolveOccasion(occasionBySlug("ganga-dussehra-2027")!, FROM, TO)[0].date).toBe("2027-06-13");
    expect(resolveOccasion(occasionBySlug("yam-dwitiya-2026")!, FROM, TO)[0].date).toBe("2026-11-11");
    const [ms] = resolveOccasion(occasionBySlug("magh-snan-2027")!, FROM, TO);
    expect(ms).toMatchObject({ kind: "span", date: "2027-01-23", to: "2027-02-20" });
  });

  it("gives every occasion at least one answer in the horizon", () => {
    for (const o of OCCASIONS) {
      expect(resolveOccasion(o, FROM, TO).length, o.slug).toBeGreaterThan(0);
    }
  });
});

describe("the horizon", () => {
  it("rolls twelve months from today in India", () => {
    const h = horizonFrom(new Date("2026-09-16T10:00:00Z"));
    expect(h).toEqual({ from: "2026-09-16", to: "2027-09-16" });
  });
});
