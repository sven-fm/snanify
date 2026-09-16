import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The Sankalp Patra: the document labels, the record type, and the specimen.

   This file once carried a certificate of a rite performed at a ghat. The
   sheet now records the water's own condition at the moment a name was kept,
   taken from public data, plus the names and the words the person gave.
   "Kept in the name of" is the strongest line on it, and it is true.

   `patraContent` is the labels printed on the sheet, keyed by locale. `hi` is
   checked against the shape of `en`, so a missing translation is a compile
   error rather than an English word on a Hindi sheet. The labels are plain,
   short and dignified: this is a document, not a page.
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

/** The bilingual word tiled across a specimen sheet. */
export const SPECIMEN_TEXT = "SPECIMEN  नमूना";
