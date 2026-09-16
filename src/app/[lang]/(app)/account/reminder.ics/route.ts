import { currentUser } from "@/lib/auth";
import { localePath, SITE_ORIGIN, type FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The reminder hour as a calendar file: one daily event at the person's
   own hour, in their own zone, with the link to this morning in it. A phone
   calendar is the one alarm nobody switches off, and it needs no email to
   arrive.

   The path has a dot in it, so src/proxy.ts must not skip it: it is not one
   of the files in public/, so the locale rewrite carries it here and Clerk's
   session is read on the way.
   --------------------------------------------------------------------------- */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string }> },
): Promise<Response> {
  const lang = ((await params).lang === "hi" ? "hi" : "en") as Lang;
  const user = await currentUser(lang);
  if (!user) return new Response("sign in first", { status: 401 });

  const now = new Date();
  const stamp = now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const start = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(user.reminderHour)}0000`;
  const url = `${SITE_ORIGIN}${localePath(lang, "/today")}`;
  const title = lang === "hi" ? "स्नान" : "The snan";
  const body = lang === "hi" ? "अपनी नदी के साथ तीन मिनट।" : "Three minutes with your river.";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Snanify//Reminder//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:snan-${user.id}@snanify.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${user.tz}:${start}`,
    "DURATION:PT5M",
    "RRULE:FREQ=DAILY",
    `SUMMARY:${title}`,
    `DESCRIPTION:${body} ${url}`,
    `URL:${url}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${title}`,
    "TRIGGER:PT0M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new Response(ics, {
    headers: {
      "content-type": "text/calendar; charset=utf-8",
      "content-disposition": 'attachment; filename="snanify.ics"',
      "cache-control": "private, no-store",
    },
  });
}
