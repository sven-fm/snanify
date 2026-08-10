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
      ctaSecondary: "How it works",
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
          d: "Enter your name, your gotra, and the intention you carry. Add family — and ancestors — if you wish.",
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
    pricing: {
      eyebrow: "Sankalp",
      title: "Offer what is right.",
      lede: "One-time offerings. No subscription you cannot leave. What reaches the officiant is stated openly.",
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
            "HD recording, kept until you delete it",
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
      ctaSecondary: "कैसे काम करता है",
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
          d: "जल और पर्व चुनें। समय अभी अस्थायी रूप से — IST और आपके समयक्षेत्र दोनों में — दिखाया जाता है, पंचांग स्रोत पुष्ट होने तक।",
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
    pricing: {
      eyebrow: "संकल्प",
      title: "जो उचित हो, वही अर्पित करें।",
      lede: "एकमुश्त अर्पण। न छूटने वाली कोई सदस्यता। पुरोहित तक कितना पहुँचता है, यह खुलकर बताया जाता है।",
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
            "HD रिकॉर्डिंग, जब तक आप न मिटाएँ",
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
    notFound: {
      code: "404",
      title: "यह मार्ग जल तक नहीं पहुँचता।",
      lede: "जिस पृष्ठ की आप खोज कर रहे थे, वह यहाँ नहीं है। नदी, किंतु, वहीं है जहाँ सदा से थी।",
      cta: "मुखपृष्ठ पर लौटें",
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
