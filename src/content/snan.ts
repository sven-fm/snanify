/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair and not the twelve locales the
   site serves; see the tier note at the top of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";
import type { TierKey } from "@/content/prices";

/**
 * Copy for /snan, the page that sells and explains the digital snan itself.
 *
 * Two rules govern every string in this file, and they are not stylistic:
 *
 *  1. NO PHYSICAL RITE IS EVER CLAIMED. Nobody stands in any river. Nothing is
 *     performed at any ghat, for anyone, ever.
 *  2. NO OUTCOME IS EVER PROMISED. There is not one guaranteed result anywhere
 *     in the tariff or above it.
 *
 * Those forbid the CLAIM, not the silence, and this page states neither the
 * claim nor its denial. It says what happens. The commitment stated at length
 * and in the negative lives on /ethics, which every page links.
 *
 * SO: NO NEGATIVE CONSTRUCTIONS HERE EITHER. /snan carries the same hard rule
 * as the landing page. A sentence built on "no", "nobody", "nothing" or "there
 * is no" gets rewritten until it is built on a noun and a verb. This file used
 * to open its Hindi tariff with "कोई निःशुल्क स्नान नहीं है" and its pull quote
 * with "Not recorded. Not offered. Not accepted."; both were the page arguing
 * with a critic who was not in the room, and both are gone.
 *
 * ACTIVE VOICE, HALF THE WORDS. Every field here was cut by about half in
 * August 2026 and the verbs moved to the front: "Breathe at her rhythm", "Hold
 * your vow", "Put the phone down". A limb is two or three short paragraphs, an
 * answer is two sentences, a tariff row is one. The reader is on a phone at six
 * in the morning, and for many of them English is a third language.
 *
 * What is claimed, and what is true: a real river's published gauge reading
 * genuinely arrives at the reader, at the hour it was measured, with its true
 * age printed beside it.
 *
 * Every figure in a specimen block is labelled a specimen where it appears. The
 * live readings live on the free water pages, and this page never prints an
 * hour and passes it off as this hour.
 *
 * NO PRICE IS EVER WRITTEN OUT IN THIS FILE. `{price}` is filled at render from
 * src/content/prices.ts, in the reader's own currency. `closing.cta` used to
 * read "Take eleven snans, $11", which shipped a dollar figure to a reader in
 * Chennai and defeated the whole one-price mechanism; the price is gone from
 * every CTA that the component does not tokenise.
 *
 * The whole shape is declared as `Copy`, so a key missing from either locale is
 * a compile error rather than a page that silently renders English to a Hindi
 * reader. Hindi is written, not translated, and the Hindi edition sets its
 * numerals in Devanagari as a printed panchang does.
 */

/* --- types --------------------------------------------------------------- */

export type Limb = {
  /** Stable anchor id, used for the deep link into a single limb. */
  readonly id: string;
  /** Clock position within the 270 seconds, e.g. "0:04". */
  readonly clock: string;
  /** How long the limb runs. */
  readonly length: string;
  /** The limb's name in Devanagari, set in both editions. */
  readonly deva: string;
  /** The Latin transliteration, set in both editions. */
  readonly name: string;
  /** What the limb is, in the reader's language. */
  readonly gloss: string;
  readonly body: readonly string[];
  /** An almanac block set exactly as it prints on the phone. */
  readonly specimen?: {
    readonly note: string;
    readonly lines: readonly string[];
  };
  /** The ruled waterline diagram, which only the reading limb carries. */
  readonly diagram?: {
    readonly label: string;
    readonly caption: string;
  };
};

export type Pair = { readonly k: string; readonly v: string };

export type Question = { readonly q: string; readonly a: string };

export type TariffRow = {
  /** Which line of src/content/prices.ts this row shows. */
  readonly key: TierKey;
  readonly name: string;
  readonly deva: string;
  readonly what: string;
  readonly body: string;
  /** The hero SKU. Exactly one row carries this. */
  readonly hero?: true;
};

