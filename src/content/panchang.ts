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
      en: "The same sixteen days under two month names. A family that remembers its shraddha tithi as a month plus a tithi, and reads it in the other reckoning, lands a whole month out.",
      hi: "एक ही सोलह दिन, दो मास-नामों से। जो परिवार अपनी श्राद्ध तिथि को मास और तिथि के रूप में याद रखता है और उसे दूसरी गणना में पढ़ता है, वह पूरा एक मास दूर जा पड़ता है।",
    },
  },
  {
    id: "janmashtami",
    occasion: { en: "Krishna Janmashtami", hi: "कृष्ण जन्माष्टमी" },
    purnimanta: { en: "Bhadrapada Krishna Ashtami", hi: "भाद्रपद कृष्ण अष्टमी" },
    amanta: { en: "Shravana Krishna Ashtami", hi: "श्रावण कृष्ण अष्टमी" },
    note: {
      en: "The easiest one to check at home. North and west India name the same night differently every year.",
      hi: "घर में जाँचने के लिए सबसे सरल उदाहरण। उत्तर और पश्चिम भारत हर वर्ष उसी रात को अलग नाम देते हैं।",
    },
  },
  {
    id: "mahashivratri",
    occasion: { en: "Mahashivratri", hi: "महाशिवरात्रि" },
    purnimanta: { en: "Phalguna Krishna Chaturdashi", hi: "फाल्गुन कृष्ण चतुर्दशी" },
    amanta: { en: "Magha Krishna Chaturdashi", hi: "माघ कृष्ण चतुर्दशी" },
    note: {
      en: "One night, named for two different months. Everyone keeps it on the same night, and only the month name differs.",
      hi: "एक ही रात, दो अलग मासों के नाम से। सब इसे उसी रात मनाते हैं, केवल मास का नाम अलग है।",
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
      en: "Kept for the mothers of the line, and in many households specifically for a married woman who died before her husband.",
      hi: "वंश की माताओं के लिए, और अनेक घरों में विशेष रूप से उस सुहागिन के लिए जिनका देहावसान पति से पूर्व हुआ।",
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
      en: "Kept for those who died by accident, by weapon or by violence. Many traditions hold that an ordinary death belongs elsewhere in the fortnight, so a family is sometimes told that its remembered tithi does not apply here.",
      hi: "उनके लिए जिनका देहावसान दुर्घटना, शस्त्र अथवा हिंसा से हुआ। अनेक परंपराएँ मानती हैं कि सामान्य मृत्यु का श्राद्ध पक्ष के किसी अन्य दिन का है; इसी कारण कुछ परिवारों से कहा जाता है कि उनकी स्मरण की हुई तिथि यहाँ लागू नहीं होती।",
    },
  },
  {
    n: 16,
    tithi: { en: "Amavasya", hi: "अमावस्या" },
    alsoCalled: { en: "Sarva Pitru Amavasya, Mahalaya Amavasya", hi: "सर्व पितृ अमावस्या, महालया अमावस्या" },
    kept: {
      en: "The day the fortnight closes, kept for all the departed of a line together, and for anyone whose tithi went unrecorded.",
      hi: "पक्ष के समापन का दिन, जो वंश के समस्त दिवंगतों के लिए है, और उनके लिए भी जिनकी तिथि अभिलेख में नहीं रही।",
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
      title: "Panchang {year}: today's tithi, Pitru Paksha and the shraddha days, in your time zone",
      description:
        "A free reference for families outside India. The sixteen shraddha tithis of Pitru Paksha, the daily windows, why amanta and purnimanta reckoning name the same day differently, and every timing in IST and in seven cities abroad.",
    },
    hero: {
      title: "A panchang reference for families abroad",
      lede: "The shraddha day moves every year, and the question usually comes up a fortnight too late. Here are the dates for the twelve months ahead, the sixteen shraddha days, the hour on your own clock, and the rules that decide them.",
    },
    provenance: {
      heading: "Where the timings come from",
      extra:
        "The dates in the calendar above come from those rules and roll forward by themselves each morning. Everything below is a rule, a definition or arithmetic.",
    },
    drift: {
      title: "Why the date moves",
      lede: "A tithi is one thirtieth of a lunar month, the time the moon takes to gain twelve degrees on the sun. It lasts anywhere from about nineteen to about twenty-six hours. Twelve lunar months come to about 354 days, against 365 in the calendar year.",
      points: [
        {
          t: "The eleven-day slip",
          d: "The lunar year is about eleven days short. A tithi that fell in late September this year falls in mid September next year, and over three years the drift is a month. That is why a father's shraddha and the date on his death certificate are two different things.",
        },
        {
          t: "The inserted month",
          d: "About every thirty-two and a half months an extra lunar month, the adhika masa, is added to bring the calendar back in line with the sun. In that year the occasion moves about nineteen days later instead of eleven days earlier. A family that subtracts eleven days by habit is wrong in the one year it matters.",
        },
        {
          t: "A tithi has its own start and end",
          d: "A tithi begins and ends at the hour the moon reaches its mark, and the Hindu day turns at sunrise. So a tithi can begin on Tuesday afternoon and end on Wednesday evening. Which of the two days carries the observance is settled by a rule, given below.",
        },
      ],
    },
    reckoning: {
      title: "Amanta and purnimanta",
      lede: "Two branches of one family often keep the same shraddha a month apart, and both are right. The two reckonings cut the month at different points, and the name of the dark fortnight moves with the cut. This is the most common cause.",
      amanta: {
        name: "Amanta",
        cut: "The month ends at the new moon. Amavasya is the last day, and the month opens on the first day of the bright fortnight.",
        where:
          "Followed in Gujarat, Maharashtra, Goa, Karnataka, Andhra Pradesh and Telangana, and in the lunar reckoning used alongside the solar calendars of Tamil Nadu and Kerala.",
      },
      purnimanta: {
        name: "Purnimanta",
        cut: "The month ends at the full moon. Purnima is the last day, and the month opens on the first day of the dark fortnight.",
        where:
          "Followed across the north: Uttar Pradesh, Bihar, Madhya Pradesh, Rajasthan, Punjab, Haryana, Uttarakhand, Himachal Pradesh and Nepal.",
      },
      agreeHeading: "Where they agree",
      agree:
        "On every bright fortnight. A day in the shukla paksha carries the same month name in both reckonings, which is why Ram Navami, Ganesh Chaturthi and every Purnima are named the same everywhere.",
      differHeading: "Where they differ",
      differ:
        "On every dark fortnight, and only in the name. Purnimanta gives a day in the krishna paksha the following month's name, and amanta gives it the current month's, so the purnimanta name runs one month ahead. The days themselves do not move by an hour.",
      pairsHeading: "Three examples",
      pairsCols: { occasion: "Occasion", purnimanta: "Purnimanta name", amanta: "Amanta name" },
      ghatsHeading: "The reckoning at each ghat",
      ghatsLede:
        "Four of the six waters are in purnimanta regions and two in amanta regions. The month name printed beside a tithi follows the region.",
      schemes: { amanta: "Amanta", purnimanta: "Purnimanta" },
    },
    divergence: {
      title: "Four reasons two households differ",
      lede: "If your uncle in Pune and your mother in Lucknow have never agreed on the day, one of these four is the reason. Both of them are usually right.",
      items: [
        {
          t: "The month name",
          d: "Amanta and purnimanta give the same dark fortnight different month names, one month apart. A tithi remembered as a month plus a tithi, and read in the other reckoning, is a month out. This is the usual cause.",
        },
        {
          t: "Where the day is cut",
          d: "The Hindu day runs from sunrise to sunrise. A death at two in the morning belongs to the panchang day that began at the previous dawn, not to the date on the hospital certificate. A family that converts the certificate date is often one day out from the start.",
        },
        {
          t: "Which part of the day decides",
          d: "A tithi that spans two mornings has to be given to one of them. Ordinary observances take the tithi in force at sunrise, udaya vyapini. Shraddha takes the tithi in force at aparahna, the fourth of five equal parts of the daylight. Two panchangs applying the two rules name two different days, and both follow a rule.",
        },
        {
          t: "Where sunrise is taken, and how it is computed",
          d: "A tithi ends at one instant everywhere on earth, but sunrise does not, so the day it lands on depends on the place the panchang is computed for. Drik siddhanta panchangs use observed positions and vakya panchangs use older tables, and at the edges the two can differ by a day. Ask which place and which system your family's panchang uses.",
        },
      ],
    },
    pitru: {
      title: "Pitru Paksha, the sixteen shraddha days",
      lede: "The fortnight runs from the full moon of Bhadrapada to the next new moon. Each day has its tithi, and a household keeps the day whose tithi matches the one their person died on, not the calendar anniversary.",
      datesHeading: "About the dates",
      dates:
        "The ladder below is a rule, so it holds in every year. The calendar dates it falls on are not listed here yet. Until they are, take them from your family's panchang.",
      cols: { n: "Day", tithi: "Tithi", kept: "How it is kept" },
      defaultKept: "Kept by the households whose person died on this tithi.",
      conventionHeading: "The named days",
      convention:
        "The names above are regional conventions and differ between communities, sometimes between two families on one street. They are printed so you recognise a name when someone uses it. Your own family's purohit has the final word.",
      unknownHeading: "If the tithi is not known",
      unknown:
        "Sarva Pitru Amavasya, the last of the sixteen, is kept for all the departed of a line together and for anyone whose tithi went unrecorded. For families two or three generations out of India this is often the day, and the tradition provides it for this case.",
    },
    finding: {
      title: "Finding the tithi from a date",
      lede: "You need a panchang for the year and place of the death, not a converter for this year. It takes about ten minutes.",
      steps: [
        {
          n: "01",
          t: "Write down the moment",
          d: "Write down the date, the time of day and the place of death. All three matter. If the death fell between midnight and sunrise, the panchang day is the previous calendar day.",
        },
        {
          n: "02",
          t: "Read the tithi for that moment",
          d: "Look up a panchang for that place and year and read the tithi and paksha in force at that moment, for example krishna paksha, navami. That pair is what the family keeps, not the calendar date.",
        },
        {
          n: "03",
          t: "Note which reckoning the panchang uses",
          d: "If the panchang gives a month name with the tithi, find out whether it is amanta or purnimanta, and write down both names if you can. A tithi recorded without its reckoning is the commonest way a shraddha day is lost between generations.",
        },
        {
          n: "04",
          t: "Find that tithi in the fortnight",
          d: "In any later year, the day of Pitru Paksha that carries that tithi is the day. That is the whole rule, and it is why the calendar date moves and the observance does not. If the tithi falls outside the fortnight, or the death was by accident or violence, the named days above apply.",
        },
      ],
      closing: "If your family already keeps a day, keep it. This page is for households that lost the thread.",
    },
    occasions: {
      title: "The occasions in the calendar",
      lede: "Every occasion in the Snanify calendar, with the rule that sets its tithi, the part of the day it is decided at, and the windows it is kept in. The month is given as a range, for the reason above.",
      cols: {
        occasion: "Occasion",
        tithi: "Tithi rule",
        reckoning: "Decided at",
        windows: "Windows",
        when: "Falls in",
      },
      datedHeading: "The next twelve months",
      recurringHeading: "Every month",
      recurringLede:
        "Four occasions come round every month. They are the easiest to plan around from abroad, because the next one is always a few weeks away.",
    },
    tithiKinds: {
      tithi: (paksha: string, n: number) => `${paksha}, tithi ${n}`,
      range: (paksha: string) => `Every tithi of the ${paksha} in turn`,
      month: "A whole lunar month, every day of it",
      ingress: "The sun's entry into a sign, not a tithi",
      manual: "Set by hand, rule to be published",
    },
    paksha: {
      shukla: "Shukla paksha, the bright fortnight",
      krishna: "Krishna paksha, the dark fortnight",
      both: "Both fortnights",
    },
    clock: {
      title: "The ghat's hour on your clock",
      lede: "A window at the ghat is one moment. Its date and hour on your clock depend on where you live, and in the Americas the morning window falls on the previous evening. Both clocks are printed every time.",
      assumptionHeading: "How this table is drawn",
      assumption:
        "The four windows are counted in muhurtas from sunrise, noon and sunset. To show them as clock times the table assumes those three moments, 06:00, 12:00 and 18:00 IST on 15 September 2026, and a 48-minute muhurta, which is its length at the equinox. It is an illustration, and the date carries no occasion. The gaps in the left column are exact for that date.",
      atTheGhat: "At the ghat",
      ghatZone: "Asia/Kolkata, IST",
      place: "Where you are",
      offsetCol: "Gap from IST",
      legend:
        "A time in red falls on a different calendar date from the ghat's. The date is printed under every time.",
      dstNote:
        "The United States, Canada, the United Kingdom and Australia change their clocks twice a year, and India does not. The gap in the left column is given for the reference date. Check it again in the changeover weeks.",
      windowCols: { window: "Window", length: "Length", rule: "Definition" },
      previousDay: "previous day",
      nextDay: "next day",
    },
    close: {
      title: "More on this site",
      lede: "The muhurat calendar carries the same occasions at length. The snan is what you pay for, at the hour this calendar names.",
      links: [
        {
          href: "/muhurat",
          label: "The muhurat calendar",
          note: "The same occasions at length, with every window and where each timing comes from.",
        },
        {
          href: "/rivers",
          label: "The six waters",
          note: "The six places, and what each is known for.",
        },
        {
          href: "/snan",
          label: "How it works",
          note: "The three minutes, part by part, and the Sankalp Patra.",
        },
        {
          href: "/faq#how",
          label: "Our commitments",
          note: "The rules this site is written under.",
        },
      ],
      note: "Bookmark this page for next year.",
    },
  },

  hi: {
    meta: {
      title: "पंचांग {year}: आज की तिथि, पितृ पक्ष और श्राद्ध के दिन, आपके समयक्षेत्र में",
      description:
        "विदेश में बसे परिवारों के लिए निःशुल्क संदर्भ। पितृ पक्ष की सोलह श्राद्ध तिथियाँ, दैनिक बेलाएँ, अमांत और पूर्णिमांत गणना एक ही दिन को अलग नाम क्यों देती हैं, और हर समय IST में तथा विदेश के सात नगरों की घड़ी पर।",
    },
    hero: {
      title: "विदेश में बसे परिवारों के लिए पंचांग संदर्भ",
      lede: "श्राद्ध का दिन हर वर्ष बदलता है, और प्रश्न प्रायः एक पक्ष देर से उठता है। यहाँ आगामी बारह महीनों की तारीख़ें हैं, सोलह श्राद्ध के दिन, आपकी अपनी घड़ी पर वह बेला, और वे नियम जो इन्हें तय करते हैं।",
    },
    provenance: {
      heading: "समय कहाँ से आते हैं",
      extra:
        "ऊपर के पंचांग की तारीख़ें इन्हीं नियमों से आती हैं और हर सुबह अपने आप आगे बढ़ती हैं। नीचे जो कुछ है वह नियम है, परिभाषा है या गणित है।",
    },
    drift: {
      title: "तारीख़ क्यों बदलती है",
      lede: "तिथि चांद्र मास का तीसवाँ भाग है, वह समय जिसमें चंद्र सूर्य से बारह अंश आगे बढ़ता है। उसकी अवधि लगभग उन्नीस से छब्बीस घंटे तक होती है। बारह चांद्र मास लगभग 354 दिन के होते हैं, जबकि अंग्रेज़ी वर्ष 365 दिन का।",
      points: [
        {
          t: "ग्यारह दिन का सरकाव",
          d: "चांद्र वर्ष लगभग ग्यारह दिन छोटा है। जो तिथि इस वर्ष सितंबर के अंत में पड़ी, वह अगले वर्ष सितंबर के मध्य में पड़ेगी, और तीन वर्षों में यह अंतर एक मास हो जाता है। इसी कारण पिता का श्राद्ध और मृत्यु प्रमाणपत्र की तारीख़ दो अलग बातें हैं।",
        },
        {
          t: "बीच में जुड़ा मास",
          d: "लगभग हर साढ़े बत्तीस मास पर एक अतिरिक्त चांद्र मास, अधिक मास, जोड़ा जाता है ताकि पंचांग सूर्य के साथ लौट आए। उस वर्ष पर्व ग्यारह दिन पीछे नहीं, लगभग उन्नीस दिन आगे जाता है। जो परिवार आदत से ग्यारह दिन घटाता है, वह ठीक उसी वर्ष चूकता है।",
        },
        {
          t: "तिथि का अपना आरंभ और अंत है",
          d: "तिथि उसी घड़ी आरंभ और समाप्त होती है जब चंद्र अपने अंश तक पहुँचता है, और हिंदू दिवस सूर्योदय पर बदलता है। इसलिए कोई तिथि मंगलवार दोपहर आरंभ होकर बुधवार संध्या समाप्त हो सकती है। दोनों में से कौन-सा दिन कर्म का है, यह नियम तय करता है, जो नीचे दिया है।",
        },
      ],
    },
    reckoning: {
      title: "अमांत और पूर्णिमांत",
      lede: "एक ही परिवार की दो शाखाएँ प्रायः एक ही श्राद्ध को एक मास के अंतर से करती हैं, और दोनों सही होती हैं। दोनों गणनाएँ मास को अलग जगह काटती हैं, और कृष्ण पक्ष का नाम उसी के साथ बदल जाता है। यही सबसे आम कारण है।",
      amanta: {
        name: "अमांत",
        cut: "मास अमावस्या पर समाप्त होता है। अमावस्या अंतिम दिन है, और मास शुक्ल पक्ष की प्रतिपदा से आरंभ होता है।",
        where:
          "गुजरात, महाराष्ट्र, गोवा, कर्नाटक, आंध्र प्रदेश और तेलंगाना में प्रचलित, तथा तमिलनाडु और केरल के सौर पंचांगों के साथ चलने वाली चांद्र गणना में भी।",
      },
      purnimanta: {
        name: "पूर्णिमांत",
        cut: "मास पूर्णिमा पर समाप्त होता है। पूर्णिमा अंतिम दिन है, और मास कृष्ण पक्ष की प्रतिपदा से आरंभ होता है।",
        where:
          "समूचे उत्तर भारत में प्रचलित: उत्तर प्रदेश, बिहार, मध्य प्रदेश, राजस्थान, पंजाब, हरियाणा, उत्तराखंड, हिमाचल प्रदेश और नेपाल।",
      },
      agreeHeading: "जहाँ दोनों सहमत हैं",
      agree:
        "हर शुक्ल पक्ष पर। शुक्ल पक्ष के किसी भी दिन का मास-नाम दोनों गणनाओं में एक ही रहता है, इसीलिए राम नवमी, गणेश चतुर्थी और हर पूर्णिमा का नाम सब जगह एक है।",
      differHeading: "जहाँ दोनों अलग हैं",
      differ:
        "हर कृष्ण पक्ष पर, और केवल नाम में। कृष्ण पक्ष के दिन को पूर्णिमांत अगले मास का नाम देता है और अमांत चालू मास का, इसलिए पूर्णिमांत नाम एक मास आगे चलता है। दिन स्वयं एक घंटा भी नहीं हिलते।",
      pairsHeading: "तीन उदाहरण",
      pairsCols: { occasion: "पर्व", purnimanta: "पूर्णिमांत नाम", amanta: "अमांत नाम" },
      ghatsHeading: "हर घाट पर कौन-सी गणना",
      ghatsLede:
        "छह जलों में से चार पूर्णिमांत क्षेत्र में हैं और दो अमांत क्षेत्र में। तिथि के साथ छपा मास-नाम क्षेत्र के अनुसार होता है।",
      schemes: { amanta: "अमांत", purnimanta: "पूर्णिमांत" },
    },
    divergence: {
      title: "दो घरों में अंतर के चार कारण",
      lede: "यदि पुणे वाले चाचा और लखनऊ वाली माताजी कभी एक दिन पर सहमत नहीं हुए, तो कारण इन चार में से एक है। प्रायः दोनों सही होते हैं।",
      items: [
        {
          t: "मास का नाम",
          d: "अमांत और पूर्णिमांत एक ही कृष्ण पक्ष को एक मास के अंतर से अलग नाम देते हैं। जो तिथि मास और तिथि के रूप में याद रखी गई हो और दूसरी गणना में पढ़ी जाए, वह एक मास दूर जा पड़ती है। कारण प्रायः यही होता है।",
        },
        {
          t: "दिन कहाँ कटता है",
          d: "हिंदू दिवस सूर्योदय से सूर्योदय तक चलता है। रात दो बजे हुआ देहावसान उस पंचांग दिवस का है जो पिछली भोर आरंभ हुआ था, अस्पताल के प्रमाणपत्र की तारीख़ का नहीं। जो परिवार प्रमाणपत्र की तारीख़ बदलकर गिनता है, वह प्रायः आरंभ में ही एक दिन चूक जाता है।",
        },
        {
          t: "दिन का कौन-सा भाग तय करता है",
          d: "जो तिथि दो प्रातःकालों में फैली हो, उसे किसी एक दिन को देना पड़ता है। सामान्य कर्म सूर्योदय पर चल रही तिथि लेते हैं, उदयव्यापिनी। श्राद्ध अपराह्न की तिथि लेता है, दिनमान के पाँच बराबर भागों में चौथा। दो नियम लगाने वाले दो पंचांग दो अलग दिन बताते हैं, और दोनों नियम का पालन कर रहे होते हैं।",
        },
        {
          t: "सूर्योदय कहाँ का लिया गया, और गणना किस पद्धति से",
          d: "तिथि पूरी पृथ्वी पर एक ही क्षण समाप्त होती है, पर सूर्योदय नहीं, इसलिए वह किस दिन पड़ेगी यह उस स्थान पर निर्भर है जिसके लिए पंचांग बना है। दृक् सिद्धांत पंचांग वेध से मिली ग्रह-स्थितियाँ लेते हैं और वाक्य पंचांग पुरानी सारणियाँ, और सीमा पर दोनों में एक दिन का अंतर आ सकता है। पूछ लीजिए कि आपके परिवार का पंचांग किस स्थान का है और किस पद्धति का।",
        },
      ],
    },
    pitru: {
      title: "पितृ पक्ष, सोलह श्राद्ध दिन",
      lede: "यह पक्ष भाद्रपद की पूर्णिमा से अगली अमावस्या तक चलता है। हर दिन की अपनी तिथि है, और परिवार उस दिन श्राद्ध करता है जिसकी तिथि उनके स्वजन के देहावसान की तिथि से मिलती है, अंग्रेज़ी पुण्यतिथि से नहीं।",
      datesHeading: "तारीख़ों के बारे में",
      dates:
        "नीचे की सूची नियम है, इसलिए हर वर्ष लागू होती है। वह किन अंग्रेज़ी तारीख़ों पर पड़ेगी, यह यहाँ अभी सूचीबद्ध नहीं है। तब तक तारीख़ें अपने परिवार के पंचांग से लीजिए।",
      cols: { n: "दिन", tithi: "तिथि", kept: "किसके लिए" },
      defaultKept: "वे घर जिनके स्वजन का देहावसान इसी तिथि को हुआ था।",
      conventionHeading: "नाम वाले दिन",
      convention:
        "ऊपर के नाम क्षेत्रीय प्रथाएँ हैं और समुदायों में अलग हैं, कभी एक ही गली के दो घरों में भी। ये इसलिए छपे हैं कि जब कोई यह नाम ले तो आप उसे पहचान सकें। अंतिम बात आपके परिवार के पुरोहित की है।",
      unknownHeading: "यदि तिथि ज्ञात न हो",
      unknown:
        "सोलह में अंतिम, सर्व पितृ अमावस्या, वंश के सभी दिवंगतों के लिए है और उनके लिए भी जिनकी तिथि लिखी नहीं रही। भारत से दो-तीन पीढ़ी दूर बसे परिवारों के लिए प्रायः यही दिन है, और परंपरा ने इसे इसी स्थिति के लिए रखा है।",
    },
    finding: {
      title: "तारीख़ से तिथि निकालना",
      lede: "इसके लिए देहावसान के वर्ष और स्थान का पंचांग चाहिए, इस वर्ष का परिवर्तक नहीं। लगभग दस मिनट लगते हैं।",
      steps: [
        {
          n: "०१",
          t: "क्षण लिख लीजिए",
          d: "देहावसान की तारीख़, दिन का समय और स्थान लिखिए। तीनों आवश्यक हैं। यदि देहावसान मध्यरात्रि और सूर्योदय के बीच हुआ हो, तो पंचांग दिवस पिछला दिन है।",
        },
        {
          n: "०२",
          t: "उस क्षण की तिथि पढ़िए",
          d: "उस स्थान और उस वर्ष का पंचांग देखिए और उस क्षण चल रही तिथि और पक्ष पढ़िए, जैसे कृष्ण पक्ष, नवमी। परिवार यही जोड़ा रखता है, अंग्रेज़ी तारीख़ नहीं।",
        },
        {
          n: "०३",
          t: "लिखिए कि पंचांग किस गणना का है",
          d: "यदि पंचांग तिथि के साथ मास का नाम देता है, तो पता कीजिए कि वह अमांत है या पूर्णिमांत, और हो सके तो दोनों नाम लिख लीजिए। गणना बताए बिना लिखी तिथि ही वह सबसे आम कारण है जिससे श्राद्ध का दिन दो पीढ़ियों के बीच खो जाता है।",
        },
        {
          n: "०४",
          t: "उस तिथि को पक्ष में खोजिए",
          d: "आगे किसी भी वर्ष में पितृ पक्ष का जो दिन उस तिथि का है, वही दिन है। पूरा नियम इतना है, और इसीलिए अंग्रेज़ी तारीख़ बदलती है और कर्म नहीं। यदि तिथि पक्ष से बाहर पड़े, या देहावसान दुर्घटना या हिंसा से हुआ हो, तो ऊपर के नाम वाले दिन लागू होते हैं।",
        },
      ],
      closing: "यदि आपका परिवार पहले से कोई दिन मानता है, तो वही मानिए। यह पृष्ठ उन घरों के लिए है जिनसे यह सूत्र छूट गया।",
    },
    occasions: {
      title: "पंचांग के पर्व",
      lede: "स्नानिफ़ाई के पंचांग का हर पर्व, उस नियम के साथ जो उसकी तिथि तय करता है, दिन के उस भाग के साथ जिस पर निर्णय होता है, और उन बेलाओं के साथ जिनमें वह मनाया जाता है। मास अवधि के रूप में दिया है, कारण ऊपर है।",
      cols: {
        occasion: "पर्व",
        tithi: "तिथि नियम",
        reckoning: "निर्णय",
        windows: "बेलाएँ",
        when: "कब",
      },
      datedHeading: "अगले बारह मास",
      recurringHeading: "हर मास",
      recurringLede:
        "चार पर्व हर मास लौटते हैं। विदेश से इन्हीं की योजना सबसे सरल है, क्योंकि अगला सदा कुछ सप्ताह दूर होता है।",
    },
    tithiKinds: {
      tithi: (paksha: string, n: number) => `${paksha}, तिथि ${n}`,
      range: (paksha: string) => `${paksha} की प्रत्येक तिथि, क्रम से`,
      month: "पूरा चांद्र मास, उसका हर दिन",
      ingress: "सूर्य का राशि-प्रवेश, तिथि नहीं",
      manual: "हाथ से नियत, नियम प्रकाशित होना शेष",
    },
    paksha: {
      shukla: "शुक्ल पक्ष",
      krishna: "कृष्ण पक्ष",
      both: "दोनों पक्ष",
    },
    clock: {
      title: "घाट की बेला आपकी घड़ी पर",
      lede: "घाट की बेला एक ही क्षण है। आपकी घड़ी पर उसकी तारीख़ और समय इस पर निर्भर है कि आप कहाँ रहते हैं, और अमेरिका में सुबह की बेला पिछली शाम पड़ती है। दोनों घड़ियाँ हर बार छपी हैं।",
      assumptionHeading: "यह सारणी कैसे बनी है",
      assumption:
        "चारों बेलाएँ सूर्योदय, मध्याह्न और सूर्यास्त से नापी जाती हैं। उन्हें घड़ी के समय में दिखाने के लिए सारणी ये तीन क्षण मान लेती है: 15 सितंबर 2026 को 06:00, 12:00 और 18:00 IST। यह उदाहरण है, और उस दिन कोई पर्व नहीं है। बाईं ओर दिए अंतर उस तारीख़ के लिए सही हैं।",
      atTheGhat: "घाट पर",
      ghatZone: "एशिया/कोलकाता, IST",
      place: "आप कहाँ हैं",
      offsetCol: "IST से अंतर",
      legend:
        "लाल रंग का समय घाट से अलग तारीख़ पर पड़ता है। हर समय के नीचे तारीख़ छपी है।",
      dstNote:
        "अमेरिका, कनाडा, यूनाइटेड किंगडम और ऑस्ट्रेलिया वर्ष में दो बार घड़ी बदलते हैं, भारत नहीं बदलता। बाईं ओर का अंतर संदर्भ तारीख़ के लिए है। घड़ी बदलने वाले सप्ताहों में फिर देख लीजिए।",
      windowCols: { window: "बेला", length: "अवधि", rule: "परिभाषा" },
      previousDay: "पिछला दिन",
      nextDay: "अगला दिन",
    },
    close: {
      title: "इस साइट पर और",
      lede: "मुहूर्त पंचांग में यही पर्व विस्तार से हैं। स्नान वह है जिसका आप मूल्य देते हैं, उसी घड़ी पर जो यह पंचांग बताता है।",
      links: [
        {
          href: "/muhurat",
          label: "मुहूर्त पंचांग",
          note: "यही पर्व विस्तार से, हर बेला के साथ और यह कि हर समय कहाँ से आया।",
        },
        {
          href: "/rivers",
          label: "छह पवित्र जल",
          note: "छहों स्थान, और हर एक किस लिए जाना जाता है।",
        },
        {
          href: "/snan",
          label: "कैसे काम करता है",
          note: "तीन मिनट, अंग दर अंग, और संकल्प पत्र।",
        },
        {
          href: "/faq#how",
          label: "हमारे वचन",
          note: "वे नियम जिनके अधीन यह साइट लिखी गई है।",
        },
      ],
      note: "अगले वर्ष के लिए यह पृष्ठ सहेज लीजिए।",
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
