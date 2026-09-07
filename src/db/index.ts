import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

/* ---------------------------------------------------------------------------
   The one database connection.

   Neon over HTTP rather than a socket pool: every query here is a handful of
   rows behind a request that already went over the network, and the HTTP
   driver has no pool to exhaust and no connection to leak when a serverless
   invocation is frozen mid-flight.

   THE ONE THING TO KNOW. `neon-http` cannot hold a transaction open across
   round trips, so `db.transaction()` on this driver sends the statements as
   one batch. That is enough for everything in src/lib/credits.ts, which does
   its own locking inside a single transaction, and it is why nothing in this
   codebase reads a value, thinks about it in JavaScript, and writes it back
   inside a transaction. Any logic that needs that shape belongs in SQL.

   The client is created once per module load and reused across invocations on
   the same warm instance.
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

export const db = drizzle(neon(connectionString()), { schema });

export type Database = typeof db;

export * from "@/db/schema";
