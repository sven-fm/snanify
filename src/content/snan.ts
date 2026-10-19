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
    /** "Three minutes with your {river}.": the river word is set in sindoor. */
    readonly title: string;
    readonly riverWord: string;
    readonly band: string;
    readonly lede: string;
    readonly offer: string;
    readonly ctaPrimary: string;
  };

  readonly form: {
    readonly title: string;
    readonly lede: string;
    readonly lengthHead: string;
    /** "{n} seconds", filled from the sitting plan. */
    readonly seconds: string;
    readonly limbs: readonly Limb[];
  };

  /** The walkthrough in the phone: one caption per screen, "|" breaks a line,
      the *starred* word goes sindoor. Then the jump buttons' label. */
  readonly walk: {
    readonly captions: readonly [string, string, string, string, string];
    readonly show: string;
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
    /** The title for rupee readers, with `{price:eleven}` filled at render. */
    readonly titleInr: string;
    readonly lede: string;
    readonly heads: {
      readonly price: string;
      readonly per: string;
    };
    readonly rows: readonly TariffRow[];
    readonly note: string;
    readonly choose: string;
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
      "Three minutes with the river you grew up near, at the hour the panchang names, and a Sankalp Patra with your family's names. Eleven mornings. Your first one today.",
  },

  crumbs: { home: "Home", here: "The snan" },

  hero: {
    title: "Three minutes with your {river}.",
    riverWord: "river",
    band: "Takes just 3 minutes. Then share it with your family.",
    lede: "Pick the river you grew up near. Each morning it shows you how it runs today. Sit with it, breathe, and make your sankalp.",
    offer: "Eleven mornings. Your first one today.",
    ctaPrimary: "Start your snan now",
  },

  form: {
    title: "Your three minutes, in five parts",
    lede: "Every morning runs the same way. Only the river changes.",
    lengthHead: "Length",
    seconds: "{n} seconds",
    limbs: [
      {
        id: "reading",
        title: "The reading",
        body: [
          "You see your river and its ghat, how it runs today, how that ranks against every day since 1997, and how far you are from the water.",
          "The figure is today's. Tomorrow brings a new one.",
        ],
      },
      {
        id: "breath",
        title: "The breath",
        body: [
          "Breathe with the water. It rises for four seconds and falls for six.",
          "Today's flow sets how far it travels. A river in flood breathes bigger.",
        ],
      },
      {
        id: "hold",
        title: "The sankalp",
        body: [
          "Your own words come onto the screen, the ones you wrote when you set up. The water goes still.",
          "Hold them under your thumb. Ink fills the line over eleven seconds. Lift early and it drains, and you hold again.",
        ],
      },
      {
        id: "stillness",
        title: "The stillness",
        body: [
          "Put the phone down. The screen goes black for a minute while the river keeps running.",
          "Pick it up early and the minute still runs to its end.",
        ],
      },
      {
        id: "mark",
        title: "The mark",
        body: [
          "Your morning is written, and your Sankalp Patra is drawn from it, ready to send.",
          "One morning a day. Each one you keep joins the list on your account page.",
        ],
      },
    ],
  },

  walk: {
    captions: [
      "The *Ganga*,|this morning.",
      "Breathe with|the *river*.",
      "Hold your|own *sankalp*.",
      "Be *still*.|One minute.",
      "Send it to|the *family*.",
    ],
    show: "Show part {n}",
  },

  still: {
    title: "Then the screen goes black for a minute.",
    body: "Halfway through, the screen goes dark and asks you to put the phone down. You sit. The river keeps running.",
    instruction: "Put the phone down.",
    note: "The minute runs its full length, today and every day.",
  },

  patra: {
    title: "Your family's names, at the river.",
    lede: "Every morning, one sheet to send. Keep it, and send it to the family group.",
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
    title: "Questions before you begin",
    items: [
      {
        q: "Do I have to be up before sunrise?",
        a: "The panchang names the muhurat, and a reminder comes at the hour you choose, in your own time zone. Sit when you wake. One morning a day.",
      },
      {
        q: "What if today's figure is late?",
        a: "The sheet uses the river's usual flow for that week of the year.",
      },
      {
        q: "Can I make it shorter?",
        a: "Let it run and you get the full three minutes. Next moves you on from the reading, the breath and the stillness when you are ready.",
      },
      {
        q: "Who sees my sankalp?",
        a: "You. It stays on your own account. The sheet carries the names, the water and the figures, and that is what you send.",
      },
    ],
  },

  tariff: {
    title: "Eleven mornings for eleven.",
    titleInr: "Eleven mornings for {price:eleven}.",
    lede: "Pay once, no subscription. Sit on any morning you like.",
    heads: { price: "Price", per: "Per morning" },
    choose: "Choose this pack",
    rows: [
      {
        key: "one",
        name: "One morning",
        body: "Try one morning first.",
      },
      {
        key: "eleven",
        name: "Eleven mornings",
        body: "Paid once. Eleven days in a row, or spread through the year.",
        hero: true,
      },
      {
        key: "sixty",
        name: "Sixty mornings",
        body: "Five mornings a month for a year, at the lowest price a morning gets.",
      },
    ],
    note: "Your mornings keep until you sit them.",
  },

  closing: {
    title: "Sit with your river today.",
    body: "Set it up in two minutes: your river, your family's names, your sankalp. Then sit with it straight away.",
    cta: "Start your snan now",
  },
};

