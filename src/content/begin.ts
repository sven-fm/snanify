import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   /begin, the pack picker, and /begin/done, the moment after paying.

   This page is read by somebody who has already decided. It says the offer
   once, in the v3 voice (spec 7.2), and shows three packs: eleven on the
   label with the one press, one and sixty as plain rows whose links pay.

   `{price}` in `cta` is filled with the pack's own price at render, in the
   reader's currency, so the button and the charge always agree.
   --------------------------------------------------------------------------- */

const en = {
  meta: {
    title: "Begin | Snanify",
    description:
      "Eleven mornings. Your first one today. Set up your sheet once, then pick your mornings.",
  },
  /* The headline in capitals, then its second sentence in sindoor (spec 7.2). */
  title: "Pick your mornings.",
  sub: "Eleven for eleven.",
  /* For rupee readers: eleven mornings cost ₹501, so the line names it. */
  subInr: "Eleven mornings for {price:eleven}.",
  /* The band: the one thing to know before paying. */
  band: "Pay once. Use them any morning you like.",
  steps: ["Your water", "Your sheet", "Your mornings"],
  setLine: "Your sheet is set. Here it is, with your names on it.",
  cancelled: "The payment stopped at Stripe. Pick your mornings when you are ready.",
  /* Beside the Pay buttons after a press that came back unopened. */
  payError: "Press Pay once more to open the payment page.",
  /* For a reader sent from /today or /account with every morning kept. */
  outLine: "You kept every morning. Pick your next ones.",
  perLabel: "a morning",
  cta: "Pay {price}",
  opening: "Opening Stripe",
  /* One line under each pack, written for this page's one job. */
  blurb: {
    one: "Try one morning first.",
    eleven: "Any eleven mornings you like.",
    sixty: "Five a month for a year.",
  },
  note: "Stripe handles the payment.",
  refund: "Unused mornings are refunded on request.",
  haveCredits: "You already have {credits} mornings on your account.",
  haveOne: "You already have one morning on your account.",
  toToday: "Do your snan this morning",

  done: {
    /* The tab title, true before and after the booking. */
    meta: "Your mornings | Snanify",
    title: "Your mornings are ready",
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
    title: "शुरू कीजिए | Snanify",
    description:
      "ग्यारह सुबहें। पहली आज ही। अपना पत्र एक बार तैयार कीजिए, फिर अपनी सुबहें चुनिए।",
  },
  title: "अपनी सुबहें चुनिए।",
  sub: "ग्यारह सुबहें, ग्यारह में।",
  subInr: "ग्यारह सुबहें {price:eleven} में।",
  band: "एक बार भुगतान कीजिए। फिर जिस सुबह चाहें, स्नान कीजिए।",
  steps: ["आपका जल", "आपका पत्र", "आपकी सुबहें"],
  setLine: "आपका पत्र तैयार है। यह रहा, आपके नामों के साथ।",
  cancelled: "भुगतान Stripe पर रुक गया। जब तैयार हों, अपनी सुबहें चुनिए।",
  payError: "भुगतान पृष्ठ खोलने के लिए भुगतान का बटन एक बार फिर दबाइए।",
  outLine: "आपने हर सुबह निभाई। अब अगली सुबहें चुनिए।",
  perLabel: "प्रति सुबह",
  cta: "{price} का भुगतान कीजिए",
  opening: "Stripe खुल रहा है",
  blurb: {
    one: "पहले एक सुबह आज़माइए।",
    eleven: "कोई भी ग्यारह सुबहें, जब आप चाहें।",
    sixty: "महीने में पाँच, पूरे वर्ष।",
  },
  note: "भुगतान Stripe संभालता है।",
  refund: "बची हुई सुबहें कहने पर लौटा दी जाती हैं।",
  haveCredits: "आपके खाते में पहले से {credits} सुबहें हैं।",
  haveOne: "आपके खाते में पहले से एक सुबह है।",
  toToday: "आज सुबह स्नान कीजिए",

  done: {
    meta: "आपकी सुबहें | Snanify",
    title: "आपकी सुबहें तैयार हैं",
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
