/* ---------------------------------------------------------------------------
   The reader's answer to the cookie notice, and whether Meta may load.

   TWO COOKIES DECIDE IT. `snf-ads` comes from src/proxy.ts on every response:
   "1" where the law lets Meta measure without asking (src/lib/meta.ts), "ask"
   in the EU, the EEA, the UK and Switzerland and wherever the country is
   unknown. `snf-consent` is the reader's own answer, "yes" or "no", written by
   the banner and by the choice on /privacy. The notice appears only where the
   proxy says "ask" and the reader has not answered, so a reader in New York
   never sees it.

   An answer lasts six months, then the notice asks again, which is how long
   the European regulators expect a consent to stand.

   Client-side only: the server reads the same cookies through next/headers in
   src/app/[lang]/begin/actions.ts.
   --------------------------------------------------------------------------- */

import { ADS_COOKIE } from "@/lib/meta";

export const CONSENT_COOKIE = "snf-consent";
export const CONSENT_EVENT = "snf-consent";
const SIX_MONTHS = 60 * 60 * 24 * 182;

export type Consent = "yes" | "no";

/** Whether Meta may load, from the two cookie values. */
export function metaMayLoad(ads: string | undefined, consent: string | undefined): boolean {
  if (ads === "1") return true;
  return ads === "ask" && consent === "yes";
}

/** Whether this reader is owed the notice: in a country that asks, and unanswered. */
export function noticeOwed(ads: string | undefined, consent: string | undefined): boolean {
  return ads === "ask" && consent !== "yes" && consent !== "no";
}

export function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}

export function readAds(): string | undefined {
  return readCookie(ADS_COOKIE);
}

export function readConsent(): Consent | undefined {
  const v = readCookie(CONSENT_COOKIE);
  return v === "yes" || v === "no" ? v : undefined;
}

/** Record the answer and tell the pixel and every open notice at once. */
export function setConsent(value: Consent): void {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${SIX_MONTHS}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
