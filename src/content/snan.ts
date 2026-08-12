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
 *     performed at any ghat, for anyone, ever. The page says so at the top, in
 *     full weight, because it is the specification rather than a disclaimer.
 *  2. NO OUTCOME IS EVER PROMISED. There is not one guaranteed result anywhere
 *     in the tariff or above it.
 *
 * What is claimed, and what is true: a real river's published gauge reading
 * genuinely arrives at the reader, at the hour it was measured, with its true
 * age printed beside it.
 *
 * Every figure in a specimen block is labelled a specimen where it appears. The
 * live readings live on the free water pages, and this page never prints an
 * hour and passes it off as this hour.
 *
 * The whole shape is declared as `Copy`, so a key missing from either locale is
 * a compile error rather than a page that silently renders English to a Hindi
 * reader. Hindi is written, not translated, and the Hindi edition sets its
 * numerals in Devanagari as a printed panchang does. Rupee figures follow the
 * edition; dollar figures stay in Latin numerals in both, because that is how
 * the price is written on a card statement.
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
      "A digital snan. Four and a half minutes with a river's own gauge reading this hour, a vow held for eleven seconds, ninety seconds of black screen, and one mark that cannot be forged. Eleven mornings, one for each morning.",
  },

  crumbs: { home: "Home", here: "The snan" },

  hero: {
    eyebrow: "Jal Sankalp",
    titleA: "Four and a half minutes.",
    titleB: "The river comes to you.",
    lede: "A digital snan. You sit for two hundred and seventy seconds with a river at the level she actually stands this hour, measured by the Central Water Commission. You breathe at her rhythm, hold your vow under your thumb for eleven seconds, and put the phone down for ninety. One line goes into your register, and one mark is drawn from the reading. There has never been another like it.",
    offer:
      "Eleven mornings for {price}, one for each morning. The live water, the panchang, the muhurat and every river's own page are free to read, forever, to anyone.",
    ctaPrimary: "Take eleven mornings, {price}",
    ctaSecondary: "What the four and a half minutes are",
  },

  sticky: {
    name: "Gyarah, eleven mornings",
    cta: "Choose your water",
  },

  truth: {
    label: "What is actually true",
    title: "Everything here is real, and it is yours.",
    body: [
      "A river, at the level and the flow she actually stands at this hour, measured by the Central Water Commission and published on the public record. The panchang, computed. Ninety seconds away from the screen. And your own words, written once and read back to you every morning after.",
      "The practice is yours. You say it, you keep it, and the mark you keep carries a number a stranger can go and check.",
      "We did not put the river in a computer. We put the computer downstream.",
    ],
  },

  form: {
    eyebrow: "The form",
    title: "Five limbs, two hundred and seventy seconds, the same every day.",
    lede: "The form does not change. The same five limbs, in the same order, at the same lengths. It opens with four seconds in which every piece of furniture leaves the screen and the night edition sets itself, because it is six in the morning. After that only the river changes, and she changes on her own.",
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
          "Five lines set themselves, one every four seconds, the way an almanac prints an entry rather than the way a page loads. The river and the ghat. The level in metres and how far it has moved since midnight. The flow in cumecs. The hour the gauge was read, and by whom. Then the distance between you and that water.",
          "That last line is the one people repeat back. Six thousand seven hundred kilometres from Leicester. Two hundred and four from Delhi. It is a great circle drawn from the phone in your hand to the gauge standing in the river, so it is a different sentence for every person who reads this page, and both of those are good sentences.",
          "Behind the type, one hairline rule sits at the true level. On a morning the river is in spate the screen is almost all dark water above a thin band of paper. On a low February morning the line sits near the bottom. You work it out yourself inside a week, and it is the thing you end up telling someone about.",
        ],
        specimen: {
          note: "Set as it prints. These figures are a specimen, not this hour. The live readings are on the six water pages, free, with no account.",
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
            "One hairline at the true reading, mapped between the station's low water datum and the danger level the agency itself publishes. That is the entire indicator, and it is the only thing on the screen keeping time.",
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
          "The waterline rises for four seconds and falls for six, six times over. That is six breaths a minute with a long exhale, which is the rate a body settles at rather than a number anyone picked for the look of it.",
          "The words in and out appear on the first two cycles and then stop for good. The instruction removes itself once you have the pattern. That is the whole difference between a ritual and an interface.",
          "How far the line travels is scaled by today's flow. A river in flood breathes bigger. Sixty seconds either way, physically different every morning, and not one frame of it is invented.",
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
          "The water goes still and one line appears: say who you are. Beneath it the sankalp is already set, with your name, your gotra if your family keeps one, the city the phone is standing in, the water you chose, and today's masa, paksha and tithi. Your own words sit in the last line of it.",
          "You write those words once, on the first morning, and never again. Typing forty words at six in the morning destroys the thing. Reading your own forty words back at six in the morning is the thing.",
          "Then you press and hold, anywhere on the screen, and this is the part of the product we would defend first.",
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
          "Put the phone down. Face down, if you like. The screen goes fully black, the brightness drops, the wake lock holds, and the river keeps running. For ninety of the two hundred and seventy seconds we show you nothing at all.",
          "If you pick the phone up in the middle, nothing happens. No counter, no penalty, no note about it afterwards. A ritual does not police.",
          "One bell at ninety seconds, and the screen comes back at a fifth of its brightness.",
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
          "The morning writes itself into your register as a single ruled line, set exactly as an almanac sets an entry: the date, the tithi, the water and her level, the hour the gauge was read, and the ninety seconds.",
          "Beneath it, the count. Then the mark itself is drawn from the reading, and the river fades out over eight seconds.",
        ],
      },
    ],
    restraint: {
      label: "One restraint",
      body: "The waterline is the only sign of time passing, and it is busy doing something else. A progress bar is the most form-like object in software, and this is not a form.",
    },
  },

  hold: {
    label: "Eleven seconds",
    title: "Held under your thumb, and it cannot be hurried.",
    body: [
      "While you hold, your own vow fills with vermillion from left to right, the way ink soaks into paper rather than the way a bar fills, over eleven seconds exactly.",
      "Eleven seconds of keeping a thumb still while you read your own words is a genuinely long time. Let go early and the ink drains back. No error, no red, no scolding. It retreats, and you begin again.",
      "It cannot be skipped and it cannot be sped up, and that is the entire point of it. It is the closest a screen gets to standing still in cold water. When the ink reaches the end there is one bell, the line sits fully in colour, and one word appears beneath it.",
    ],
    pull: "Spoken.",
    pullNote:
      "Not recorded. Not offered. Not accepted. Spoken, because speaking is the only thing that happened.",
  },

  still: {
    label: "Ninety seconds",
    title: "The best minute of this is the minute your screen is off.",
    body: "Most of what is on your phone is built to keep you looking at it. This one turns itself off in the middle and asks you to put it down. That is not a pause between the good parts. It is the spine of the thing, and it is the answer to every objection anyone has ever raised about whether a screen can carry a practice.",
    lines: ["Put the phone down. Face down, if you like.", "The river runs for ninety seconds."],
    note: "Full black, brightness dropped, wake lock held, the water still running. The ninety seconds run their length, today and every day.",
  },

  mark: {
    label: "The register",
    title: "One line a morning, kept for life.",
    body: [
      "Your register is the Jal Panjika, and it is set as a page of an almanac: one ruled line per morning, in the order the mornings happened, with the river's own condition on each of them.",
      "The count beneath it is stated the way an almanac states a thing and never the way a game does.",
    ],
    lineLabel: "The line, as it writes itself",
    line: "11 Aug · Shravan Shu. Ekadashi · Ganga 293.11 m · 04:38 · stillness 90 s",
    count: [
      "Forty-first consecutive morning.",
      "The Ganga has risen 1.4 m since your first.",
    ],
    note: "That second sentence is why people come back. You are not keeping a streak. You are watching a river change while you keep turning up, and your practice is measured against the river's own year rather than against yesterday. Breaking the run carries no shame, which is exactly why it gets broken less.",
    close: "Tomorrow, 04:41.",
  },

  chihna: {
    eyebrow: "Jal Chihna",
    title: "The mark the water left.",
    lede: "Every snan ends in one engraving, drawn from the river's own published reading at the minute you kept. It carries a number, it is yours, and no two have ever been alike.",
    drawLabel: "What draws it",
    draws: [
      {
        k: "Level",
        v: "The higher the water, the higher the horizon, and the more of the sheet is ink. A monsoon peak is a dark, crowded plate. A January morning is a pale, open one. You can tell what the river was doing from across a room.",
      },
      {
        k: "Flow",
        v: "More flow, more ripples, and rougher ones. Rivers are read on a log scale, so the difference shows at both ends rather than only in flood.",
      },
      {
        k: "Hour",
        v: "The disc is the sun by day and the moon at night, cut to the phase it actually held over that ghat at that minute. Amavasya is an empty outlined circle.",
      },
      {
        k: "Water",
        v: "Six waters, six foregrounds, each drawn once and held. Har Ki Pauri has its step run. Talakaveri has the spring and the tank, which is what stands there.",
      },
      {
        k: "You",
        v: "Your name, your gotra and the second you kept bend the channel. Two people who keep the same minute at the same water still take away different sheets.",
      },
    ],
    forgeLabel: "Why it cannot be forged",
    forgeTitle: "The seed contains the government's own number.",
    forgeBody: [
      "The picture is drawn from a seed, and the seed is a sha256 hash of a single line of text. That line holds the station identifier, the instant the agency published the reading, the level in metres, the flow in cumecs, the second you kept, and your name.",
      "So to mint a chihna showing a monsoon peak you would have to forge the Government of India's gauge record, because the peak is inside the string that produced the hash.",
      "The whole line is printed on the verification page. Run sha256 over it yourself and you get the seed printed on your sheet. Take the level to the agency's own record for that station and that hour and you get the same number. We are not asking to be believed.",
    ],
    seedLabel: "The line the picture is drawn from",
    seedLine:
      "snanify.chihna|1|ganga-haridwar|{station}|{observed}|293.110|1240.000|{kept}|{name}|{gotra}",
    seedNote:
      "The shape of it. Your own line carries your station, your instants and your name, and it is printed in full where any stranger can run a hash across it.",
    flood:
      "When the water stands above the level the agency publishes as its danger line, the sheet prints that, and it does not celebrate. That is a flood, and people downstream are being moved.",
  },

  before: {
    eyebrow: "Before you pay",
    title: "The four things people ask.",
    items: [
      {
        q: "Do I have to be awake at four?",
        a: "No. The panchang names an hour and the notification arrives at whatever hour you told us you wake. Nothing stops you at any other. The form is short enough that a person who is running late does it anyway, which is the property that actually builds a habit.",
      },
      {
        q: "What happens when the gauge goes quiet?",
        a: "The screen prints the last real reading with its true hour and its true age: read 01:38 IST, three hours and twelve minutes ago. Every number on the screen is a number the gauge actually published, at the hour it actually published it. It stays as fresher than it is. A stale honest reading is completely fine. A fabricated fresh one would end this.",
      },
      {
        q: "Can I shorten it?",
        a: "The form runs its full length, every morning, including the ninety seconds. A practice you can put into quick mode is a preference, and this one is built to be a practice.",
      },
      {
        q: "Who sees my sankalp?",
        a: "Your words stay yours. What the verification page returns to a stranger is the river, the station, the level and the minute, which is exactly the part that is theirs to check.",
      },
    ],
  },

  tariff: {
    eyebrow: "The tariff",
    title: "Paid, and priced like a morning.",
    lede: "The live water, the panchang, every muhurat and each of the six rivers' own pages are free forever, to anybody, and they open the moment you tap them. The four and a half minutes are the part you buy.",
    heads: { price: "Price", per: "Per snan" },
    rows: [
      {
        key: "one",
        name: "Ek Dhara",
        deva: "एक धारा",
        what: "One snan",
        body: "One morning, taken once. Enough to find out what four and a half minutes with a real river is like before you decide anything else.",
      },
      {
        key: "eleven",
        name: "Gyarah",
        deva: "ग्यारह",
        what: "Eleven snans",
        body: "Eleven mornings, which is long enough to know whether you will keep it, and eleven is the count this tradition gives things in. One charge, eleven snans, taken whenever you take them. They do not expire.",
        hero: true,
      },
      {
        key: "sixty",
        name: "Varsh Kosh",
        deva: "वर्ष कोष",
        what: "Sixty snans",
        body: "Two unbroken months, or a year of the mornings that matter, at the lowest rate we set. These do not expire either.",
      },
    ],
    heroLabel: "The one to take",
    heroWhyLabel: "Why eleven",
    heroBody: [
      "Gyarah is the one to take, and the reason is arithmetic rather than persuasion. Eleven snans in a single charge is exactly one dollar each, and a dollar is the lowest a snan can honestly be sold for.",
      "A single charge of one hands about a third of itself to the card networks. Eleven in one charge keeps that third in the price, which is how a morning stays at one.",
    ],
    freeLabel: "Free forever, no account",
    freeBody:
      "The live state of all six waters, the panchang, every muhurat and its occasions, and each river's own page. The part of this site that is for reading is free, and it stays free. The snan is the part you pay for.",
    cta: "Choose your water",
    ctaNote:
      "Six waters. The one your family is from, or the one you have always meant to see.",
  },

  closing: {
    title: "The Ganga stands at her own level this hour, whether anyone is watching or not.",
    body: "You can be one of the people watching, for four and a half minutes, before the day starts.",
    cta: "Take eleven snans, $11",
  },
};

