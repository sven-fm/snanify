import { sql } from "drizzle-orm";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import type { LedgerReason } from "@/db/schema";

/* ---------------------------------------------------------------------------
   Credits, which are the money.

   A credit is one morning. Buying a pack adds them, keeping a morning spends
   one, a refund gives one back. Everything here writes to an append-only
   ledger and the balance is SUM(delta): there is no counter to drift, and any
   argument about a missing morning is settled by reading the rows.

   THREE FAILURE MODES THIS FILE IS BUILT AROUND, all of them real.

   1. STRIPE DELIVERS TWICE. `checkout.session.completed` arrives more than
      once by design. The unique index on (reason, ref_id) means the second
      delivery inserts nothing, and `book` reports `booked: false` rather than
      throwing, so the webhook still answers 200 and Stripe stops retrying.

   2. THE PHONE RETRIES. A server action on a bad connection is submitted
      twice. The sitting id is the reference, so the second spend is the same
      row and costs nothing.

   3. TWO TABS, ONE CREDIT. Both read a balance of 1 and both try to spend it.
      This is the one that a plain `select sum(...)` guard inside the insert
      does NOT solve: under READ COMMITTED both statements see the same sum,
      both pass their check, and the balance goes to -1. There is no row for
      either to conflict on, so a unique index cannot help either.

      So every spend takes a row lock on the person first, with
      `SELECT ... FROM users WHERE id = $1 FOR UPDATE`, inside a transaction.
      The second spend blocks until the first commits, then reads the balance
      the first one left and is refused. One lock per person, held for the
      length of one insert, contended only by that same person's own tabs.

   Everything takes `db` as its first argument, so a test hands it a real
   Postgres and production hands it the Neon client. Nothing here reaches for a
   module-level connection. Passing a transaction is allowed and expected:
   minting a sitting books its credit inside the same transaction that writes
   the row, so a failed mint cannot charge anybody.
   --------------------------------------------------------------------------- */

/** Raised when a spend would take someone below zero. */
export class InsufficientCredits extends Error {
  constructor(userId: string) {
    super(`user ${userId} has no credit to spend`);
    this.name = "InsufficientCredits";
  }
}

/**
 * Any Drizzle Postgres connection: the Neon client in production, a
 * transaction passed down from a caller, or the in-process Postgres the tests
 * run against. Written against Drizzle's own base type rather than a
 * hand-rolled structural one, because `transaction` carries driver generics
 * that no structural type can satisfy in both directions.
 */
export type Db = PgDatabase<PgQueryResultHKT, Record<string, unknown>>;

export type Entry = {
  userId: string;
  delta: number;
  reason: LedgerReason;
  refId: string;
};

/** Drizzle returns `{ rows }` on some drivers and a bare array on others. */
function rowsOf(result: unknown): unknown[] {
  if (Array.isArray(result)) return result;
  const maybe = result as { rows?: unknown[] };
  return maybe.rows ?? [];
}

/** What someone may still spend. */
export async function balance(db: Db, userId: string): Promise<number> {
  const result = await db.execute(
    sql`select coalesce(sum(delta), 0)::int as balance
        from credit_ledger
        where user_id = ${userId}`,
  );
  const row = rowsOf(result)[0] as { balance: number | string } | undefined;
  return Number(row?.balance ?? 0);
}

/**
 * Write one ledger row, and return whether it was written.
 *
 * `{ booked: false }` means the row already existed, which is a redelivery and
 * not an error. `InsufficientCredits` means a negative delta would have taken
 * the balance below zero.
 *
 * Runs in a transaction and locks the person's row before reading their
 * balance. See failure mode 3 at the head of this file for why the obvious
 * version is wrong.
 */
export async function book(db: Db, entry: Entry): Promise<{ booked: boolean }> {
  return db.transaction(async (tx) => {
    const { userId, delta, reason, refId } = entry;

    /* Serialises this person's credit operations against each other. Taken
       before the balance is read, and held until this transaction commits. */
    await tx.execute(sql`select 1 from users where id = ${userId} for update`);

    if (delta < 0) {
      const current = await balance(tx, userId);

      /* A redelivery of a spend is still idempotent, so check for the existing
         row before refusing: a retried sitting must not raise just because the
         first attempt already brought the balance to zero. */
      if (current + delta < 0) {
        const seen = rowsOf(
          await tx.execute(
            sql`select 1 from credit_ledger
                where reason = ${reason} and ref_id = ${refId}
                limit 1`,
          ),
        );
        if (seen.length > 0) return { booked: false };
        throw new InsufficientCredits(userId);
      }
    }

    const inserted = rowsOf(
      await tx.execute(
        sql`insert into credit_ledger (user_id, delta, reason, ref_id)
            values (${userId}, ${delta}, ${reason}, ${refId})
            on conflict (reason, ref_id) do nothing
            returning id`,
      ),
    );

    return { booked: inserted.length > 0 };
  });
}

/**
 * Spend one credit on a morning, and return what is left.
 *
 * Idempotent on the sitting id: submitting the same morning twice costs one
 * credit, because the person only kept one morning.
 */
export async function spendForSitting(
  db: Db,
  userId: string,
  sittingId: string,
): Promise<number> {
  await book(db, { userId, delta: -1, reason: "sitting", refId: sittingId });
  return balance(db, userId);
}

/** Give a whole pack back. Used by a refund, keyed to the Stripe session. */
export async function refundPurchase(
  db: Db,
  userId: string,
  stripeSessionId: string,
  credits: number,
): Promise<{ booked: boolean }> {
  return book(db, {
    userId,
    delta: -credits,
    reason: "refund",
    refId: stripeSessionId,
  });
}
