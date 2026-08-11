import type { Lang } from "@/lib/content";

/* ---------------------------------------------------------------------------
   The Sankalp Patra, copy, document labels, and the specimen record.

   Two things live here:

   1. `patraContent`, every user-facing string on /patra and /patra/sample,
      keyed by locale. `hi` is checked against the shape of `en`, so a missing
      translation is a compile error rather than an English word in a Hindi
      page.
   2. `specimenPatra()`, the invented record rendered on /patra/sample.
      EVERY value in it is PLACEHOLDER. The names are the placeholder names of
      the Sanskrit grammarians (Devadatta, Yajnadatta, the equivalents of
      "John Doe"); the ritvik ID is all zeros; the tithi was not computed from
      any panchang; the identifier is not issued against anything. The sample
      page states all of this in the UI, and the document itself is watermarked.
   --------------------------------------------------------------------------- */

/* ---------------------------------- data ---------------------------------- */

export type PatraNameEntry = {
  /** The name in Latin script, as the yajaman wrote it. */
  latin: string;
  /** The same name in Devanagari, where it was given or transliterated. */
  devanagari?: string;
  /** Already-localised relation label ("father" / "पिता"). Ordering only. */
  relation?: string;
  /** Offered in remembrance of someone who has passed. Changes the label only. */
  remembrance?: boolean;
};

export type PatraData = {
  /** 22-character base58. Unguessable, so a patra is link-shareable. */
  patraId: string;
  names: PatraNameEntry[];
  /** Omitted when the family does not use one, the sheet then prints "Not stated". */
  gotra?: string;
  /** The yajaman's own words. Printed on their copy; never returned by /verify. */
  sankalpText?: string;
  river: string;
  ghat: string;
  place: string;
  /** Gregorian date the rite was performed, already formatted for the locale. */
  performedOn: string;
  /** The window in India Standard Time. */
  performedIst: string;
  /** The same moment in the timezone the yajaman was keeping. */
  performedLocal?: string;
  /**
   * Printed only when `confidence === "sourced"`. An unsourced tithi is
   * omitted from the document entirely rather than guessed.
   */
  tithi?: { label: string; confidence: "sourced" | "provisional" };
  /** Whoever actually performed the rite. Absent until a real person consents. */
  ritvik?: { name: string; id?: string };
  /** The second at which the name is spoken aloud in the recording. */
  naamKshan?: { timecode: string; clock?: string };
  issuedOn: string;
  /** Displayed without a scheme, it is read off paper as often as clicked. */
  verifyUrl: string;
};

/* --------------------------------- copy ----------------------------------- */

