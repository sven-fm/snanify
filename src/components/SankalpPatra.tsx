"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Colophon, Mark, Wordmark } from "@/components/Logo";
import {
  chihnaContent,
  SPECIMEN_WATERMARK_TEXT,
  type ChihnaRecord,
} from "@/content/patra";
/* This page exists in English and Hindi only; see the tier note and the
   FULL_ONLY list at the top of src/lib/locales.ts. `Lang` here is therefore
   the full-depth pair and not the twelve locales the site serves. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   जल चिह्न · Jal Chihna, the printable A4 form.

   This file was the Sankalp Patra, a certificate of a rite performed by a
   person at a ghat. No rite is performed, so that document does not exist any
   more. The furniture does, and it was always the good part: the double rule,
   the folio line, the ruled register, the colophon at the foot, the `u()`
   unit system and the print CSS. All of it is kept. The title block, the field
   list and the foot line are the Jal Chihna's.

   What the sheet now asserts, and the whole of it: a name was kept at a stated
   moment, and the water was in a stated condition at that moment, according to
   a named public source. It never says a snan was performed for anybody,
   because none was. "Taken in the name of" is the strongest claim on it, and
   that claim is exactly true.

   Prop-driven, so the issuance pipeline can render a real record with the same
   component that renders the specimen today. Nothing here fetches, and nothing
   here invents: a field absent from `data` is either omitted or printed as an
   honest blank, never filled with a plausible value.

   Sizing: the sheet is laid out at a fixed 840 x 1188 (A4 proportion) and
   every measurement below is expressed as a fraction of the container width in
   `cqw`. The document therefore scales, never reflows, never breaks, from a
   390px phone to a print sheet. If content ever exceeds the design height the
   box grows rather than clipping.

   Phones: a fixed-ratio A4 document rendered into 366 usable pixels sets body
   type at about six pixels, which is a picture of a document rather than a
   document. `ChihnaSheetViewer` is therefore the component pages should reach
   for: it renders the sheet inline and gives the reader a full-size viewer,
   with the controls at the bottom of the screen where a thumb is.
   --------------------------------------------------------------------------- */

const W = 840;
const H = 1188;

/** Design pixels to container-width units, so the whole sheet scales as one. */
const u = (px: number) => `${((px / W) * 100).toFixed(4)}cqw`;

/**
 * Print rules for the document. Injected via React's stylesheet hoisting so the
 * component stays self-contained and globals.css is untouched. In print the
 * sheet forces the day edition: a reader printing the night edition would
 * otherwise get a solid black page.
 */
const PRINT_CSS = `
[data-patra-sheet]{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }
@media print{
  @page{ size: A4 portrait; margin: 12mm; }
  html, body{ background:#ffffff !important; }
  [data-patra-hide]{ display:none !important; }
  [data-patra-page]{ padding:0 !important; margin:0 !important; }
  [data-patra-sheet]{
    --paper:#faf6ea; --paper-2:#f2ead9; --paper-3:#e5d9be;
    --ink:#16130f; --ink-2:#57513f;
    --spot:#b32620; --rule:#c3b697; --rule-strong:#16130f;
    background-color:#faf6ea !important; color:#16130f !important;
    box-shadow:none !important;
    break-inside: avoid; page-break-inside: avoid;
  }
  [data-patra-sheet] *{ box-shadow:none !important; }
}
`;

export type ChihnaSheetProps = {
  lang: Lang;
  data: ChihnaRecord;
  /**
   * Marks the sheet as a specimen: tiled watermark, spot-colour rules, and a
   * stated banner. Anything not issued against a real record must set this.
   */
  watermark?: boolean;
  /**
   * The generative engraving for this chihna, drawn from the seed. Slotted
   * rather than built here, because the plate is a pure module the raster
   * routes share. Absent, nothing is drawn: a decorative stand-in on a
   * document whose entire argument is that nothing on it is decorative would
   * be the one dishonest mark on the page.
   */
  plate?: React.ReactNode;
  className?: string;
};

/* Small typographic primitives, shared by the register cells. */

/** An inscriptional column head, sized in sheet units like everything else. */
function CellLabel({
  children,
  spot = false,
}: {
  children: React.ReactNode;
  spot?: boolean;
}) {
  return (
    <p className={`label ${spot ? "text-spot" : "text-ink2"}`} style={{ fontSize: u(9.5) }}>
      {children}
    </p>
  );
}

