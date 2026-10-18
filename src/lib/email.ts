import "server-only";
import { emailContent } from "@/content/email";
import type { Currency } from "@/lib/currency";
import { SITE_ORIGIN, type Lang } from "@/lib/locales";
import type { TierKey } from "@/content/prices";
import type { FlowBand } from "@/lib/riverdata";
import { unsubscribeUrl } from "@/lib/unsubscribe";
import { formatMoney } from "@/lib/mornings";
import { GAUGE_FILLS, PALETTE } from "@/lib/palette";
import { flowContent } from "@/content/flow";
import { gaugeModel } from "@/lib/gauge";
import { ordinal } from "@/lib/ordinal";

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

   HTML IS DELIBERATELY PLAIN. One column set in Georgia (a mail client will
   not load Eczar), the site's colours, tables for anything with a border
   (box-shadow is unreliable in mail), two images hosted on the site (the logo
   above, the river above the footer, both from scripts/email-art.mjs) and no
   tracking pixel. Half these readers are on Gmail on Android at six in the
   morning, and a layout that survives that is a layout with almost nothing in
   it. Every message also carries a real text/plain part, because
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

/** The site's origin, for the two images: an email has nothing to be relative to. */
const IMAGES = `${SITE_ORIGIN}/email`;

/** The river, 600 x 120, above the footer. It replaces the old mauli border. */
const RIVER = `<img src="${IMAGES}/river-600x120.png" width="600" height="120" alt="" style="display:block;width:100%;max-width:600px;height:auto;border:0;margin-top:30px;">`;

/** The press: a sindoor cell with a 4px ink right and bottom border (a box-shadow
    does not survive mail), sentence case, naming the river. */
function button(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0;"><tr><td bgcolor="${P.sindoor}" style="background:${P.sindoor};border-right:4px solid ${P.ink};border-bottom:4px solid ${P.ink};"><a href="${href}" style="color:${P.paper};text-decoration:none;padding:13px 22px;display:inline-block;font-family:Georgia,'Times New Roman',serif;font-size:17px;font-weight:bold;">${label}</a></td></tr></table>`;
}

/** The headline: bold capitals in English, the river's name in sindoor. Hindi has
    no capitals, so it keeps its own case and the same weight. */
function headline(lang: Lang, template: string, water: string): string {
  const cased = (text: string) => (lang === "en" ? text.toUpperCase() : text);
  const [before, after = ""] = template.split("{water}");
  return `${cased(escapeHtml(before))}<span style="color:${P.sindoor};">${cased(escapeHtml(water))}</span>${cased(escapeHtml(after))}`;
}

/** One column of paper and ink. The logo over it, the river above the footer. */
function wrap(bodyHtml: string, footer: string): string {
  return `<!doctype html><html><body style="margin:0;background:${P.paper2};padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:${P.paper};">
<tr><td style="padding:26px 26px 0;font-family:Georgia,'Times New Roman',serif;color:${P.ink};font-size:16px;line-height:1.7;">
<img src="${IMAGES}/logo-480.png" width="240" height="56" alt="Snanify" style="display:block;border:0;height:auto;margin:0 0 22px;">
${bodyHtml}
</td></tr>
<tr><td style="padding:0;">${RIVER}</td></tr>
<tr><td style="padding:14px 26px 26px;font-family:Georgia,'Times New Roman',serif;font-size:13px;color:${P.ink2};line-height:1.6;">${footer}</td></tr>
</table></body></html>`;
}

/** The gauge as a five-cell table: the same 1:2:4:2:1 cut as the page, the
    band the river is in marked "today", and no cell marked when the feed is quiet. */
function gaugeTable(percentile: number | null, todayLabel: string): string {
  const model = gaugeModel(percentile);
  const cells = model.segments
    .map((seg, i) => {
      const width = Math.round((seg.to - seg.from) * 100);
      const today = seg.band === model.band;
      return `<td data-cell="${seg.band}"${today ? ' data-today="true"' : ""} width="${width}%" bgcolor="${GAUGE_FILLS.day[i]}" align="center" style="width:${width}%;background:${GAUGE_FILLS.day[i]};border:2px solid ${P.ink};height:26px;line-height:26px;font-size:15px;color:${P.ink};">${today ? "&#9679;" : "&nbsp;"}</td>`;
    })
    .join("");
  const labels = model.segments
    .map((seg) => `<td align="center" style="font-size:12px;line-height:20px;color:${P.ink};font-weight:bold;">${seg.band === model.band ? todayLabel : "&nbsp;"}</td>`)
    .join("");
  return `<table data-gauge="river" role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;table-layout:fixed;"><tr>${cells}</tr><tr>${labels}</tr></table>`;
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
     <div style="margin:0 0 22px;">${button(today, t.cta)}</div>
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
  /** Where today's figure ranks since 1997, 0 to 100; null when the feed is quiet. */
  percentile: number | null;
  /** Today's modelled discharge in m³/s; null when the feed is quiet. */
  cumecs: number | null;
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
  const quiet = input.percentile === null;
  const state = quiet ? t.quiet.replace("{water}", input.water) : t.lines[input.band].replace("{water}", input.water);
  const subject = state.replace(/[.।]$/, "");
  const off = unsubscribeUrl(input.userId);
  const today = siteUrl(input.lang, "/today");
  const flow = flowContent[input.lang];
  /* The plain sentence and the figure speak of today, so a quiet feed prints
     neither: it says the usual level for the season and stops. */
  const stateWord = quiet ? flow.stateMedian : flow.state[input.band];
  const plain = quiet ? "" : flow.plain[input.band];
  const figure =
    quiet || input.cumecs === null
      ? ""
      : flow.proof
          .replace("{flow}", `${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(input.cumecs)} m³/s`)
          .replace("{n}", ordinal(Math.round(input.percentile as number), input.lang));

  const text = [
    state,
    stateWord + (plain ? `. ${plain}` : ""),
    figure,
    t.invite,
    "",
    `${t.link} ${today}`,
    "",
    `${t.stop}: ${off}`,
    t.footer,
  ]
    .filter((line, i, all) => line !== "" || all[i - 1] !== "")
    .join("\n");

  const html = wrap(
    `<h1 style="margin:0 0 16px;font-size:30px;line-height:1.15;font-weight:bold;letter-spacing:0.01em;">${headline(input.lang, t.headline, input.water)}</h1>
     <p style="margin:0 0 4px;font-size:22px;font-weight:bold;line-height:1.3;">${escapeHtml(stateWord)}</p>
     ${plain ? `<p style="margin:0 0 18px;">${escapeHtml(plain)}</p>` : '<div style="height:14px;"></div>'}
     ${gaugeTable(input.percentile, t.today)}
     ${figure ? `<p style="margin:8px 0 0;font-size:13px;color:${P.ink2};">${escapeHtml(figure)}</p>` : ""}
     <p style="margin:22px 0 20px;">${t.invite}</p>
     <div style="margin:0;">${button(today, t.cta.replace("{water}", input.water))}</div>`,
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
