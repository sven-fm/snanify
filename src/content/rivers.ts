/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair and not the twelve locales the
   site serves; see the tier note at the top of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Sacred waters, the six ghats, as entity data.

   Rules this file is written under:

   1. NOTHING IS PERFORMED. Snanify has no priest, no ritvik, no operator and
      no device at any of these six places. Nothing is done there for anyone,
      nothing is filmed, streamed or recorded, and no sentence in this file may
      imply otherwise. These pages describe places. That is the whole of it.
   2. NOTHING IS PROMISED. No rite is tied to an outcome, health, wealth,
      examination or any other, and tradition is described as tradition rather
      than as a product benefit.
   3. WHAT IS ON OFFER IS NAMED EXACTLY. At each water Snanify offers four
      things: its measured state, its sunrise, its muhurat windows, and four
      and a half minutes you sit yourself. The measured state is modelled
      discharge, not a gauge reading, and the file says modelled every time.
   4. THE ARCHIVE STARTS IN 1997, matching `src/lib/riverdata.ts`. The
      Copernicus reanalysis returns nulls before that, so no string here says
      1991.
   5. `tradition` is not a menu. It lists what a water is traditionally kept
      for, in the third person. Where a thing can only be done by a body
      standing at the water, the record says so and says that Snanify does not
      arrange it and cannot.
   6. Talakaveri is not a ghat. It is the spring the Kaveri rises from, inside
      a temple tank. The page says so before it says anything else, and names
      the waters downstream that a Kaveri snan actually belongs at.
   7. No river is described by reference to another river. "Dakshin Ganga" and
      "Ganga of the south" are out; Gautami and Ponni are in.
   8. Slugs are stable. `src/content/muhurat.ts` keys its ghat records off
      them and `src/app/sitemap.ts` publishes them.
   --------------------------------------------------------------------------- */

/** The physical form of the water, because it decides what the place can be. */
export type WaterForm = "flowing-ghat" | "confluence" | "temple-tank";

/** Both locales required, a missing translation is a type error. */
export type Bilingual = Record<Lang, string>;

/**
 * How a tradition is kept.
 *
 * `personal`      an act performed by a person standing at the water. It
 *                 cannot be delegated, and the page says so plainly.
 * `of-the-place`  something the place itself keeps, daily or on its calendar,
 *                 whether or not anybody asks for it.
 */
export type TraditionKind = "personal" | "of-the-place";

export type GhatTradition = {
  key: string;
  name: Bilingual;
  /** Described as tradition, in the third person. Never as something offered. */
  note: Bilingual;
  kind: TraditionKind;
};

export type GhatOccasion = {
  key: string;
  name: Bilingual;
  /** How the day is reckoned, the tithi in words. Never a date. */
  reckoning: Bilingual;
  note: Bilingual;
};

export type Ghat = {
  slug: string;
  numeral: string;
  tz: string;
  form: WaterForm;
  river: Bilingual;
  /** The river's other names in its own traditions, where there is one to give. */
  riverAlso?: Bilingual;
  ghat: Bilingual;
  city: Bilingual;
  state: Bilingual;
  epithet: Bilingual;
  standfirst: Bilingual;
  sacred: Record<Lang, string[]>;
  /** What the measured figure means at this particular water. Modelled, always. */
  reading: Bilingual;
  /** What this water is traditionally kept for. Not a menu. */
  tradition: GhatTradition[];
  occasions: GhatOccasion[];
  /** An honest caveat that must be read before choosing. Rendered prominently. */
  caution?: Bilingual;
  /** Who looks after the place. A statement of custody, not of permission. */
  keeper: Bilingual;
};

