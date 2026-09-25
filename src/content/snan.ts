import type { Lang } from "@/lib/locales";
import type { TierKey } from "@/content/prices";
import type { Limb as LimbId } from "@/lib/sitting-plan";

/**
 * Copy for /snan, the page that sells and explains the snan itself.
 *
 * Two rules govern every string in this file, and they are not stylistic:
 *
 *  1. NO PHYSICAL RITE IS EVER CLAIMED. Nobody stands in any river. Nothing is
 *     performed at any ghat, for anyone, ever.
 *  2. NO OUTCOME IS EVER PROMISED. There is not one guaranteed result anywhere
 *     in the tariff or above it.
 *
 * Those forbid the claim, not the silence, and this page states neither the
 * claim nor its denial. It says what happens. The commitment stated at length
 * lives on /faq#how, which every page links.
 *
 * The copy rules are in CLAUDE.md.
 *
 * WHAT IS TRUE, and therefore what this page says: the river's flow for the
 * day is the Copernicus GloFAS model's published figure, read through
 * Open-Meteo, and the word is "modelled", every time. The durations come from
 * src/lib/sitting-plan.ts and the component prints them; they are never
 * written out here. The Sankalp Patra's seed is a SHA-256 of the line
 * src/lib/seed.ts builds, and the fields named here are that line's fields.
 *
 * NO PRICE IS EVER WRITTEN OUT IN THIS FILE. `{price}` is filled at render
 * from src/content/prices.ts, in the reader's own currency.
 *
 * The whole shape is declared as `Copy`, so a key missing from either locale
 * is a compile error rather than a page that silently renders English to a
 * Hindi reader. Hindi is written, not translated.
 */

/* --- types --------------------------------------------------------------- */

export type Limb = {
  /** The limb's key in src/lib/sitting-plan.ts, which gives it its clock and length. */
  readonly id: LimbId;
  readonly title: string;
  readonly body: readonly string[];
};

export type Pair = { readonly k: string; readonly v: string };

export type Question = { readonly q: string; readonly a: string };

export type TariffRow = {
  /** Which line of src/content/prices.ts this row shows. */
  readonly key: TierKey;
  /** "Eleven mornings": the count is the name. */
  readonly name: string;
  readonly body: string;
  /** The hero SKU. Exactly one row carries this. */
  readonly hero?: true;
};

