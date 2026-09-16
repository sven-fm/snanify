/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair; see the tier note at the top
   of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   /p/[id], the Sankalp Patra.

   Two readers, two pages. The person who kept the morning, arriving straight
   from it, gets the sheet, the send button, their own words and the controls.
   Whoever they send it to, arriving cold in a family group, gets the sheet,
   one line saying what it is, and the invitation. Neither page repeats what
   the sheet already says, and neither argues for it: the sheet carries its
   own record line and its own address, and /faq#verify has the rest.

   `shareText` is what lands in WhatsApp above the link. It says one true
   thing: somebody kept a sankalp with a named river on a named morning.
   --------------------------------------------------------------------------- */

const en = {
  share: "Send to family",
  shareCopied: "Link copied",

  yours: "Your sankalp",
  privateNote: "Only you see your sankalp. The sheet you send carries the names and the river.",

  /** One line under the sheet, for the record. Not a section. */
  recordLine: "The figures on this sheet are the river's published state that morning.",
  recordLink: "How to check them",

  visitTitle: "Sit with your own river tomorrow morning",
  visitBody: "Three minutes at the hour the panchang names, wherever you are.",
  visitCta: "Begin",

  shareText: "{name} kept a sankalp with the {water} on {date}.",
  metaTitle: "{name}, {water}, {date}",
  metaDescription: "A Sankalp Patra kept with the {water} at {ghat}, {city}, on {date}.",

  privateTitle: "This sheet is private",
  privateBody: "The person who kept it has made it private.",

  ownerHeading: "This sheet",
  makePrivate: "Make it private",
  makePublic: "Make it shareable",
  privateNow: "Only you can open this link now.",
  privateWarning: "People you have already sent the image to keep it. Making it private stops the link.",
  printHeading: "Print version",
  printNote: "A4, with your sankalp on it. This copy is for you.",
};

const hi = {
  share: "परिवार को भेजिए",
  shareCopied: "कड़ी प्रतिलिपि हो गई",

  yours: "आपका संकल्प",
  privateNote: "आपका संकल्प केवल आप देखते हैं। जो पत्र आप भेजते हैं, उस पर नाम और नदी होते हैं।",

  recordLine: "इस पत्र के अंक उस सुबह नदी की प्रकाशित स्थिति हैं।",
  recordLink: "इन्हें कैसे जाँचें",

  visitTitle: "कल सुबह अपनी नदी के साथ बैठिए",
  visitBody: "पंचांग की बताई घड़ी पर तीन मिनट, आप जहाँ भी हों।",
  visitCta: "आरंभ कीजिए",

  shareText: "{name} ने {date} को {water} के साथ संकल्प रखा।",
  metaTitle: "{name}, {water}, {date}",
  metaDescription: "{date} को {ghat}, {city} पर {water} के साथ रखा गया एक संकल्प पत्र।",

  privateTitle: "यह पत्र निजी है",
  privateBody: "जिन्होंने इसे रखा, उन्होंने इसे निजी कर दिया है।",

  ownerHeading: "यह पत्र",
  makePrivate: "इसे निजी कीजिए",
  makePublic: "इसे साझा योग्य कीजिए",
  privateNow: "अब यह कड़ी केवल आप खोल सकते हैं।",
  privateWarning: "जिन्हें आपने चित्र भेज दिया है, उनके पास वह रहता है। निजी करने से कड़ी बंद होती है।",
  printHeading: "छपाई के लिए",
  printNote: "ए-४, आपके संकल्प के साथ। यह प्रति आपके लिए है।",
};

export const patraPageContent = { en, hi } satisfies Record<Lang, typeof en>;
