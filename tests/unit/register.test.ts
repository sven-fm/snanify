import { beforeEach, describe, expect, it } from "vitest";
import * as schema from "@/db/schema";
import { loadRegister } from "@/lib/register";
import { numberRegister } from "@/lib/mornings";
import { freshDb, seedUser, type TestDb } from "./helpers/db";

/* /account lists the newest hundred mornings. Pre-v3 rows (morningNo null)
   are numbered by their place in the whole history, so the count has to be
   every sitting the person has, not the rows loaded. */

describe("numberRegister with a capped list", () => {
  it("numbers from the full count, not the list length", () => {
    const rows = Array.from({ length: 3 }, (_, i) => ({ id: String(i), morningNo: null }));
    expect(numberRegister(rows, 150).map((r) => r.n)).toEqual([150, 149, 148]);
    expect(numberRegister(rows).map((r) => r.n)).toEqual([3, 2, 1]);
  });
});

describe("loadRegister", () => {
  let db: TestDb;
  let userId: string;

  beforeEach(async () => {
    db = await freshDb();
    userId = await seedUser(db);
  });

  async function sit(day: number, morningNo: number | null) {
    const keptOn = new Date(Date.UTC(2026, 0, 1) + day * 86400000).toISOString().slice(0, 10);
    await db.insert(schema.sittings).values({
      id: `s${String(day).padStart(4, "0")}`,
      userId,
      waterSlug: "ganga-haridwar",
      keptAt: new Date(`${keptOn}T06:00:00Z`),
      keptTz: "Asia/Kolkata",
      keptOn,
      locale: "en",
      river: {},
      sky: {},
      seed: "0".repeat(64),
      morningNo,
    });
  }

  it("keeps pre-v3 numbering right past the hundred-row cap", async () => {
    for (let d = 1; d <= 130; d++) await sit(d, null);
    const rows = await loadRegister(db, userId);
    expect(rows).toHaveLength(100);
    expect(rows[0]).toMatchObject({ id: "s0130", n: 130 });
    expect(rows[99]).toMatchObject({ id: "s0031", n: 31 });
  });

  it("keeps a minted count as it was, beside numbered old rows", async () => {
    for (let d = 1; d <= 120; d++) await sit(d, null);
    await sit(121, 121);
    const rows = await loadRegister(db, userId);
    expect(rows.slice(0, 2).map((r) => r.n)).toEqual([121, 120]);
  });
});
