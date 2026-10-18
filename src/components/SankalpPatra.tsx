import type { CSSProperties } from "react";
import { patraContent, type PatraRecord } from "@/content/patra";
import { flowContent } from "@/content/flow";
import { closingRiver } from "@/lib/engraving";
import { gaugeModel } from "@/lib/gauge";
import { devaFontClass } from "@/lib/fonts";
import { GAUGE_FILLS, PALETTE, PRINT_PAPER } from "@/lib/palette";
import type { PatraView } from "@/lib/patra-view";
import type { FlowBand } from "@/lib/riverdata";

/* ---------------------------------------------------------------------------
   The Sankalp Patra as a page (spec 6.5).

   THE SAME DESIGN AS THE IMAGE. src/lib/patra-image.ts draws the 1080 by 1920
   memento; this sets the same sheet in HTML, top to bottom: "Sankalp Patra"
   and the date, the ghat with the portrait pinned on it and the morning's
   seal, the names one per line in capitals, where, the prayer, how the river
   ran with its gauge and its figure, the closing river drawn from the day's
   seed, the foot. Every distance is the image's own, in 1080ths of the sheet's
   width (`u()`), so the page and the picture keep one geometry and the sheet
   scales as one block from a phone to a print.

   THE OWNER'S COPY CARRIES THE SANKALP. Given a `PatraRecord` (only
   `printableRecord()` makes one) the person's own words print in Eczar 700
   under the names. Given a bare `PatraView`, the type every shared surface is
   built from, there is nothing to print: the field does not exist.

   ALWAYS THE DAY SHEET. The sheet is paper in every edition, as the image is,
   so it pins the day palette on itself; printed, the paper lightens to
   #faf6ea. The wordmark stays off it, as it does on the image: the foot
   carries snanify.com.
   --------------------------------------------------------------------------- */

/** The sheet's design width, the memento's. */
const W = 1080;
/** The side margin, the image's. */
const M = 64;

/** The sun on the closing river, the image's. */
const SUN_R = 68;

/** Design units to container-width units, so the whole sheet scales as one. */
const u = (px: number) => `${((px / W) * 100).toFixed(4)}cqw`;

const { day } = PALETTE;
/* The day tokens, set on the sheet itself so every var() inside resolves to
   paper and ink whatever edition the page around it is in. */
const DAY_TOKENS = {
  "--paper": day.paper,
  "--paper-2": day.paper2,
  "--ink": day.ink,
  "--ink-2": day.ink2,
  "--sindoor": day.sindoor,
  "--marigold": day.marigold,
  "--teal": day.teal,
  "--rule": day.rule,
  "--rule-strong": day.ink,
  ...Object.fromEntries(GAUGE_FILLS.day.map((hex, i) => [`--gauge-${i + 1}`, hex])),
} as CSSProperties;

/**
 * Print: the sheet alone, on lighter paper, on one A4 page. Everything that
 * neither holds the sheet nor sits inside it is taken out of the flow, so no
 * blank pages follow it; 120mm wide leaves room for a long sankalp.
 */
const PRINT_CSS = `
[data-patra-sheet]{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }
@media print{
  @page{ size: A4 portrait; margin: 10mm; }
  html, body{ background:${PRINT_PAPER} !important; }
  body *:not(:has([data-patra-print])):not([data-patra-print]):not([data-patra-print] *){ display:none !important; }
  body *:has([data-patra-print]){ margin:0 !important; padding:0 !important; border:0 !important; min-height:0 !important; max-width:none !important; }
  [data-patra-print]{ width:120mm !important; margin:0 auto !important; }
  [data-patra-sheet]{ --paper:${PRINT_PAPER}; background-color:${PRINT_PAPER} !important; break-inside:avoid; page-break-inside:avoid; }
}
`;

/* Eczar and Martel in both scripts. The sheet is set in the sitting's edition,
   which may not be the page's, so the Devanagari cut is named first where the
   page has it and falls through to the Latin one where it does not. */
