"use client";

import { useId } from "react";
import { Mark } from "@/components/Logo";
import { patraContent, SPECIMEN_WATERMARK_TEXT, type PatraData } from "@/content/patra";
import type { Lang } from "@/lib/content";

/* ---------------------------------------------------------------------------
   The Sankalp Patra as a document.

   Prop-driven, so the issuance pipeline can render a real record later with the
   same component that renders the specimen today. Nothing here fetches, and
   nothing here invents: a field that is absent from `data` is either omitted or
   printed as an honest blank, never filled with a plausible value.

   Sizing: the sheet is laid out at a fixed 840 × 1188 (A4 proportion) and every
   measurement below is expressed as a fraction of the container width in `cqw`.
   The document therefore scales — never reflows, never breaks — from a 390px
   phone to a print sheet. If content ever exceeds the design height the box
   grows rather than clipping.
   --------------------------------------------------------------------------- */

const W = 840;
const H = 1188;

/** Design pixels → container-width units, so the whole sheet scales as one. */
const u = (px: number) => `${((px / W) * 100).toFixed(4)}cqw`;

/**
 * Print rules for the document. Injected via React's stylesheet hoisting so the
 * component stays self-contained and globals.css is untouched. In print the
 * sheet forces the light palette — a dark-theme reader printing a night-indigo
 * certificate would get an unreadable page.
 */
const PRINT_CSS = `
[data-patra-sheet]{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }
@media print{
  @page{ size: A4 portrait; margin: 12mm; }
  html, body{ background:#ffffff !important; }
  [data-patra-hide]{ display:none !important; }
  [data-patra-page]{ padding:0 !important; margin:0 !important; }
  [data-patra-sheet]{
    --bg:#fdf9f1; --bg-2:#fdf9f1; --bg-3:#f2e8d6;
    --ink:#16182b; --ink-2:#5c6076;
    --gold:#8a5d0a; --gold-2:#a06d0c; --sun:#c98a1e; --sun-2:#e8b25a;
    --teal:#135e58; --sindoor:#a5342a; --line:#d9c7a5;
    background-color:#fdf9f1 !important; color:#16182b !important;
    box-shadow:none !important;
    break-inside: avoid; page-break-inside: avoid;
  }
}
`;

export type SankalpPatraProps = {
  lang: Lang;
  data: PatraData;
  /**
   * Marks the sheet as a specimen: tiled watermark, sindoor rules, and a stated
   * banner. Anything not issued against a real record must set this.
   */
  watermark?: boolean;
  className?: string;
};

/* Small typographic primitives, shared by the fact cells. */

function CellLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inscription text-gold" style={{ fontSize: u(10) }}>
      {children}
    </p>
  );
}

