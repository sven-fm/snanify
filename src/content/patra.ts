/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair and not the twelve locales the
   site serves; see the tier note at the top of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The Sankalp Patra: the document labels, the record type, and the specimen.

   This file once carried a certificate of a rite performed at a ghat. The
   sheet now records the water's own condition at the moment a name was kept,
   taken from public data, plus the names and the words the person gave.
   "Kept in the name of" is the strongest line on it, and it is true.

   Two things live here:

   1. `patraContent`, the labels printed on the sheet, keyed by locale. `hi`
      is checked against the shape of `en`, so a missing translation is a
      compile error rather than an English word on a Hindi sheet. The labels
      are plain, short and dignified: this is a document, not a page.
   2. `specimenPatra()`, a composed record for illustration. Every value in
      it is an example. The names are the placeholder names of the Sanskrit
      grammarians (Devadatta, Yajnadatta, the equivalents of "John Doe");
      nothing has been issued against the identifier; the tithi was not
      computed from any panchang. The sheet itself is watermarked.

      One value on the specimen is NOT invented, and deliberately so: the seed.
      It is the real SHA-256 of the canonical line printed beside it, so a
      reader who runs the hash themselves gets the number on the sheet. See
      `SPECIMEN_CANONICAL`.
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
  /** 22-character base58. Unguessable, so a sheet is link-shareable. */
  patraId: string;
  /** The folio, printed at the masthead. Digits only, already localised. */
  folioNo?: string;
  /** "the 1,412th sheet kept at Har Ki Pauri", already localised. */
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

  /** The river's flow. The note carries the percentile and its window. */
  flow?: PatraFigure;
  /** A gauge level, where a gauge on this reach has one. */
  level?: PatraFigure;
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
  /* The document itself. Every label is read off paper, so each one names
     the thing in the cell under it and nothing more. */
  sheet: {
    aria: "Sankalp Patra",
    ariaSpecimen: "Sankalp Patra, specimen, with example names and figures",
    titleLatin: "Sankalp Patra",
    subtitle: "The river at the moment this sankalp was kept.",
    folioLabel: "Patra",
    namesLabel: "Kept in the name of",
    remembranceLabel: "Kept in remembrance of",
    givenByLabel: "Given by",
    gotraLabel: "Gotra",
    gotraUnstated: "Not stated",
    sankalpLabel: "The sankalp",

    waterLabel: "Water and ghat",
    keptLabel: "Kept on",
    localLabel: "Your local time",
    tithiLabel: "Tithi",
    windowLabel: "Window",
    flowLabel: "Flow",
    levelLabel: "Level",
    distanceLabel: "Distance to the water",
    seedLabel: "Seed",
    stateLabel: "The water that morning",

    verifyLabel: "Find this sheet at",
    footerLine:
      "This sheet records the river as it was at the moment the sankalp was kept, with the names and the words given.",

    specimenChip: "Specimen",
    specimenBanner:
      "Specimen. The names and figures are examples, and the identifier opens nothing.",

    viewFull: "Open the sheet full size",
    viewerAria: "The sheet, full size",
    viewFit: "Whole sheet",
    viewRead: "Reading size",
    viewClose: "Close",
  },
};

const hi: typeof en = {
  sheet: {
    aria: "संकल्प पत्र",
    ariaSpecimen: "संकल्प पत्र, नमूना, उदाहरण के नामों और अंकों के साथ",
    titleLatin: "Sankalp Patra",
    subtitle: "जिस क्षण यह संकल्प रखा गया, उस क्षण की नदी।",
    folioLabel: "पत्र",
    namesLabel: "जिनके नाम से रखा गया",
    remembranceLabel: "जिनके स्मरण में रखा गया",
    givenByLabel: "भेंटकर्ता",
    gotraLabel: "गोत्र",
    gotraUnstated: "अनुल्लिखित",
    sankalpLabel: "संकल्प",

    waterLabel: "जल और घाट",
    keptLabel: "दिनांक",
    localLabel: "आपका स्थानीय समय",
    tithiLabel: "तिथि",
    windowLabel: "बेला",
    flowLabel: "प्रवाह",
    levelLabel: "जलस्तर",
    distanceLabel: "जल तक की दूरी",
    seedLabel: "बीज",
    stateLabel: "उस सुबह का जल",

    verifyLabel: "यह पत्र यहाँ मिलेगा",
    footerLine:
      "यह पत्र उस क्षण की नदी को दर्ज करता है जब संकल्प रखा गया, और साथ में वे नाम और वे शब्द जो दिए गए।",

    specimenChip: "नमूना",
    specimenBanner:
      "नमूना। नाम और अंक उदाहरण हैं, और यह पहचान कुछ भी नहीं खोलती।",

    viewFull: "पत्र पूरे आकार में खोलिए",
    viewerAria: "पत्र, पूरे आकार में",
    viewFit: "पूरा पत्र",
    viewRead: "पढ़ने का आकार",
    viewClose: "बंद कीजिए",
  },
};

export const patraContent = { en, hi } satisfies Record<Lang, typeof en>;

/* ------------------------------- the specimen ------------------------------ */

/** The bilingual watermark word tiled across a specimen sheet. */
export const SPECIMEN_WATERMARK_TEXT = "SPECIMEN  नमूना";

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
      ? "हर की पौड़ी पर रखा गया १,४१२वाँ पत्र"
      : "the 1,412th sheet kept at Har Ki Pauri",

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
    keptLocal: hi ? "14 मई 2026, 01:22 CEST" : "14 May 2026, 01:22 CEST",

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
    distance: {
      value: hi ? "5,739 किमी" : "5,739 km",
      note: hi ? "बर्लिन से हर की पौड़ी तक" : "Berlin to Har Ki Pauri",
    },

    stateLine: hi
      ? "गंगा वर्ष के इस मोड़ पर अपने सामान्य प्रवाह पर बह रही थीं।"
      : "The Ganga was running at its usual level for this time of year.",

    seed: SPECIMEN_SEED,
    verifyUrl: "snanify.com/c/pT4mKq9RxB2vLh6nYeW3dU",
  };
}