const SERIF = "var(--font-eczar-deva, var(--font-eczar)), var(--font-eczar), Georgia, serif";
const SANS = "var(--font-martel-deva, var(--font-martel)), var(--font-martel), ui-sans-serif, system-ui, sans-serif";

const display = (size: number, weight: 700 | 800, extra: CSSProperties = {}): CSSProperties => ({
  fontFamily: SERIF,
  fontWeight: weight,
  fontSize: u(size),
  fontSynthesis: "none",
  ...extra,
});

const sans = (size: number, extra: CSSProperties = {}): CSSProperties => ({
  fontFamily: SANS,
  fontSize: u(size),
  ...extra,
});

const hasDeva = (text: string) => /[ऀ-ॿ]/.test(text);

/** The size the names' count calls for: the image's 84, 68 and 56. */
function nameTier(count: number): number {
  return count <= 2 ? 84 : count === 3 ? 68 : 56;
}

/* --- the pieces ------------------------------------------------------------- */

/**
 * The morning seal (spec 5.2) at the sheet's own scale: a sindoor disc with a
 * hard ink offset, a dashed marigold ring, the count in marigold Eczar 800,
 * turned 10deg. Drawn in a 100-unit box so it scales with the sheet, which
 * the kit's pixel-sized `Seal` cannot.
 */
function SheetSeal({ n, lines, deva, d }: { n: number; lines: [string, string]; deva: boolean; d: number }) {
  const step = deva ? 18 : 15.75;
  return (
    <svg
      data-morning={n}
      aria-hidden="true"
      viewBox="0 0 100 100"
      overflow="visible"
      style={{ width: u(d), height: u(d), transform: "rotate(10deg)", display: "block" }}
    >
      <circle cx="55" cy="55" r="50" fill="var(--ink)" />
      <circle cx="50" cy="50" r="50" fill="var(--sindoor)" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="var(--marigold)" strokeWidth="2.6" strokeDasharray="5.5 4" />
      {lines.map((line, i) => (
        <text
          key={i}
          x="50"
          y={(55.1 + (i === 0 ? -step / 2 : step / 2)).toFixed(2)}
          textAnchor="middle"
          fill="var(--marigold)"
          style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 15, fontSynthesis: "none" }}
        >
          {line}
        </text>
      ))}
    </svg>
  );
}

/**
 * The gauge (spec 5.5) at the sheet's scale: five fills at 1 : 2 : 4 : 2 : 1,
 * an ink frame, the dashed line at "usual", and today's sindoor dot ringed in
 * ink. A quiet feed draws no dot.
 */
function SheetGauge({ percentile }: { percentile: number | null }) {
  const model = gaugeModel(percentile);
  const h = 48;
  const frame = h / 8;
  return (
    <div data-gauge="" aria-hidden="true" className="relative" style={{ height: u(h) }}>
      <div className="flex h-full" style={{ border: `${u(frame)} solid var(--ink)` }}>
        {model.segments.map((s, i) => (
          <i
            key={s.band}
            className="block h-full"
            style={{ flexGrow: Math.round((s.to - s.from) * 10), backgroundColor: `var(--gauge-${i + 1})` }}
          />
        ))}
      </div>
      <span
        className="absolute"
        style={{
          left: "50%",
          top: u(-h * 0.33),
          height: u(h * 1.66),
          borderLeft: `${u(frame)} dashed var(--ink)`,
          transform: "translateX(-50%)",
        }}
      />
      {model.dot !== null ? (
        <svg
          data-today=""
          viewBox="0 0 48 48"
          className="absolute"
          style={{
            left: `${(model.dot * 100).toFixed(2)}%`,
            top: 0,
            width: u(h),
            height: u(h),
            transform: "translateX(-50%)",
            overflow: "visible",
          }}
        >
          <circle cx="24" cy="24" r="24" fill="var(--sindoor)" stroke="var(--ink)" strokeWidth={frame} />
        </svg>
      ) : null}
    </div>
  );
}

