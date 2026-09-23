import type { Lang } from "@/lib/locales";
import { fitTitle } from "@/lib/seo";

/* The copy of /panchang/[city]. `{city}` is the city's name. */
export const panchangCityContent = {
  en: {
    meta: {
      /** Fullest first; the page takes the first that fits TITLE_MAX. */
      titles: [
        "{city} panchang today: sunrise, Brahma muhurat, tithi",
        "{city} panchang today: sunrise and Brahma muhurat",
        "{city} panchang today",
      ],
      description:
        "Today's sunrise, Brahma muhurat and tithi in {city}, on your clock and in IST.",
    },
    kicker: "Panchang by city",
    title: "{city}, this morning",
    lede: "Today in {city}, on your clock and in IST.",
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
      "Sunrise, sunset and Brahma muhurat are computed at {city}'s coordinates. The tithi is the one running at {city}'s sunrise, the rule every printed panchang keeps.",
      "Some days the ghat's sunrise falls on a different tithi. The shraddha guide says why.",
    ],
    others: "Other cities",
    othersIn: "Other cities, {country}",
    allCities: "Every city, by country",
    ghatLink: "The muhurat calendar",
    guideLink: "The shraddha guide",
    ghatsTitle: "The six waters",
    ghatsLede: "The IST column is read at one of these ghats. Each has a page.",
    liveLink: "All six rivers now",
    begin: "Sit with the river at this hour",
  },
  hi: {
    meta: {
      titles: [
        "{city} का आज का पंचांग: सूर्योदय, ब्रह्म मुहूर्त और तिथि",
        "{city} का आज का पंचांग: सूर्योदय और ब्रह्म मुहूर्त",
        "{city} का आज का पंचांग",
      ],
      description:
        "{city} में आज का सूर्योदय, ब्रह्म मुहूर्त और तिथि, आपकी घड़ी और IST में।",
    },
    kicker: "शहर के अनुसार पंचांग",
    title: "{city}, आज की सुबह",
    lede: "आज {city} में, आपकी घड़ी और IST में।",
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
      "सूर्योदय, सूर्यास्त और ब्रह्म मुहूर्त {city} के निर्देशांकों पर गणना किए गए हैं। तिथि वही है जो {city} के सूर्योदय पर चल रही है, जो हर छपे पंचांग का नियम है।",
      "कुछ दिन घाट का सूर्योदय दूसरी तिथि में पड़ता है। श्राद्ध मार्गदर्शिका बताती है क्यों।",
    ],
    others: "अन्य शहर",
    othersIn: "{country} के अन्य शहर",
    allCities: "देश के अनुसार सभी शहर",
    ghatLink: "मुहूर्त पंचांग",
    guideLink: "श्राद्ध मार्गदर्शिका",
    ghatsTitle: "छह जल",
    ghatsLede: "IST का स्तंभ इन्हीं घाटों में से एक पर पढ़ा जाता है। हर एक का पृष्ठ है।",
    liveLink: "छहों नदियाँ अभी",
    begin: "इस बेला में नदी के साथ बैठिए",
  },
} satisfies Record<Lang, unknown>;

export type PanchangCityCopy = (typeof panchangCityContent)["en"];

/** A city page's title: the fullest of its lengths that fits beside the city's name. */
export function cityTitle(lang: Lang, city: string): string {
  return fitTitle(panchangCityContent[lang].meta.titles.map((t) => t.replace("{city}", city)));
}
