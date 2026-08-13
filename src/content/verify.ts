/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair and not the twelve locales the
   site serves; see the tier note at the top of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/**
 * Copy for /verify.
 *
 * No Patra has been issued, so verification cannot return a real result yet.
 * The page says exactly that rather than presenting a search box that silently
 * fails, an inert lookup on the page that argues we do not overclaim would be
 * self-defeating.
 *
 * TWO REPAIRS, August 2026.
 *
 * The Hindi `statusBody` said the page would start accepting identifiers "पहला
 * अनुष्ठान संपन्न और रिकॉर्ड होने पर", once the first rite is performed and
 * recorded. That claims both a performed rite and a recording of one, which is
 * rule one and rule two of this repo broken in a single clause, in the edition
 * most likely to be read by someone who would take it literally. It now says
 * what the English says: once the first Jal Chihna exists.
 *
 * Both editions were also cut by about a third. The lines that justified the
 * page to a critic went ("we would rather show you an empty room than a search
 * box that pretends to look"); the lines that tell a holder what a check
 * returns stayed, in full, because that list is the contract.
 */
const en = {
  eyebrow: "Verification",
  title: "Check a Jal Chihna.",
  lede: "Every Jal Chihna carries the reading it was made from. Anyone holding it can recompute the mark from public river data and get the identical image, without seeing what was asked for.",

  contractTitle: "What a check returns",
  shows: {
    heading: "Shown",
    items: [
      "A masked name, R••••• S•••••",
      "The river and the ghat",
      "The instant the mark was kept",
      "The river reading it was made from, and the agency that published it",
      "The seed, so anyone can recompute the image",
    ],
  },
  hides: {
    heading: "Never shown",
    items: [
      "The sankalp itself, the intention is private, always",
      "The full name, gotra, or any family member's name",
      "The email address or any contact detail",
      "Anything about payment",
    ],
  },

  statusTitle: "Not yet live",
  statusBody:
    "No Jal Chihna has been kept yet, so there is nothing to check. This page accepts an identifier once the first one exists.",

  idLabel: "What an identifier looks like",
  idNote:
    "22 characters, unguessable, printed on the Patra and part of its verification link. Holding the identifier is what grants access, so keep it off a public page.",

  sampleCta: "See a specimen Patra",
  patraCta: "How the Patra works",
};

const hi: typeof en = {
  eyebrow: "सत्यापन",
  title: "जल चिह्न जाँचें।",
  lede: "हर जल चिह्न पर वही पाठ अंकित होता है जिससे वह बना। जिसके पास वह है, वह सार्वजनिक नदी-आँकड़ों से चिह्न पुनः गणना कर वही चित्र पा सकता है, यह जाने बिना कि क्या माँगा गया था।",

  contractTitle: "जाँच में क्या मिलता है",
  shows: {
    heading: "दिखाया जाता है",
    items: [
      "ढका हुआ नाम, र••••• स•••••",
      "नदी और घाट",
      "जिस क्षण चिह्न रखा गया",
      "वह नदी-पाठ जिससे चिह्न बना, और उसे प्रकाशित करने वाली संस्था",
      "बीज, ताकि कोई भी चित्र की पुनः गणना कर सके",
    ],
  },
  hides: {
    heading: "कभी नहीं दिखाया जाता",
    items: [
      "संकल्प स्वयं, मनोकामना सदैव निजी रहती है",
      "पूरा नाम, गोत्र, या किसी पारिवारिक सदस्य का नाम",
      "ईमेल या कोई संपर्क विवरण",
      "भुगतान से जुड़ी कोई बात",
    ],
  },

  statusTitle: "अभी उपलब्ध नहीं",
  statusBody:
    "अभी तक कोई जल चिह्न नहीं बना है, इसलिए जाँचने को कुछ नहीं है। पहला जल चिह्न बनते ही यह पृष्ठ पहचान-संख्या स्वीकार करने लगेगा।",

  idLabel: "पहचान-संख्या कैसी दिखती है",
  idNote:
    "22 अक्षर, जिनका अनुमान नहीं लगाया जा सकता, पत्र पर छपे और उसके सत्यापन-लिंक का भाग। पहुँच पहचान-संख्या रखने से मिलती है, इसलिए इसे सार्वजनिक पृष्ठ पर न रखें।",

  sampleCta: "नमूना पत्र देखें",
  patraCta: "पत्र कैसे काम करता है",
};

export const verifyContent = { en, hi } satisfies Record<Lang, typeof en>;

/** Shape only, deliberately not a real identifier. */
export const EXAMPLE_ID_SHAPE = "pT4mKq9RxB2vLh6nYeW3dU";
