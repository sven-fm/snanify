/* ---------------------------------------------------------------------------
 * Snanify, the free panchang reference.
 *
 * This file adds NO calendar data. Every occasion, window, ghat and provenance
 * label is imported from `@/content/muhurat`, which owns them, so a correction
 * made there lands here without a second edit.
 *
 * What this file does add is the material the reference page needs and the
 * calendar itself has no business carrying:
 *
 *   1. The reader's zones. Seven of them, chosen because that is where the
 *      families who cannot read an IST time actually live.
 *   2. A pinned reference sunrise, so a window defined as an offset can be
 *      shown as a clock time in eight places at once. It is an illustration
 *      and is labelled as one everywhere it appears; the assertion at the end
 *      of this file pins it to the same notional day the /muhurat worked
 *      example uses, so the two pages can never drift apart.
 *   3. The two lunar-month reckonings, written out with worked pairs. This is
 *      the explanation the page exists for.
 *   4. The sixteen shraddha tithis of Pitru Paksha, as a ladder of tithis.
 *      Not as Gregorian dates. `loadMuhuratData()` refuses day-level precision
 *      until a panchang provider is named, and a free reference that quietly
 *      broke that rule would be worse than no reference.
 * ------------------------------------------------------------------------- */

/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair and not the twelve locales the
   site serves; see the tier note at the top of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";
import {
  GHAT_ZONE,
  MUHURAT,
  WINDOWS,
  asInstant,
  asZone,
  type Bilingual,
  type IanaZone,
  type Instant,
  type Occasion,
  type WindowAnchor,
} from "@/content/muhurat";

/* --- the reader's zones ---------------------------------------------------
   Ordered west to east, the way the diaspora wakes up. Toronto keeps New
   York's clock and is listed separately anyway, because a reader in Toronto
   should not have to know that.                                            */

export interface PanchangZone {
  readonly zone: IanaZone;
  readonly city: Bilingual;
  /** The zone as a person would name it, not as an IANA id. */
  readonly region: Bilingual;
}

export const PANCHANG_ZONES: readonly PanchangZone[] = [
  {
    zone: asZone("America/Los_Angeles"),
    city: { en: "San Francisco", hi: "सैन फ़्रांसिस्को" },
    region: { en: "US Pacific", hi: "अमेरिका, प्रशांत तट" },
  },
  {
    zone: asZone("America/Toronto"),
    city: { en: "Toronto", hi: "टोरंटो" },
    region: { en: "Canada Eastern", hi: "कनाडा, पूर्वी" },
  },
  {
    zone: asZone("America/New_York"),
    city: { en: "New York", hi: "न्यूयॉर्क" },
    region: { en: "US Eastern", hi: "अमेरिका, पूर्वी तट" },
  },
  {
    zone: asZone("Europe/London"),
    city: { en: "London", hi: "लंदन" },
    region: { en: "United Kingdom", hi: "यूनाइटेड किंगडम" },
  },
  {
    zone: asZone("Asia/Dubai"),
    city: { en: "Dubai", hi: "दुबई" },
    region: { en: "Gulf", hi: "खाड़ी" },
  },
  {
    zone: asZone("Asia/Singapore"),
    city: { en: "Singapore", hi: "सिंगापुर" },
    region: { en: "Singapore", hi: "सिंगापुर" },
  },
  {
    zone: asZone("Australia/Sydney"),
    city: { en: "Sydney", hi: "सिडनी" },
    region: { en: "Eastern Australia", hi: "पूर्वी ऑस्ट्रेलिया" },
  },
];

/* --- the reference day ----------------------------------------------------
   A window in `muhurat.ts` is a rule, an offset in minutes from sunrise, from
   the sun's transit or from sunset. A rule cannot be converted into a reader's
   timezone; only an instant can. So we pin one notional day, state the three
   anchors we assume on it, and derive the eight window edges from the same
   arithmetic the window records already carry.

   15 September 2026 and a 06:00 sunrise are the /muhurat worked example's own
   assumptions, reused deliberately. Nothing falls on this day, no tithi is
   claimed for it, and the assertion at the foot of this file fails the build
   if the two pages ever stop agreeing.                                     */

const REFERENCE_ANCHORS: Record<WindowAnchor, Instant> = {
  sunrise: asInstant("2026-09-15T00:30:00.000Z"), // 06:00 IST
  "solar-noon": asInstant("2026-09-15T06:30:00.000Z"), // 12:00 IST
  sunset: asInstant("2026-09-15T12:30:00.000Z"), // 18:00 IST
};

export const REFERENCE_ANCHORS_IST: Record<WindowAnchor, string> = {
  sunrise: "06:00",
  "solar-noon": "12:00",
  sunset: "18:00",
};

function shiftMinutes(instant: Instant, minutes: number): Instant {
  return asInstant(new Date(new Date(instant).getTime() + minutes * 60_000).toISOString());
}

export interface WindowSpan {
  readonly id: string;
  readonly name: Bilingual;
  readonly anchor: WindowAnchor;
  readonly durationMin: number;
  readonly formula: Bilingual;
  readonly start: Instant;
  readonly end: Instant;
}

/** The four daily windows, resolved onto the reference day. */
export const WINDOW_SPANS: readonly WindowSpan[] = WINDOWS.map((w) => ({
  id: w.id,
  name: w.name,
  anchor: w.anchor,
  durationMin: w.durationMin,
  formula: w.formula,
  start: shiftMinutes(REFERENCE_ANCHORS[w.anchor], w.offsetStartMin),
  end: shiftMinutes(REFERENCE_ANCHORS[w.anchor], w.offsetEndMin),
}));

/* --- offsets --------------------------------------------------------------
   The offset between a reader's clock and the ghat's is the one number on this
   page that survives without a panchang: it is a property of the two zones and
   the date, nothing else. It still moves twice a year in four of the seven
   places listed above, which is exactly why it is printed rather than assumed.
                                                                            */

function wallClockAsUtcMs(instant: Instant, zone: IanaZone): number {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const p: Record<string, string> = {};
  for (const part of fmt.formatToParts(new Date(instant))) p[part.type] = part.value;
  return Date.UTC(
    Number(p.year),
    Number(p.month) - 1,
    Number(p.day),
    Number(p.hour),
    Number(p.minute),
    Number(p.second),
  );
}

/** Minutes a zone's clock reads ahead of (positive) or behind (negative) IST. */
export function offsetFromIstMinutes(instant: Instant, zone: IanaZone): number {
  return Math.round(
    (wallClockAsUtcMs(instant, zone) - wallClockAsUtcMs(instant, GHAT_ZONE)) / 60_000,
  );
}

