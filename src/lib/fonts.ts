import {
  Eczar,
  Martel_Sans,
  Noto_Sans_Bengali,
  Noto_Sans_Gujarati,
  Noto_Sans_Gurmukhi,
  Noto_Sans_Kannada,
  Noto_Sans_Malayalam,
  Noto_Sans_Oriya,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
  Noto_Serif_Bengali,
  Noto_Serif_Gujarati,
  Noto_Serif_Gurmukhi,
  Noto_Serif_Kannada,
  Noto_Serif_Malayalam,
  Noto_Serif_Oriya,
  Noto_Serif_Tamil,
  Noto_Serif_Telugu,
} from "next/font/google";

import { localeDef, type Lang, type Script } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   One display face and one text face per script.

   Eczar (Vaibhav Singh, Indian Type Foundry) is a high-contrast display face
   designed Devanagari-first, and Martel Sans is its text companion. Between
   them they cover Latin and Devanagari, which is English, Hindi and Marathi.
   The eight remaining scripts are set in Noto Serif and Noto Sans, the only
   families on Google Fonts covering all of them at a consistent weight axis
   with a serif cut that can carry the almanac look.

   Each family gets its own CSS variable and never a shared one, because two
   classes setting the same custom property on `<html>` resolve by stylesheet
   order, which is not something this codebase should have an opinion about.
   globals.css maps them onto `--font-display` and `--font-body` per
   `html[data-script]`; see the block under "Type" there.

   ECZAR IS LOADED IN EVERY LOCALE, on purpose. The masthead wordmark stays
   Latin caps in Eczar whatever the page is set in, so the brand is one mark and
   not twelve. Its Latin subset is small and it is the only font preloaded on a
   non-Devanagari page.

   WHY `preload: false` ON THE SCRIPT FACES. next/font emits an @font-face block
   for every family declared in an imported module and preloads each one it
   believes is used. Eighteen preload hints on a page that paints one script is
   most of a phone's connection budget spent on fonts nobody will see. A browser
   only fetches a face whose glyphs are actually painted, so leaving the
   sixteen script faces unpreloaded costs a Tamil reader one extra round trip
   and saves every reader sixteen.

   ADDING A SCRIPT means a row in `FACES`, a `Script` member in
   src/lib/locales.ts, and a `html[data-script=...]` rule in globals.css.
   --------------------------------------------------------------------------- */

/**
 * Every script face takes the same four weights and the same two flags, and
 * every call is written out in full anyway.
 *
 * next/font resolves these at build time with a static parser: the options
 * object must be a literal, so a shared constant, a spread or a helper all
 * fail the build with "Unexpected spread". The repetition below is the price
 * of that, and it is cheaper than the indirection that hides it.
 *
 * `preload: false` on all sixteen: see the note at the top of the file.
 */

const eczar = Eczar({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-eczar",
  display: "swap",
});

const martel = Martel_Sans({
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-martel",
  display: "swap",
});

const bnDisplay = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bn-display",
  display: "swap",
  preload: false,
});

const bnText = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bn-text",
  display: "swap",
  preload: false,
});

const teDisplay = Noto_Serif_Telugu({
  subsets: ["telugu", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-te-display",
  display: "swap",
  preload: false,
});

const teText = Noto_Sans_Telugu({
  subsets: ["telugu", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-te-text",
  display: "swap",
  preload: false,
});

const taDisplay = Noto_Serif_Tamil({
  subsets: ["tamil", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ta-display",
  display: "swap",
  preload: false,
});

const taText = Noto_Sans_Tamil({
  subsets: ["tamil", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ta-text",
  display: "swap",
  preload: false,
});

const guDisplay = Noto_Serif_Gujarati({
  subsets: ["gujarati", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gu-display",
  display: "swap",
  preload: false,
});

const guText = Noto_Sans_Gujarati({
  subsets: ["gujarati", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gu-text",
  display: "swap",
  preload: false,
});

const knDisplay = Noto_Serif_Kannada({
  subsets: ["kannada", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kn-display",
  display: "swap",
  preload: false,
});

const knText = Noto_Sans_Kannada({
  subsets: ["kannada", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kn-text",
  display: "swap",
  preload: false,
});

const mlDisplay = Noto_Serif_Malayalam({
  subsets: ["malayalam", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ml-display",
  display: "swap",
  preload: false,
});

const mlText = Noto_Sans_Malayalam({
  subsets: ["malayalam", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ml-text",
  display: "swap",
  preload: false,
});

const orDisplay = Noto_Serif_Oriya({
  subsets: ["oriya", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-or-display",
  display: "swap",
  preload: false,
});

const orText = Noto_Sans_Oriya({
  subsets: ["oriya", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-or-text",
  display: "swap",
  preload: false,
});

const paDisplay = Noto_Serif_Gurmukhi({
  subsets: ["gurmukhi", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pa-display",
  display: "swap",
  preload: false,
});

const paText = Noto_Sans_Gurmukhi({
  subsets: ["gurmukhi", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pa-text",
  display: "swap",
  preload: false,
});

/** The extra variable classes a script needs beyond the always-on Eczar pair. */
const FACES: Record<Script, string> = {
  latin: "",
  devanagari: "",
  bengali: `${bnDisplay.variable} ${bnText.variable}`,
  telugu: `${teDisplay.variable} ${teText.variable}`,
  tamil: `${taDisplay.variable} ${taText.variable}`,
  gujarati: `${guDisplay.variable} ${guText.variable}`,
  kannada: `${knDisplay.variable} ${knText.variable}`,
  malayalam: `${mlDisplay.variable} ${mlText.variable}`,
  oriya: `${orDisplay.variable} ${orText.variable}`,
  gurmukhi: `${paDisplay.variable} ${paText.variable}`,
};

/** The `<html>` class list that makes this locale's faces available. */
export function fontClass(lang: Lang): string {
  return `${eczar.variable} ${martel.variable} ${FACES[localeDef(lang).script]}`.trim();
}
