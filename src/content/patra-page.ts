import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   /p/[id], the Sankalp Patra.

   Two readers, two pages. The person who kept the morning, arriving straight
   from it, gets the sheet with their sankalp under it, the marigold press
   that sends it, links to save it and to print it, their next morning and
   the controls. Whoever they send it to, arriving cold in a family group,
   gets the sheet, one line saying what it is, and one press to start their
   own snan. Where the figures come from is said on /rivers and /faq.

   `shareText` is what lands in WhatsApp above the link. It says one true
   thing: somebody kept a sankalp with a named river on a named morning.
   --------------------------------------------------------------------------- */

const en = {
  share: "Send it to the family",
  shareCopied: "Link copied",
  /** The quiet link under the press: the image, to keep. */
  download: "Save the image",

  visitTitle: "Sit with your own river.",
  visitBody: "Three minutes, at the hour the panchang names. Wherever you are.",
  visitCta: "Start your own snan",

  shareText: "{name} kept a sankalp with the {water} on {date}.",
  metaTitle: "{name}, {water}, {date}",
  metaDescription: "A Sankalp Patra kept with the {water} at {ghat}, {city}, on {date}. Your own morning, at snanify.com.",

  privateTitle: "This sheet is private",
  privateBody: "The person who kept it has made it private.",

  ownerHeading: "This sheet",
  makePrivate: "Make it private",
  makePublic: "Make it shareable",
  privateNow: "Only you can open this link now.",
  privateWarning: "People you have already sent the image to keep it. Making it private stops the link.",
  /** The quiet link under the press: the sheet and the sankalp, on one page. */
  print: "Print the sheet",

  /** The owner's "what comes next". */
  next: {
    heading: "Your next morning",
    /** {hour} is "05:00", {tz} the IANA zone. */
    reminder: "Your morning email comes at {hour}, {tz} time.",
    account: "Your mornings and your register",
  },
};

const hi = {
  share: "परिवार को भेजिए",
  shareCopied: "कड़ी प्रतिलिपि हो गई",
  download: "चित्र सहेजिए",

  visitTitle: "अपनी नदी के साथ बैठिए।",
  visitBody: "पंचांग की बताई घड़ी पर तीन मिनट। आप जहाँ भी हों।",
  visitCta: "अपना स्नान शुरू कीजिए",

  shareText: "{name} ने {date} को {water} के साथ संकल्प रखा।",
  metaTitle: "{name}, {water}, {date}",
  metaDescription: "{date} को {ghat}, {city} पर {water} के साथ रखा गया एक संकल्प पत्र। अपनी सुबह, snanify.com पर।",

  privateTitle: "यह पत्र निजी है",
  privateBody: "जिन्होंने इसे रखा, उन्होंने इसे निजी कर दिया है।",

  ownerHeading: "यह पत्र",
  makePrivate: "इसे निजी कीजिए",
  makePublic: "इसे साझा योग्य कीजिए",
  privateNow: "अब यह कड़ी केवल आप खोल सकते हैं।",
  privateWarning: "जिन्हें आपने चित्र भेज दिया है, उनके पास वह रहता है। निजी करने से कड़ी बंद होती है।",
  print: "पत्र छापिए",

  next: {
    heading: "आपकी अगली सुबह",
    reminder: "आपका सुबह का ईमेल {hour} बजे आता है, {tz} के समय से।",
    account: "आपकी सुबहें और आपकी पंजिका",
  },
};

export const patraPageContent = { en, hi } satisfies Record<Lang, typeof en>;
