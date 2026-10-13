import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The cookie notice, shown only in the EU, the EEA, the UK and Switzerland
   (src/lib/consent.ts), and the choice on /privacy that changes the answer.

   One sentence on what the cookie does and one on what stays with us. Accept
   and Decline carry the same weight and sit side by side: the regulators ask
   that saying no be as easy as saying yes, and a notice that leans on one
   button reads as a trick.
   --------------------------------------------------------------------------- */

const en = {
  label: "Cookie notice",
  text: "May we use Meta's cookie to learn which of our ads bring people here? Your sankalp, your names and your photograph stay with us.",
  accept: "Accept",
  decline: "Decline",
  more: "Privacy",
  /* The choice on /privacy. */
  choice: {
    title: "Your choice",
    yes: "You accepted Meta's cookie.",
    no: "You declined Meta's cookie.",
    unset: "You have yet to choose.",
    accept: "Accept",
    decline: "Decline",
  },
};

const hi: typeof en = {
  label: "कुकी सूचना",
  text: "क्या हम Meta की कुकी से जान सकते हैं कि हमारे कौन-से विज्ञापन लोगों को यहाँ लाते हैं? आपका संकल्प, आपके नाम और आपका चित्र हमारे पास रहते हैं।",
  accept: "स्वीकार",
  decline: "अस्वीकार",
  more: "गोपनीयता",
  choice: {
    title: "आपका चुनाव",
    yes: "आपने Meta की कुकी स्वीकार की है।",
    no: "आपने Meta की कुकी अस्वीकार की है।",
    unset: "आपका चुनाव अभी बाक़ी है।",
    accept: "स्वीकार",
    decline: "अस्वीकार",
  },
};

export const consentContent = { en, hi } satisfies Record<Lang, typeof en>;
