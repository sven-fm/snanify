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
