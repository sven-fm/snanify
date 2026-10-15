import type { Lang } from "@/lib/locales";

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
  /* Beside the Pay buttons after a press that came back unopened. */
  payError: "Press Pay once more to open the payment page.",
  /* For a reader sent from /today or /account with every morning kept. */
  outLine: "Your mornings are all kept. Choose your next ones.",
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
    /* The tab title, true before and after the booking. */
    meta: "Your mornings | Snanify",
    title: "Your mornings are on your account",
    /* The pack, by its count, once it is booked. */
    booked: {
      one: "One morning is on your account.",
      eleven: "Eleven mornings are on your account.",
      sixty: "Sixty mornings are on your account.",
    },
    haveNow: "You now have {n} mornings to sit.",
    haveNowOne: "You now have one morning to sit.",
    toToday: "Sit this morning",
    toSetup: "Set up your sheet",
    waiting: "Stripe is confirming the payment",
    waitingNote: "This takes a few seconds. The page moves on by itself.",
    slow: "Stripe is still confirming. Your receipt arrives by email, and your mornings land on your account within a few minutes.",
    /* A bank debit or a voucher: paid, and cleared later by the bank. */
    bank: "Your bank is confirming the payment",
    bankNote: "Bank payments take a little longer. Your mornings arrive on your account the moment it clears, with a receipt by email.",
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
  payError: "भुगतान पृष्ठ खोलने के लिए भुगतान का बटन एक बार फिर दबाइए।",
  outLine: "आपकी सभी सुबहें पूरी हुईं। अब अगली सुबहें चुनिए।",
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
    meta: "आपकी सुबहें | Snanify",
    title: "आपकी सुबहें आपके खाते में हैं",
    booked: {
      one: "एक सुबह आपके खाते में आ गई है।",
      eleven: "ग्यारह सुबहें आपके खाते में आ गई हैं।",
      sixty: "साठ सुबहें आपके खाते में आ गई हैं।",
    },
    haveNow: "अब आपके पास बैठने के लिए {n} सुबहें हैं।",
    haveNowOne: "अब आपके पास बैठने के लिए एक सुबह है।",
    toToday: "आज सुबह बैठिए",
    toSetup: "अपना पत्र तय कीजिए",
    waiting: "Stripe भुगतान की पुष्टि कर रहा है",
    waitingNote: "इसमें कुछ ही क्षण लगते हैं। पृष्ठ स्वयं आगे बढ़ जाएगा।",
    slow: "Stripe अभी पुष्टि कर रहा है। आपकी रसीद ईमेल पर आएगी, और कुछ ही मिनट में सुबहें आपके खाते में होंगी।",
    bank: "आपका बैंक भुगतान की पुष्टि कर रहा है",
    bankNote: "बैंक से भुगतान में थोड़ा अधिक समय लगता है। भुगतान पूरा होते ही सुबहें आपके खाते में आ जाएँगी, और रसीद ईमेल पर।",
    toAccount: "अपना खाता खोलिए",
  },
};

export const beginContent = { en, hi } satisfies Record<Lang, typeof en>;
