"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  CURRENCY_COOKIE,
  currencyForCountry,
  DEFAULT_CURRENCY,
  type Currency,
} from "@/lib/currency";
import { requireUser } from "@/lib/auth";
import { isTier } from "@/lib/packs";
import { createCheckout } from "@/lib/stripe";
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Buying a pack.

   The tier arrives from a form, so it is a string from the open internet and
   is checked against the three that exist before it reaches Stripe.

   THE CURRENCY IS TAKEN FROM THE SERVER, NOT THE FORM. The reader is shown one
   currency, chosen from their country by src/proxy.ts. A hidden form field
   naming it would let anybody buy sixty mornings at the rupee price by editing
   the page, so the cookie the proxy wrote is read here instead, with the geo
   header as the fallback when there is no cookie yet.

   REDIRECT IS THROWN, NOT RETURNED. `redirect()` works by throwing, so it sits
   outside any try that guards the Stripe call; otherwise the framework's own
   control flow is caught and reported as a failure to create a session.
   --------------------------------------------------------------------------- */

function readCurrency(cookieValue: string | undefined, country: string | null): Currency {
  const fromCookie = cookieValue?.toUpperCase();
  if (
    fromCookie === "USD" ||
    fromCookie === "EUR" ||
    fromCookie === "CAD" ||
    fromCookie === "INR"
  ) {
    return fromCookie;
  }
  return currencyForCountry(country) ?? DEFAULT_CURRENCY;
}

export async function startCheckout(lang: Lang, formData: FormData): Promise<void> {
  const tier = String(formData.get("tier") ?? "");
  if (!isTier(tier)) throw new Error(`unknown tier: ${tier}`);

  const user = await requireUser(lang, `/begin?pack=${tier}`);

  const [jar, head] = await Promise.all([cookies(), headers()]);
  const currency = readCurrency(jar.get(CURRENCY_COOKIE)?.value, head.get("x-vercel-ip-country"));

  const host = head.get("x-forwarded-host") ?? head.get("host") ?? "www.snanify.com";
  const local = host.startsWith("localhost") || host.startsWith("127.");

  const url = await createCheckout({
    userId: user.id,
    email: user.email,
    tier,
    currency,
    lang,
    origin: `${local ? "http" : "https"}://${host}`,
  });

  redirect(url);
}
