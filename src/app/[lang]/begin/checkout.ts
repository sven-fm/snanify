import "server-only";
import { cookies, headers } from "next/headers";
import { alertOwner } from "@/lib/alert";
import { currencyForCountry } from "@/lib/currency";
import { adsAllowed } from "@/lib/meta";
import { CONSENT_COOKIE } from "@/lib/consent";
import { createCheckout } from "@/lib/stripe";
import { SITE_ORIGIN, localePath, type Lang } from "@/lib/locales";
import type { User } from "@/db";
import type { TierKey } from "@/content/prices";

/* ---------------------------------------------------------------------------
   Opening a Checkout Session, shared by the Pay button (actions.ts) and by the
   continuation after a sign-in (go/route.ts), so the two cannot price
   differently.

   A plain module rather than part of actions.ts on purpose: every export of a
   "use server" file is an endpoint, and this one takes a tier and a person as
   arguments that only the server may choose.

   THE CURRENCY IS TAKEN FROM THE GEO HEADER AND FROM NOTHING THE BROWSER
   SENDS. The reader is shown one currency, chosen from their country by
   src/proxy.ts and written to a cookie for display. That cookie is the
   browser's to edit, and for a while the charge read it first: set
   `snf-cur=INR` in devtools and sixty mornings cost twenty-five dollars. Now
   the charge follows `x-vercel-ip-country`, which Vercel writes and the
   browser cannot. Local development has no geo header and charges in US
   dollars, which is the default the page prints there too.

   THE RETURN ADDRESS IS THE SITE'S OWN. `success_url` used to be built from
   the Host header; in production it is `SITE_ORIGIN`, so a request carrying a
   forged host can never send a paid buyer somewhere else. Development keeps
   the local origin so the round trip works on localhost.

   A FAILURE COMES BACK AS A PLACE TO GO. Stripe down, a key missing, a price
   lookup key the catalogue script never wrote: each is logged, mailed to the
   owner, and answered with /begin carrying `error=pay`, where the page asks
   for one more press beside the buttons. The caller redirects, outside any
   try, because `redirect()` works by throwing.
   --------------------------------------------------------------------------- */

/** The short-lived cookie a Pay press leaves for the sign-in continuation. */
export const INTENT_COOKIE = "snf-intent";

/** Where Stripe sends the buyer back to. */
export async function origin(): Promise<string> {
  if (process.env.NODE_ENV === "production") return SITE_ORIGIN;
  const head = await headers();
  const host = head.get("x-forwarded-host") ?? head.get("host") ?? "localhost:3000";
  return `http://${host}`;
}

/** /begin with the pack still chosen and the line asking for another press. */
export function payErrorPath(lang: Lang, tier: TierKey): string {
  return `${localePath(lang, "/begin")}?pack=${tier}&error=pay`;
}

/**
 * The Stripe URL for this person and pack, or /begin with `error=pay` when
 * the session could not be opened. Never throws, never redirects.
 */
export async function checkoutTarget(lang: Lang, user: User, tier: TierKey): Promise<string> {
  try {
    const head = await headers();
    const country = head.get("x-vercel-ip-country");
    const currency = currencyForCountry(country);

    /* What Meta matches the purchase on, kept only where Meta may measure this
       buyer: a country that lets it, or a yes to the cookie notice. The
       webhook sends it through the Conversions API. */
    let meta: { fbp?: string; fbc?: string; ip?: string; ua?: string } | undefined;
    const jar = await cookies();
    if (adsAllowed(country) || jar.get(CONSENT_COOKIE)?.value === "yes") {
      meta = {
        fbp: jar.get("_fbp")?.value,
        fbc: jar.get("_fbc")?.value,
        ip: head.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
        ua: head.get("user-agent") ?? undefined,
      };
    }

    return await createCheckout({
      userId: user.id,
      email: user.email,
      tier,
      currency,
      lang,
      origin: await origin(),
      meta,
    });
  } catch (error) {
    console.error("pay: checkout not opened", tier, error);
    await alertOwner("pay: checkout not opened", error);
    return payErrorPath(lang, tier);
  }
}
