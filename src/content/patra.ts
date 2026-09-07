/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair and not the twelve locales the
   site serves; see the tier note at the top of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   जल चिह्न · Jal Chihna, the Watermark: copy, document labels, and the
   specimen record.

   This file used to carry the Sankalp Patra, a certificate of a rite that a
   person performed at a ghat. No rite is performed and none ever will be, so
   the name went with the product: a certificate of performance cannot be
   honestly reused for a record of a river. What is recorded now is the water's
   own condition at the moment a name was kept, taken from public data, plus
   the name and the words the person gave.

   The word "sankalp" survives, because it is the user's own written line and
   that is what the word means. The sheet never says a snan was performed on
   anybody's behalf. It says "taken in the name of", which is exactly true.

   Two things live here:

   1. `patraContent`, every user-facing string on /patra and /patra/sample,
      keyed by locale. `hi` is checked against the shape of `en`, so a missing
      translation is a compile error rather than an English word on a Hindi
      page.
   2. `specimenPatra()`, the composed record rendered on /patra/sample. Every
      value in it is a specimen. The names are the placeholder names of the
      Sanskrit grammarians (Devadatta, Yajnadatta, the equivalents of "John
      Doe"); nothing has been issued against the identifier; the tithi was not
      computed from any panchang. The sample page states all of this in the UI
      and the sheet itself is watermarked.

      One value on the specimen is NOT invented, and deliberately so: the seed.
      It is the real SHA-256 of the canonical line printed beside it on /patra,
      so a reader who runs the hash themselves gets the number on the sheet.
      See `SPECIMEN_CANONICAL`.
   --------------------------------------------------------------------------- */

/* ---------------------------------- data ---------------------------------- */

export type PatraNameEntry = {
  /** The name in Latin script, as it was written. */
  latin: string;
  /** The same name in Devanagari, where it was given or transliterated. */
  devanagari?: string;
  /** Already-localised relation label ("father" / "पिता"). Ordering only. */
  relation?: string;
  /** Kept in remembrance of someone who has passed. Changes the label only. */
  remembrance?: boolean;
};

/**
 * A figure read off a public source, with the one line of context that makes
 * it mean something. `note` is already localised and already carries its
 * units; nothing in the sheet formats numbers, because nothing in the sheet
 * knows which agency published them.
 */
export type PatraFigure = {
  value: string;
  note?: string;
};

export type PatraRecord = {
  /** 22-character base58. Unguessable, so a chihna is link-shareable. */
  patraId: string;
  /** The folio, printed at the masthead. Digits only, already localised. */
  folioNo?: string;
  /** "the 1,412th chihna kept at Har Ki Pauri", already localised. */
  sequenceLine?: string;

  names: PatraNameEntry[];
  /** Omitted when the family does not use one, the sheet prints "Not stated". */
  gotra?: string;
  /** Present only on a gift. A gift sheet with one name on it fails as a gift. */
  givenBy?: string;
  /** The person's own words. Printed on their sheet; never returned by /verify. */
  sankalpText?: string;

  /** "Ganga". The river, or at Talakaveri the spring. */
  water: string;
  ghat: string;
  place: string;
  /**
   * Printed under the water and ghat cell where the site itself needs a
   * sentence, as Talakaveri does: "Source, not a ghat. There is no bathing
   * here." Already localised.
   */
  waterNote?: string;

  /** The moment the person kept, already formatted for the locale. */
  keptOn: string;
  /** The same moment in India Standard Time. */
  keptIst: string;
  /** The same moment in the zone the person was keeping. */
  keptLocal?: string;

  /**
   * Printed only when `confidence === "sourced"`. An unsourced tithi is left
   * off the sheet as a blank rule rather than guessed.
   */
  tithi?: { label: string; confidence: "sourced" | "provisional" };
  /** The muhurat window the moment fell in: name, and its span in IST. */
  window?: { label: string; span: string };

  /** Modelled river discharge. The note carries the percentile and its window. */
  flow?: PatraFigure;
  /** A published gauge level, where a gauge on this reach publishes one. */
  level?: PatraFigure;
  /**
   * Printed in the level cell when nobody publishes a level for this reach.
   * Stated in words, in the same cell, rather than left blank: a missing
   * figure and an unpublished figure are different facts.
   */
  levelUnavailable?: PatraFigure;

  /** When the source observed the reading, and who published it. */
  reading?: { at: string; agency: string };
  /** How far the person was from that water. */
  distance?: PatraFigure;

  /** One of five state sentences. Never a grade, never a tier. */
  stateLine?: string;

  /** The first twelve hex of the SHA-256 over the canonical line. */
  seed: string;
  /** Displayed without a scheme, it is read off paper as often as clicked. */
  verifyUrl: string;
};

/* --------------------------------- copy ----------------------------------- */

const en = {
  meta: {
    title: "Jal Chihna, the mark the water left",
    description:
      "Every snan is kept at a moment when the river was in one particular state, and that state is on the public record. The Jal Chihna prints it: the water, the hour, the flow, the tithi, the distance, and a seed anyone can recompute.",
  },











  /* The document itself. Kept beside the page copy so the sheet and the page
     that explains it can never drift apart. */
  sheet: {
    aria: "Jal Chihna",
    ariaSpecimen: "Jal Chihna, specimen, not a record of anything issued",
    titleLatin: "Jal Chihna",
    subtitle: "The river's own condition, at the moment you kept.",
    folioLabel: "Chihna",
    namesLabel: "Taken in the name of",
    remembranceLabel: "Taken in remembrance of",
    givenByLabel: "Given by",
    gotraLabel: "Gotra",
    gotraUnstated: "Not stated",
    sankalpLabel: "The sankalp, as it was written",

    waterLabel: "Water and ghat",
    keptLabel: "Kept at",
    localLabel: "In your own time",
    tithiLabel: "Tithi",
    windowLabel: "Window",
    flowLabel: "Flow, modelled",
    levelLabel: "Level",
    readingLabel: "Reading taken",
    distanceLabel: "Distance to the water",
    seedLabel: "Seed",
    stateLabel: "The state of the water",

    verifyLabel: "Anyone may check this chihna at",
    attestation:
      "The numbers on this sheet are the river's, not ours. They were published by the body named above and they can be checked against it.",
    footerLine:
      "No rite was performed at the ghat. This is a record of the river's own condition at the moment you kept, taken from the public source named above, together with the name and the words you gave. It is a record of what the water was doing. It is not a promise of what will follow.",

    specimenChip: "Specimen",
    specimenBanner:
      "Specimen. Nothing on this sheet records anything issued, and the identifier resolves to nothing.",

    viewFull: "Open the sheet full size",
    viewerAria: "The chihna sheet, full size",
    viewFit: "Whole sheet",
    viewRead: "Reading size",
    viewClose: "Close",
  },
};

const hi: typeof en = {
  meta: {
    title: "जल चिह्न, जो चिह्न जल छोड़ गया",
    description:
      "हर स्नान उस क्षण होता है जब नदी किसी एक विशेष स्थिति में थी, और वह स्थिति सार्वजनिक अभिलेख में है। जल चिह्न उसी को अंकित करता है: जल, बेला, प्रवाह, तिथि, दूरी, और वह बीज जिसकी गणना कोई भी दोहरा सकता है।",
  },











  sheet: {
    aria: "जल चिह्न",
    ariaSpecimen: "जल चिह्न, नमूना, किसी जारी की गई वस्तु का अभिलेख नहीं",
    titleLatin: "Jal Chihna",
    subtitle: "उस क्षण नदी की अपनी स्थिति, जो क्षण आपने रखा।",
    folioLabel: "चिह्न",
    namesLabel: "जिनके नाम से लिया गया",
    remembranceLabel: "जिनके स्मरण में लिया गया",
    givenByLabel: "भेंटकर्ता",
    gotraLabel: "गोत्र",
    gotraUnstated: "अनुल्लिखित",
    sankalpLabel: "संकल्प, जैसा लिखा गया",

    waterLabel: "जल और घाट",
    keptLabel: "जो क्षण रखा गया",
    localLabel: "आपके अपने समय में",
    tithiLabel: "तिथि",
    windowLabel: "बेला",
    flowLabel: "प्रवाह, प्रतिरूपित",
    levelLabel: "जलस्तर",
    readingLabel: "पाठ लिया गया",
    distanceLabel: "जल तक की दूरी",
    seedLabel: "बीज",
    stateLabel: "जल की स्थिति",

    verifyLabel: "इस चिह्न की जाँच कोई भी यहाँ कर सकता है",
    attestation:
      "इस पत्र पर अंकित संख्याएँ नदी की हैं, हमारी नहीं। वे ऊपर अंकित संस्था द्वारा प्रकाशित हुईं और उन्हीं से मिलाई जा सकती हैं।",
    footerLine:
      "घाट पर कोई अनुष्ठान नहीं किया गया। यह उस क्षण नदी की अपनी स्थिति का अभिलेख है जो क्षण आपने रखा, जो ऊपर अंकित सार्वजनिक स्रोत से लिया गया, और उसके साथ वह नाम तथा वे शब्द जो आपने दिए। यह इस बात का अभिलेख है कि जल क्या कर रहा था। आगे क्या होगा, इसका वचन नहीं।",

    specimenChip: "नमूना",
    specimenBanner:
      "नमूना। इस पत्र पर जारी की गई किसी वस्तु का अभिलेख नहीं, और यह पहचान कुछ भी नहीं खोलती।",

    viewFull: "पत्र पूरे आकार में खोलिए",
    viewerAria: "चिह्न-पत्र, पूरे आकार में",
    viewFit: "पूरा पत्र",
    viewRead: "पढ़ने का आकार",
    viewClose: "बंद कीजिए",
  },
};

export const patraContent = { en, hi } satisfies Record<Lang, typeof en>;

/* ------------------------------- the specimen ------------------------------ */

/** The bilingual watermark word tiled across a specimen sheet. */
export const SPECIMEN_WATERMARK_TEXT = "SPECIMEN · नमूना";

/**
 * The canonical line the specimen's seed is taken over, in the exact field
 * order the seed builder uses:
 *
 *   snanify.chihna | v | waterId | sourceCell | observedAtUtc | stageM |
 *   dischargeCumecs | keptAtUtc | nameNorm | gotraNorm
 *
 * A field nobody publishes is a single hyphen, which is why the level slot is
 * "-": no public gauge on the Haridwar reach publishes a stage.
 *
 * THIS STRING IS LOAD-BEARING. `SPECIMEN_SEED` is the first twelve characters
 * of its real SHA-256 digest,
 *   fc68aec95e10ffdd60804a6d4bd4112666a8fac87edb679a134dc2e4e9ea3330
 * and /patra invites the reader to run the hash themselves. Edit one byte of
 * the line and the seed on the page becomes a lie, so change both together or
 * neither.
 */
export const SPECIMEN_CANONICAL =
  "snanify.chihna|1|ganga-haridwar|GLOFAS-29.925-78.125|2026-05-14T05:00:00Z|-|1444.000|2026-05-13T23:22:00Z|devadatta sharma|kashyapa";

/** The first twelve characters of sha256(SPECIMEN_CANONICAL). Verified. */
export const SPECIMEN_SEED = "fc68aec95e10";

/**
 * A composed record, for /patra/sample and the illustration on /patra.
 *
 * Devadatta and Yajnadatta are the traditional placeholder names of Sanskrit
 * grammar. The tithi below was NOT computed from a panchang and must never be
 * presented as one: on an issued chihna the tithi cell is omitted unless
 * `confidence === "sourced"`, and it is marked "sourced" here only so the
 * specimen can demonstrate the layout. The identifier is not issued against
 * anything.
 *
 * The level is deliberately shown in its unavailable form. There is no public
 * gauge publishing a stage on the Ganga at Haridwar, and a specimen that
 * invented one is exactly the specimen that ends up copied into production.
 */
export function specimenPatra(lang: Lang): PatraRecord {
  const hi = lang === "hi";
  return {
    patraId: "pT4mKq9RxB2vLh6nYeW3dU",
    folioNo: hi ? "००४ २१७" : "004 217",
    sequenceLine: hi
      ? "हर की पौड़ी पर रखा गया १,४१२वाँ चिह्न"
      : "the 1,412th chihna kept at Har Ki Pauri",

    names: [
      { latin: "Devadatta Sharma", devanagari: "देवदत्त शर्मा" },
      {
        latin: "Yajnadatta Sharma",
        devanagari: "यज्ञदत्त शर्मा",
        relation: hi ? "पिता" : "father",
      },
    ],
    gotra: hi ? "काश्यप" : "Kashyapa",
    sankalpText: hi
      ? "बीते वर्ष के लिए कृतज्ञता, और आने वाले वर्ष में मन की शांति के निमित्त।"
      : "In gratitude for the year that has passed, and for peace of mind in the year ahead.",

    water: hi ? "गंगा" : "Ganga",
    ghat: hi ? "हर की पौड़ी" : "Har Ki Pauri",
    place: hi ? "हरिद्वार" : "Haridwar",

    keptOn: hi ? "14 मई 2026" : "14 May 2026",
    keptIst: "04:52 IST",
    keptLocal: hi ? "14 मई 2026 · 01:22 CEST" : "14 May 2026 · 01:22 CEST",

    tithi: {
      label: hi ? "वैशाख, शुक्ल अष्टमी" : "Vaishakha, Shukla Ashtami",
      confidence: "sourced",
    },
    window: {
      label: hi ? "ब्रह्म मुहूर्त" : "Brahma Muhurat",
      span: hi ? "04:24 से 05:12 IST" : "04:24 to 05:12 IST",
    },

    flow: {
      value: hi ? "1,444 घन मी/से" : "1,444 m³/s",
      note: hi
        ? "1997 से वर्ष के इसी सप्ताह के 41% पाठों से अधिक"
        : "higher than 41% of readings here in this week of the year since 1997",
    },
    levelUnavailable: {
      value: hi ? "इस धारा के लिए प्रकाशित नहीं" : "Not published for this reach",
      note: hi
        ? "इस धारा पर कोई सार्वजनिक गेज जलस्तर प्रकाशित नहीं करता।"
        : "No public gauge on this reach publishes a level.",
    },

    reading: {
      at: hi ? "14 मई 2026, 05:00 IST" : "14 May 2026, 05:00 IST",
      agency: hi
        ? "कोपरनिकस EMS, ओपन-मेटियो के माध्यम से"
        : "Copernicus EMS, via Open-Meteo",
    },
    distance: {
      value: hi ? "5,739 किमी" : "5,739 km",
      note: hi ? "बर्लिन से हर की पौड़ी तक" : "Berlin to Har Ki Pauri",
    },

    stateLine: hi
      ? "गंगा वर्ष के इस मोड़ पर अपने सामान्य बहाव में बह रही थीं।"
      : "The Ganga was running as she usually runs at this turn of the year.",

    seed: SPECIMEN_SEED,
    verifyUrl: "snanify.com/c/pT4mKq9RxB2vLh6nYeW3dU",
  };
}
