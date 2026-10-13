import type { Lang } from "@/lib/locales";
import type { FlowBand } from "@/lib/riverdata";

/* ---------------------------------------------------------------------------
   How a river is running, in words, before it is a number.

   THE WORD LEADS AND THE FIGURE PROVES IT. A reader at six in the morning
   understands "the Ganga is running full" at once; "797 m³/s, 86th
   percentile" is the evidence for that sentence, printed right under it for
   anyone who wants to check. Every surface that shows a river figure (the
   landing line and card, the reading in the sitting, the sheet, the specimen,
   /live and the reminder) takes its words from here, so one morning reads the
   same everywhere.

   The bands are `bandFor()` in src/lib/riverdata.ts, cut at the 10th, 30th,
   70th and 90th percentile of that cell's own record for the same week of the
   year, 1997 to 2025. A word is therefore a fact about the published figure,
   never a guess about the water.

   Hindi takes the honorific plural for a river ("बह रही हैं"), as /live and the
   reminder already do.
   --------------------------------------------------------------------------- */

const en = {
  /** The short form: a table cell, a dial label, the sheet's headline figure. */
  word: {
    slack: "Thin",
    low: "Low",
    usual: "Usual",
    full: "Full",
    spate: "In spate",
  } satisfies Record<FlowBand, string>,
  /** The state as a phrase, for the reading and the sheet. */
  state: {
    slack: "Running thin",
    low: "Running low",
    usual: "Running as usual",
    full: "Running full",
    spate: "In spate",
  } satisfies Record<FlowBand, string>,
  /** One sentence, {river} and {city} filled at render. */
  line: {
    slack: "The {river} at {city} is running thin this morning.",
    low: "The {river} at {city} is running low this morning.",
    usual: "The {river} at {city} is running as it usually does this week.",
    full: "The {river} at {city} is running full this morning.",
    spate: "The {river} at {city} is in spate this morning.",
  } satisfies Record<FlowBand, string>,
  /** When the feed is quiet the page shows the seasonal median and says so, claiming nothing about today. */
  lineMedian: "The {river} at {city}: today's figure is on its way. Here is its usual level for the season.",
  stateMedian: "Usual for the season",
  /** The proof under the word: "797 m³/s, 86th percentile since 1997". */
  proof: "{flow}, {n} percentile since 1997",
  /** The window the percentile is drawn from, said plainly. */
  forSeason: "for this week of the year",
};

const hi: typeof en = {
  word: {
    slack: "पतली",
    low: "कम",
    usual: "सामान्य",
    full: "भरी",
    spate: "उफान",
  },
  state: {
    slack: "पतली धार",
    low: "कम बहाव",
    usual: "सामान्य बहाव",
    full: "भरी धार",
    spate: "उफान पर",
  },
  line: {
    slack: "{city} में {river} आज सुबह पतली धार में बह रही हैं।",
    low: "{city} में {river} आज सुबह कम बह रही हैं।",
    usual: "{city} में {river} इस सप्ताह वैसे ही बह रही हैं जैसे प्रायः बहती हैं।",
    full: "{city} में {river} आज सुबह भरी बह रही हैं।",
    spate: "{city} में {river} आज सुबह उफान पर हैं।",
  },
  lineMedian: "{city} में {river}: आज का आँकड़ा आ रहा है। यह इस ऋतु का उनका सामान्य स्तर है।",
  stateMedian: "इस ऋतु का सामान्य स्तर",
  proof: "{flow}, 1997 से {n}वाँ प्रतिशतक",
  forSeason: "वर्ष के इस सप्ताह के हिसाब से",
};

export const flowContent = { en, hi } satisfies Record<Lang, typeof en>;

export type FlowCopy = typeof en;
export type { FlowBand };
