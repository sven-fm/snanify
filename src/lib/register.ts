import { count, desc, eq } from "drizzle-orm";
import { sittings } from "@/db/schema";
import type { Db } from "@/lib/credits";
import { numberRegister } from "@/lib/mornings";

/** How many rows /account shows. Older mornings stay counted, not listed. */
export const REGISTER_LIMIT = 100;

/**
 * The register on /account, newest first, numbered. Pre-v3 rows (morningNo
 * null) are numbered by their place in the person's whole history, so the
 * total is a count of every sitting, not of the rows loaded: past the cap, a
 * list-length total would renumber the newest morning as the hundredth.
 */
export async function loadRegister(db: Db, userId: string, limit = REGISTER_LIMIT) {
  const [rows, [{ total }]] = await Promise.all([
    db
      .select({
        id: sittings.id,
        keptOn: sittings.keptOn,
        waterSlug: sittings.waterSlug,
        morningNo: sittings.morningNo,
      })
      .from(sittings)
      .where(eq(sittings.userId, userId))
      .orderBy(desc(sittings.keptAt))
      .limit(limit),
    db.select({ total: count() }).from(sittings).where(eq(sittings.userId, userId)),
  ]);
  return numberRegister(rows, Number(total));
}
