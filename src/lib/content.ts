export type Lang = "en" | "hi";

export const LANGS: Lang[] = ["en", "hi"];

export type Content = (typeof content)["en"];

export const content = {
  en: {
    htmlLang: "en",
    dir: "ltr" as const,
    meta: {
      title: "Snanify — the river comes to you",
      description:
        "A complete digital snan. Your name, your gotra, your sankalp — offered at India's most sacred waters and streamed to wherever you stand.",
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
      badge: "Six ghats · six sacred waters",
      titleA: "The river",
      titleB: "comes to you.",
      lede: "A complete digital snan. Your name, your gotra, your sankalp — carried into a rite performed at India's most sacred waters, and streamed to wherever you stand.",
      ctaPrimary: "Begin your snan",
      ctaSecondary: "Watch a snan",
      card: {
        label: "The dawn window",
        title: "Brahma Muhurat",
        meta: "Ganga · Har Ki Pauri, Haridwar",
        countdown: "Timings published with each occasion",
      },
      stats: [
        { n: "6", l: "Sacred waters" },
        { n: "At the ghat", l: "Every rite, in person" },
        { n: "Always", l: "Recorded and timestamped" },
      ],
    },
    rivers: {
      eyebrow: "Sacred waters",
      title: "Six rivers. One dip.",
      lede: "Every snan is performed at the ghat itself, at the hour the panchang appoints — never a stock video, never a re-run.",
      items: [
        { name: "Ganga", place: "Har Ki Pauri, Haridwar", note: "Moksha · the great purifier" },
        { name: "Triveni Sangam", place: "Prayagraj", note: "Where three waters meet" },
        { name: "Yamuna", place: "Vishram Ghat, Mathura", note: "Bhakti · the beloved" },
        { name: "Godavari", place: "Ram Kund, Nashik", note: "Dakshin Ganga" },
        { name: "Shipra", place: "Ram Ghat, Ujjain", note: "Ground of the Kumbh" },
        { name: "Kaveri", place: "Talakaveri, Kodagu", note: "Ganga of the south" },
      ],
    },
    how: {
      eyebrow: "How it works",
      title: "Three steps. No airport.",
      steps: [
        {
          n: "01",
          t: "Take sankalp",
          d: "Enter your name, your gotra, and the intention you carry. Add family — and ancestors — if you wish.",
        },
        {
          n: "02",
          t: "Choose your muhurat",
          d: "Pick a river and an auspicious hour. We compute it against the panchang and convert it to your own timezone.",
        },
        {
          n: "03",
          t: "Take your dip",
          d: "Join live as the rite is performed in your name. Your Sankalp Patra arrives the same day.",
        },
      ],
    },
    muhurat: {
      eyebrow: "The calendar",
      title: "Days the water listens.",
      lede: "Auspicious occasions open months ahead. Exact timings follow the panchang and are confirmed when booking opens.",
      items: [
        { t: "Kartik Purnima", w: "November 2026", d: "Dev Deepawali at the ghats" },
        { t: "Makar Sankranti", w: "January 2027", d: "The sun turns north" },
        { t: "Mahashivratri", w: "February 2027", d: "The night of Shiva" },
        { t: "Ganga Dussehra", w: "May 2027", d: "The descent of the Ganga" },
      ],
    },
    pricing: {
      eyebrow: "Sankalp",
      title: "Offer what is right.",
      lede: "One-time offerings. No subscription you cannot leave, no hidden dakshina.",
      popular: "Most chosen",
      cta: "Choose",
      plans: [
        {
          name: "Ekal Snan",
          sub: "A single dip",
          price: "$11",
          features: [
            "One river, one sankalp",
            "Live attendance + recording",
            "Digital Sankalp Patra",
          ],
        },
        {
          name: "Parivar",
          sub: "For the household",
          price: "$31",
          features: [
            "Up to six names, one gotra",
            "Priority muhurat slots",
            "HD recording, kept for good",
            "Pitru sankalp for ancestors",
          ],
        },
        {
          name: "Varsh",
          sub: "The whole year",
          price: "$108",
          features: [
            "Twelve snans across the year",
            "Every river, every occasion",
            "Brahma muhurat priority",
            "Family archive + annual almanac",
          ],
        },
      ],
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
      title: "स्नानिफ़ाई — नदी आप तक आती है",
      description:
        "संपूर्ण डिजिटल स्नान। आपका नाम, आपका गोत्र, आपका संकल्प — भारत के पवित्रतम जल में अर्पित, और आप जहाँ भी हों वहीं सजीव प्रसारित।",
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
      badge: "छह घाट · छह पवित्र जल",
      titleA: "नदी",
      titleB: "आप तक आती है।",
      lede: "संपूर्ण डिजिटल स्नान। आपका नाम, आपका गोत्र, आपका संकल्प — भारत के पवित्रतम जल में संपन्न अनुष्ठान में अर्पित, और आप जहाँ भी हों वहीं सजीव प्रसारित।",
      ctaPrimary: "स्नान आरंभ करें",
      ctaSecondary: "एक स्नान देखें",
      card: {
        label: "प्रातः बेला",
        title: "ब्रह्म मुहूर्त",
        meta: "गंगा · हर की पौड़ी, हरिद्वार",
        countdown: "समय प्रत्येक पर्व के साथ प्रकाशित",
      },
      stats: [
        { n: "6", l: "पवित्र जल" },
        { n: "घाट पर ही", l: "हर अनुष्ठान, प्रत्यक्ष" },
        { n: "सदैव", l: "रिकॉर्ड और समयांकित" },
      ],
    },
    rivers: {
      eyebrow: "पवित्र जल",
      title: "छह नदियाँ। एक डुबकी।",
      lede: "हर स्नान घाट पर ही, पंचांग द्वारा निर्धारित घड़ी में संपन्न होता है — न कोई पुराना वीडियो, न कोई पुनरावृत्ति।",
      items: [
        { name: "गंगा", place: "हर की पौड़ी, हरिद्वार", note: "मोक्ष · महाशोधिनी" },
        { name: "त्रिवेणी संगम", place: "प्रयागराज", note: "तीन धाराओं का मिलन" },
        { name: "यमुना", place: "विश्राम घाट, मथुरा", note: "भक्ति · प्रियतमा" },
        { name: "गोदावरी", place: "रामकुंड, नासिक", note: "दक्षिण गंगा" },
        { name: "शिप्रा", place: "रामघाट, उज्जैन", note: "कुंभ की भूमि" },
        { name: "कावेरी", place: "तलकावेरी, कोडगु", note: "दक्षिण की गंगा" },
      ],
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
          d: "नदी और शुभ घड़ी चुनें। हम पंचांग के अनुसार गणना कर उसे आपके समयक्षेत्र में बदल देते हैं।",
        },
        {
          n: "०३",
          t: "डुबकी लगाएँ",
          d: "आपके नाम से होते अनुष्ठान में सजीव सम्मिलित हों। संकल्प पत्र उसी दिन आप तक पहुँचता है।",
        },
      ],
    },
    muhurat: {
      eyebrow: "पंचांग",
      title: "जिन दिनों जल सुनता है।",
      lede: "शुभ पर्व महीनों पहले खुलते हैं। सटीक समय पंचांग के अनुसार, बुकिंग खुलते समय पुष्ट किया जाता है।",
      items: [
        { t: "कार्तिक पूर्णिमा", w: "नवंबर 2026", d: "घाटों पर देव दीपावली" },
        { t: "मकर संक्रांति", w: "जनवरी 2027", d: "सूर्य उत्तरायण होते हैं" },
        { t: "महाशिवरात्रि", w: "फ़रवरी 2027", d: "शिव की रात्रि" },
        { t: "गंगा दशहरा", w: "मई 2027", d: "गंगा का अवतरण" },
      ],
    },
    pricing: {
      eyebrow: "संकल्प",
      title: "जो उचित हो, वही अर्पित करें।",
      lede: "एकमुश्त अर्पण। न छूटने वाली कोई सदस्यता नहीं, न कोई छिपी दक्षिणा।",
      popular: "सर्वाधिक चुना गया",
      cta: "चुनें",
      plans: [
        {
          name: "एकल स्नान",
          sub: "एक डुबकी",
          price: "$11",
          features: ["एक नदी, एक संकल्प", "सजीव सम्मिलन + रिकॉर्डिंग", "डिजिटल संकल्प पत्र"],
        },
        {
          name: "परिवार",
          sub: "पूरे घर के लिए",
          price: "$31",
          features: [
            "छह नाम तक, एक गोत्र",
            "प्राथमिकता मुहूर्त",
            "HD रिकॉर्डिंग, सदैव सुरक्षित",
            "पूर्वजों हेतु पितृ संकल्प",
          ],
        },
        {
          name: "वार्षिक",
          sub: "पूरा वर्ष",
          price: "$108",
          features: [
            "वर्ष भर बारह स्नान",
            "हर नदी, हर पर्व",
            "ब्रह्म मुहूर्त प्राथमिकता",
            "पारिवारिक संग्रह + वार्षिक पंचांग",
          ],
        },
      ],
    },
    closing: {
      title: "आप जहाँ भी हों, जल वहीं है।",
      lede: "दस हज़ार किलोमीटर — गंगा इसे दूरी नहीं मानती।",
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
