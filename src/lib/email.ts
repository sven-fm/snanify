import "server-only";
import { emailContent } from "@/content/email";
import type { Currency } from "@/lib/currency";
import type { Lang } from "@/lib/locales";
import type { TierKey } from "@/content/prices";
import type { FlowBand } from "@/lib/riverdata";
import { unsubscribeUrl } from "@/lib/unsubscribe";
import { formatMoney } from "@/lib/mornings";
import { PALETTE } from "@/lib/palette";

const P = PALETTE.day;

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

   HTML IS DELIBERATELY PLAIN. One column, the site's colours, the mauli
   thread over the footer, no images and no tracking pixel. Half these readers are on Gmail on Android at
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

/** Text set into HTML. An address is the reader's own, but it is still text. */
function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/**
 * The mauli thread over the footer: a vermillion thread over a dashed haldi
 * one, as the site draws it, here as two borders rather than an image, so it
 * needs nothing to load and survives every mail client that keeps a border.
 */
const MAULI = `<div style="margin-top:30px;border-top:3px solid ${P.sindoor};"></div><div style="margin-top:2px;border-top:2px dashed ${P.haldi};"></div>`;

/** The one button in a message: vermillion, sentence case, untracked. */
function button(href: string, label: string): string {
  return `<a href="${href}" style="background:${P.sindoor};color:${P.paper};text-decoration:none;padding:13px 22px;display:inline-block;font-size:16px;font-weight:bold;">${label}</a>`;
}

/** One column of paper and ink, and nothing that needs to load. The sheet is
    flat paper on the page's own ground, with no box drawn round it. */
function wrap(bodyHtml: string, footer: string): string {
  return `<!doctype html><html><body style="margin:0;background:${P.paper2};padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:${P.paper};">
<tr><td style="padding:30px 26px;font-family:Georgia,'Times New Roman',serif;color:${P.ink};font-size:16px;line-height:1.7;">
${bodyHtml}
${MAULI}
<div style="padding-top:14px;font-size:13px;color:${P.ink2};line-height:1.6;">${footer}</div>
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

/** Something broke that the owner should hear about today. Plain text. */
export async function sendAlert(subject: string, text: string): Promise<Sent> {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return send({
    to: REPLY_TO,
    subject: `[snanify] ${subject}`,
    text,
    html: wrap(`<pre style="white-space:pre-wrap;font:13px/1.5 Menlo,Consolas,monospace;margin:0;">${escaped}</pre>`, "Sent by the site itself, from the place the error was caught."),
  });
}

export type ReceiptInput = {
  /** The address the receipt goes to, which is the one the account signs in with. */
  to: string;
  lang: Lang;
  /** Names the pack in the subject and the first line. */
  tier: TierKey;
  credits: number;
  amountMinor: number;
  currency: Currency | string;
};

/**
 * Sent once, from the webhook, after the credits are booked. The pack in the
 * first line, one button to /today, the sign-in address, and /account.
 */
export async function sendReceipt(input: ReceiptInput): Promise<Sent> {
  const t = emailContent[input.lang].receipt;
  const amount = formatMoney(input.amountMinor, input.currency, "en-IN");
  const line = t.line.replace("{amount}", amount);
  const today = siteUrl(input.lang, "/today");
  const account = siteUrl(input.lang, "/account");
  const greeting = t.greeting[input.tier];
  const signIn = t.signIn.replace("{email}", input.to);

  const text = [
    greeting,
    "",
    line,
    "",
    t.next,
    "",
    `${t.link} ${today}`,
    "",
    signIn,
    `${t.account} ${account}`,
  ].join("\n");

  const html = wrap(
    `<p style="margin:0 0 18px;font-size:22px;">${greeting}</p>
     <p style="margin:0 0 14px;">${line}</p>
     <p style="margin:0 0 22px;">${t.next}</p>
     <p style="margin:0 0 22px;">${button(today, t.cta)}</p>
     <p style="margin:0 0 6px;">${escapeHtml(signIn)}</p>
     <p style="margin:0;">${t.account} <a href="${account}" style="color:${P.ink};">${account.replace(/^https?:\/\//, "")}</a></p>`,
    t.footer,
  );

  return send({ to: input.to, subject: t.subject[input.tier], text, html });
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
  /* The river's state is the reason to open it, so it is the subject and
     the first line, and the invitation follows. */
  const state = t.lines[input.band].replace("{water}", input.water);
  const subject = state.replace(/[.।]$/, "");
  const off = unsubscribeUrl(input.userId);

  const text = [
    state,
    t.invite,
    "",
    `${t.link} ${siteUrl(input.lang, "/today")}`,
    "",
    `${t.stop}: ${off}`,
    t.footer,
  ].join("\n");

  const html = wrap(
    `<p style="margin:0 0 14px;font-size:24px;line-height:1.3;">${state}</p>
     <p style="margin:0 0 24px;">${t.invite}</p>
     <p style="margin:0;">${button(siteUrl(input.lang, "/today"), t.cta.replace("{water}", input.water))}</p>`,
    `<a href="${off}" style="color:${P.ink2};">${t.stop}</a>. ${t.footer}`,
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
