import { timingSafeEqual } from "node:crypto";
import { and, eq, gt, sql } from "drizzle-orm";
import { db, users } from "@/db";
import { creditLedger } from "@/db/schema";
import { sendReminder } from "@/lib/email";
import { isDue, localDate, type Remindable } from "@/lib/reminders";
import { getLiveSnapshot } from "@/lib/riverdata";
import { getGhat } from "@/content/rivers";
import { waterName } from "@/content/names";
import { profiles } from "@/db/schema";
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The morning reminder, sent hourly to whoever is due.

   GITHUB RUNS THE CLOCK. A reminder that respects somebody's own hour has to
   be checked every hour, and a Vercel Hobby account allows one cron a day, so
   `vercel.json` carries no cron and .github/workflows/reminders.yml calls this
   endpoint on the hour with CRON_SECRET as a bearer token. Vercel Pro would
   let the schedule move back here in one line:

     "crons": [{ "path": "/api/cron/reminders", "schedule": "0 * * * *" }]

   The endpoint is idempotent per person per local day, so a late or repeated
   tick is harmless.

   IT SAYS WHAT THE RIVER IS DOING, and nothing else. No streak, no count, no
   day missed. The only true reason to open it is that the water is running the
   way it is running this morning, so that is the whole message.

   ONLY PEOPLE WITH A MORNING IN HAND. Somebody out of credits gets nothing:
   a reminder to sit that ends at a pack picker is an advertisement wearing a
   reminder's clothes.

   THE WRITE HAPPENS BEFORE THE SEND. `last_reminded_on` is set first, guarded
   on its own previous value, so two overlapping runs cannot both claim the
   same person. Losing a reminder to a failed send is better than sending two,
   and the next day's is unaffected either way.
   --------------------------------------------------------------------------- */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

function authorised(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const header = request.headers.get("authorization") ?? "";
  const expected = Buffer.from(`Bearer ${secret}`);
  const given = Buffer.from(header);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function GET(request: Request): Promise<Response> {
  if (!authorised(request)) return new Response("no", { status: 401 });

  const at = new Date();

  /* Everybody with a positive balance and a finished profile. The balance is
     a sum over the ledger, so it is computed here rather than stored. */
  const candidates = await db
    .select({
      id: users.id,
      email: users.email,
      tz: users.tz,
      locale: users.locale,
      reminderHour: users.reminderHour,
      reminderOn: users.reminderOn,
      lastRemindedOn: users.lastRemindedOn,
      waterSlug: profiles.waterSlug,
    })
    .from(users)
    .innerJoin(profiles, eq(profiles.userId, users.id))
    .where(
      and(
        eq(users.reminderOn, true),
        sql`${profiles.completedAt} is not null`,
        gt(
          sql`(select coalesce(sum(${creditLedger.delta}), 0) from ${creditLedger} where ${creditLedger.userId} = ${users.id})`,
          0,
        ),
      ),
    );

  const due = candidates.filter((person) =>
    isDue(
      {
        id: person.id,
        tz: person.tz,
        reminderHour: person.reminderHour,
        reminderOn: person.reminderOn,
        lastRemindedOn: person.lastRemindedOn,
      } satisfies Remindable,
      at,
    ),
  );

  if (due.length === 0) {
    return Response.json({ checked: candidates.length, sent: 0 });
  }

  const snapshot = await getLiveSnapshot();
  let sent = 0;

  for (const person of due) {
    const today = localDate(at, person.tz);

    /* Claim the day first. The guard on the previous value is what makes two
       overlapping runs safe: the second updates no rows and skips. */
    const claimed = await db
      .update(users)
      .set({ lastRemindedOn: today })
      .where(
        and(
          eq(users.id, person.id),
          person.lastRemindedOn === null
            ? sql`${users.lastRemindedOn} is null`
            : eq(users.lastRemindedOn, person.lastRemindedOn),
        ),
      )
      .returning({ id: users.id });

    if (claimed.length === 0) continue;

    const water = snapshot.waters.find((w) => w.slug === person.waterSlug);
    const ghat = getGhat(person.waterSlug);
    const lang: Lang = person.locale === "hi" ? "hi" : "en";

    try {
      const result = await sendReminder({
        to: person.email,
        lang,
        water: ghat ? waterName(ghat, "river", lang) : person.waterSlug,
        band: water?.discharge.kind === "modelled" ? water.discharge.percentile.band : "usual",
      });
      if (result.sent) sent += 1;
    } catch (error) {
      console.error("reminders: could not send to", person.id, error);
    }
  }

  return Response.json({ checked: candidates.length, due: due.length, sent });
}