const en = {
  meta: {
    title: "The Sankalp Patra, what you receive",
    description:
      "The Sankalp Patra records who a rite was offered for, which water it was performed in, the hour it was performed, and the second the name was spoken. See a watermarked specimen and how anyone can verify one.",
  },
  sampleMeta: {
    title: "A specimen Sankalp Patra",
    description:
      "A full, watermarked specimen of the Sankalp Patra. Every value on it is invented, the names are placeholder names and the identifier is not issued against anything.",
  },

  hero: {
    eyebrow: "The Sankalp Patra",
    title: "The record of what was done.",
    lede: "Every snan ends in one document. It names the person the rite was offered for, the water it was performed in, the hour it was performed, and the second the name was spoken aloud. It is the record of an act, not a promise about what follows from it.",
    primary: "See a specimen",
    secondary: "Verify a patra",
    previewCaption: "Specimen. Every value on it is invented.",
  },

  anatomy: {
    eyebrow: "What it records",
    title: "Ten things, and nothing more.",
    lede: "Each numbered mark on the sheet is one field of the document. Where we cannot state something truthfully, the field is left out rather than filled in.",
    diagramTitle: "Schematic of a Sankalp Patra with ten numbered fields",
    items: [
      {
        n: 1,
        name: "Patra identifier",
        body: "Twenty-two characters drawn at random. It cannot be guessed, so a patra can be shared as a link without putting anybody else's within reach.",
      },
      {
        n: 2,
        name: "The names",
        body: "Written as you gave them, in the script you gave them in, in Latin and in Devanagari. This is the form in which they are spoken at the ghat.",
      },
      {
        n: 3,
        name: "Gotra",
        body: "Printed if you stated one. If your family does not use a gotra, the line reads 'Not stated' and the sankalp is made in Kashyapa gotra, as tradition provides for. It is never a required field.",
      },
      {
        n: 4,
        name: "The sankalp",
        body: "Your own words, verbatim and unedited. It is printed on your copy of the patra and nowhere else, a stranger verifying the patra never sees it.",
      },
      {
        n: 5,
        name: "River, ghat and place",
        body: "The water the rite was performed in and the steps it was performed on, named plainly enough that you could stand on them yourself.",
      },
      {
        n: 6,
        name: "Date and hour",
        body: "The Gregorian date, the window in India Standard Time, and the same moment in the time you were keeping when you booked.",
      },
      {
        n: 7,
        name: "Tithi",
        body: "Printed only when the tithi has been confirmed against a named panchang source. Where it has not been, this line is absent rather than estimated.",
      },
      {
        n: 8,
        name: "The ritvik",
        body: "The person who actually performed the rite, never the rostered name if somebody else stood in. Until a ritvik has agreed in writing to be named, the line stays empty.",
      },
      {
        n: 9,
        name: "Naam Kshan",
        body: "The moment at which the name is spoken aloud in the recording, given as a timestamp, so that second can be found without watching the whole session.",
      },
      {
        n: 10,
        name: "The seal, and the line beneath it",
        body: "The Bindu Ripple, and one sentence stating exactly what the document attests to, and what it does not.",
      },
    ],
  },

  restraint: {
    eyebrow: "What it does not say",
    title: "A document is only as good as the claims it refuses to make.",
    lede: "A certificate borrows its authority from the things printed on it. These are the things we will not print.",
    points: [
      "It does not say 'certified'. Nobody certified it. We performed a rite and wrote down what we did.",
      "It carries no registry number, no seal of any temple, and no crest we have not been given the right to use.",
      "It never names a person who has not agreed in writing to be named on it.",
      "It never carries a tithi, nakshatra or muhurat that has not been confirmed against a named panchang source.",
      "It makes no claim about what follows from the rite, not for health, money, examinations, marriage or a court date.",
      "It is not evidence in anybody's family dispute. It records an act, not a standing.",
    ],
    attestationLabel: "Printed on every patra",
    attestation:
      "This confirms that Snanify performed and recorded this rite at this ghat at this time. It attests to nothing else.",
  },

  verify: {
    eyebrow: "Verification",
    title: "Anyone can check it. Nobody can read it.",
    lede: "A patra is worth having only if a person who did not buy it can confirm it is real. Confirming it is real must not mean reading what it says.",
    steps: [
      {
        h: "Someone has your patra",
        b: "They are sent the link, or read the twenty-two characters off a printed sheet.",
      },
      {
        h: "They open the verification page",
        b: "snanify.com/verify, no account, no sign-in, no cookie set, nothing to install.",
      },
      {
        h: "They are told whether it stands",
        b: "Issued, withdrawn, or unknown, and beyond that, only the four facts listed below.",
      },
    ],
    showsHeading: "What verification returns",
    shows: [
      "The name, masked, R••••• S•••••",
      "The river and the ghat",
      "The date the rite was performed",
      "The date the patra was issued, and whether it still stands",
    ],
    hidesHeading: "What it never returns",
    hides: [
      "The sankalp, your words are never shown to a verifier",
      "The full name",
      "Any other name on the same booking",
      "Your email, your phone, or what was paid",
    ],
    demoLabel: "What a verifier sees",
    demoStatus: "Issued",
    demoName: "R••••• S•••••",
    demoRiver: "Ganga · Har Ki Pauri, Haridwar",
    demoDateLabel: "Rite performed",
    demoDate: "14 May 2026",
    demoIssuedLabel: "Patra issued",
    demoIssued: "14 May 2026",
    demoCaption:
      "Illustration. This response is composed for this page, no patra with this identifier exists.",
    cta: "Go to verification",
  },

  privacy: {
    eyebrow: "Who can see it",
    title: "Unlisted, until you decide otherwise.",
    items: [
      {
        h: "Unlisted by default",
        b: "A patra opens only from its own link and carries a noindex instruction, so it does not turn up in search results. Nothing lists it anywhere.",
      },
      {
        h: "The link preview says less than the page",
        b: "Paste a patra link into a chat and the preview shows the seal, the ghat and the date. Names offered in remembrance are never placed in a preview image, a death is not a thumbnail.",
      },
      {
        h: "You can withdraw it",
        b: "Ask, and the patra is withdrawn: the link stops resolving to a document, and verification reports it as withdrawn, with the date.",
      },
      {
        h: "The recording is a separate thing",
        b: "The patra links to your recording; it does not contain it. Access to one can be ended without ending the other.",
      },
    ],
  },

  formats: {
    eyebrow: "How it reaches you",
    title: "Three forms of the same document.",
    items: [
      {
        h: "A page that stays",
        b: "A permanent link, legible on a phone, and printable straight from the browser onto A4 or US Letter with the margins already set.",
      },
      {
        h: "A file to keep",
        b: "A PDF in both A4 and US Letter, with Devanagari set in Tiro rather than substituted, so a name is never rendered in the wrong face.",
      },
      {
        h: "An image to send",
        b: "One image sized for WhatsApp, carrying the seal, the ghat and the date. Names are left off it unless you ask for them.",
      },
    ],
    nothingShipped:
      "Nothing is posted to you. The Sankalp Patra is digital, like everything else here, there is no parcel, no prasad, no courier.",
  },

  closing: {
    title: "Look at one before you decide anything.",
    lede: "The specimen is the whole document at full size, watermarked, and plain about every invented value printed on it.",
    primary: "See the specimen",
    secondary: "How the rite is performed",
  },

  sample: {
    eyebrow: "Specimen",
    title: "A Sankalp Patra, in full.",
    lede: "The layout, the type and the seal are exactly what is issued. Everything written on it is invented. The names are the placeholder names of the Sanskrit grammarians, Devadatta and Yajnadatta, the equivalents of 'John Doe', and the identifier resolves to nothing.",
    noticeHeading: "Every value on this specimen is invented",
    noticeItems: [
      "The two names, the relation between them, and the gotra.",
      "The date, the window and the tithi. No panchang was consulted for this page.",
      "The ritvik's name and ritvik ID. No real person is named here; the ID is all zeros.",
      "The Naam Kshan, and the recording it points at.",
      "The identifier. Nothing has been issued against it, and verification would report it as unknown.",
    ],
    notesHeading: "Three things to notice",
    notes: [
      {
        h: "Why it is watermarked",
        b: "A specimen that could be mistaken for an issued patra is a forgery waiting to happen. The mark is on the page, on the print and on any image made of it.",
      },
      {
        h: "The tithi line",
        b: "It is shown here to demonstrate the layout. On an issued patra it appears only when the tithi has been confirmed against a named panchang source; otherwise the line is simply not there.",
      },
      {
        h: "The ritvik's name",
        b: "Also a specimen. No ritvik is named on a real patra until that person has agreed, in writing, to be named on it.",
      },
    ],
    printHint: "This page prints as a single A4 sheet, and the specimen mark prints with it.",
    smallScreenHint:
      "On a narrow screen the sheet is shown small, because it keeps the proportions of the printed page. Pinch to zoom, or read the same fields written out in full on the page before this one.",
    back: "What a Sankalp Patra is",
    verifyCta: "Verify a patra",
  },

  /* The document itself. Kept beside the page copy so the sheet and the page
     that explains it can never drift apart. */
  sheet: {
    aria: "Sankalp Patra",
    ariaSpecimen: "Sankalp Patra, specimen, not a record of any rite",
    titleLatin: "Sankalp Patra",
    subtitle: "A record of a rite performed at the ghat",
    folioLabel: "Patra",
    namesLabel: "Offered in the name of",
    remembranceLabel: "Offered in remembrance of",
    gotraLabel: "Gotra",
    gotraUnstated: "Not stated",
    sankalpLabel: "The sankalp, as it was written",
    riverLabel: "River and ghat",
    performedLabel: "Performed",
    localLabel: "In the yajaman's own time",
    tithiLabel: "Tithi",
    ritvikLabel: "Officiating ritvik",
    ritvikUnnamed: "Not yet named",
    naamKshanLabel: "Naam Kshan",
    naamKshanSub: "the second the name is spoken in the recording",
    issuedLabel: "Issued",
    verifyLabel: "Anyone may verify this patra at",
    attestation:
      "This confirms that Snanify performed and recorded this rite at this ghat at this time. It attests to nothing else.",
    footerLine:
      "This patra records that the rites named above were performed on your behalf, at the place and hour named, by the person named. It is a record of what was done. It is not a promise of what will follow.",
    specimenChip: "Specimen",
    specimenBanner: "Specimen, nothing on this sheet records a real rite, and the identifier is not issued.",
  },
};

