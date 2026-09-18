import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/* ---------------------------------------------------------------------------
   The copy rules, enforced.

   In September 2026 every page was rewritten by hand to take out the habits
   of generated copy: em dashes, middle-dot meta strings, the retired coined
   names, and "measured" said of a figure that is modelled. This keeps them
   out. It reads the shipped modules, walks every string they export, and
   fails the build on the first slip, with the path to it.

   The English and Hindi editions are also held to the same shape wherever a
   value is keyed by the two: a key present in one and missing in the other is
   a silent English fallback waiting to happen, or a hole in a sentence.
   --------------------------------------------------------------------------- */

const ROOT = path.resolve(__dirname, "../..");
const SRC = path.join(ROOT, "src");

/** Every content module that ships, plus the two lib files that carry copy. */
const MODULES = [
  "@/content/account",
  "@/content/begin",
  "@/content/email",
  "@/content/kumbh",
  "@/content/legal",
  "@/content/muhurat",
  "@/content/names",
  "@/content/panchang",
  "@/content/panchang-city",
  "@/content/cities",
  "@/content/patra",
  "@/content/patra-page",
  "@/content/prayers",
  "@/content/prices",
  "@/content/rivers",
  "@/content/setup",
  "@/content/snan",
  "@/content/today",
  "@/content/trust",
  "@/content/live/index",
  "@/content/muhurat-index/index",
  "@/content/rivers-index/index",
  "@/lib/content",
  "@/lib/nav",
];

const RETIRED = /\b(Jal Sankalp|Jal Chihna|Watermark|Jal Path|Shwas|Maun|Chihn)\b/;

/** The marketing pages: read at six in the morning, on a phone, by a reader
    whose English may be a third language. Short sentences, and none of the
    phrases generated copy reaches for. */
const MARKETING = [
  "@/content/landing/en",
  "@/content/live/en",
  "@/content/rivers-index/en",
  "@/content/muhurat-index/en",
  "@/content/panchang",
  "@/content/panchang-city",
  "@/content/snan",
];
const TICS = /its own sky|each on its own|on its own clock|This is that moment|part by part/;
const MAX_WORDS = 40;

/** The product surfaces: where a reader sits, pays, and receives the sheet.
    They show the river's figure plainly. The source, the word "modelled" and
    the publisher's names live on /rivers, /live, /faq and /faq#how, by the
    owner's direction of 16 September 2026. Case-sensitive, so the specimen's
    canonical line with its GLOFAS cell id is left alone: that is data. */
const PRODUCT = new Set([
  "@/content/today",
  "@/content/patra",
  "@/content/patra-page",
  "@/content/snan",
  "@/content/begin",
  "@/content/account",
  "@/content/setup",
  "@/content/email",
  "@/lib/content",
]);
const SOURCE_TALK = /\b(modelled|modeled|Modelled|Copernicus|GloFAS|Open-Meteo)\b|मॉडल/;

type Slip = { at: string; text: string; rule: string };

function walkStrings(value: unknown, at: string, out: Slip[]): void {
  if (typeof value === "string") {
    if (value.includes("—")) out.push({ at, text: value, rule: "em dash" });
    if (value.includes("·")) out.push({ at, text: value, rule: "middle dot" });
    if (RETIRED.test(value)) out.push({ at, text: value, rule: "retired name" });
    if (/\bmeasured\b/i.test(value)) out.push({ at, text: value, rule: "measured, for a modelled figure" });
    if (PRODUCT.has(at.split(".")[0]) && SOURCE_TALK.test(value)) {
      out.push({ at, text: value, rule: "source talk on a product surface" });
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => walkStrings(v, `${at}[${i}]`, out));
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      walkStrings(v, `${at}.${k}`, out);
    }
  }
}

/** The key tree of a value, with strings and numbers collapsed to a leaf. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value as object)
        .sort()
        .map((k) => [k, shape((value as Record<string, unknown>)[k])]),
    );
  }
  return typeof value === "function" ? "fn" : "leaf";
}

function walkPairs(value: unknown, at: string, out: string[]): void {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    value.forEach((v, i) => walkPairs(v, `${at}[${i}]`, out));
    return;
  }
  const keys = Object.keys(value as object).sort();
  if (keys.length === 2 && keys[0] === "en" && keys[1] === "hi") {
    const { en, hi } = value as { en: unknown; hi: unknown };
    if (JSON.stringify(shape(en)) !== JSON.stringify(shape(hi))) out.push(at);
    return;
  }
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    walkPairs(v, `${at}.${k}`, out);
  }
}

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const file = path.join(dir, name);
    if (statSync(file).isDirectory()) sourceFiles(file, out);
    else if (/\.(ts|tsx|json)$/.test(name)) out.push(file);
  }
  return out;
}

describe("the copy rules", () => {
  it("keeps em dashes out of every source file, comments included", () => {
    const offenders = sourceFiles(SRC).filter((f) => readFileSync(f, "utf8").includes("—"));
    expect(offenders.map((f) => path.relative(ROOT, f))).toEqual([]);
  });

  it("ships no middle dots, retired names, or 'measured' in any string", async () => {
    const slips: Slip[] = [];
    for (const name of MODULES) {
      const mod = (await import(name)) as Record<string, unknown>;
      walkStrings(mod, name, slips);
    }
    const json = JSON.parse(
      readFileSync(path.join(SRC, "content/data/muhurat.json"), "utf8"),
    ) as Record<string, unknown>;
    delete json._readme;
    walkStrings(json, "content/data/muhurat.json", slips);

    expect(slips.map((s) => `${s.rule}: ${s.at}: ${s.text.slice(0, 80)}`)).toEqual([]);
  });

  it("keeps the marketing pages short and free of the generated tics", async () => {
    const slips: string[] = [];
    const collect = (v: unknown, at: string): void => {
      if (typeof v === "string") {
        if (/[\u0900-\u097F]/.test(v)) return;
        if (TICS.test(v)) slips.push(`tic: ${at}: ${v.slice(0, 90)}`);
        for (const sentence of v.split(/(?<=[.!?])\s+/)) {
          if (sentence.split(/\s+/).length > MAX_WORDS) slips.push(`${MAX_WORDS}+ words: ${at}: ${sentence.slice(0, 90)}`);
        }
      } else if (Array.isArray(v)) v.forEach((x, i) => collect(x, `${at}[${i}]`));
      else if (v && typeof v === "object") for (const [k, x] of Object.entries(v as object)) collect(x, `${at}.${k}`);
    };
    for (const name of MARKETING) collect(await import(name), name);
    expect(slips).toEqual([]);
  });

  it("gives Hindi every key English has, and nothing English lacks", async () => {
    const mismatched: string[] = [];
    for (const name of MODULES) {
      const mod = (await import(name)) as Record<string, unknown>;
      walkPairs(mod, name, mismatched);
    }
    expect(mismatched).toEqual([]);
  });
});
