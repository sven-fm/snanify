import { beforeEach, describe, expect, it, vi } from "vitest";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { book } from "@/lib/credits";
import type { WaterState } from "@/lib/riverdata";
import { freshDb, seedUser, type TestDb } from "./helpers/db";

/* mintSitting reads the module-level client, so the client is a stand-in that
   forwards to the in-process Postgres each test creates. */
const holder = vi.hoisted(() => ({ db: null as unknown }));

vi.mock("@/db", async () => {
  const real = await vi.importActual<typeof import("@/db/schema")>("@/db/schema");
  return {
    ...real,
    db: new Proxy(
      {},
      {
        get: (_t, key) => {
          const target = holder.db as Record<string | symbol, unknown>;
          const value = target[key];
          return typeof value === "function" ? value.bind(target) : value;
        },
      },
    ),
  };
});

vi.mock("@/lib/patra-store", () => ({ storeSheet: async () => null }));

vi.mock("@/lib/riverdata", async () => {
  const real = await vi.importActual<typeof import("@/lib/riverdata")>("@/lib/riverdata");
  return {
    ...real,
    getLiveSnapshot: async () => ({ waters: [water("ganga-haridwar"), water("godavari-nashik")] }),
  };
});

function water(slug: string): WaterState {
  return {
    slug,
    gauge: { slug, ghat: [19.9975, 73.7898], elevationM: 584, cell: [19.9, 73.8], cellOffsetKm: 9 },
    discharge: {
      kind: "modelled",
      cumecs: 103.2349999,
      modelledFor: "2026-09-08",
      ageDays: 0,
      stale: false,
      percentile: { value: 73.6, capped: null, band: "full" },
      trend: "rising",
      deltaPct: 12,
      normal: { p10: 20, median: 82.4712, p90: 300 },
      series: [],
    },
    sky: { kind: "observed", sunrise: "2026-09-08T06:20", sunset: "2026-09-08T18:44" },
    windows: [],
    current: null,
    next: null,
  } as unknown as WaterState;
}

const { mintSitting, morningNumber } = await import("@/lib/sitting");

let db: TestDb;
let userId: string;

const DAY1 = new Date("2026-09-08T01:00:00Z");
const DAY2 = new Date("2026-09-09T01:00:00Z");

async function chooseWater(slug: string) {
  await db.update(schema.profiles).set({ waterSlug: slug }).where(eq(schema.profiles.userId, userId));
}

beforeEach(async () => {
  db = await freshDb();
  holder.db = db;
  userId = await seedUser(db);
  await db.insert(schema.profiles).values({
    userId,
    waterSlug: "ganga-haridwar",
    names: [{ name: "Rekha Sharma" }],
    completedAt: new Date(),
  });
  await book(db, { userId, delta: 11, reason: "purchase", refId: "cs_1" });
});

describe("morningNumber", () => {
  it("is the mornings before this one, plus one", () => {
    expect(morningNumber(0)).toBe(1);
    expect(morningNumber(6)).toBe(7);
  });
});

describe("mintSitting counts the person's mornings", () => {
  it("numbers mornings across waters, and stamps the image version", async () => {
    const first = await mintSitting({ userId, tz: "UTC", lang: "en", at: DAY1 });
    await chooseWater("godavari-nashik");
    const second = await mintSitting({ userId, tz: "UTC", lang: "en", at: DAY1 });

    expect(first.outcome).toBe("kept");
    expect(second.outcome).toBe("kept");
    if (first.outcome !== "kept" || second.outcome !== "kept") return;
    expect(first.morning).toBe(1);
    expect(second.morning).toBe(2);
    expect(first.sitting.morningNo).toBe(1);
    expect(second.sitting.morningNo).toBe(2);
    expect(second.sitting.imageVersion).toBe(3);
  });

  it("hands back the stored number on a re-mint of the same water and day", async () => {
    await mintSitting({ userId, tz: "UTC", lang: "en", at: DAY1 });
    await chooseWater("godavari-nashik");
    await mintSitting({ userId, tz: "UTC", lang: "en", at: DAY1 });

    const again = await mintSitting({ userId, tz: "UTC", lang: "en", at: DAY1 });
    expect(again.outcome).toBe("already");
    if (again.outcome !== "already") return;
    expect(again.morning).toBe(2);
  });

  it("recomputes the number for a row minted before it was counted", async () => {
    await mintSitting({ userId, tz: "UTC", lang: "en", at: DAY1 });
    await db.update(schema.sittings).set({ morningNo: null }).where(eq(schema.sittings.userId, userId));

    const again = await mintSitting({ userId, tz: "UTC", lang: "en", at: DAY1 });
    expect(again.outcome).toBe("already");
    if (again.outcome !== "already") return;
    expect(again.morning).toBe(1);
  });

  it("gives two mints in flight at once different numbers", async () => {
    const [a, b] = await Promise.all([
      mintSitting({ userId, tz: "UTC", lang: "en", at: DAY1 }),
      mintSitting({ userId, tz: "UTC", lang: "en", at: DAY2 }),
    ]);
    if (a.outcome !== "kept" || b.outcome !== "kept") throw new Error("both should keep");
    expect([a.morning, b.morning].sort()).toEqual([1, 2]);
  });
});
