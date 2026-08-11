import type { Lang } from "@/lib/content";

/**
 * Copy for /verify.
 *
 * No Patra has been issued, so verification cannot return a real result yet.
 * The page says exactly that rather than presenting a search box that silently
 * fails, an inert lookup on the page that argues we do not overclaim would be
 * self-defeating.
 */
const en = {
  eyebrow: "Verification",
  title: "Check a Sankalp Patra.",
  lede: "Every Sankalp Patra carries an identifier. Anyone holding it can confirm that the rite behind it was actually performed, without ever seeing what was asked for.",

  contractTitle: "What a check returns",
  shows: {
    heading: "Shown",
    items: [
      "A masked name, R••••• S•••••",
      "The river and the ghat",
      "The date the rite was performed",
      "The officiant's name",
      "The Naam Kshan, the second at which the name was spoken aloud",
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
    "No Sankalp Patra has been issued, so there is nothing to check. This page will accept an identifier once the first rite has been performed and recorded. We would rather show you an empty room than a search box that pretends to look.",

  idLabel: "What an identifier looks like",
  idNote:
    "22 characters, unguessable. It is printed on the Patra and forms part of its verification link. Certificates are unlisted by default, holding the identifier is what grants access, so it is not something to post publicly.",

  sampleCta: "See a specimen Patra",
  patraCta: "How the Patra works",
};

const hi: typeof en = {
  eyebrow: "सत्यापन",
  title: "संकल्प पत्र जाँचें।",
  lede: "हर संकल्प पत्र पर एक पहचान-संख्या होती है। जिसके पास वह है, वह पुष्ट कर सकता है कि अनुष्ठान वास्तव में संपन्न हुआ, यह जाने बिना कि क्या माँगा गया था।",

  contractTitle: "जाँच में क्या मिलता है",
  shows: {
    heading: "दिखाया जाता है",
    items: [
      "ढका हुआ नाम, र••••• स•••••",
      "नदी और घाट",
      "जिस दिन अनुष्ठान संपन्न हुआ",
      "पुरोहित का नाम",
      "नाम-क्षण, वह क्षण जब नाम स्वर में पढ़ा गया",
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
    "अभी तक कोई संकल्प पत्र जारी नहीं हुआ है, इसलिए जाँचने को कुछ नहीं है। पहला अनुष्ठान संपन्न और रिकॉर्ड होने पर यह पृष्ठ पहचान-संख्या स्वीकार करने लगेगा। हम आपको खाली कक्ष दिखाना बेहतर मानते हैं, बनिस्बत ऐसे खोज-बक्से के जो खोजने का केवल दिखावा करे।",

  idLabel: "पहचान-संख्या कैसी दिखती है",
  idNote:
    "22 अक्षर, जिनका अनुमान नहीं लगाया जा सकता। यह पत्र पर छपी होती है और उसके सत्यापन-लिंक का भाग बनती है। पत्र स्वतः असूचीबद्ध रहते हैं, पहुँच पहचान-संख्या रखने से मिलती है, इसलिए इसे सार्वजनिक रूप से साझा न करें।",

  sampleCta: "नमूना पत्र देखें",
  patraCta: "पत्र कैसे काम करता है",
};

export const verifyContent = { en, hi } satisfies Record<Lang, typeof en>;

/** Shape only, deliberately not a real identifier. */
export const EXAMPLE_ID_SHAPE = "pT4mKq9RxB2vLh6nYeW3dU";