/** "IST -9:30", "IST +2:30", or the same-clock case spelled out. */
export function formatOffsetFromIst(minutes: number, lang: Lang): string {
  if (minutes === 0) return lang === "hi" ? "IST के समान" : "The same as IST";
  const sign = minutes < 0 ? "-" : "+";
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = String(abs % 60).padStart(2, "0");
  return `IST ${sign}${h}:${m}`;
}

/* --- the two reckonings ---------------------------------------------------
   Both reckonings use the same moon and the same tithis. They cut the month at
   different points, so they agree on every bright-fortnight name and disagree
   on every dark-fortnight one, where the Purnimanta name runs a month ahead.
   The pairs below are the ones a family actually trips over.                */

export interface MasaPair {
  readonly id: string;
  readonly occasion: Bilingual;
  readonly purnimanta: Bilingual;
  readonly amanta: Bilingual;
  readonly note: Bilingual;
}

export const MASA_PAIRS: readonly MasaPair[] = [
  {
    id: "pitru-paksha",
    occasion: { en: "Pitru Paksha", hi: "पितृ पक्ष" },
    purnimanta: { en: "Ashwin Krishna paksha", hi: "आश्विन कृष्ण पक्ष" },
    amanta: { en: "Bhadrapada Krishna paksha", hi: "भाद्रपद कृष्ण पक्ष" },
    note: {
      en: "The same sixteen days, and the same moon, under two month-names. A family that remembers its shraddha tithi as a month plus a tithi, and reads it against the other reckoning, lands a full lunation away.",
      hi: "एक ही सोलह दिन, एक ही चंद्र, पर दो मास-नामों से। जो परिवार अपनी श्राद्ध तिथि को मास और तिथि के रूप में स्मरण रखता है और उसे दूसरी गणना से पढ़ लेता है, वह पूरे एक चांद्र मास दूर जा पड़ता है।",
    },
  },
  {
    id: "janmashtami",
    occasion: { en: "Krishna Janmashtami", hi: "कृष्ण जन्माष्टमी" },
    purnimanta: { en: "Bhadrapada Krishna Ashtami", hi: "भाद्रपद कृष्ण अष्टमी" },
    amanta: { en: "Shravana Krishna Ashtami", hi: "श्रावण कृष्ण अष्टमी" },
    note: {
      en: "The most familiar example, and the easiest to check against your own household: north and west name the same night differently every single year.",
      hi: "सबसे परिचित उदाहरण, और अपने ही घर में जाँच लेने योग्य: उत्तर और पश्चिम भारत हर वर्ष उसी रात्रि को भिन्न नाम देते हैं।",
    },
  },
  {
    id: "mahashivratri",
    occasion: { en: "Mahashivratri", hi: "महाशिवरात्रि" },
    purnimanta: { en: "Phalguna Krishna Chaturdashi", hi: "फाल्गुन कृष्ण चतुर्दशी" },
    amanta: { en: "Magha Krishna Chaturdashi", hi: "माघ कृष्ण चतुर्दशी" },
    note: {
      en: "One instant of one night, named for two different months. Nobody observes it on two different days; only the name moves.",
      hi: "एक ही रात्रि का एक ही क्षण, दो भिन्न मासों के नाम से। कोई इसे दो भिन्न दिनों में नहीं मनाता; केवल नाम बदलता है।",
    },
  },
];

/* --- the shraddha ladder --------------------------------------------------
   Sixteen tithis, in order. This is a rule and therefore a fact; the Gregorian
   dates it lands on in 2026 are a computation nobody here has yet done, and
   they are deliberately absent.

   `kept` is filled only where a named convention exists. Those conventions are
   regional and families differ on them, which the page says out loud rather
   than presenting them as settled law.                                     */

export interface ShraddhaDay {
  readonly n: number;
  readonly tithi: Bilingual;
  readonly alsoCalled?: Bilingual;
  readonly kept?: Bilingual;
}

export const SHRADDHA_LADDER: readonly ShraddhaDay[] = [
  {
    n: 1,
    tithi: { en: "Purnima", hi: "पूर्णिमा" },
    alsoCalled: { en: "Prostapadi, Rishi Tarpan", hi: "प्रोष्ठपदी, ऋषि तर्पण" },
    kept: {
      en: "The full moon on which the fortnight opens. Many households treat it as the eve rather than as a shraddha day of its own, and begin counting from the next morning.",
      hi: "वह पूर्णिमा जिससे पक्ष आरंभ होता है। बहुत से घरों में इसे स्वतंत्र श्राद्ध दिवस नहीं, पूर्व संध्या माना जाता है और गणना अगली प्रातः से आरंभ होती है।",
    },
  },
  { n: 2, tithi: { en: "Pratipada", hi: "प्रतिपदा" } },
  { n: 3, tithi: { en: "Dwitiya", hi: "द्वितीया" } },
  { n: 4, tithi: { en: "Tritiya", hi: "तृतीया" } },
  { n: 5, tithi: { en: "Chaturthi", hi: "चतुर्थी" } },
  {
    n: 6,
    tithi: { en: "Panchami", hi: "पंचमी" },
    alsoCalled: { en: "Bharani Panchami, Kunwara Panchami", hi: "भरणी पंचमी, कुँवारा पंचमी" },
    kept: {
      en: "In several regions this day is kept for those who died unmarried. Where the Bharani nakshatra falls elsewhere in the fortnight, the Bharani shraddha moves with it rather than with the tithi.",
      hi: "कई क्षेत्रों में यह दिन उनके लिए रखा जाता है जिनका विवाह नहीं हुआ था। जहाँ भरणी नक्षत्र पक्ष के किसी और दिन पड़े, वहाँ भरणी श्राद्ध तिथि के साथ नहीं, नक्षत्र के साथ चलता है।",
    },
  },
  { n: 7, tithi: { en: "Shashthi", hi: "षष्ठी" } },
  { n: 8, tithi: { en: "Saptami", hi: "सप्तमी" } },
  { n: 9, tithi: { en: "Ashtami", hi: "अष्टमी" } },
  {
    n: 10,
    tithi: { en: "Navami", hi: "नवमी" },
    alsoCalled: { en: "Matru Navami, Avidhava Navami", hi: "मातृ नवमी, अविधवा नवमी" },
    kept: {
      en: "Kept for the mothers of the line, and in many households specifically for a married woman who died before her husband. It is the one day of the sixteen that most families abroad have heard of and cannot place.",
      hi: "वंश की माताओं के लिए, और अनेक घरों में विशेष रूप से उस सुहागिन के लिए जिनका देहावसान पति से पूर्व हुआ। सोलह में यही वह दिन है जिसका नाम विदेश में बसे अधिकांश परिवारों ने सुना है पर स्थान नहीं जानते।",
    },
  },
  { n: 11, tithi: { en: "Dashami", hi: "दशमी" } },
  { n: 12, tithi: { en: "Ekadashi", hi: "एकादशी" } },
  {
    n: 13,
    tithi: { en: "Dwadashi", hi: "द्वादशी" },
    alsoCalled: { en: "Sannyasi Shraddha", hi: "संन्यासी श्राद्ध" },
    kept: {
      en: "Kept for those who had taken sannyasa. Some traditions place this on Ekadashi instead, and a few keep both.",
      hi: "उनके लिए जिन्होंने संन्यास लिया था। कुछ परंपराएँ इसे एकादशी को रखती हैं, और कुछ दोनों दिन।",
    },
  },
  { n: 14, tithi: { en: "Trayodashi", hi: "त्रयोदशी" } },
  {
    n: 15,
    tithi: { en: "Chaturdashi", hi: "चतुर्दशी" },
    alsoCalled: { en: "Ghayala Chaturdashi", hi: "घायल चतुर्दशी" },
    kept: {
      en: "Kept for those who died by accident, by weapon or by violence. Many traditions hold that an ordinary death should not be brought to this day, which is why families are sometimes told their remembered tithi cannot be used and are not told why.",
      hi: "उनके लिए जिनका देहावसान दुर्घटना, शस्त्र अथवा हिंसा से हुआ। अनेक परंपराएँ मानती हैं कि सामान्य मृत्यु का श्राद्ध इस दिन नहीं लाया जाता; इसी कारण कुछ परिवारों से कह दिया जाता है कि उनकी स्मरण की हुई तिथि यहाँ नहीं चलेगी, और कारण नहीं बताया जाता।",
    },
  },
  {
    n: 16,
    tithi: { en: "Amavasya", hi: "अमावस्या" },
    alsoCalled: { en: "Sarva Pitru Amavasya, Mahalaya Amavasya", hi: "सर्व पितृ अमावस्या, महालया अमावस्या" },
    kept: {
      en: "The day the fortnight closes, kept for all the departed of a line together, and for anyone whose tithi is not known. For a great many families abroad that last clause is simply the situation, and it is not a lesser day for it.",
      hi: "पक्ष के समापन का दिन, जो वंश के समस्त दिवंगतों के लिए है, और उनके लिए भी जिनकी तिथि ज्ञात नहीं। विदेश में बसे बहुत से परिवारों के लिए यही वास्तविक स्थिति है, और इससे यह दिन किसी प्रकार छोटा नहीं हो जाता।",
    },
  },
];

