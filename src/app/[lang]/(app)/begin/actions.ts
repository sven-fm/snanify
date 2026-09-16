"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { currencyForCountry } from "@/lib/currency";
import { requireUser } from "@/lib/auth";
import { isTier } from "@/lib/packs";
import { createCheckout } from "@/lib/stripe";
import { SITE_ORIGIN, type FullLang as Lang } from "@/lib/locales";
import type { TierKey } from "@/content/prices";

/* ---------------------------------------------------------------------------
   Buying a pack.

   The tier arrives from a form, so it is a string from the open internet and
   is checked against the three that exist before it reaches Stripe.

   THE CURRENCY IS TAKEN FROM THE GEO HEADER AND FROM NOTHING THE BROWSER
   SENDS. The reader is shown one currency, chosen from their country by
   src/proxy.ts and written to a cookie for display. That cookie is the
   browser's to edit, and for a while this action read it first: set
   `snf-cur=INR` in devtools and sixty mornings cost twenty-five dollars. Now
   the charge follows `x-vercel-ip-country`, which Vercel writes and the
   browser cannot. Local development has no geo header and charges in US
   dollars, which is the default the page prints there too.

   THE RETURN ADDRESS IS THE SITE'S OWN. `success_url` used to be built from
   the Host header; in production it is `SITE_ORIGIN`, so a request carrying a
   forged host can never send a paid buyer somewhere else. Development keeps
   the local origin so the round trip works on localhost.

   REDIRECT IS THROWN, NOT RETURNED. `redirect()` works by throwing, so it sits
   outside any try that guards the Stripe call; otherwise the framework's own
   control flow is caught and reported as a failure to create a session.
   --------------------------------------------------------------------------- */

/** Where Stripe sends the buyer back to. */
async function origin(): Promise<string> {
  if (process.env.NODE_ENV === "production") return SITE_ORIGIN;
  const head = await headers();
  const host = head.get("x-forwarded-host") ?? head.get("host") ?? "localhost:3000";
  return `http://${host}`;
}

/**
 * Open a Checkout Session for a pack and send the buyer to it. Shared by the
 * Pay button and by /begin's own continuation after a sign-in (see
 * src/components/pages/Begin.tsx), so the two cannot price differently.
 */
export async function checkoutFor(lang: Lang, tier: TierKey, next: string): Promise<never> {
  const user = await requireUser(lang, next);

  const head = await headers();
  const currency = currencyForCountry(head.get("x-vercel-ip-country"));

  const url = await createCheckout({
    userId: user.id,
    email: user.email,
    tier,
    currency,
    lang,
    origin: await origin(),
  });

  redirect(url);
}

export async function startCheckout(lang: Lang, formData: FormData): Promise<void> {
  const tier = String(formData.get("tier") ?? "");
  if (!isTier(tier)) throw new Error(`unknown tier: ${tier}`);

  /* The return address after a sign-in carries the intent, and a short-lived
     cookie confirms it, so the buyer is sent on to Stripe without pressing
     Pay a second time. `go=1` is honoured by /begin only for a signed-in
     reader holding the cookie; see Begin.tsx. */
  const jar = await cookies();
  jar.set("snf-intent", tier, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 15,
  });
  await checkoutFor(lang, tier, `/begin?pack=${tier}&go=1`);
}
