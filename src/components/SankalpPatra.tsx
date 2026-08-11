"use client";

import { useId } from "react";
import { Colophon, Mark } from "@/components/Logo";
import { patraContent, SPECIMEN_WATERMARK_TEXT, type PatraData } from "@/content/patra";
import type { Lang } from "@/lib/content";

/* ---------------------------------------------------------------------------
   The Sankalp Patra as a document.

   Cut as a printed certificate: newsprint ground, a double rule around the
   sheet, inscriptional capitals for every label, hairline rules between the
   record fields, and the colophon struck at the foot. Two colours only, ink
   and the vermillion spot. No gradient, no glow, no radius, no shadow.

   Prop-driven, so the issuance pipeline can render a real record later with the
   same component that renders the specimen today. Nothing here fetches, and
   nothing here invents: a field that is absent from `data` is either omitted or
   printed as an honest blank, never filled with a plausible value.

   Sizing: the sheet is laid out at a fixed 840 x 1188 (A4 proportion) and every
   measurement below is expressed as a fraction of the container width in `cqw`.
   The document therefore scales, never reflows, never breaks, from a 390px
   phone to a print sheet. If content ever exceeds the design height the box
   grows rather than clipping.
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

export type SankalpPatraProps = {
  lang: Lang;
  data: PatraData;
  /**
   * Marks the sheet as a specimen: tiled watermark, spot-colour rules, and a
   * stated banner. Anything not issued against a real record must set this.
   */
  watermark?: boolean;
  className?: string;
};

