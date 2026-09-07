import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import * as hb from "harfbuzzjs";

/* ---------------------------------------------------------------------------
   Setting type into outlines, so a name is spelled the way its owner spells it.

   WHY THIS FILE EXISTS. The Sankalp Patra was first drawn with satori, then
   with resvg's own text engine. Both printed "अनिल" as "अनलि": Devanagari
   writes the short i before the consonant it follows, and neither engine
   reorders it. resvg was no better with a system font, so it was the shaping
   and not the file. A keepsake with somebody's father's name misspelled on it
   is worse than no keepsake, and the audience for this product writes its
   names in Devanagari.

   Chromium gets it right, and shipping a browser to render one PNG is a large
   answer to a small question. HarfBuzz is the small one: it is the same
   shaping engine Chromium uses, it runs as WebAssembly in about a megabyte,
   and `glyphToPath` hands back an SVG path per glyph. So text on the sheet is
   never text. It is outlines, positioned by HarfBuzz, and the renderer that
   rasterises them never has to know what a matra is.

   That also makes the sheet permanent in a way live text is not: an outline
   renders identically in five years, on any machine, with no font installed.

   FALLBACK IS PER RUN. Eczar sets Latin and Devanagari both, and Noto Serif
   Devanagari covers what Eczar's subset does not. A string is split into runs
   of one script and each run is shaped with the face that has its glyphs, so a
   sheet reading "Rekha Sharma · अनिल शर्मा" sets both halves properly.
   --------------------------------------------------------------------------- */

export type Weight = 400 | 600;

type Face = { face: hb.Face; font: hb.Font; upem: number };

type Loaded = {
  latin: Record<Weight, Face>;
  deva: Record<Weight, Face>;
};

let loaded: Loaded | null = null;

async function open(file: string): Promise<Face> {
  const dir = path.join(process.cwd(), "src/assets/fonts");
  const data = await readFile(path.join(dir, file));
  const blob = new hb.Blob(new Uint8Array(data).buffer);
  const face = new hb.Face(blob);
  return { face, font: new hb.Font(face), upem: face.upem };
}

async function faces(): Promise<Loaded> {
  if (loaded) return loaded;

  loaded = {
    latin: {
      400: await open("eczar-400.ttf"),
      600: await open("eczar-600.ttf"),
    },
    deva: {
      400: await open("noto-deva-400.ttf"),
      600: await open("noto-deva-600.ttf"),
    },
  };

  return loaded;
}

/** Devanagari, including the danda and the double danda. */
function isDevanagari(codePoint: number): boolean {
  return codePoint >= 0x0900 && codePoint <= 0x097f;
}

type Run = { text: string; deva: boolean };

/** Split a string into runs of one script, keeping spaces with what precedes. */
function runs(text: string): Run[] {
  const out: Run[] = [];

  for (const character of text) {
    const deva = isDevanagari(character.codePointAt(0) ?? 0);
    const last = out[out.length - 1];

    /* A space belongs to whichever run it follows, so " " never starts a run
       of its own and never forces a font switch mid-phrase. */
    if (last && (last.deva === deva || character === " ")) last.text += character;
    else out.push({ text: character, deva });
  }

  return out;
}

export type Typeset = {
  /** SVG `<path>` elements, ready to drop into a document. */
  svg: string;
  /** How wide the line came out, in the same units as `size`. */
  width: number;
};

export type TypesetOptions = {
  size: number;
  /** Left edge, or the anchor point when `anchor` is not "start". */
  x: number;
  /** The baseline. */
  y: number;
  weight?: Weight;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  /** Extra space between characters, as a fraction of the size. */
  tracking?: number;
  opacity?: number;
};

const round = (n: number) => Number(n.toFixed(2));

/** Shape one run and return its glyph paths, positioned from x = 0. */
function shapeRun(run: Run, face: Face, size: number, tracking: number) {
  const buffer = new hb.Buffer();
  buffer.addText(run.text);
  buffer.guessSegmentProperties();
  hb.shape(face.font, buffer);

  const infos = buffer.getGlyphInfos();
  const positions = buffer.getGlyphPositions();
  const scale = size / face.upem;

  const glyphs: { d: string; dx: number; dy: number }[] = [];
  let pen = 0;

  for (let i = 0; i < infos.length; i += 1) {
    const d = face.font.glyphToPath(infos[i].codepoint);
    if (d) {
      glyphs.push({
        d,
        dx: (pen + positions[i].xOffset) * scale,
        dy: -positions[i].yOffset * scale,
      });
    }
    pen += positions[i].xAdvance;
    if (tracking) pen += (tracking * size) / scale;
  }

  return { glyphs, width: pen * scale, scale };
}

/**
 * One line of text, as SVG paths.
 *
 * The y coordinate is the baseline, and the glyph outlines are flipped, since
 * font space runs upward and SVG space runs downward.
 */
export async function typeset(text: string, options: TypesetOptions): Promise<Typeset> {
  const {
    size,
    x,
    y,
    weight = 400,
    fill = "#16130f",
    anchor = "start",
    tracking = 0,
    opacity,
  } = options;

  if (!text) return { svg: "", width: 0 };

  const font = await faces();
  const pieces = runs(text);

  /* Measured first, then drawn, because a middle or end anchor needs the whole
     width before the first glyph can be placed. */
  const shaped = pieces.map((run) =>
    shapeRun(run, run.deva ? font.deva[weight] : font.latin[weight], size, tracking),
  );

  const width = shaped.reduce((sum, run) => sum + run.width, 0);
  const startX = anchor === "start" ? x : anchor === "middle" ? x - width / 2 : x - width;

  let cursor = startX;
  let svg = "";

  for (const run of shaped) {
    for (const glyph of run.glyphs) {
      svg +=
        `<path d="${glyph.d}" transform="translate(${round(cursor + glyph.dx)} ${round(y + glyph.dy)}) ` +
        `scale(${run.scale.toFixed(6)} ${(-run.scale).toFixed(6)})" fill="${fill}"` +
        (opacity === undefined ? "" : ` opacity="${opacity}"`) +
        ` />`;
    }
    cursor += run.width;
  }

  return { svg, width: round(width) };
}

/** How wide a line would be, without drawing it. */
export async function measure(
  text: string,
  options: { size: number; weight?: Weight; tracking?: number },
): Promise<number> {
  const { svg: _ignored, width } = await typeset(text, {
    ...options,
    x: 0,
    y: 0,
  });
  return width;
}

/**
 * Break a string into lines that fit a width.
 *
 * Word-based, which is right for both scripts here: Devanagari puts spaces
 * between words the same way. A single word longer than the line is left long
 * rather than broken mid-syllable, because breaking a conjunct is worse than
 * overflowing by a few pixels.
 */
export async function wrap(
  text: string,
  options: { size: number; weight?: Weight; maxWidth: number },
): Promise<string[]> {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    const width = await measure(candidate, options);

    if (width <= options.maxWidth || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines;
}
