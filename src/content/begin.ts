/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair; see the tier note at the top
   of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   /begin, the pack picker, and /begin/done, the moment after paying.

   This page is read by somebody who has already decided. It sells nothing a
   second time and explains nothing again. Three packs, the eleven marked, and
   a button on each that says what it does: pay.

   `{price}` in `cta` is filled with the pack's own price at render, in the
   reader's currency, so the button and the charge always agree.
   --------------------------------------------------------------------------- */

const en = {
  meta: {
    title: "Begin | Snanify",
    description:
      "Eleven mornings for eleven, in your own currency. Pick a pack and set up your sheet once.",
  },
  title: "Choose your mornings",
  lede: "Pick how many. You pay once, and they stay on your account until you use them.",
  cancelled: "The payment was cancelled. Pick a pack when you are ready.",
  perLabel: "per morning",
  countLabel: "Mornings",
  cta: "Pay {price}",
  note: "Stripe handles the payment. Prices show before local tax.",
  haveCredits: "You already have {credits} mornings on your account.",
  haveOne: "You already have one morning on your account.",
  toToday: "Sit this morning",

  done: {
    title: "Your mornings are on your account",
    waiting: "Stripe is confirming the payment",
    waitingNote: "This takes a few seconds. The page moves on by itself.",
    slow: "Stripe is still confirming. Your receipt arrives by email, and your mornings land on your account within a few minutes.",
    toAccount: "Open your account",
  },
};

const hi = {
  meta: {
    title: "आरंभ करें | Snanify",
    description:
      "ग्यारह सुबहें ग्यारह में, आपकी अपनी मुद्रा में। एक पैक चुनिए और अपना पत्र एक बार तय कीजिए।",
  },
  title: "अपनी सुबहें चुनिए",
  lede: "कितनी चाहिए, यह चुनिए। भुगतान एक बार होता है, और सुबहें आपके खाते में तब तक रहती हैं जब तक आप उन्हें लेते हैं।",
  cancelled: "भुगतान रद्द हो गया। जब तैयार हों, एक पैक चुन लीजिए।",
  perLabel: "प्रति सुबह",
  countLabel: "सुबहें",
  cta: "{price} का भुगतान कीजिए",
  note: "भुगतान Stripe संभालता है। मूल्य स्थानीय कर से पहले के हैं।",
  haveCredits: "आपके खाते में पहले से {credits} सुबहें हैं।",
  haveOne: "आपके खाते में पहले से एक सुबह है।",
  toToday: "आज सुबह बैठिए",

  done: {
    title: "आपकी सुबहें आपके खाते में हैं",
    waiting: "Stripe भुगतान की पुष्टि कर रहा है",
    waitingNote: "इसमें कुछ ही क्षण लगते हैं। पृष्ठ स्वयं आगे बढ़ जाएगा।",
    slow: "Stripe अभी पुष्टि कर रहा है। आपकी रसीद ईमेल पर आएगी, और कुछ ही मिनट में सुबहें आपके खाते में होंगी।",
    toAccount: "अपना खाता खोलिए",
  },
};

export const beginContent = { en, hi } satisfies Record<Lang, typeof en>;