type Copy = {
  readonly meta: { readonly title: string; readonly description: string };

  /** The trail, for the breadcrumb node and nothing else. */
  readonly crumbs: { readonly home: string; readonly here: string };

  readonly hero: {
    readonly title: string;
    readonly lede: string;
    readonly offer: string;
    readonly ctaPrimary: string;
    readonly ctaSecondary: string;
  };

  readonly sticky: {
    readonly name: string;
    readonly cta: string;
  };

  readonly form: {
    readonly title: string;
    readonly lede: string;
    readonly clockHead: string;
    readonly lengthHead: string;
    /** "{n} seconds", filled from the sitting plan. */
    readonly seconds: string;
    readonly limbs: readonly Limb[];
  };

  readonly still: {
    readonly title: string;
    readonly body: string;
    readonly instruction: string;
    readonly note: string;
  };

  readonly patra: {
    readonly title: string;
    readonly lede: string;
    readonly carries: readonly Pair[];
    readonly engravingTitle: string;
    readonly engravingBody: readonly string[];
  };

  readonly before: {
    readonly title: string;
    readonly items: readonly Question[];
  };

  readonly tariff: {
    readonly title: string;
    readonly lede: string;
    readonly heads: {
      readonly price: string;
      readonly per: string;
    };
    readonly rows: readonly TariffRow[];
    readonly note: string;
    readonly cta: string;
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
    title: "The snan, three minutes with your river",
    description:
      "Three minutes with the river you grew up near, at the hour the panchang names, and a Sankalp Patra with your family's names. Eleven mornings for eleven.",
  },

  crumbs: { home: "Home", here: "The snan" },

  hero: {
    title: "Three minutes with your river.",
    lede: "You choose a river. Every morning it shows you today's flow, and you sit with it for three minutes. At the end you have a Sankalp Patra with your family's names on it.",
    offer: "Eleven mornings for {price}. Take them whenever you like.",
    ctaPrimary: "Begin your snan",
    ctaSecondary: "See the five parts",
  },

  sticky: {
    name: "Eleven mornings",
    cta: "Begin",
  },

  form: {
    title: "The five parts",
    lede: "The same five parts in the same order every morning. Only the river changes.",
    clockHead: "Starts at",
    lengthHead: "Length",
    seconds: "{n} seconds",
    limbs: [
      {
        id: "reading",
        title: "The reading",
        body: [
          "The river and the ghat, today's flow, where that flow ranks against every day since 1997, and how far you are from the water.",
          "The figure is today's, and it changes every morning.",
        ],
      },
      {
        id: "breath",
        title: "The breath",
        body: [
          "The waterline rises and falls. Four seconds in, six seconds out.",
          "How far it travels depends on today's flow. A river in flood breathes bigger.",
        ],
      },
      {
        id: "hold",
        title: "The sankalp",
        body: [
          "Your own words, written once when you set up. The water goes still and they sit on the screen.",
          "Put your thumb on them and hold. Ink fills the line over eleven seconds. Let go early and it drains, and you start the hold again.",
        ],
      },
      {
        id: "stillness",
        title: "The stillness",
        body: [
          "Put the phone down. The screen goes black for a minute and the river keeps running.",
          "Pick it up early and the minute still runs to the end.",
        ],
      },
      {
        id: "mark",
        title: "The mark",
        body: [
          "Your morning is written, and your Sankalp Patra is drawn from it.",
          "One morning a day. Every morning you keep is listed on your account page.",
        ],
      },
    ],
  },

  still: {
    title: "The screen goes black for a minute.",
    body: "Halfway through, the screen goes black and asks you to put the phone down. The river keeps running while you sit.",
    instruction: "Put the phone down.",
    note: "The minute runs its full length, today and every day.",
  },

  patra: {
    title: "The Sankalp Patra",
    lede: "Every snan ends in one sheet. It is yours to keep and to send.",
    carries: [
      { k: "Names", v: "Your name and up to five more from your household." },
      { k: "Portrait", v: "Your photograph, if you add one." },
      { k: "Prayer", v: "One prayer you choose when you set up." },
      {
        k: "The river",
        v: "The water and the ghat, the flow that morning, and its rank since 1997.",
      },
      { k: "The sky", v: "The tithi, the nakshatra and the moon that morning." },
      { k: "The moment", v: "When you kept it, in your own time and in India's." },
    ],
    engravingTitle: "The engraving",
    engravingBody: [
      "The band of water on the sheet is drawn from that morning: the water, the day and the flow.",
      "A river in spate draws dense and high. A slack one draws thin and low. Two mornings at the same water draw differently, because the flow was different.",
    ],
  },

  before: {
    title: "Before you pay",
    items: [
      {
        q: "Do I have to be up before sunrise?",
        a: "The panchang names the muhurat, and a reminder comes at the hour you choose, in your own time zone. Sit when you wake. One morning a day.",
      },
      {
        q: "What if there is no figure for today?",
        a: "The sheet stands on the river's usual flow for that week of the year.",
      },
      {
        q: "Can I make it shorter?",
        a: "Pressing nothing gives the whole three minutes. Next moves you on when you are ready, from the reading, the breath and the stillness.",
      },
      {
        q: "Who sees my sankalp?",
        a: "You. It stays on your own account. The sheet carries the names, the water and the figures, and that is what you send.",
      },
    ],
  },

  tariff: {
    title: "Prices",
    lede: "One price, in your own currency.",
    heads: { price: "Price", per: "Per morning" },
    rows: [
      {
        key: "one",
        name: "One morning",
        body: "To see what it is like.",
      },
      {
        key: "eleven",
        name: "Eleven mornings",
        body: "Paid once. Eleven days in a row, or spread across the year.",
        hero: true,
      },
      {
        key: "sixty",
        name: "Sixty mornings",
        body: "Five a month for a year, at the lowest price per morning.",
      },
    ],
    note: "Mornings keep until you use them.",
    cta: "Begin your snan",
  },

  closing: {
    title: "Begin tomorrow morning.",
    body: "Set it up tonight. Choose your river, add the names, and sit with it before the day starts.",
    cta: "Begin your snan",
  },
};

