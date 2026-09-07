import { Eczar, Martel_Sans } from "next/font/google";


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

   ADDING A SCRIPT means a face pair here, a `Script` member in
   src/lib/locales.ts, and a `html[data-script=...]` rule in globals.css. The
   site once carried eight more script pairs, unpreloaded; git remembers them.
   --------------------------------------------------------------------------- */


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


















/**
 * The `<html>` class list that makes the site's faces available.
 *
 * Eczar and Martel Sans between them set Latin and Devanagari, which is both
 * locales the site serves, so the class list is the same on every page. A
 * third script adds a face above and a branch here, keyed off
 * `localeDef(lang).script`.
 */
export function fontClass(): string {
  return `${eczar.variable} ${martel.variable}`;
}
