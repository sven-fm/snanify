import type { LandingCopy } from "./en";

/** Hindi. Devanagari numerals where a printed panchang would set them, and
    Latin digits wherever a figure must stay checkable against the model's own
    published value. The brand stays Latin: one mark, not two. `footer.rights`
    used to read "© 2026 Snanify", which read close to "Bath-ify". */
export const hi = {
  htmlLang: "hi",
  dir: "ltr" as const,
  meta: {
    title: "Snanify, नदी आप तक आती है",
    description:
      "पंचांग की बताई घड़ी पर उस नदी के साथ तीन मिनट बैठिए जिसके पास आप बड़े हुए। छह पवित्र नदियाँ, सजीव, और हर दिन का मुहूर्त।",
  },
  share: "एक डिजिटल स्नान। उस नदी के साथ तीन मिनट जिसके पास आप बड़े हुए, और घर भेजने के लिए एक पत्र।",
  themeLabel: "थीम बदलिए",
  langLabel: "भाषा",
  nav: {
    how: "कैसे काम करता है",
    rivers: "पवित्र जल",
    muhurat: "मुहूर्त",
    pricing: "मूल्य",
    cta: "शुरू",
    menu: "मेन्यू",
    account: "आपकी सुबहें",
    accountShort: "सुबहें",
    profile: "आपका खाता",
    snanSettings: "आपका स्नान",
    buy: "सुबहें खरीदिए",
    signOut: "बाहर निकलिए",
  },
  edition: "संवत् {samvat}",
  hero: {
    title: "आपका {river} स्नान। घर से।",
    band: "बस 3 मिनट। फिर परिवार को भेजिए।",
    pitch: "नदी के साथ साँस लीजिए, जैसे वह आज सुबह बह रही है। अपना संकल्प कीजिए।",
    push: "आज ही पहला स्नान कीजिए!",
    ctaPrimary: "अभी स्नान शुरू कीजिए",
    card: {
      muhurat: "अगला मुहूर्त",
      link: "छहों जल देखिए",
    },
  },
  rivers: {
    title: "अपनी नदी चुनिए",
    lede: "जिसके पास आप बड़े हुए, या जिसमें आपके परिवार ने स्नान किया। हर नदी का अपना पृष्ठ है, आज के प्रवाह और घाट के पंचांग के साथ।",
  },
  pricing: {
    title: "ग्यारह सुबहें, ग्यारह में।",
    titleInr: "ग्यारह सुबहें {price:eleven} में।",
    lede: "एक बार भुगतान, कोई सदस्यता नहीं। किसी भी सुबह बैठिए।",
    labels: {
      each: "प्रति सुबह",
      choose: "यह पैक चुनिए",
    },
    tiers: [
      {
        key: "one",
        name: "एक सुबह",
        body: "एक सुबह आज़माइए, और उसका पत्र भेजिए।",
      },
      {
        key: "eleven",
        name: "ग्यारह सुबहें",
        body: "ग्यारह सुबहें, एक बार भुगतान। किसी भी सुबह बैठिए। ये रखी रहती हैं।",
      },
      {
        key: "sixty",
        name: "साठ सुबहें",
        body: "पूरे वर्ष, महीने में पाँच सुबहें, प्रति सुबह सबसे कम मूल्य पर।",
      },
    ],
    tax: {
      exclusive: "मूल्य अमेरिकी बिक्री-कर से पहले के हैं।",
      inclusive: "कर सहित।",
    },
  },
  sheet: {
    title: "यह सुबह घर भेजिए।",
    lede: "हर स्नान एक संकल्प पत्र पर पूरा होता है: आपके परिवार के नाम, उस सुबह की नदी, तिथि और घड़ी। वह परिवार के समूह के लिए तैयार खुलता है।",
  },
  specimen: {
    label: "नमूना",
    alt: "एक संकल्प पत्र, जैसा वह फ़ोन पर पहुँचता है: दो नाम, हरिद्वार में गंगा, आज का प्रवाह और स्थान।",
    caption: "एक पत्र, जैसा वह परिवार के समूह में पहुँचता है, आज गंगा के अपने आँकड़े से बना।",
  },
  notFound: {
    code: "404",
    title: "यह घाट कहीं और चला गया।",
    head: { title: "यह {accent} कहीं और चला गया।", accent: "घाट" },
    lede: "नदी ने रास्ता बदला, या कड़ी ने। छहों जल वहीं हैं जहाँ सदा थे।",
    cta: "नदी की ओर लौटिए",
  },
  footer: {
    tagline: "विश्वभर के भारतीयों के लिए डिजिटल स्नान।",
    cols: [
      { h: "साधना", links: ["शुरू कीजिए", "स्नान"] },
      { h: "संदर्भ", links: ["पंचांग", "अभी की नदियाँ", "पवित्र जल", "मुहूर्त", "प्रश्न"] },
      { h: "कानूनी", links: ["गोपनीयता", "शर्तें"] },
    ],
    made: "प्रयागराज और बर्लिन",
    rights: "© 2026 Snanify",
  },
} satisfies LandingCopy;
