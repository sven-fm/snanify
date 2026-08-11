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
  /** The river's own names in her own traditions, where there is one to give. */
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
        "Haridwar is the point at which the Ganga finishes her descent through the hills and enters the plain. The name is read two ways, Hari-dwar, the gate of Vishnu, and Har-dwar, the gate of Shiva, and both readings are kept, because the town is the doorway to two sets of shrines, Badrinath in one direction and Kedarnath in the other. By the time she arrives she has run a long way from Gaumukh, and everything below the town is flat country.",
        "Har Ki Pauri means the steps of Hari. Set into the ghat is Brahmakund, held in tradition to be the place where a drop of the amrit fell as it was carried away after the churning of the ocean; it is that tradition which gives Haridwar one of the four Kumbh Melas. A stone on the ghat is venerated as bearing Vishnu's footprint, and the ghat takes its name from that footprint.",
        "The water running past the steps is not the whole river. A short way upstream, at Bhimgoda, a channel is drawn off the main stem and it is on that channel that the ghat is built; the main stream runs east of it, and the same works feed the Upper Ganges Canal, cut in the eighteen fifties and still carrying water into the Doab. It is worth knowing when you read a flow figure for Haridwar, because the figure belongs to the river and not to the channel between the steps.",
        "In daily practice this is one of the busiest working ghats in the country. The aarti is performed at dusk; tarpan, shraddha and asthi visarjan are conducted through the day; and a little downstream at Kankhal the Daksha Mahadev temple keeps the account of Daksha's yajna, which is the older story of the place and the reason the town was a tirtha before it was a ghat.",
      ],
      hi: [
        "हरिद्वार वह स्थान है जहाँ गंगा पर्वतों से उतरना पूरा कर मैदान में प्रवेश करती हैं। नाम दो प्रकार से पढ़ा जाता है, हरिद्वार, विष्णु का द्वार, और हरद्वार, शिव का द्वार, और दोनों पाठ चलते हैं, क्योंकि यह नगर दो तीर्थ-मार्गों का प्रवेश है: एक ओर बद्रीनाथ, दूसरी ओर केदारनाथ। यहाँ पहुँचने तक वे गोमुख से बहुत दूर आ चुकी होती हैं, और नगर के नीचे सब कुछ मैदान है।",
        "हर की पौड़ी का अर्थ है हरि की सीढ़ियाँ। घाट में ही ब्रह्मकुंड है, जिसके विषय में परंपरा कहती है कि समुद्र-मंथन के बाद अमृत ले जाते समय एक बूँद यहीं गिरी थी; इसी परंपरा से हरिद्वार को चार कुंभ स्थलों में गिना जाता है। घाट पर एक शिला विष्णु के चरण-चिह्न के रूप में पूजित है, और घाट का नाम उसी चरण से है।",
        "सीढ़ियों के सामने बहता जल पूरी नदी नहीं है। कुछ ऊपर भीमगोड़ा पर मुख्य धारा से एक नहर-धारा निकाली जाती है, और घाट उसी धारा पर बना है; मुख्य धारा उसके पूर्व की ओर बहती है, और उन्हीं जल-संरचनाओं से ऊपरी गंगा नहर को जल मिलता है, जो उन्नीसवीं शताब्दी के मध्य में काटी गई थी और आज भी दोआब तक जल ले जाती है। हरिद्वार का प्रवाह-अंक पढ़ते समय यह जानना उचित है, क्योंकि वह अंक नदी का है, सीढ़ियों के बीच बहती धारा का नहीं।",
        "व्यवहार में यह देश के सबसे व्यस्त घाटों में से एक है। संध्या के समय आरती होती है; दिन भर तर्पण, श्राद्ध और अस्थि विसर्जन चलते रहते हैं; और कुछ नीचे कनखल में दक्ष महादेव मंदिर दक्ष-यज्ञ की कथा संजोए है, जो इस स्थान की उससे भी पुरानी कथा है और वह कारण भी, जिससे यह नगर घाट बनने से पहले ही तीर्थ था।",
      ],
    },
    reading: {
      en: "The cell this site reads for Haridwar sits on the Ganga main stem below the town, where she has finished her descent from the hills. The number is modelled discharge in cubic metres a second, published once a day, and it is ranked against every daily value that same cell has produced in this same week of the year from 1997 to 2025. She carries far more water here in a monsoon week than in a dry March, and the percentile is what makes the difference legible without your having to know the numbers.",
      hi: "इस स्थल पर हरिद्वार के लिए जो खंड पढ़ा जाता है वह नगर के नीचे गंगा की मुख्य धारा पर है, जहाँ वे पर्वतों से उतरना पूरा कर चुकी होती हैं। अंक प्रतिरूपित नदी-प्रवाह है, घन मीटर प्रति सेकंड में, प्रतिदिन एक बार प्रकाशित, और उसकी तुलना उसी खंड के उन सभी दैनिक मानों से की जाती है जो 1997 से 2025 तक वर्ष के इसी सप्ताह में आए। वर्षा-काल के एक सप्ताह में वे यहाँ सूखे मार्च की तुलना में कहीं अधिक जल लाती हैं, और प्रतिशतक ही वह चीज़ है जो यह अंतर बिना अंक जाने समझा देती है।",
    },
    tradition: [
      {
        key: "snan",
        kind: "personal",
        name: { en: "The dawn dip at Brahmakund", hi: "ब्रह्मकुंड पर प्रातःकालीन स्नान" },
        note: {
          en: "The dip itself, taken at first light from the steps at Brahmakund. It is what the ghat is for, and it is taken by the person who takes it.",
          hi: "स्नान स्वयं, प्रातः की पहली किरण के साथ ब्रह्मकुंड की सीढ़ियों से। घाट इसी के लिए है, और यह वही करता है जो स्वयं वहाँ उतरता है।",
        },
      },
      {
        key: "tarpan",
        kind: "personal",
        name: { en: "Tarpan", hi: "तर्पण" },
        note: {
          en: "Water offered to the ancestors by name, from the hand, standing in the river. Practice varies by community; families that keep a purohit follow his order and not a general one.",
          hi: "पूर्वजों को नामपूर्वक जल-अर्पण, हाथ से, नदी में खड़े होकर। विधि समुदाय के अनुसार भिन्न है; जिन परिवारों के अपने पुरोहित हैं वे उन्हीं का क्रम मानते हैं, कोई सामान्य क्रम नहीं।",
        },
      },
      {
        key: "asthi-visarjan",
        kind: "personal",
        name: { en: "Asthi visarjan", hi: "अस्थि विसर्जन" },
        note: {
          en: "Ashes given to the water at the ghat, which is one of the long-standing reasons families travel to Haridwar at all. It is done by the family, present, at the water.",
          hi: "घाट पर अस्थियाँ जल को सौंपी जाती हैं, और यही उन पुराने कारणों में से एक है जिनसे परिवार हरिद्वार तक आते हैं। यह परिवार स्वयं, वहाँ उपस्थित रहकर, जल के सामने करता है।",
        },
      },
      {
        key: "aarti",
        kind: "of-the-place",
        name: { en: "The evening aarti", hi: "संध्या आरती" },
        note: {
          en: "Performed at these steps at dusk by Shri Ganga Sabha, every evening, for whoever is standing there. Nobody commissions it and nobody owns it.",
          hi: "इन्हीं सीढ़ियों पर संध्या के समय श्री गंगा सभा द्वारा प्रतिदिन, जो भी वहाँ खड़ा हो उसके लिए। न कोई इसे बुलवाता है, न किसी की यह निजी वस्तु है।",
        },
      },
      {
        key: "deep-daan",
        kind: "personal",
        name: { en: "Deep daan", hi: "दीप दान" },
        note: {
          en: "A lamp on a leaf, lit and set on the water from the step. That is the whole of it, and it has always been enough.",
          hi: "पत्ते पर एक दीप, जलाकर सीढ़ी से जल पर रखा हुआ। बस इतना ही, और सदा इतना ही पर्याप्त रहा है।",
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
        "At Prayagraj the Ganga arrives from the north and the Yamuna from the west, and for a stretch the two run side by side without mixing, a line visible from a boat, the Yamuna darker and slower, the Ganga paler and quicker. Tradition holds that the Sarasvati joins them here unseen, and it is from those three that the place takes the name Triveni, three braids.",
        "Prayag means the place of sacrifice; the tradition is that Brahma performed a yajna here. The city is called Tirtharaj, king of tirthas. The Magh Mela is held on the sands each year through the month of Magha and the Kumbh at its twelve-year turn, and some pilgrims keep kalpavas, a month of residence on the sangam sands, with restraint and a daily bath.",
        "The mela is possible because of what the rivers do in winter. When the flood falls back it leaves a plain of sand between the two channels, and a city is put up on it for a month and taken down again. Nothing about that is decorative: the calendar of the mela is the calendar of the river, and a late or heavy season moves the ground it stands on. Above the sands the fort holds the Akshayavat, the undying banyan, and an Ashokan pillar that has stood on that spot far longer than the fort has.",
        "Shraddha and pind daan at Prayagraj are conducted through the Prayagwal purohits, families who hold the right to officiate for pilgrims by descent and who keep pilgrim registers going back generations. That is how it is done here: in person, by people who are there, with the family present. Snanify has nothing to do with it, arranges none of it, and names it because it is true of the place.",
      ],
      hi: [
        "प्रयागराज में गंगा उत्तर से और यमुना पश्चिम से आती हैं, और कुछ दूर तक दोनों बिना मिले साथ-साथ बहती हैं, नाव से वह रेखा स्पष्ट दिखती है: यमुना गहरी और धीमी, गंगा हल्की और तेज़। परंपरा मानती है कि सरस्वती यहीं अदृश्य रूप में मिलती हैं, और इन्हीं तीन से इस स्थान का नाम त्रिवेणी है।",
        "प्रयाग का अर्थ है यज्ञ का स्थान; परंपरा है कि ब्रह्मा ने यहाँ यज्ञ किया था। नगर को तीर्थराज कहा जाता है। माघ मास में प्रतिवर्ष रेती पर माघ मेला लगता है और बारह वर्ष के फेर पर कुंभ; कुछ तीर्थयात्री कल्पवास करते हैं, संगम की रेती पर एक मास का निवास, संयम और प्रतिदिन स्नान।",
        "मेला इसलिए संभव है कि शीत ऋतु में नदियाँ क्या करती हैं। बाढ़ उतरने पर दोनों धाराओं के बीच रेत का विस्तार छूट जाता है, और उसी पर एक मास के लिए नगर बसाया जाता है और फिर उठा लिया जाता है। इसमें सजावट कुछ नहीं है: मेले का पंचांग नदी का पंचांग है, और कोई देर से या भारी ऋतु उस ज़मीन को ही बदल देती है जिस पर वह खड़ा होता है। रेती के ऊपर किला अक्षयवट को संजोए है, और वह अशोक-स्तंभ भी, जो उस स्थान पर किले से कहीं पहले से खड़ा है।",
        "प्रयागराज में श्राद्ध और पिंडदान प्रयागवाल पुरोहितों के माध्यम से संपन्न होते हैं, वे परिवार जिन्हें तीर्थयात्रियों के लिए कर्म कराने का अधिकार वंश-परंपरा से प्राप्त है और जो पीढ़ियों पुरानी यात्री-बहियाँ रखते हैं। यहाँ यही रीति है: प्रत्यक्ष, वहाँ उपस्थित लोगों द्वारा, परिवार के सामने। स्नानिफ़ाई का इससे कोई संबंध नहीं, वह इसकी कोई व्यवस्था नहीं करता, और इसका उल्लेख इसलिए है कि यह इस स्थान का सत्य है।",
      ],
    },
    reading: {
      en: "The cell this site reads for the Sangam sits on the Ganga main stem below the confluence, so the figure carries the Ganga and the Yamuna together. It is modelled discharge, not a gauge reading, ranked against that same cell's own record for this week of the year from 1997 to 2025. When the winter figure falls it is the sands coming back, which is the ground the Magh Mela is built on.",
      hi: "इस स्थल पर संगम के लिए जो खंड पढ़ा जाता है वह संगम के नीचे गंगा की मुख्य धारा पर है, इसलिए यह अंक गंगा और यमुना दोनों को एक साथ लिए हुए है। यह प्रतिरूपित प्रवाह है, गेज का पाठ नहीं, और उसी खंड के 1997 से 2025 तक के, वर्ष के इसी सप्ताह के अपने अभिलेख के सापेक्ष क्रमित है। शीत ऋतु में जब अंक गिरता है तो वह रेती का लौटना है, और वही भूमि है जिस पर माघ मेला खड़ा होता है।",
    },
    tradition: [
      {
        key: "sangam-snan",
        kind: "personal",
        name: { en: "The dip at the meeting point", hi: "संगम-बिंदु पर स्नान" },
        note: {
          en: "Taken out in the stream rather than from a step, because the point where the two waters meet is reached by boat. It is a dip a person takes.",
          hi: "सीढ़ी से नहीं, धारा के बीच में, क्योंकि जहाँ दोनों जल मिलते हैं वहाँ नाव से पहुँचा जाता है। यह वह डुबकी है जो व्यक्ति स्वयं लगाता है।",
        },
      },
      {
        key: "pind-daan",
        kind: "personal",
        name: { en: "Pind daan and tarpan", hi: "पिंडदान एवं तर्पण" },
        note: {
          en: "Conducted at Prayagraj by the Prayagwal purohits, with the family there. The right to officiate for a pilgrim is held by descent, and eligibility for the rite itself varies by community and by region.",
          hi: "प्रयागराज में यह प्रयागवाल पुरोहितों द्वारा, परिवार की उपस्थिति में संपन्न होता है। तीर्थयात्री के लिए कर्म कराने का अधिकार वंश-परंपरा से मिलता है, और कर्म का अधिकार स्वयं समुदाय तथा क्षेत्र के अनुसार भिन्न रहता है।",
        },
      },
      {
        key: "kalpavas",
        kind: "personal",
        name: { en: "Kalpavas", hi: "कल्पवास" },
        note: {
          en: "A month of residence on the sands through Magha, with one meal, restraint, and a bath at first light every day of it. It is a month of a person's life, spent in a tent on a riverbed.",
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
          en: "A lamp set on the water at the confluence, usually from the boat that brought you. It is a lamp on a river, and nothing more is claimed for it.",
          hi: "संगम के जल पर रखा एक दीप, प्रायः उसी नाव से जो आपको वहाँ लाई। वह नदी पर एक दीप है, इससे अधिक कुछ नहीं कहा जाता।",
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
      en: "Approached as a beloved, not as a judge",
      hi: "जिसे न्यायाधीश नहीं, प्रियजन मानकर पुकारा जाता है",
    },
    standfirst: {
      en: "Vishram, rest. The ghat at which Mathura's parikrama of its own ghats begins and ends.",
      hi: "विश्राम, ठहराव। वह घाट जहाँ से मथुरा के घाटों की परिक्रमा आरंभ होकर वहीं लौटती है।",
    },
    sacred: {
      en: [
        "Vishram Ghat takes its name from vishram, rest: the tradition of Braj is that Krishna rested here after the killing of Kansa. It is the central ghat of Mathura, and the parikrama of the town's ghats begins here and returns here. The aarti at dusk is smaller and more domestic than at Haridwar, and it belongs to the town rather than to visitors.",
        "In the Braj tradition the Yamuna is not addressed chiefly as a purifier. She is Krishna's own river, the water he played in, the water the gopis carried, and she is approached with the affection due to someone loved rather than the awe due to a judge. The rites kept at this ghat carry that register, and the register is not decoration; it changes what is said.",
        "The Yamuna is also the daughter of Surya and the sister of Yama. That relation is why Yama Dwitiya, the second day after Diwali which much of India keeps as Bhai Dooj, is the great day here: brothers and sisters bathe together at this ghat, following the tradition that Yama came to his sister's house on that day and was received by her.",
        "Mathura's riverfront runs to some twenty-five ghats and the parikrama takes them in order, with Vishram first and last. The river reaching them has come a long way from Yamunotri and through a great deal of engineering: upstream of Mathura she is regulated at Hathnikund, at Wazirabad and at Okhla, where much of her is drawn off for canals and for Delhi. In a dry month what arrives at the ghat is largely what those gates release, and that fact sits underneath everything else on this page.",
      ],
      hi: [
        "विश्राम घाट का नाम विश्राम से है: ब्रज की परंपरा है कि कंस-वध के बाद कृष्ण ने यहीं विश्राम किया था। यह मथुरा का मुख्य घाट है, और नगर के घाटों की परिक्रमा यहीं से आरंभ होकर यहीं लौटती है। संध्या आरती हरिद्वार की तुलना में छोटी और अधिक घरेलू है, वह बाहर से आए लोगों की नहीं, नगर की अपनी है।",
        "ब्रज की परंपरा में यमुना को मुख्यतः शोधिका नहीं कहा जाता। वे कृष्ण की अपनी नदी हैं, वही जल जिसमें वे खेले, वही जल जिसे गोपियाँ भरकर लाईं, और उन्हें भय या न्याय के भाव से नहीं, स्नेह के भाव से पुकारा जाता है। इस घाट पर होने वाले कर्मों में वही भाव रहता है, और वह भाव केवल सजावट नहीं, उससे कहे जाने वाले शब्द बदल जाते हैं।",
        "यमुना सूर्य की पुत्री और यम की बहन भी हैं। इसी संबंध के कारण यम द्वितीया, दीपावली के दूसरे दिन, जिसे बहुत बड़े भाग में भाई दूज कहा जाता है, इस घाट का सबसे बड़ा दिन है: भाई-बहन यहाँ साथ स्नान करते हैं, इस परंपरा के अनुसार कि उस दिन यम अपनी बहन के घर आए थे और उन्होंने उनका स्वागत किया था।",
        "मथुरा के तट पर लगभग पच्चीस घाट हैं और परिक्रमा उन्हें क्रम से लेती है, जिसमें विश्राम पहला भी है और अंतिम भी। उन तक पहुँचने वाली नदी यमुनोत्री से बहुत दूर आ चुकी होती है और बहुत सारी अभियांत्रिकी से होकर: मथुरा से ऊपर वे हथिनीकुंड पर, वज़ीराबाद पर और ओखला पर नियंत्रित होती हैं, जहाँ उनका बड़ा भाग नहरों के लिए और दिल्ली के लिए निकाल लिया जाता है। सूखे महीनों में घाट तक जो पहुँचता है वह प्रायः वही है जो इन द्वारों से छोड़ा जाता है, और यह तथ्य इस पृष्ठ की हर बात के नीचे बैठा हुआ है।",
      ],
    },
    caution: {
      en: "The Yamuna at Mathura carries a heavy pollution load for much of the year, and through the dry months a large share of what passes the ghat is regulated release and drain water rather than mountain flow. Anyone going there to bathe should know that before they go, and should ask locally on the day. Snanify sends nobody, and nothing on this page is advice that the water is safe to enter.",
      hi: "मथुरा में यमुना का जल वर्ष के अधिकांश समय अत्यंत प्रदूषित रहता है, और सूखे महीनों में घाट के सामने से जो बहता है उसका बड़ा भाग पर्वतीय प्रवाह नहीं, नियंत्रित छोड़ा गया जल और नालों का जल होता है। जो वहाँ स्नान के लिए जा रहे हों, वे यह पहले जान लें और उस दिन स्थानीय लोगों से पूछ लें। स्नानिफ़ाई किसी को वहाँ नहीं भेजता, और इस पृष्ठ पर कहीं यह परामर्श नहीं है कि जल में उतरना सुरक्षित है।",
    },
    reading: {
      en: "The cell this site reads for Mathura sits on the Yamuna main stem below Vishram Ghat. Her modelled figure behaves less like a mountain river and more like a set of gates, because upstream of here she is one. Ranking her against her own record for this week of the year, 1997 to 2025, is still the honest reading, and it is the only one this site prints.",
      hi: "इस स्थल पर मथुरा के लिए जो खंड पढ़ा जाता है वह विश्राम घाट के नीचे यमुना की मुख्य धारा पर है। उनका प्रतिरूपित अंक किसी पर्वतीय नदी जैसा नहीं, द्वारों की एक शृंखला जैसा बर्ताव करता है, क्योंकि यहाँ से ऊपर वे वही हैं। फिर भी 1997 से 2025 तक, वर्ष के इसी सप्ताह के उनके अपने अभिलेख के सापेक्ष क्रम ही ईमानदार पाठ है, और यह स्थल केवल वही छापता है।",
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
          en: "The round of Mathura's riverfront, taken on foot in order, beginning and ending at Vishram. It is walked, which is the only way it exists.",
          hi: "मथुरा के तट की परिक्रमा, पैदल, क्रम से, विश्राम से आरंभ और वहीं समाप्त। यह चलकर ही होती है, इसके अस्तित्व का दूसरा रूप नहीं।",
        },
      },
      {
        key: "yamuna-puja",
        kind: "personal",
        name: { en: "Yamuna puja in the Braj register", hi: "ब्रज रीति में यमुना पूजा" },
        note: {
          en: "The upachara sequence offered to the river as to someone loved rather than to a power that must be appeased. Braj keeps its own words for it.",
          hi: "नदी को अर्पित उपचार-क्रम, किसी प्रियजन की भाँति, न कि किसी ऐसी शक्ति की भाँति जिसे मनाना पड़े। ब्रज के अपने शब्द इसके लिए हैं।",
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
          en: "Kept in Braj as the river's own day, with her puja at the ghats.",
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
    riverAlso: { en: "Gautami, in her own invocation", hi: "अपने आवाहन में, गौतमी" },
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
        "The Godavari rises at Brahmagiri, above Trimbakeshwar, a short way upstream of Nashik. Her older name is Gautami, from the sage Gautama: the account is that he brought the river down through Shiva's intercession, in expiation of a cow's death, and Gautami is the name still used when she is invoked.",
        "Ram Kund lies in Panchavati, the quarter of Nashik associated with Rama's years in exile. Tradition holds that Rama and Sita bathed at this kund, and that Rama performed his father Dasharatha's shraddha here. It is on that account that Ram Kund is Nashik's asthi visarjan tirth: ashes are given to the water at this kund, and the kund is held to receive them.",
        "In daily practice this is a place of pitru karya before it is anything else. Shraddha and tarpan go on here through the year and heavily through Pitru Paksha. Nashik also holds the Simhastha, the Kumbh of this river, at the twelve-year turn when Jupiter enters Simha, shared with Trimbakeshwar upstream.",
        "From Brahmagiri the Godavari runs east across the whole peninsula to the Bay of Bengal, and she is the longest river of southern India. What passes Ram Kund, though, is a young river only a few tens of kilometres old, and a managed one: the Gangapur dam stands upstream of the city, so through the dry months the flow at the kund is largely what is let down from it, while a heavy monsoon week can put the steps themselves under water.",
      ],
      hi: [
        "गोदावरी का उद्गम त्र्यंबकेश्वर के ऊपर ब्रह्मगिरि पर है, नासिक से कुछ ही ऊपर। उनका प्राचीन नाम गौतमी है, ऋषि गौतम से: कथा है कि गो-हत्या के प्रायश्चित्त में उन्होंने शिव की कृपा से नदी को नीचे उतारा, और आवाहन में आज भी गौतमी नाम ही लिया जाता है।",
        "रामकुंड पंचवटी में है, नासिक का वह भाग जो राम के वनवास-काल से जुड़ा है। परंपरा है कि राम और सीता ने इसी कुंड पर स्नान किया था, और राम ने यहीं अपने पिता दशरथ का श्राद्ध किया था। इसी कारण रामकुंड नासिक का अस्थि-विसर्जन तीर्थ है: अस्थियाँ इसी कुंड के जल को सौंपी जाती हैं, और माना जाता है कि कुंड उन्हें ग्रहण कर लेता है।",
        "व्यवहार में यह सबसे पहले पितृ-कर्म का स्थान है। वर्ष भर, और पितृ पक्ष में विशेष रूप से, यहाँ श्राद्ध और तर्पण चलते रहते हैं। नासिक में सिंहस्थ भी होता है, इस नदी का कुंभ, बारह वर्ष के उस फेर पर जब बृहस्पति सिंह राशि में आते हैं, और वह ऊपर त्र्यंबकेश्वर के साथ मिलकर होता है।",
        "ब्रह्मगिरि से गोदावरी पूरे प्रायद्वीप को पार करती हुई पूर्व में बंगाल की खाड़ी तक जाती हैं, और दक्षिण भारत की सबसे लंबी नदी हैं। किंतु रामकुंड के सामने से जो बहती है वह अभी कुछ ही दसियों किलोमीटर पुरानी, और नियंत्रित नदी है: नगर से ऊपर गंगापुर बाँध है, इसलिए सूखे महीनों में कुंड का प्रवाह प्रायः वही होता है जो वहाँ से छोड़ा जाता है, जबकि भारी वर्षा का एक सप्ताह सीढ़ियों को ही जल में डुबो सकता है।",
      ],
    },
    caution: {
      en: "Ram Kund is where Nashik's families come to give their dead to the water. Asthi visarjan goes on there through the day, every day of the year. It is a place with grief standing in it, and it is not a viewpoint. Snanify has nobody there and films nothing anywhere; this page describes the kund rather than showing it, and that is deliberate.",
      hi: "रामकुंड वह स्थान है जहाँ नासिक के परिवार अपने दिवंगतों को जल सौंपने आते हैं। वर्ष के हर दिन, दिन भर, वहाँ अस्थि विसर्जन चलता रहता है। यह वह स्थान है जहाँ शोक खड़ा रहता है, कोई दर्शनीय स्थल नहीं। स्नानिफ़ाई का वहाँ कोई नहीं है और वह कहीं कुछ फ़िल्माता भी नहीं; यह पृष्ठ कुंड को दिखाता नहीं, उसका वर्णन करता है, और यह जानबूझकर है।",
    },
    reading: {
      en: "The cell this site reads for Nashik sits on the Godavari main stem below Ram Kund. She is a small river here and a quick one: a wet week can carry her far above what that week usually brings, and an April reading sits near the bottom of her own record. The figure is modelled discharge, ranked against 1997 to 2025 for this same week, which is why a number in the low hundreds can mean spate here and nothing much on the Ganga.",
      hi: "इस स्थल पर नासिक के लिए जो खंड पढ़ा जाता है वह रामकुंड के नीचे गोदावरी की मुख्य धारा पर है। यहाँ वे छोटी नदी हैं और तेज़ भी: वर्षा का एक सप्ताह उन्हें उस सप्ताह के सामान्य से कहीं ऊपर ले जा सकता है, और अप्रैल का पाठ उनके अपने अभिलेख के निचले सिरे पर बैठता है। अंक प्रतिरूपित प्रवाह है, 1997 से 2025 तक इसी सप्ताह के सापेक्ष क्रमित, और इसीलिए कुछ सौ का अंक यहाँ उफान हो सकता है और गंगा पर कुछ भी नहीं।",
    },
    tradition: [
      {
        key: "asthi-visarjan",
        kind: "personal",
        name: { en: "Asthi visarjan", hi: "अस्थि विसर्जन" },
        note: {
          en: "What Ram Kund is above all else. The ashes are given to the kund by the family, standing at the water, and no part of it is done at a distance by anyone.",
          hi: "रामकुंड सबसे पहले यही है। अस्थियाँ परिवार स्वयं, जल के सामने खड़े होकर कुंड को सौंपता है, और इसका कोई अंश कोई भी दूर से नहीं करता।",
        },
      },
      {
        key: "shraddha",
        kind: "personal",
        name: { en: "Shraddha and tarpan", hi: "श्राद्ध एवं तर्पण" },
        note: {
          en: "The rite this kund is best known for, kept through the year and heavily through Pitru Paksha. Eligibility varies by community and by region, and a family that keeps a purohit follows his ruling on it.",
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
          en: "Offered to the river under her invoked name, Gautami, which is the name the older texts of this place use.",
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
          en: "The day kept for ancestors whose tithi is not known, which is most families, eventually.",
          hi: "उन पूर्वजों के लिए जिनकी तिथि ज्ञात नहीं, और अंततः अधिकांश परिवारों के साथ यही होता है।",
        },
      },
      {
        key: "ram-navami",
        name: { en: "Ram Navami", hi: "राम नवमी" },
        reckoning: { en: "Navami of the bright half of Chaitra", hi: "चैत्र शुक्ल नवमी" },
        note: {
          en: "Kept in Panchavati with particular attention, for the obvious reason.",
          hi: "पंचवटी में यह दिन विशेष रूप से मनाया जाता है, कारण स्पष्ट है।",
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
          en: "Shared with Trimbakeshwar upstream. Access is settled months ahead and no date is listed here.",
          hi: "ऊपर त्र्यंबकेश्वर के साथ सम्मिलित। प्रवेश महीनों पहले तय होता है, और यहाँ कोई तिथि नहीं दी जाती।",
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
        "Ram Ghat is the oldest of Ujjain's bathing ghats on the Shipra and the one the Simhastha is centred on. Tradition places Ujjain among the four sites where a drop of the amrit fell, which is why the Kumbh returns here at the twelve-year turn when Jupiter enters Simha; Simhastha is the name the city uses for it. The Shipra aarti is performed at these steps in the evening.",
        "Ujjain is Avantika, counted among the seven cities called moksha-puri. Its presiding form is Mahakal, Shiva as time itself, and the Mahakaleshwar jyotirlinga stands a short way from the ghat. Snanify has no access to that garbhagriha, no relationship with the temple and nothing to do with what happens inside it; what this page can honestly describe is the river and the steps.",
        "The city holds a second and stranger claim on time. The first meridian of classical Indian astronomy was reckoned through Ujjain, and the observatory built here in the eighteenth century still stands and is still used to read the sun. That a city of astronomers should also be the city of Mahakal is not a coincidence anyone in Ujjain treats as one.",
        "The Shipra herself is a small river, a couple of hundred kilometres from her rise in the hills to her meeting with the Chambal, and she is fed by the monsoon rather than by snow. Through the hot months she runs thin, which is why the state cut a link from the Narmada to feed her in the years before the 2016 Simhastha, and why the Shipra at Ram Ghat in May and the Shipra at Ram Ghat in August are barely the same river to look at.",
      ],
      hi: [
        "रामघाट उज्जैन के शिप्रा-तट के घाटों में सबसे प्राचीन है और सिंहस्थ का केंद्र भी यही है। परंपरा उज्जैन को उन चार स्थानों में गिनती है जहाँ अमृत की बूँद गिरी थी; इसीलिए बारह वर्ष के उस फेर पर, जब बृहस्पति सिंह राशि में आते हैं, कुंभ यहाँ लौटता है, नगर उसे सिंहस्थ कहता है। संध्या के समय इन्हीं सीढ़ियों पर शिप्रा आरती होती है।",
        "उज्जैन ही अवंतिका है, जो सात मोक्षपुरियों में गिनी जाती है। यहाँ के अधिष्ठाता महाकाल हैं, शिव, काल के रूप में, और महाकालेश्वर ज्योतिर्लिंग घाट से थोड़ी ही दूर है। उस गर्भगृह तक स्नानिफ़ाई की कोई पहुँच नहीं, मंदिर से कोई संबंध नहीं, और उसके भीतर जो होता है उससे कोई लेना-देना नहीं; यह पृष्ठ ईमानदारी से केवल नदी और इन सीढ़ियों का वर्णन कर सकता है।",
        "काल पर इस नगर का एक दूसरा, और कुछ विचित्र, अधिकार भी है। भारतीय ज्योतिष की प्रथम मध्य-रेखा उज्जैन से होकर मानी जाती रही, और अठारहवीं शताब्दी में यहाँ बनी वेधशाला आज भी खड़ी है और आज भी उससे सूर्य देखा जाता है। ज्योतिषियों का नगर ही महाकाल का नगर भी हो, उज्जैन में इसे कोई संयोग नहीं मानता।",
        "शिप्रा स्वयं छोटी नदी हैं, पहाड़ियों में अपने उद्गम से चंबल में मिलने तक कुछ सौ किलोमीटर, और उन्हें हिम नहीं, वर्षा पालती है। गर्मी के महीनों में वे पतली धार में रह जाती हैं, इसीलिए 2016 के सिंहस्थ से पहले के वर्षों में राज्य ने उन्हें भरने के लिए नर्मदा से एक लिंक काटा, और इसीलिए मई की शिप्रा और अगस्त की शिप्रा रामघाट पर देखने में एक नदी लगती ही नहीं।",
      ],
    },
    reading: {
      en: "The cell this site reads for Ujjain sits on the Shipra near Ram Ghat. Her figures are small numbers, tens of cubic metres a second rather than thousands, and that is simply what a monsoon-fed river of her size does. She is ranked only against herself, 1997 to 2025, in this same week of the year, because setting the Shipra beside the Ganga would tell you nothing about either.",
      hi: "इस स्थल पर उज्जैन के लिए जो खंड पढ़ा जाता है वह रामघाट के पास शिप्रा पर है। उनके अंक छोटे हैं, हज़ारों नहीं, दसियों घन मीटर प्रति सेकंड, और उनके आकार की वर्षा-पोषित नदी यही करती है। उनकी तुलना केवल उन्हीं से की जाती है, 1997 से 2025 तक, वर्ष के इसी सप्ताह में, क्योंकि शिप्रा को गंगा के बगल में रखने से दोनों में से किसी के विषय में कुछ पता नहीं चलता।",
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
          en: "Performed at Ram Ghat in the evening. It belongs to the ghat and to the city, and it happens whether anyone has come for it or not.",
          hi: "संध्या के समय रामघाट पर। वह घाट की और नगर की है, और होती रहती है, कोई उसके लिए आया हो या नहीं।",
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
          en: "Ram Ghat is its centre. Access is hard-restricted for the duration and no date is listed here.",
          hi: "रामघाट इसका केंद्र है। उन दिनों प्रवेश कड़ाई से नियंत्रित रहता है और यहाँ कोई तिथि नहीं दी जाती।",
        },
      },
    ],
    keeper: {
      en: "Ram Ghat and the Shipra ghats are under the Ujjain municipal and district administration, which takes direct charge of access at Simhastha and on Mahashivratri. The Mahakaleshwar temple is a separate authority altogether and has nothing to do with this site.",
      hi: "रामघाट और शिप्रा के घाट उज्जैन नगर एवं ज़िला प्रशासन के अधीन हैं, जो सिंहस्थ तथा महाशिवरात्रि पर प्रवेश की व्यवस्था सीधे अपने हाथ में लेता है। महाकालेश्वर मंदिर पूर्णतः पृथक अधिकार-क्षेत्र है और इस स्थल से उसका कोई संबंध नहीं।",
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
      en: "Ponni, at the spring she rises from",
      hi: "पोन्नी, उस स्रोत पर, जहाँ से वे उठती हैं",
    },
    standfirst: {
      en: "Not a ghat. A spring in a temple tank on Brahmagiri, and we say that before we say anything else.",
      hi: "यह घाट नहीं है। ब्रह्मगिरि पर एक मंदिर-कुंड में स्थित स्रोत, और यह बात हम सबसे पहले कहते हैं।",
    },
    sacred: {
      en: [
        "Talakaveri is the udgama sthala, the source: a small spring-fed kundike on the Brahmagiri hill in Kodagu, from which the Kaveri rises before going underground and re-emerging below. It sits inside a temple complex, not on a riverbank. There are no steps down into a flowing river here, and the flow is seasonal.",
        "In her own literature the Kaveri is Lopamudra, wife of the sage Agastya, released from his kamandalu to become the river. In Tamil country she is Ponni, and the delta she makes is most of what that name means to the people who farm it. She is not a southern version of a northern river, and this page will not describe her as one.",
        "The day at this site is Tula Sankramana, when the sun enters Tula: at a moment fixed by the panchang the spring is held to well up in the tank, and those present take the theertha. For pitru karya on the Kaveri the recognised places are elsewhere, the sangama at Bhagamandala below the hill, Paschima Vahini at Srirangapatna where the river turns west, Talakadu, and the Srirangam stretch.",
        "From the tank the water goes underground almost at once and rises again at Bhagamandala a short way below, where it meets the Kannike and the Sujyoti and is kept as a triveni sangama in its own right. From there the Kaveri runs east across the Deccan to the Bay of Bengal, past Srirangapatna, Shivanasamudra, Talakadu and Srirangam, and the delta at the end of that journey is the reason two states have argued over her for a century.",
      ],
      hi: [
        "तलकावेरी उद्गम स्थल है: कोडगु की ब्रह्मगिरि पहाड़ी पर एक छोटा-सा स्रोत-कुंड, जहाँ से कावेरी निकलकर कुछ दूर भूमिगत हो जाती हैं और नीचे फिर प्रकट होती हैं। यह किसी नदी-तट पर नहीं, एक मंदिर-परिसर के भीतर है। यहाँ बहती नदी में उतरने वाली कोई सीढ़ियाँ नहीं हैं, और जल-प्रवाह ऋतु पर निर्भर है।",
        "अपने साहित्य में कावेरी लोपामुद्रा हैं, ऋषि अगस्त्य की पत्नी, जो उनके कमंडलु से मुक्त होकर नदी बनीं। तमिल भूमि में वे पोन्नी हैं, और जो डेल्टा वे बनाती हैं, वहाँ खेती करने वालों के लिए उस नाम का अर्थ प्रायः वही है। वे किसी उत्तरी नदी का दक्षिणी रूप नहीं हैं, और यह पृष्ठ उन्हें ऐसा कहेगा भी नहीं।",
        "इस स्थान का दिन तुला संक्रमण है, जब सूर्य तुला राशि में प्रवेश करते हैं: पंचांग से निश्चित एक क्षण पर माना जाता है कि कुंड में स्रोत ऊपर उठ आता है, और उपस्थित जन तीर्थ ग्रहण करते हैं। कावेरी पर पितृ-कर्म के लिए मान्य स्थान अन्यत्र हैं, पहाड़ी के नीचे भागमंडल का संगम, श्रीरंगपट्टण का पश्चिम वाहिनी जहाँ नदी पश्चिम की ओर मुड़ती हैं, तलकाडु, और श्रीरंगम का प्रवाह-क्षेत्र।",
        "कुंड से जल लगभग तुरंत भूमिगत हो जाता है और कुछ ही नीचे भागमंडल पर फिर उठता है, जहाँ वह कन्निके और सुज्योति से मिलता है और अपने आप में एक त्रिवेणी संगम माना जाता है। वहाँ से कावेरी दक्कन को पार करती हुई पूर्व में बंगाल की खाड़ी तक जाती हैं, श्रीरंगपट्टण, शिवनसमुद्र, तलकाडु और श्रीरंगम होते हुए, और उस यात्रा के अंत का डेल्टा ही वह कारण है जिस पर दो राज्य एक शताब्दी से विवाद करते आए हैं।",
      ],
    },
    caution: {
      en: "Talakaveri is a temple tank at a river's source, not a bathing ghat. There are no steps into a flowing river here and the flow is seasonal. A Kaveri snan, in the sense anyone means it, belongs downstream: at the sangama at Bhagamandala, at Paschima Vahini at Srirangapatna where the river turns west, at Talakadu, or on the Srirangam stretch. Snanify arranges a snan nowhere, here or there, and would rather name the right water than trade on the famous one.",
      hi: "तलकावेरी नदी के उद्गम पर बना मंदिर-कुंड है, स्नान घाट नहीं। यहाँ बहती नदी में उतरने वाली सीढ़ियाँ नहीं हैं और प्रवाह ऋतु पर निर्भर है। कावेरी-स्नान, जिस अर्थ में लोग उसे कहते हैं, नीचे का है: भागमंडल के संगम पर, श्रीरंगपट्टण के पश्चिम वाहिनी पर जहाँ नदी पश्चिम की ओर मुड़ती हैं, तलकाडु पर, अथवा श्रीरंगम के प्रवाह-क्षेत्र में। स्नानिफ़ाई कहीं भी किसी स्नान की व्यवस्था नहीं करता, न यहाँ न वहाँ, और प्रसिद्ध नाम भुनाने के बजाय सही जल का नाम बता देना उचित समझता है।",
    },
    reading: {
      en: "The Kaveri at Talakaveri is a few cubic metres a second. She is not a river here yet; she is a spring in a tank, and her figure sits three orders of magnitude under the others on this site because that is the truth of the place and not a fault in the reading. She is ranked against herself, 1997 to 2025, as every water here is, and against herself she is exactly as legible as the Ganga.",
      hi: "तलकावेरी में कावेरी कुछ ही घन मीटर प्रति सेकंड हैं। यहाँ वे अभी नदी नहीं हैं; वे एक कुंड में उद्गम हैं, और उनका अंक इस स्थल के बाक़ी जलों से तीन घात नीचे बैठता है, क्योंकि यही इस स्थान का सत्य है, पाठ की कोई त्रुटि नहीं। उनकी तुलना उन्हीं से की जाती है, 1997 से 2025 तक, जैसे यहाँ हर जल की, और अपने ही सापेक्ष वे उतनी ही स्पष्ट हैं जितनी गंगा।",
    },
    tradition: [
      {
        key: "theertha",
        kind: "personal",
        name: { en: "Taking the theertha at the kundike", hi: "कुंड पर तीर्थ ग्रहण" },
        note: {
          en: "The theertha is taken from the spring by those standing at the tank. This is what the site is actually for, and it is the whole of what happens at it.",
          hi: "कुंड के सामने खड़े लोग स्रोत से तीर्थ ग्रहण करते हैं। यह स्थान वस्तुतः इसी के लिए है, और वहाँ जो होता है वह इतना ही है।",
        },
      },
      {
        key: "tula-sankramana",
        kind: "of-the-place",
        name: { en: "Tula Sankramana at the tank", hi: "कुंड पर तुला संक्रमण" },
        note: {
          en: "At a moment fixed by the panchang the spring is held to well up in the kundike. The temple keeps the hour and the crowd gathers for it; nobody arranges it.",
          hi: "पंचांग से निश्चित एक क्षण पर माना जाता है कि कुंड में स्रोत ऊपर उठ आता है। मंदिर वह घड़ी रखता है और उसी के लिए भीड़ जुटती है; इसकी व्यवस्था कोई नहीं करता।",
        },
      },
      {
        key: "kaveri-puja",
        kind: "personal",
        name: { en: "Kaveri puja", hi: "कावेरी पूजा" },
        note: {
          en: "Offered at the source under her own names, Lopamudra and Ponni, by those who have climbed to it.",
          hi: "उद्गम पर उनके अपने नामों से, लोपामुद्रा और पोन्नी, उन लोगों द्वारा जो वहाँ तक चढ़कर आते हैं।",
        },
      },
      {
        key: "pitru-karya",
        kind: "personal",
        name: { en: "Pitru karya, which is not kept here", hi: "पितृ-कर्म, जो यहाँ नहीं होता" },
        note: {
          en: "A source is not where the Kaveri's pitru karya belongs. The recognised places are the sangama at Bhagamandala, Paschima Vahini at Srirangapatna, Talakadu and the Srirangam stretch, and it is kept at them in person.",
          hi: "कावेरी का पितृ-कर्म उद्गम का विषय नहीं है। मान्य स्थान हैं भागमंडल का संगम, श्रीरंगपट्टण का पश्चिम वाहिनी, तलकाडु और श्रीरंगम का प्रवाह-क्षेत्र, और वहाँ वह प्रत्यक्ष उपस्थित रहकर ही होता है।",
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
      en: "The Talakaveri kshetra is in the care of a Karnataka state temple authority together with the local temple committee. Snanify has no relationship with either and has never asked them for anything.",
      hi: "तलकावेरी क्षेत्र कर्नाटक की एक राज्य-स्तरीय मंदिर संस्था तथा स्थानीय मंदिर समिति की देखरेख में है। स्नानिफ़ाई का इनमें से किसी से कोई संबंध नहीं है और उसने इनसे कभी कुछ माँगा भी नहीं।",
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
  eyebrow: string;
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
  sacred: { eyebrow: string; title: string };
  reading: {
    eyebrow: string;
    title: string;
    lede: string;
    provenanceLabel: string;
    provenance: string[];
    attributionLabel: string;
    attribution: string[];
    cta: string;
  };
  offer: {
    eyebrow: string;
    title: string;
    lede: string;
    items: OfferItem[];
    note: string;
    cta: string;
    muhurat: string;
  };
  tradition: {
    eyebrow: string;
    title: string;
    lede: string;
    standing: string;
    kindLabels: Record<TraditionKind, string>;
    personalNote: string;
    placeNote: string;
  };
  occasions: {
    eyebrow: string;
    title: string;
    lede: string;
    provisional: string;
    reckoningLabel: string;
  };
  keeper: {
    eyebrow: string;
    title: string;
    label: string;
    body: string;
  };
  onward: { eyebrow: string; title: string; cta: string; all: string; prev: string; next: string };
};

export const riverDetailContent = {
  en: {
    eyebrow: "Sacred waters",
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
    caution: { label: "Read this before you choose this water" },
    sacred: { eyebrow: "The water", title: "Why this water." },
    reading: {
      eyebrow: "The reading",
      title: "How this water is measured.",
      lede: "One number, taken the same way at all six waters, and stated the same way every time it appears.",
      provenanceLabel: "How this page knows",
      provenance: [
        "Flow is modelled river discharge from the Copernicus Emergency Management Service global flood model, read at the grid cell covering this reach and published once a day. It is a model, not a gauge reading, and this site writes modelled every time it prints a number.",
        "Each value is ranked against every daily value that same cell has produced in this same week of the year from 1997 to 2025. That is what the percentile means, and it is a comparison of one water with itself, which is the only honest one.",
        "Sunrise, sunset, air temperature and rainfall are read at the ghat's own coordinates rather than at the grid cell. The muhurat windows are the panchang's rules resolved against that true sunrise.",
        "We measure nothing ourselves. There is no camera, no microphone and no device of ours at this ghat or at any other, and nothing is performed here by anyone on anyone's behalf.",
      ],
      attributionLabel: "Attribution",
      attribution: [
        "River discharge: Copernicus Emergency Management Service, GloFAS, served by Open-Meteo, CC BY 4.0.",
        "Sun and weather: Open-Meteo, CC BY 4.0.",
      ],
      cta: "See this water as she is running now",
    },
    offer: {
      eyebrow: "What is offered here",
      title: "Four things, and nothing else.",
      lede: "The same four at every water on this site. Three of them cost nothing to read and always will.",
      items: [
        {
          key: "state",
          name: "Her measured state",
          body: "Modelled discharge for this reach, in cubic metres a second, ranked against 1997 to 2025 for this same week of the year, with the hour of the reading printed beside it.",
        },
        {
          key: "sunrise",
          name: "Her sunrise",
          body: "Sunrise and sunset at this ghat's own coordinates, which is why they do not agree with any other ghat's and are not meant to.",
        },
        {
          key: "muhurat",
          name: "Her muhurat windows",
          body: "Brahma, pratah, abhijit and godhuli, resolved as rules against that true sunrise rather than copied from a national table.",
        },
        {
          key: "sitting",
          name: "A sitting you take yourself",
          body: "Four and a half minutes against this water's live state, with your own sankalp in your own words. Nobody stands in for you.",
        },
      ],
      note: "No priest, no ghat performance, no camera, no stream, no recording, and nothing posted to you.",
      cta: "Begin your snan",
      muhurat: "The muhurat calendar",
    },
    tradition: {
      eyebrow: "Tradition",
      title: "What this water is kept for.",
      lede: "Described as tradition, in the third person, because that is what it is. Some of it is centuries older than any of the words on this site.",
      standing:
        "None of this is on offer. Snanify has nobody at this water, arranges nothing at it, and asks nothing of the people who keep it. What is listed here is what people do when they stand there.",
      kindLabels: {
        personal: "Kept in person",
        "of-the-place": "Kept by the place",
      },
      personalNote: "It is done by a person standing at the water. Snanify does not arrange it and cannot.",
      placeNote: "It happens whether or not anybody asks for it.",
    },
    occasions: {
      eyebrow: "The calendar",
      title: "Days this ghat is known for.",
      lede: "Reckoned by tithi or by the sun, as noted beside each. No dates are printed: the daily windows are computed from this ghat's own sunrise, but the tithi that fixes a parva day comes from a panchang, and we have not yet named one we are willing to stand behind.",
      provisional: "Timing to be confirmed against the panchang",
      reckoningLabel: "Reckoned as",
    },
    keeper: {
      eyebrow: "Custody",
      title: "Who looks after this water.",
      label: "In whose care",
      body: "Snanify holds no permission at this ghat and needs none, because Snanify does nothing there. Nobody stands in for you, nothing is filmed, no device of ours sits on the steps, and nothing has been asked of the people named here. They are named because who keeps a place is worth knowing, and because a page that describes a ghat and never says whose it is has left out the most practical fact about it.",
    },
    onward: {
      eyebrow: "Onward",
      title: "Read another water.",
      cta: "Begin your snan",
      all: "All six waters",
      prev: "Previous",
      next: "Next",
    },
  },

  hi: {
    eyebrow: "पवित्र जल",
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
      "flowing-ghat": "प्रयोग में रहने वाला स्नान घाट",
      confluence: "संगम, जहाँ नाव से पहुँचा जाता है",
      "temple-tank": "नदी के उद्गम पर मंदिर-कुंड",
    },
    caution: { label: "यह जल चुनने से पहले इसे पढ़ लें" },
    sacred: { eyebrow: "जल", title: "यह जल क्यों।" },
    reading: {
      eyebrow: "पाठ",
      title: "यह जल कैसे मापा जाता है।",
      lede: "एक अंक, छहों जलों पर एक ही रीति से लिया गया, और हर बार एक ही रीति से कहा गया।",
      provenanceLabel: "यह पृष्ठ कैसे जानता है",
      provenance: [
        "प्रवाह कोपरनिकस आपातकालीन प्रबंधन सेवा के वैश्विक बाढ़ मॉडल से लिया गया प्रतिरूपित नदी-प्रवाह है, जो इस धारा को ढकने वाले ग्रिड-खंड पर पढ़ा जाता है और प्रतिदिन एक बार प्रकाशित होता है। यह एक मॉडल है, गेज का पाठ नहीं, और यह स्थल जब भी कोई अंक छापता है, प्रतिरूपित ही लिखता है।",
        "प्रत्येक मान की तुलना उसी खंड के उन सभी दैनिक मानों से की जाती है जो 1997 से 2025 तक वर्ष के इसी सप्ताह में आए। प्रतिशतक का यही अर्थ है, और यह एक जल की तुलना उसी जल से है, जो एकमात्र ईमानदार तुलना है।",
        "सूर्योदय, सूर्यास्त, वायु का तापमान और वर्षा ग्रिड-खंड पर नहीं, घाट के अपने निर्देशांक पर पढ़े जाते हैं। मुहूर्त पंचांग के नियमों को उसी वास्तविक सूर्योदय पर हल करके निकाले जाते हैं।",
        "हम स्वयं कुछ नहीं मापते। इस घाट पर या किसी और घाट पर हमारा कोई कैमरा, कोई माइक्रोफ़ोन और कोई यंत्र नहीं है, और यहाँ किसी के लिए किसी के द्वारा कुछ भी नहीं किया जाता।",
      ],
      attributionLabel: "श्रेय",
      attribution: [
        "नदी-प्रवाह: Copernicus Emergency Management Service, GloFAS, Open-Meteo के माध्यम से, CC BY 4.0.",
        "सूर्य एवं मौसम: Open-Meteo, CC BY 4.0.",
      ],
      cta: "इस जल को इस समय जैसा है वैसा देखें",
    },
    offer: {
      eyebrow: "यहाँ क्या मिलता है",
      title: "चार बातें, और कुछ नहीं।",
      lede: "इस स्थल के हर जल पर यही चार। इनमें से तीन पढ़ने के लिए निःशुल्क हैं और सदा रहेंगी।",
      items: [
        {
          key: "state",
          name: "उनकी मापी हुई अवस्था",
          body: "इस धारा का प्रतिरूपित प्रवाह, घन मीटर प्रति सेकंड में, 1997 से 2025 तक वर्ष के इसी सप्ताह के सापेक्ष क्रमित, और साथ में उस पाठ की घड़ी छपी हुई।",
        },
        {
          key: "sunrise",
          name: "उनका सूर्योदय",
          body: "इस घाट के अपने निर्देशांक पर सूर्योदय और सूर्यास्त, इसीलिए वे किसी दूसरे घाट से नहीं मिलते, और मिलने भी नहीं चाहिए।",
        },
        {
          key: "muhurat",
          name: "उनके मुहूर्त",
          body: "ब्रह्म, प्रातः, अभिजित और गोधूलि, किसी अखिल भारतीय सारणी से उतारे हुए नहीं, उसी वास्तविक सूर्योदय पर नियमों से हल किए हुए।",
        },
        {
          key: "sitting",
          name: "वह बैठक जो आप स्वयं करते हैं",
          body: "इस जल की जीवंत अवस्था के सामने साढ़े चार मिनट, आपके अपने शब्दों में आपका अपना संकल्प। कोई आपके स्थान पर खड़ा नहीं होता।",
        },
      ],
      note: "न पुरोहित, न घाट पर कोई आयोजन, न कैमरा, न प्रसारण, न रिकॉर्डिंग, और डाक से आपको कुछ नहीं।",
      cta: "स्नान आरंभ करें",
      muhurat: "मुहूर्त पंचांग",
    },
    tradition: {
      eyebrow: "परंपरा",
      title: "यह जल किसके लिए माना जाता है।",
      lede: "परंपरा के रूप में, अन्य पुरुष में, क्योंकि वह है यही। इसमें से बहुत कुछ इस स्थल के हर शब्द से सदियों पुराना है।",
      standing:
        "इनमें से कुछ भी सेवा के रूप में उपलब्ध नहीं है। इस जल पर स्नानिफ़ाई का कोई नहीं है, वह वहाँ किसी बात की व्यवस्था नहीं करता, और जो लोग इसे संभालते हैं उनसे कुछ माँगता भी नहीं। यहाँ जो सूचीबद्ध है वह वही है जो लोग वहाँ खड़े होकर करते हैं।",
      kindLabels: {
        personal: "स्वयं उपस्थित होकर",
        "of-the-place": "स्थान का अपना",
      },
      personalNote: "यह जल के सामने खड़ा व्यक्ति स्वयं करता है। स्नानिफ़ाई इसकी व्यवस्था न करता है, न कर सकता है।",
      placeNote: "यह किसी के कहने पर नहीं, अपने आप होता रहता है।",
    },
    occasions: {
      eyebrow: "पंचांग",
      title: "जिन दिनों के लिए यह घाट जाना जाता है।",
      lede: "गणना तिथि से या सूर्य से, जैसा प्रत्येक के आगे अंकित है। कोई तिथि नहीं छापी जाती: दैनिक मुहूर्त इसी घाट के अपने सूर्योदय से निकाले जाते हैं, किंतु पर्व का दिन जिस तिथि से तय होता है वह पंचांग से आती है, और ऐसा कोई पंचांग हमने अभी नहीं चुना है जिसके पीछे हम खड़े हो सकें।",
      provisional: "समय पंचांग से पुष्ट किया जाना शेष",
      reckoningLabel: "गणना",
    },
    keeper: {
      eyebrow: "देखरेख",
      title: "इस जल को कौन संभालता है।",
      label: "किसकी देखरेख में",
      body: "इस घाट पर स्नानिफ़ाई के पास कोई अनुमति नहीं है और उसे किसी अनुमति की आवश्यकता भी नहीं, क्योंकि वह वहाँ कुछ करता ही नहीं। आपके स्थान पर कोई खड़ा नहीं होता, कुछ फ़िल्माया नहीं जाता, सीढ़ियों पर हमारा कोई यंत्र नहीं रखा, और यहाँ जिनका नाम है उनसे कुछ माँगा नहीं गया। उनका नाम इसलिए है कि किसी स्थान को कौन संभालता है, यह जानने योग्य बात है, और जो पृष्ठ किसी घाट का वर्णन करके यह न बताए कि वह किसका है, वह उसका सबसे व्यावहारिक तथ्य छोड़ देता है।",
    },
    onward: {
      eyebrow: "आगे",
      title: "कोई और जल पढ़ें।",
      cta: "स्नान आरंभ करें",
      all: "सभी छह जल",
      prev: "पिछला",
      next: "अगला",
    },
  },
} satisfies Record<Lang, RiverDetailCopy>;