function Cell({
  label,
  children,
  sub,
}: {
  label: string;
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <div
      className="border-t border-line/70"
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

export function SankalpPatra({ lang, data, watermark = false, className = "" }: SankalpPatraProps) {
  const t = patraContent[lang].sheet;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const patternId = `patra-wm-${uid}`;
  const edge = watermark ? "border-sindoor/40" : "border-line";

  return (
    <div className={`w-full ${className}`} style={{ containerType: "inline-size" }}>
      <style href="snanify-patra-print" precedence="medium">
        {PRINT_CSS}
      </style>

      <article
        data-patra-sheet
        aria-label={watermark ? t.ariaSpecimen : t.aria}
        className={`relative isolate flex flex-col overflow-hidden border bg-bg2 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.55)] ${edge}`}
        style={{
          aspectRatio: `${W} / ${H}`,
          padding: u(46),
          borderRadius: u(5),
        }}
      >
        {/* warm bloom from the top edge, as if lamplight fell on the page */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(70% 34% at 50% 0%, color-mix(in oklab, var(--gold) 14%, transparent), transparent 72%)",
          }}
        />

        {/* the inner rule — a printed document has two edges */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute border ${watermark ? "border-sindoor/25" : "border-line/70"}`}
          style={{ inset: u(16), borderRadius: u(3) }}
        />

        {watermark && (
          <svg
            aria-hidden="true"
            /* The viewBox matches the sheet's own proportions, so the tiled
               mark is measured in design pixels and scales with the document
               — the same watermark on a 390px phone and on an A4 print,
               rather than a huge one on the small preview. */
            viewBox={`0 0 ${W} ${H}`}
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{ zIndex: 1 }}
          >
            <defs>
              <pattern
                id={patternId}
                width="360"
                height="150"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(-24)"
              >
                <text
                  x="0"
                  y="34"
                  fill="var(--gold)"
                  opacity="0.14"
                  style={{
                    /* Tiro carries both scripts, so the bilingual watermark sets
                       in one face rather than falling back mid-string. */
                    fontFamily: "var(--font-tiro), Georgia, serif",
                    fontSize: "26px",
                    letterSpacing: "0.14em",
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
          {/* header: mark, wordmark, folio */}
          <div>
            <div className="flex items-start justify-between" style={{ gap: u(16) }}>
              <span className="inline-flex items-center" style={{ gap: u(10) }}>
                <span className="inline-block shrink-0" style={{ width: u(30), height: u(30) }}>
                  <Mark className="h-full w-full text-ink" />
                </span>
                <span className="wordmark text-ink" style={{ fontSize: u(12) }}>
                  Snanify
                </span>
              </span>
              {/* The identifier is base58 and case-sensitive, so it must never
                  inherit the inscriptional uppercase transform — somebody will
                  type it off a printed sheet. */}
              <span className="text-ink2" style={{ fontSize: u(9.5), textAlign: "right" }}>
                <span className="inscription">
                  {t.folioLabel}
                </span>
                <span style={{ paddingLeft: u(6), paddingRight: u(6) }}>·</span>
                <span style={{ letterSpacing: "0.05em" }}>{data.patraId}</span>
              </span>
            </div>

            <div
              className="rule-fade"
              style={{ marginTop: u(18), marginLeft: u(-2), marginRight: u(-2) }}
            />

            {/* title */}
            <div className="text-center" style={{ marginTop: u(24) }}>
              {/* The document titles itself in Devanagari in both locales, so
                  the face is pinned to Tiro rather than inherited — an English
                  page's display face has no Devanagari glyphs. */}
              <p
                className="text-ink"
                style={{
                  fontSize: u(33),
                  lineHeight: 1.1,
                  fontFamily: "var(--font-tiro), Georgia, serif",
                }}
              >
                संकल्प पत्र
              </p>
              <p
                className="wordmark text-gold"
                style={{ marginTop: u(10), fontSize: u(10.5), letterSpacing: "0.34em" }}
              >
                {t.titleLatin}
              </p>
              <p className="text-ink2" style={{ marginTop: u(12), fontSize: u(11.5) }}>
                {t.subtitle}
              </p>

              {watermark && (
                <p
                  className="inscription mx-auto inline-flex items-center border border-sindoor/50 text-sindoor"
                  style={{
                    marginTop: u(16),
                    borderRadius: u(999),
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
                  about the row changes — no imagery, no colour. */}
              <p className="inscription text-gold" style={{ fontSize: u(10) }}>
                {data.names.length > 0 && data.names.every((n) => n.remembrance)
                  ? t.remembranceLabel
                  : t.namesLabel}
              </p>

              <ul style={{ marginTop: u(16) }}>
                {data.names.map((n, i) => (
                  <li key={`${n.latin}-${i}`} style={{ marginTop: i === 0 ? 0 : u(18) }}>
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
                          fontFamily: "var(--font-tiro), Georgia, serif",
                          lineHeight: 1.5,
                        }}
                      >
                        {n.devanagari}
                      </p>
                    )}
                    {(n.relation || n.remembrance) && (
                      <p
                        className="inscription text-ink2"
                        style={{ marginTop: u(6), fontSize: u(10) }}
                      >
                        {[n.remembrance && !data.names.every((x) => x.remembrance)
                          ? t.remembranceLabel
                          : null, n.relation]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                  </li>
                ))}
              </ul>

              <p className="text-ink2" style={{ marginTop: u(18), fontSize: u(12.5) }}>
                <span className="inscription text-gold">
                  {t.gotraLabel}
                </span>
                <span style={{ paddingLeft: u(10), paddingRight: u(10) }}>·</span>
                <span className="text-ink">{data.gotra ?? t.gotraUnstated}</span>
              </p>
            </div>

            {data.sankalpText && (
              <div className="text-center" style={{ marginTop: u(26) }}>
                <div className="rule-fade" style={{ marginLeft: u(180), marginRight: u(180) }} />
                <p
                  className="inscription text-gold"
                  style={{ marginTop: u(20), fontSize: u(10) }}
                >
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

          {/* the facts */}
          <div
            className="grid grid-cols-3"
            style={{ columnGap: u(22), rowGap: u(20), marginTop: u(20) }}
          >
            <Cell label={t.riverLabel}>
              {data.river}
              <br />
              {data.ghat}, {data.place}
            </Cell>

            <Cell label={t.performedLabel} sub={data.performedLocal ? `${t.localLabel} — ${data.performedLocal}` : undefined}>
              {data.performedOn}
              <br />
              {data.performedIst}
            </Cell>

            {/* A tithi is printed only when it has been confirmed against a
                named panchang source. Unsourced, the field is omitted — never
                estimated. */}
            {data.tithi?.confidence === "sourced" ? (
              <Cell label={t.tithiLabel}>{data.tithi.label}</Cell>
            ) : (
              <div aria-hidden="true" className="border-t border-line/70" />
            )}

            <Cell label={t.ritvikLabel} sub={data.ritvik?.id}>
              {data.ritvik ? data.ritvik.name : <span className="text-ink2">{t.ritvikUnnamed}</span>}
            </Cell>

            {data.naamKshan ? (
              <Cell label={t.naamKshanLabel} sub={t.naamKshanSub}>
                {data.naamKshan.timecode}
                {data.naamKshan.clock ? ` · ${data.naamKshan.clock}` : ""}
              </Cell>
            ) : (
              <div aria-hidden="true" className="border-t border-line/70" />
            )}

            <Cell label={t.issuedLabel}>{data.issuedOn}</Cell>
          </div>

          {/* seal, verification, attestation */}
          <div>
            <div
              className="flex items-end justify-between border-t border-line/70"
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

              <span
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-gold/40"
                style={{ width: u(64), height: u(64) }}
              >
                <span className="inline-block" style={{ width: u(40), height: u(40) }}>
                  <Mark className="h-full w-full text-gold" />
                </span>
              </span>
            </div>

            {watermark && (
              <p
                className="border-l text-sindoor"
                style={{
                  marginTop: u(12),
                  paddingLeft: u(12),
                  borderColor: "var(--sindoor)",
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
