import type { Lang } from "@/lib/content";

/* ---------------------------------------------------------------------------
   Sacred waters — the six ghats, as entity data.

   Rules this file is written under:

   1. Everything here is either a matter of public record or a tradition
      described as a tradition. No dates, no timings, no priest names, no
      partnerships and no statistics are asserted. Where a fact is unverified
      it is marked PLACEHOLDER in the data and stated in the UI.
   2. `permitStatus` is "PLACEHOLDER" for all six. It means: we hold nothing.
      No page may imply otherwise — RiverDetail renders the status explicitly.
   3. Talakaveri is not a ghat. It is the spring the Kaveri rises from, inside
      a temple tank. The page says so before it says anything else, and points
      to Paschima Vahini for the rites that cannot be performed at a source.
   4. No river is described by reference to another river. "Dakshin Ganga" and
      "Ganga of the south" are out; Gautami and Ponni are in.
   5. No rite is ever tied to an outcome — health, wealth, examination, or any
      other. Tradition is described as tradition, never as a product benefit.
   --------------------------------------------------------------------------- */

/** What we actually hold at a ghat. All six are PLACEHOLDER — i.e. nothing. */
export type PermitStatus = "PLACEHOLDER" | "applied" | "granted";

/** The physical form of the water, because it decides what can be performed. */
export type WaterForm = "flowing-ghat" | "confluence" | "temple-tank";

/** Both locales required — a missing translation is a type error. */
export type Bilingual = Record<Lang, string>;

export type GhatRite = { key: string; name: Bilingual; note: Bilingual };

