import type { Lang } from "@/lib/locales";

/* The copy of /panchang/[city]. `{city}` is the city's name. */
export const panchangCityContent = {
  en: {
    meta: {
      title: "{city} panchang today: sunrise, Brahma muhurat and the tithi",
      description:
        "Today's sunrise, Brahma muhurat and tithi for {city}, computed for its own sky and printed on its own clock, with the ghat's hour in IST beside it.",
    },
    kicker: "Panchang by city",
    title: "{city}, this morning",
    lede: "Sunrise, Brahma muhurat and the tithi at sunrise, for {city} itself: its own sky, its own clock. The ghat's hour is in IST beside each.",
    rows: {
      date: "Day",
      sunrise: "Sunrise",
      brahma: "Brahma muhurat",
      sunset: "Sunset",
      tithi: "Tithi at sunrise",
      ends: "The tithi ends",
      tomorrow: "Sunrise tomorrow",
    },
    localLabel: "{city}",
    istLabel: "IST",
    to: "to",
    how: "How this is drawn",
    howBody: [
      "Sunrise and sunset are computed for {city}'s coordinates with the same astronomy the ghat pages use, and Brahma muhurat is the two muhurtas before sunrise, scaled to the length of the night, as on /muhurat.",
      "The tithi is the one running at {city}'s sunrise, which is the rule every printed panchang keeps. Its end is given on your clock and in IST. On some days the ghat's sunrise falls on a different tithi; the /panchang page explains why the date moves.",
    ],
    others: "Other cities",
    othersIn: "Other cities, {country}",
    allCities: "Every city, by country",
    ghatLink: "The panchang at the ghat",
    begin: "Sit with the river at this hour",
  },
  hi: {
    meta: {
      title: "{city} का आज का पंचांग: सूर्योदय, ब्रह्म मुहूर्त और तिथि",
      description:
        "{city} के लिए आज का सूर्योदय, ब्रह्म मुहूर्त और तिथि, उसके अपने आकाश से गणित और उसकी अपनी घड़ी पर, साथ में घाट का समय IST में।",
    },
    kicker: "शहर के अनुसार पंचांग",
    title: "{city}, आज की सुबह",
    lede: "{city} के लिए सूर्योदय, ब्रह्म मुहूर्त और सूर्योदय की तिथि: उसका अपना आकाश, उसकी अपनी घड़ी। हर पंक्ति के साथ घाट का समय IST में।",
    rows: {
      date: "दिन",
      sunrise: "सूर्योदय",
      brahma: "ब्रह्म मुहूर्त",
      sunset: "सूर्यास्त",
      tithi: "सूर्योदय की तिथि",
      ends: "तिथि समाप्त",
      tomorrow: "कल सूर्योदय",
    },
    localLabel: "{city}",
    istLabel: "IST",
    to: "से",
    how: "यह कैसे बनता है",
    howBody: [
      "सूर्योदय और सूर्यास्त {city} के निर्देशांकों पर उसी खगोलगणना से निकाले गए हैं जो घाट के पृष्ठ प्रयोग करते हैं, और ब्रह्म मुहूर्त सूर्योदय से पहले के दो मुहूर्त हैं, रात की लंबाई के अनुसार, जैसे /muhurat पर।",
      "तिथि वही है जो {city} के सूर्योदय पर चल रही है, जो हर छपे पंचांग का नियम है। उसका अंत आपकी घड़ी और IST दोनों में दिया है। कुछ दिन घाट का सूर्योदय दूसरी तिथि में पड़ता है; /panchang पृष्ठ बताता है कि तारीख़ क्यों बदलती है।",
    ],
    others: "अन्य शहर",
    othersIn: "{country} के अन्य शहर",
    allCities: "देश के अनुसार सभी शहर",
    ghatLink: "घाट का पंचांग",
    begin: "इस बेला में नदी के साथ बैठिए",
  },
} satisfies Record<Lang, unknown>;

export type PanchangCityCopy = (typeof panchangCityContent)["en"];