export const RIVERS: Ghat[] = [
  /* ---------------------------------------------------------------- 01 */
  {
    slug: "ganga-haridwar",
    numeral: "01",
    tz: "Asia/Kolkata",
    form: "flowing-ghat",
    river: { en: "Ganga", hi: "गंगा" },
    ghat: { en: "Har Ki Pauri", hi: "हर की पौड़ी" },
    city: { en: "Haridwar", hi: "हरिद्वार" },
    state: { en: "Uttarakhand", hi: "उत्तराखंड" },
    epithet: {
      en: "Where the Ganga leaves the mountains",
      hi: "जहाँ गंगा पर्वत छोड़कर मैदान में उतरती हैं",
    },
    standfirst: {
      en: "The gateway ghat, and the kund where a drop of the amrit is said to have fallen.",
      hi: "द्वार का घाट, और वह कुंड जहाँ अमृत की एक बूँद गिरी मानी जाती है।",
    },
    sacred: {
      en: [
        "Haridwar is where the Ganga comes out of the hills onto the plain, a long way down from Gaumukh. The name is read two ways, Hari-dwar, the gate of Vishnu, and Har-dwar, the gate of Shiva. Both are kept, because the town is the doorway to Badrinath in one direction and Kedarnath in the other.",
        "Har Ki Pauri means the steps of Hari. Set into the ghat is Brahmakund, where tradition holds a drop of the amrit fell as it was carried away after the churning of the ocean. That tradition gives Haridwar one of the four Kumbh Melas. A stone on the ghat is venerated as bearing Vishnu's footprint, and the ghat takes its name from it.",
        "The water past the steps is a channel, drawn off the main stem a short way upstream at Bhimgoda. The main stream runs east of the town, and the same works feed the Upper Ganges Canal, cut in the 1850s and still carrying water into the Doab. The flow figure on this site belongs to the river, not to the channel between the steps.",
        "This is one of the busiest working ghats in the country. The aarti is performed at dusk, and tarpan, shraddha and asthi visarjan go on through the day. A little downstream at Kankhal, the Daksha Mahadev temple keeps the story of Daksha's yajna, the older story of the place and the reason the town was a tirtha before it had a ghat.",
      ],
      hi: [
        "हरिद्वार वह स्थान है जहाँ गंगा पर्वतों से उतरना पूरा कर मैदान में प्रवेश करती हैं। नाम दो प्रकार से पढ़ा जाता है, हरिद्वार, विष्णु का द्वार, और हरद्वार, शिव का द्वार, और दोनों पाठ चलते हैं, क्योंकि यह नगर दो तीर्थ-मार्गों का प्रवेश है: एक ओर बद्रीनाथ, दूसरी ओर केदारनाथ। यहाँ पहुँचने तक वे गोमुख से बहुत दूर आ चुकी होती हैं, और नगर के नीचे सब कुछ मैदान है।",
        "हर की पौड़ी का अर्थ है हरि की सीढ़ियाँ। घाट में ही ब्रह्मकुंड है, जिसके विषय में परंपरा कहती है कि समुद्र-मंथन के बाद अमृत ले जाते समय एक बूँद यहीं गिरी थी; इसी परंपरा से हरिद्वार को चार कुंभ स्थलों में गिना जाता है। घाट पर एक शिला विष्णु के चरण-चिह्न के रूप में पूजित है, और घाट का नाम उसी चरण से है।",
        "सीढ़ियों के सामने बहता जल पूरी नदी नहीं है। कुछ ऊपर भीमगोड़ा पर मुख्य धारा से एक नहर-धारा निकाली जाती है, और घाट उसी धारा पर बना है; मुख्य धारा उसके पूर्व की ओर बहती है, और उन्हीं जल-संरचनाओं से ऊपरी गंगा नहर को जल मिलता है, जो उन्नीसवीं शताब्दी के मध्य में काटी गई थी और आज भी दोआब तक जल ले जाती है। हरिद्वार का प्रवाह-अंक पढ़ते समय यह जानना उचित है, क्योंकि वह अंक नदी का है, सीढ़ियों के बीच बहती धारा का नहीं।",
        "व्यवहार में यह देश के सबसे व्यस्त घाटों में से एक है। संध्या के समय आरती होती है; दिन भर तर्पण, श्राद्ध और अस्थि विसर्जन चलते रहते हैं; और कुछ नीचे कनखल में दक्ष महादेव मंदिर दक्ष-यज्ञ की कथा संजोए है, जो इस स्थान की उससे भी पुरानी कथा है और वह कारण भी, जिससे यह नगर घाट बनने से पहले ही तीर्थ था।",
      ],
    },
    reading: {
      en: "The cell this site reads for Haridwar sits on the Ganga main stem below the town. The number is modelled discharge in cubic metres a second, published once a day, and it is ranked against every daily value that cell has produced in this same week of the year from 1997 to 2025. The Ganga carries far more water here in a monsoon week than in a dry March, and the percentile shows where today sits without your having to know the numbers.",
      hi: "इस स्थल पर हरिद्वार के लिए जो खंड पढ़ा जाता है वह नगर के नीचे गंगा की मुख्य धारा पर है, जहाँ वे पर्वतों से उतरना पूरा कर चुकी होती हैं। अंक प्रतिरूपित नदी-प्रवाह है, घन मीटर प्रति सेकंड में, प्रतिदिन एक बार प्रकाशित, और उसकी तुलना उसी खंड के उन सभी दैनिक मानों से की जाती है जो 1997 से 2025 तक वर्ष के इसी सप्ताह में आए। वर्षा-काल के एक सप्ताह में वे यहाँ सूखे मार्च की तुलना में कहीं अधिक जल लाती हैं, और प्रतिशतक ही वह चीज़ है जो यह अंतर बिना अंक जाने समझा देती है।",
    },
    tradition: [
      {
        key: "snan",
        kind: "personal",
        name: { en: "The dawn dip at Brahmakund", hi: "ब्रह्मकुंड पर प्रातःकालीन स्नान" },
        note: {
          en: "The dip itself, taken at first light from the steps at Brahmakund. It is what the ghat is for.",
          hi: "स्नान स्वयं, प्रातः की पहली किरण के साथ ब्रह्मकुंड की सीढ़ियों से। घाट इसी के लिए है।",
        },
      },
      {
        key: "tarpan",
        kind: "personal",
        name: { en: "Tarpan", hi: "तर्पण" },
        note: {
          en: "Water offered to the ancestors by name, from the hand, standing in the river. Practice varies by community, and families with a purohit follow his order.",
          hi: "पूर्वजों को नामपूर्वक जल-अर्पण, हाथ से, नदी में खड़े होकर। विधि समुदाय के अनुसार भिन्न है, और जिन परिवारों के अपने पुरोहित हैं वे उन्हीं का क्रम मानते हैं।",
        },
      },
      {
        key: "asthi-visarjan",
        kind: "personal",
        name: { en: "Asthi visarjan", hi: "अस्थि विसर्जन" },
        note: {
          en: "Ashes given to the water at the ghat by the family. It is one of the oldest reasons families travel to Haridwar.",
          hi: "घाट पर परिवार अस्थियाँ जल को सौंपता है। यह उन पुराने कारणों में से एक है जिनसे परिवार हरिद्वार तक आते हैं।",
        },
      },
      {
        key: "aarti",
        kind: "of-the-place",
        name: { en: "The evening aarti", hi: "संध्या आरती" },
        note: {
          en: "Performed at these steps at dusk by Shri Ganga Sabha, every evening, for whoever is standing there.",
          hi: "इन्हीं सीढ़ियों पर संध्या के समय श्री गंगा सभा द्वारा प्रतिदिन, जो भी वहाँ खड़ा हो उसके लिए।",
        },
      },
      {
        key: "deep-daan",
        kind: "personal",
        name: { en: "Deep daan", hi: "दीप दान" },
        note: {
          en: "A lamp on a leaf, lit and set on the water from the step.",
          hi: "पत्ते पर एक दीप, जलाकर सीढ़ी से जल पर रखा हुआ।",
        },
      },
    ],
    occasions: [
      {
        key: "kartik-purnima",
        name: { en: "Kartik Purnima", hi: "कार्तिक पूर्णिमा" },
        reckoning: { en: "Purnima of Kartik", hi: "कार्तिक मास की पूर्णिमा" },
        note: {
          en: "Dev Deepawali at the ghats, the steps are lit end to end with lamps.",
          hi: "घाटों पर देव दीपावली, सीढ़ियाँ एक छोर से दूसरे छोर तक दीपों से जगमगाती हैं।",
        },
      },
      {
        key: "ganga-dussehra",
        name: { en: "Ganga Dussehra", hi: "गंगा दशहरा" },
        reckoning: { en: "Dashami of the bright half of Jyeshtha", hi: "ज्येष्ठ शुक्ल दशमी" },
        note: {
          en: "Kept as the day of the river's descent to the earth.",
          hi: "इसे गंगा के पृथ्वी पर अवतरण का दिन माना जाता है।",
        },
      },
      {
        key: "makar-sankranti",
        name: { en: "Makar Sankranti", hi: "मकर संक्रांति" },
        reckoning: { en: "The sun's entry into Makara", hi: "सूर्य का मकर राशि में प्रवेश" },
        note: {
          en: "A solar reckoning rather than a lunar one, and the beginning of the northward course.",
          hi: "यह तिथि नहीं, सौर गणना है, और उत्तरायण का आरंभ।",
        },
      },
      {
        key: "somvati-amavasya",
        name: { en: "Somvati Amavasya", hi: "सोमवती अमावस्या" },
        reckoning: { en: "An amavasya falling on a Monday", hi: "सोमवार को पड़ने वाली अमावस्या" },
        note: {
          en: "Uncommon, and long kept at this ghat for bathing and for tarpan.",
          hi: "यह संयोग विरल है, और इस घाट पर स्नान तथा तर्पण के लिए बहुत पहले से माना जाता रहा है।",
        },
      },
    ],
    keeper: {
      en: "Har Ki Pauri is looked after by Shri Ganga Sabha, which runs the evening aarti and maintains the steps. The Haridwar municipal and district administrations take charge of access at Kumbh and on the large parva days.",
      hi: "हर की पौड़ी की देखरेख श्री गंगा सभा करती है, जो संध्या आरती संचालित करती है और सीढ़ियों का रखरखाव देखती है। कुंभ तथा बड़े पर्वों पर प्रवेश हरिद्वार नगर एवं ज़िला प्रशासन के अधीन रहता है।",
    },
  },

  /* ---------------------------------------------------------------- 02 */
  {
    slug: "triveni-prayagraj",
    numeral: "02",
    tz: "Asia/Kolkata",
    form: "confluence",
    river: { en: "Triveni Sangam", hi: "त्रिवेणी संगम" },
    ghat: { en: "The Sangam", hi: "संगम" },
    city: { en: "Prayagraj", hi: "प्रयागराज" },
    state: { en: "Uttar Pradesh", hi: "उत्तर प्रदेश" },
    epithet: {
      en: "Two rivers you can see, and a third held in faith",
      hi: "दो धाराएँ जो दिखती हैं, और तीसरी जो श्रद्धा में है",
    },
    standfirst: {
      en: "Tirtharaj, the king of tirthas, where the Ganga and the Yamuna run side by side before they mix.",
      hi: "तीर्थराज, जहाँ गंगा और यमुना मिलने से पहले कुछ दूर साथ-साथ बहती हैं।",
    },
    sacred: {
      en: [
        "At Prayagraj the Ganga arrives from the north and the Yamuna from the west. For a stretch the two run side by side without mixing, and the line is visible from a boat: the Yamuna darker and slower, the Ganga paler and quicker. Tradition holds that the Sarasvati joins them here unseen, and the three give the place its name, Triveni, three braids.",
        "Prayag means the place of sacrifice, and the tradition is that Brahma performed a yajna here. The city is called Tirtharaj, king of tirthas. The Magh Mela is held on the sands each year through Magha, and the Kumbh at its twelve-year turn. Some pilgrims keep kalpavas, a month of residence on the sangam sands.",
        "The mela is possible because of what the rivers do in winter. When the flood falls back it leaves a plain of sand between the two channels, and a city is put up on it for a month and taken down again. The calendar of the mela is the calendar of the river, and a late or heavy season moves the ground it stands on. Above the sands the fort holds the Akshayavat, the undying banyan, and an Ashokan pillar.",
        "Shraddha and pind daan at Prayagraj are conducted by the Prayagwal purohits, families who hold the right to officiate by descent and keep pilgrim registers going back generations. The family is present, at the water.",
      ],
      hi: [
        "प्रयागराज में गंगा उत्तर से और यमुना पश्चिम से आती हैं, और कुछ दूर तक दोनों बिना मिले साथ-साथ बहती हैं, नाव से वह रेखा स्पष्ट दिखती है: यमुना गहरी और धीमी, गंगा हल्की और तेज़। परंपरा मानती है कि सरस्वती यहीं अदृश्य रूप में मिलती हैं, और इन्हीं तीन से इस स्थान का नाम त्रिवेणी है।",
        "प्रयाग का अर्थ है यज्ञ का स्थान; परंपरा है कि ब्रह्मा ने यहाँ यज्ञ किया था। नगर को तीर्थराज कहा जाता है। माघ मास में प्रतिवर्ष रेती पर माघ मेला लगता है और बारह वर्ष के फेर पर कुंभ; कुछ तीर्थयात्री कल्पवास करते हैं, संगम की रेती पर एक मास का निवास, संयम और प्रतिदिन स्नान।",
        "मेला इसलिए संभव है कि शीत ऋतु में नदियाँ पीछे हट जाती हैं। बाढ़ उतरने पर दोनों धाराओं के बीच रेत का विस्तार छूट जाता है, और उसी पर एक मास के लिए नगर बसाया जाता है और फिर उठा लिया जाता है। मेले का पंचांग नदी का पंचांग है, और देर से आई या भारी ऋतु उस ज़मीन को ही बदल देती है जिस पर वह खड़ा होता है। रेती के ऊपर किला अक्षयवट को संजोए है, और एक अशोक-स्तंभ भी।",
        "प्रयागराज में श्राद्ध और पिंडदान प्रयागवाल पुरोहित कराते हैं, वे परिवार जिन्हें तीर्थयात्रियों के लिए कर्म कराने का अधिकार वंश-परंपरा से मिला है और जो पीढ़ियों पुरानी यात्री-बहियाँ रखते हैं। परिवार वहाँ उपस्थित रहता है, जल के सामने।",
      ],
    },
    reading: {
      en: "The cell this site reads for the Sangam sits on the Ganga main stem below the confluence, so the figure carries the Ganga and the Yamuna together. It is modelled discharge, ranked against that same cell's record for this week of the year from 1997 to 2025. When the winter figure falls, the sands are coming back, and that is the ground the Magh Mela is built on.",
      hi: "इस स्थल पर संगम के लिए जो खंड पढ़ा जाता है वह संगम के नीचे गंगा की मुख्य धारा पर है, इसलिए यह अंक गंगा और यमुना दोनों को एक साथ लिए हुए है। यह प्रतिरूपित प्रवाह है, गेज का पाठ नहीं, और उसी खंड के 1997 से 2025 तक के, वर्ष के इसी सप्ताह के अपने अभिलेख के सापेक्ष क्रमित है। शीत ऋतु में जब अंक गिरता है तो वह रेती का लौटना है, और वही भूमि है जिस पर माघ मेला खड़ा होता है।",
    },
    tradition: [
      {
        key: "sangam-snan",
        kind: "personal",
        name: { en: "The dip at the meeting point", hi: "संगम-बिंदु पर स्नान" },
        note: {
          en: "Taken out in the stream rather than from a step, because the point where the two waters meet is reached by boat.",
          hi: "सीढ़ी से नहीं, धारा के बीच में, क्योंकि जहाँ दोनों जल मिलते हैं वहाँ नाव से पहुँचा जाता है।",
        },
      },
      {
        key: "pind-daan",
        kind: "personal",
        name: { en: "Pind daan and tarpan", hi: "पिंडदान एवं तर्पण" },
        note: {
          en: "Conducted at Prayagraj by the Prayagwal purohits, with the family there. The right to officiate for a pilgrim is held by descent, and eligibility for the rite varies by community and by region.",
          hi: "प्रयागराज में यह प्रयागवाल पुरोहितों द्वारा, परिवार की उपस्थिति में संपन्न होता है। तीर्थयात्री के लिए कर्म कराने का अधिकार वंश-परंपरा से मिलता है, और कर्म का अधिकार स्वयं समुदाय तथा क्षेत्र के अनुसार भिन्न रहता है।",
        },
      },
      {
        key: "kalpavas",
        kind: "personal",
        name: { en: "Kalpavas", hi: "कल्पवास" },
        note: {
          en: "A month of residence on the sands through Magha, with one meal a day, restraint, and a bath at first light every day. It is a month of a person's life, spent in a tent on a riverbed.",
          hi: "माघ भर रेती पर निवास, एक समय का भोजन, संयम, और प्रत्येक दिन प्रातः स्नान। यह किसी के जीवन का एक मास है, जो नदी की रेत पर एक तंबू में बीतता है।",
        },
      },
      {
        key: "magh-mela",
        kind: "of-the-place",
        name: { en: "The Magh Mela", hi: "माघ मेला" },
        note: {
          en: "A city of canvas laid out on the sands each Magha by the district administration and the akharas, and dismantled when the river returns.",
          hi: "प्रत्येक माघ में ज़िला प्रशासन और अखाड़ों द्वारा रेती पर बसाया गया तंबुओं का नगर, जो नदी के लौटने पर उठा लिया जाता है।",
        },
      },
      {
        key: "deep-daan",
        kind: "personal",
        name: { en: "Deep daan", hi: "दीप दान" },
        note: {
          en: "A lamp set on the water at the confluence, usually from the boat that brought you.",
          hi: "संगम के जल पर रखा एक दीप, प्रायः उसी नाव से जो आपको वहाँ लाई।",
        },
      },
    ],
    occasions: [
      {
        key: "magh-snan",
        name: { en: "The Magha bathing month", hi: "माघ स्नान" },
        reckoning: { en: "Through the month of Magha", hi: "संपूर्ण माघ मास" },
        note: {
          en: "The Magh Mela occupies the sands for the whole month; kalpavasis stay for its duration.",
          hi: "पूरे मास रेती पर माघ मेला रहता है; कल्पवासी इसी अवधि तक वहीं निवास करते हैं।",
        },
      },
      {
        key: "mauni-amavasya",
        name: { en: "Mauni Amavasya", hi: "मौनी अमावस्या" },
        reckoning: { en: "Amavasya of Magha", hi: "माघ मास की अमावस्या" },
        note: {
          en: "The principal bathing day of the Magh Mela, kept in silence by those observing it.",
          hi: "माघ मेले का प्रमुख स्नान-दिवस, जिसे व्रती मौन रहकर करते हैं।",
        },
      },
      {
        key: "makar-sankranti",
        name: { en: "Makar Sankranti", hi: "मकर संक्रांति" },
        reckoning: { en: "The sun's entry into Makara", hi: "सूर्य का मकर राशि में प्रवेश" },
        note: {
          en: "The opening bath of the mela, reckoned by the sun and not by a tithi.",
          hi: "मेले का प्रथम स्नान, जो तिथि से नहीं, सूर्य की गति से गिना जाता है।",
        },
      },
      {
        key: "mahalaya-amavasya",
        name: { en: "Sarva Pitru Amavasya", hi: "सर्व पितृ अमावस्या" },
        reckoning: {
          en: "Amavasya of the dark fortnight of Bhadrapada-Ashvin",
          hi: "भाद्रपद-आश्विन के कृष्ण पक्ष की अमावस्या",
        },
        note: {
          en: "The closing day of Pitru Paksha, and the day kept for ancestors whose tithi is not known.",
          hi: "पितृ पक्ष का अंतिम दिन, और उन पूर्वजों के लिए जिनकी तिथि ज्ञात नहीं।",
        },
      },
    ],
    keeper: {
      en: "The sangam and the mela grounds are held by the Prayagraj district administration together with the Mela Authority, while the ritual right to officiate for pilgrims sits with the Prayagwal purohits. Access at Kumbh is settled months in advance.",
      hi: "संगम और मेला क्षेत्र प्रयागराज ज़िला प्रशासन तथा मेला प्राधिकरण के अधीन हैं, जबकि तीर्थयात्रियों के लिए कर्म कराने का अधिकार प्रयागवाल पुरोहितों के पास है। कुंभ के समय प्रवेश महीनों पहले तय कर लिया जाता है।",
    },
  },

  /* ---------------------------------------------------------------- 03 */
  {
    slug: "yamuna-mathura",
    numeral: "03",
    tz: "Asia/Kolkata",
    form: "flowing-ghat",
    river: { en: "Yamuna", hi: "यमुना" },
    ghat: { en: "Vishram Ghat", hi: "विश्राम घाट" },
    city: { en: "Mathura", hi: "मथुरा" },
    state: { en: "Uttar Pradesh", hi: "उत्तर प्रदेश" },
    epithet: {
      en: "Krishna's own river",
      hi: "कृष्ण की अपनी नदी",
    },
    standfirst: {
      en: "Vishram, rest. The ghat at which Mathura's parikrama of its own ghats begins and ends.",
      hi: "विश्राम, ठहराव। वह घाट जहाँ से मथुरा के घाटों की परिक्रमा आरंभ होकर वहीं लौटती है।",
    },
    sacred: {
      en: [
        "Vishram Ghat takes its name from vishram, rest. The tradition of Braj is that Krishna rested here after killing Kansa. It is the central ghat of Mathura, and the parikrama of the town's ghats begins and returns here. The aarti at dusk is smaller and more domestic than at Haridwar, and belongs to the town.",
        "In the Braj tradition the Yamuna is Krishna's own river, the water he played in and the gopis carried. It is addressed with the affection due to someone loved, and the rites kept at this ghat carry that register.",
        "The Yamuna is also the daughter of Surya and the sister of Yama. That is why Yama Dwitiya, the second day after Diwali, which much of India keeps as Bhai Dooj, is the great day here. Brothers and sisters bathe together at this ghat, following the tradition that Yama came to his sister's house that day and was received by her.",
        "Mathura's riverfront runs to some twenty-five ghats, and the parikrama takes them in order, with Vishram first and last. The river that reaches them has come a long way from Yamunotri and through a great deal of engineering. Upstream of Mathura it is regulated at Hathnikund, Wazirabad and Okhla, where much of it is drawn off for canals and for Delhi. In a dry month what arrives at the ghat is largely what those gates release.",
      ],
      hi: [
        "विश्राम घाट का नाम विश्राम से है: ब्रज की परंपरा है कि कंस-वध के बाद कृष्ण ने यहीं विश्राम किया था। यह मथुरा का मुख्य घाट है, और नगर के घाटों की परिक्रमा यहीं से आरंभ होकर यहीं लौटती है। संध्या आरती हरिद्वार की तुलना में छोटी और अधिक घरेलू है, वह बाहर से आए लोगों की नहीं, नगर की अपनी है।",
        "ब्रज की परंपरा में यमुना कृष्ण की अपनी नदी हैं, वही जल जिसमें वे खेले और जिसे गोपियाँ भरकर लाईं। उन्हें स्नेह के भाव से पुकारा जाता है, और इस घाट पर होने वाले कर्मों में वही भाव रहता है।",
        "यमुना सूर्य की पुत्री और यम की बहन भी हैं। इसी संबंध के कारण यम द्वितीया, दीपावली के दूसरे दिन, जिसे बहुत बड़े भाग में भाई दूज कहा जाता है, इस घाट का सबसे बड़ा दिन है: भाई-बहन यहाँ साथ स्नान करते हैं, इस परंपरा के अनुसार कि उस दिन यम अपनी बहन के घर आए थे और उन्होंने उनका स्वागत किया था।",
        "मथुरा के तट पर लगभग पच्चीस घाट हैं और परिक्रमा उन्हें क्रम से लेती है, जिसमें विश्राम पहला भी है और अंतिम भी। उन तक पहुँचने वाली नदी यमुनोत्री से बहुत दूर आ चुकी होती है और बहुत सारी अभियांत्रिकी से होकर: मथुरा से ऊपर वे हथिनीकुंड पर, वज़ीराबाद पर और ओखला पर नियंत्रित होती हैं, जहाँ उनका बड़ा भाग नहरों के लिए और दिल्ली के लिए निकाल लिया जाता है। सूखे महीनों में घाट तक जो पहुँचता है वह प्रायः वही है जो इन द्वारों से छोड़ा जाता है।",
      ],
    },
    caution: {
      en: "The Yamuna at Mathura carries a heavy pollution load for much of the year. Through the dry months a large share of what passes the ghat is regulated release and drain water rather than mountain flow. If you are going there to bathe, know that beforehand and ask locally on the day.",
      hi: "मथुरा में यमुना का जल वर्ष के अधिकांश समय अत्यंत प्रदूषित रहता है, और सूखे महीनों में घाट के सामने से जो बहता है उसका बड़ा भाग पर्वतीय प्रवाह नहीं, नियंत्रित छोड़ा गया जल और नालों का जल होता है। यदि आप वहाँ स्नान के लिए जा रहे हैं, तो यह पहले जान लीजिए और उस दिन स्थानीय लोगों से पूछ लीजिए।",
    },
    reading: {
      en: "The cell this site reads for Mathura sits on the Yamuna main stem below Vishram Ghat. The modelled figure behaves less like a mountain river and more like a set of gates, because upstream of here it is one. It is ranked against the Yamuna's own record for this week of the year, 1997 to 2025.",
      hi: "इस स्थल पर मथुरा के लिए जो खंड पढ़ा जाता है वह विश्राम घाट के नीचे यमुना की मुख्य धारा पर है। उनका प्रतिरूपित अंक किसी पर्वतीय नदी जैसा नहीं, द्वारों की एक शृंखला जैसा बर्ताव करता है, क्योंकि यहाँ से ऊपर वे वही हैं। उनकी तुलना 1997 से 2025 तक, वर्ष के इसी सप्ताह के उनके अपने अभिलेख से की जाती है।",
    },
    tradition: [
      {
        key: "snan",
        kind: "personal",
        name: { en: "The dip at Vishram Ghat", hi: "विश्राम घाट पर स्नान" },
        note: {
          en: "Taken from the steps, most heavily on Yama Dwitiya and through Kartik. Read the note above about the water before you plan one.",
          hi: "सीढ़ियों से, सबसे अधिक यम द्वितीया पर और कार्तिक भर। योजना बनाने से पहले जल के विषय में ऊपर दी गई सूचना पढ़ लें।",
        },
      },
      {
        key: "parikrama",
        kind: "personal",
        name: { en: "The parikrama of the ghats", hi: "घाटों की परिक्रमा" },
        note: {
          en: "The round of Mathura's riverfront, taken on foot in order, beginning and ending at Vishram.",
          hi: "मथुरा के तट की परिक्रमा, पैदल, क्रम से, विश्राम से आरंभ और वहीं समाप्त।",
        },
      },
      {
        key: "yamuna-puja",
        kind: "personal",
        name: { en: "Yamuna puja in the Braj register", hi: "ब्रज रीति में यमुना पूजा" },
        note: {
          en: "The upachara sequence offered to the river as to someone loved. Braj keeps its own words for it.",
          hi: "नदी को अर्पित उपचार-क्रम, किसी प्रियजन की भाँति। ब्रज के अपने शब्द इसके लिए हैं।",
        },
      },
      {
        key: "aarti",
        kind: "of-the-place",
        name: { en: "The evening aarti", hi: "संध्या आरती" },
        note: {
          en: "Run at the ghat by a local samiti at dusk. Smaller than Haridwar's and mostly attended by the town itself.",
          hi: "संध्या के समय घाट पर एक स्थानीय समिति द्वारा। हरिद्वार से छोटी, और प्रायः नगर के अपने लोग ही उसमें रहते हैं।",
        },
      },
      {
        key: "deep-daan",
        kind: "personal",
        name: { en: "Deep daan", hi: "दीप दान" },
        note: {
          en: "Leaf and cotton, no plastic. Lit, named, and set on the water at the ghat's edge.",
          hi: "पत्ता और रुई, प्लास्टिक नहीं। जलाकर, नाम लेकर, घाट के किनारे जल पर रखा हुआ।",
        },
      },
    ],
    occasions: [
      {
        key: "yama-dwitiya",
        name: { en: "Yama Dwitiya", hi: "यम द्वितीया" },
        reckoning: { en: "Dwitiya of the bright half of Kartik", hi: "कार्तिक शुक्ल द्वितीया" },
        note: {
          en: "The largest day at this ghat, brothers and sisters bathe here together.",
          hi: "इस घाट का सबसे बड़ा दिन, भाई-बहन यहाँ साथ स्नान करते हैं।",
        },
      },
      {
        key: "yamuna-chhath",
        name: { en: "Yamuna Jayanti", hi: "यमुना जयंती" },
        reckoning: { en: "Shashthi of the bright half of Chaitra", hi: "चैत्र शुक्ल षष्ठी" },
        note: {
          en: "Kept in Braj as the river's own day, with its puja at the ghats.",
          hi: "ब्रज में इसे नदी का अपना दिन माना जाता है, घाटों पर उनकी पूजा होती है।",
        },
      },
      {
        key: "janmashtami",
        name: { en: "Janmashtami", hi: "जन्माष्टमी" },
        reckoning: {
          en: "Ashtami of the dark half of Bhadrapada",
          hi: "भाद्रपद कृष्ण अष्टमी",
        },
        note: {
          en: "Mathura's own festival; the ghats are worked through the night.",
          hi: "मथुरा का अपना पर्व; घाटों पर रात भर आवाजाही रहती है।",
        },
      },
      {
        key: "kartik-snan",
        name: { en: "Kartik snan", hi: "कार्तिक स्नान" },
        reckoning: { en: "Through the month of Kartik", hi: "संपूर्ण कार्तिक मास" },
        note: {
          en: "A month of dawn bathing kept across the Braj towns, not only in Mathura.",
          hi: "ब्रज के सभी नगरों में, केवल मथुरा में नहीं, एक मास तक प्रातःकालीन स्नान।",
        },
      },
    ],
    keeper: {
      en: "Vishram Ghat is looked after by Mathura's tirth-purohit families together with the municipal body, and the evening aarti is run by a local samiti.",
      hi: "विश्राम घाट की देखरेख मथुरा के तीर्थ-पुरोहित परिवार और नगर निकाय मिलकर करते हैं, तथा संध्या आरती एक स्थानीय समिति संचालित करती है।",
    },
  },

  /* ---------------------------------------------------------------- 04 */
  {
    slug: "godavari-nashik",
    numeral: "04",
    tz: "Asia/Kolkata",
    form: "flowing-ghat",
    river: { en: "Godavari", hi: "गोदावरी" },
    riverAlso: { en: "Gautami, the name used in invocation", hi: "आवाहन में, गौतमी" },
    ghat: { en: "Ram Kund", hi: "रामकुंड" },
    city: { en: "Nashik", hi: "नासिक" },
    state: { en: "Maharashtra", hi: "महाराष्ट्र" },
    epithet: {
      en: "Gautami, the river a sage brought down",
      hi: "गौतमी, जिसे एक ऋषि उतार लाए",
    },
    standfirst: {
      en: "The kund at Panchavati where Nashik gives its dead to the water.",
      hi: "पंचवटी का वह कुंड जहाँ नासिक अपने दिवंगतों को जल सौंपता है।",
    },
    sacred: {
      en: [
        "The Godavari rises at Brahmagiri, above Trimbakeshwar, a short way upstream of Nashik. Its older name is Gautami, from the sage Gautama. The account is that he brought the river down through Shiva's intercession, in expiation of a cow's death, and Gautami is still the name used when the river is invoked.",
        "Ram Kund lies in Panchavati, the quarter of Nashik associated with Rama's years in exile. Tradition holds that Rama and Sita bathed at this kund, and that Rama performed his father Dasharatha's shraddha here. That is why Ram Kund is Nashik's asthi visarjan tirth: ashes are given to the water, and the kund is held to receive them.",
        "In daily practice this is a place of pitru karya before anything else. Shraddha and tarpan go on here through the year, and heavily through Pitru Paksha. Nashik also holds the Simhastha, the Kumbh of this river, at the twelve-year turn when Jupiter enters Simha, shared with Trimbakeshwar upstream.",
        "From Brahmagiri the Godavari runs east across the whole peninsula to the Bay of Bengal, and it is the longest river of southern India. What passes Ram Kund is a young river only a few tens of kilometres old, and a managed one. The Gangapur dam stands upstream of the city, so through the dry months the flow at the kund is largely what is let down from it. A heavy monsoon week can put the steps themselves under water.",
      ],
      hi: [
        "गोदावरी का उद्गम त्र्यंबकेश्वर के ऊपर ब्रह्मगिरि पर है, नासिक से कुछ ही ऊपर। उनका प्राचीन नाम गौतमी है, ऋषि गौतम से: कथा है कि गो-हत्या के प्रायश्चित्त में उन्होंने शिव की कृपा से नदी को नीचे उतारा, और आवाहन में आज भी गौतमी नाम ही लिया जाता है।",
        "रामकुंड पंचवटी में है, नासिक का वह भाग जो राम के वनवास-काल से जुड़ा है। परंपरा है कि राम और सीता ने इसी कुंड पर स्नान किया था, और राम ने यहीं अपने पिता दशरथ का श्राद्ध किया था। इसी कारण रामकुंड नासिक का अस्थि-विसर्जन तीर्थ है: अस्थियाँ इसी कुंड के जल को सौंपी जाती हैं, और माना जाता है कि कुंड उन्हें ग्रहण कर लेता है।",
        "व्यवहार में यह सबसे पहले पितृ-कर्म का स्थान है। वर्ष भर, और पितृ पक्ष में विशेष रूप से, यहाँ श्राद्ध और तर्पण चलते रहते हैं। नासिक में सिंहस्थ भी होता है, इस नदी का कुंभ, बारह वर्ष के उस फेर पर जब बृहस्पति सिंह राशि में आते हैं, और वह ऊपर त्र्यंबकेश्वर के साथ मिलकर होता है।",
        "ब्रह्मगिरि से गोदावरी पूरे प्रायद्वीप को पार करती हुई पूर्व में बंगाल की खाड़ी तक जाती हैं, और दक्षिण भारत की सबसे लंबी नदी हैं। किंतु रामकुंड के सामने से जो बहती है वह अभी कुछ ही दसियों किलोमीटर पुरानी, और नियंत्रित नदी है: नगर से ऊपर गंगापुर बाँध है, इसलिए सूखे महीनों में कुंड का प्रवाह प्रायः वही होता है जो वहाँ से छोड़ा जाता है, जबकि भारी वर्षा का एक सप्ताह सीढ़ियों को ही जल में डुबो सकता है।",
      ],
    },
    caution: {
      en: "Ram Kund is where Nashik's families come to give their dead to the water. Asthi visarjan goes on there through the day, every day of the year. It is a place with grief standing in it, and this page describes the kund rather than showing it.",
      hi: "रामकुंड वह स्थान है जहाँ नासिक के परिवार अपने दिवंगतों को जल सौंपने आते हैं। वर्ष के हर दिन, दिन भर, वहाँ अस्थि विसर्जन चलता रहता है। यह वह स्थान है जहाँ शोक खड़ा रहता है, और यह पृष्ठ कुंड को दिखाता नहीं, उसका वर्णन करता है।",
    },
    reading: {
      en: "The cell this site reads for Nashik sits on the Godavari main stem below Ram Kund. The Godavari is a small river here and a quick one. A wet week can carry it far above what that week usually brings, and an April reading sits near the bottom of its own record. The figure is modelled discharge, ranked against 1997 to 2025 for this same week, which is why a number in the low hundreds can mean spate here and very little on the Ganga.",
      hi: "इस स्थल पर नासिक के लिए जो खंड पढ़ा जाता है वह रामकुंड के नीचे गोदावरी की मुख्य धारा पर है। यहाँ वे छोटी नदी हैं और तेज़ भी: वर्षा का एक सप्ताह उन्हें उस सप्ताह के सामान्य से कहीं ऊपर ले जा सकता है, और अप्रैल का पाठ उनके अपने अभिलेख के निचले सिरे पर बैठता है। अंक प्रतिरूपित प्रवाह है, 1997 से 2025 तक इसी सप्ताह के सापेक्ष क्रमित, और इसीलिए कुछ सौ का अंक यहाँ उफान हो सकता है और गंगा पर कुछ भी नहीं।",
    },
    tradition: [
      {
        key: "asthi-visarjan",
        kind: "personal",
        name: { en: "Asthi visarjan", hi: "अस्थि विसर्जन" },
        note: {
          en: "What Ram Kund is above all else. The ashes are given to the kund by the family, standing at the water.",
          hi: "रामकुंड सबसे पहले यही है। अस्थियाँ परिवार स्वयं, जल के सामने खड़े होकर कुंड को सौंपता है।",
        },
      },
      {
        key: "shraddha",
        kind: "personal",
        name: { en: "Shraddha and tarpan", hi: "श्राद्ध एवं तर्पण" },
        note: {
          en: "The rite this kund is best known for, kept through the year and heavily through Pitru Paksha. Eligibility varies by community and by region, and a family with a purohit follows his ruling.",
          hi: "यह कुंड सबसे अधिक इसी कर्म के लिए जाना जाता है, जो वर्ष भर और पितृ पक्ष में विशेष रूप से चलता है। अधिकार समुदाय और क्षेत्र के अनुसार भिन्न है, और जिस परिवार के अपने पुरोहित हैं वह उन्हीं का निर्णय मानता है।",
        },
      },
      {
        key: "snan",
        kind: "personal",
        name: { en: "The dip at the kund", hi: "कुंड पर स्नान" },
        note: {
          en: "Taken at the kund steps, which are cut into stone and hold water even when the river runs low.",
          hi: "कुंड की सीढ़ियों पर, जो पत्थर में कटी हैं और नदी के घटने पर भी जल रोके रखती हैं।",
        },
      },
      {
        key: "gautami-puja",
        kind: "personal",
        name: { en: "Godavari puja", hi: "गोदावरी पूजा" },
        note: {
          en: "Offered to the river under its invoked name, Gautami, the name the older texts of this place use.",
          hi: "नदी को उनके आवाहन-नाम गौतमी से अर्पित, वही नाम जो इस स्थान के प्राचीन ग्रंथ प्रयोग करते हैं।",
        },
      },
      {
        key: "simhastha",
        kind: "of-the-place",
        name: { en: "The Simhastha", hi: "सिंहस्थ" },
        note: {
          en: "The Kumbh of this river, kept at Nashik and Trimbakeshwar together at the twelve-year turn, and run by the akhadas with the mela and district administrations.",
          hi: "इस नदी का कुंभ, बारह वर्ष के फेर पर नासिक और त्र्यंबकेश्वर में एक साथ, जिसे अखाड़े मेला तथा ज़िला प्रशासन के साथ मिलकर संचालित करते हैं।",
        },
      },
    ],
    occasions: [
      {
        key: "pitru-paksha",
        name: { en: "Pitru Paksha", hi: "पितृ पक्ष" },
        reckoning: {
          en: "The dark fortnight of Bhadrapada-Ashvin",
          hi: "भाद्रपद-आश्विन का कृष्ण पक्ष",
        },
        note: {
          en: "A fortnight, not a day. Each ancestor is kept on the tithi of their passing.",
          hi: "यह एक पक्ष है, एक दिन नहीं। प्रत्येक पूर्वज का स्मरण उनकी देहावसान-तिथि पर होता है।",
        },
      },
      {
        key: "mahalaya-amavasya",
        name: { en: "Sarva Pitru Amavasya", hi: "सर्व पितृ अमावस्या" },
        reckoning: {
          en: "Amavasya closing Pitru Paksha",
          hi: "पितृ पक्ष की समापन अमावस्या",
        },
        note: {
          en: "The day kept for ancestors whose tithi is not known.",
          hi: "उन पूर्वजों के लिए जिनकी तिथि ज्ञात नहीं।",
        },
      },
      {
        key: "ram-navami",
        name: { en: "Ram Navami", hi: "राम नवमी" },
        reckoning: { en: "Navami of the bright half of Chaitra", hi: "चैत्र शुक्ल नवमी" },
        note: {
          en: "Kept in Panchavati with particular attention, since this is Rama's quarter of the city.",
          hi: "पंचवटी में यह दिन विशेष रूप से मनाया जाता है, क्योंकि यह नगर का राम से जुड़ा क्षेत्र है।",
        },
      },
      {
        key: "simhastha",
        name: { en: "Simhastha", hi: "सिंहस्थ" },
        reckoning: {
          en: "At the twelve-year turn, when Jupiter enters Simha",
          hi: "बारह वर्ष के फेर पर, जब बृहस्पति सिंह राशि में आते हैं",
        },
        note: {
          en: "Shared with Trimbakeshwar upstream. Access is settled months ahead.",
          hi: "ऊपर त्र्यंबकेश्वर के साथ सम्मिलित। प्रवेश महीनों पहले तय होता है।",
        },
      },
    ],
    keeper: {
      en: "Ram Kund and the Godavari ghats at Nashik are under the Nashik Municipal Corporation, with the district administration taking charge at Simhastha. Local tirth-purohit families hold the customary right to officiate for pilgrims here.",
      hi: "रामकुंड और नासिक के गोदावरी घाट नासिक महानगरपालिका के अधीन हैं, और सिंहस्थ के समय ज़िला प्रशासन व्यवस्था अपने हाथ में लेता है। यहाँ तीर्थयात्रियों के लिए कर्म कराने का परंपरागत अधिकार स्थानीय तीर्थ-पुरोहित परिवारों के पास है।",
    },
  },

  /* ---------------------------------------------------------------- 05 */
  {
    slug: "shipra-ujjain",
    numeral: "05",
    tz: "Asia/Kolkata",
    form: "flowing-ghat",
    river: { en: "Shipra", hi: "शिप्रा" },
    ghat: { en: "Ram Ghat", hi: "रामघाट" },
    city: { en: "Ujjain", hi: "उज्जैन" },
    state: { en: "Madhya Pradesh", hi: "मध्य प्रदेश" },
    epithet: {
      en: "At Avantika, where time is reckoned",
      hi: "अवंतिका में, जहाँ काल गिना जाता है",
    },
    standfirst: {
      en: "The oldest bathing ghat of the city that keeps Mahakal.",
      hi: "उस नगरी का सबसे प्राचीन स्नान घाट जो महाकाल को धारण करती है।",
    },
    sacred: {
      en: [
        "Ram Ghat is the oldest of Ujjain's bathing ghats on the Shipra, and the Simhastha is centred on it. Tradition places Ujjain among the four sites where a drop of the amrit fell, which is why the Kumbh returns here when Jupiter enters Simha. Simhastha is the name the city uses. The Shipra aarti is performed at these steps in the evening.",
        "Ujjain is Avantika, counted among the seven cities called moksha-puri. Its presiding form is Mahakal, Shiva as time itself, and the Mahakaleshwar jyotirlinga stands a short way from the ghat.",
        "The city holds a second claim on time. The first meridian of classical Indian astronomy was reckoned through Ujjain, and the observatory built here in the eighteenth century still stands and is still used to read the sun.",
        "The Shipra is a small river, a couple of hundred kilometres from its rise in the hills to its meeting with the Chambal, and it is fed by the monsoon rather than by snow. Through the hot months it runs thin. That is why the state cut a link from the Narmada to feed it in the years before the 2016 Simhastha, and why the Shipra at Ram Ghat in May and in August are barely the same river to look at.",
      ],
      hi: [
        "रामघाट उज्जैन के शिप्रा-तट के घाटों में सबसे प्राचीन है और सिंहस्थ का केंद्र भी यही है। परंपरा उज्जैन को उन चार स्थानों में गिनती है जहाँ अमृत की बूँद गिरी थी; इसीलिए बारह वर्ष के उस फेर पर, जब बृहस्पति सिंह राशि में आते हैं, कुंभ यहाँ लौटता है, नगर उसे सिंहस्थ कहता है। संध्या के समय इन्हीं सीढ़ियों पर शिप्रा आरती होती है।",
        "उज्जैन ही अवंतिका है, जो सात मोक्षपुरियों में गिनी जाती है। यहाँ के अधिष्ठाता महाकाल हैं, शिव, काल के रूप में, और महाकालेश्वर ज्योतिर्लिंग घाट से थोड़ी ही दूर है।",
        "काल पर इस नगर का एक दूसरा अधिकार भी है। भारतीय ज्योतिष की प्रथम मध्य-रेखा उज्जैन से होकर मानी जाती रही, और अठारहवीं शताब्दी में यहाँ बनी वेधशाला आज भी खड़ी है और आज भी उससे सूर्य देखा जाता है।",
        "शिप्रा स्वयं छोटी नदी हैं, पहाड़ियों में अपने उद्गम से चंबल में मिलने तक कुछ सौ किलोमीटर, और उन्हें हिम नहीं, वर्षा पालती है। गर्मी के महीनों में वे पतली धार में रह जाती हैं, इसीलिए 2016 के सिंहस्थ से पहले के वर्षों में राज्य ने उन्हें भरने के लिए नर्मदा से एक लिंक काटा, और इसीलिए मई की शिप्रा और अगस्त की शिप्रा रामघाट पर देखने में एक नदी लगती ही नहीं।",
      ],
    },
    reading: {
      en: "The cell this site reads for Ujjain sits on the Shipra near Ram Ghat. The figures are small, tens of cubic metres a second rather than thousands, which is what a monsoon-fed river of this size does. The Shipra is ranked only against itself, 1997 to 2025, in this same week of the year, because that is the comparison that means something.",
      hi: "इस स्थल पर उज्जैन के लिए जो खंड पढ़ा जाता है वह रामघाट के पास शिप्रा पर है। उनके अंक छोटे हैं, हज़ारों नहीं, दसियों घन मीटर प्रति सेकंड, और उनके आकार की वर्षा-पोषित नदी यही करती है। उनकी तुलना केवल उन्हीं से की जाती है, 1997 से 2025 तक, वर्ष के इसी सप्ताह में, क्योंकि यही तुलना कुछ कहती है।",
    },
    tradition: [
      {
        key: "snan",
        kind: "personal",
        name: { en: "The dip at Ram Ghat", hi: "रामघाट पर स्नान" },
        note: {
          en: "Taken from the long shallow steps, which are usable through most of the year and are the centre of the city's bathing on every parva day.",
          hi: "लंबी और उथली सीढ़ियों से, जो वर्ष के अधिकांश समय प्रयोग में रहती हैं और हर पर्व पर नगर के स्नान का केंद्र होती हैं।",
        },
      },
      {
        key: "shipra-puja",
        kind: "personal",
        name: { en: "Shipra puja", hi: "शिप्रा पूजा" },
        note: {
          en: "Offered to the river at the water's edge, at the same steps where the evening aarti is performed.",
          hi: "जल के किनारे नदी को अर्पित, उन्हीं सीढ़ियों पर जहाँ संध्या आरती होती है।",
        },
      },
      {
        key: "aarti",
        kind: "of-the-place",
        name: { en: "The Shipra aarti", hi: "शिप्रा आरती" },
        note: {
          en: "Performed at Ram Ghat in the evening. It belongs to the ghat and to the city.",
          hi: "संध्या के समय रामघाट पर। वह घाट की और नगर की है।",
        },
      },
      {
        key: "deep-daan",
        kind: "personal",
        name: { en: "Deep daan", hi: "दीप दान" },
        note: {
          en: "Set on the Shipra from the ghat steps at dusk, most of all on Kartik Purnima.",
          hi: "संध्या के समय घाट की सीढ़ियों से शिप्रा पर रखा हुआ, और सबसे अधिक कार्तिक पूर्णिमा पर।",
        },
      },
      {
        key: "simhastha",
        kind: "of-the-place",
        name: { en: "The Simhastha", hi: "सिंहस्थ" },
        note: {
          en: "Ram Ghat is its centre. The bathing order is settled between the akhadas and the administration, and access is controlled for the duration.",
          hi: "रामघाट इसका केंद्र है। स्नान का क्रम अखाड़ों और प्रशासन के बीच तय होता है, और उन दिनों प्रवेश नियंत्रित रहता है।",
        },
      },
    ],
    occasions: [
      {
        key: "mahashivratri",
        name: { en: "Mahashivratri", hi: "महाशिवरात्रि" },
        reckoning: {
          en: "Chaturdashi of the dark half of Phalguna",
          hi: "फाल्गुन कृष्ण चतुर्दशी",
        },
        note: {
          en: "The city's largest night. The ghat and the roads to it are managed as one crowd.",
          hi: "नगर की सबसे बड़ी रात्रि। घाट और उस तक जाने वाले मार्ग एक ही भीड़ की तरह संभाले जाते हैं।",
        },
      },
      {
        key: "kartik-purnima",
        name: { en: "Kartik Purnima", hi: "कार्तिक पूर्णिमा" },
        reckoning: { en: "Purnima of Kartik", hi: "कार्तिक मास की पूर्णिमा" },
        note: {
          en: "Kept at Ram Ghat with lamps on the water and a long night of bathing.",
          hi: "रामघाट पर जल पर दीप और रातभर चलता स्नान।",
        },
      },
      {
        key: "somvati-amavasya",
        name: { en: "Somvati Amavasya", hi: "सोमवती अमावस्या" },
        reckoning: { en: "An amavasya falling on a Monday", hi: "सोमवार को पड़ने वाली अमावस्या" },
        note: {
          en: "Monday belongs to Shiva, and in the city of Mahakal that coincidence is not treated lightly.",
          hi: "सोमवार शिव का दिन है, और महाकाल की नगरी में यह संयोग हल्के में नहीं लिया जाता।",
        },
      },
      {
        key: "simhastha",
        name: { en: "Simhastha", hi: "सिंहस्थ" },
        reckoning: {
          en: "At the twelve-year turn, when Jupiter enters Simha",
          hi: "बारह वर्ष के फेर पर, जब बृहस्पति सिंह राशि में आते हैं",
        },
        note: {
          en: "Ram Ghat is its centre. Access is restricted for the duration.",
          hi: "रामघाट इसका केंद्र है। उन दिनों प्रवेश नियंत्रित रहता है।",
        },
      },
    ],
    keeper: {
      en: "Ram Ghat and the Shipra ghats are under the Ujjain municipal and district administration, which takes direct charge of access at Simhastha and on Mahashivratri. The Mahakaleshwar temple is a separate authority.",
      hi: "रामघाट और शिप्रा के घाट उज्जैन नगर एवं ज़िला प्रशासन के अधीन हैं, जो सिंहस्थ तथा महाशिवरात्रि पर प्रवेश की व्यवस्था सीधे अपने हाथ में लेता है। महाकालेश्वर मंदिर एक पृथक अधिकार-क्षेत्र है।",
    },
  },

  /* ---------------------------------------------------------------- 06 */
  {
    slug: "kaveri-talakaveri",
    numeral: "06",
    tz: "Asia/Kolkata",
    form: "temple-tank",
    river: { en: "Kaveri", hi: "कावेरी" },
    riverAlso: { en: "Ponni, in Tamil", hi: "तमिल में, पोन्नी" },
    ghat: { en: "Talakaveri", hi: "तलकावेरी" },
    city: { en: "Kodagu", hi: "कोडगु" },
    state: { en: "Karnataka", hi: "कर्नाटक" },
    epithet: {
      en: "Ponni, at the spring it rises from",
      hi: "पोन्नी, उस स्रोत पर जहाँ से वे निकलती हैं",
    },
    standfirst: {
      en: "The spring the Kaveri rises from, inside a temple tank on Brahmagiri. A ghat is further down.",
      hi: "वह स्रोत जहाँ से कावेरी निकलती हैं, ब्रह्मगिरि पर एक मंदिर-कुंड के भीतर। घाट इससे नीचे हैं।",
    },
    sacred: {
      en: [
        "Talakaveri is the udgama sthala, the source: a small spring-fed kundike on the Brahmagiri hill in Kodagu, from which the Kaveri rises before going underground and re-emerging below. It sits inside a temple complex on the hill, and the flow is seasonal.",
        "In its own literature the Kaveri is Lopamudra, wife of the sage Agastya, released from his kamandalu to become the river. In Tamil country it is Ponni, and the delta it makes is most of what that name means to the people who farm it.",
        "The day at this site is Tula Sankramana, when the sun enters Tula. At a moment fixed by the panchang the spring is held to well up in the tank, and those present take the theertha. For pitru karya on the Kaveri the recognised places are downstream: the sangama at Bhagamandala below the hill, Paschima Vahini at Srirangapatna where the river turns west, Talakadu, and the Srirangam stretch.",
        "From the tank the water goes underground almost at once and rises again at Bhagamandala a short way below, where it meets the Kannike and the Sujyoti and is kept as a triveni sangama in its own right. From there the Kaveri runs east across the Deccan to the Bay of Bengal, past Srirangapatna, Shivanasamudra, Talakadu and Srirangam. The delta at the end of that journey is the reason two states have argued over the river for a century.",
      ],
      hi: [
        "तलकावेरी उद्गम स्थल है: कोडगु की ब्रह्मगिरि पहाड़ी पर एक छोटा-सा स्रोत-कुंड, जहाँ से कावेरी निकलकर कुछ दूर भूमिगत हो जाती हैं और नीचे फिर प्रकट होती हैं। यह पहाड़ी पर एक मंदिर-परिसर के भीतर है, और जल-प्रवाह ऋतु पर निर्भर है।",
        "अपने साहित्य में कावेरी लोपामुद्रा हैं, ऋषि अगस्त्य की पत्नी, जो उनके कमंडलु से मुक्त होकर नदी बनीं। तमिल भूमि में वे पोन्नी हैं, और जो डेल्टा वे बनाती हैं, वहाँ खेती करने वालों के लिए उस नाम का अर्थ प्रायः वही है।",
        "इस स्थान का दिन तुला संक्रमण है, जब सूर्य तुला राशि में प्रवेश करते हैं: पंचांग से निश्चित एक क्षण पर माना जाता है कि कुंड में स्रोत ऊपर उठ आता है, और उपस्थित जन तीर्थ ग्रहण करते हैं। कावेरी पर पितृ-कर्म के लिए मान्य स्थान नीचे हैं: पहाड़ी के नीचे भागमंडल का संगम, श्रीरंगपट्टण का पश्चिम वाहिनी जहाँ नदी पश्चिम की ओर मुड़ती हैं, तलकाडु, और श्रीरंगम का प्रवाह-क्षेत्र।",
        "कुंड से जल लगभग तुरंत भूमिगत हो जाता है और कुछ ही नीचे भागमंडल पर फिर उठता है, जहाँ वह कन्निके और सुज्योति से मिलता है और अपने आप में एक त्रिवेणी संगम माना जाता है। वहाँ से कावेरी दक्कन को पार करती हुई पूर्व में बंगाल की खाड़ी तक जाती हैं, श्रीरंगपट्टण, शिवनसमुद्र, तलकाडु और श्रीरंगम होते हुए, और उस यात्रा के अंत का डेल्टा ही वह कारण है जिस पर दो राज्य एक शताब्दी से विवाद करते आए हैं।",
      ],
    },
    caution: {
      en: "Talakaveri is a temple tank at a river's source, and the flow is seasonal. A Kaveri snan, in the sense anyone means it, belongs downstream: at the sangama at Bhagamandala, at Paschima Vahini at Srirangapatna, at Talakadu, or on the Srirangam stretch. This page names the source because that is where the river begins.",
      hi: "तलकावेरी नदी के उद्गम पर बना मंदिर-कुंड है, और प्रवाह ऋतु पर निर्भर है। कावेरी-स्नान, जिस अर्थ में लोग उसे कहते हैं, नीचे का है: भागमंडल के संगम पर, श्रीरंगपट्टण के पश्चिम वाहिनी पर, तलकाडु पर, या श्रीरंगम के प्रवाह-क्षेत्र में। यह पृष्ठ उद्गम का नाम इसलिए लेता है कि नदी यहीं से आरंभ होती है।",
    },
    reading: {
      en: "The Kaveri at Talakaveri is a few cubic metres a second. It is a spring in a tank here, and its figure sits three orders of magnitude under the others on this site because that is the size of the place. It is ranked against itself, 1997 to 2025, as every water here is, and on that scale a wet week and a dry one read as clearly as they do on the Ganga.",
      hi: "तलकावेरी में कावेरी कुछ ही घन मीटर प्रति सेकंड हैं। यहाँ वे एक कुंड में उद्गम हैं, और उनका अंक इस स्थल के बाक़ी जलों से तीन घात नीचे बैठता है, क्योंकि स्थान का आकार यही है। उनकी तुलना उन्हीं से की जाती है, 1997 से 2025 तक, जैसे यहाँ हर जल की, और इस पैमाने पर एक गीला सप्ताह और एक सूखा सप्ताह उतने ही स्पष्ट पढ़े जाते हैं जितने गंगा पर।",
    },
    tradition: [
      {
        key: "theertha",
        kind: "personal",
        name: { en: "Taking the theertha at the kundike", hi: "कुंड पर तीर्थ ग्रहण" },
        note: {
          en: "The theertha is taken from the spring by those standing at the tank. This is what the site is for.",
          hi: "कुंड के सामने खड़े लोग स्रोत से तीर्थ ग्रहण करते हैं। यह स्थान इसी के लिए है।",
        },
      },
      {
        key: "tula-sankramana",
        kind: "of-the-place",
        name: { en: "Tula Sankramana at the tank", hi: "कुंड पर तुला संक्रमण" },
        note: {
          en: "At a moment fixed by the panchang the spring is held to well up in the kundike. The temple keeps the hour, and the crowd gathers for it.",
          hi: "पंचांग से निश्चित एक क्षण पर माना जाता है कि कुंड में स्रोत ऊपर उठ आता है। मंदिर वह घड़ी रखता है, और उसी के लिए भीड़ जुटती है।",
        },
      },
      {
        key: "kaveri-puja",
        kind: "personal",
        name: { en: "Kaveri puja", hi: "कावेरी पूजा" },
        note: {
          en: "Offered at the source under the river's own names, Lopamudra and Ponni, by those who have climbed to it.",
          hi: "उद्गम पर उनके अपने नामों से, लोपामुद्रा और पोन्नी, उन लोगों द्वारा जो वहाँ तक चढ़कर आते हैं।",
        },
      },
      {
        key: "pitru-karya",
        kind: "personal",
        name: { en: "Pitru karya, kept downstream", hi: "पितृ-कर्म, जो नीचे होता है" },
        note: {
          en: "The Kaveri's pitru karya belongs downstream, at the sangama at Bhagamandala, Paschima Vahini at Srirangapatna, Talakadu and the Srirangam stretch, and it is kept there in person.",
          hi: "कावेरी का पितृ-कर्म नीचे होता है: भागमंडल के संगम पर, श्रीरंगपट्टण के पश्चिम वाहिनी पर, तलकाडु पर और श्रीरंगम के प्रवाह-क्षेत्र में, और वहाँ वह प्रत्यक्ष उपस्थित रहकर होता है।",
        },
      },
    ],
    occasions: [
      {
        key: "tula-sankramana",
        name: { en: "Tula Sankramana", hi: "तुला संक्रमण" },
        reckoning: { en: "The sun's entry into Tula", hi: "सूर्य का तुला राशि में प्रवेश" },
        note: {
          en: "The day of the site. The moment is fixed by the panchang and the tank is crowded for it.",
          hi: "इस स्थान का प्रमुख दिन। क्षण पंचांग से निश्चित होता है और उस समय कुंड पर भारी भीड़ रहती है।",
        },
      },
      {
        key: "kaveri-month",
        name: { en: "The month following Tula Sankramana", hi: "तुला संक्रमण के बाद का मास" },
        reckoning: { en: "Reckoned by the sun, not by a tithi", hi: "तिथि से नहीं, सूर्य से गिना गया" },
        note: {
          en: "Kodagu keeps the weeks after the sankramana as the river's own season.",
          hi: "कोडगु में संक्रमण के बाद के सप्ताह नदी की अपनी ऋतु माने जाते हैं।",
        },
      },
    ],
    keeper: {
      en: "The Talakaveri kshetra is in the care of a Karnataka state temple authority together with the local temple committee.",
      hi: "तलकावेरी क्षेत्र कर्नाटक की एक राज्य-स्तरीय मंदिर संस्था तथा स्थानीय मंदिर समिति की देखरेख में है।",
    },
  },
];

