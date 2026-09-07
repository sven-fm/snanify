import { describe, expect, it } from "vitest";
import { SEED_SHOWN, seedFor, seedLine, type SeedInput } from "@/lib/seed";

const INPUT: SeedInput = {
  sittingId: "3xK9mNpQr7sTuVwXyZaB2c",
  waterSlug: "ganga-haridwar",
  modelledFor: "2026-08-11",
  discharge: 1443.62,
};

describe("seedFor", () => {
  it("returns the same seed for the same sitting, every time", async () => {
    const a = await seedFor(INPUT);
    const b = await seedFor(INPUT);
    expect(a).toBe(b);
  });

  it("is sixty-four hex characters, a whole SHA-256", async () => {
    expect(await seedFor(INPUT)).toMatch(/^[0-9a-f]{64}$/);
  });

  it("changes when the river changes", async () => {
    const other = await seedFor({ ...INPUT, discharge: 1443.63 });
    expect(other).not.toBe(await seedFor(INPUT));
  });

  it("changes when the day changes", async () => {
    const other = await seedFor({ ...INPUT, modelledFor: "2026-08-12" });
    expect(other).not.toBe(await seedFor(INPUT));
  });

  it("changes when the water changes", async () => {
    const other = await seedFor({ ...INPUT, waterSlug: "yamuna-mathura" });
    expect(other).not.toBe(await seedFor(INPUT));
  });

  it("differs between two sittings of the same river on the same day", async () => {
    const other = await seedFor({ ...INPUT, sittingId: "9zY8xW7vU6tS5rQ4pN3mLk" });
    expect(other).not.toBe(await seedFor(INPUT));
  });

  it("rounds the discharge to two places, so a float's tail cannot move the seed", async () => {
    /* The figure printed on the sheet is what the seed must stand on. If the
       seed used the raw float, a sheet reading 1443.62 could carry a seed
       computed from 1443.6200000000001 and no reader could ever reproduce it. */
    const a = await seedFor({ ...INPUT, discharge: 1443.62 });
    const b = await seedFor({ ...INPUT, discharge: 1443.6200000000001 });
    expect(a).toBe(b);
  });
});

describe("seedLine", () => {
  it("is the exact string a reader hashes to check the sheet", async () => {
    expect(seedLine(INPUT)).toBe("3xK9mNpQr7sTuVwXyZaB2c|ganga-haridwar|2026-08-11|1443.62");
  });

  it("holds the same four fields the seed is computed from", async () => {
    const line = seedLine(INPUT);
    expect(line.split("|")).toHaveLength(4);
  });
});

describe("the printed seed", () => {
  it("shows sixteen characters, enough to compare by eye", async () => {
    const full = await seedFor(INPUT);
    expect(SEED_SHOWN).toBe(16);
    expect(full.slice(0, SEED_SHOWN)).toHaveLength(16);
  });
});
