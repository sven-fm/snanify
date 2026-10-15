/* The words on the ads, one place for both the images and Ads Manager.
   Written under CLAUDE.md: no claim that a rite happened, no promised
   outcome, no negative constructions, no em dashes. Under Meta's rules: no
   sentence that tells the reader who they are (religion, origin). */

export const OFFER = {
  diaspora: { en: "Eleven mornings for eleven.", hi: "ग्यारह सुबहें, ग्यारह में।" },
  india: { en: "Eleven mornings for ₹501.", hi: "ग्यारह सुबहें ₹501 में।" },
};

export const STATICS = {
  home: {
    art: "phone",
    img: "patra-916",
    en: {
      kicker: "Sankalp Patra",
      hook: "Send the Ganga home.",
      sub: "Three minutes with the river each morning. Then a Patra with your family's names, ready for the family WhatsApp.",
    },
    hi: {
      kicker: "संकल्प पत्र",
      hook: "गंगा घर भेजिए।",
      sub: "हर सुबह तीन मिनट नदी के साथ। फिर परिवार के नामों वाला पत्र, सीधे परिवार के WhatsApp पर।",
    },
  },
  kartik: {
    art: "sheet",
    img: "patra-45",
    en: {
      kicker: "Kartik snan, 27 Oct to 24 Nov",
      hook: "Kartik with the Ganga, wherever you live.",
      sub: "Three minutes each morning with today's flow at Har Ki Pauri. Your sankalp. A Patra for the family.",
    },
    hi: {
      kicker: "कार्तिक स्नान, 27 अक्टूबर से 24 नवंबर",
      hook: "कार्तिक गंगा के साथ, आप जहाँ भी हों।",
      sub: "हर सुबह तीन मिनट, हर की पौड़ी पर आज के प्रवाह के साथ। आपका संकल्प। परिवार के लिए एक पत्र।",
    },
  },
};

/* The video: five captions over the sitting, then the end card. Each caption
   names what is on screen at that moment. */
export const VIDEO = {
  en: {
    captions: [
      "Far from the Ganga this Kartik?",
      "Today's flow at Har Ki Pauri.",
      "Breathe with the river.",
      "Hold your sankalp.",
      "Then send it home.",
    ],
    end: { k: "Kartik snan, 27 Oct to 24 Nov", h: "Three minutes with the Ganga, every morning." },
  },
  hi: {
    captions: [
      "इस कार्तिक गंगा से दूर हैं?",
      "हर की पौड़ी पर आज का प्रवाह।",
      "नदी के साथ साँस लीजिए।",
      "अपना संकल्प थामिए।",
      "फिर घर भेजिए।",
    ],
    end: { k: "कार्तिक स्नान, 27 अक्टूबर से 24 नवंबर", h: "हर सुबह, तीन मिनट गंगा के साथ।" },
  },
};

/* The campaign layer: bazaar print, kept off the site (DESIGNSYSTEM.md,
   Campaigns). Matchbox and signboard are for scroll-stopping ads and the
   price story; calendar art is for festival days. Same two rules as every
   word above. `seal` is the price as a label: the figure, and what it buys. */
export const SEAL = {
  diaspora: {
    en: { big: "11", small: "mornings for eleven" },
    hi: { big: "11", small: "सुबहें, ग्यारह में" },
  },
  india: {
    en: { big: "₹501", small: "for eleven mornings" },
    hi: { big: "₹501", small: "में ग्यारह सुबहें" },
  },
};

export const CAMPAIGN = {
  matchbox: {
    en: {
      brand: "Sankalp brand",
      name: "Ganga snan",
      tagline: "Three minutes, six rivers",
      hook: "Strike a morning. Sit with the Ganga.",
    },
    hi: {
      brand: "संकल्प छाप",
      name: "गंगा स्नान",
      tagline: "तीन मिनट, छह नदियाँ",
      hook: "एक सुबह जलाइए। गंगा के साथ बैठिए।",
    },
  },
  signboard: {
    en: {
      top: "Ganga",
      bottom: "snan",
      line: "wherever you live",
      hook: "Send the Ganga home.",
      sub: "Three minutes each morning. Then a sheet with the family's names, straight to WhatsApp.",
    },
    hi: {
      top: "गंगा",
      bottom: "स्नान",
      line: "आप जहाँ भी हों",
      hook: "गंगा घर भेजिए।",
      sub: "हर सुबह तीन मिनट। फिर परिवार के नामों वाला पत्र, सीधे WhatsApp पर।",
    },
  },
  /* Kartik 2026. A festival day gets its own entry here, with its own dates. */
  calendar: {
    en: {
      samvat: "Samvat 2083",
      title: "Kartik snan",
      dates: "27 October to 24 November",
      line: "Three minutes with the Ganga each morning, wherever you live.",
    },
    hi: {
      samvat: "संवत् 2083",
      title: "कार्तिक स्नान",
      dates: "27 अक्टूबर से 24 नवंबर",
      line: "हर सुबह तीन मिनट गंगा के साथ, आप जहाँ भी हों।",
    },
  },
};