/* Small typographic primitives, shared by the fact cells. */

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
      style={{ paddingTop: u(12), paddingRight: u(14), minHeight: u(86) }}
    >
      <CellLabel>{label}</CellLabel>
      <div className="text-ink" style={{ marginTop: u(9), fontSize: u(14.5), lineHeight: 1.5 }}>
        {children}
      </div>
      {sub && (
        <p className="text-ink2" style={{ marginTop: u(5), fontSize: u(10.5), lineHeight: 1.45 }}>
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

export function SankalpPatra({ lang, data, watermark = false, className = "" }: SankalpPatraProps) {
  const t = patraContent[lang].sheet;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const patternId = `patra-wm-${uid}`;
  /* Devanagari is set in Eczar in both editions: the sheet titles itself in
     Devanagari even on an English page, so the face is pinned rather than
     inherited from a locale that may not carry the script. */
  const deva = "var(--font-eczar), Georgia, serif";
  const ringColour = watermark ? "var(--spot)" : "var(--rule)";

  return (
    <div className={`w-full ${className}`} style={{ containerType: "inline-size" }}>
      <style href="snanify-patra-print" precedence="medium">
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
                <span className="wordmark text-ink" style={{ fontSize: u(12) }}>
                  Snanify
                </span>
              </span>
              {/* The identifier is base58 and case-sensitive, so it must never
                  inherit the inscriptional uppercase transform, somebody will
                  type it off a printed sheet. */}
              <span className="text-ink2" style={{ fontSize: u(9.5), textAlign: "right" }}>
                {/* Every label carries its size inline: the `label` utility is
                    a fixed rem, and this sheet must scale as one block. */}
                <span className="label text-ink2" style={{ fontSize: u(9.5) }}>
                  {t.folioLabel}
                </span>
                <span style={{ paddingLeft: u(7), paddingRight: u(7) }}>·</span>
                <span className="tabular text-ink" style={{ letterSpacing: "0.05em" }}>
                  {data.patraId}
                </span>
              </span>
            </div>

            <div className="rule-masthead" style={{ marginTop: u(14) }} />

            {/* title */}
            <div className="text-center" style={{ marginTop: u(20) }}>
              <p
                className="display text-ink"
                style={{ fontSize: u(34), lineHeight: 1.35, fontFamily: deva }}
              >
                संकल्प पत्र
              </p>
              <p
                className="label text-spot"
                style={{
                  marginTop: u(10),
                  fontSize: u(10.5),
                  letterSpacing: "0.34em",
                  /* Latin in both editions, so it keeps its inscriptional caps
                     even where the Hindi rule drops them. */
                  textTransform: "uppercase",
                }}
              >
                {t.titleLatin}
              </p>
              <p className="text-ink2" style={{ marginTop: u(12), fontSize: u(11.5) }}>
                {t.subtitle}
              </p>

              {watermark && (
                <p
                  className="label text-spot"
                  style={{
                    marginTop: u(14),
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

          {/* names, gotra, sankalp */}
          <div>
            <div className="text-center">
              {/* A mixed list keeps the neutral heading; the remembrance label
                  then sits on the individual name it belongs to. Nothing else
                  about the row changes, no imagery, no colour. */}
              <CellLabel spot>
                {data.names.length > 0 && data.names.every((n) => n.remembrance)
                  ? t.remembranceLabel
                  : t.namesLabel}
              </CellLabel>

              <ul style={{ marginTop: u(14) }}>
                {data.names.map((n, i) => (
                  <li key={`${n.latin}-${i}`} style={{ marginTop: i === 0 ? 0 : u(16) }}>
                    <p
                      className="display text-ink"
                      style={{ fontSize: u(i === 0 ? 36 : 24), lineHeight: 1.15 }}
                    >
                      {n.latin}
                    </p>
                    {n.devanagari && (
                      <p
                        className="text-ink2"
                        style={{
                          marginTop: u(4),
                          fontSize: u(i === 0 ? 21 : 16),
                          fontFamily: deva,
                          lineHeight: 1.5,
                        }}
                      >
                        {n.devanagari}
                      </p>
                    )}
                    {(n.relation || n.remembrance) && (
                      <p className="label text-ink2" style={{ marginTop: u(7), fontSize: u(9.5) }}>
                        {[
                          n.remembrance && !data.names.every((x) => x.remembrance)
                            ? t.remembranceLabel
                            : null,
                          n.relation,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                  </li>
                ))}
              </ul>

              <p className="text-ink2" style={{ marginTop: u(16), fontSize: u(12.5) }}>
                <span className="label text-ink2" style={{ fontSize: u(10) }}>
                  {t.gotraLabel}
                </span>
                <span style={{ paddingLeft: u(10), paddingRight: u(10) }}>·</span>
                <span className="text-ink">{data.gotra ?? t.gotraUnstated}</span>
              </p>
            </div>

            {data.sankalpText && (
              <div className="text-center" style={{ marginTop: u(20) }}>
                <div
                  className="rule-thin"
                  style={{ marginLeft: u(300), marginRight: u(300) }}
                />
                <p className="label text-spot" style={{ marginTop: u(18), fontSize: u(9.5) }}>
                  {t.sankalpLabel}
                </p>
                <p
                  className="display mx-auto text-ink"
                  style={{
                    marginTop: u(12),
                    maxWidth: u(630),
                    fontSize: u(19.5),
                    lineHeight: 1.6,
                  }}
                >
                  {data.sankalpText}
                </p>
              </div>
            )}
          </div>

          {/* the facts, set as a ruled register */}
          <div
            className="grid grid-cols-3"
            style={{ columnGap: u(22), rowGap: u(18), marginTop: u(16) }}
          >
            <Cell label={t.riverLabel} opening>
              {data.river}
              <br />
              {data.ghat}, {data.place}
            </Cell>

            <Cell
              label={t.performedLabel}
              opening
              sub={data.performedLocal ? `${t.localLabel}, ${data.performedLocal}` : undefined}
            >
              {data.performedOn}
              <br />
              {data.performedIst}
            </Cell>

            {/* A tithi is printed only when it has been confirmed against a
                named panchang source. Unsourced, the field is omitted, never
                estimated. */}
            {data.tithi?.confidence === "sourced" ? (
              <Cell label={t.tithiLabel} opening>
                {data.tithi.label}
              </Cell>
            ) : (
              <BlankCell opening />
            )}

            <Cell label={t.ritvikLabel} sub={data.ritvik?.id}>
              {data.ritvik ? data.ritvik.name : <span className="text-ink2">{t.ritvikUnnamed}</span>}
            </Cell>

            {data.naamKshan ? (
              <Cell label={t.naamKshanLabel} sub={t.naamKshanSub}>
                <span className="tabular">
                  {data.naamKshan.timecode}
                  {data.naamKshan.clock ? ` · ${data.naamKshan.clock}` : ""}
                </span>
              </Cell>
            ) : (
              <BlankCell />
            )}

            <Cell label={t.issuedLabel}>{data.issuedOn}</Cell>
          </div>

          {/* seal, verification, attestation */}
          <div>
            <div
              className="flex items-end justify-between border-t-2 border-rulestrong"
              style={{ gap: u(20), paddingTop: u(18) }}
            >
              <div>
                <CellLabel>{t.verifyLabel}</CellLabel>
                <p
                  className="text-ink"
                  style={{
                    marginTop: u(8),
                    fontSize: u(14),
                    letterSpacing: "0.02em",
                    wordBreak: "break-word",
                  }}
                >
                  {data.verifyUrl}
                </p>
              </div>

              <span className="inline-block shrink-0" style={{ width: u(66), height: u(66) }}>
                <Colophon className="h-full w-full text-ink" />
              </span>
            </div>

            {watermark && (
              <p
                className="border-l-2 text-spot"
                style={{
                  marginTop: u(14),
                  paddingLeft: u(12),
                  borderColor: "var(--spot)",
                  fontSize: u(12),
                  lineHeight: 1.5,
                }}
              >
                {t.specimenBanner}
              </p>
            )}

            {/* The honesty lines are not fine print. Both clear 9pt when this
                sheet is printed at A4, which is the floor the certificate spec
                sets for the record line. */}
            <p
              className="text-ink"
              style={{ marginTop: u(watermark ? 14 : 20), fontSize: u(15), lineHeight: 1.55 }}
            >
              {t.attestation}
            </p>

            <p
              className="text-ink2"
              style={{ marginTop: u(10), fontSize: u(14.4), lineHeight: 1.55 }}
            >
              {t.footerLine}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