export const RIVER_SLUGS: string[] = RIVERS.map((r) => r.slug);

export function getGhat(slug: string): Ghat | undefined {
  return RIVERS.find((r) => r.slug === slug);
}

/** Neighbours for the "read another water" footer, wrapping at both ends. */
export function ghatNeighbours(slug: string): { prev: Ghat; next: Ghat } | undefined {
  const i = RIVERS.findIndex((r) => r.slug === slug);
  if (i === -1) return undefined;
  const prev = RIVERS[(i - 1 + RIVERS.length) % RIVERS.length];
  const next = RIVERS[(i + 1) % RIVERS.length];
  return { prev, next };
}

/* ---------------------------------------------------------------------------
   Detail-page copy, for /rivers/<slug>. Keyed by locale so a missing Hindi
   string is a type error.

   The index copy for /rivers used to live here too. It moved to
   src/content/rivers-index/, one file per locale, when that page went to
   twelve languages; this file stays English and Hindi because the six
   descriptions in it are prose nobody has written in the other ten.
   --------------------------------------------------------------------------- */

type OfferItem = { key: string; name: string; body: string };

type RiverDetailCopy = {
  back: string;
  facts: {
    river: string;
    ghat: string;
    place: string;
    form: string;
    alsoKnown: string;
    timezone: string;
  };
  formLabels: Record<WaterForm, string>;
  caution: { label: string };
  sacred: { title: string };
  reading: {
    title: string;
    lede: string;
    provenanceLabel: string;
    provenance: string[];
    attributionLabel: string;
    attribution: string[];
    cta: string;
  };
  offer: {
    title: string;
    lede: string;
    items: OfferItem[];
    cta: string;
    muhurat: string;
  };
  tradition: {
    title: string;
    lede: string;
    kindLabels: Record<TraditionKind, string>;
  };
  occasions: {
    title: string;
    lede: string;
    provisional: string;
  };
  keeper: { title: string };
  onward: { title: string; cta: string; all: string };
};

