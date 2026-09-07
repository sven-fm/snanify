import { beforeEach, describe, expect, it } from "vitest";
import { balance, book, InsufficientCredits, spendForSitting } from "@/lib/credits";
import { creditLedger } from "@/db/schema";
import { freshDb, seedUser, type TestDb } from "./helpers/db";

let db: TestDb;
let userId: string;

beforeEach(async () => {
  db = await freshDb();
  userId = await seedUser(db);
});

describe("balance", () => {
  it("is zero for someone who has bought nothing", async () => {
    expect(await balance(db, userId)).toBe(0);
  });

  it("is the sum of the ledger, not a stored counter", async () => {
    await book(db, { userId, delta: 11, reason: "purchase", refId: "cs_1" });
    await book(db, { userId, delta: -1, reason: "sitting", refId: "sit_1" });
    expect(await balance(db, userId)).toBe(10);
  });

  it("counts only this person's rows", async () => {
    const other = await seedUser(db, "user_other");
    await book(db, { userId: other, delta: 60, reason: "purchase", refId: "cs_2" });
    expect(await balance(db, userId)).toBe(0);
    expect(await balance(db, other)).toBe(60);
  });
});

describe("book", () => {
  it("refuses to take a balance below zero", async () => {
    await expect(
      book(db, { userId, delta: -1, reason: "sitting", refId: "sit_1" }),
    ).rejects.toBeInstanceOf(InsufficientCredits);
    expect(await balance(db, userId)).toBe(0);
  });

  it("books a redelivered webhook exactly once", async () => {
    /* Stripe delivers checkout.session.completed more than once by design. The
       second delivery must not sell an eleven-pack twice. */
    const entry = { userId, delta: 11, reason: "purchase" as const, refId: "cs_dup" };
    const first = await book(db, entry);
    const second = await book(db, entry);

    expect(first.booked).toBe(true);
    expect(second.booked).toBe(false);
    expect(await balance(db, userId)).toBe(11);
    expect(await db.select().from(creditLedger)).toHaveLength(1);
  });

  it("keeps a purchase and a sitting apart even under the same reference", async () => {
    await book(db, { userId, delta: 11, reason: "purchase", refId: "same" });
    await book(db, { userId, delta: -1, reason: "sitting", refId: "same" });
    expect(await balance(db, userId)).toBe(10);
  });

  it("gives a credit back on a refund", async () => {
    await book(db, { userId, delta: 11, reason: "purchase", refId: "cs_3" });
    await book(db, { userId, delta: -11, reason: "refund", refId: "cs_3" });
    expect(await balance(db, userId)).toBe(0);
  });
});

describe("spendForSitting", () => {
  it("spends one credit and reports the balance left", async () => {
    await book(db, { userId, delta: 11, reason: "purchase", refId: "cs_4" });
    const left = await spendForSitting(db, userId, "sitting_id_1");
    expect(left).toBe(10);
  });

  it("refuses when there is nothing to spend", async () => {
    await expect(spendForSitting(db, userId, "sitting_id_1")).rejects.toBeInstanceOf(
      InsufficientCredits,
    );
  });

  it("spends once when the same sitting is submitted twice", async () => {
    /* A phone on a bad connection retries the server action. The morning is
       already minted; it must not cost a second credit. */
    await book(db, { userId, delta: 2, reason: "purchase", refId: "cs_5" });
    await spendForSitting(db, userId, "sitting_id_1");
    await spendForSitting(db, userId, "sitting_id_1");
    expect(await balance(db, userId)).toBe(1);
  });

  it("never lets the last credit be spent twice at once", async () => {
    await book(db, { userId, delta: 1, reason: "purchase", refId: "cs_6" });

    const results = await Promise.allSettled([
      spendForSitting(db, userId, "sitting_a"),
      spendForSitting(db, userId, "sitting_b"),
    ]);

    const kept = results.filter((r) => r.status === "fulfilled");
    expect(kept).toHaveLength(1);
    expect(await balance(db, userId)).toBe(0);
  });
});
