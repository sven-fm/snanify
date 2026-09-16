import "server-only";
import { emailContent } from "@/content/email";
import type { Currency } from "@/lib/currency";
import type { FullLang as Lang } from "@/lib/locales";
import type { TierKey } from "@/content/prices";
import type { FlowBand } from "@/lib/riverdata";
import { unsubscribeUrl } from "@/lib/unsubscribe";

/* ---------------------------------------------------------------------------
   The two emails this product sends: a receipt, and the morning reminder.

   RESEND, THROUGH SVEN'S OWN ACCOUNT. snanify.com is verified there already,
   so this reads RESEND_API_KEY rather than a marketplace-provisioned account
   that would have to verify the domain a second time.

   WHEN THERE IS NO KEY, NOTHING IS SENT AND NOTHING BREAKS. The message is
   logged and `sent: false` comes back. That is deliberate: local development
   and preview deployments should not need a mail credential, and the webhook
   must never fail a purchase because email was unavailable. The caller decides
   what to do with `sent`, and for the receipt the answer is nothing, because
   the credits are already booked.

   HTML IS DELIBERATELY PLAIN. One column, the site's colours, a rule, no
   images and no tracking pixel. Half these readers are on Gmail on Android at
   six in the morning, and a layout that survives that is a layout with almost
   nothing in it. Every message also carries a real text/plain part, because
   the text part is what a screen reader and a spam filter read.
   --------------------------------------------------------------------------- */

const FROM = "Snanify <snan@snanify.com>";
const REPLY_TO = "hello@snanify.com";

export type Sent = { sent: boolean; id?: string };

type Message = {
  to: string;
  subject: string;
  text: string;
  html: string;
  /** Extra mail headers, for the one-click unsubscribe on the reminder. */
  headers?: Record<string, string>;
};

/** Minor units and a currency, as the receipt prints them. */
function money(amountMinor: number, currency: string): string {
  const value = amountMinor / 100;
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  } catch {
    return `${value} ${currency}`;
  }
}

/** One column of paper and ink, and nothing that needs to load. */
function wrap(bodyHtml: string, footer: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f2ead9;padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#faf6ea;border:2px solid #16130f;">
<tr><td style="padding:28px 24px;font-family:Georgia,'Times New Roman',serif;color:#16130f;font-size:16px;line-height:1.7;">
${bodyHtml}
<div style="border-top:1px solid #c3b697;margin-top:28px;padding-top:14px;font-size:13px;color:#57513f;line-height:1.6;">${footer}</div>
</td></tr></table></body></html>`;
}

async function send(message: Message): Promise<Sent> {
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    console.info(`[email] not sent, no RESEND_API_KEY: "${message.subject}" to ${message.to}`);
    return { sent: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      reply_to: REPLY_TO,
      to: [message.to],
      subject: message.subject,
      text: message.text,
      html: message.html,
      headers: message.headers,
    }),
  });

  if (!response.ok) {
    throw new Error(`resend ${response.status}: ${await response.text()}`);
  }

  const body = (await response.json()) as { id?: string };
  return { sent: true, id: body.id };
}

export type ReceiptInput = {
  to: string;
  lang: Lang;
  tier: TierKey;
  credits: number;
  amountMinor: number;
  currency: Currency | string;
};

/** Sent once, from the webhook, after the credits are booked. */
export async function sendReceipt(input: ReceiptInput): Promise<Sent> {
  const t = emailContent[input.lang].receipt;
  const amount = money(input.amountMinor, input.currency);
  const line = t.line.replace("{credits}", String(input.credits)).replace("{amount}", amount);

  const text = [t.greeting, "", line, "", t.next, "", `${t.link} ${siteUrl(input.lang, "/today")}`]
    .join("\n");

  const html = wrap(
    `<p style="margin:0 0 18px;font-size:22px;">${t.greeting}</p>
     <p style="margin:0 0 14px;">${line}</p>
     <p style="margin:0 0 22px;">${t.next}</p>
     <p style="margin:0;"><a href="${siteUrl(input.lang, "/today")}" style="background:#b32620;color:#faf6ea;text-decoration:none;padding:12px 20px;display:inline-block;letter-spacing:0.06em;text-transform:uppercase;font-size:13px;">${t.cta}</a></p>`,
    t.footer,
  );

  return send({ to: input.to, subject: t.subject, text, html });
}

export type ReminderInput = {
  to: string;
  /** Whose reminder it is, so the unsubscribe link can be signed for them. */
  userId: string;
  lang: Lang;
  water: string;
  band: FlowBand;
};

/**
 * Sent by the hourly cron, at most once a day per person.
 *
 * ONE TAP STOPS THEM. The footer link and the List-Unsubscribe headers both
 * point at a signed URL that needs no sign-in (src/lib/unsubscribe.ts). Gmail
 * and Yahoo discount a daily sender without those headers, and a person who
 * wants fewer emails will not sign in to say so.
 */
export async function sendReminder(input: ReminderInput): Promise<Sent> {
  const t = emailContent[input.lang].reminder;
  const subject = t.subject.replace("{water}", input.water);
  const line = t.lines[input.band].replace("{water}", input.water);
  const off = unsubscribeUrl(input.userId);

  const text = [
    line,
    "",
    `${t.link} ${siteUrl(input.lang, "/today")}`,
    "",
    `${t.stop}: ${off}`,
    t.footer,
  ].join("\n");

  const html = wrap(
    `<p style="margin:0 0 18px;font-size:22px;">${subject}</p>
     <p style="margin:0 0 22px;">${line}</p>
     <p style="margin:0;"><a href="${siteUrl(input.lang, "/today")}" style="background:#b32620;color:#faf6ea;text-decoration:none;padding:12px 20px;display:inline-block;letter-spacing:0.06em;text-transform:uppercase;font-size:13px;">${t.cta}</a></p>`,
    `<a href="${off}" style="color:#57513f;">${t.stop}</a>. ${t.footer}`,
  );

  return send({
    to: input.to,
    subject,
    text,
    html,
    headers: {
      "List-Unsubscribe": `<${off}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });
}

/** An absolute URL, because an email has no origin to be relative to. */
function siteUrl(lang: Lang, path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.snanify.com";
  const prefix = lang === "en" ? "" : `/${lang}`;
  return `${base}${prefix}${path}`;
}