/* --- हिन्दी ---------------------------------------------------------------- */

const hi: Copy = {
  meta: {
    title: "स्नान, साढ़े चार मिनट एक सच्ची नदी के साथ",
    description:
      "एक डिजिटल स्नान। साढ़े चार मिनट, इस घंटे के अपने गेज पाठ के साथ; ग्यारह सेकंड थमा हुआ संकल्प; नब्बे सेकंड की काली स्क्रीन; और एक चिह्न जिसे गढ़ा नहीं जा सकता। ग्यारह सुबहें, हर सुबह के लिए एक।",
  },

  crumbs: { home: "मुखपृष्ठ", here: "स्नान" },

  hero: {
    eyebrow: "जल संकल्प",
    titleA: "साढ़े चार मिनट।",
    titleB: "नदी आप तक आती है।",
    lede: "एक डिजिटल स्नान। आप दो सौ सत्तर सेकंड उस नदी के साथ बैठते हैं जो इस घंटे वास्तव में जिस स्तर पर है, केंद्रीय जल आयोग द्वारा मापी हुई। उसी की लय पर साँस लेते हैं, अपना संकल्प ग्यारह सेकंड अंगूठे के नीचे थामे रखते हैं, और नब्बे सेकंड के लिए फ़ोन नीचे रख देते हैं। आपकी पंजिका में एक पंक्ति दर्ज होती है, और उसी पाठ से एक चिह्न बनता है, जिस जैसा दूसरा कभी हुआ नहीं।",
    offer:
      "ग्यारह सुबहें {price} में, हर सुबह के लिए एक। सजीव जल, पंचांग, मुहूर्त और हर नदी का अपना पृष्ठ सदा, सबके लिए, निःशुल्क पढ़े जा सकते हैं।",
    ctaPrimary: "ग्यारह सुबहें लीजिए, {price}",
    ctaSecondary: "इन साढ़े चार मिनटों में क्या होता है",
  },

  sticky: {
    name: "ग्यारह, ११ सुबहें",
    cta: "जल चुनिए",
  },

  truth: {
    label: "जो वास्तव में सत्य है",
    title: "यहाँ सब कुछ वास्तविक है, और वह आपका है।",
    body: [
      "एक नदी, इस घंटे वह जिस जलस्तर और प्रवाह पर वास्तव में है, केंद्रीय जल आयोग द्वारा मापी और सार्वजनिक अभिलेख में प्रकाशित। पंचांग, गणना किया हुआ। नब्बे सेकंड जो स्क्रीन से दूर बीतते हैं। और आपके अपने शब्द, जो एक बार लिखे जाते हैं और हर सुबह आपको लौटाकर पढ़ाए जाते हैं।",
      "साधना आपकी है। आप उसे कहते हैं, आप उसे निभाते हैं, और जो चिह्न आपके पास रहता है वह एक ऐसा अंक लिए होता है जिसे कोई अजनबी जाकर जाँच सकता है।",
      "हमने नदी को कंप्यूटर में नहीं रखा। हमने कंप्यूटर को नदी के नीचे रखा।",
    ],
  },

  form: {
    eyebrow: "स्वरूप",
    title: "पाँच अंग, दो सौ सत्तर सेकंड, हर दिन वही।",
    lede: "स्वरूप बदलता नहीं। वही पाँच अंग, वही क्रम, वही अवधि। आरंभ के चार सेकंड में स्क्रीन से सारा साज-सामान हट जाता है और रात्रि संस्करण स्वयं लग जाता है, क्योंकि समय भोर का है। उसके बाद केवल नदी बदलती है, और वह अपने आप बदलती है।",
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
          "पाँच पंक्तियाँ एक-एक कर बैठती हैं, हर चार सेकंड में एक, जैसे पंचांग कोई प्रविष्टि छापता है, न कि जैसे कोई पृष्ठ खुलता है। नदी और घाट। मीटर में जलस्तर, और आधी रात से वह कितना चला। क्यूमेक में प्रवाह। किस घंटे और किसने पाठ लिया। और अंत में, उस जल से आपकी दूरी।",
          "यही अंतिम पंक्ति लोग दोहराकर बताते हैं। लेस्टर से छह हज़ार सात सौ किलोमीटर। दिल्ली से दो सौ चार। यह आपके हाथ के फ़ोन से लेकर नदी में खड़े गेज तक खींची गई सीधी रेखा है, इसलिए यह पृष्ठ पढ़ने वाले हर व्यक्ति के लिए अलग वाक्य है, और दोनों ही अच्छे वाक्य हैं।",
          "अक्षरों के पीछे एक बाल-बराबर रेखा सच्चे जलस्तर पर टिकी रहती है। जिस सुबह नदी उफान पर हो, स्क्रीन लगभग पूरी गहरे जल की होती है और कागज़ की पतली पट्टी भर ऊपर बचती है। फ़रवरी की किसी कम जल वाली सुबह वह रेखा नीचे बैठी होती है। यह कोई आपको समझाता नहीं। सप्ताह भर में आप स्वयं देख लेते हैं, और यही बात आप किसी को बताते हैं।",
        ],
        specimen: {
          note: "जैसा छपता है, वैसा ही रखा गया। ये अंक नमूना हैं, आज का पाठ नहीं। सजीव पाठ छहों जल-पृष्ठों पर हैं, निःशुल्क, बिना किसी खाते के।",
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
            "सच्चे पाठ पर एक बाल-बराबर रेखा, स्टेशन के न्यूनतम जल-मान और एजेंसी के अपने प्रकाशित संकट स्तर के बीच मापी हुई। सूचक बस यही है, और स्क्रीन पर समय गिनने वाली और कोई वस्तु नहीं है।",
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
          "जलरेखा चार सेकंड चढ़ती है और छह सेकंड उतरती है, छह बार। यह मिनट में छह साँसें हुईं, लंबे निःश्वास के साथ, और यही वह गति है जिस पर शरीर स्वयं ठहरता है। यह अंक किसी ने सुंदर लगने के कारण नहीं चुना।",
          "भीतर और बाहर, ये दो शब्द केवल पहले दो चक्रों में दिखते हैं और फिर सदा के लिए हट जाते हैं। लय आ जाने पर निर्देश स्वयं को हटा देता है। साधना और अंतरफलक का पूरा अंतर यही है।",
          "रेखा कितनी दूर तक जाएगी, यह आज के प्रवाह से तय होता है। उफान पर नदी बड़ी साँस लेती है। साठ सेकंड दोनों दिन वही, पर हर सुबह भौतिक रूप से भिन्न, और उसका एक भी फ़्रेम गढ़ा हुआ नहीं।",
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
          "जल स्थिर हो जाता है और एक पंक्ति उभरती है: कहिए, आप कौन हैं। उसके नीचे संकल्प पहले से भरा हुआ रहता है, आपके नाम के साथ, गोत्र के साथ यदि आपका परिवार रखता है, उस नगर के साथ जहाँ फ़ोन खड़ा है, चुने हुए जल के साथ, और आज के मास, पक्ष तथा तिथि के साथ। अंतिम पंक्ति में आपके अपने शब्द बैठे रहते हैं।",
          "वे शब्द आप पहली सुबह एक बार लिखते हैं, फिर कभी नहीं। भोर में चालीस शब्द टाइप करना इस वस्तु को नष्ट कर देता है। भोर में अपने ही चालीस शब्द पढ़ना, वस्तु वही है।",
          "फिर आप स्क्रीन पर कहीं भी दबाकर थामे रहते हैं, और उत्पाद का यही अंश हम सबसे पहले बचाएँगे।",
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
          "फ़ोन नीचे रख दीजिए। चाहें तो उल्टा। स्क्रीन पूरी तरह काली हो जाती है, चमक गिर जाती है, जागरण-ताला लगा रहता है, और नदी बहती रहती है। दो सौ सत्तर में से नब्बे सेकंड हम आपको कुछ भी नहीं दिखाते।",
          "बीच में फ़ोन उठा लें तो कुछ नहीं होता। न कोई गिनती, न दंड, न बाद में उसका कोई ज़िक्र। साधना पहरा नहीं देती।",
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
          "वह सुबह आपकी पंजिका में स्वयं लिख जाती है, एक ही पंक्ति में, ठीक वैसे जैसे पंचांग कोई प्रविष्टि रखता है: दिनांक, तिथि, जल और उसका स्तर, पाठ का घंटा, और वे नब्बे सेकंड।",
          "उसके नीचे गणना। फिर उसी पाठ से चिह्न खिंचता है, और नदी आठ सेकंड में धीरे-धीरे शांत हो जाती है।",
        ],
      },
    ],
    restraint: {
      label: "एक संयम",
      body: "इसमें कहीं कोई प्रगति-पट्टी नहीं है। सॉफ़्टवेयर में प्रगति-पट्टी से अधिक फ़ॉर्म जैसी कोई दूसरी वस्तु नहीं होती। समय बीतने का एकमात्र चिह्न जलरेखा है, और वह अपने आप में दूसरा काम कर रही है।",
    },
  },

  hold: {
    label: "ग्यारह सेकंड",
    title: "अंगूठे के नीचे थमा हुआ, और इसे जल्दी नहीं निपटाया जा सकता।",
    body: [
      "जब तक आप थामे रहते हैं, आपका अपना संकल्प बाईं ओर से दाईं ओर सिंदूरी रंग से भरता जाता है, जैसे स्याही कागज़ में उतरती है, न कि जैसे कोई पट्टी भरती है। पूरे ग्यारह सेकंड।",
      "अपने ही शब्द पढ़ते हुए ग्यारह सेकंड अंगूठा स्थिर रखना सचमुच लंबा समय है। पहले छोड़ दिया तो स्याही लौट जाती है। न कोई त्रुटि, न लाल चेतावनी, न कोई डाँट। वह पीछे हट जाती है, और आप फिर से आरंभ करते हैं।",
      "इसे न छोड़ा जा सकता है, न जल्दी किया जा सकता है, और पूरी बात यही है। ठंडे जल में स्थिर खड़े रहने के सबसे निकट कोई स्क्रीन इतना ही पहुँच सकती है। स्याही अंत तक पहुँचती है, एक घंटी बजती है, पंक्ति पूरी रंग जाती है, और नीचे एक शब्द उभरता है।",
    ],
    pull: "उच्चारित।",
    pullNote:
      "रिकॉर्ड नहीं। अर्पित नहीं। स्वीकृत नहीं। उच्चारित, क्योंकि हुआ केवल इतना ही है।",
  },

  still: {
    label: "नब्बे सेकंड",
    title: "इसका सबसे अच्छा मिनट वह है जब आपकी स्क्रीन बंद रहती है।",
    body: "आपके फ़ोन में जो कुछ है, उसका अधिकांश इसी के लिए बना है कि आप देखते रहें। यह बीच में स्वयं को बुझा देता है और कहता है कि फ़ोन नीचे रख दीजिए। यह दो अच्छे भागों के बीच का ठहराव नहीं है। यही इसकी रीढ़ है, और यही उस हर आपत्ति का उत्तर है कि कोई स्क्रीन साधना उठा सकती है या नहीं।",
    lines: ["फ़ोन नीचे रख दीजिए। चाहें तो उल्टा।", "नब्बे सेकंड नदी बहती रहेगी।"],
    note: "पूरी तरह काली स्क्रीन, घटी हुई चमक, लगा हुआ जागरण-ताला, और बहता हुआ जल। न कोई त्वरित विधि है, न छोड़ने का बटन, और न आगे होगा।",
  },

  mark: {
    label: "पंजिका",
    title: "हर सुबह एक पंक्ति, जीवन भर के लिए रखी हुई।",
    body: [
      "आपकी पंजिका जल पंजिका है, और वह पंचांग के पन्ने की तरह छपती है: हर सुबह एक पंक्ति, उसी क्रम में जिस क्रम में सुबहें बीतीं, और हर एक के साथ उस दिन नदी की अपनी स्थिति।",
      "नीचे की गणना उसी ढंग से कही जाती है जिस ढंग से पंचांग कोई बात कहता है, किसी खेल के ढंग से कभी नहीं।",
    ],
    lineLabel: "पंक्ति, जैसी स्वयं लिखती है",
    line: "११ अग. · श्रावण शु. एकादशी · गंगा २९३·११ मी · ०४:३८ · मौन ९० से.",
    count: [
      "इकतालीसवीं लगातार सुबह।",
      "आपकी पहली सुबह से गंगा १·४ मी चढ़ चुकी हैं।",
    ],
    note: "दूसरी पंक्ति ही वह कारण है जिससे लोग लौटते हैं। आप कोई शृंखला नहीं जोड़ रहे। आप एक नदी को बदलते हुए देख रहे हैं और साथ-साथ स्वयं आते रहते हैं, और आपकी साधना कल के मुक़ाबले नहीं, नदी के अपने वर्ष के मुक़ाबले नापी जाती है। क्रम टूटने पर कोई लज्जा नहीं है, और ठीक इसीलिए वह कम टूटता है।",
    close: "कल, ०४:४१।",
  },

  chihna: {
    eyebrow: "जल चिह्न",
    title: "जो चिह्न जल छोड़ गया।",
    lede: "हर स्नान के अंत में एक उत्कीर्ण चित्र बनता है, जो उसी मिनट के नदी के प्रकाशित पाठ से खिंचता है। उस पर एक क्रमांक होता है, वह आपका होता है, और आज तक दो चिह्न एक जैसे नहीं हुए।",
    drawLabel: "इसे क्या बनाता है",
    draws: [
      {
        k: "जलस्तर",
        v: "जल जितना ऊँचा, क्षितिज उतना ऊँचा, और पन्ने पर स्याही उतनी अधिक। वर्षा के शिखर का पत्र गहरा और भरा हुआ होता है। जनवरी की सुबह का पत्र हल्का और खुला। नदी क्या कर रही थी, यह कमरे के दूसरे छोर से दिख जाता है।",
      },
      {
        k: "प्रवाह",
        v: "प्रवाह जितना तेज़, तरंगें उतनी अधिक और उतनी ही खुरदरी। नदियाँ लघुगणक पर पढ़ी जाती हैं, इसलिए अंतर केवल बाढ़ में नहीं, दोनों छोरों पर दिखता है।",
      },
      {
        k: "बेला",
        v: "बिंब दिन में सूर्य है और रात्रि में चंद्र, उसी घाट पर उसी मिनट की अपनी कला में कटा हुआ। अमावस्या केवल एक खाली वृत्त-रेखा है।",
      },
      {
        k: "जल",
        v: "छह जल, छह अग्रभूमियाँ, हर एक एक ही बार बनाई और फिर कभी न बदली। हर की पौड़ी में उसकी सीढ़ियाँ हैं। तालकावेरी में नदी है ही नहीं, क्योंकि वहाँ नदी है ही नहीं।",
      },
      {
        k: "आप",
        v: "आपका नाम, आपका गोत्र और वह क्षण जो आपने रखा, धारा का मोड़ तय करते हैं। एक ही जल पर एक ही मिनट रखने वाले दो लोग भी अलग-अलग पत्र लेकर उठते हैं।",
      },
    ],
    forgeLabel: "इसे गढ़ा क्यों नहीं जा सकता",
    forgeTitle: "बीज के भीतर सरकार की अपनी संख्या बैठी है।",
    forgeBody: [
      "चित्र एक बीज से बनता है, और बीज पाठ की एक ही पंक्ति का sha256 है। उस पंक्ति में स्टेशन की पहचान, एजेंसी ने पाठ जिस क्षण प्रकाशित किया, मीटर में जलस्तर, क्यूमेक में प्रवाह, वह सेकंड जो आपने रखा, और आपका नाम, सब समाया रहता है।",
      "इसलिए बाढ़ के शिखर वाला चिह्न गढ़ने के लिए आपको भारत सरकार का गेज अभिलेख गढ़ना पड़ेगा, क्योंकि वह शिखर उसी पंक्ति के भीतर है जिससे हैश बना।",
      "पूरी पंक्ति सत्यापन पृष्ठ पर छपी होती है। उस पर स्वयं sha256 चलाइए, वही बीज मिलेगा जो आपके पत्र पर छपा है। जलस्तर लेकर उसी स्टेशन और उसी घंटे के एजेंसी-अभिलेख में जाइए, वही संख्या मिलेगी। हम विश्वास करने को नहीं कह रहे।",
    ],
    seedLabel: "जिस पंक्ति से चित्र बनता है",
    seedLine:
      "snanify.chihna|1|ganga-haridwar|{station}|{observed}|293.110|1240.000|{kept}|{name}|{gotra}",
    seedNote:
      "यह उसका ढाँचा है। आपकी अपनी पंक्ति में आपका स्टेशन, आपके क्षण और आपका नाम होते हैं, और वह पूरी वहाँ छपी रहती है जहाँ कोई भी अजनबी उस पर हैश चला सके।",
    flood:
      "जब जल एजेंसी के प्रकाशित संकट स्तर से ऊपर हो, पत्र वही छापता है और उसका उत्सव नहीं करता। वह बाढ़ है, और नीचे के गाँव खाली कराए जा रहे हैं।",
  },

  before: {
    eyebrow: "देने से पहले",
    title: "चार बातें, जो लोग पूछते हैं।",
    items: [
      {
        q: "क्या चार बजे जागना अनिवार्य है?",
        a: "नहीं। पंचांग एक घड़ी का नाम लेता है, और सूचना उसी समय आती है जो समय आपने जागने का बताया है। किसी और घड़ी पर कोई रोक नहीं। स्वरूप इतना छोटा है कि देर से उठा व्यक्ति भी उसे कर ही लेता है, और आदत असल में इसी गुण से बनती है।",
      },
      {
        q: "गेज चुप हो जाए तो?",
        a: "स्क्रीन अंतिम सच्चा पाठ छापती है, उसके सच्चे घंटे और सच्ची आयु के साथ: पाठ ०१:३८ भा.मा.स., तीन घंटे बारह मिनट पहले। बीच का कोई अंक गढ़ा नहीं जाता, कोई रेखा चिकनी नहीं की जाती, और कोई संख्या जितनी पुरानी है उससे नई नहीं दिखाई जाती। पुराना पर सच्चा पाठ पूरी तरह ठीक है। गढ़ा हुआ ताज़ा पाठ इस सबका अंत होगा।",
      },
      {
        q: "क्या इसे छोटा किया जा सकता है?",
        a: "नहीं। न कोई त्वरित विधि है, न छोड़ने का बटन, न कोई सेटिंग जो वे नब्बे सेकंड हटा दे। जिस विधि को त्वरित किया जा सके, वह साधना नहीं, सुविधा है।",
      },
      {
        q: "मेरा संकल्प कौन देखता है?",
        a: "कोई नहीं। आपके अपने शब्द सत्यापन पृष्ठ कभी नहीं लौटाता, और वे किसी लिंक की झलक में कभी नहीं रखे जाते। कोई अजनबी नदी, स्टेशन, जलस्तर और वह मिनट जाँच सकता है, और जाँचने का अधिकार उसे इतने पर ही है।",
      },
    ],
  },

  tariff: {
    eyebrow: "शुल्क",
    title: "सशुल्क, और एक सुबह के भाव पर।",
    lede: "कोई निःशुल्क स्नान नहीं है, और होने वाला भी नहीं था। सजीव जल, पंचांग, हर मुहूर्त और छहों नदियों के पृष्ठ सदा निःशुल्क हैं, किसी के लिए भी, बिना किसी खाते के। शुल्क उन साढ़े चार मिनटों का है।",
    heads: { price: "Price", per: "प्रति स्नान" },
    rows: [
      {
        key: "one",
        name: "Ek Dhara",
        deva: "एक धारा",
        what: "एक स्नान",
        body: "एक सुबह, एक बार। आगे कुछ भी तय करने से पहले इतना जान लेने के लिए कि एक सच्ची नदी के साथ साढ़े चार मिनट कैसे बीतते हैं।",
      },
      {
        key: "eleven",
        name: "Gyarah",
        deva: "ग्यारह",
        what: "ग्यारह स्नान",
        body: "ग्यारह सुबहें, जितनी यह जान लेने के लिए पर्याप्त हैं कि आप इसे निभाएँगे या नहीं, और ग्यारह वही गिनती है जिसमें यह परंपरा वस्तुएँ देती आई है। एक भुगतान, ग्यारह स्नान, जब चाहें तब लिए हुए। इनकी कोई अवधि समाप्त नहीं होती।",
        hero: true,
      },
      {
        key: "sixty",
        name: "Varsh Kosh",
        deva: "वर्ष कोष",
        what: "साठ स्नान",
        body: "दो महीने बिना नागा, या वर्ष भर की वे सुबहें जो मायने रखती हैं, और वह भी हमारी सबसे कम दर पर। इनकी भी कोई अवधि समाप्त नहीं होती।",
      },
    ],
    heroLabel: "लेने योग्य यही है",
    heroWhyLabel: "ग्यारह ही क्यों",
    heroBody: [
      "ग्यारह ही लेने योग्य है, और कारण मनुहार नहीं, गणित है। एक ही भुगतान में ग्यारह स्नान, यानी ठीक एक डॉलर प्रति स्नान, और इससे कम पर एक स्नान ईमानदारी से बेचा नहीं जा सकता।",
      "अकेला एक डॉलर अपना लगभग तीसरा हिस्सा कार्ड नेटवर्क को दे बैठता है, जिससे किसी का कुछ नहीं बनता। ग्यारह एक साथ लेने पर वह डॉलर भी बचता है और भाव भी।",
    ],
    freeLabel: "सदा निःशुल्क, बिना खाते के",
    freeBody:
      "छहों जल की सजीव स्थिति, पंचांग, हर मुहूर्त और उसके पर्व, और हर नदी का अपना पृष्ठ। इस स्थल का जो भाग पढ़ने का है वह निःशुल्क है और निःशुल्क ही रहेगा। शुल्क केवल स्नान का है।",
    cta: "जल चुनिए",
    ctaNote: "छह जल। वह जिससे आपका परिवार है, या वह जिसे आपने कभी देखा नहीं।",
  },

  closing: {
    title: "गंगा इस घंटे अपने ही स्तर पर हैं, कोई देखे या न देखे।",
    body: "दिन आरंभ होने से पहले, साढ़े चार मिनट के लिए, आप उन लोगों में हो सकते हैं जो देख रहे हैं।",
    cta: "ग्यारह स्नान लें, $11",
  },
};

export const snanContent = { en, hi } satisfies Record<Lang, Copy>;