export type GhatOccasion = {
  key: string;
  name: Bilingual;
  /** How the day is reckoned — the tithi in words. Never a date. */
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
  rites: GhatRite[];
  occasions: GhatOccasion[];
  /** An honest caveat that must be read before booking. Rendered prominently. */
  caution?: Bilingual;
  /** The body that actually controls the ghat. PLACEHOLDER where unconfirmed. */
  authority: Bilingual;
  permitStatus: PermitStatus;
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
        "Haridwar is the point at which the Ganga finishes her descent through the hills and enters the plain. The name is read two ways — Hari-dwar, the gate of Vishnu, and Har-dwar, the gate of Shiva — and both readings are kept, because the town is the doorway to two sets of shrines, Badrinath in one direction and Kedarnath in the other.",
        "Har Ki Pauri means the steps of Hari. Set into the ghat is Brahmakund, held in tradition to be the place where a drop of the amrit fell as it was carried away after the churning of the ocean; it is that tradition which gives Haridwar one of the four Kumbh Melas. A stone on the ghat is venerated as bearing Vishnu's footprint, and the ghat takes its name from that footprint.",
        "In daily practice this is one of the busiest working ghats in the country. The Ganga aarti is performed here at dusk; tarpan, shraddha and asthi visarjan are conducted through the day; and the ghat is looked after by Shri Ganga Sabha, the body responsible for the aarti and for the upkeep of the steps.",
      ],
      hi: [
        "हरिद्वार वह स्थान है जहाँ गंगा पर्वतों से उतरना पूरा कर मैदान में प्रवेश करती हैं। नाम दो प्रकार से पढ़ा जाता है — हरिद्वार, विष्णु का द्वार, और हरद्वार, शिव का द्वार — और दोनों पाठ चलते हैं, क्योंकि यह नगर दो तीर्थ-मार्गों का प्रवेश है: एक ओर बद्रीनाथ, दूसरी ओर केदारनाथ।",
        "हर की पौड़ी का अर्थ है हरि की सीढ़ियाँ। घाट में ही ब्रह्मकुंड है, जिसके विषय में परंपरा कहती है कि समुद्र-मंथन के बाद अमृत ले जाते समय एक बूँद यहीं गिरी थी; इसी परंपरा से हरिद्वार को चार कुंभ स्थलों में गिना जाता है। घाट पर एक शिला विष्णु के चरण-चिह्न के रूप में पूजित है, और घाट का नाम उसी चरण से है।",
        "व्यवहार में यह देश के सबसे व्यस्त घाटों में से एक है। संध्या के समय यहाँ गंगा आरती होती है; दिन भर तर्पण, श्राद्ध और अस्थि विसर्जन चलते रहते हैं; और घाट की देखरेख श्री गंगा सभा करती है, जिस पर आरती तथा सीढ़ियों के रखरखाव का दायित्व है।",
      ],
    },
    rites: [
      {
        key: "sankalp-snan",
        name: { en: "Sankalp and pratinidhi snan", hi: "संकल्प एवं प्रतिनिधि स्नान" },
        note: {
          en: "Your name and gotra are spoken at the water, and the ritvik enters it as your representative.",
          hi: "जल के समीप आपका नाम और गोत्र उच्चारित होते हैं, और ऋत्विक आपके प्रतिनिधि के रूप में जल में उतरते हैं।",
        },
      },
      {
        key: "tarpan",
        name: { en: "Tarpan", hi: "तर्पण" },
        note: {
          en: "Water offered to the ancestors by name. Practice varies by community — if your family keeps a purohit, ask them first.",
          hi: "पूर्वजों को नामपूर्वक जल-अर्पण। विधि समुदाय के अनुसार भिन्न होती है — यदि आपके परिवार के अपने पुरोहित हैं, पहले उनसे पूछ लें।",
        },
      },
      {
        key: "nadi-puja",
        name: { en: "Ganga puja", hi: "गंगा पूजा" },
        note: {
          en: "The upachara sequence offered to the river herself at the water's edge.",
          hi: "जल के किनारे नदी को ही अर्पित उपचार-क्रम।",
        },
      },
      {
        key: "deep-daan",
        name: { en: "Deep daan", hi: "दीप दान" },
        note: {
          en: "A lamp, lit, named, and set on the water. That is the whole of it, and it has always been enough.",
          hi: "एक दीप — जलाया गया, नाम लिया गया, जल पर रखा गया। बस इतना ही, और सदा इतना ही पर्याप्त रहा है।",
        },
      },
    ],
    occasions: [
      {
        key: "kartik-purnima",
        name: { en: "Kartik Purnima", hi: "कार्तिक पूर्णिमा" },
        reckoning: { en: "Purnima of Kartik", hi: "कार्तिक मास की पूर्णिमा" },
        note: {
          en: "Dev Deepawali at the ghats — the steps are lit end to end with lamps.",
          hi: "घाटों पर देव दीपावली — सीढ़ियाँ एक छोर से दूसरे छोर तक दीपों से जगमगाती हैं।",
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
          hi: "यह तिथि नहीं, सौर गणना है — और उत्तरायण का आरंभ।",
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
    authority: {
      en: "Har Ki Pauri is administered by Shri Ganga Sabha, which runs the evening aarti and maintains the ghat. The Haridwar municipal and district administrations control access at Kumbh and on major parva days.",
      hi: "हर की पौड़ी का प्रबंधन श्री गंगा सभा करती है, जो संध्या आरती संचालित करती है और घाट का रखरखाव देखती है। कुंभ तथा बड़े पर्वों पर प्रवेश हरिद्वार नगर एवं ज़िला प्रशासन के नियंत्रण में रहता है।",
    },
    permitStatus: "PLACEHOLDER",
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
      en: "Tirtharaj — the king of tirthas, where the Ganga and the Yamuna run side by side before they mix.",
      hi: "तीर्थराज — जहाँ गंगा और यमुना मिलने से पहले कुछ दूर साथ-साथ बहती हैं।",
    },
    sacred: {
      en: [
        "At Prayagraj the Ganga arrives from the north and the Yamuna from the west, and for a stretch the two run side by side without mixing — a line visible from a boat, the Yamuna darker and slower, the Ganga paler and quicker. Tradition holds that the Sarasvati joins them here unseen, and it is from those three that the place takes the name Triveni, three braids.",
        "Prayag means the place of sacrifice; the tradition is that Brahma performed a yajna here. The city is called Tirtharaj, king of tirthas. The Magh Mela is held on the sands each year through the month of Magha and the Kumbh at its twelve-year turn, and some pilgrims keep kalpavas — a month of residence on the sangam sands, with restraint and a daily bath.",
        "Shraddha and pind daan at Prayagraj are conducted through the Prayagwal purohits, families who hold the right to officiate for pilgrims by descent and who keep pilgrim registers going back generations. Any rite performed here is performed with them, not around them, and we would not describe it otherwise.",
      ],
      hi: [
        "प्रयागराज में गंगा उत्तर से और यमुना पश्चिम से आती हैं, और कुछ दूर तक दोनों बिना मिले साथ-साथ बहती हैं — नाव से वह रेखा स्पष्ट दिखती है: यमुना गहरी और धीमी, गंगा हल्की और तेज़। परंपरा मानती है कि सरस्वती यहीं अदृश्य रूप में मिलती हैं, और इन्हीं तीन से इस स्थान का नाम त्रिवेणी है।",
        "प्रयाग का अर्थ है यज्ञ का स्थान; परंपरा है कि ब्रह्मा ने यहाँ यज्ञ किया था। नगर को तीर्थराज कहा जाता है। माघ मास में प्रतिवर्ष रेती पर माघ मेला लगता है और बारह वर्ष के फेर पर कुंभ; कुछ तीर्थयात्री कल्पवास करते हैं — संगम की रेती पर एक मास का निवास, संयम और प्रतिदिन स्नान।",
        "प्रयागराज में श्राद्ध और पिंडदान प्रयागवाल पुरोहितों के माध्यम से संपन्न होते हैं — वे परिवार जिन्हें तीर्थयात्रियों के लिए कर्म कराने का अधिकार वंश-परंपरा से प्राप्त है और जो पीढ़ियों पुरानी यात्री-बहियाँ रखते हैं। यहाँ कोई भी अनुष्ठान उनके साथ होता है, उन्हें छोड़कर नहीं — और हम इसे किसी और रूप में नहीं कहेंगे।",
      ],
    },
    rites: [
      {
        key: "sankalp-snan",
        name: { en: "Sankalp and pratinidhi snan", hi: "संकल्प एवं प्रतिनिधि स्नान" },
        note: {
          en: "Performed from the water at the meeting point, which is reached by boat rather than by a step.",
          hi: "संगम-बिंदु पर जल से ही संपन्न, जहाँ सीढ़ी से नहीं, नाव से पहुँचा जाता है।",
        },
      },
      {
        key: "pind-daan",
        name: { en: "Pind daan and tarpan", hi: "पिंडदान एवं तर्पण" },
        note: {
          en: "Conducted with the Prayagwal purohits. Eligibility rules vary sharply by community and region; ask your family purohit before you ask us.",
          hi: "प्रयागवाल पुरोहितों के साथ संपन्न। अधिकार के नियम समुदाय और क्षेत्र के अनुसार बहुत भिन्न हैं; हमसे पूछने से पहले अपने कुल-पुरोहित से पूछें।",
        },
      },
      {
        key: "nadi-puja",
        name: { en: "Triveni puja", hi: "त्रिवेणी पूजा" },
        note: {
          en: "The three waters invoked together, by their own names.",
          hi: "तीनों धाराओं का उनके अपने नामों से एक साथ आवाहन।",
        },
      },
      {
        key: "deep-daan",
        name: { en: "Deep daan", hi: "दीप दान" },
        note: {
          en: "A lamp set on the water at the confluence. It is a lamp on a river, and nothing more is claimed for it.",
          hi: "संगम के जल पर रखा एक दीप। वह नदी पर एक दीप है — इससे अधिक कुछ नहीं कहा जाता।",
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
    authority: {
      en: "The sangam and the mela grounds are controlled by the Prayagraj district administration and the Mela Authority, with the ritual right to officiate for pilgrims held by the Prayagwal purohits. Access at Kumbh is restricted well in advance.",
      hi: "संगम और मेला क्षेत्र प्रयागराज ज़िला प्रशासन तथा मेला प्राधिकरण के नियंत्रण में हैं, जबकि तीर्थयात्रियों के लिए कर्म कराने का अधिकार प्रयागवाल पुरोहितों के पास है। कुंभ के समय प्रवेश बहुत पहले से नियंत्रित कर दिया जाता है।",
    },
    permitStatus: "PLACEHOLDER",
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
      en: "Vishram — rest. The ghat at which Mathura's parikrama of its own ghats begins and ends.",
      hi: "विश्राम — ठहराव। वह घाट जहाँ से मथुरा के घाटों की परिक्रमा आरंभ होकर वहीं लौटती है।",
    },
    sacred: {
      en: [
        "Vishram Ghat takes its name from vishram, rest: the tradition of Braj is that Krishna rested here after the killing of Kansa. It is the central ghat of Mathura, and the parikrama of the town's ghats begins here and returns here. The aarti at dusk is smaller and more domestic than at Haridwar, and it belongs to the town rather than to visitors.",
        "In the Braj tradition the Yamuna is not addressed chiefly as a purifier. She is Krishna's own river — the water he played in, the water the gopis carried — and she is approached with the affection due to someone loved rather than the awe due to a judge. Rites performed at this ghat carry that register, and the register is not decoration; it changes what is said.",
        "The Yamuna is also the daughter of Surya and the sister of Yama. That relation is why Yama Dwitiya, the second day after Diwali which much of India keeps as Bhai Dooj, is the great day here: brothers and sisters bathe together at this ghat, following the tradition that Yama came to his sister's house on that day and was received by her.",
      ],
      hi: [
        "विश्राम घाट का नाम विश्राम से है: ब्रज की परंपरा है कि कंस-वध के बाद कृष्ण ने यहीं विश्राम किया था। यह मथुरा का मुख्य घाट है, और नगर के घाटों की परिक्रमा यहीं से आरंभ होकर यहीं लौटती है। संध्या आरती हरिद्वार की तुलना में छोटी और अधिक घरेलू है — वह बाहर से आए लोगों की नहीं, नगर की अपनी है।",
        "ब्रज की परंपरा में यमुना को मुख्यतः शोधिका नहीं कहा जाता। वे कृष्ण की अपनी नदी हैं — वही जल जिसमें वे खेले, वही जल जिसे गोपियाँ भरकर लाईं — और उन्हें भय या न्याय के भाव से नहीं, स्नेह के भाव से पुकारा जाता है। इस घाट पर होने वाले अनुष्ठानों में वही भाव रहता है, और वह भाव केवल सजावट नहीं — उससे कहे जाने वाले शब्द बदल जाते हैं।",
        "यमुना सूर्य की पुत्री और यम की बहन भी हैं। इसी संबंध के कारण यम द्वितीया — दीपावली के दूसरे दिन, जिसे बहुत बड़े भाग में भाई दूज कहा जाता है — इस घाट का सबसे बड़ा दिन है: भाई-बहन यहाँ साथ स्नान करते हैं, इस परंपरा के अनुसार कि उस दिन यम अपनी बहन के घर आए थे और उन्होंने उनका स्वागत किया था।",
      ],
    },
    caution: {
      en: "The Yamuna at Mathura carries a heavy pollution load for much of the year. Where the water cannot be entered safely, the rite is performed at the water's edge with jal taken up by hand — and the recording and the Sankalp Patra say so, in those words. We would rather tell you than frame the shot around it.",
      hi: "मथुरा में यमुना का जल वर्ष के अधिकांश समय अत्यंत प्रदूषित रहता है। जहाँ जल में उतरना सुरक्षित न हो, वहाँ अनुष्ठान किनारे पर, हाथ में जल लेकर संपन्न किया जाता है — और रिकॉर्डिंग तथा संकल्प पत्र में यही शब्दों में लिखा जाता है। इसे कैमरे से छिपाने के बजाय हम आपको बता देना उचित समझते हैं।",
    },
    rites: [
      {
        key: "sankalp-snan",
        name: { en: "Sankalp and pratinidhi snan", hi: "संकल्प एवं प्रतिनिधि स्नान" },
        note: {
          en: "Where the water is not safe to enter, performed at the edge with jal taken up by hand, and stated as such.",
          hi: "जहाँ जल में उतरना सुरक्षित न हो, किनारे पर हाथ में जल लेकर संपन्न — और यह स्पष्ट लिखा जाता है।",
        },
      },
      {
        key: "nadi-puja",
        name: { en: "Yamuna puja", hi: "यमुना पूजा" },
        note: {
          en: "The upachara sequence offered to the river in the Braj register, as to someone loved.",
          hi: "ब्रज की रीति में नदी को अर्पित उपचार-क्रम — जैसे किसी प्रियजन को।",
        },
      },
      {
        key: "deep-daan",
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
          en: "The largest day at this ghat — brothers and sisters bathe here together.",
          hi: "इस घाट का सबसे बड़ा दिन — भाई-बहन यहाँ साथ स्नान करते हैं।",
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
          hi: "ब्रज के सभी नगरों में — केवल मथुरा में नहीं — एक मास तक प्रातःकालीन स्नान।",
        },
      },
    ],
    /* PLACEHOLDER — which body must consent has not been established. */
    authority: {
      en: "Vishram Ghat is looked after by Mathura's tirth-purohit families together with the municipal body, and the evening aarti is run by a local samiti. Which of these must consent to a paid, filmed rite is exactly what we have not yet established, and we will name it here once we have.",
      hi: "विश्राम घाट की देखरेख मथुरा के तीर्थ-पुरोहित परिवार और नगर निकाय मिलकर करते हैं, तथा संध्या आरती एक स्थानीय समिति संचालित करती है। शुल्क लेकर किए जाने वाले, फ़िल्माए जाने वाले अनुष्ठान के लिए इनमें से किसकी सहमति आवश्यक है — यही हमने अभी तय नहीं किया है।",
    },
    permitStatus: "PLACEHOLDER",
  },

  /* ---------------------------------------------------------------- 04 */
  {
    slug: "godavari-nashik",
    numeral: "04",
    tz: "Asia/Kolkata",
    form: "flowing-ghat",
    river: { en: "Godavari", hi: "गोदावरी" },
    riverAlso: { en: "Gautami, in her own invocation", hi: "अपने आवाहन में — गौतमी" },
    ghat: { en: "Ram Kund", hi: "रामकुंड" },
    city: { en: "Nashik", hi: "नासिक" },
    state: { en: "Maharashtra", hi: "महाराष्ट्र" },
    epithet: {
      en: "Gautami — the river a sage brought down",
      hi: "गौतमी — जिसे एक ऋषि उतार लाए",
    },
    standfirst: {
      en: "The kund at Panchavati where Nashik gives its dead to the water.",
      hi: "पंचवटी का वह कुंड जहाँ नासिक अपने दिवंगतों को जल सौंपता है।",
    },
    sacred: {
      en: [
        "The Godavari rises at Brahmagiri, above Trimbakeshwar, a short way upstream of Nashik. Her older name is Gautami, from the sage Gautama: the account is that he brought the river down through Shiva's intercession, in expiation of a cow's death, and Gautami is the name still used when she is invoked.",
        "Ram Kund lies in Panchavati, the quarter of Nashik associated with Rama's years in exile. Tradition holds that Rama and Sita bathed at this kund, and that Rama performed his father Dasharatha's shraddha here. It is on that account that Ram Kund is Nashik's asthi visarjan tirth: ashes are given to the water at this kund, and the kund is held to receive them.",
        "In daily practice this is a place of pitru karya before it is anything else. Shraddha and tarpan go on here through the year and heavily through Pitru Paksha. Nashik also holds the Simhastha, the Kumbh of this river, at the twelve-year turn when Jupiter enters Simha, shared with Trimbakeshwar upstream. The ghat is under the Nashik Municipal Corporation.",
      ],
      hi: [
        "गोदावरी का उद्गम त्र्यंबकेश्वर के ऊपर ब्रह्मगिरि पर है, नासिक से कुछ ही ऊपर। उनका प्राचीन नाम गौतमी है, ऋषि गौतम से: कथा है कि गो-हत्या के प्रायश्चित्त में उन्होंने शिव की कृपा से नदी को नीचे उतारा, और आवाहन में आज भी गौतमी नाम ही लिया जाता है।",
        "रामकुंड पंचवटी में है — नासिक का वह भाग जो राम के वनवास-काल से जुड़ा है। परंपरा है कि राम और सीता ने इसी कुंड पर स्नान किया था, और राम ने यहीं अपने पिता दशरथ का श्राद्ध किया था। इसी कारण रामकुंड नासिक का अस्थि-विसर्जन तीर्थ है: अस्थियाँ इसी कुंड के जल को सौंपी जाती हैं, और माना जाता है कि कुंड उन्हें ग्रहण कर लेता है।",
        "व्यवहार में यह सबसे पहले पितृ-कर्म का स्थान है। वर्ष भर, और पितृ पक्ष में विशेष रूप से, यहाँ श्राद्ध और तर्पण चलते रहते हैं। नासिक में सिंहस्थ भी होता है — इस नदी का कुंभ — बारह वर्ष के उस फेर पर जब बृहस्पति सिंह राशि में आते हैं, और वह ऊपर त्र्यंबकेश्वर के साथ मिलकर होता है। घाट नासिक महानगरपालिका के अधीन है।",
      ],
    },
    caution: {
      en: "Ram Kund is where Nashik's families come to give their dead to the water. Our framing rule at this ghat is strict and is not negotiable: the camera stays on the ritvik, the offering and the water. No crowd pans, no filming of anyone else's rites, and the operator kills the feed rather than point it at a family.",
      hi: "रामकुंड वह स्थान है जहाँ नासिक के परिवार अपने दिवंगतों को जल सौंपने आते हैं। इस घाट पर हमारा कैमरा-नियम कठोर है और उस पर कोई समझौता नहीं: कैमरा ऋत्विक, अर्पण और जल पर ही रहेगा। भीड़ पर कोई पैन नहीं, किसी और के कर्म का कोई चित्रांकन नहीं — और यदि ऐसी स्थिति बने तो संचालक कैमरा किसी परिवार की ओर मोड़ने के बजाय प्रसारण बंद कर देगा।",
    },
    rites: [
      {
        key: "tarpan",
        name: { en: "Tarpan and pitru sankalp", hi: "तर्पण एवं पितृ संकल्प" },
        note: {
          /* No refund terms are stated here: the refund policy is a single
             site-wide document, and a rite page must not invent its own. */
          en: "The rite this kund is best known for. Eligibility varies by community and by region; ask your family purohit first. A ritvik here may decline a rite he judges is not his to perform, and we would rather he declined than obliged.",
          hi: "यह कुंड सबसे अधिक इसी कर्म के लिए जाना जाता है। अधिकार समुदाय और क्षेत्र के अनुसार भिन्न है; पहले अपने कुल-पुरोहित से पूछें। यहाँ ऋत्विक ऐसे किसी कर्म को करने से मना कर सकते हैं जिसे वे अपना अधिकार नहीं मानते — और हम चाहेंगे कि वे मना ही करें, निभा न दें।",
        },
      },
      {
        key: "sankalp-snan",
        name: { en: "Sankalp and pratinidhi snan", hi: "संकल्प एवं प्रतिनिधि स्नान" },
        note: {
          en: "Performed at the kund steps, which are cut into stone and hold water even when the river runs low.",
          hi: "कुंड की सीढ़ियों पर संपन्न, जो पत्थर में कटी हैं और नदी के घटने पर भी जल रोके रखती हैं।",
        },
      },
      {
        key: "nadi-puja",
        name: { en: "Godavari puja", hi: "गोदावरी पूजा" },
        note: {
          en: "Offered to the river under her invoked name, Gautami.",
          hi: "नदी को उनके आवाहन-नाम गौतमी से अर्पित।",
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
          en: "The day kept for ancestors whose tithi is not known — which is most families, eventually.",
          hi: "उन पूर्वजों के लिए जिनकी तिथि ज्ञात नहीं — और अंततः अधिकांश परिवारों के साथ यही होता है।",
        },
      },
      {
        key: "ram-navami",
        name: { en: "Ram Navami", hi: "राम नवमी" },
        reckoning: { en: "Navami of the bright half of Chaitra", hi: "चैत्र शुक्ल नवमी" },
        note: {
          en: "Kept in Panchavati with particular attention, for the obvious reason.",
          hi: "पंचवटी में यह दिन विशेष रूप से मनाया जाता है — कारण स्पष्ट है।",
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
          en: "Shared with Trimbakeshwar upstream. Access is controlled months ahead and we list no date for it.",
          hi: "ऊपर त्र्यंबकेश्वर के साथ सम्मिलित। प्रवेश महीनों पहले से नियंत्रित होता है, और हम इसकी कोई तिथि नहीं देते।",
        },
      },
    ],
    authority: {
      en: "Ram Kund and the Godavari ghats at Nashik are under the Nashik Municipal Corporation, with the district administration taking control at Simhastha. Local tirth-purohit families hold the customary right to officiate for pilgrims here.",
      hi: "रामकुंड और नासिक के गोदावरी घाट नासिक महानगरपालिका के अधीन हैं, और सिंहस्थ के समय नियंत्रण ज़िला प्रशासन ले लेता है। यहाँ तीर्थयात्रियों के लिए कर्म कराने का परंपरागत अधिकार स्थानीय तीर्थ-पुरोहित परिवारों के पास है।",
    },
    permitStatus: "PLACEHOLDER",
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
        "Ram Ghat is the oldest of Ujjain's bathing ghats on the Shipra and the one the Simhastha is centred on. Tradition places Ujjain among the four sites where a drop of the amrit fell, which is why the Kumbh returns here at the twelve-year turn when Jupiter enters Simha — Simhastha is the name the city uses for it. The Shipra aarti is performed at these steps in the evening.",
        "Ujjain is Avantika, counted among the seven cities called moksha-puri. Its presiding form is Mahakal — Shiva as time itself — and the Mahakaleshwar jyotirlinga stands a short way from the ghat. We perform nothing inside that temple and claim no access to it; what we can honestly describe is the river and the steps.",
        "The city holds a second and stranger claim on time. The first meridian of classical Indian astronomy was reckoned through Ujjain, and the observatory built here in the eighteenth century still stands and is still used to read the sun. That a city of astronomers should also be the city of Mahakal is not a coincidence anyone in Ujjain treats as one.",
      ],
      hi: [
        "रामघाट उज्जैन के शिप्रा-तट के घाटों में सबसे प्राचीन है और सिंहस्थ का केंद्र भी यही है। परंपरा उज्जैन को उन चार स्थानों में गिनती है जहाँ अमृत की बूँद गिरी थी; इसीलिए बारह वर्ष के उस फेर पर, जब बृहस्पति सिंह राशि में आते हैं, कुंभ यहाँ लौटता है — नगर उसे सिंहस्थ कहता है। संध्या के समय इन्हीं सीढ़ियों पर शिप्रा आरती होती है।",
        "उज्जैन ही अवंतिका है, जो सात मोक्षपुरियों में गिनी जाती है। यहाँ के अधिष्ठाता महाकाल हैं — शिव, काल के रूप में — और महाकालेश्वर ज्योतिर्लिंग घाट से थोड़ी ही दूर है। उस मंदिर के भीतर हम कुछ नहीं करते और वहाँ किसी प्रकार की पहुँच का दावा भी नहीं करते; हम ईमानदारी से केवल नदी और इन सीढ़ियों का वर्णन कर सकते हैं।",
        "काल पर इस नगर का एक दूसरा, और कुछ विचित्र, अधिकार भी है। भारतीय ज्योतिष की प्रथम मध्य-रेखा उज्जैन से होकर मानी जाती रही, और अठारहवीं शताब्दी में यहाँ बनी वेधशाला आज भी खड़ी है और आज भी उससे सूर्य देखा जाता है। ज्योतिषियों का नगर ही महाकाल का नगर भी हो — उज्जैन में इसे कोई संयोग नहीं मानता।",
      ],
    },
    rites: [
      {
        key: "sankalp-snan",
        name: { en: "Sankalp and pratinidhi snan", hi: "संकल्प एवं प्रतिनिधि स्नान" },
        note: {
          en: "Performed at the Ram Ghat steps, which run long and shallow and are usable through most of the year.",
          hi: "रामघाट की सीढ़ियों पर संपन्न, जो लंबी और उथली हैं और वर्ष के अधिकांश समय प्रयोग में रहती हैं।",
        },
      },
      {
        key: "nadi-puja",
        name: { en: "Shipra puja", hi: "शिप्रा पूजा" },
        note: {
          en: "Offered to the river at the water's edge, at the same steps where the evening aarti is performed.",
          hi: "जल के किनारे नदी को अर्पित — उन्हीं सीढ़ियों पर जहाँ संध्या आरती होती है।",
        },
      },
      {
        key: "abhishek",
        name: { en: "Abhishek at a ghat-side shrine", hi: "घाट-स्थित मंदिर में अभिषेक" },
        note: {
          en: "At a shrine on the ghat itself. Not at Mahakaleshwar — we have no access to that garbhagriha and will never imply that we do.",
          hi: "घाट पर ही स्थित किसी मंदिर में। महाकालेश्वर में नहीं — उस गर्भगृह तक हमारी कोई पहुँच नहीं है और हम कभी ऐसा संकेत भी नहीं करेंगे।",
        },
      },
      {
        key: "deep-daan",
        name: { en: "Deep daan", hi: "दीप दान" },
        note: {
          en: "Set on the Shipra from the ghat steps at dusk.",
          hi: "संध्या के समय घाट की सीढ़ियों से शिप्रा के जल पर रखा हुआ।",
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
          en: "Ram Ghat is its centre. Access is hard-restricted and separately permitted; we list no date.",
          hi: "रामघाट इसका केंद्र है। प्रवेश कड़ाई से नियंत्रित होता है और अनुमति अलग से लेनी होती है; हम कोई तिथि नहीं देते।",
        },
      },
    ],
    authority: {
      en: "Ram Ghat and the Shipra ghats are under the Ujjain municipal and district administration, which takes direct control of access at Simhastha and on Mahashivratri. The Mahakaleshwar temple is a separate authority altogether and is not part of anything we offer.",
      hi: "रामघाट और शिप्रा के घाट उज्जैन नगर एवं ज़िला प्रशासन के अधीन हैं, जो सिंहस्थ तथा महाशिवरात्रि पर प्रवेश का नियंत्रण सीधे अपने हाथ में ले लेता है। महाकालेश्वर मंदिर पूर्णतः पृथक अधिकार-क्षेत्र है और हमारी किसी सेवा का अंग नहीं।",
    },
    permitStatus: "PLACEHOLDER",
  },

  /* ---------------------------------------------------------------- 06 */
  {
    slug: "kaveri-talakaveri",
    numeral: "06",
    tz: "Asia/Kolkata",
    form: "temple-tank",
    river: { en: "Kaveri", hi: "कावेरी" },
    riverAlso: { en: "Ponni, in Tamil", hi: "तमिल में — पोन्नी" },
    ghat: { en: "Talakaveri", hi: "तलकावेरी" },
    city: { en: "Kodagu", hi: "कोडगु" },
    state: { en: "Karnataka", hi: "कर्नाटक" },
    epithet: {
      en: "Ponni, at the spring she rises from",
      hi: "पोन्नी — उस स्रोत पर, जहाँ से वे उठती हैं",
    },
    standfirst: {
      en: "Not a ghat. A spring in a temple tank on Brahmagiri — and we say that before we say anything else.",
      hi: "यह घाट नहीं है। ब्रह्मगिरि पर एक मंदिर-कुंड में स्थित स्रोत — और यह बात हम सबसे पहले कहते हैं।",
    },
    sacred: {
      en: [
        "Talakaveri is the udgama sthala, the source: a small spring-fed kundike on the Brahmagiri hill in Kodagu, from which the Kaveri rises before going underground and re-emerging below. It sits inside a temple complex, not on a riverbank. There are no steps down into a flowing river here, and the flow is seasonal.",
        "In her own literature the Kaveri is Lopamudra, wife of the sage Agastya, released from his kamandalu to become the river. In Tamil country she is Ponni, and the delta she makes is most of what that name means to the people who farm it. She is not a southern version of a northern river, and we will not describe her as one.",
        "The day at this site is Tula Sankramana, when the sun enters Tula: at a moment fixed by the panchang the spring is held to well up in the tank, and those present take the theertha. For pitru karya on the Kaveri the recognised places are elsewhere — the sangama at Bhagamandala below the hill, Paschima Vahini at Srirangapatna where the river turns west, Talakadu, and the Srirangam stretch.",
      ],
      hi: [
        "तलकावेरी उद्गम स्थल है: कोडगु की ब्रह्मगिरि पहाड़ी पर एक छोटा-सा स्रोत-कुंड, जहाँ से कावेरी निकलकर कुछ दूर भूमिगत हो जाती हैं और नीचे फिर प्रकट होती हैं। यह किसी नदी-तट पर नहीं, एक मंदिर-परिसर के भीतर है। यहाँ बहती नदी में उतरने वाली कोई सीढ़ियाँ नहीं हैं, और जल-प्रवाह ऋतु पर निर्भर है।",
        "अपने साहित्य में कावेरी लोपामुद्रा हैं — ऋषि अगस्त्य की पत्नी, जो उनके कमंडलु से मुक्त होकर नदी बनीं। तमिल भूमि में वे पोन्नी हैं, और जो डेल्टा वे बनाती हैं, वहाँ खेती करने वालों के लिए उस नाम का अर्थ प्रायः वही है। वे किसी उत्तरी नदी का दक्षिणी रूप नहीं हैं, और हम उन्हें ऐसा कहेंगे भी नहीं।",
        "इस स्थान का दिन तुला संक्रमण है, जब सूर्य तुला राशि में प्रवेश करते हैं: पंचांग से निश्चित एक क्षण पर माना जाता है कि कुंड में स्रोत ऊपर उठ आता है, और उपस्थित जन तीर्थ ग्रहण करते हैं। कावेरी पर पितृ-कर्म के लिए मान्य स्थान अन्यत्र हैं — पहाड़ी के नीचे भागमंडल का संगम, श्रीरंगपट्टण का पश्चिम वाहिनी जहाँ नदी पश्चिम की ओर मुड़ती हैं, तलकाडु, और श्रीरंगम का प्रवाह-क्षेत्र।",
      ],
    },
    caution: {
      en: "Talakaveri is a temple tank at a river's source, not a bathing ghat. A pratinidhi snan of the kind performed at Har Ki Pauri or Ram Ghat cannot honestly be performed here. What can be offered at this site is a sankalp and a theertha archana at the kundike, and nothing beyond that. If what you want is a snan in the Kaveri, ask us for Paschima Vahini at Srirangapatna instead — we would rather send you to the right water than sell you the famous name.",
      hi: "तलकावेरी नदी के उद्गम पर बना मंदिर-कुंड है, स्नान घाट नहीं। हर की पौड़ी या रामघाट पर जिस प्रकार का प्रतिनिधि स्नान होता है, वह यहाँ ईमानदारी से नहीं किया जा सकता। इस स्थान पर जो अर्पित किया जा सकता है, वह है कुंड पर संकल्प और तीर्थ अर्चना — उससे आगे कुछ नहीं। यदि आपको कावेरी में स्नान ही चाहिए, तो हमसे श्रीरंगपट्टण के पश्चिम वाहिनी के लिए कहें — प्रसिद्ध नाम बेचने से बेहतर है कि हम आपको सही जल तक पहुँचाएँ।",
    },
    rites: [
      {
        key: "sankalp-kundike",
        name: { en: "Sankalp at the kundike", hi: "कुंड पर संकल्प" },
        note: {
          en: "Your name and gotra spoken at the source itself. No immersion, because there is nothing here to be immersed in.",
          hi: "उद्गम पर ही आपका नाम और गोत्र उच्चारित। कोई अवगाहन नहीं, क्योंकि यहाँ अवगाहन के योग्य कुछ है ही नहीं।",
        },
      },
      {
        key: "theertha-archana",
        name: { en: "Theertha archana", hi: "तीर्थ अर्चना" },
        note: {
          en: "Archana at the tank with the theertha taken from the spring. This is what the site is actually for.",
          hi: "कुंड पर अर्चना, स्रोत से लिए गए तीर्थ के साथ। यह स्थान वस्तुतः इसी के लिए है।",
        },
      },
      {
        key: "nadi-puja",
        name: { en: "Kaveri puja", hi: "कावेरी पूजा" },
        note: {
          en: "Offered at the source under her own names — Lopamudra, and Ponni.",
          hi: "उद्गम पर उनके अपने नामों से अर्पित — लोपामुद्रा, और पोन्नी।",
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
    /* PLACEHOLDER — the exact Karnataka authority is not yet confirmed by name. */
    authority: {
      en: "The Talakaveri kshetra is administered by a Karnataka state temple authority together with the local temple committee. We have not yet established which body would have to consent to a paid, filmed rite here, and we will name it on this page once we have.",
      hi: "तलकावेरी क्षेत्र का प्रबंधन कर्नाटक की एक राज्य-स्तरीय मंदिर संस्था तथा स्थानीय मंदिर समिति मिलकर करती हैं। यहाँ शुल्क लेकर किए जाने वाले, फ़िल्माए जाने वाले अनुष्ठान के लिए किसकी सहमति आवश्यक होगी, यह हमने अभी तय नहीं किया है — और जैसे ही तय होगा, उसका नाम इसी पृष्ठ पर लिखा जाएगा।",
    },
    permitStatus: "PLACEHOLDER",
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
   Page copy. Keyed by locale so a missing Hindi string is a type error.
   --------------------------------------------------------------------------- */

type ChoosingRow = { key: string; label: string; body: string };

type RiversIndexCopy = {
  meta: { title: string; description: string };
  badge: string;
  eyebrow: string;
  title: string;
  lede: string;
  permission: { label: string; body: string };
  lead: { label: string; read: string };
  index: { label: string; title: string; lede: string; read: string };
  choosing: { eyebrow: string; title: string; lede: string; rows: ChoosingRow[] };
  honesty: {
    eyebrow: string;
    title: string;
    isLabel: string;
    isBody: string;
    isNotLabel: string;
    isNotBody: string;
  };
  closing: { title: string; lede: string; cta: string };
  formLabels: Record<WaterForm, string>;
  notAGhat: string;
};

export const riversIndexContent = {
  en: {
    meta: {
      title: "Sacred waters — six rivers, six ghats | Snanify",
      description:
        "The six waters at which a snan may be offered: Ganga at Har Ki Pauri, the Sangam at Prayagraj, Yamuna at Vishram Ghat, Godavari at Ram Kund, Shipra at Ram Ghat, and the Kaveri at her source. Described plainly, including what cannot be done at each.",
    },
    badge: "Six waters · six ghats",
    eyebrow: "Sacred waters",
    title: "Six waters, and the ghats that keep them.",
    lede: "A snan is performed where the water actually runs — at a named ghat, at a stated hour, by a ritvik standing in it. These are the six, described as plainly as we can manage, including the places where the plain description is inconvenient for us.",
    permission: {
      label: "Before you read further",
      body: "We do not yet hold written permission to perform or film a paid rite at any of these six places. Most of them are held by trusts, samitis and hereditary purohit families whose consent is a separate matter from a municipal one. Every page below states its own position, and will keep stating it until it changes.",
    },
    lead: { label: "The first water", read: "Read this water" },
    index: {
      label: "The other five",
      title: "Five more, each with its own difficulty.",
      lede: "They are not interchangeable. One is a confluence reached by boat, one is a town's ghat of rest, one is where a city gives its dead to the water, one stands under the city of Mahakal, and one is not a ghat at all.",
      read: "Read",
    },
    choosing: {
      eyebrow: "Choosing",
      title: "Which water, and why.",
      lede: "There is no better and worse water here. There are waters a particular rite belongs to, and we would rather tell you which than sell you whichever name you already know.",
      rows: [
        {
          key: "first",
          label: "For a first snan",
          body: "Ganga at Har Ki Pauri, or Shipra at Ram Ghat. Both are working bathing ghats with a daily evening aarti, both have long steps that hold water through most of the year, and both are used to people who have come from a long way off.",
        },
        {
          key: "pitru",
          label: "For remembrance and pitru karya",
          body: "Godavari at Ram Kund, or the Sangam at Prayagraj. Ram Kund is Nashik's asthi visarjan tirth and is a place of shraddha before it is anything else. At Prayagraj, pind daan is conducted through the Prayagwal purohits, who hold that right by descent. Eligibility for these rites varies by community — ask your family purohit before you ask us.",
        },
        {
          key: "bhakti",
          label: "For Braj, and for bhakti",
          body: "Yamuna at Vishram Ghat. In the Braj tradition the Yamuna is approached as someone loved rather than as a purifier, and that changes the words that are said. Read the page for the water's condition before you choose it.",
        },
        {
          key: "source",
          label: "For the source itself",
          body: "Talakaveri. It is not a ghat — it is the spring the Kaveri rises from, inside a temple tank on Brahmagiri. Only a sankalp and a theertha archana can honestly be performed there. If you want a snan in the Kaveri, the page names the places that are right for it instead.",
        },
      ],
    },
    honesty: {
      eyebrow: "Plainly",
      title: "What is performed at these waters.",
      isLabel: "This is",
      isBody:
        "A sankalp and an archana recited at the water in your name and your gotra by a ritvik, followed — where the site allows it — by a pratinidhi snan, the ritvik entering the water as your representative. This is an ordinary thing. It is done every day at every ghat for a yajaman who cannot stand there in person. It is streamed as it happens and it is recorded.",
      isNotLabel: "This is not",
      isNotBody:
        "A substitute for bathing in the river yourself. No one can take your dip for you and we will not say otherwise. It is not a claim about your health, your fortune, your examinations or any other outcome, and no page here will ever make one. And nothing is posted to you — no prasad, no bottled jal, no thread in an envelope.",
    },
    closing: {
      title: "Read a water before you choose one.",
      lede: "Each page says what is performed there, what is not, who controls the ghat, and what we do not yet have permission to do.",
      cta: "Begin your snan",
    },
    formLabels: {
      "flowing-ghat": "A working bathing ghat",
      confluence: "A confluence, reached by boat",
      "temple-tank": "A temple tank at the river's source",
    },
    notAGhat: "Not a ghat",
  },

  hi: {
    meta: {
      title: "पवित्र जल — छह नदियाँ, छह घाट | स्नानिफ़ाई",
      description:
        "वे छह जल जहाँ स्नान अर्पित किया जा सकता है: हर की पौड़ी पर गंगा, प्रयागराज का संगम, विश्राम घाट पर यमुना, रामकुंड पर गोदावरी, रामघाट पर शिप्रा, और अपने उद्गम पर कावेरी। स्पष्ट वर्णन — यह भी कि कहाँ क्या नहीं हो सकता।",
    },
    badge: "छह जल · छह घाट",
    eyebrow: "पवित्र जल",
    title: "छह जल, और उन्हें संभालने वाले घाट।",
    lede: "स्नान वहीं संपन्न होता है जहाँ जल वास्तव में बहता है — किसी नामित घाट पर, निश्चित घड़ी में, उसमें खड़े ऋत्विक के द्वारा। ये वही छह हैं, यथासंभव स्पष्ट रूप में — उन बातों सहित जहाँ स्पष्ट कहना हमारे लिए असुविधाजनक है।",
    permission: {
      label: "आगे पढ़ने से पहले",
      body: "इन छह में से किसी भी स्थान पर शुल्क लेकर अनुष्ठान करने या उसका फ़िल्मांकन करने की लिखित अनुमति अभी हमारे पास नहीं है। इनमें से अधिकांश न्यासों, समितियों और परंपरागत पुरोहित परिवारों के अधिकार में हैं, जिनकी सहमति नगरपालिका की सहमति से अलग बात है। नीचे प्रत्येक पृष्ठ अपनी स्थिति स्वयं बताता है, और जब तक वह नहीं बदलती, बताता रहेगा।",
    },
    lead: { label: "प्रथम जल", read: "यह जल पढ़ें" },
    index: {
      label: "शेष पाँच",
      title: "पाँच और, हर एक की अपनी कठिनाई।",
      lede: "ये आपस में बदले नहीं जा सकते। एक संगम है जहाँ नाव से पहुँचा जाता है, एक नगर का विश्राम-घाट है, एक वह स्थान है जहाँ नगर अपने दिवंगतों को जल सौंपता है, एक महाकाल की नगरी के नीचे बहता है, और एक घाट है ही नहीं।",
      read: "पढ़ें",
    },
    choosing: {
      eyebrow: "चयन",
      title: "कौन-सा जल, और क्यों।",
      lede: "यहाँ कोई जल श्रेष्ठ या हीन नहीं है। कुछ अनुष्ठान कुछ विशेष जलों के हैं — और जो नाम आप पहले से जानते हैं वही बेच देने के बजाय हम आपको यह बताना उचित समझते हैं कि कौन-सा किसका है।",
      rows: [
        {
          key: "first",
          label: "पहले स्नान के लिए",
          body: "हर की पौड़ी पर गंगा, अथवा रामघाट पर शिप्रा। दोनों प्रयोग में रहने वाले स्नान घाट हैं जहाँ प्रतिदिन संध्या आरती होती है, दोनों की सीढ़ियाँ लंबी हैं और वर्ष के अधिकांश समय जल में रहती हैं, और दोनों दूर से आए लोगों के अभ्यस्त हैं।",
        },
        {
          key: "pitru",
          label: "स्मरण और पितृ-कर्म के लिए",
          body: "रामकुंड पर गोदावरी, अथवा प्रयागराज का संगम। रामकुंड नासिक का अस्थि-विसर्जन तीर्थ है और सबसे पहले श्राद्ध का स्थान है। प्रयागराज में पिंडदान प्रयागवाल पुरोहितों के माध्यम से होता है, जिन्हें यह अधिकार वंश-परंपरा से प्राप्त है। इन कर्मों का अधिकार समुदाय के अनुसार भिन्न होता है — हमसे पूछने से पहले अपने कुल-पुरोहित से पूछें।",
        },
        {
          key: "bhakti",
          label: "ब्रज और भक्ति के लिए",
          body: "विश्राम घाट पर यमुना। ब्रज की परंपरा में यमुना को शोधिका नहीं, प्रियजन मानकर पुकारा जाता है — और इससे कहे जाने वाले शब्द बदल जाते हैं। चुनने से पहले जल की दशा के विषय में उस पृष्ठ को अवश्य पढ़ें।",
        },
        {
          key: "source",
          label: "उद्गम के लिए",
          body: "तलकावेरी। यह घाट नहीं है — यह वह स्रोत है जहाँ से कावेरी उठती हैं, ब्रह्मगिरि पर एक मंदिर-कुंड के भीतर। वहाँ ईमानदारी से केवल संकल्प और तीर्थ अर्चना ही की जा सकती है। यदि आप कावेरी में स्नान चाहते हैं, तो उस पृष्ठ पर उसके लिए उपयुक्त स्थानों के नाम दिए गए हैं।",
        },
      ],
    },
    honesty: {
      eyebrow: "स्पष्ट रूप से",
      title: "इन जलों पर क्या संपन्न होता है।",
      isLabel: "यह है",
      isBody:
        "जल के समीप ऋत्विक द्वारा आपके नाम और गोत्र से किया गया संकल्प और अर्चना, और — जहाँ स्थान इसकी अनुमति देता है — उसके बाद प्रतिनिधि स्नान, जिसमें ऋत्विक आपके प्रतिनिधि के रूप में जल में उतरते हैं। यह कोई असाधारण बात नहीं है। हर घाट पर प्रतिदिन ऐसे यजमान के लिए यही किया जाता है जो स्वयं वहाँ खड़ा नहीं हो सकता। यह जैसे-जैसे होता है वैसे-वैसे प्रसारित होता है, और रिकॉर्ड किया जाता है।",
      isNotLabel: "यह नहीं है",
      isNotBody:
        "यह आपके स्वयं नदी में स्नान करने का स्थान नहीं लेता। आपकी डुबकी कोई दूसरा नहीं लगा सकता, और हम इसके विपरीत कुछ नहीं कहेंगे। यह आपके आरोग्य, धन, परीक्षा या किसी भी फल के विषय में कोई दावा नहीं है, और यहाँ का कोई पृष्ठ कभी ऐसा दावा करेगा भी नहीं। और आपको डाक से कुछ नहीं भेजा जाता — न प्रसाद, न बोतल में जल, न लिफ़ाफ़े में मौली।",
    },
    closing: {
      title: "चुनने से पहले जल को पढ़ लें।",
      lede: "प्रत्येक पृष्ठ बताता है कि वहाँ क्या संपन्न होता है, क्या नहीं, घाट किसके अधिकार में है, और किन कार्यों की अनुमति अभी हमारे पास नहीं है।",
      cta: "स्नान आरंभ करें",
    },
    formLabels: {
      "flowing-ghat": "प्रयोग में रहने वाला स्नान घाट",
      confluence: "संगम, जहाँ नाव से पहुँचा जाता है",
      "temple-tank": "नदी के उद्गम पर मंदिर-कुंड",
    },
    notAGhat: "घाट नहीं",
  },
} satisfies Record<Lang, RiversIndexCopy>;

type RiteStep = { key: string; name: string; body: string };

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
  rite: {
    eyebrow: string;
    title: string;
    lede: string;
    steps: RiteStep[];
    audioNote: string;
    proxyNote: string;
    digital: string;
  };
  rites: { eyebrow: string; title: string; lede: string };
  occasions: {
    eyebrow: string;
    title: string;
    lede: string;
    provisional: string;
    reckoningLabel: string;
  };
  permission: {
    eyebrow: string;
    title: string;
    authorityLabel: string;
    statusLabel: string;
    status: Record<PermitStatus, string>;
    body: string;
    framing: string;
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
    rite: {
      eyebrow: "The rite",
      title: "What a snan here involves.",
      lede: "The order below is fixed and the same at every water we work at. What changes between them is what the site can honestly carry — which the section above says.",
      steps: [
        {
          key: "pravesh",
          name: "Pravesh",
          body: "The stream opens on the ghat itself. Ambient sound only — no music bed, no voiceover, no title card.",
        },
        {
          key: "achamana",
          name: "Aasan and achamana",
          body: "The ritvik seats himself and performs the self-purification that precedes any rite.",
        },
        {
          key: "sankalp",
          name: "Sankalp — the naming",
          body: "Place and time are stated, then your gotra and your name. This is the part the rite exists for.",
        },
        {
          key: "vandana",
          name: "Nadi vandana",
          body: "The river is invoked by her own name, in the form used at this site.",
        },
        {
          key: "snan",
          name: "Pratinidhi snan",
          body: "The ritvik enters the water and performs the snan as your representative — unedited, never sped up, never stock footage. Where a site cannot carry this, the page above says so.",
        },
        {
          key: "arghya",
          name: "Arghya",
          body: "Water is offered to the sun, or before sunrise to the direction of sunrise.",
        },
        {
          key: "kshama",
          name: "Kshama prarthana",
          body: "A closing petition for forgiveness of any error in performance.",
        },
        {
          key: "samapti",
          name: "Samapti",
          body: "The session identifier is spoken aloud on camera, so a recording can never be passed off as another day's.",
        },
      ],
      audioNote:
        "In a shared session only your name and your gotra are spoken aloud. Your own words stay in the sankalp — they are not read out, not captioned, and not carried in any preview image.",
      proxyNote:
        "This is a sankalp and, where the site allows it, a pratinidhi snan offered in your name. It is not a substitute for bathing in the river yourself, and we do not claim that it is.",
      digital:
        "Nothing is posted to you — no prasad, no bottled jal, no thread in an envelope. What you receive is a stream, a recording and a Sankalp Patra.",
    },
    rites: {
      eyebrow: "Rites",
      title: "What this water carries.",
      lede: "Not every rite belongs at every site. These are the ones that belong here.",
    },
    occasions: {
      eyebrow: "The calendar",
      title: "Days this ghat is known for.",
      lede: "Reckoned by tithi or by the sun, as noted. We publish no dates and no timings on this page, because we have not yet sourced a panchang we are willing to name.",
      provisional: "Timing to be confirmed against the panchang",
      reckoningLabel: "Reckoned as",
    },
    permission: {
      eyebrow: "Permission",
      title: "Who controls this ghat.",
      authorityLabel: "Governing authority",
      statusLabel: "Our permit status",
      /* PLACEHOLDER must not read as "we have it but haven't checked". It
         means we hold nothing, and the label has to say that. */
      status: {
        PLACEHOLDER: "None held",
        applied: "Applied for",
        granted: "Granted",
      },
      body: "We do not hold written permission to perform or film a paid rite at this ghat. Nothing has been agreed, nothing applied for, nothing granted — and this line stays on the page until that changes. Permission is not a formality at these places: the bodies that hold it are trusts, samitis and hereditary purohit families whose consent is a different thing from a municipal one.",
      framing:
        "Our framing rule, wherever we film: the camera stays on the ritvik, the offering and the water. No crowd pans, no filming of anyone else's rites, and the feed is cut rather than pointed at a family.",
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
    rite: {
      eyebrow: "अनुष्ठान",
      title: "यहाँ स्नान में क्या-क्या होता है।",
      lede: "नीचे दिया क्रम निश्चित है और हमारे सभी जलों पर एक-सा रहता है। बदलता केवल यह है कि कौन-सा स्थान ईमानदारी से क्या वहन कर सकता है — और वह ऊपर लिखा है।",
      steps: [
        {
          key: "pravesh",
          name: "प्रवेश",
          body: "प्रसारण घाट पर ही खुलता है। केवल परिवेश की ध्वनि — न कोई संगीत, न भाष्य, न कोई शीर्षक-पट्टी।",
        },
        {
          key: "achamana",
          name: "आसन एवं आचमन",
          body: "ऋत्विक आसन ग्रहण कर वह आत्मशुद्धि करते हैं जो किसी भी अनुष्ठान से पहले होती है।",
        },
        {
          key: "sankalp",
          name: "संकल्प — नाम-उच्चारण",
          body: "पहले देश और काल कहे जाते हैं, फिर आपका गोत्र और नाम। अनुष्ठान इसी अंश के लिए है।",
        },
        {
          key: "vandana",
          name: "नदी वंदना",
          body: "नदी का आवाहन उनके अपने नाम से किया जाता है, उसी रूप में जो उस स्थान पर प्रचलित है।",
        },
        {
          key: "snan",
          name: "प्रतिनिधि स्नान",
          body: "ऋत्विक जल में उतरकर आपके प्रतिनिधि के रूप में स्नान करते हैं — बिना काट-छाँट, बिना गति बढ़ाए, कोई पुराना दृश्य नहीं। जहाँ कोई स्थान इसे वहन नहीं कर सकता, वह ऊपर स्पष्ट लिखा है।",
        },
        {
          key: "arghya",
          name: "अर्घ्य",
          body: "सूर्य को जल अर्पित किया जाता है, अथवा सूर्योदय से पूर्व उदय की दिशा में।",
        },
        {
          key: "kshama",
          name: "क्षमा प्रार्थना",
          body: "विधि में रह गई किसी त्रुटि के लिए अंत में क्षमा-याचना।",
        },
        {
          key: "samapti",
          name: "समाप्ति",
          body: "सत्र की पहचान-संख्या कैमरे के सामने स्वर में बोली जाती है, ताकि कोई रिकॉर्डिंग किसी और दिन की बताकर न दी जा सके।",
        },
      ],
      audioNote:
        "सामूहिक सत्र में केवल आपका नाम और गोत्र स्वर में बोले जाते हैं। आपके अपने शब्द संकल्प में ही रहते हैं — वे न पढ़े जाते हैं, न उपशीर्षक में आते हैं, न किसी पूर्वावलोकन चित्र में।",
      proxyNote:
        "यह आपके नाम से अर्पित संकल्प है और, जहाँ स्थान अनुमति दे, प्रतिनिधि स्नान। यह आपके स्वयं नदी में स्नान करने का स्थान नहीं लेता, और हम ऐसा दावा भी नहीं करते।",
      digital:
        "आपको डाक से कुछ नहीं भेजा जाता — न प्रसाद, न बोतल में जल, न लिफ़ाफ़े में मौली। आपको मिलता है प्रसारण, रिकॉर्डिंग और संकल्प पत्र।",
    },
    rites: {
      eyebrow: "अनुष्ठान",
      title: "यह जल क्या-क्या वहन करता है।",
      lede: "हर अनुष्ठान हर स्थान का नहीं होता। ये वे हैं जो यहाँ के हैं।",
    },
    occasions: {
      eyebrow: "पंचांग",
      title: "जिन दिनों के लिए यह घाट जाना जाता है।",
      lede: "गणना तिथि से या सूर्य से — जैसा नीचे अंकित है। इस पृष्ठ पर हम कोई तिथि या समय प्रकाशित नहीं करते, क्योंकि अभी हमने कोई ऐसा पंचांग नहीं लिया है जिसका नाम हम बता सकें।",
      provisional: "समय पंचांग से पुष्ट किया जाना शेष",
      reckoningLabel: "गणना",
    },
    permission: {
      eyebrow: "अनुमति",
      title: "यह घाट किसके अधिकार में है।",
      authorityLabel: "अधिकारी संस्था",
      statusLabel: "हमारी अनुमति की स्थिति",
      status: {
        PLACEHOLDER: "कोई अनुमति नहीं",
        applied: "आवेदन किया गया",
        granted: "स्वीकृत",
      },
      body: "इस घाट पर शुल्क लेकर अनुष्ठान करने या उसका फ़िल्मांकन करने की लिखित अनुमति हमारे पास नहीं है। न कोई सहमति हुई है, न आवेदन, न स्वीकृति — और जब तक यह स्थिति नहीं बदलती, यह पंक्ति इसी पृष्ठ पर बनी रहेगी। इन स्थानों पर अनुमति औपचारिकता नहीं है: यह अधिकार न्यासों, समितियों और परंपरागत पुरोहित परिवारों के पास है, जिनकी सहमति नगरपालिका की सहमति से भिन्न वस्तु है।",
      framing:
        "जहाँ भी हम फ़िल्मांकन करते हैं, हमारा नियम यह है: कैमरा ऋत्विक, अर्पण और जल पर ही रहेगा। भीड़ पर कोई पैन नहीं, किसी और के कर्म का कोई चित्रांकन नहीं — और आवश्यकता पड़ने पर कैमरा किसी परिवार की ओर मोड़ने के बजाय प्रसारण बंद कर दिया जाएगा।",
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