type Copy = {
  readonly meta: { readonly title: string; readonly description: string };

  /** The trail, for the breadcrumb node and nothing else. */
  readonly crumbs: { readonly home: string; readonly here: string };

  readonly hero: {
    readonly eyebrow: string;
    readonly titleA: string;
    readonly titleB: string;
    readonly lede: string;
    readonly offer: string;
    readonly ctaPrimary: string;
    readonly ctaSecondary: string;
  };

  readonly sticky: {
    readonly name: string;
    readonly cta: string;
  };

  readonly truth: {
    readonly label: string;
    readonly title: string;
    readonly body: readonly string[];
  };

  readonly form: {
    readonly eyebrow: string;
    readonly title: string;
    readonly lede: string;
    readonly clockHead: string;
    readonly lengthHead: string;
    readonly limbs: readonly Limb[];
    readonly restraint: { readonly label: string; readonly body: string };
  };

  readonly hold: {
    readonly label: string;
    readonly title: string;
    readonly body: readonly string[];
    readonly pull: string;
    readonly pullNote: string;
  };

  readonly still: {
    readonly label: string;
    readonly title: string;
    readonly body: string;
    readonly lines: readonly string[];
    readonly note: string;
  };

  readonly mark: {
    readonly label: string;
    readonly title: string;
    readonly body: readonly string[];
    readonly lineLabel: string;
    readonly line: string;
    readonly count: readonly string[];
    readonly note: string;
    readonly close: string;
  };

  readonly chihna: {
    readonly eyebrow: string;
    readonly title: string;
    readonly lede: string;
    readonly drawLabel: string;
    readonly draws: readonly Pair[];
    readonly forgeLabel: string;
    readonly forgeTitle: string;
    readonly forgeBody: readonly string[];
    readonly seedLabel: string;
    readonly seedLine: string;
    readonly seedNote: string;
    readonly flood: string;
  };

  readonly before: {
    readonly eyebrow: string;
    readonly title: string;
    readonly items: readonly Question[];
  };

  readonly tariff: {
    readonly eyebrow: string;
    readonly title: string;
    readonly lede: string;
    readonly heads: {
      readonly price: string;
      readonly per: string;
    };
    readonly rows: readonly TariffRow[];
    readonly heroLabel: string;
    readonly heroWhyLabel: string;
    readonly heroBody: readonly string[];
    readonly freeLabel: string;
    readonly freeBody: string;
    readonly cta: string;
    readonly ctaNote: string;
  };

  readonly closing: {
    readonly title: string;
    readonly body: string;
    readonly cta: string;
  };
};

/* --- English ------------------------------------------------------------- */