const hi: typeof en = {
  meta: {
    title: "संकल्प पत्र, आपको क्या मिलता है",
    description:
      "संकल्प पत्र में अंकित होता है कि अनुष्ठान किसके निमित्त हुआ, किस जल में हुआ, किस समय हुआ, और रिकॉर्डिंग में किस क्षण नाम पुकारा गया। नमूना देखिए और जानिए कि कोई भी इसका सत्यापन कैसे कर सकता है।",
  },
  sampleMeta: {
    title: "संकल्प पत्र का नमूना",
    description:
      "संकल्प पत्र का पूरा नमूना, नमूने की छाप सहित। इस पर लिखा हर विवरण कल्पित है, नाम उदाहरण-नाम हैं और उस पहचान से कोई पत्र जारी नहीं हुआ।",
  },

  hero: {
    eyebrow: "संकल्प पत्र",
    title: "जो किया गया, उसका अभिलेख।",
    lede: "हर स्नान एक दस्तावेज़ पर पूर्ण होता है। उसमें वह नाम है जिसके निमित्त अनुष्ठान हुआ, वह जल जिसमें हुआ, वह समय जिस पर हुआ, और वह क्षण जब नाम स्वर में पुकारा गया। यह किए गए कार्य का अभिलेख है, आगे क्या होगा, इसका वचन नहीं।",
    primary: "नमूना देखें",
    secondary: "किसी पत्र का सत्यापन करें",
    previewCaption: "नमूना। इसका हर विवरण कल्पित है।",
  },

  anatomy: {
    eyebrow: "इसमें क्या अंकित होता है",
    title: "दस बातें, इससे अधिक कुछ नहीं।",
    lede: "पत्र पर लगा हर अंक दस्तावेज़ के एक विवरण को दर्शाता है। जिस बात को हम सच्चाई से नहीं लिख सकते, उसे भरने के बजाय छोड़ देते हैं।",
    diagramTitle: "संकल्प पत्र का रेखांकन, दस अंकित विवरणों सहित",
    items: [
      {
        n: 1,
        name: "पत्र पहचान",
        body: "बाईस अक्षरों की, यादृच्छिक रूप से बनी पहचान। इसका अनुमान लगाया नहीं जा सकता, इसलिए पत्र को लिंक के रूप में साझा करने पर किसी और का पत्र किसी की पहुँच में नहीं आता।",
      },
      {
        n: 2,
        name: "नाम",
        body: "जैसे आपने दिए, उसी लिपि में, रोमन और देवनागरी, दोनों में अंकित। घाट पर नाम इसी रूप में पुकारे जाते हैं।",
      },
      {
        n: 3,
        name: "गोत्र",
        body: "यदि आपने बताया हो तो अंकित। यदि आपके परिवार में गोत्र का प्रयोग नहीं होता, तो यहाँ ‘अनुल्लिखित’ लिखा रहता है और संकल्प काश्यप गोत्र से किया जाता है, जैसी परंपरा में व्यवस्था है। यह कभी अनिवार्य विवरण नहीं।",
      },
      {
        n: 4,
        name: "संकल्प",
        body: "आपके अपने शब्द, ज्यों के त्यों, बिना किसी संपादन के। यह केवल आपकी प्रति पर अंकित होता है, सत्यापन करने वाले किसी अन्य व्यक्ति को यह कभी नहीं दिखता।",
      },
      {
        n: 5,
        name: "नदी, घाट और स्थान",
        body: "जिस जल में और जिन सीढ़ियों पर अनुष्ठान संपन्न हुआ, वे इतने स्पष्ट रूप से अंकित कि आप स्वयं वहाँ जाकर खड़े हो सकें।",
      },
      {
        n: 6,
        name: "दिनांक और समय",
        body: "ग्रेगोरियन दिनांक, भारतीय मानक समय की अवधि, और वही क्षण उस समय-क्षेत्र में जो बुकिंग के समय आपका था।",
      },
      {
        n: 7,
        name: "तिथि",
        body: "केवल तभी अंकित, जब तिथि किसी नामित पंचांग से पुष्ट हो। जहाँ पुष्टि न हो, वहाँ यह पंक्ति अनुमान से नहीं भरी जाती, वह रहती ही नहीं।",
      },
      {
        n: 8,
        name: "ऋत्विक",
        body: "वह व्यक्ति जिसने वास्तव में अनुष्ठान किया, यदि किसी और ने स्थान लिया हो तो सूची में लिखा नाम कभी नहीं। जब तक कोई ऋत्विक लिखित सहमति न दे, यह पंक्ति रिक्त रहती है।",
      },
      {
        n: 9,
        name: "नाम क्षण",
        body: "रिकॉर्डिंग में वह क्षण जब नाम स्वर में पुकारा जाता है, समय-बिंदु के रूप में, ताकि पूरा सत्र देखे बिना वह क्षण मिल जाए।",
      },
      {
        n: 10,
        name: "मुद्रा, और उसके नीचे की पंक्ति",
        body: "बिंदु-तरंग मुद्रा, और एक वाक्य जो स्पष्ट कहता है कि यह पत्र किस बात की पुष्टि करता है, और किस बात की नहीं।",
      },
    ],
  },

  restraint: {
    eyebrow: "इस पर क्या नहीं लिखा",
    title: "दस्तावेज़ उतना ही खरा होता है, जितने दावों से वह इनकार करता है।",
    lede: "प्रमाणपत्र अपना बल उन बातों से लेता है जो उस पर छपी होती हैं। ये वे बातें हैं जो हम कभी नहीं छापेंगे।",
    points: [
      "इस पर ‘प्रमाणित’ नहीं लिखा। किसी ने इसे प्रमाणित नहीं किया, हमने अनुष्ठान किया और जो किया, वही लिख दिया।",
      "न कोई रजिस्ट्री संख्या, न किसी मंदिर की मुहर, न कोई ऐसा चिह्न जिसके प्रयोग का अधिकार हमें नहीं मिला।",
      "जिस व्यक्ति ने लिखित सहमति न दी हो, उसका नाम इस पर कभी नहीं आता।",
      "जो तिथि, नक्षत्र या मुहूर्त किसी नामित पंचांग से पुष्ट न हो, वह इस पर कभी अंकित नहीं होता।",
      "अनुष्ठान के बाद क्या होगा, इसका कोई दावा इस पर नहीं, न आरोग्य का, न धन का, न परीक्षा, विवाह या मुकदमे का।",
      "यह किसी पारिवारिक विवाद का प्रमाण नहीं है। यह एक कार्य का अभिलेख है, किसी हैसियत का नहीं।",
    ],
    attestationLabel: "हर पत्र पर अंकित",
    attestation:
      "यह इस बात की पुष्टि करता है कि स्नानिफ़ाई ने यह अनुष्ठान इसी घाट पर, इसी समय संपन्न किया और उसे रिकॉर्ड किया। इससे अधिक किसी बात की पुष्टि यह नहीं करता।",
  },

  verify: {
    eyebrow: "सत्यापन",
    title: "जाँच कोई भी कर सकता है। पढ़ कोई नहीं सकता।",
    lede: "पत्र का मूल्य तभी है जब वह व्यक्ति भी उसकी सत्यता जाँच सके जिसने उसे नहीं लिया। और सत्यता जाँचने का अर्थ यह नहीं होना चाहिए कि उसमें लिखा पढ़ लिया जाए।",
    steps: [
      {
        h: "किसी के पास आपका पत्र पहुँचता है",
        b: "उन्हें लिंक भेजा जाता है, या वे छपे हुए पत्र से वही बाईस अक्षर पढ़ लेते हैं।",
      },
      {
        h: "वे सत्यापन पृष्ठ खोलते हैं",
        b: "snanify.com/verify, न खाता, न लॉगिन, न कोई कुकी, न कुछ इंस्टॉल करने की आवश्यकता।",
      },
      {
        h: "उन्हें बता दिया जाता है कि पत्र वैध है या नहीं",
        b: "जारी, वापस लिया गया, या अज्ञात, और इसके आगे केवल नीचे दिए गए चार तथ्य।",
      },
    ],
    showsHeading: "सत्यापन में क्या मिलता है",
    shows: [
      "नाम, आंशिक रूप से ढका हुआ, R••••• S•••••",
      "नदी और घाट",
      "जिस दिन अनुष्ठान संपन्न हुआ, वह दिनांक",
      "पत्र जारी होने का दिनांक, और वह अब भी वैध है या नहीं",
    ],
    hidesHeading: "क्या कभी नहीं मिलता",
    hides: [
      "संकल्प, आपके शब्द सत्यापनकर्ता को कभी नहीं दिखाए जाते",
      "पूरा नाम",
      "उसी बुकिंग में सम्मिलित कोई अन्य नाम",
      "आपका ईमेल, आपका फ़ोन, या दी गई राशि",
    ],
    demoLabel: "सत्यापनकर्ता को यह दिखता है",
    demoStatus: "जारी",
    demoName: "R••••• S•••••",
    demoRiver: "गंगा · हर की पौड़ी, हरिद्वार",
    demoDateLabel: "अनुष्ठान संपन्न",
    demoDate: "14 मई 2026",
    demoIssuedLabel: "पत्र जारी",
    demoIssued: "14 मई 2026",
    demoCaption:
      "यह चित्रण है। यह उत्तर केवल इसी पृष्ठ के लिए रचा गया है, इस पहचान का कोई पत्र मौजूद नहीं।",
    cta: "सत्यापन पृष्ठ पर जाएँ",
  },

  privacy: {
    eyebrow: "इसे कौन देख सकता है",
    title: "जब तक आप न चाहें, यह असूचीबद्ध रहता है।",
    items: [
      {
        h: "डिफ़ॉल्ट रूप से असूचीबद्ध",
        b: "पत्र केवल अपने लिंक से खुलता है और उस पर noindex का निर्देश रहता है, इसलिए वह खोज परिणामों में नहीं आता। कहीं कोई सूची इसे नहीं दिखाती।",
      },
      {
        h: "लिंक की झलक पृष्ठ से कम कहती है",
        b: "पत्र का लिंक किसी चैट में भेजने पर झलक में मुद्रा, घाट और दिनांक ही दिखते हैं। स्मरण में अर्पित नाम कभी झलक-चित्र में नहीं रखे जाते, मृत्यु किसी की झलक-तस्वीर नहीं होती।",
      },
      {
        h: "आप इसे वापस ले सकते हैं",
        b: "कहने भर से पत्र वापस ले लिया जाता है: लिंक से दस्तावेज़ खुलना बंद हो जाता है, और सत्यापन में वह दिनांक सहित ‘वापस लिया गया’ दिखता है।",
      },
      {
        h: "रिकॉर्डिंग एक अलग वस्तु है",
        b: "पत्र आपकी रिकॉर्डिंग से जुड़ता है, उसे अपने भीतर नहीं रखता। एक तक पहुँच समाप्त करने के लिए दूसरी को समाप्त करना आवश्यक नहीं।",
      },
    ],
  },

  formats: {
    eyebrow: "यह आप तक कैसे पहुँचता है",
    title: "एक ही दस्तावेज़, तीन रूपों में।",
    items: [
      {
        h: "एक स्थायी पृष्ठ",
        b: "स्थायी लिंक, फ़ोन पर सुपाठ्य, और ब्राउज़र से सीधे A4 या US Letter पर छपने योग्य, हाशिये पहले से निर्धारित।",
      },
      {
        h: "सहेजने योग्य फ़ाइल",
        b: "A4 और US Letter, दोनों नापों में PDF, जिसमें देवनागरी तिरो में ही सेट होती है, किसी विकल्प फ़ॉन्ट में नहीं, ताकि कोई नाम कभी ग़लत लिपि-रूप में न छपे।",
      },
      {
        h: "भेजने योग्य चित्र",
        b: "व्हाट्सएप के नाप का एक चित्र, जिसमें मुद्रा, घाट और दिनांक रहते हैं। जब तक आप न कहें, नाम उस चित्र पर नहीं आते।",
      },
    ],
    nothingShipped:
      "आपको डाक से कुछ नहीं भेजा जाता। संकल्प पत्र भी यहाँ की हर वस्तु की भाँति डिजिटल है, न पार्सल, न प्रसाद, न कुरियर।",
  },

  closing: {
    title: "कुछ भी तय करने से पहले, एक बार देख लीजिए।",
    lede: "नमूना पूरा दस्तावेज़ है, पूरे आकार में, नमूने की छाप सहित, और उस पर छपे हर कल्पित विवरण के बारे में स्पष्ट।",
    primary: "नमूना देखें",
    secondary: "अनुष्ठान कैसे संपन्न होता है",
  },

  sample: {
    eyebrow: "नमूना",
    title: "संपूर्ण संकल्प पत्र।",
    lede: "विन्यास, अक्षर और मुद्रा ठीक वही हैं जो जारी किए गए पत्र पर होते हैं। उस पर लिखा हर विवरण कल्पित है। नाम संस्कृत व्याकरण के परंपरागत उदाहरण-नाम हैं, देवदत्त और यज्ञदत्त, और उस पर दी गई पहचान से कुछ नहीं खुलता।",
    noticeHeading: "इस नमूने का प्रत्येक विवरण कल्पित है",
    noticeItems: [
      "दोनों नाम, उनका पारस्परिक संबंध, और गोत्र।",
      "दिनांक, समय-अवधि और तिथि। इस पृष्ठ के लिए किसी पंचांग से परामर्श नहीं लिया गया।",
      "ऋत्विक का नाम और ऋत्विक पहचान-संख्या। यहाँ किसी वास्तविक व्यक्ति का नाम नहीं है; संख्या में केवल शून्य हैं।",
      "नाम क्षण, और वह रिकॉर्डिंग जिसकी ओर वह संकेत करता है।",
      "पत्र-पहचान। इसके सापेक्ष कुछ जारी नहीं हुआ, और सत्यापन में यह अज्ञात बताई जाती।",
    ],
    notesHeading: "तीन बातें ध्यान देने योग्य",
    notes: [
      {
        h: "इस पर नमूने की छाप क्यों है",
        b: "जो नमूना जारी किए गए पत्र जैसा दिखे, वह जालसाज़ी का निमंत्रण है। यह छाप पृष्ठ पर, छपाई पर, और उससे बने किसी भी चित्र पर बनी रहती है।",
      },
      {
        h: "तिथि की पंक्ति",
        b: "यहाँ यह केवल विन्यास दिखाने के लिए है। जारी किए गए पत्र पर यह तभी आती है जब तिथि किसी नामित पंचांग से पुष्ट हो; अन्यथा यह पंक्ति रहती ही नहीं।",
      },
      {
        h: "ऋत्विक का नाम",
        b: "यह भी नमूना ही है। वास्तविक पत्र पर किसी ऋत्विक का नाम तब तक नहीं आता, जब तक वह व्यक्ति लिखित सहमति न दे।",
      },
    ],
    printHint: "यह पृष्ठ एक A4 पन्ने पर छपता है, और नमूने की छाप उसी के साथ छपती है।",
    smallScreenHint:
      "छोटी स्क्रीन पर यह पत्र छोटा दिखता है, क्योंकि इसका अनुपात छपे हुए पन्ने जैसा ही रखा गया है। बड़ा देखने के लिए दो उँगलियों से ज़ूम कीजिए, या इससे पिछले पृष्ठ पर वही सब विवरण पूरे आकार में पढ़िए।",
    back: "संकल्प पत्र क्या है",
    verifyCta: "किसी पत्र का सत्यापन करें",
  },

  sheet: {
    aria: "संकल्प पत्र",
    ariaSpecimen: "संकल्प पत्र, नमूना, किसी अनुष्ठान का अभिलेख नहीं",
    titleLatin: "Sankalp Patra",
    subtitle: "घाट पर संपन्न अनुष्ठान का अभिलेख",
    folioLabel: "पत्र",
    namesLabel: "जिनके निमित्त अर्पित",
    remembranceLabel: "जिनके स्मरण में अर्पित",
    gotraLabel: "गोत्र",
    gotraUnstated: "अनुल्लिखित",
    sankalpLabel: "संकल्प, जैसा लिखा गया",
    riverLabel: "नदी और घाट",
    performedLabel: "संपन्न",
    localLabel: "यजमान के अपने समय में",
    tithiLabel: "तिथि",
    ritvikLabel: "अनुष्ठानकर्ता ऋत्विक",
    ritvikUnnamed: "अभी अंकित नहीं",
    naamKshanLabel: "नाम क्षण",
    naamKshanSub: "रिकॉर्डिंग में वह क्षण जब नाम पुकारा जाता है",
    issuedLabel: "जारी",
    verifyLabel: "इस पत्र का सत्यापन कोई भी यहाँ कर सकता है",
    attestation:
      "यह इस बात की पुष्टि करता है कि स्नानिफ़ाई ने यह अनुष्ठान इसी घाट पर, इसी समय संपन्न किया और उसे रिकॉर्ड किया। इससे अधिक किसी बात की पुष्टि यह नहीं करता।",
    footerLine:
      "यह पत्र इस बात का अभिलेख है कि ऊपर वर्णित अनुष्ठान, वर्णित स्थान और समय पर, वर्णित व्यक्ति द्वारा, आपके निमित्त संपन्न हुए। यह किए गए कार्य का अभिलेख है। आगे क्या होगा, इसका वचन नहीं।",
    specimenChip: "नमूना",
    specimenBanner: "नमूना, इस पत्र पर किसी वास्तविक अनुष्ठान का अभिलेख नहीं, और यह पहचान जारी नहीं हुई है।",
  },
};

