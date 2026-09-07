import type Stripe from "stripe";
import { beforeEach, describe, expect, it } from "vitest";
import { fulfilSession } from "@/lib/fulfil";
import { balance } from "@/lib/credits";
import { purchases } from "@/db/schema";
import { freshDb, seedUser, type TestDb } from "./helpers/db";

let db: TestDb;
let userId: string;

function session(over: Partial<Stripe.Checkout.Session> = {}): Stripe.Checkout.Session {
  return {
    id: "cs_test_1",
    object: "checkout.session",
    client_reference_id: userId,
    payment_status: "paid",
    currency: "usd",
    amount_total: 1100,
    payment_intent: "pi_test_1",
    customer_email: "reader@example.com",
    customer_details: { email: "reader@example.com" },
    metadata: { pack: "eleven", credits: "11", userId, lang: "en" },
    ...over,
  } as unknown as Stripe.Checkout.Session;
}

beforeEach(async () => {
  db = await freshDb();
  userId = await seedUser(db);
});

describe("fulfilSession", () => {
  it("books the mornings the pack was sold for", async () => {
    const result = await fulfilSession(db, session());

    expect(result.outcome).toBe("booked");
    expect(await balance(db, userId)).toBe(11);
  });

  it("writes one purchase row with the money as Stripe reported it", async () => {
    await fulfilSession(db, session());

    const rows = await db.select().from(purchases);
    expect(rows).toHaveLength(1);
    expect(rows[0].pack).toBe("eleven");
    expect(rows[0].credits).toBe(11);
    expect(rows[0].currency).toBe("USD");
    expect(rows[0].amountMinor).toBe(1100);
    expect(rows[0].stripePaymentIntent).toBe("pi_test_1");
  });

  it("buys nothing twice when Stripe delivers twice", async () => {
    const first = await fulfilSession(db, session());
    const second = await fulfilSession(db, session());

    expect(first.outcome).toBe("booked");
    expect(second.outcome).toBe("already");
    expect(await balance(db, userId)).toBe(11);
    expect(await db.select().from(purchases)).toHaveLength(1);
  });

  it("honours what the session was sold for, not what the pack costs today", async () => {
    /* Somebody bought eleven mornings. Tomorrow the eleven pack becomes twelve
       mornings. Their old session must still be worth eleven. */
    const result = await fulfilSession(
      db,
      session({ metadata: { pack: "eleven", credits: "11", userId, lang: "en" } }),
    );

    expect(result.outcome === "booked" && result.credits).toBe(11);
  });

  it("falls back to today's pack size when a session carries no count", async () => {
    const result = await fulfilSession(
      db,
      session({ metadata: { pack: "sixty", userId, lang: "en" } }),
    );

    expect(result.outcome === "booked" && result.credits).toBe(60);
    expect(await balance(db, userId)).toBe(60);
  });

  it("gives nothing away for a session that was never paid", async () => {
    const result = await fulfilSession(db, session({ payment_status: "unpaid" }));

    expect(result.outcome).toBe("ignored");
    expect(await balance(db, userId)).toBe(0);
  });

  it("gives nothing away for a session with no pack on it", async () => {
    const result = await fulfilSession(db, session({ metadata: { userId } }));

    expect(result.outcome).toBe("ignored");
    expect(await balance(db, userId)).toBe(0);
  });

  it("gives nothing away for a pack name that is not ours", async () => {
    const result = await fulfilSession(
      db,
      session({ metadata: { pack: "thousand", credits: "1000", userId } }),
    );

    expect(result.outcome).toBe("ignored");
    expect(await balance(db, userId)).toBe(0);
  });

  it("gives nothing away when nobody is named on the session", async () => {
    const result = await fulfilSession(
      db,
      session({ client_reference_id: null, metadata: { pack: "eleven", credits: "11" } }),
    );

    expect(result.outcome).toBe("ignored");
  });

  it("reads the buyer from metadata when the reference is missing", async () => {
    const result = await fulfilSession(db, session({ client_reference_id: null }));

    expect(result.outcome).toBe("booked");
    expect(await balance(db, userId)).toBe(11);
  });

  it("keeps two different sessions apart", async () => {
    await fulfilSession(db, session({ id: "cs_a" }));
    await fulfilSession(db, session({ id: "cs_b" }));

    expect(await balance(db, userId)).toBe(22);
    expect(await db.select().from(purchases)).toHaveLength(2);
  });

  it("passes the address a receipt should go to", async () => {
    const result = await fulfilSession(db, session());
    expect(result.outcome === "booked" && result.email).toBe("reader@example.com");
  });
});