export const riverDetailContent = {
  en: {
    back: "All six waters",
    facts: {
      river: "River",
      ghat: "Ghat",
      place: "Place",
      form: "Form of the water",
      alsoKnown: "Also called",
      timezone: "Local time",
    },
    formLabels: {
      "flowing-ghat": "A working bathing ghat",
      confluence: "A confluence, reached by boat",
      "temple-tank": "A temple tank at the river's source",
    },
    caution: { label: "Before you choose this water" },
    sacred: { title: "The place" },
    reading: {
      title: "Where the figures come from",
      lede: "One number, taken the same way at all six waters.",
      provenanceLabel: "Where the figures come from",
      provenance: [
        "Flow is modelled river discharge from the Copernicus Emergency Management Service global flood model, read at the grid cell covering this reach and published once a day. It is a model rather than a gauge reading, and this site writes modelled beside every number it prints.",
        "Each value is ranked against every daily value that same cell has produced in this same week of the year from 1997 to 2025. That is what the percentile means: one water compared with its own past.",
        "Sunrise, sunset, air temperature and rainfall are read at the ghat's own coordinates rather than at the grid cell. The muhurat windows are the panchang's rules worked out from that sunrise.",
        "Every figure comes from a public source named beside it, and each can be checked against that source.",
      ],
      attributionLabel: "Attribution",
      attribution: [
        "River discharge: Copernicus Emergency Management Service, GloFAS, served by Open-Meteo, CC BY 4.0.",
        "Sun and weather: Open-Meteo, CC BY 4.0.",
      ],
      cta: "See this water live",
    },
    offer: {
      title: "What you find here",
      lede: "The same four things at every water on this site. Three of them are free to read.",
      items: [
        {
          key: "state",
          name: "The river's flow",
          body: "Modelled discharge for this reach, in cubic metres a second, ranked against 1997 to 2025 for this same week of the year.",
        },
        {
          key: "sunrise",
          name: "The sunrise",
          body: "Sunrise and sunset at this ghat's own coordinates, which is why they differ from every other ghat's.",
        },
        {
          key: "muhurat",
          name: "The muhurat windows",
          body: "Brahma, pratah, abhijit and godhuli, worked out from that sunrise rather than copied from a national table.",
        },
        {
          key: "sitting",
          name: "The snan",
          body: "Three minutes with this water at the state it is in, at an hour the panchang names, with your own sankalp in your own words.",
        },
      ],
      cta: "Begin your snan",
      muhurat: "The muhurat calendar",
    },
    tradition: {
      title: "What this water is kept for",
      lede: "What people do when they stand at this water. Some of it is centuries older than any of the words on this site.",
      kindLabels: {
        personal: "Done by the person at the water",
        "of-the-place": "Kept by the place itself",
      },
    },
    occasions: {
      title: "Days this ghat is known for",
      lede: "Each is reckoned by tithi or by the sun, as noted beside it. Dates are not printed yet: the parva day depends on a panchang, and the site has still to choose the one it will follow.",
      provisional: "Timing to be confirmed against the panchang",
    },
    keeper: { title: "Who looks after this water" },
    onward: {
      title: "Read another water",
      cta: "Begin your snan",
      all: "All six waters",
    },
  },

  hi: {
    back: "सभी छह जल",
    facts: {
      river: "नदी",
      ghat: "घाट",
      place: "स्थान",
      form: "जल का स्वरूप",
      alsoKnown: "अन्य नाम",
      timezone: "स्थानीय समय",
    },
    formLabels: {
      "flowing-ghat": "चालू स्नान घाट",
      confluence: "संगम, जहाँ नाव से पहुँचा जाता है",
      "temple-tank": "नदी के उद्गम पर मंदिर-कुंड",
    },
    caution: { label: "यह जल चुनने से पहले" },
    sacred: { title: "स्थान" },
    reading: {
      title: "अंक कहाँ से आते हैं",
      lede: "एक अंक, छहों जलों पर एक ही रीति से लिया हुआ।",
      provenanceLabel: "अंक कहाँ से आते हैं",
      provenance: [
        "प्रवाह कोपरनिकस आपातकालीन प्रबंधन सेवा के वैश्विक बाढ़ मॉडल से लिया हुआ मॉडल-प्रवाह है, जो इस धारा को ढकने वाले ग्रिड-खंड पर पढ़ा जाता है और दिन में एक बार प्रकाशित होता है। यह गेज का पाठ नहीं, मॉडल है, और यह स्थल हर अंक के साथ मॉडल लिखता है।",
        "हर मान की तुलना उसी खंड के उन सभी दैनिक मानों से होती है जो 1997 से 2025 तक वर्ष के इसी सप्ताह में आए। प्रतिशतक का यही अर्थ है: एक जल की तुलना उसके अपने अतीत से।",
        "सूर्योदय, सूर्यास्त, तापमान और वर्षा ग्रिड-खंड पर नहीं, घाट के अपने निर्देशांक पर पढ़े जाते हैं। मुहूर्त पंचांग के नियमों को उसी सूर्योदय पर लगाकर निकाले जाते हैं।",
        "हर अंक एक सार्वजनिक स्रोत से आता है जिसका नाम उसके साथ लिखा है, और हर एक उसी स्रोत पर जाँचा जा सकता है।",
      ],
      attributionLabel: "श्रेय",
      attribution: [
        "नदी-प्रवाह: Copernicus Emergency Management Service, GloFAS, Open-Meteo के माध्यम से, CC BY 4.0.",
        "सूर्य एवं मौसम: Open-Meteo, CC BY 4.0.",
      ],
      cta: "यह जल सजीव देखिए",
    },
    offer: {
      title: "यहाँ आपको क्या मिलता है",
      lede: "इस स्थल के हर जल पर यही चार बातें। इनमें से तीन पढ़ने के लिए निःशुल्क हैं।",
      items: [
        {
          key: "state",
          name: "नदी का प्रवाह",
          body: "इस धारा का मॉडल-प्रवाह, घन मीटर प्रति सेकंड में, 1997 से 2025 तक वर्ष के इसी सप्ताह के सापेक्ष आँका हुआ।",
        },
        {
          key: "sunrise",
          name: "सूर्योदय",
          body: "इस घाट के अपने निर्देशांक पर सूर्योदय और सूर्यास्त, इसीलिए ये हर दूसरे घाट से अलग होते हैं।",
        },
        {
          key: "muhurat",
          name: "मुहूर्त",
          body: "ब्रह्म, प्रातः, अभिजित और गोधूलि, किसी अखिल भारतीय सारणी से उतारे हुए नहीं, उसी सूर्योदय से निकाले हुए।",
        },
        {
          key: "sitting",
          name: "स्नान",
          body: "इस जल के साथ तीन मिनट, उस अवस्था में जिसमें यह इस समय है, पंचांग की बताई घड़ी पर, आपके अपने शब्दों में आपका अपना संकल्प।",
        },
      ],
      cta: "अपना स्नान आरंभ करें",
      muhurat: "मुहूर्त पंचांग",
    },
    tradition: {
      title: "यह जल किसके लिए माना जाता है",
      lede: "इस जल के सामने खड़े होकर लोग जो करते हैं। इसमें से बहुत कुछ इस स्थल के हर शब्द से सदियों पुराना है।",
      kindLabels: {
        personal: "जल के सामने व्यक्ति स्वयं करता है",
        "of-the-place": "स्थान का अपना",
      },
    },
    occasions: {
      title: "जिन दिनों के लिए यह घाट जाना जाता है",
      lede: "हर एक की गणना तिथि से या सूर्य से होती है, जैसा उसके आगे लिखा है। तिथियाँ अभी नहीं छपी हैं: पर्व का दिन पंचांग पर निर्भर है, और स्थल ने अभी तय करना है कि किस पंचांग को माने।",
      provisional: "समय पंचांग से पुष्ट किया जाना शेष",
    },
    keeper: { title: "इस जल की देखरेख कौन करता है" },
    onward: {
      title: "कोई और जल पढ़िए",
      cta: "अपना स्नान आरंभ करें",
      all: "सभी छह जल",
    },
  },
} satisfies Record<Lang, RiverDetailCopy>;