/** The closing river, drawn from the day's seed exactly as the image draws it. */
function ClosingRiver({ seed, percentile }: { seed: string; percentile: number | null }) {
  const height = 420;
  const sunR = SUN_R;
  const svg = closingRiver({
    seed,
    percentile,
    width: W,
    height,
    horizon: 24,
    sunX: W - 104 - sunR,
    sunR,
    colours: {
      paper: "var(--paper)",
      ink: "var(--ink)",
      teal: "var(--teal)",
      sindoor: "var(--sindoor)",
      marigold: "var(--marigold)",
    },
  });
  return (
    <svg
      data-river=""
      aria-hidden="true"
      /* The box reaches above the horizon by the sun's height, so the sun
         rises over the water instead of being cut by the box's own edge. */
      viewBox={`0 ${-sunR} ${W} ${height + sunR}`}
      className="block w-full"
      style={{ height: u(height + sunR) }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

/* --- the sheet -------------------------------------------------------------- */

export type PatraSheetProps = {
  /** A bare view prints what is shared; the owner's record adds the sankalp. */
  data: PatraView | PatraRecord;
  className?: string;
};

export function PatraSheet({ data, className = "" }: PatraSheetProps) {
  const lang = data.locale === "hi" ? "hi" : "en";
  const t = patraContent[lang].sheet;
  const deva = lang === "hi";
  const sankalp = "sankalp" in data ? data.sankalp : null;

  const names = data.names.filter((n) => n.trim()).slice(0, 5);
  const tier = nameTier(names.length);
  const [before, river, after] = t.place(data);
  const plain = data.figureKind === "modelled" ? (flowContent[lang].plain[data.band as FlowBand] ?? null) : null;
  const figure = data.flow;
  const rank = data.figureKind === "modelled" && data.rank !== null ? t.rank(Number(data.rank)) : t.median;
  const n = data.morning ?? 0;
  const seal = n >= 2 ? t.morning(n) : null;

  /* The pinned print, as the image places it: the mount 288 tall at 5 : 6,
     its right edge 104 in from the picture's, centred on the picture. */
  const pic = 440;
  const mount = 288;
  const mountW = (mount * 5) / 6;
  const pad = mount / 24;
  const sealD = mount * 0.53;

  return (
    <div data-patra-print className={`w-full ${devaFontClass} ${className}`} style={{ containerType: "inline-size" }}>
      <style href="snanify-patra-print" precedence="medium">
        {PRINT_CSS}
      </style>

      <article
        data-patra-sheet
        lang={lang}
        aria-label={data.specimen ? t.specimenTitle : t.aria}
        className="relative overflow-hidden"
        style={{
          ...DAY_TOKENS,
          backgroundColor: "var(--paper)",
          color: "var(--ink)",
          padding: `${u(64)} ${u(M)} ${u(48)}`,
        }}
      >
        {/* header: the sheet's name in sindoor, the date and the tithi */}
        <div className="flex items-baseline justify-between" style={{ gap: u(32) }}>
          <p style={display(36, 700, { color: "var(--sindoor)", lineHeight: 1.2 })}>
            {data.specimen ? t.specimenTitle : t.title}
          </p>
          <p className="text-right" style={sans(30, { color: "var(--ink-2)", lineHeight: 1.3 })}>
            {data.keptDate} · {data.tithi}
          </p>
        </div>

        {/* the ghat, full width, with the print pinned on it and the seal */}
        <div className="relative" style={{ marginTop: u(40), height: u(pic) }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/waters/${data.waterSlug}.webp`}
            alt=""
            className="block h-full w-full object-cover"
          />
          {data.portraitUrl ? (
            <div
              data-portrait=""
              className="absolute"
              style={{
                right: u(mount * 0.36),
                top: u((pic - mount) / 2),
                width: u(mountW),
                height: u(mount),
                transform: "rotate(3deg)",
              }}
            >
              <span
                className="absolute"
                style={{ left: u(pad), top: u(pad), width: "100%", height: "100%", backgroundColor: "var(--ink)" }}
              />
              <span className="absolute inset-0" style={{ backgroundColor: "var(--paper)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.portraitUrl}
                alt=""
                className="absolute object-cover"
                style={{
                  left: u(pad),
                  top: u(pad),
                  width: u(mountW - 2 * pad),
                  height: u(mount - 2 * pad),
                  filter: "grayscale(1) contrast(1.1)",
                  outline: `${u(pad / 3)} solid var(--ink)`,
                  outlineOffset: `-${u(pad / 3)}`,
                }}
              />
              {seal ? (
                <span
                  className="absolute"
                  style={{ left: u(mountW + sealD * 0.18 - sealD / 2), top: u(-sealD * 0.13 - sealD / 2) }}
                >
                  <SheetSeal n={n} lines={seal} deva={deva} d={sealD} />
                </span>
              ) : null}
            </div>
          ) : seal ? (
            <span className="absolute" style={{ right: u(20), top: u(-sealD * 0.13) }}>
              <SheetSeal n={n} lines={seal} deva={deva} d={sealD} />
            </span>
          ) : null}
        </div>

        {/* the names, one per line in capitals; a long name wraps under itself */}
        <ul style={{ marginTop: u(72) }}>
          {names.map((name, i) => (
            <li
              key={`${name}-${i}`}
              data-name-line={tier}
              style={display(tier, 800, {
                textTransform: "uppercase",
                lineHeight: hasDeva(name) ? 1.22 : 1.05,
                letterSpacing: "-0.01em",
                overflowWrap: "anywhere",
              })}
            >
              {name}
            </li>
          ))}
        </ul>

        {/* where: the river in sindoor */}
        <p style={sans(40, { marginTop: u(16), lineHeight: 1.35 })}>
          {before}
          <span style={{ color: "var(--sindoor)", fontWeight: 700 }}>{river}</span>
          {after}
        </p>

        {/* the owner's own words, under the names; only their copy has them */}
        {sankalp ? (
          <p
            data-sankalp=""
            style={display(48, 700, { marginTop: u(48), lineHeight: hasDeva(sankalp) ? 1.5 : 1.3 })}
          >
            <span className="sr-only">{t.sankalpAria}: </span>
            {sankalp}
          </p>
        ) : null}

        {/* the prayer, as written */}
        {data.prayer ? (
          <div lang="sa" style={{ marginTop: u(64), fontFamily: SERIF, fontSize: u(46), lineHeight: 1.5 }}>
            {data.prayer.devanagari.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ) : null}

        {/* how the river ran: the word, the plain line, the gauge, the proof */}
        <div style={{ marginTop: u(72) }}>
          <p style={display(60, 800, { lineHeight: 1.1 })}>
            {data.state}
            {t.stop}
          </p>
          {plain ? <p style={sans(34, { color: "var(--ink-2)", marginTop: u(8), lineHeight: 1.35 })}>{plain}</p> : null}
          <div className="flex items-end" style={{ marginTop: u(28), gap: u(40) }}>
            <div className="min-w-0 flex-1">
              <SheetGauge percentile={data.percentile} />
            </div>
            <div className="text-right" style={sans(30, { color: "var(--ink-2)", lineHeight: 1.35 })}>
              <p className="tabular">{figure}</p>
              <p>{rank}</p>
            </div>
          </div>
        </div>

        {/* the closing river, edge to edge */}
        <div style={{ marginTop: u(96 - SUN_R), marginLeft: u(-M), marginRight: u(-M) }}>
          <ClosingRiver seed={data.seed} percentile={data.percentile} />
        </div>

        {/* the foot: the person's clock, India's, the distance, the address */}
        <div className="flex items-baseline justify-between" style={{ marginTop: u(40), gap: u(32) }}>
          <p className="tabular" style={sans(32, { color: "var(--ink-2)", lineHeight: 1.35 })}>
            {[data.keptLocal, `${data.keptIst} IST`, data.distance].filter(Boolean).join(" · ")}
          </p>
          <p style={sans(32, { fontWeight: 700, lineHeight: 1.35 })}>snanify.com</p>
        </div>
      </article>
    </div>
  );
}