/* --- derived readings ----------------------------------------------------- */

/** Which reckoning names the month at each of the six ghats. Read from data. */
export const GHAT_SCHEMES = MUHURAT.ghats;

/**
 * The tithi rule of an occasion, stated as one line, without restating the
 * month-name pair. The month names live in the reckoning section above, where
 * they can be explained rather than asserted in a table cell.
 */
export function tithiLine(occasion: Occasion, lang: Lang): string {
  const c = panchangContent[lang].tithiKinds;
  const rule = occasion.rule;
  const paksha = rule.paksha ? panchangContent[lang].paksha[rule.paksha] : "";

  switch (rule.kind) {
    case "tithi":
      return rule.tithi ? c.tithi(paksha, rule.tithi) : c.manual;
    case "tithi-range":
      return c.range(paksha);
    case "lunar-month":
      return c.month;
    case "solar-ingress":
      return c.ingress;
    default:
      return c.manual;
  }
}

/* --- page copy ------------------------------------------------------------ */

export const panchangContent = {
  en: {
    meta: {
      title: "Panchang: tithi, Pitru Paksha and the shraddha days, in your timezone",
      description:
        "A free reference for families outside India. The sixteen shraddha tithis of Pitru Paksha, the daily windows, why amanta and purnimanta reckoning put the same rite on two different days, and every timing given in IST and converted to New York, Toronto, San Francisco, London, Dubai, Singapore and Sydney.",
    },
    hero: {
      eyebrow: "A free reference",
      title: "The tithi moves. The calendar on your wall does not.",
      lede: "Every year the day drifts, and every year a family abroad asks the same question a fortnight too late. This page sets out what the rules actually say: which tithi, how the day is reckoned, what hour it falls in, and what that hour reads as on your own clock.",
      free: "Nothing here is gated. No email, no account, no counter, and no reason for you to come back unless it is useful.",
    },
    provenance: {
      heading: "Read this first",
      extra:
        "That applies to this page in full. What you will find below is rules, definitions and arithmetic, all of which we can defend today. What you will not find is a Gregorian date for a tithi, because arriving at one needs an almanac we have not yet contracted, and a wrong date printed confidently on a shraddha page is the worst thing this site could do.",
    },
    drift: {
      eyebrow: "Why the date moves",
      title: "Eleven days a year, and then a month back.",
      lede: "A tithi is not a date. It is one thirtieth of a lunation, the time the moon takes to gain twelve degrees on the sun, and it runs anywhere from about nineteen to about twenty six hours. Twelve lunar months come to roughly 354 days against the Gregorian year's 365.",
      points: [
        {
          n: "01",
          t: "The eleven day slip",
          d: "Because the lunar year is about eleven days short, a tithi that fell in late September this year falls in mid September next year. Over three years the drift is a month. This is why a father's shraddha and a father's death anniversary on a passport are two different things, and why one of them is right.",
        },
        {
          n: "02",
          t: "The month that is inserted",
          d: "Roughly every thirty two and a half months an extra lunar month, adhika masa, is inserted to pull the calendar back against the sun. In that year the occasion jumps forward by about nineteen days instead of back by eleven. A family that has learned to subtract eleven days by habit is wrong precisely in the year it matters.",
        },
        {
          n: "03",
          t: "A tithi does not begin at midnight",
          d: "A tithi begins and ends at whatever hour the moon reaches its mark, and the Hindu day turns at sunrise rather than at midnight. So a tithi can begin on Tuesday afternoon and end on Wednesday evening, and which of those two days carries the observance is a question of rule, not of preference.",
        },
      ],
    },
    reckoning: {
      eyebrow: "The linkable part",
      title: "Two calendars, one moon.",
      lede: "This is the single most common reason two branches of one family, both perfectly correct, observe the same shraddha on days a month apart. It is not a disagreement about religion. It is a disagreement about where the month is cut.",
      amanta: {
        name: "Amanta",
        cut: "The month ends at the new moon. Amavasya is the last day; the month opens on the first day of the bright fortnight.",
        where:
          "Followed in Gujarat, Maharashtra, Goa, Karnataka, Andhra Pradesh and Telangana, and in the lunar reckoning used alongside the solar calendars of Tamil Nadu and Kerala.",
      },
      purnimanta: {
        name: "Purnimanta",
        cut: "The month ends at the full moon. Purnima is the last day; the month opens on the first day of the dark fortnight.",
        where:
          "Followed across the north: Uttar Pradesh, Bihar, Madhya Pradesh, Rajasthan, Punjab, Haryana, Uttarakhand, Himachal Pradesh and Nepal.",
      },
      agreeHeading: "Where they agree",
      agree:
        "On every bright fortnight. A day in the shukla paksha carries the same month-name in both reckonings, which is why Ram Navami, Ganesh Chaturthi and every Purnima are named identically everywhere.",
      differHeading: "Where they differ",
      differ:
        "On every dark fortnight, and only on the name. A day in the krishna paksha is given the following month's name by Purnimanta and the current month's name by Amanta, so the Purnimanta name runs one month ahead. The days themselves do not move by so much as an hour.",
      pairsHeading: "The same fortnight, twice named",
      pairsCols: { occasion: "Occasion", purnimanta: "Purnimanta name", amanta: "Amanta name" },
      ghatsHeading: "Which reckoning names the month at each ghat",
      ghatsLede:
        "Four of our six waters sit in Purnimanta country and two in Amanta country. Nothing about the rite changes with it; the month printed beside the tithi does.",
      schemes: { amanta: "Amanta", purnimanta: "Purnimanta" },
    },
    divergence: {
      eyebrow: "Four reasons two households differ",
      title: "And none of them is that one of you is wrong.",
      lede: "If your uncle in Pune and your mother in Lucknow have never once agreed on the day, here is the whole of it. Two of these are naming, two are reckoning.",
      items: [
        {
          n: "01",
          t: "The month-name",
          d: "Amanta and Purnimanta name the same dark fortnight differently, one month apart. A tithi remembered as a month plus a tithi, and read against the other reckoning, is a lunation out. This is the big one, and it is almost always this one.",
        },
        {
          n: "02",
          t: "Where the day is cut",
          d: "The Hindu day runs sunrise to sunrise. A death at two in the morning belongs to the panchang day that opened at the previous dawn, not to the date the hospital wrote down. Families who take the certificate date and convert it are frequently one day out from the start.",
        },
        {
          n: "03",
          t: "Which part of the day decides",
          d: "A tithi that spans two mornings has to be assigned to one of them. Ordinary observances take the tithi in force at sunrise, udaya vyapini. Shraddha does not: it is decided at aparahna, the fourth of five equal parts of the daylight. Two almanacs applying the two rules to one tithi will name two different days, and both are following a rule.",
        },
        {
          n: "04",
          t: "Where the sunrise is taken, and how it is computed",
          d: "A tithi ends at one instant everywhere on earth, but sunrise does not, so the civil day it lands on depends on the place the panchang is computed for. On top of that, drik siddhanta almanacs use observed astronomical positions and vakya almanacs use older tabulated ones, and the two can differ by a day at the edges. Ask which place and which system your family's panchang uses before assuming anyone made a mistake.",
        },
      ],
    },
    pitru: {
      eyebrow: "Pitru Paksha 2026",
      title: "Sixteen tithis, in order.",
      lede: "The fortnight runs from the full moon of Bhadrapada to the following new moon. Each of its days corresponds to a tithi, and a household customarily keeps the day matching the tithi on which their person died, not the Gregorian anniversary.",
      datesHeading: "Why there are no dates in this table",
      dates:
        "Because we would have to make them up. The ladder below is the rule, and the rule is a definition: it is true this year, next year and in 1926. The Gregorian dates it lands on in 2026 come out of an almanac, we have not contracted one, and we would rather send you to a panchang that has than print sixteen numbers we cannot stand behind. When a provider is named and a person here has checked a sample of days against it, the dates appear on this page and the label at the top of it changes.",
      cols: { n: "Day", tithi: "Tithi", kept: "How it is kept" },
      defaultKept:
        "Kept by the households whose person died on this tithi. No further convention attaches to it.",
      conventionHeading: "On the named days",
      convention:
        "The attributions above are regional conventions rather than settled law. They differ between communities, sometimes between two families in one street, and a purohit who follows a different one is not making an error. Snanify holds no position on which is correct; we print the common conventions so that you can recognise the name when someone uses it, and ask your own family's purohit.",
      unknownHeading: "If the tithi is not known",
      unknown:
        "Then the fortnight has already answered the question: Sarva Pitru Amavasya, the last of the sixteen, is kept for all the departed of a line together and for those whose day is not recorded. It is not a fallback and it is not a lesser observance. For families two or three generations out of India it is very often the honest answer, and it is the one the tradition wrote down for exactly this case.",
    },
    finding: {
      eyebrow: "Working it out",
      title: "If all you have is a date on a certificate.",
      lede: "This is the sequence, and it needs a panchang for the year of the death rather than a converter for this one. It takes about ten minutes and does not need us.",
      steps: [
        {
          n: "01",
          t: "Fix the moment, not the date",
          d: "Write down the date, the time of day and the place of death. All three matter. If the death was between midnight and sunrise, the panchang day is the previous calendar day, and starting from the certificate date alone puts you one day out before you begin.",
        },
        {
          n: "02",
          t: "Read the tithi for that moment",
          d: "Look up a panchang for that place and that year, and read off the tithi and paksha in force at that moment: for example krishna paksha, navami. That pair, and not the Gregorian date, is what the family keeps.",
        },
        {
          n: "03",
          t: "Note which reckoning the panchang used",
          d: "If it gives a month-name with the tithi, ask whether that panchang is amanta or purnimanta. Record both names if you can. A tithi written down without its reckoning is the single commonest way a shraddha date is lost between two generations.",
        },
        {
          n: "04",
          t: "Find that tithi inside the fortnight",
          d: "In any later year, the day of Pitru Paksha bearing that tithi is the day. That is the whole of the rule, and it is why the Gregorian date moves and the observance does not. Where the tithi falls outside the fortnight, or the death was by accident or violence, or the person had taken sannyasa, the named days above apply and a purohit will tell you which.",
        },
      ],
      closing:
        "If your family already keeps a day, keep it. This page is here for the households that lost the thread, not to relitigate a practice that has been observed for forty years.",
    },
    occasions: {
      eyebrow: "The occasions we keep",
      title: "Tithi, reckoning, window.",
      lede: "Every occasion in the Snanify calendar, with the rule that decides its tithi, the part of the day the rule is applied at, and the windows the rite is held in. The month, where we can state one, is a range rather than a date, for the reason given above.",
      cols: {
        occasion: "Occasion",
        tithi: "Tithi rule",
        reckoning: "Decided at",
        windows: "Windows",
        when: "Falls in",
      },
      datedHeading: "Dated occasions, twelve months ahead",
      recurringHeading: "The monthly rhythm",
      recurringLede:
        "Four occasions return on their own schedule regardless of what else the year is doing, and they are the ones a family abroad can actually plan around, because there is another one along in a month.",
    },
    tithiKinds: {
      tithi: (paksha: string, n: number) => `${paksha}, tithi ${n}`,
      range: (paksha: string) => `Every tithi of the ${paksha} in turn`,
      month: "A whole lunar month, every day of it",
      ingress: "Not a tithi: the sun's entry into a sign",
      manual: "Set by hand; no published rule yet",
    },
    paksha: {
      shukla: "Shukla paksha, the bright fortnight",
      krishna: "Krishna paksha, the dark fortnight",
      both: "Both fortnights",
    },
    clock: {
      eyebrow: "The same hour, eight clocks",
      title: "What a ghat window reads as where you are.",
      lede: "A window at the ghat is one moment in time. What your wall calendar calls it depends entirely on where you are standing, and for the western diaspora the most important window of the day falls on the previous evening. We print both clocks and never only the converted one.",
      assumptionHeading: "What this table assumes",
      assumption:
        "Illustration only. The four windows are rules measured from sunrise, from the sun's transit and from sunset, so they cannot be shown as clock times without assuming those three moments. We assume 06:00, 12:00 and 18:00 IST on 15 September 2026, round numbers chosen to keep the arithmetic legible. This is not a panchang date, no occasion falls on it, and no tithi is claimed for it. The offsets in the left column, on the other hand, are exact for that date.",
      atTheGhat: "At the ghat",
      ghatZone: "Asia/Kolkata, IST",
      place: "Where you are",
      offsetCol: "Gap from IST",
      legend:
        "A time set in the spot colour falls on a different calendar date from the ghat's. The date is printed under every time so that you never have to work that out.",
      dstNote:
        "The United States, Canada, the United Kingdom and Australia all move their clocks; India does not. The gap in the left column therefore changes twice a year, and it is stated for the reference date rather than as a standing fact. Around the changeover weeks it is worth checking again.",
      windowCols: { window: "Window", length: "Length", rule: "Definition" },
      previousDay: "previous day",
      nextDay: "next day",
    },
    close: {
      title: "That is the whole of the reference.",
      lede: "If it answered your question, it has done its job and you owe us nothing. If you would rather someone stood at the water and did it on your behalf, that is the other half of this site, and it is set out in full before anyone asks you for anything.",
      links: [
        {
          href: "/muhurat",
          label: "The muhurat calendar",
          note: "The same occasions, at length, with the windows and the provenance of every timing.",
        },
        {
          href: "/rivers",
          label: "The six waters",
          note: "Where the rites are performed, and what each ghat does and does not keep.",
        },
        {
          href: "/how-it-works",
          label: "How it works",
          note: "What is actually done, by whom, and what is sent back to you afterwards.",
        },
        {
          href: "/ethics",
          label: "What we will not sell",
          note: "The commitments this page is written under, including why there is no reminder campaign attached to it.",
        },
      ],
      note: "We do not send reminders during Pitru Paksha, and there is no mailing list on this page to join. If you want the dates again next year, bookmark it.",
    },
  },

  hi: {
    meta: {
      title: "पंचांग: तिथि, पितृ पक्ष और श्राद्ध के दिन, आपके समयक्षेत्र में",
      description:
        "विदेश में बसे परिवारों के लिए निःशुल्क संदर्भ। पितृ पक्ष की सोलह श्राद्ध तिथियाँ, दैनिक बेलाएँ, अमांत और पूर्णिमांत गणना एक ही कर्म को दो भिन्न दिनों पर क्यों ले जाती है, और प्रत्येक समय IST में तथा न्यूयॉर्क, टोरंटो, सैन फ़्रांसिस्को, लंदन, दुबई, सिंगापुर और सिडनी में।",
    },
    hero: {
      eyebrow: "निःशुल्क संदर्भ",
      title: "तिथि खिसकती है। दीवार का कैलेंडर नहीं।",
      lede: "हर वर्ष दिन सरकता है, और हर वर्ष विदेश में बसा कोई परिवार वही प्रश्न पूछता है, एक पक्ष देर से। यह पृष्ठ वही रखता है जो नियम वास्तव में कहते हैं: कौन-सी तिथि, दिन किस आधार पर निश्चित होता है, वह किस बेला में पड़ती है, और आपकी अपनी घड़ी पर वह बेला क्या पढ़ी जाएगी।",
      free: "यहाँ कुछ भी बंद नहीं है। न ईमेल, न खाता, न कोई गिनती, और लौटकर आने का कोई कारण नहीं, सिवाय इसके कि यह काम आए।",
    },
    provenance: {
      heading: "पहले यह पढ़िए",
      extra:
        "यह बात इस पृष्ठ पर पूरी तरह लागू है। नीचे आपको नियम, परिभाषाएँ और गणित मिलेंगे, जिन सबका औचित्य हम आज दे सकते हैं। जो नहीं मिलेगा वह है किसी तिथि की अंग्रेज़ी तारीख़, क्योंकि उस तक पहुँचने के लिए वह पंचांग चाहिए जो अभी नियुक्त नहीं हुआ, और श्राद्ध के पृष्ठ पर आत्मविश्वास से छपी ग़लत तारीख़ इस साइट की सबसे बड़ी भूल होगी।",
    },
    drift: {
      eyebrow: "तारीख़ क्यों बदलती है",
      title: "वर्ष में ग्यारह दिन, और फिर एक मास पीछे।",
      lede: "तिथि तारीख़ नहीं है। वह एक चांद्र मास का तीसवाँ भाग है, वह समय जिसमें चंद्र सूर्य से बारह अंश आगे बढ़ता है, और उसकी अवधि लगभग उन्नीस से छब्बीस घंटों तक होती है। बारह चांद्र मास लगभग 354 दिन के होते हैं, जबकि अंग्रेज़ी वर्ष 365 का।",
      points: [
        {
          n: "०१",
          t: "ग्यारह दिन का सरकाव",
          d: "चांद्र वर्ष लगभग ग्यारह दिन छोटा है, इसलिए जो तिथि इस वर्ष सितंबर के अंत में पड़ी वह अगले वर्ष सितंबर के मध्य में पड़ेगी। तीन वर्षों में यह अंतर एक मास हो जाता है। यही कारण है कि पिता का श्राद्ध और पासपोर्ट पर लिखी पुण्यतिथि दो भिन्न वस्तुएँ हैं, और उनमें से एक ही सही है।",
        },
        {
          n: "०२",
          t: "बीच में जोड़ा गया मास",
          d: "लगभग हर साढ़े बत्तीस मास पर एक अतिरिक्त चांद्र मास, अधिक मास, जोड़ा जाता है ताकि पंचांग सूर्य के साथ लौट आए। उस वर्ष पर्व ग्यारह दिन पीछे नहीं, लगभग उन्नीस दिन आगे चला जाता है। जिस परिवार ने आदतन ग्यारह दिन घटाना सीख लिया है, वह ठीक उसी वर्ष चूकता है जिस वर्ष यह सबसे महत्वपूर्ण था।",
        },
        {
          n: "०३",
          t: "तिथि मध्यरात्रि से आरंभ नहीं होती",
          d: "तिथि उसी क्षण आरंभ और समाप्त होती है जिस क्षण चंद्र अपने अंश तक पहुँचता है, और हिंदू दिवस मध्यरात्रि नहीं, सूर्योदय पर बदलता है। अतः कोई तिथि मंगलवार दोपहर आरंभ होकर बुधवार संध्या समाप्त हो सकती है, और इन दो दिनों में से कौन-सा दिन कर्म धारण करेगा, यह नियम का प्रश्न है, रुचि का नहीं।",
        },
      ],
    },
    reckoning: {
      eyebrow: "यही वह भाग है जिसे लोग साझा करते हैं",
      title: "दो पंचांग, एक ही चंद्र।",
      lede: "एक ही परिवार की दो शाखाएँ, दोनों पूर्णतः सही, एक ही श्राद्ध को मास भर के अंतर से क्यों मानती हैं, इसका सबसे बड़ा कारण यही है। यह धर्म का मतभेद नहीं है। यह इस बात का मतभेद है कि मास कहाँ काटा जाए।",
      amanta: {
        name: "अमांत",
        cut: "मास अमावस्या पर समाप्त होता है। अमावस्या अंतिम दिन है; मास शुक्ल पक्ष की प्रतिपदा से आरंभ होता है।",
        where:
          "गुजरात, महाराष्ट्र, गोवा, कर्नाटक, आंध्र प्रदेश और तेलंगाना में प्रचलित, तथा तमिलनाडु और केरल के सौर पंचांगों के साथ चलने वाली चांद्र गणना में भी।",
      },
      purnimanta: {
        name: "पूर्णिमांत",
        cut: "मास पूर्णिमा पर समाप्त होता है। पूर्णिमा अंतिम दिन है; मास कृष्ण पक्ष की प्रतिपदा से आरंभ होता है।",
        where:
          "समूचे उत्तर भारत में प्रचलित: उत्तर प्रदेश, बिहार, मध्य प्रदेश, राजस्थान, पंजाब, हरियाणा, उत्तराखंड, हिमाचल प्रदेश और नेपाल।",
      },
      agreeHeading: "जहाँ दोनों सहमत हैं",
      agree:
        "प्रत्येक शुक्ल पक्ष पर। शुक्ल पक्ष के किसी भी दिन का मास-नाम दोनों गणनाओं में एक ही रहता है, इसीलिए राम नवमी, गणेश चतुर्थी और प्रत्येक पूर्णिमा का नाम सर्वत्र समान है।",
      differHeading: "जहाँ दोनों भिन्न हैं",
      differ:
        "प्रत्येक कृष्ण पक्ष पर, और केवल नाम में। कृष्ण पक्ष के दिन को पूर्णिमांत आगामी मास का नाम देता है और अमांत वर्तमान मास का, अतः पूर्णिमांत नाम एक मास आगे चलता है। दिन स्वयं एक घंटा भी नहीं हिलते।",
      pairsHeading: "एक ही पक्ष, दो नाम",
      pairsCols: { occasion: "पर्व", purnimanta: "पूर्णिमांत नाम", amanta: "अमांत नाम" },
      ghatsHeading: "किस घाट पर मास का नाम कौन-सी गणना देती है",
      ghatsLede:
        "हमारे छह जलों में से चार पूर्णिमांत क्षेत्र में हैं और दो अमांत में। इससे कर्म में कुछ नहीं बदलता; तिथि के साथ छपने वाला मास बदलता है।",
      schemes: { amanta: "अमांत", purnimanta: "पूर्णिमांत" },
    },
    divergence: {
      eyebrow: "दो घरों में अंतर के चार कारण",
      title: "और इनमें से कोई भी यह नहीं कि कोई एक ग़लत है।",
      lede: "यदि पुणे वाले चाचा और लखनऊ वाली माताजी कभी एक दिन पर सहमत नहीं हुए, तो पूरी बात यही है। इनमें दो नाम के हैं और दो गणना के।",
      items: [
        {
          n: "०१",
          t: "मास का नाम",
          d: "अमांत और पूर्णिमांत एक ही कृष्ण पक्ष को एक मास के अंतर से भिन्न नाम देते हैं। जो तिथि मास और तिथि के रूप में स्मरण रखी गई हो और दूसरी गणना से पढ़ी जाए, वह पूरे एक चांद्र मास दूर जा पड़ती है। सबसे बड़ा कारण यही है, और प्रायः यही होता है।",
        },
        {
          n: "०२",
          t: "दिन कहाँ कटता है",
          d: "हिंदू दिवस सूर्योदय से सूर्योदय तक चलता है। रात्रि दो बजे हुआ देहावसान उस पंचांग दिवस का है जो पिछली भोर आरंभ हुआ था, न कि उस तारीख़ का जो अस्पताल ने लिखी। जो परिवार प्रमाणपत्र की तारीख़ लेकर गणना आरंभ करते हैं, वे प्रायः आरंभ में ही एक दिन चूक जाते हैं।",
        },
        {
          n: "०३",
          t: "दिन का कौन-सा भाग निर्णय करता है",
          d: "जो तिथि दो प्रातःकालों में फैली हो, उसे किसी एक को सौंपना पड़ता है। सामान्य कर्म सूर्योदय पर विद्यमान तिथि लेते हैं, उदयव्यापिनी। श्राद्ध नहीं: वह अपराह्न से निश्चित होता है, दिनमान के पाँच समान भागों में चौथा। एक ही तिथि पर दो नियम लगाने वाले दो पंचांग दो भिन्न दिन बताएँगे, और दोनों नियम का ही पालन कर रहे होंगे।",
        },
        {
          n: "०४",
          t: "सूर्योदय कहाँ का लिया गया, और गणना किस पद्धति से",
          d: "तिथि पृथ्वी भर में एक ही क्षण समाप्त होती है, पर सूर्योदय नहीं, इसलिए वह किस नागरिक दिवस पर पड़ेगी यह उस स्थान पर निर्भर है जिसके लिए पंचांग बना है। इसके ऊपर, दृक् सिद्धांत पंचांग वेधसिद्ध ग्रह-स्थितियाँ लेते हैं और वाक्य पंचांग पुरानी सारणियाँ, और सीमा पर दोनों में एक दिन का अंतर आ सकता है। किसी को भूल का दोषी मानने से पहले पूछ लीजिए कि आपके परिवार का पंचांग किस स्थान का है और किस पद्धति का।",
        },
      ],
    },
    pitru: {
      eyebrow: "पितृ पक्ष 2026",
      title: "सोलह तिथियाँ, क्रम से।",
      lede: "यह पक्ष भाद्रपद की पूर्णिमा से अगली अमावस्या तक चलता है। इसका प्रत्येक दिन एक तिथि से जुड़ा है, और परिवार प्रायः उसी तिथि को श्राद्ध करते हैं जिस तिथि को उनके स्वजन का देहावसान हुआ था, अंग्रेज़ी पुण्यतिथि को नहीं।",
      datesHeading: "इस सूची में तारीख़ें क्यों नहीं हैं",
      dates:
        "क्योंकि हमें उन्हें गढ़ना पड़ता। नीचे दी गई सीढ़ी नियम है, और नियम परिभाषा है: वह इस वर्ष भी सत्य है, अगले वर्ष भी, और 1926 में भी था। 2026 में वह किन अंग्रेज़ी तारीख़ों पर पड़ेगी, यह पंचांग से निकलता है; हमने कोई पंचांग नियुक्त नहीं किया, और सोलह ऐसी संख्याएँ छापने से बेहतर है कि हम आपको उस पंचांग तक भेजें जिसने यह काम किया है। जब स्रोत नियुक्त हो जाएगा और यहाँ का कोई उत्तरदायी व्यक्ति कुछ दिनों का मिलान कर लेगा, तब तारीख़ें इसी पृष्ठ पर आ जाएँगी और ऊपर लगा अंकन भी बदल जाएगा।",
      cols: { n: "दिन", tithi: "तिथि", kept: "किसके लिए" },
      defaultKept:
        "वे घर जिनके स्वजन का देहावसान इसी तिथि को हुआ था। इससे आगे इस दिन से कोई विशेष परंपरा नहीं जुड़ी।",
      conventionHeading: "नाम वाले दिनों पर",
      convention:
        "ऊपर दी गई परंपराएँ क्षेत्रीय प्रथाएँ हैं, कोई निश्चित विधान नहीं। ये समुदायों में भिन्न हैं, कभी एक ही गली के दो घरों में भी, और जो पुरोहित दूसरी प्रथा मानते हैं वे भूल नहीं कर रहे। कौन-सी सही है, इस पर स्नानिफ़ाई का कोई मत नहीं; हम प्रचलित प्रथाएँ इसलिए छापते हैं कि जब कोई यह नाम ले तो आप उसे पहचान सकें, और अपने परिवार के पुरोहित से पूछ सकें।",
      unknownHeading: "यदि तिथि ज्ञात न हो",
      unknown:
        "तो पक्ष ने यह प्रश्न पहले ही हल कर रखा है: सोलह में अंतिम, सर्व पितृ अमावस्या, वंश के समस्त दिवंगतों के लिए है और उनके लिए भी जिनका दिन अभिलेख में नहीं। यह कोई विकल्प मात्र नहीं है और न ही छोटा कर्म। भारत से दो-तीन पीढ़ी दूर बसे परिवारों के लिए प्रायः यही सच्चा उत्तर है, और परंपरा ने इसे ठीक इसी स्थिति के लिए लिखा था।",
    },
    finding: {
      eyebrow: "स्वयं निकालिए",
      title: "यदि आपके पास केवल प्रमाणपत्र की तारीख़ है।",
      lede: "क्रम यही है, और इसके लिए इस वर्ष का परिवर्तक नहीं, देहावसान के वर्ष का पंचांग चाहिए। इसमें लगभग दस मिनट लगते हैं और हमारी आवश्यकता नहीं।",
      steps: [
        {
          n: "०१",
          t: "तारीख़ नहीं, क्षण निश्चित कीजिए",
          d: "देहावसान की तारीख़, दिन का समय और स्थान, तीनों लिखिए। तीनों आवश्यक हैं। यदि देहावसान मध्यरात्रि और सूर्योदय के बीच हुआ हो तो पंचांग दिवस पिछला दिन है, और केवल प्रमाणपत्र की तारीख़ से आरंभ करने पर आप पहले ही चरण में एक दिन चूक जाते हैं।",
        },
        {
          n: "०२",
          t: "उस क्षण की तिथि पढ़िए",
          d: "उस स्थान और उस वर्ष का पंचांग देखिए और उस क्षण विद्यमान तिथि तथा पक्ष लिख लीजिए: जैसे कृष्ण पक्ष, नवमी। परिवार यही जोड़ा मानता है, अंग्रेज़ी तारीख़ नहीं।",
        },
        {
          n: "०३",
          t: "यह भी लिखिए कि पंचांग किस गणना का था",
          d: "यदि वह तिथि के साथ मास का नाम भी दे तो पूछिए कि वह पंचांग अमांत है या पूर्णिमांत। हो सके तो दोनों नाम लिख लीजिए। गणना बताए बिना लिखी गई तिथि ही वह सबसे सामान्य कारण है जिससे श्राद्ध का दिन दो पीढ़ियों के बीच खो जाता है।",
        },
        {
          n: "०४",
          t: "उस तिथि को पक्ष के भीतर खोजिए",
          d: "आगे किसी भी वर्ष में, पितृ पक्ष का जो दिन उस तिथि को धारण करता है, वही दिन है। पूरा नियम इतना ही है, और इसीलिए अंग्रेज़ी तारीख़ बदलती है और कर्म नहीं। जहाँ तिथि पक्ष से बाहर पड़े, अथवा देहावसान दुर्घटना या हिंसा से हुआ हो, अथवा उन्होंने संन्यास लिया हो, वहाँ ऊपर दिए नाम वाले दिन लागू होते हैं और पुरोहित बता देंगे कि कौन-सा।",
        },
      ],
      closing:
        "यदि आपका परिवार पहले से कोई दिन मानता आ रहा है, तो वही मानिए। यह पृष्ठ उन घरों के लिए है जिनसे यह सूत्र छूट गया, चालीस वर्ष से चली आ रही प्रथा पर पुनर्विचार कराने के लिए नहीं।",
    },
    occasions: {
      eyebrow: "जिन पर्वों को हम मानते हैं",
      title: "तिथि, निर्णय, बेला।",
      lede: "स्नानिफ़ाई के पंचांग का प्रत्येक पर्व, उस नियम के साथ जो उसकी तिथि निश्चित करता है, दिन के उस भाग के साथ जिस पर नियम लगाया जाता है, और उन बेलाओं के साथ जिनमें कर्म होता है। जहाँ मास बता सकते हैं वहाँ मास की अवधि दी है, तारीख़ नहीं, कारण ऊपर लिखा है।",
      cols: {
        occasion: "पर्व",
        tithi: "तिथि नियम",
        reckoning: "निर्णय",
        windows: "बेलाएँ",
        when: "कब",
      },
      datedHeading: "आगामी बारह मास के तिथि-बद्ध पर्व",
      recurringHeading: "मासिक लय",
      recurringLede:
        "चार पर्व अपने क्रम से लौटते रहते हैं, वर्ष में और चाहे जो हो, और विदेश में बसा परिवार वास्तव में इन्हीं की योजना बना सकता है, क्योंकि अगला एक मास में फिर आ जाता है।",
    },
    tithiKinds: {
      tithi: (paksha: string, n: number) => `${paksha}, तिथि ${n}`,
      range: (paksha: string) => `${paksha} की प्रत्येक तिथि, क्रम से`,
      month: "पूरा चांद्र मास, उसका हर दिन",
      ingress: "तिथि नहीं: सूर्य का राशि-प्रवेश",
      manual: "हाथ से नियत; अभी कोई प्रकाशित नियम नहीं",
    },
    paksha: {
      shukla: "शुक्ल पक्ष",
      krishna: "कृष्ण पक्ष",
      both: "दोनों पक्ष",
    },
    clock: {
      eyebrow: "एक ही बेला, आठ घड़ियाँ",
      title: "घाट की बेला आपके यहाँ क्या पढ़ी जाएगी।",
      lede: "घाट की एक बेला समय का एक ही क्षण है। आपका दीवार-कैलेंडर उसे क्या कहेगा, यह पूरी तरह इस पर निर्भर है कि आप कहाँ खड़े हैं, और पश्चिम में बसे परिवारों के लिए दिन की सबसे महत्वपूर्ण बेला पिछली संध्या को पड़ती है। हम दोनों घड़ियाँ छापते हैं, कभी केवल रूपांतरित घड़ी नहीं।",
      assumptionHeading: "यह सारणी क्या मान लेती है",
      assumption:
        "केवल उदाहरण। चारों बेलाएँ सूर्योदय, सूर्य के मध्याह्न और सूर्यास्त से नापे गए नियम हैं, अतः इन तीन क्षणों को माने बिना उन्हें घड़ी के समय में नहीं दिखाया जा सकता। हम 15 सितंबर 2026 को 06:00, 12:00 और 18:00 IST मान रहे हैं, ये गोल संख्याएँ केवल गणित को स्पष्ट रखने के लिए हैं। यह कोई पंचांग तिथि नहीं है, उस दिन कोई पर्व नहीं पड़ता, और उसके लिए कोई तिथि नहीं बताई जा रही। बाईं ओर दिए अंतर, इसके विपरीत, उस तारीख़ के लिए यथार्थ हैं।",
      atTheGhat: "घाट पर",
      ghatZone: "एशिया/कोलकाता, IST",
      place: "आप कहाँ हैं",
      offsetCol: "IST से अंतर",
      legend:
        "जो समय स्पॉट रंग में है वह घाट से भिन्न नागरिक तारीख़ पर पड़ता है। हर समय के नीचे तारीख़ छपी है, ताकि यह गणना आपको कभी न करनी पड़े।",
      dstNote:
        "अमेरिका, कनाडा, यूनाइटेड किंगडम और ऑस्ट्रेलिया, चारों अपनी घड़ियाँ आगे-पीछे करते हैं; भारत नहीं करता। इसलिए बाईं ओर का अंतर वर्ष में दो बार बदलता है, और वह स्थायी तथ्य के रूप में नहीं, संदर्भ तारीख़ के लिए दिया गया है। घड़ी बदलने वाले सप्ताहों के आसपास एक बार पुनः देख लेना उचित है।",
      windowCols: { window: "बेला", length: "अवधि", rule: "परिभाषा" },
      previousDay: "पिछला दिन",
      nextDay: "अगला दिन",
    },
    close: {
      title: "संदर्भ इतना ही है।",
      lede: "यदि इससे आपका प्रश्न हल हुआ तो इसका काम पूरा हुआ और आप पर कुछ शेष नहीं। यदि आप चाहते हैं कि कोई जल के किनारे खड़े होकर यह आपकी ओर से करे, तो यह इस साइट का दूसरा भाग है, और आपसे कुछ माँगे जाने से पहले वह पूरा लिखा हुआ है।",
      links: [
        {
          href: "/muhurat",
          label: "मुहूर्त पंचांग",
          note: "वही पर्व, विस्तार से, बेलाओं और प्रत्येक समय के स्रोत सहित।",
        },
        {
          href: "/rivers",
          label: "छह पवित्र जल",
          note: "कर्म कहाँ संपन्न होते हैं, और कौन-सा घाट क्या मानता है और क्या नहीं।",
        },
        {
          href: "/how-it-works",
          label: "कैसे काम करता है",
          note: "वास्तव में क्या किया जाता है, किसके द्वारा, और उसके बाद आपको क्या भेजा जाता है।",
        },
        {
          href: "/ethics",
          label: "जो हम नहीं बेचते",
          note: "वे वचन जिनके अधीन यह पृष्ठ लिखा गया है, यह भी कि इससे कोई स्मरण-अभियान क्यों नहीं जुड़ा।",
        },
      ],
      note: "पितृ पक्ष में हम कोई स्मरण-संदेश नहीं भेजते, और इस पृष्ठ पर जुड़ने के लिए कोई सूची नहीं है। अगले वर्ष फिर तिथियाँ चाहिए हों तो इसे सहेज लीजिए।",
    },
  },
} satisfies Record<Lang, unknown>;

export type PanchangCopy = (typeof panchangContent)["en"];

/* --- load-time assertions -------------------------------------------------
   The reference day is shared with the /muhurat worked example on purpose. If
   either side is edited without the other, the two pages would quietly print
   different clock times for the same window, which is precisely the class of
   error the rest of this codebase spends its type system preventing.       */

const brahmaSpan = WINDOW_SPANS.find((w) => w.id === "brahma");

if (!brahmaSpan) {
  throw new Error("panchang: no brahma window span, the window records have changed");
}

if (brahmaSpan.start !== MUHURAT.workedExample.instantUtc) {
  throw new Error(
    `panchang: reference day drifted from the /muhurat worked example, ` +
      `${brahmaSpan.start} against ${MUHURAT.workedExample.instantUtc}`,
  );
}

if (MUHURAT.workedExample.assumedSunriseIst !== REFERENCE_ANCHORS_IST.sunrise) {
  throw new Error(
    `panchang: assumed sunrise drifted, ` +
      `${MUHURAT.workedExample.assumedSunriseIst} against ${REFERENCE_ANCHORS_IST.sunrise}`,
  );
}