/* LOUD, the second Kartik set (15 October 2026): the same three styles turned
   all the way up, built to stop a thumb. Same two rules: no rite claimed, no
   outcome promised. The only urgency is the real one, Kartik's own dates.
   Capitals are set by the template, so the words here are written plainly. */
export const LOUD = {
  signboard: {
    en: {
      top: "Ganga",
      bottom: "snan",
      band: "Every morning. Three minutes. Wherever you live.",
      cta: "Start now",
    },
    hi: {
      top: "गंगा",
      bottom: "स्नान",
      band: "हर सुबह। तीन मिनट। आप जहाँ भी हों।",
      cta: "अभी आरंभ कीजिए",
    },
  },
  matchbox: {
    en: {
      hook: "Strike a morning.",
      brand: "Sankalp brand",
      number: "No. 11",
      name: "Ganga snan",
      tagline: "Three minutes with the river",
      cta: "Start now",
    },
    hi: {
      hook: "एक सुबह जलाइए।",
      brand: "संकल्प छाप",
      number: "नं. 11",
      name: "गंगा स्नान",
      tagline: "नदी के साथ तीन मिनट",
      cta: "अभी आरंभ कीजिए",
    },
  },
  calendar: {
    en: {
      sash: "Starts 27 October",
      title: "Kartik snan",
      sub: "Every morning of Kartik with the Ganga",
      line: "Three minutes at Har Ki Pauri, from wherever you live. Then the family gets a sheet with their names on it.",
      cta: "Start now",
    },
    hi: {
      sash: "27 अक्टूबर से",
      title: "कार्तिक स्नान",
      sub: "कार्तिक की हर सुबह गंगा के साथ",
      line: "हर की पौड़ी पर तीन मिनट, आप जहाँ भी हों। फिर परिवार को उनके नामों वाला पत्र।",
      cta: "अभी आरंभ कीजिए",
    },
  },
};

/* The words in Ads Manager for the loud set: primary texts (Meta rotates
   them), headlines and the description, per language. India swaps in ₹501
   through OFFER. */
export const LOUD_TEXT = {
  en: {
    primary: [
      "Kartik starts 27 October. Sit with the Ganga every morning of it, wherever you live. Three minutes: today's flow at Har Ki Pauri, a breath with the river, your own sankalp. Then the family gets a Sankalp Patra with their names on it. {offer} Start now.",
      "Ganga snan. Three minutes. Every morning. Your first one can be today, and the sheet reaches the family WhatsApp before your chai.",
      "{offer} Your first morning with the Ganga starts the moment you do.",
      "Send the Ganga home this Kartik. Your family's names beside today's river, on one sheet, ready for WhatsApp. Start now.",
    ],
    headlines: ["Start your Ganga snan now", "Kartik starts 27 October", "Eleven mornings for eleven", "Send the Ganga home"],
    description: "Kartik snan, 27 Oct to 24 Nov",
  },
  hi: {
    primary: [
      "कार्तिक 27 अक्टूबर से है। उसकी हर सुबह गंगा के साथ बैठिए, आप जहाँ भी हों। तीन मिनट: हर की पौड़ी पर आज का प्रवाह, नदी के साथ साँस, आपका अपना संकल्प। फिर परिवार को उनके नामों वाला संकल्प पत्र। {offer} अभी आरंभ कीजिए।",
      "गंगा स्नान। तीन मिनट। हर सुबह। पहली सुबह आज ही हो सकती है, और पत्र चाय से पहले परिवार के WhatsApp पर।",
      "इस कार्तिक गंगा घर भेजिए। आज की नदी के साथ परिवार के नाम, एक पत्र पर। अभी आरंभ कीजिए।",
    ],
    headlines: ["अभी गंगा स्नान आरंभ कीजिए", "कार्तिक 27 अक्टूबर से", "ग्यारह सुबहें, ग्यारह में", "गंगा घर भेजिए"],
    description: "कार्तिक स्नान, 27 अक्टूबर से 24 नवंबर",
  },
};
