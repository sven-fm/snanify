/* ---------------------------------------------------------------------------
   The one palette. The site reads these as --* tokens in globals.css; the
   renderers that have no stylesheet (patra-image, site-card, email) import the
   hex from here. Change a value here and change it in globals.css in the same
   commit: tests/unit/palette.test.ts fails when the two drift.
   --------------------------------------------------------------------------- */

export type PaletteKey =
  | "paper"
  | "paper2"
  | "paper3"
  | "ink"
  | "ink2"
  | "sindoor"
  | "marigold"
  | "haldi"
  | "teal"
  | "maroon"
  | "rule"
  | "wall";

export const PALETTE: { day: Record<PaletteKey, string>; night: Record<PaletteKey, string> } = {
  day: {
    paper: "#f2ead9",
    paper2: "#eae0c9",
    paper3: "#ded1b4",
    ink: "#141210",
    ink2: "#57513f",
    sindoor: "#c8251d",
    marigold: "#f2c230",
    haldi: "#e3962b",
    teal: "#1d5a6a",
    maroon: "#7a1a14",
    rule: "#c3b697",
    wall: "#141210",
  },
  night: {
    paper: "#12110e",
    paper2: "#1a1814",
    paper3: "#24211a",
    ink: "#ece3cf",
    ink2: "#99917f",
    sindoor: "#e04a40",
    marigold: "#f2c230",
    haldi: "#f0a83c",
    teal: "#5c9aa5",
    maroon: "#a8352b",
    rule: "#35302a",
    wall: "#000000",
  },
};

/** The gauge's five fills, thin to in spate, teal stepping from paper. */
export const GAUGE_FILLS: { day: readonly string[]; night: readonly string[] } = {
  day: ["#f2ead9", "#e8dcc0", "#c9d7d2", "#7fa3a6", "#1d5a6a"],
  night: ["#1a1814", "#2a2a22", "#24393c", "#3d6b72", "#5c9aa5"],
};

/** The river in the night edition: waves, sun and path. */
export const NIGHT_RIVER = { waves: "#16404a", sun: "#4a1410", path: "#5a4a1c" } as const;

/** The stillness: the ground the sitting goes dark on. */
export const STILLNESS = "#0b0a08";

/** The stillness's dim inks on that ground: the line, the seconds and the
    part's name, the bar's track, the cross's edge. */
export const STILLNESS_INK = {
  line: "#b5ad99",
  dim: "#6f685a",
  mute: "#8a836f",
  track: "#2a2622",
  edge: "#3a3530",
} as const;

/** The lighter paper the owner's printed copy of the Patra comes out on. */
export const PRINT_PAPER = "#faf6ea";

/* ---------------------------------------------------------------------------
   The type, as globals.css, src/components/site/Reference.tsx and the kit set
   it, written out once for what has no stylesheet: the brand kit
   (brand/tokens.json, from `npm run brand`) and anyone building outside the
   repo. The app reads its type from globals.css, not from here;
   tests/unit/brand.test.ts fails when the two disagree on the values below.
   --------------------------------------------------------------------------- */

export const TYPE = {
  families: {
    display: {
      name: "Eczar",
      weights: [400, 600, 700, 800],
      scripts: ["latin", "devanagari"],
      url: "https://fonts.google.com/specimen/Eczar",
      job: "Display: the headline, headings, the wordmark, the seal, the label",
    },
    text: {
      name: "Martel Sans",
      weights: [400, 600, 700],
      scripts: ["latin", "devanagari"],
      url: "https://fonts.google.com/specimen/Martel+Sans",
      job: "Text: body, buttons, labels, tabular data, the band",
    },
    sheet: {
      name: "Noto Serif Devanagari",
      weights: [400, 600],
      scripts: ["devanagari"],
      url: "https://fonts.google.com/noto/specimen/Noto+Serif+Devanagari",
      job: "Hindi on the drawn images only (the Patra, the link cards), so conjuncts stack",
    },
  },
  roles: {
    headline: {
      family: "Eczar",
      weight: 800,
      case: "upper",
      lineHeight: 0.95,
      letterSpacing: "-0.01em",
      devanagari: { lineHeight: 1.22, letterSpacing: "0" },
      sizes: ["2.125rem", "2.25rem", "2.85rem", "3.4rem"],
      note: "One per screen, the river's name in sindoor. Hindi has no case.",
    },
    h2: { family: "Eczar", weight: 700, case: "sentence", size: "1.75rem", sizeWide: "2.25rem", lineHeight: 1.15 },
    h3: { family: "Eczar", weight: 700, case: "sentence", size: "1.25rem", lineHeight: 1.3 },
    body: { family: "Martel Sans", weight: 400, size: "15px", sizeLongReading: "16px" },
    button: { family: "Martel Sans", weight: 700, case: "sentence", size: "1rem", lineHeight: 1.3 },
    label: {
      family: "Martel Sans",
      weight: 700,
      case: "sentence",
      size: "0.8125rem",
      lineHeight: 1.4,
      letterSpacing: "0",
      devanagari: { size: "0.875rem" },
    },
    band: { family: "Martel Sans", weight: 800, size: "0.9375rem", lineHeight: 1.3, minSize: "14px" },
    wordmark: {
      family: "Eczar",
      weight: 800,
      case: "mixed",
      letterSpacing: "-0.015em",
      lineHeight: 1,
      note: "Snanify, the i dotless (U+0131) under a sindoor bindu 0.237em across, its foot 0.543em above the baseline.",
    },
  },
} as const;
