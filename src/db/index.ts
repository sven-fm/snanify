import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "@/db/schema";

/* ---------------------------------------------------------------------------
   The one database connection.

   NEON OVER WEBSOCKET, NOT OVER HTTP, AND THE REASON MATTERS.

   The HTTP driver is the obvious choice for serverless: no pool, no connection
   to leak when an invocation is frozen, one round trip per query. It was the
   first thing here, and it was wrong, because it does not support transactions
   at all. It does not degrade or batch them; `db.transaction()` throws "No
   transactions support in neon-http driver" the moment it is called.

   That is fatal for src/lib/credits.ts, which takes `SELECT ... FOR UPDATE` on
   the person's row before reading their balance. Without it, two tabs spending
   the last credit both read a balance of 1, both pass their check, and the
   balance goes to -1: there is no row for them to conflict on, so no unique
   index can save it. A lock needs a transaction, and a transaction needs a
   session, so the driver is the WebSocket one.

   The bug was invisible in tests, which run against Postgres in process, and
   invisible in review. It surfaced the first time a real webhook was delivered
   to a running server, which is the argument for delivering one before launch
   rather than after.

   The pool is created once per module load and reused across invocations on a
   warm instance.
   --------------------------------------------------------------------------- */

function connectionString(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is missing. Run `vercel env pull .env.local` to fetch it from Neon.",
    );
  }
  return url;
}

const pool = new Pool({ connectionString: connectionString() });

export const db = drizzle(pool, { schema });

export type Database = typeof db;

export * from "@/db/schema";
