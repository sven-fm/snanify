/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair; see the tier note at the top
   of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   /begin, the pack picker, and /begin/done, the moment after paying.

   This page is read by somebody who has already decided. It does not sell
   again, it does not re-explain the practice, and it carries no second
   argument for the price. Three packs, one marked, and a button on each.

   The eleven is marked because eleven mornings for eleven is the whole hook,
   and a picker with nothing marked makes the reader do work the page should
   have done.
   --------------------------------------------------------------------------- */

const en = {
  meta: {
    title: "Begin · Snanify",
    description:
      "Eleven mornings for eleven, one for each morning, in your own currency. Pick a pack and set up your sheet once.",
  },
  eyebrow: "Begin",
  title: "Take your mornings.",
  lede: "Pick how many. They sit on your account until you use them, and nothing renews itself.",
  cancelled: "That went nowhere. Pick again whenever you are ready.",
  perLabel: "Each morning",
  countLabel: "Mornings",
  cta: "Take these",
  note: "Card details go to Stripe and never to us. Prices show before local tax.",
  haveCredits: "You already have {credits} in hand.",
  toToday: "Sit this morning",

  done: {
    title: "Your mornings are yours.",
    waiting: "Stripe is confirming the payment.",
    waitingNote: "This takes a few seconds. The page moves on by itself.",
    slow: "Your receipt will arrive by email, and your mornings will be on your account.",
    toAccount: "Your mornings",
  },
};

const hi = {
  meta: {
    title: "आरंभ करें · Snanify",
    description:
      "ग्यारह सुबहें ग्यारह में, हर सुबह के लिए एक, आपकी अपनी मुद्रा में। एक पैक चुनिए और अपना पत्र एक बार तय कीजिए।",
  },
  eyebrow: "आरंभ",
  title: "अपनी सुबहें लीजिए।",
  lede: "कितनी, यह चुनिए। जब तक आप उन्हें लेते नहीं, वे आपके खाते में रहती हैं, और कुछ भी अपने आप नवीनीकृत नहीं होता।",
  cancelled: "वह अधूरा रह गया। जब तैयार हों, फिर चुन लीजिए।",
  perLabel: "प्रति सुबह",
  countLabel: "सुबहें",
  cta: "ये लीजिए",
  note: "कार्ड का विवरण Stripe तक जाता है, हम तक कभी नहीं। मूल्य स्थानीय कर से पहले के हैं।",
  haveCredits: "आपके पास पहले से {credits} शेष हैं।",
  toToday: "आज सुबह बैठिए",

  done: {
    title: "आपकी सुबहें अब आपकी हैं।",
    waiting: "Stripe भुगतान की पुष्टि कर रहा है।",
    waitingNote: "इसमें कुछ ही क्षण लगते हैं। पृष्ठ स्वयं आगे बढ़ जाएगा।",
    slow: "आपकी रसीद ईमेल पर आ जाएगी, और आपकी सुबहें आपके खाते में होंगी।",
    toAccount: "आपकी सुबहें",
  },
};

export const beginContent = { en, hi } satisfies Record<Lang, typeof en>;