const en: Copy = {
  meta: {
    title: "The snan, four and a half minutes with a real river",
    description:
      "A digital snan. Four and a half minutes with a river's gauge reading this hour, a vow held eleven seconds, ninety seconds of black screen, and one mark drawn from the public record.",
  },

  crumbs: { home: "Home", here: "The snan" },

  hero: {
    eyebrow: "Jal Sankalp",
    titleA: "Four and a half minutes.",
    titleB: "The river comes to you.",
    lede: "Two hundred and seventy seconds with a river at the level she stands this hour, measured by the Central Water Commission. Breathe at her rhythm. Hold your vow for eleven seconds. Put the phone down for ninety.",
    offer:
      "Eleven mornings for {price}, one for each morning. Everything you can read stays free.",
    ctaPrimary: "Take eleven mornings, {price}",
    ctaSecondary: "See the five limbs",
  },

  sticky: {
    name: "Gyarah, eleven mornings",
    cta: "Choose your water",
  },

  truth: {
    label: "What is actually true",
    title: "Everything here is real, and it is yours.",
    body: [
      "A river at the level she stands this hour, measured by the Central Water Commission. The panchang, computed. Your own words, read back every morning.",
      "The practice is yours. You say it, you keep it, and the mark carries a number a stranger can check.",
      "Our servers sit downstream, in the river.",
    ],
  },

  form: {
    eyebrow: "The form",
    title: "Five limbs, two hundred and seventy seconds, the same every day.",
    lede: "The same five limbs, the same order, the same lengths. Four seconds to clear the screen, and after that only the river changes.",
    clockHead: "Clock",
    lengthHead: "Length",
    limbs: [
      {
        id: "reading",
        clock: "0:04",
        length: "21 seconds",
        deva: "जल-पाठ",
        name: "Jal Path",
        gloss: "The reading",
        body: [
          "Five lines set themselves, one every four seconds, the way an almanac prints an entry: the river and the ghat, the level in metres, the flow in cumecs, the hour the gauge was read, and your distance from that water.",
          "That last line is the one people repeat back. Six thousand seven hundred kilometres from Leicester, two hundred and four from Delhi.",
        ],
        specimen: {
          note: "Set as it prints. These figures are a specimen. The live readings sit on the six water pages, free.",
          lines: [
            "GANGA · HAR KI PAURI · HARIDWAR",
            "LEVEL 293.11 m · RISEN 4 cm SINCE MIDNIGHT",
            "FLOW 1,240 cumec",
            "READ 04:38 IST · CENTRAL WATER COMMISSION",
            "YOU ARE 6,714 km FROM THIS WATER",
          ],
        },
        diagram: {
          label: "The waterline",
          caption:
            "One hairline at the true reading, between the station's low water datum and the danger level the agency publishes. That is the entire indicator.",
        },
      },
      {
        id: "breath",
        clock: "0:25",
        length: "60 seconds",
        deva: "श्वास",
        name: "Shwas",
        gloss: "The breath",
        body: [
          "The waterline rises for four seconds and falls for six, six times over. Six breaths a minute with a long exhale, the rate a body settles at.",
          "How far the line travels is scaled by today's flow, so a river in flood breathes bigger.",
        ],
      },
      {
        id: "sankalp",
        clock: "1:25",
        length: "60 seconds",
        deva: "संकल्प",
        name: "Sankalp",
        gloss: "The vow",
        body: [
          "The water goes still and the sankalp is already set: your name, your gotra, your city, the water you chose, and today's masa, paksha and tithi. Your own words sit in the last line.",
          "You write those words once, on the first morning. Reading your own forty words back at six in the morning is the thing. Then press and hold, anywhere on the screen.",
        ],
      },
      {
        id: "stillness",
        clock: "2:25",
        length: "90 seconds",
        deva: "मौन",
        name: "Maun",
        gloss: "The stillness",
        body: [
          "Put the phone down, face down if you like. The screen goes fully black, the brightness drops, the wake lock holds, and the river keeps running.",
          "Pick the phone up in the middle and the river runs on regardless. A ritual keeps its own counsel.",
          "One bell at ninety seconds, and the screen returns at a fifth of its brightness.",
        ],
      },
      {
        id: "mark",
        clock: "3:55",
        length: "35 seconds",
        deva: "चिह्न",
        name: "Chihn",
        gloss: "The mark",
        body: [
          "The morning writes itself into your register as one ruled line: the date, the tithi, the water and her level, the hour the gauge was read, and the ninety seconds.",
          "Beneath it, the count. Then the mark is drawn from the reading, and the river fades over eight seconds.",
        ],
      },
    ],
    restraint: {
      label: "One restraint",
      body: "The waterline is the only sign of time passing, and it is busy doing something else.",
    },
  },

  hold: {
    label: "Eleven seconds",
    title: "Held under your thumb, and it keeps its own pace.",
    body: [
      "While you hold, your vow fills with vermillion from left to right, the way ink soaks into paper, over eleven seconds exactly.",
      "Eleven seconds of holding a thumb still while you read your own words is a long time. Let go early and the ink drains back, and you begin again.",
      "It is the closest a screen gets to standing still in cold water.",
    ],
    pull: "Spoken.",
    pullNote: "You said it. That is the whole of what happened, and it is the part that counts.",
  },

  still: {
    label: "Ninety seconds",
    title: "The best minute of this is the minute your screen is off.",
    body: "Most of what is on your phone is built to keep you looking at it. This one turns itself off in the middle and asks you to put it down. That is the spine of the thing.",
    lines: ["Put the phone down. Face down, if you like.", "The river runs for ninety seconds."],
    note: "Full black, brightness dropped, wake lock held, the water still running. Ninety seconds, today and every day.",
  },

  mark: {
    label: "The register",
    title: "One line a morning, kept for life.",
    body: [
      "Your register is the Jal Panjika, set as a page of an almanac: one ruled line per morning, in the order the mornings happened, with the river's own condition on each of them.",
    ],
    lineLabel: "The line, as it writes itself",
    line: "11 Aug · Shravan Shu. Ekadashi · Ganga 293.11 m · 04:38 · stillness 90 s",
    count: ["Forty-first consecutive morning.", "The Ganga has risen 1.4 m since your first."],
    note: "That second sentence is why people come back. You watch a river change while you keep turning up, and your practice is measured against the river's own year.",
    close: "Tomorrow, 04:41.",
  },

  chihna: {
    eyebrow: "Jal Chihna",
    title: "The mark the water left.",
    lede: "Every snan ends in one engraving, drawn from the river's published reading at the minute you kept. It carries a number, and it is yours.",
    drawLabel: "What draws it",
    draws: [
      {
        k: "Level",
        v: "Higher water, higher horizon, more of the sheet in ink. A monsoon peak is a dark, crowded plate.",
      },
      {
        k: "Flow",
        v: "More flow, more ripples, and rougher ones. Rivers are read on a log scale.",
      },
      {
        k: "Hour",
        v: "The disc is the sun by day and the moon at night, cut to the phase it held that minute.",
      },
      { k: "Water", v: "Six waters, six foregrounds. Har Ki Pauri has its step run." },
      {
        k: "You",
        v: "Your name, your gotra and the second you kept bend the channel. Two people at one water take away different sheets.",
      },
    ],
    forgeLabel: "Where the seed comes from",
    forgeTitle: "The seed contains the government's own number.",
    forgeBody: [
      "The picture is drawn from a seed, and the seed is a sha256 hash of a single line of text.",
      "To mint a chihna showing a monsoon peak you would have to forge the Government of India's gauge record, because the peak sits inside the string that produced the hash. Run sha256 over the line yourself and you get the seed printed on your sheet.",
    ],
    seedLabel: "The line the picture is drawn from",
    seedLine:
      "snanify.chihna|1|ganga-haridwar|{station}|{observed}|293.110|1240.000|{kept}|{name}|{gotra}",
    seedNote:
      "The shape of it. Your own line carries your station, your instants and your name, printed in full for any stranger to hash.",
    flood:
      "When the water stands above the agency's published danger line, the sheet prints that, plainly. That is a flood, and people downstream are being moved.",
  },

  before: {
    eyebrow: "Before you pay",
    title: "The four things people ask.",
    items: [
      {
        q: "Do I have to be awake at four?",
        a: "The panchang names an hour, and the notification arrives when you told us you wake. The form is short enough that a person running late does it anyway, which is what builds a habit.",
      },
      {
        q: "What happens when the gauge goes quiet?",
        a: "The screen prints the last real reading with its true hour and its true age: read 01:38 IST, three hours and twelve minutes ago. A stale honest reading is completely fine.",
      },
      {
        q: "Can I shorten it?",
        a: "The form runs its full length every morning, the ninety seconds included. A practice you can hurry is a preference.",
      },
      {
        q: "Who sees my sankalp?",
        a: "Your words stay yours. The verification page returns the river, the station, the level and the minute, which is the part that is theirs to check.",
      },
    ],
  },

  tariff: {
    eyebrow: "The tariff",
    title: "Paid, and priced like a morning.",
    lede: "The live water, the panchang, every muhurat and all six river pages stay free forever, to anybody. The four and a half minutes are the part you buy.",
    heads: { price: "Price", per: "Per snan" },
    rows: [
      {
        key: "one",
        name: "Ek Dhara",
        deva: "एक धारा",
        what: "One snan",
        body: "One morning, taken once. Enough to find out what four and a half minutes with a real river is like.",
      },
      {
        key: "eleven",
        name: "Gyarah",
        deva: "ग्यारह",
        what: "Eleven snans",
        body: "Eleven mornings, long enough to know whether you will keep it, and eleven is the count this tradition gives things in. One charge, taken whenever you take them, and they wait.",
        hero: true,
      },
      {
        key: "sixty",
        name: "Varsh Kosh",
        deva: "वर्ष कोष",
        what: "Sixty snans",
        body: "Two unbroken months, or a year of the mornings that matter, at the lowest rate we set.",
      },
    ],
    heroLabel: "The one to take",
    heroWhyLabel: "Why eleven",
    heroBody: [
      "Gyarah is the one to take, and the reason is arithmetic rather than persuasion.",
      "A single charge of one hands about a third of itself to the card networks. Eleven in one charge keeps that third in the price, which is how a morning stays where it is.",
    ],
    freeLabel: "Free forever, open to anyone",
    freeBody:
      "The live state of all six waters, the panchang, every muhurat and its occasions, and each river's own page. The reading half of this site is free, and it stays free.",
    cta: "Choose your water",
    ctaNote: "Six waters. The one your family is from, or the one you have always meant to see.",
  },

  closing: {
    title: "The Ganga stands at her own level this hour.",
    body: "Be one of the people watching, for four and a half minutes, before the day starts.",
    cta: "Take eleven mornings",
  },
};

