import { eq } from "drizzle-orm";
import { db, users } from "@/db";
import { verifyUnsubscribe } from "@/lib/unsubscribe";
import { parseLang, localePath, SITE_ORIGIN } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Stops the morning reminders for one person, from a link in the email.

   POST is what a mail client sends for List-Unsubscribe-Post (RFC 8058), with
   no body worth reading: it switches the reminders off and answers 200.

   GET is the link a person taps, and it WRITES NOTHING. Link scanners
   (Outlook's Safe Links and the like) fetch every link in a message before a
   person sees it, and a GET that switched the email off did so for people who
   never asked. So GET reads the person's edition off their row and sends them
   to /reminders/off, a public page where one button does the switching.

   Both need the signed token. A bad token is a 404 rather than a 403, so the
   URL says nothing about whether the id is real.
   --------------------------------------------------------------------------- */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function signed(request: Request): { userId: string; token: string } | null {
  const url = new URL(request.url);
  const userId = url.searchParams.get("u") ?? "";
  const token = url.searchParams.get("t") ?? "";
  return verifyUnsubscribe(userId, token) ? { userId, token } : null;
}

export async function GET(request: Request): Promise<Response> {
  const pair = signed(request);
  if (!pair) return new Response("not found", { status: 404 });

  const rows = await db
    .select({ locale: users.locale })
    .from(users)
    .where(eq(users.id, pair.userId))
    .limit(1);
  if (!rows[0]) return new Response("not found", { status: 404 });

  const lang = parseLang(rows[0].locale) ?? "en";
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_ORIGIN;
  const query = `u=${encodeURIComponent(pair.userId)}&t=${encodeURIComponent(pair.token)}`;

  return new Response(null, {
    status: 303,
    headers: {
      location: `${base}${localePath(lang, "/reminders/off")}?${query}`,
      "cache-control": "private, no-store",
      "referrer-policy": "no-referrer",
    },
  });
}

export async function POST(request: Request): Promise<Response> {
  const pair = signed(request);
  if (!pair) return new Response("not found", { status: 404 });

  await db.update(users).set({ reminderOn: false }).where(eq(users.id, pair.userId));

  return new Response("ok", { status: 200 });
}
