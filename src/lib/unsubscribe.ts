import { createHmac, timingSafeEqual } from "node:crypto";
import { SITE_ORIGIN } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The one-click way out of the reminders.

   Every reminder carries a link that stops them for the person it was sent
   to, with no sign-in, because a sign-in is the one thing somebody who wants
   fewer emails will not do. The link names the person and carries an HMAC of
   their id under CRON_SECRET, so it cannot be minted for anybody else. It is
   the same URL Gmail and Yahoo call from the List-Unsubscribe headers.
   --------------------------------------------------------------------------- */

function key(): string {
  const secret = process.env.CRON_SECRET;
  if (!secret) throw new Error("CRON_SECRET is missing; the unsubscribe link cannot be signed");
  return secret;
}

export function unsubscribeToken(userId: string): string {
  return createHmac("sha256", key()).update(`reminders:${userId}`).digest("base64url");
}

export function unsubscribeUrl(userId: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_ORIGIN;
  return `${base}/api/reminders/off?u=${encodeURIComponent(userId)}&t=${unsubscribeToken(userId)}`;
}

export function verifyUnsubscribe(userId: string, token: string): boolean {
  if (!userId || !token) return false;
  const expected = Buffer.from(unsubscribeToken(userId));
  const given = Buffer.from(token);
  return given.length === expected.length && timingSafeEqual(given, expected);
}
