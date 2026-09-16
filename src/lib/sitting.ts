import "server-only";
import { and, eq } from "drizzle-orm";
import { db, profiles, sittings, type Sitting } from "@/db";
import { balance, book, InsufficientCredits } from "@/lib/credits";
import { newId } from "@/lib/ids";
import { seedFor } from "@/lib/seed";
import { greatCircleKm } from "@/lib/distance";
import { getLiveSnapshot, istDate, type WaterState } from "@/lib/riverdata";
import { readSky } from "@/lib/sky";
import { getGhat } from "@/content/rivers";
import { asInstant } from "@/content/muhurat";
import { riverSlice, seedDay, seedFigure, skySlice } from "@/lib/patra-record";
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Minting a morning.

   Called once, at the start of the last limb, so the row exists even if the
   tab is closed while the mark is drawing. Everything the sheet will ever
   print is copied onto the row here.

   ONE MORNING PER WATER PER LOCAL DAY. The unique index on
   (user, water, kept_on) is what enforces it, not a query beforehand: two
   submissions racing each other both pass a check and only one passes an
   index. A second submission returns the morning that already exists rather
   than an error, because from the person's side they kept one morning.

   THE CREDIT AND THE ROW GO TOGETHER. Both are written inside one
   transaction, so a failed insert cannot leave somebody charged, and a failed
   charge cannot leave a free morning. The ledger's own idempotency means a
   retried mint spends nothing extra.

   THE LOCAL DAY IS THEIRS, NOT INDIA'S. Somebody in Toronto sitting at six in
   the morning is on the previous IST date, and their register should read the
   day they lived. The river's day stays IST, because that is the day the model
   published for, and the two are printed separately on the sheet.
   --------------------------------------------------------------------------- */

export type Minted =
  | { outcome: "kept"; sitting: Sitting; creditsLeft: number }
  | { outcome: "already"; sitting: Sitting }
  | { outcome: "no-credit" }
  | { outcome: "no-profile" };

/** The civil date in somebody's own zone, "2026-08-11". */
export function localDate(at: Date, tz: string): string {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(at);
  } catch {
    return istDate(at);
  }
}

export async function mintSitting({
  userId,
  tz,
  lang,
  at = new Date(),
  from = null,
}: {
  userId: string;
  tz: string;
  lang: Lang;
  at?: Date;
  /** The request's coordinates, for the distance printed on the sheet. */
  from?: readonly [number, number] | null;
}): Promise<Minted> {
  const profileRows = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, userId))
    .limit(1);

  const profile = profileRows[0];
  if (!profile?.completedAt) return { outcome: "no-profile" };

  const keptOn = localDate(at, tz);

  const existing = await db
    .select()
    .from(sittings)
    .where(
      and(
        eq(sittings.userId, userId),
        eq(sittings.waterSlug, profile.waterSlug),
        eq(sittings.keptOn, keptOn),
      ),
    )
    .limit(1);

  if (existing[0]) return { outcome: "already", sitting: existing[0] };

  const snapshot = await getLiveSnapshot();
  const water = snapshot.waters.find((w) => w.slug === profile.waterSlug);
  if (!water) throw new Error(`no live state for ${profile.waterSlug}`);

  const ghat = getGhat(profile.waterSlug);
  /* The sun is computed at the ghat's own coordinates, which is why Brahma
     muhurat genuinely differs between Haridwar and Nashik. */
  const sky = readSky({
    instant: asInstant(at.toISOString()),
    coordinates: ghat
      ? {
          lat: water.gauge.ghat[0],
          lon: water.gauge.ghat[1],
          elevationM: water.gauge.elevationM,
        }
      : null,
  });

  const river = riverSlice(water as WaterState);
  const id = newId();
  const seed = await seedFor({
    sittingId: id,
    waterSlug: profile.waterSlug,
    modelledFor: seedDay(river, istDate(at)),
    discharge: seedFigure(river),
  });

  try {
    await db.transaction(async (tx) => {
      await book(tx, { userId, delta: -1, reason: "sitting", refId: id });

      await tx.insert(sittings).values({
        id,
        userId,
        waterSlug: profile.waterSlug,
        keptAt: at,
        keptTz: tz,
        keptOn,
        locale: lang,
        river,
        sky: skySlice(sky, water as WaterState),
        seed,
        names: profile.names,
        prayerId: profile.prayerId,
        portraitKey: profile.portraitKey,
        sankalpText: profile.sankalpText,
        distanceKm: from ? Math.round(greatCircleKm(from, water.gauge.ghat) / 10) * 10 : null,
      });
    });
  } catch (error) {
    if (error instanceof InsufficientCredits) return { outcome: "no-credit" };

    /* Two tabs finished the same morning at once. The index refused the
       second, which is exactly right: return the one that was kept. */
    const raced = await db
      .select()
      .from(sittings)
      .where(
        and(
          eq(sittings.userId, userId),
          eq(sittings.waterSlug, profile.waterSlug),
          eq(sittings.keptOn, keptOn),
        ),
      )
      .limit(1);

    if (raced[0]) return { outcome: "already", sitting: raced[0] };
    throw error;
  }

  const kept = await db.select().from(sittings).where(eq(sittings.id, id)).limit(1);

  /* Drawn now, so the share button has a file to attach rather than a render
     to wait for. It is deliberately not inside the transaction: a sheet that
     fails to draw must not undo a morning somebody kept, and the image route
     draws one on demand when this has not run. */
  const { storeSheet } = await import("@/lib/patra-store");
  const imageKey = await storeSheet(kept[0]);

  return {
    outcome: "kept",
    sitting: imageKey ? { ...kept[0], imageKey } : kept[0],
    creditsLeft: await balance(db, userId),
  };
}

/** Today's sitting for this person and water, if they already kept one. */
export async function sittingToday(
  userId: string,
  waterSlug: string,
  tz: string,
  at = new Date(),
): Promise<Sitting | null> {
  const rows = await db
    .select()
    .from(sittings)
    .where(
      and(
        eq(sittings.userId, userId),
        eq(sittings.waterSlug, waterSlug),
        eq(sittings.keptOn, localDate(at, tz)),
      ),
    )
    .limit(1);

  return rows[0] ?? null;
}
