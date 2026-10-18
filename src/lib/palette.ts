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

/** The lighter paper the owner's printed copy of the Patra comes out on. */
export const PRINT_PAPER = "#faf6ea";