function Cell({
  label,
  children,
  sub,
  opening = false,
}: {
  label: string;
  children: React.ReactNode;
  sub?: string;
  /** The first row of the register opens on the full-strength rule. */
  opening?: boolean;
}) {
  return (
    <div
      className={opening ? "border-t-2 border-rulestrong" : "border-t border-rule"}
      style={{ paddingTop: u(11), paddingRight: u(14), minHeight: u(72) }}
    >
      <CellLabel>{label}</CellLabel>
      <div className="text-ink" style={{ marginTop: u(8), fontSize: u(13.5), lineHeight: 1.45 }}>
        {children}
      </div>
      {sub && (
        <p className="text-ink2" style={{ marginTop: u(5), fontSize: u(10.5), lineHeight: 1.42 }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/** A cell that has nothing truthful to print. It keeps the rule running. */
function BlankCell({ opening = false }: { opening?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={opening ? "border-t-2 border-rulestrong" : "border-t border-rule"}
    />
  );
}

export function ChihnaSheet({
  lang,
  data,
  watermark = false,
  plate,
  className = "",
}: ChihnaSheetProps) {
  const t = chihnaContent[lang].sheet;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const patternId = `chihna-wm-${uid}`;
  /* Devanagari is set in Eczar in both editions: the sheet titles itself in
     Devanagari even on an English page, so the face is pinned rather than
     inherited from a locale that may not carry the script. */
  const deva = "var(--font-eczar), Georgia, serif";
  const ringColour = watermark ? "var(--spot)" : "var(--rule)";

  const allRemembrance =
    data.names.length > 0 && data.names.every((n) => n.remembrance);

  return (
    <div className={`w-full ${className}`} style={{ containerType: "inline-size" }}>
      <style href="snanify-chihna-print" precedence="medium">
        {PRINT_CSS}
      </style>

      <article
        data-patra-sheet
        aria-label={watermark ? t.ariaSpecimen : t.aria}
        className="relative isolate flex flex-col border-2 border-rulestrong bg-paper"
        style={{ aspectRatio: `${W} / ${H}`, padding: u(44) }}
      >
        {/* the inner rule: a printed document has two edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ inset: u(14), border: `1px solid ${ringColour}` }}
        />

        {watermark && (
          <svg
            aria-hidden="true"
            /* The viewBox matches the sheet's own proportions, so the tiled
               mark is measured in design pixels and scales with the document,
               the same watermark on a 390px phone and on an A4 print, rather
               than a huge one on the small preview. */
            viewBox={`0 0 ${W} ${H}`}
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{ zIndex: 1 }}
          >
            <defs>
              <pattern
                id={patternId}
                width="330"
                height="132"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(-24)"
              >
                <text
                  x="0"
                  y="30"
                  fill="var(--spot)"
                  opacity="0.13"
                  style={{
                    fontFamily: deva,
                    fontWeight: 700,
                    fontSize: "27px",
                    letterSpacing: "0.2em",
                  }}
                >
                  {SPECIMEN_WATERMARK_TEXT}
                </text>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        )}

        {/* --------------------------- the document --------------------------- */}
        <div className="relative flex flex-1 flex-col justify-between" style={{ zIndex: 2 }}>
          {/* masthead: mark, wordmark, folio */}
          <div>
            <div className="flex items-baseline justify-between" style={{ gap: u(16) }}>
              <span className="inline-flex items-center" style={{ gap: u(10) }}>
                <span className="inline-block shrink-0" style={{ width: u(26), height: u(26) }}>
                  <Mark className="h-full w-full text-ink" />
                </span>
                <Wordmark className="text-ink" style={{ fontSize: u(13) }} />
              </span>
              <span className="text-ink2" style={{ fontSize: u(9.5), textAlign: "right" }}>
                {/* Every label carries its size inline: the `label` utility is
                    a fixed rem, and this sheet must scale as one block. */}
                <span className="label text-ink2" style={{ fontSize: u(9.5) }}>
                  {t.folioLabel}
                </span>
                {data.folioNo && (
                  <>
                    <span style={{ paddingLeft: u(7), paddingRight: u(7) }}>·</span>
                    <span className="tabular text-ink" style={{ letterSpacing: "0.08em" }}>
                      {data.folioNo}
                    </span>
                  </>
                )}
              </span>
            </div>

            <div className="rule-masthead" style={{ marginTop: u(14) }} />

            {/* title */}
            <div className="text-center" style={{ marginTop: u(18) }}>
              <p
                className="display text-ink"
                style={{ fontSize: u(30), lineHeight: 1.35, fontFamily: deva }}
              >
                जल चिह्न
              </p>
              <p
                className="label text-spot"
                style={{
                  marginTop: u(9),
                  fontSize: u(10.5),
                  letterSpacing: "0.34em",
                  /* Latin in both editions, so it keeps its inscriptional caps
                     even where the Hindi rule drops them. */
                  textTransform: "uppercase",
                }}
              >
                {t.titleLatin}
              </p>
              <p className="text-ink2" style={{ marginTop: u(11), fontSize: u(11.5) }}>
                {t.subtitle}
              </p>
              {data.sequenceLine && (
                <p className="text-ink2" style={{ marginTop: u(6), fontSize: u(10.5) }}>
                  {data.sequenceLine}
                </p>
              )}

              {watermark && (
                <p
                  className="label text-spot"
                  style={{
                    marginTop: u(13),
                    display: "inline-block",
                    border: "1px solid var(--spot)",
                    paddingLeft: u(14),
                    paddingRight: u(14),
                    paddingTop: u(5),
                    paddingBottom: u(5),
                    fontSize: u(9),
                  }}
                >
                  {t.specimenChip}
                </p>
              )}
            </div>
          </div>

          {/* the engraving, when one has been drawn for this record */}
          {plate && (
            <div style={{ marginTop: u(18) }} aria-hidden="true">
              {plate}
            </div>
          )}

          {/* names, gotra, giver, sankalp */}
          <div>
            <div className="text-center">
              {/* A mixed list keeps the neutral heading; the remembrance label
                  then sits on the individual name it belongs to. Nothing else
                  about the row changes, no imagery, no colour. */}
              <CellLabel spot>{allRemembrance ? t.remembranceLabel : t.namesLabel}</CellLabel>

              <ul style={{ marginTop: u(13) }}>
                {data.names.map((n, i) => (
                  <li key={`${n.latin}-${i}`} style={{ marginTop: i === 0 ? 0 : u(15) }}>
                    <p
                      className="display text-ink"
                      style={{ fontSize: u(i === 0 ? 32 : 22), lineHeight: 1.15 }}
                    >
                      {n.latin}
                    </p>
                    {n.devanagari && (
                      <p
                        className="text-ink2"
                        style={{
                          marginTop: u(4),
                          fontSize: u(i === 0 ? 19 : 15),
                          fontFamily: deva,
                          lineHeight: 1.5,
                        }}
                      >
                        {n.devanagari}
                      </p>
                    )}
                    {(n.relation || n.remembrance) && (
                      <p className="label text-ink2" style={{ marginTop: u(6), fontSize: u(9.5) }}>
                        {[
                          n.remembrance && !allRemembrance ? t.remembranceLabel : null,
                          n.relation,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                  </li>
                ))}
              </ul>

              <p className="text-ink2" style={{ marginTop: u(14), fontSize: u(12) }}>
                <span className="label text-ink2" style={{ fontSize: u(10) }}>
                  {t.gotraLabel}
                </span>
                <span style={{ paddingLeft: u(10), paddingRight: u(10) }}>·</span>
                <span className="text-ink">{data.gotra ?? t.gotraUnstated}</span>
              </p>

              {/* A gift sheet with one name on it fails as a gift, every time. */}
              {data.givenBy && (
                <p className="text-ink2" style={{ marginTop: u(7), fontSize: u(12) }}>
                  <span className="label text-ink2" style={{ fontSize: u(10) }}>
                    {t.givenByLabel}
                  </span>
                  <span style={{ paddingLeft: u(10), paddingRight: u(10) }}>·</span>
                  <span className="text-ink">{data.givenBy}</span>
                </p>
              )}
            </div>

            {data.sankalpText && (
              <div className="text-center" style={{ marginTop: u(18) }}>
                <div className="rule-thin" style={{ marginLeft: u(300), marginRight: u(300) }} />
                <p className="label text-spot" style={{ marginTop: u(16), fontSize: u(9.5) }}>
                  {t.sankalpLabel}
                </p>
                <p
                  className="display mx-auto text-ink"
                  style={{
                    marginTop: u(11),
                    maxWidth: u(630),
                    fontSize: u(18),
                    lineHeight: 1.55,
                  }}
                >
                  {data.sankalpText}
                </p>
              </div>
            )}
          </div>

          {/* the record, set as a ruled register */}
          <div
            className="grid grid-cols-3"
            style={{ columnGap: u(22), rowGap: u(14), marginTop: u(16) }}
          >
            <Cell label={t.waterLabel} opening sub={data.waterNote}>
              {data.water}
              <br />
              {data.ghat}, {data.place}
            </Cell>

            <Cell
              label={t.keptLabel}
              opening
              sub={data.keptLocal ? `${t.localLabel}, ${data.keptLocal}` : undefined}
            >
              {data.keptOn}
              <br />
              {data.keptIst}
            </Cell>

            {/* A tithi is printed only when it has been confirmed against a
                named panchang source. Unsourced, the cell is a blank rule,
                never an estimate. */}
            {data.tithi?.confidence === "sourced" ? (
              <Cell label={t.tithiLabel} opening>
                {data.tithi.label}
              </Cell>
            ) : (
              <BlankCell opening />
            )}

            {data.window ? (
              <Cell label={t.windowLabel} sub={data.window.span}>
                {data.window.label}
              </Cell>
            ) : (
              <BlankCell />
            )}

            {data.flow ? (
              <Cell label={t.flowLabel} sub={data.flow.note}>
                <span className="tabular">{data.flow.value}</span>
              </Cell>
            ) : (
              <BlankCell />
            )}

            {/* Level, in one of its two honest forms: the published figure, or
                a plain statement that nobody publishes one for this reach. */}
            {data.level ? (
              <Cell label={t.levelLabel} sub={data.level.note}>
                <span className="tabular">{data.level.value}</span>
              </Cell>
            ) : data.levelUnavailable ? (
              <Cell label={t.levelLabel} sub={data.levelUnavailable.note}>
                <span className="text-ink2">{data.levelUnavailable.value}</span>
              </Cell>
            ) : (
              <BlankCell />
            )}

            {data.reading ? (
              <Cell label={t.readingLabel} sub={data.reading.agency}>
                {data.reading.at}
              </Cell>
            ) : (
              <BlankCell />
            )}

            {data.distance ? (
              <Cell label={t.distanceLabel} sub={data.distance.note}>
                <span className="tabular">{data.distance.value}</span>
              </Cell>
            ) : (
              <BlankCell />
            )}

            {/* The seed is a hex digest and the identifier is base58: neither
                may inherit the inscriptional uppercase transform, somebody
                will type them off a printed sheet. */}
            <Cell label={t.seedLabel}>
              <span className="tabular" style={{ letterSpacing: "0.06em" }}>
                {data.seed}
              </span>
            </Cell>
          </div>

          {/* the state of the water, verification, attestation */}
          <div>
            {data.stateLine && (
              <div className="border-t-2 border-rulestrong" style={{ paddingTop: u(13) }}>
                <CellLabel spot>{t.stateLabel}</CellLabel>
                <p
                  className="display text-ink"
                  style={{ marginTop: u(8), fontSize: u(16.5), lineHeight: 1.45 }}
                >
                  {data.stateLine}
                </p>
              </div>
            )}

            <div
              className={`flex items-end justify-between ${
                data.stateLine ? "border-t border-rule" : "border-t-2 border-rulestrong"
              }`}
              style={{ gap: u(20), paddingTop: u(16), marginTop: u(data.stateLine ? 14 : 0) }}
            >
              <div>
                <CellLabel>{t.verifyLabel}</CellLabel>
                <p
                  className="text-ink"
                  style={{
                    marginTop: u(8),
                    fontSize: u(13.5),
                    letterSpacing: "0.02em",
                    wordBreak: "break-word",
                  }}
                >
                  {data.verifyUrl}
                </p>
              </div>

              <span className="inline-block shrink-0" style={{ width: u(60), height: u(60) }}>
                <Colophon className="h-full w-full text-ink" />
              </span>
            </div>

            {watermark && (
              <p
                className="border-l-2 text-spot"
                style={{
                  marginTop: u(13),
                  paddingLeft: u(12),
                  borderColor: "var(--spot)",
                  fontSize: u(11.5),
                  lineHeight: 1.5,
                }}
              >
                {t.specimenBanner}
              </p>
            )}

            {/* The honesty lines are not fine print. Both clear 9pt when this
                sheet is printed at A4, which is the floor the record line is
                held to. */}
            <p
              className="text-ink"
              style={{ marginTop: u(watermark ? 13 : 18), fontSize: u(13.4), lineHeight: 1.55 }}
            >
              {t.attestation}
            </p>

            <p
              className="text-ink2"
              style={{ marginTop: u(9), fontSize: u(12.6), lineHeight: 1.55 }}
            >
              {t.footerLine}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

/* --------------------------------- viewer ---------------------------------- */

/**
 * The sheet, plus the one affordance a phone needs.
 *
 * An A4 document scaled into a 390px viewport is legible as an object and not
 * as a document, and pinch-to-zoom on a page that is not the document is a bad
 * answer. So: the sheet inline, and a full-height viewer with two honest
 * states, the whole sheet fitted to the screen and the sheet at its own
 * reading size with the reader panning it. Controls sit on the bottom edge,
 * inside a thumb's reach, at 52px tall.
 *
 * The overlay is its own scroll container, so nothing here can make the page
 * behind it scroll sideways. No transforms, no transitions, no filters: this
 * has to be cheap on a mid-range Android, and the design system has no
 * vocabulary for any of them anyway.
 */
export function ChihnaSheetViewer({
  lang,
  data,
  watermark = false,
  plate,
  className = "",
  sheetClassName = "",
}: ChihnaSheetProps & { sheetClassName?: string }) {
  const t = chihnaContent[lang].sheet;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"fit" | "read">("fit");

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Kept as three disjoint strings rather than one string plus an override:
     two competing background utilities on one element resolve by stylesheet
     order, not by the order they are written in. */
  const barButton =
    "label flex min-h-[52px] flex-1 items-center justify-center px-4 transition-colors";
  const barIdle = "bg-paper text-ink hover:bg-ink hover:text-paper";
  const barActive = "bg-ink text-paper";

  return (
    <div className={className}>
      <div className={sheetClassName}>
        <ChihnaSheet lang={lang} data={data} watermark={watermark} plate={plate} />
      </div>

      <button
        type="button"
        onClick={() => {
          setMode("fit");
          setOpen(true);
        }}
        data-patra-hide
        className="label mt-5 flex min-h-[52px] w-full items-center justify-center gap-3 border border-rulestrong px-6 text-ink transition-colors hover:bg-ink hover:text-paper sm:w-auto"
      >
        {t.viewFull}
        <span aria-hidden="true">↗</span>
      </button>

      {/* Portalled to the document body. Several of the places this sits
          inside (the misregistered hero figure, an `ink-in` block) establish
          their own stacking context, and a fixed overlay trapped inside one
          would paint underneath the paper grain. `open` can only become true
          from a click, so there is never a server render of this branch. */}
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.viewerAria}
            data-patra-hide
            className="fixed inset-0 z-[70] bg-paper"
          >
            <div className="h-full w-full overflow-auto px-3 pt-3 pb-[4.5rem]">
              <div
                className="mx-auto"
                style={
                  mode === "fit"
                    ? { width: `min(100%, calc((100dvh - 6.5rem) * ${W} / ${H}))` }
                    : { width: `${W}px`, maxWidth: "none" }
                }
              >
                <ChihnaSheet lang={lang} data={data} watermark={watermark} plate={plate} />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex gap-px border-t-2 border-rulestrong bg-rule">
              <button
                type="button"
                onClick={() => setMode("fit")}
                aria-pressed={mode === "fit"}
                className={`${barButton} ${mode === "fit" ? barActive : barIdle}`}
              >
                {t.viewFit}
              </button>
              <button
                type="button"
                onClick={() => setMode("read")}
                aria-pressed={mode === "read"}
                className={`${barButton} ${mode === "read" ? barActive : barIdle}`}
              >
                {t.viewRead}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={`${barButton} ${barIdle}`}
              >
                {t.viewClose}
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