/* --- हिन्दी ---------------------------------------------------------------- */

const hi: Copy = {
  meta: {
    title: "स्नान, अपनी नदी के साथ तीन मिनट",
    description:
      "पंचांग की बताई घड़ी पर उस नदी के साथ तीन मिनट जिसके पास आप बड़े हुए, और एक संकल्प पत्र जिस पर आपके परिवार के नाम हैं। ग्यारह सुबहें, ग्यारह में।",
  },

  crumbs: { home: "मुखपृष्ठ", here: "स्नान" },

  hero: {
    title: "अपनी नदी के साथ तीन मिनट।",
    lede: "आप एक नदी चुनते हैं। हर सुबह वह आपको आज का प्रवाह दिखाती है, और आप उसके साथ तीन मिनट बैठते हैं। अंत में आपके पास एक संकल्प पत्र होता है जिस पर आपके परिवार के नाम हैं।",
    offer: "ग्यारह सुबहें {price} में। जब चाहें, तब लीजिए।",
    ctaPrimary: "अपना स्नान आरंभ कीजिए",
    ctaSecondary: "पाँच अंग देखिए",
  },

  sticky: {
    name: "ग्यारह सुबहें",
    cta: "आरंभ",
  },

  form: {
    title: "पाँच अंग",
    lede: "हर सुबह वही पाँच अंग, उसी क्रम में। केवल नदी बदलती है।",
    clockHead: "आरंभ",
    lengthHead: "अवधि",
    seconds: "{n} सेकंड",
    limbs: [
      {
        id: "reading",
        title: "पाठ",
        body: [
          "नदी और घाट, आज का प्रवाह, 1997 से अब तक के हर दिन के सामने उसका स्थान, और उस जल से आपकी दूरी।",
          "आँकड़ा आज का है, और हर सुबह बदलता है।",
        ],
      },
      {
        id: "breath",
        title: "श्वास",
        body: [
          "जलरेखा उठती और उतरती है। चार सेकंड साँस भीतर, छह सेकंड बाहर।",
          "वह कितनी दूर तक जाती है, यह आज के प्रवाह पर निर्भर है। उफान पर नदी बड़ी साँस लेती है।",
        ],
      },
      {
        id: "hold",
        title: "संकल्प",
        body: [
          "आपके अपने शब्द, जो आपने सेटअप के समय एक बार लिखे। जल थम जाता है और वे स्क्रीन पर आ जाते हैं।",
          "उन पर अंगूठा रखिए और थामे रहिए। ग्यारह सेकंड में स्याही पंक्ति को भर देती है। पहले छोड़ दिया तो स्याही लौट जाती है, और आप फिर से थामते हैं।",
        ],
      },
      {
        id: "stillness",
        title: "मौन",
        body: [
          "फ़ोन नीचे रख दीजिए। स्क्रीन एक मिनट के लिए काली हो जाती है और नदी बहती रहती है।",
          "पहले उठा लें तो भी मिनट पूरा चलता है।",
        ],
      },
      {
        id: "mark",
        title: "चिह्न",
        body: [
          "आपकी सुबह लिखी जाती है, और उसी से आपका संकल्प पत्र बनता है।",
          "दिन में एक सुबह। आपकी हर रखी हुई सुबह आपके खाते के पृष्ठ पर सूचीबद्ध रहती है।",
        ],
      },
    ],
  },

  still: {
    title: "स्क्रीन एक मिनट के लिए काली हो जाती है।",
    body: "बीच में फ़ोन स्वयं बुझ जाता है और कहता है कि उसे नीचे रख दीजिए। आप बैठे रहते हैं और नदी बहती रहती है।",
    instruction: "फ़ोन नीचे रख दीजिए।",
    note: "मिनट पूरा चलता है, आज भी और हर दिन।",
  },

  patra: {
    title: "संकल्प पत्र",
    lede: "हर स्नान के अंत में एक पत्र बनता है। वह आपका है, रखने के लिए और भेजने के लिए।",
    carries: [
      { k: "नाम", v: "आपका नाम और आपके घर के पाँच और नाम।" },
      { k: "चित्र", v: "आपका चित्र, यदि आप जोड़ें।" },
      { k: "प्रार्थना", v: "एक प्रार्थना, जो आप सेटअप के समय चुनते हैं।" },
      {
        k: "नदी",
        v: "जल और घाट, उस सुबह का प्रवाह, और 1997 से उसका स्थान।",
      },
      { k: "आकाश", v: "उस सुबह की तिथि, नक्षत्र और चंद्रमा।" },
      { k: "क्षण", v: "आपने कब रखा, आपके अपने समय में और भारत के समय में।" },
    ],
    engravingTitle: "उत्कीर्ण चित्र",
    engravingBody: [
      "पत्र पर जल की पट्टी उसी सुबह से बनती है: जल, दिन और प्रवाह।",
      "उफान पर नदी घनी और ऊँची बनती है। मंद नदी पतली और नीची। एक ही जल की दो सुबहें मिलती-जुलती और अलग दिखती हैं, क्योंकि नदी वैसी ही थी।",
    ],
  },

  before: {
    title: "देने से पहले",
    items: [
      {
        q: "क्या सूर्योदय से पहले उठना ज़रूरी है?",
        a: "पंचांग मुहूर्त बताता है, और स्मरण उस घड़ी पर आता है जो आप चुनते हैं, आपके अपने समय-क्षेत्र में। जब जागें, तब बैठिए। दिन में एक सुबह।",
      },
      {
        q: "अगर आज का आँकड़ा न हो तो?",
        a: "पत्र वर्ष के उस सप्ताह के नदी के सामान्य प्रवाह पर टिकता है।",
      },
      {
        q: "क्या इसे छोटा किया जा सकता है?",
        a: "कुछ न दबाने पर पूरे तीन मिनट मिलते हैं। जब आप तैयार हों, \"आगे\" आपको पाठ, श्वास और मौन से आगे ले जाता है।",
      },
      {
        q: "मेरा संकल्प कौन देखता है?",
        a: "आप। वह आपके अपने खाते में रहता है। पत्र पर नाम, जल और आँकड़े होते हैं, और आप वही भेजते हैं।",
      },
    ],
  },

  tariff: {
    title: "मूल्य",
    lede: "एक मूल्य, आपकी अपनी मुद्रा में।",
    heads: { price: "मूल्य", per: "प्रति सुबह" },
    rows: [
      {
        key: "one",
        name: "एक सुबह",
        body: "यह देखने के लिए कि यह कैसा है।",
      },
      {
        key: "eleven",
        name: "ग्यारह सुबहें",
        body: "एक बार का भुगतान। लगातार ग्यारह दिन, या पूरे वर्ष में फैली हुई।",
        hero: true,
      },
      {
        key: "sixty",
        name: "साठ सुबहें",
        body: "महीने में पाँच, पूरे वर्ष, प्रति सुबह सबसे कम मूल्य पर।",
      },
    ],
    note: "सुबहें तब तक रखी रहती हैं जब तक आप उन्हें लें।",
    cta: "अपना स्नान आरंभ कीजिए",
  },

  closing: {
    title: "कल सुबह आरंभ कीजिए।",
    body: "आज रात सेटअप कर लीजिए। नदी चुनिए, नाम जोड़िए, और दिन शुरू होने से पहले उसके साथ बैठिए।",
    cta: "अपना स्नान आरंभ कीजिए",
  },
};

export const snanContent = { en, hi } satisfies Record<Lang, Copy>;
