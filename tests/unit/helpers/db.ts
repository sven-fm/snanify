import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import * as schema from "@/db/schema";

/**
 * A real Postgres for a test, compiled to WebAssembly and run in this process.
 *
 * The alternative was mocking the database, which would have tested nothing
 * that matters here: the credit ledger's guarantees are unique indexes and
 * transactions, and a mock has neither. This runs the committed migration, so
 * a test failing here is a constraint that would have failed in production.
 */
export type TestDb = ReturnType<typeof drizzle<typeof schema>>;

export async function freshDb(): Promise<TestDb> {
  const client = new PGlite();
  const db = drizzle(client, { schema });
  await migrate(db, { migrationsFolder: "./src/db/migrations" });
  return db;
}

/** A person to hang rows off. */
export async function seedUser(db: TestDb, id = "user_test"): Promise<string> {
  await db.insert(schema.users).values({ id, email: `${id}@example.com` });
  return id;
}
