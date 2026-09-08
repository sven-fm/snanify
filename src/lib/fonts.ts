import { Eczar, Martel_Sans } from "next/font/google";


import { localeDef, type Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   One display face and one text face, covering both locales.

   Eczar (Vaibhav Singh, Indian Type Foundry) is a high-contrast display face
   designed Devanagari-first, and Martel Sans is its text companion. Between
   them they set Latin and Devanagari, which is English and Hindi.

   Each family gets its own CSS variable and never a shared one, because two
   classes setting the same custom property on `<html>` resolve by stylesheet
   order, which is not something this codebase should have an opinion about.
   globals.css maps them onto `--font-display` and `--font-body` per
   `html[data-script]`; see the block under "Type" there.

   next/font resolves these calls at build time with a static parser: the
   options object must be a literal, so a shared constant, a spread or a helper
   all fail the build with "Unexpected spread". Both calls are written out in
   full for that reason.

   THREE WEIGHTS, BECAUSE THE DESIGN USES THREE. globals.css asks for 400, 600
   and 700 and nothing else. Both families were loaded at five weights each,
   which is ten faces covering Latin and Devanagari: most of a phone's opening
   connection budget spent on cuts that never render. Adding a weight here
   without a rule that uses it costs every reader about thirty kilobytes.

   ADDING A SCRIPT means a face pair here, a `Script` member in
   src/lib/locales.ts, and a `html[data-script=...]` rule in globals.css. The
   site once carried eight more script pairs, unpreloaded; git remembers them.
   --------------------------------------------------------------------------- */


const eczarLatin = Eczar({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-eczar",
  display: "swap",
});

const martelLatin = Martel_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-martel",
  display: "swap",
});

const eczarDeva = Eczar({
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
  variable: "--font-eczar-deva",
  display: "swap",
  preload: false,
});

const martelDeva = Martel_Sans({
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
  variable: "--font-martel-deva",
  display: "swap",
  preload: false,
});


















/**
 * The `<html>` class list that makes this locale's faces available.
 *
 * Latin always, Devanagari only where it is read. next/font emits one file per
 * subset and preloads them, so declaring both subsets on one family meant an
 * English page downloading about a hundred and ninety kilobytes of Devanagari
 * it would never paint. Splitting them means an English page fetches the Latin
 * cuts and stops.
 *
 * A Devanagari page still gets both, because the masthead wordmark is Latin
 * whatever the page is set in.
 *
 * `preload: false` ON THE DEVANAGARI CUTS IS LOAD BEARING. next/font emits a
 * preload hint for every face declared in an imported module, whatever class
 * list the page ends up with, so splitting the subsets alone changed nothing:
 * an English page still fetched all of it up front. Unpreloaded, a face is
 * fetched only when a glyph from it is painted, which costs a Hindi reader one
 * round trip and saves an English reader the whole Devanagari payload.
 */
export function fontClass(lang: Lang): string {
  const latin = `${eczarLatin.variable} ${martelLatin.variable}`;
  if (localeDef(lang).script !== "devanagari") return latin;

  return `${latin} ${eczarDeva.variable} ${martelDeva.variable}`;
}
