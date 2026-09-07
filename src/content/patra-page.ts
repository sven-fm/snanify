/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair; see the tier note at the top
   of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   /p/[id], the Sankalp Patra.

   Two readers, one page. The person who kept the morning, arriving straight
   from it, and whoever they send it to, arriving cold in a family group. The
   copy is written for the second: nothing assumes you know what this is, and
   nothing explains at length either. A sheet, a name, a river, a date.

   `shareText` is what lands in WhatsApp above the link. It is the strongest
   claim on the whole product and it is exactly true: somebody kept a sankalp
   with a named river on a named morning.
   --------------------------------------------------------------------------- */

const en = {
  eyebrow: "Sankalp Patra",
  keptBy: "Kept in the name of",
  share: "Send this",
  shareCopied: "Link copied",
  download: "Save the sheet",
  print: "Print it",
  yours: "Your own words",
  privateNote: "Your sankalp is on your copy alone.",

  registerHeading: "What this sheet records",
  flow: "Flow",
  ranked: "Ranked",
  kept: "Kept at",
  tithi: "Tithi",
  nakshatra: "Nakshatra",
  source: "Source",

  seedHeading: "Check it yourself",
  seedBody:
    "The engraving is drawn from this seed, and the seed is the SHA-256 of the line below. Fetch that day's figure from the flood model, hash the line, redraw it, and you get this same image.",
  seedLabel: "Seed",

  visitTitle: "The river you are from, tomorrow morning.",
  visitBody: "Three minutes with a real river, wherever you are.",
  visitCta: "Begin",

  shareText: "{name} kept a sankalp with the {water} on {date}.",
  metaTitle: "{name} · {water} · {date}",
  metaDescription: "A Sankalp Patra kept with the {water} at {ghat}, {city}, on {date}.",

  privateTitle: "This sheet is private.",
  privateBody: "Whoever kept it has not made it public.",
};

const hi = {
  eyebrow: "संकल्प पत्र",
  keptBy: "जिनके नाम से",
  share: "यह भेजिए",
  shareCopied: "कड़ी प्रतिलिपि हो गई",
  download: "पत्र सहेजिए",
  print: "छापिए",
  yours: "आपके अपने शब्द",
  privateNote: "आपका संकल्प केवल आपकी प्रति पर है।",

  registerHeading: "यह पत्र क्या दर्ज करता है",
  flow: "प्रवाह",
  ranked: "स्थान",
  kept: "समय",
  tithi: "तिथि",
  nakshatra: "नक्षत्र",
  source: "स्रोत",

  seedHeading: "स्वयं जाँच लीजिए",
  seedBody:
    "उत्कीर्णन इस बीज से बना है, और बीज नीचे दी गई पंक्ति का SHA-256 है। उस दिन का अंक बाढ़-मॉडल से लीजिए, पंक्ति का हैश बनाइए, फिर से बनाइए, और यही चित्र मिलेगा।",
  seedLabel: "बीज",

  visitTitle: "जिस नदी से आप हैं, कल सुबह।",
  visitBody: "एक सच्ची नदी के साथ तीन मिनट, आप जहाँ भी हों।",
  visitCta: "आरंभ करें",

  shareText: "{name} ने {date} को {water} के साथ संकल्प रखा।",
  metaTitle: "{name} · {water} · {date}",
  metaDescription: "{date} को {ghat}, {city} पर {water} के साथ रखा गया एक संकल्प पत्र।",

  privateTitle: "यह पत्र निजी है।",
  privateBody: "जिन्होंने इसे रखा, उन्होंने इसे सार्वजनिक नहीं किया।",
};

export const patraPageContent = { en, hi } satisfies Record<Lang, typeof en>;
