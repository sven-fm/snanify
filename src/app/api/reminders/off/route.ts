import { eq } from "drizzle-orm";
import { db, users } from "@/db";
import { verifyUnsubscribe } from "@/lib/unsubscribe";
import { SITE_ORIGIN } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Stops the morning reminders for one person, from a link in the email.

   GET is the link a person taps; POST is what a mail client sends for
   List-Unsubscribe-Post (RFC 8058), with no body worth reading. Both need the
   signed token; both answer the same way. A bad token is a 404 rather than a
   403, so the URL says nothing about whether the id is real.
   --------------------------------------------------------------------------- */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function off(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const userId = url.searchParams.get("u") ?? "";
  const token = url.searchParams.get("t") ?? "";

  if (!verifyUnsubscribe(userId, token)) return new Response("not found", { status: 404 });

  await db.update(users).set({ reminderOn: false }).where(eq(users.id, userId));

  if (request.method === "POST") return new Response("ok", { status: 200 });

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_ORIGIN;
  return Response.redirect(`${base}/account?reminders=off`, 303);
}

export async function GET(request: Request): Promise<Response> {
  return off(request);
}

export async function POST(request: Request): Promise<Response> {
  return off(request);
}