/* --- हिन्दी ---------------------------------------------------------------- */

const hi: Copy = {
  meta: {
    title: "स्नान, अपनी नदी के साथ तीन मिनट",
    description:
      "पंचांग की बताई घड़ी पर उस नदी के साथ तीन मिनट जिसके पास आप बड़े हुए, और एक संकल्प पत्र जिस पर आपके परिवार के नाम हैं। ग्यारह सुबहें। पहली आज ही।",
  },

  crumbs: { home: "मुखपृष्ठ", here: "स्नान" },

  hero: {
    title: "अपनी {river} के साथ तीन मिनट।",
    riverWord: "नदी",
    band: "बस 3 मिनट। फिर परिवार को भेजिए।",
    lede: "वह नदी चुनिए जिसके पास आप बड़े हुए। हर सुबह वह दिखाती है कि आज कैसे बह रही है। उसके साथ बैठिए, साँस लीजिए और अपना संकल्प कीजिए।",
    offer: "ग्यारह सुबहें। पहली आज ही।",
    ctaPrimary: "अभी अपना स्नान शुरू कीजिए",
  },

  form: {
    title: "आपके तीन मिनट, पाँच अंगों में",
    lede: "हर सुबह इसी तरह चलती है। केवल नदी बदलती है।",
    lengthHead: "अवधि",
    seconds: "{n} सेकंड",
    limbs: [
      {
        id: "reading",
        title: "पाठ",
        body: [
          "आप अपनी नदी और उसका घाट देखते हैं: आज वह कैसे बह रही है, 1997 से अब तक के हर दिन के सामने उसका स्थान, और जल से आपकी दूरी।",
          "आँकड़ा आज का है। कल नया आएगा।",
        ],
      },
      {
        id: "breath",
        title: "श्वास",
        body: [
          "जल के साथ साँस लीजिए। वह चार सेकंड उठता है और छह सेकंड उतरता है।",
          "वह कितना उठे, यह आज का प्रवाह तय करता है। उफान पर नदी बड़ी साँस लेती है।",
        ],
      },
      {
        id: "hold",
        title: "संकल्प",
        body: [
          "आपके अपने शब्द स्क्रीन पर आते हैं, वही जो आपने सेटअप के समय लिखे। जल थम जाता है।",
          "उन्हें अंगूठे से थामिए। ग्यारह सेकंड में स्याही पंक्ति भर देती है। पहले छोड़ें तो स्याही लौट जाती है, और आप फिर से थामते हैं।",
        ],
      },
      {
        id: "stillness",
        title: "मौन",
        body: [
          "फ़ोन नीचे रख दीजिए। स्क्रीन एक मिनट काली रहती है और नदी बहती रहती है।",
          "पहले उठा लें, तब भी मिनट अपने अंत तक चलता है।",
        ],
      },
      {
        id: "mark",
        title: "चिह्न",
        body: [
          "आपकी सुबह लिखी जाती है, और उसी से आपका संकल्प पत्र बनता है, भेजने के लिए तैयार।",
          "दिन में एक सुबह। हर रखी हुई सुबह आपके खाते की सूची में जुड़ती है।",
        ],
      },
    ],
  },

  walk: {
    captions: [
      "आज सुबह की|*गंगा*।",
      "*नदी* के साथ|साँस लीजिए।",
      "अपना *संकल्प*|थामिए।",
      "*शांत* रहिए।|एक मिनट।",
      "*परिवार* को|भेजिए।",
    ],
    show: "भाग {n} देखिए",
  },

  still: {
    title: "फिर स्क्रीन एक मिनट के लिए काली हो जाती है।",
    body: "बीच में स्क्रीन बुझ जाती है और कहती है कि फ़ोन नीचे रख दीजिए। आप बैठते हैं। नदी बहती रहती है।",
    instruction: "फ़ोन नीचे रख दीजिए।",
    note: "मिनट पूरा चलता है, आज भी और हर दिन।",
  },

  patra: {
    title: "आपके परिवार के नाम, नदी के साथ।",
    lede: "हर सुबह, भेजने के लिए एक पत्र। उसे रखिए, और परिवार के समूह में भेजिए।",
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
      "उफान पर नदी घनी और ऊँची बनती है। मंद नदी पतली और नीची। एक ही जल की दो सुबहें अलग बनती हैं, क्योंकि प्रवाह अलग था।",
    ],
  },

  before: {
    title: "शुरू करने से पहले के प्रश्न",
    items: [
      {
        q: "क्या सूर्योदय से पहले उठना ज़रूरी है?",
        a: "पंचांग मुहूर्त बताता है, और स्मरण उस घड़ी पर आता है जो आप चुनते हैं, आपके अपने समय-क्षेत्र में। जब जागें, तब बैठिए। दिन में एक सुबह।",
      },
      {
        q: "अगर आज का आँकड़ा देर से आए तो?",
        a: "पत्र वर्ष के उसी सप्ताह के नदी के सामान्य प्रवाह पर बनता है।",
      },
      {
        q: "क्या इसे छोटा किया जा सकता है?",
        a: "चलने दीजिए, तो पूरे तीन मिनट मिलते हैं। जब आप तैयार हों, \"आगे\" आपको पाठ, श्वास और मौन से आगे ले जाता है।",
      },
      {
        q: "मेरा संकल्प कौन देखता है?",
        a: "आप। वह आपके अपने खाते में रहता है। पत्र पर नाम, जल और आँकड़े होते हैं, और आप वही भेजते हैं।",
      },
    ],
  },

  tariff: {
    title: "ग्यारह सुबहें, ग्यारह में।",
    titleInr: "ग्यारह सुबहें {price:eleven} में।",
    lede: "एक बार भुगतान, कोई सदस्यता नहीं। किसी भी सुबह बैठिए।",
    heads: { price: "मूल्य", per: "प्रति सुबह" },
    choose: "यह पैक चुनिए",
    rows: [
      {
        key: "one",
        name: "एक सुबह",
        body: "पहले एक सुबह आज़माइए।",
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
        body: "पूरे वर्ष, महीने में पाँच सुबहें, प्रति सुबह सबसे कम मूल्य पर।",
      },
    ],
    note: "आपकी सुबहें तब तक रखी रहती हैं जब तक आप बैठें।",
  },

  closing: {
    title: "आज ही अपनी नदी के साथ बैठिए।",
    body: "दो मिनट में तैयारी कीजिए: अपनी नदी, परिवार के नाम, अपना संकल्प। फिर तुरंत उसके साथ बैठिए।",
    cta: "अभी अपना स्नान शुरू कीजिए",
  },
};

export const snanContent = { en, hi } satisfies Record<Lang, Copy>;
