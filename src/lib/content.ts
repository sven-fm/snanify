export type Lang = "en" | "hi";

export const LANGS: Lang[] = ["en", "hi"];

export type Content = (typeof content)["en"];

export const content = {
  en: {
    htmlLang: "en",
    dir: "ltr" as const,
    meta: {
      title: "Snanify, the river comes to you",
      description:
        "A complete digital snan. Your name, your gotra, your sankalp, offered at India's most sacred waters and streamed to wherever you stand.",
    },
    switchLabel: "हिंदी",
    switchHref: "/hi",
    themeLabel: "Change theme",
    nav: {
      how: "How it works",
      rivers: "Sacred waters",
      muhurat: "Muhurat",
      pricing: "Sankalp",
      cta: "Begin your snan",
      menu: "Menu",
    },
    hero: {
      badge: "Live now · Har Ki Pauri, Haridwar",
      titleA: "The river",
      titleB: "comes to you.",
      lede: "A complete digital snan. Your name, your gotra, your sankalp, carried into a rite performed at India's most sacred waters, and streamed to wherever you stand.",
      ctaPrimary: "Begin your snan",
      ctaSecondary: "How it works",
      offer:
        "A Deep Daan is $11. A named sankalp in a shared session is $51. A rite held for your household alone is $251. The India rate is printed beside every one of them.",
      card: {
        label: "Next muhurat",
        title: "Brahma Muhurat",
        meta: "04:24 IST · Ganga, Haridwar",
        countdown: "opens in 6h 12m",
      },
      stats: [
        { n: "1,20,000+", l: "Sankalps offered" },
        { n: "6", l: "Sacred waters" },
        { n: "48", l: "Countries served" },
      ],
    },
    rivers: {
      eyebrow: "Sacred waters",
      title: "Six waters. One sankalp.",
      lede: "Every rite is performed at the ghat itself, in your name and gotra, and recorded as it happens. Nothing is posted to you.",
    },
    how: {
      eyebrow: "How it works",
      title: "Three steps. No airport.",
      steps: [
        {
          n: "01",
          t: "Take sankalp",
          d: "Enter your name, your gotra, and the intention you carry. Add family, and ancestors, if you wish.",
        },
        {
          n: "02",
          t: "Choose your muhurat",
          d: "Pick a water and an occasion. Windows are shown provisionally, in IST and in your own timezone, until a panchang source is confirmed.",
        },
        {
          n: "03",
          t: "The rite is performed",
          d: "Your name and gotra are spoken aloud at the ghat. The recording is timestamped to the moment, and your Sankalp Patra follows.",
        },
      ],
    },
    muhurat: {
      eyebrow: "The calendar",
      title: "Days the water listens.",
      lede: "Auspicious occasions open months ahead. Exact timings follow the panchang and are confirmed when booking opens.",
    },
    /* ------------------------------------------------------------------ ####
       PRICING. Every figure below is a PLACEHOLDER pending real operational
       costing (officiant rates, ghat and samiti permissions, streaming,
       storage, payment and refund reserve). The UI presents them as ordinary
       prices because a provisional-price disclaimer on a tariff reads as a
       hedge; the provisional status is stated on /rituals instead.

       Where the numbers come from, so the next person does not have to guess:

       · Ekal moves $11 -> $51. docs/product/economics.md argues $21 on Sri
         Mandir's ~$81 diaspora ARPU; its own adversarial review then kills
         that evidence as a category error (annual accumulated ARPU is not a
         first-purchase price). docs/product/market.md argues $51, and its
         reviewer's counter (the $50-120 band is built on dosha-remedy SKUs
         carrying a fear premium Snanify has forfeited) does not touch the two
         non-remedial comparables: digitalsnan.com at $51 standard, and
         Trimbakeshwar samuhik / Shri Ganga Sabha online sankalp at
         Rs 1,100-2,100. The argument both reviewers accept is the officiant
         floor: pay is max(Rs 1,800, 20% of segment gross) PER SEGMENT, so a
         segment must gross ~Rs 2,750 before it clears floor, camera and
         stream. At $21 that needs 2 to 3 sankalps in a segment; at $51 a
         single sankalp clears it. Year one runs on near-empty segments, so
         the price has to carry the floor alone.
       · Deep Daan stays $11. It is the honest entry and the gift SKU, and it
         is a genuinely shorter rite, so a cheap price point survives without
         underpricing a 45-second sankalp recitation.
       · Parivar $151: six names are six of the eleven places in a segment.
         Priced as a household at ~$25 a name, not as one sankalp.
       · Ekantik $251: a dedicated private session. Market band for a private
         remote rite is $150-300.
       · Snan Kosh replaces the Varsh 12-snan entitlement. Credit that refunds
         itself at expiry, because an entitlement nobody can spend is a
         liability we would quietly hope goes unused.
       · Bharat Dar numbers are dakshina-ladder shagun figures, not conversions
         of the dollar price. Never frame them as a discount.

       SESSION MECHANIC. trust.ts publishes >=45 seconds of recitation per
       named sankalp and at most 11 sankalps per segment. 51 x 45s = 38 min of
       recitation; 5 segments x ~3 min of slate, dip and closing = ~15 min;
       total ~53 min. Brahma Muhurat is 48 minutes. The cap is kept at 51 and
       the window is stated honestly instead: a full session opens in Brahma
       Muhurat and finishes about five minutes into Pratah Sandhya. Every
       number in this block agrees with that, and so does src/content/rituals.ts,
       which now derives the same cap from the same 45-second floor. If that
       floor ever changes, it has to change in trust.ts, rituals.ts and here in
       the same commit, or the three pages start contradicting each other in
       production.
       -------------------------------------------------------------------- */
    pricing: {
      eyebrow: "Sankalp",
      title: "Shared, or yours alone.",
      lede: "One thing decides what a rite costs here: whether your sankalp sits inside a session shared with other households, or the session belongs to you by yourself. Everything below follows from that. Both price ladders are printed in full, and no price changes because of who you appear to be.",
      cta: "See the full tariff",
      modes: {
        eyebrow: "The two ways a rite is held",
        items: [
          {
            name: "Samuhik",
            alt: "सामूहिक",
            sub: "Held together",
            body: "One officiant, one window, several households, the way a ghat has always worked at dawn. Your name and your gotra are spoken on their own, for their own time, and then the next family's are. Nobody is read as part of a list.",
            rows: [
              { k: "In your segment", v: "At most eleven sankalps" },
              { k: "In a full session", v: "Up to fifty-one, in five segments" },
              { k: "Spoken for you", v: "At least forty-five seconds" },
              { k: "Your recording", v: "Your own excerpt, your names and no one else's" },
            ],
          },
          {
            name: "Ekantik",
            alt: "निजी अनुष्ठान",
            sub: "Held alone",
            body: "That morning the officiant, the window and the ghat carry one sankalp, and it is yours. Nothing is batched. No other household's name is spoken in your session, so none of it reaches what you are sent.",
            rows: [
              { k: "In your segment", v: "One sankalp, yours" },
              { k: "In a full session", v: "The same one" },
              { k: "Spoken for you", v: "The length of the vidhi, not a place inside it" },
              { k: "Your recording", v: "The whole session, unedited" },
            ],
          },
        ],
      },
      session: {
        label: "What a full session takes",
        body: [
          "Fifty-one sankalps at forty-five seconds each is thirty-eight minutes of recitation. Five segments, each with its slate, its dip and its closing, add about fifteen more. A full session runs close to fifty-three minutes.",
          "Brahma Muhurat is forty-eight minutes long. A full session does not fit inside it, and we will not read faster to make it fit. So a full session opens in Brahma Muhurat and finishes about five minutes into Pratah Sandhya. A session that is not full ends sooner. Your recording carries the second your own name was spoken, so you never have to take our word for where in the hour you were.",
        ],
      },
      tariff: {
        label: "The tariff",
        caption: "Both ladders, printed together.",
        heads: {
          rite: "Rite",
          vessel: "How it is held",
          world: "Vishwa Dar",
          india: "Bharat Dar",
        },
        subheads: {
          world: "Paid with a card issued outside India",
          india: "Paid with an Indian card or a UPI address",
        },
        anywhere: "Any of these",
        rows: [
          {
            name: "Deep Daan",
            alt: "दीप दान",
            vessel: "Samuhik",
            world: "$11",
            india: "₹101",
            what: "A lamp lit at the ghat in your name, spoken over once, and set on the water. The shortest complete rite we perform, and the one most often sent as a gift.",
          },
          {
            name: "Ekal Snan",
            alt: "एकल स्नान",
            vessel: "Samuhik",
            world: "$51",
            india: "₹501",
            what: "One sankalp. Your name, your gotra and your intention, recited for at least forty-five seconds, in a segment of no more than eleven.",
          },
          {
            name: "Parivar",
            alt: "परिवार",
            vessel: "Samuhik",
            world: "$151",
            india: "₹1,100",
            what: "Up to six names under one gotra, each spoken separately. Six names take six of the eleven places in the segment, which is why a household is priced as a household.",
          },
          {
            name: "Ekantik Snan",
            alt: "एकांतिक स्नान",
            vessel: "Ekantik",
            world: "$251",
            india: "₹5,100",
            what: "The session carries your sankalp and no other. One household, one segment, and a recording with nobody else's family in it.",
          },
          {
            name: "Snan Kosh",
            alt: "स्नान कोष",
            vessel: "Any of these",
            world: "$108 → $130",
            india: "₹2,100 → ₹2,500",
            what: "Rite credit, not a rite. Twenty-four months to spend it, and the unused balance is returned on the last day without being asked for.",
          },
        ],
      },
      ladders: {
        label: "Why there are two prices",
        body: [
          "The morning costs the same to perform whether the family is in Ujjain or in New Jersey. The price is not the cost. Five hundred rupees is a considered amount in one place and lunch in the other, and a single number would shut one of them out.",
          "So there are two ladders and both are above. Which one you are charged is decided by the instrument you pay with. An Indian card or a UPI address is charged the Bharat Dar, wherever in the world you are standing that morning. We do not read your location, we do not infer it from your name or your address, and the price you were shown before you entered any payment detail is the price you are charged.",
          "That is the whole policy. There is no third price, no code to ask for, and nothing to negotiate.",
        ],
      },
      kosh: {
        label: "Snan Kosh",
        title: "A balance we owe you, not twelve snans you have to take.",
        body: "One hundred and eight dollars buys one hundred and thirty dollars of rite credit, and two thousand one hundred rupees buys two thousand five hundred. Spend it on anything above, in any order, at any ghat, across twenty-four months. Whatever is left on the last day goes back to the card that paid, by itself, with no request and no form. An entitlement you cannot use is something we owe you and quietly hope you forget. A balance that returns itself is not.",
        rows: [
          { k: "You pay", v: "$108 · ₹2,100" },
          { k: "You hold", v: "$130 · ₹2,500 of rite credit" },
          { k: "Good for", v: "Twenty-four months from purchase" },
          { k: "On the last day", v: "The unused balance is refunded, unasked" },
        ],
      },
      note: "Each rite segment pays its officiant the greater of ₹1,800 or a fifth of what that segment earns. His share is a share, not a fee, so these prices raise it with them. Prices are shown before any tax charged where you live.",
    },
    notFound: {
      code: "404",
      title: "This path does not reach the water.",
      lede: "The page you were looking for is not here. The river, however, is exactly where it has always been.",
      cta: "Return home",
    },
    closing: {
      title: "Wherever you stand, the water is already there.",
      lede: "Ten thousand kilometres is not a distance the Ganga recognises.",
      cta: "Begin your snan",
    },
    footer: {
      tagline: "A digital snan for Indians everywhere.",
      cols: [
        { h: "Service", links: ["Sacred waters", "Muhurat calendar", "Our priests", "Sankalp Patra"] },
        { h: "Company", links: ["About", "Ethics & rites", "Press", "Contact"] },
        { h: "Legal", links: ["Privacy", "Terms", "Refunds"] },
      ],
      made: "Made with reverence · Prayagraj & Berlin",
      rights: "© 2026 Snanify",
    },
  },

  hi: {
    htmlLang: "hi",
    dir: "ltr" as const,
    meta: {
      title: "स्नानिफ़ाई, नदी आप तक आती है",
      description:
        "संपूर्ण डिजिटल स्नान। आपका नाम, आपका गोत्र, आपका संकल्प, भारत के पवित्रतम जल में अर्पित, और आप जहाँ भी हों वहीं सजीव प्रसारित।",
    },
    switchLabel: "English",
    switchHref: "/",
    themeLabel: "थीम बदलें",
    nav: {
      how: "कैसे काम करता है",
      rivers: "पवित्र जल",
      muhurat: "मुहूर्त",
      pricing: "संकल्प",
      cta: "स्नान आरंभ करें",
      menu: "मेन्यू",
    },
    hero: {
      badge: "अभी सजीव · हर की पौड़ी, हरिद्वार",
      titleA: "नदी",
      titleB: "आप तक आती है।",
      lede: "संपूर्ण डिजिटल स्नान। आपका नाम, आपका गोत्र, आपका संकल्प, भारत के पवित्रतम जल में संपन्न अनुष्ठान में अर्पित, और आप जहाँ भी हों वहीं सजीव प्रसारित।",
      ctaPrimary: "स्नान आरंभ करें",
      ctaSecondary: "कैसे काम करता है",
      offer:
        "दीप दान $11। साझा सत्र में नामित संकल्प $51। केवल आपके घर के लिए किया गया अनुष्ठान $251। हर एक के साथ भारत दर भी छपी है।",
      card: {
        label: "अगला मुहूर्त",
        title: "ब्रह्म मुहूर्त",
        meta: "04:24 IST · गंगा, हरिद्वार",
        countdown: "6 घंटे 12 मिनट में",
      },
      stats: [
        { n: "1,20,000+", l: "संकल्प अर्पित" },
        { n: "6", l: "पवित्र जल" },
        { n: "48", l: "देशों में सेवा" },
      ],
    },
    rivers: {
      eyebrow: "पवित्र जल",
      title: "छह जल। एक संकल्प।",
      lede: "हर अनुष्ठान घाट पर ही, आपके नाम और गोत्र से संपन्न होता है, और उसी समय रिकॉर्ड किया जाता है। आपको डाक से कुछ नहीं भेजा जाता।",
    },
    how: {
      eyebrow: "कैसे काम करता है",
      title: "तीन चरण। कोई हवाई अड्डा नहीं।",
      steps: [
        {
          n: "०१",
          t: "संकल्प लें",
          d: "अपना नाम, गोत्र और अपनी मनोकामना दर्ज करें। चाहें तो परिवार और पूर्वजों को भी जोड़ें।",
        },
        {
          n: "०२",
          t: "मुहूर्त चुनें",
          d: "जल और पर्व चुनें। समय अभी अस्थायी रूप से, IST और आपके समयक्षेत्र दोनों में, दिखाया जाता है, पंचांग स्रोत पुष्ट होने तक।",
        },
        {
          n: "०३",
          t: "अनुष्ठान संपन्न होता है",
          d: "घाट पर आपका नाम और गोत्र स्वर में पढ़ा जाता है। रिकॉर्डिंग उसी क्षण से समयांकित होती है, और संकल्प पत्र उसके बाद आता है।",
        },
      ],
    },
    muhurat: {
      eyebrow: "पंचांग",
      title: "जिन दिनों जल सुनता है।",
      lede: "शुभ पर्व महीनों पहले खुलते हैं। सटीक समय पंचांग के अनुसार, बुकिंग खुलते समय पुष्ट किया जाता है।",
    },
    /* Hindi edition of the tariff. The reasoning, the placeholder status and
       the session arithmetic are documented once, on the English block above. */
    pricing: {
      eyebrow: "संकल्प",
      title: "सामूहिक, या केवल आपका।",
      lede: "यहाँ मूल्य केवल एक बात से तय होता है: आपका संकल्प दूसरे परिवारों के साथ साझा सत्र में रखा जाए, या पूरा सत्र केवल आपका हो। नीचे सब कुछ इसी से निकलता है। दोनों मूल्य-सूचियाँ यहाँ पूरी छपी हैं, और कोई मूल्य इस आधार पर नहीं बदलता कि आप कौन जान पड़ते हैं।",
      cta: "पूरी दर-सूची देखें",
      modes: {
        eyebrow: "अनुष्ठान दो रूपों में होता है",
        items: [
          {
            name: "सामूहिक",
            alt: "Samuhik",
            sub: "साथ मिलकर",
            body: "एक ऋत्विक, एक मुहूर्त, कई परिवार, जैसे भोर में घाट सदा से चलता आया है। आपका नाम और आपका गोत्र अलग से, अपने पूरे समय के साथ बोले जाते हैं, फिर अगले परिवार का। किसी को सूची की तरह नहीं पढ़ा जाता।",
            rows: [
              { k: "आपके खंड में", v: "अधिकतम ग्यारह संकल्प" },
              { k: "पूरे सत्र में", v: "इक्यावन तक, पाँच खंडों में" },
              { k: "आपके लिए वाचन", v: "कम से कम पैंतालीस सेकंड" },
              { k: "आपकी रिकॉर्डिंग", v: "आपका अपना अंश, केवल आपके नाम" },
            ],
          },
          {
            name: "एकांतिक",
            alt: "Ekantik",
            sub: "केवल आपके लिए",
            body: "उस भोर ऋत्विक, मुहूर्त और घाट केवल एक संकल्प वहन करते हैं, और वह आपका है। कुछ भी समूह में नहीं जोड़ा जाता। आपके सत्र में किसी दूसरे परिवार का नाम नहीं लिया जाता, इसलिए जो आपको मिलता है उसमें भी नहीं आता।",
            rows: [
              { k: "आपके खंड में", v: "एक संकल्प, आपका" },
              { k: "पूरे सत्र में", v: "वही एक" },
              { k: "आपके लिए वाचन", v: "पूरी विधि जितना, उसमें एक स्थान जितना नहीं" },
              { k: "आपकी रिकॉर्डिंग", v: "पूरा सत्र, बिना काट-छाँट" },
            ],
          },
        ],
      },
      session: {
        label: "पूरा सत्र कितना समय लेता है",
        body: [
          "इक्यावन संकल्प, हर एक पैंतालीस सेकंड, अर्थात अड़तीस मिनट का वाचन। पाँच खंड, और हर खंड का स्लेट, डुबकी तथा समापन, लगभग पंद्रह मिनट और। पूरा सत्र तिरपन मिनट के आसपास चलता है।",
          "ब्रह्म मुहूर्त अड़तालीस मिनट का होता है। पूरा सत्र उसमें नहीं समाता, और समाने के लिए हम तेज़ नहीं पढ़ेंगे। इसलिए पूरा सत्र ब्रह्म मुहूर्त में आरंभ होता है और प्रातः संध्या में लगभग पाँच मिनट जाकर पूरा होता है। जो सत्र भरा नहीं होता, वह पहले समाप्त हो जाता है। आपकी रिकॉर्डिंग में वह क्षण अंकित रहता है जब आपका नाम बोला गया, इसलिए हमारी बात पर भरोसा करने की आवश्यकता नहीं।",
        ],
      },
      tariff: {
        label: "दर-सूची",
        caption: "दोनों सूचियाँ, साथ-साथ छपी हुईं।",
        heads: {
          rite: "अनुष्ठान",
          vessel: "किस रूप में",
          world: "विश्व दर",
          india: "भारत दर",
        },
        subheads: {
          world: "भारत के बाहर जारी कार्ड से भुगतान",
          india: "भारतीय कार्ड या UPI पते से भुगतान",
        },
        anywhere: "इनमें से कोई भी",
        rows: [
          {
            name: "दीप दान",
            alt: "Deep Daan",
            vessel: "सामूहिक",
            world: "$11",
            india: "₹101",
            what: "घाट पर आपके नाम से दीप जलाया जाता है, नाम एक बार बोला जाता है, और दीप जल पर रख दिया जाता है। हमारा सबसे छोटा पूर्ण अनुष्ठान, और सबसे अधिक उपहार में भेजा जाने वाला।",
          },
          {
            name: "एकल स्नान",
            alt: "Ekal Snan",
            vessel: "सामूहिक",
            world: "$51",
            india: "₹501",
            what: "एक संकल्प। आपका नाम, आपका गोत्र और आपकी मनोकामना, कम से कम पैंतालीस सेकंड, अधिकतम ग्यारह संकल्पों वाले खंड में।",
          },
          {
            name: "परिवार",
            alt: "Parivar",
            vessel: "सामूहिक",
            world: "$151",
            india: "₹1,100",
            what: "एक गोत्र के अंतर्गत छह नाम तक, हर नाम अलग से। छह नाम खंड के ग्यारह स्थानों में से छह लेते हैं, इसीलिए मूल्य एक नाम का नहीं, पूरे घर का है।",
          },
          {
            name: "एकांतिक स्नान",
            alt: "Ekantik Snan",
            vessel: "एकांतिक",
            world: "$251",
            india: "₹5,100",
            what: "सत्र में केवल आपका संकल्प रहता है। एक परिवार, एक खंड, और ऐसी रिकॉर्डिंग जिसमें किसी और का परिवार नहीं।",
          },
          {
            name: "स्नान कोष",
            alt: "Snan Kosh",
            vessel: "इनमें से कोई भी",
            world: "$108 → $130",
            india: "₹2,100 → ₹2,500",
            what: "अनुष्ठान नहीं, अनुष्ठान का जमा। खर्च करने के लिए चौबीस महीने, और अंतिम दिन बची राशि बिना माँगे लौटा दी जाती है।",
          },
        ],
      },
      ladders: {
        label: "दो मूल्य क्यों हैं",
        body: [
          "वह भोर करने में उतना ही लगता है, चाहे परिवार उज्जैन में हो या न्यू जर्सी में। मूल्य लागत नहीं है। पाँच सौ रुपये एक जगह सोच-समझकर दी जाने वाली राशि है और दूसरी जगह दोपहर का भोजन, और एक ही अंक रखने पर इनमें से एक के लिए द्वार बंद हो जाता।",
          "इसलिए दो सूचियाँ हैं और दोनों ऊपर छपी हैं। आपसे कौन सी ली जाएगी, यह भुगतान के माध्यम से तय होता है। भारतीय कार्ड या UPI पते से भुगतान पर भारत दर लगती है, उस सुबह आप संसार में कहीं भी खड़े हों। हम आपका स्थान नहीं पढ़ते, आपके नाम या पते से अनुमान नहीं लगाते, और भुगतान का विवरण भरने से पहले जो मूल्य आपको दिखाया गया, वही लिया जाता है।",
          "यही पूरी नीति है। न कोई तीसरा मूल्य, न माँगने पर मिलने वाला कोड, न मोल-भाव।",
        ],
      },
      kosh: {
        label: "स्नान कोष",
        title: "बारह स्नान नहीं जो आपको लेने ही पड़ें, बल्कि एक जमा जो हम पर बकाया रहती है।",
        body: "एक सौ आठ डॉलर से एक सौ तीस डॉलर का अनुष्ठान-जमा मिलता है, और इक्कीस सौ रुपये से पच्चीस सौ का। ऊपर दिए किसी भी अनुष्ठान पर, जिस क्रम में चाहें, जिस घाट पर चाहें, चौबीस महीनों के भीतर इसका उपयोग करें। अंतिम दिन जो शेष रहेगा वह उसी कार्ड पर स्वयं लौट जाएगा, बिना अनुरोध और बिना किसी प्रपत्र के। जिस अधिकार का उपयोग आप न कर सकें, वह हम पर बकाया रहता है और हम चाहेंगे कि आप उसे भूल जाएँ। स्वयं लौट आने वाली जमा ऐसी नहीं है।",
        rows: [
          { k: "आप देते हैं", v: "$108 · ₹2,100" },
          { k: "आपके पास रहता है", v: "$130 · ₹2,500 का अनुष्ठान-जमा" },
          { k: "अवधि", v: "खरीद से चौबीस महीने" },
          { k: "अंतिम दिन", v: "बची हुई राशि बिना माँगे वापस" },
        ],
      },
      note: "हर अनुष्ठान-खंड के लिए ऋत्विक को ₹1,800 या उस खंड की आय का पाँचवाँ भाग, इनमें से जो अधिक हो, मिलता है। उनका हिस्सा प्रतिशत में है, नियत शुल्क नहीं, इसलिए ये मूल्य बढ़ने से उनका हिस्सा भी बढ़ता है। मूल्य आपके देश में लगने वाले कर से पहले के हैं।",
    },
    notFound: {
      code: "404",
      title: "यह मार्ग जल तक नहीं पहुँचता।",
      lede: "जिस पृष्ठ की आप खोज कर रहे थे, वह यहाँ नहीं है। नदी, किंतु, वहीं है जहाँ सदा से थी।",
      cta: "मुखपृष्ठ पर लौटें",
    },
    closing: {
      title: "आप जहाँ भी हों, जल वहीं है।",
      lede: "दस हज़ार किलोमीटर, गंगा इसे दूरी नहीं मानती।",
      cta: "स्नान आरंभ करें",
    },
    footer: {
      tagline: "विश्वभर के भारतीयों के लिए डिजिटल स्नान।",
      cols: [
        { h: "सेवा", links: ["पवित्र जल", "मुहूर्त पंचांग", "हमारे पुरोहित", "संकल्प पत्र"] },
        { h: "कंपनी", links: ["परिचय", "नीति एवं विधि", "प्रेस", "संपर्क"] },
        { h: "कानूनी", links: ["गोपनीयता", "शर्तें", "वापसी"] },
      ],
      made: "श्रद्धा के साथ निर्मित · प्रयागराज एवं बर्लिन",
      rights: "© 2026 स्नानिफ़ाई",
    },
  },
} satisfies Record<Lang, unknown>;