/* --- हिन्दी ---------------------------------------------------------------- */

const hi: Copy = {
  meta: {
    title: "स्नान, साढ़े चार मिनट एक सच्ची नदी के साथ",
    description:
      "एक डिजिटल स्नान। साढ़े चार मिनट, इस घंटे के गेज पाठ के साथ; ग्यारह सेकंड थमा हुआ संकल्प; नब्बे सेकंड की काली स्क्रीन; और एक चिह्न, जो सार्वजनिक अभिलेख से खिंचता है।",
  },

  crumbs: { home: "मुखपृष्ठ", here: "स्नान" },

  hero: {
    eyebrow: "जल संकल्प",
    titleA: "साढ़े चार मिनट।",
    titleB: "नदी आप तक आती है।",
    lede: "दो सौ सत्तर सेकंड, उस नदी के साथ जो इस घंटे वास्तव में जिस स्तर पर है, केंद्रीय जल आयोग द्वारा मापी हुई। उसकी लय पर साँस लीजिए। संकल्प ग्यारह सेकंड थामे रखिए। नब्बे सेकंड के लिए फ़ोन नीचे रख दीजिए।",
    offer: "ग्यारह सुबहें {price} में, हर सुबह के लिए एक। जो पढ़ने का है, वह सदा निःशुल्क।",
    ctaPrimary: "ग्यारह सुबहें लीजिए, {price}",
    ctaSecondary: "पाँच अंग देखिए",
  },

  sticky: {
    name: "ग्यारह, ११ सुबहें",
    cta: "जल चुनिए",
  },

  truth: {
    label: "जो वास्तव में सत्य है",
    title: "यहाँ सब कुछ वास्तविक है, और वह आपका है।",
    body: [
      "एक नदी, इस घंटे वह जिस जलस्तर पर वास्तव में है, केंद्रीय जल आयोग द्वारा मापी हुई। पंचांग, गणना किया हुआ। और आपके अपने शब्द, हर सुबह लौटाकर पढ़ाए जाते।",
      "साधना आपकी है। आप उसे कहते हैं, आप उसे निभाते हैं, और चिह्न पर वह अंक होता है जिसे कोई अजनबी जाकर जाँच सकता है।",
      "हमारे सर्वर नदी के नीचे, नदी में ही बैठे हैं।",
    ],
  },

  form: {
    eyebrow: "स्वरूप",
    title: "पाँच अंग, दो सौ सत्तर सेकंड, हर दिन वही।",
    lede: "वही पाँच अंग, वही क्रम, वही अवधि। आरंभ के चार सेकंड में स्क्रीन साफ़ हो जाती है, और उसके बाद केवल नदी बदलती है।",
    clockHead: "घड़ी",
    lengthHead: "अवधि",
    limbs: [
      {
        id: "reading",
        clock: "०:०४",
        length: "२१ सेकंड",
        deva: "जल-पाठ",
        name: "Jal Path",
        gloss: "पाठ",
        body: [
          "पाँच पंक्तियाँ एक-एक कर बैठती हैं, हर चार सेकंड में एक, जैसे पंचांग कोई प्रविष्टि छापता है: नदी और घाट, मीटर में जलस्तर, क्यूमेक में प्रवाह, पाठ का घंटा, और उस जल से आपकी दूरी।",
          "यही अंतिम पंक्ति लोग दोहराकर बताते हैं। लेस्टर से छह हज़ार सात सौ किलोमीटर, दिल्ली से दो सौ चार।",
        ],
        specimen: {
          note: "जैसा छपता है, वैसा ही। ये अंक नमूना हैं। सजीव पाठ छहों जल-पृष्ठों पर हैं, निःशुल्क।",
          lines: [
            "गंगा · हर की पौड़ी · हरिद्वार",
            "जलस्तर २९३·११ मी · आधी रात से ४ सेमी ऊपर",
            "प्रवाह १,२४० क्यूमेक",
            "पाठ ०४:३८ भा.मा.स. · केंद्रीय जल आयोग",
            "आप इस जल से ६,७१४ किमी दूर हैं",
          ],
        },
        diagram: {
          label: "जलरेखा",
          caption:
            "सच्चे पाठ पर एक बाल-बराबर रेखा, स्टेशन के न्यूनतम जल-मान और एजेंसी के अपने प्रकाशित संकट स्तर के बीच मापी हुई। सूचक बस यही है।",
        },
      },
      {
        id: "breath",
        clock: "०:२५",
        length: "६० सेकंड",
        deva: "श्वास",
        name: "Shwas",
        gloss: "साँस",
        body: [
          "जलरेखा चार सेकंड चढ़ती है और छह सेकंड उतरती है, छह बार। मिनट में छह साँसें, लंबे निःश्वास के साथ, वही गति जिस पर शरीर स्वयं ठहरता है।",
          "रेखा कितनी दूर तक जाएगी, यह आज के प्रवाह से तय होता है, इसलिए उफान पर नदी बड़ी साँस लेती है।",
        ],
      },
      {
        id: "sankalp",
        clock: "१:२५",
        length: "६० सेकंड",
        deva: "संकल्प",
        name: "Sankalp",
        gloss: "संकल्प",
        body: [
          "जल स्थिर हो जाता है और संकल्प पहले से भरा हुआ रहता है: आपका नाम, गोत्र, आपका नगर, चुना हुआ जल, और आज का मास, पक्ष तथा तिथि। अंतिम पंक्ति में आपके अपने शब्द बैठे रहते हैं।",
          "वे शब्द आप पहली सुबह एक बार लिखते हैं। भोर में अपने ही चालीस शब्द पढ़ना, वस्तु वही है। फिर स्क्रीन पर कहीं भी दबाकर थामे रहिए।",
        ],
      },
      {
        id: "stillness",
        clock: "२:२५",
        length: "९० सेकंड",
        deva: "मौन",
        name: "Maun",
        gloss: "मौन",
        body: [
          "फ़ोन नीचे रख दीजिए, चाहें तो उल्टा। स्क्रीन पूरी तरह काली हो जाती है, चमक गिर जाती है, जागरण-ताला लगा रहता है, और नदी बहती रहती है।",
          "बीच में फ़ोन उठा लें तो नदी वैसे ही बहती रहती है। साधना पहरा नहीं देती।",
          "नब्बे सेकंड पर एक घंटी, और स्क्रीन पाँचवें हिस्से की चमक पर लौट आती है।",
        ],
      },
      {
        id: "mark",
        clock: "३:५५",
        length: "३५ सेकंड",
        deva: "चिह्न",
        name: "Chihn",
        gloss: "चिह्न",
        body: [
          "वह सुबह आपकी पंजिका में एक ही पंक्ति में स्वयं लिख जाती है: दिनांक, तिथि, जल और उसका स्तर, पाठ का घंटा, और वे नब्बे सेकंड।",
          "उसके नीचे गणना। फिर उसी पाठ से चिह्न खिंचता है, और नदी आठ सेकंड में धीरे-धीरे शांत हो जाती है।",
        ],
      },
    ],
    restraint: {
      label: "एक संयम",
      body: "समय बीतने का एकमात्र चिह्न जलरेखा है, और वह अपने आप में दूसरा काम कर रही है।",
    },
  },

  hold: {
    label: "ग्यारह सेकंड",
    title: "अंगूठे के नीचे थमा हुआ, और अपनी ही गति से चलता हुआ।",
    body: [
      "जब तक आप थामे रहते हैं, आपका अपना संकल्प बाईं ओर से दाईं ओर सिंदूरी रंग से भरता जाता है, जैसे स्याही कागज़ में उतरती है। पूरे ग्यारह सेकंड।",
      "अपने ही शब्द पढ़ते हुए ग्यारह सेकंड अंगूठा स्थिर रखना सचमुच लंबा समय है। पहले छोड़ दिया तो स्याही लौट जाती है, और आप फिर से आरंभ करते हैं।",
      "ठंडे जल में स्थिर खड़े रहने के सबसे निकट कोई स्क्रीन इतना ही पहुँच सकती है।",
    ],
    pull: "उच्चारित।",
    pullNote: "आपने उसे कहा। हुआ इतना ही है, और गिनने की बात भी यही है।",
  },

  still: {
    label: "नब्बे सेकंड",
    title: "इसका सबसे अच्छा मिनट वह है जब आपकी स्क्रीन बंद रहती है।",
    body: "आपके फ़ोन में जो कुछ है, उसका अधिकांश इसी के लिए बना है कि आप देखते रहें। यह बीच में स्वयं को बुझा देता है और कहता है कि फ़ोन नीचे रख दीजिए। यही इसकी रीढ़ है।",
    lines: ["फ़ोन नीचे रख दीजिए। चाहें तो उल्टा।", "नब्बे सेकंड नदी बहती रहेगी।"],
    note: "पूरी तरह काली स्क्रीन, घटी हुई चमक, लगा हुआ जागरण-ताला, और बहता हुआ जल। नब्बे सेकंड, आज और हर दिन।",
  },

  mark: {
    label: "पंजिका",
    title: "हर सुबह एक पंक्ति, जीवन भर के लिए रखी हुई।",
    body: [
      "आपकी पंजिका जल पंजिका है, और वह पंचांग के पन्ने की तरह छपती है: हर सुबह एक पंक्ति, उसी क्रम में जिस क्रम में सुबहें बीतीं, और हर एक के साथ उस दिन नदी की अपनी स्थिति।",
    ],
    lineLabel: "पंक्ति, जैसी स्वयं लिखती है",
    line: "११ अग. · श्रावण शु. एकादशी · गंगा २९३·११ मी · ०४:३८ · मौन ९० से.",
    count: ["इकतालीसवीं लगातार सुबह।", "आपकी पहली सुबह से गंगा १·४ मी चढ़ चुकी हैं।"],
    note: "दूसरी पंक्ति ही वह कारण है जिससे लोग लौटते हैं। आप एक नदी को बदलते हुए देखते हैं और साथ-साथ स्वयं आते रहते हैं, और आपकी साधना नदी के अपने वर्ष के मुक़ाबले नापी जाती है।",
    close: "कल, ०४:४१।",
  },

  chihna: {
    eyebrow: "जल चिह्न",
    title: "जो चिह्न जल छोड़ गया।",
    lede: "हर स्नान के अंत में एक उत्कीर्ण चित्र बनता है, जो उसी मिनट के नदी के प्रकाशित पाठ से खिंचता है। उस पर एक क्रमांक होता है, और वह आपका है।",
    drawLabel: "इसे क्या बनाता है",
    draws: [
      {
        k: "जलस्तर",
        v: "जल जितना ऊँचा, क्षितिज उतना ऊँचा, स्याही उतनी अधिक। वर्षा के शिखर का पत्र गहरा और भरा हुआ होता है।",
      },
      {
        k: "प्रवाह",
        v: "प्रवाह जितना तेज़, तरंगें उतनी अधिक और खुरदरी। नदियाँ लघुगणक पर पढ़ी जाती हैं।",
      },
      {
        k: "बेला",
        v: "बिंब दिन में सूर्य है और रात्रि में चंद्र, उसी मिनट की अपनी कला में कटा हुआ।",
      },
      { k: "जल", v: "छह जल, छह अग्रभूमियाँ। हर की पौड़ी में उसकी सीढ़ियाँ हैं।" },
      {
        k: "आप",
        v: "आपका नाम, आपका गोत्र और वह क्षण जो आपने रखा, धारा का मोड़ तय करते हैं। एक ही जल पर दो लोग भी अलग पत्र लेकर उठते हैं।",
      },
    ],
    forgeLabel: "बीज कहाँ से आता है",
    forgeTitle: "बीज के भीतर सरकार की अपनी संख्या बैठी है।",
    forgeBody: [
      "चित्र एक बीज से बनता है, और बीज पाठ की एक ही पंक्ति का sha256 है।",
      "बाढ़ के शिखर वाला चिह्न गढ़ने के लिए आपको भारत सरकार का गेज अभिलेख गढ़ना पड़ेगा, क्योंकि वह शिखर उसी पंक्ति के भीतर है जिससे हैश बना। उस पर स्वयं sha256 चलाइए, वही बीज मिलेगा जो आपके पत्र पर छपा है।",
    ],
    seedLabel: "जिस पंक्ति से चित्र बनता है",
    seedLine:
      "snanify.chihna|1|ganga-haridwar|{station}|{observed}|293.110|1240.000|{kept}|{name}|{gotra}",
    seedNote:
      "यह उसका ढाँचा है। आपकी पंक्ति में आपका स्टेशन, आपके क्षण और आपका नाम होते हैं, और वह पूरी वहाँ छपी रहती है जहाँ कोई भी उस पर हैश चला सके।",
    flood:
      "जब जल एजेंसी के प्रकाशित संकट स्तर से ऊपर हो, पत्र वही छापता है, सीधे शब्दों में। वह बाढ़ है, और नीचे के गाँव खाली कराए जा रहे हैं।",
  },

  before: {
    eyebrow: "देने से पहले",
    title: "चार बातें, जो लोग पूछते हैं।",
    items: [
      {
        q: "क्या चार बजे जागना अनिवार्य है?",
        a: "पंचांग एक घड़ी का नाम लेता है, और सूचना उसी समय आती है जो आपने जागने का बताया है। स्वरूप इतना छोटा है कि देर से उठा व्यक्ति भी उसे कर ही लेता है, और आदत इसी गुण से बनती है।",
      },
      {
        q: "गेज चुप हो जाए तो?",
        a: "स्क्रीन अंतिम सच्चा पाठ छापती है, उसके सच्चे घंटे और सच्ची आयु के साथ: पाठ ०१:३८ भा.मा.स., तीन घंटे बारह मिनट पहले। पुराना पर सच्चा पाठ पूरी तरह ठीक है।",
      },
      {
        q: "क्या इसे छोटा किया जा सकता है?",
        a: "स्वरूप हर सुबह अपनी पूरी अवधि चलता है, वे नब्बे सेकंड भी। जिस विधि को जल्दी निपटाया जा सके, वह सुविधा है।",
      },
      {
        q: "मेरा संकल्प कौन देखता है?",
        a: "आपके अपने शब्द आपके रहते हैं। सत्यापन पृष्ठ अजनबी को नदी, स्टेशन, जलस्तर और वह मिनट लौटाता है, और जाँचने का अधिकार उसे इतने पर है।",
      },
    ],
  },

  tariff: {
    eyebrow: "शुल्क",
    title: "सशुल्क, और एक सुबह के भाव पर।",
    lede: "सजीव जल, पंचांग, हर मुहूर्त और छहों नदियों के अपने पृष्ठ सदा निःशुल्क हैं, किसी के लिए भी। शुल्क उन साढ़े चार मिनटों का है।",
    heads: { price: "मूल्य", per: "प्रति स्नान" },
    rows: [
      {
        key: "one",
        name: "Ek Dhara",
        deva: "एक धारा",
        what: "एक स्नान",
        body: "एक सुबह, एक बार। इतना जान लेने के लिए कि एक सच्ची नदी के साथ साढ़े चार मिनट कैसे बीतते हैं।",
      },
      {
        key: "eleven",
        name: "Gyarah",
        deva: "ग्यारह",
        what: "ग्यारह स्नान",
        body: "ग्यारह सुबहें, जितनी यह जान लेने के लिए पर्याप्त हैं कि आप इसे निभाएँगे, और ग्यारह वही गिनती है जिसमें यह परंपरा वस्तुएँ देती आई है। एक भुगतान, जब चाहें तब लिए हुए, और वे प्रतीक्षा करती हैं।",
        hero: true,
      },
      {
        key: "sixty",
        name: "Varsh Kosh",
        deva: "वर्ष कोष",
        what: "साठ स्नान",
        body: "दो महीने लगातार, या वर्ष भर की वे सुबहें जो मायने रखती हैं, और वह भी हमारी सबसे कम दर पर।",
      },
    ],
    heroLabel: "लेने योग्य यही है",
    heroWhyLabel: "ग्यारह ही क्यों",
    heroBody: [
      "ग्यारह ही लेने योग्य है, और कारण मनुहार नहीं, गणित है।",
      "अकेले एक का भुगतान अपना लगभग तीसरा हिस्सा कार्ड नेटवर्क को दे बैठता है। ग्यारह एक साथ लेने पर वह हिस्सा भाव में ही रह जाता है, और इसीलिए एक सुबह अपने भाव पर टिकी रहती है।",
    ],
    freeLabel: "सदा निःशुल्क, सबके लिए",
    freeBody:
      "छहों जल की सजीव स्थिति, पंचांग, हर मुहूर्त और उसके पर्व, और हर नदी का अपना पृष्ठ। इस स्थल का जो भाग पढ़ने का है वह निःशुल्क है और निःशुल्क ही रहेगा।",
    cta: "जल चुनिए",
    ctaNote: "छह जल। वह जिससे आपका परिवार है, या वह जिसे आप सदा देखना चाहते रहे।",
  },

  closing: {
    title: "गंगा इस घंटे अपने ही स्तर पर हैं।",
    body: "दिन आरंभ होने से पहले, साढ़े चार मिनट के लिए, आप उन लोगों में हो सकते हैं जो देख रहे हैं।",
    cta: "ग्यारह सुबहें लीजिए",
  },
};

export const snanContent = { en, hi } satisfies Record<Lang, Copy>;
