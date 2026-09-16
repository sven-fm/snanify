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
  steps: ["Your water", "Your sheet", "Your mornings"],
  setLine: "Your sheet is set. This is it, with your names on it and the river as it runs today.",
  lede: "Pick how many.",
  lede2: "You pay once, and the mornings stay on your account until you use them.",
  cancelled: "The payment was cancelled. Pick a pack when you are ready.",
  perLabel: "per morning",
  countLabel: "Mornings",
  cta: "Pay {price}",
  opening: "Opening Stripe",
  /* One line under each pack, written for this page's one job. */
  blurb: {
    one: "To see what it is like.",
    eleven: "One for each morning. Any eleven days you like.",
    sixty: "Five a month for a year.",
  },
  usual: "Most people take this one",
  note: "Stripe handles the payment.",
  refund: "Mornings you have not used are refunded on request.",
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
    title: "आरंभ कीजिए | Snanify",
    description:
      "ग्यारह सुबहें ग्यारह में, आपकी अपनी मुद्रा में। एक पैक चुनिए और अपना पत्र एक बार तय कीजिए।",
  },
  title: "अपनी सुबहें चुनिए",
  steps: ["आपका जल", "आपका पत्र", "आपकी सुबहें"],
  setLine: "आपका पत्र तय है। यह रहा, आपके नामों के साथ और आज की नदी के साथ।",
  lede: "कितनी चाहिए, यह चुनिए।",
  lede2: "भुगतान एक बार होता है, और सुबहें आपके खाते में तब तक रहती हैं जब तक आप उन्हें लेते हैं।",
  cancelled: "भुगतान रद्द हो गया। जब तैयार हों, एक पैक चुन लीजिए।",
  perLabel: "प्रति सुबह",
  countLabel: "सुबहें",
  cta: "{price} का भुगतान कीजिए",
  opening: "Stripe खुल रहा है",
  blurb: {
    one: "यह देखने के लिए कि यह कैसा है।",
    eleven: "हर सुबह के लिए एक। कोई भी ग्यारह दिन।",
    sixty: "महीने में पाँच, पूरे वर्ष।",
  },
  usual: "अधिकतर लोग यही लेते हैं",
  note: "भुगतान Stripe संभालता है।",
  refund: "जो सुबहें आपने नहीं लीं, वे कहने पर लौटा दी जाती हैं।",
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
