/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair; see the tier note at the top
   of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The line at the top of every page while the product is still opening.

   IT LEADS WITH WHAT IS ALREADY TRUE. The rivers, the panchang and the
   calendar are live, real and free right now, and that is most of what a first
   visitor came to see. The banner says that first and mentions the opening
   second, which is the same rule the rest of the site is written under: state
   what the thing is and does, never open on what it is not.

   REMOVING IT IS ONE EDIT. `SHOW_BANNER` below. It comes out the day the
   production Stripe keys and the Clerk production instance land, and nothing
   else has to change.
   --------------------------------------------------------------------------- */

export const SHOW_BANNER = true;

const en = {
  text: "The rivers, the panchang and the muhurat calendar are free to read now. The snan opens soon.",
  short: "Free to read now. The snan opens soon.",
};

const hi = {
  text: "नदियाँ, पंचांग और मुहूर्त-पंचांग अभी निःशुल्क पढ़े जा सकते हैं। स्नान शीघ्र आरंभ होगा।",
  short: "अभी निःशुल्क पढ़िए। स्नान शीघ्र।",
};

export const bannerContent = { en, hi } satisfies Record<Lang, typeof en>;