export const patraContent = { en, hi } satisfies Record<Lang, typeof en>;

/* ------------------------------- the specimen ------------------------------ */

/** The bilingual watermark word tiled across a specimen sheet. */
export const SPECIMEN_WATERMARK_TEXT = "SPECIMEN · नमूना";

/**
 * PLACEHOLDER, all of it.
 *
 * Devadatta and Yajnadatta are the traditional placeholder names of Sanskrit
 * grammar. The ritvik ID is all zeros. The tithi below was NOT computed from a
 * panchang and must never be presented as one, on an issued patra the tithi
 * line is omitted unless `confidence === "sourced"`; it is marked "sourced"
 * here only so the specimen can demonstrate the layout, and /patra/sample says
 * so on the page. The patra identifier is the example ID from the design spec
 * and is not issued against any record.
 */
export function specimenPatra(lang: Lang): PatraData {
  const hi = lang === "hi";
  return {
    patraId: "pT4mKq9RxB2vLh6nYeW3dU",
    names: [
      { latin: "Devadatta Sharma", devanagari: "देवदत्त शर्मा" },
      {
        latin: "Yajnadatta Sharma",
        devanagari: "यज्ञदत्त शर्मा",
        relation: hi ? "पिता" : "father",
      },
    ],
    gotra: hi ? "काश्यप" : "Kashyapa",
    sankalpText: hi
      ? "बीते वर्ष के लिए कृतज्ञता, और आने वाले वर्ष में मन की शांति के निमित्त।"
      : "In gratitude for the year that has passed, and for peace of mind in the year ahead.",
    river: hi ? "गंगा" : "Ganga",
    ghat: hi ? "हर की पौड़ी" : "Har Ki Pauri",
    place: hi ? "हरिद्वार" : "Haridwar",
    performedOn: hi ? "14 मई 2026" : "14 May 2026",
    performedIst: "04:24, 05:12 IST",
    performedLocal: hi ? "14 मई 2026 · 00:54 CEST" : "14 May 2026 · 00:54 CEST",
    tithi: {
      label: hi ? "वैशाख शुक्ल पक्ष" : "Vaishakha, Shukla Paksha",
      confidence: "sourced",
    },
    ritvik: { name: hi ? "यज्ञदत्त मिश्र" : "Yajnadatta Mishra", id: "SNF-RTV-0000" },
    naamKshan: { timecode: "07:41", clock: "04:38 IST" },
    issuedOn: hi ? "14 मई 2026" : "14 May 2026",
    verifyUrl: "snanify.com/verify/pT4mKq9RxB2vLh6nYeW3dU",
  };
}
