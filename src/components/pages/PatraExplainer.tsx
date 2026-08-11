import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/Reveal";
import { ChihnaSheetViewer } from "@/components/SankalpPatra";
import { Card, Eyebrow, LinkButton, Section, SectionHeader, StatusBadge } from "@/components/ui";
import {
  chihnaContent,
  specimenChihna,
  SPECIMEN_CANONICAL,
  SPECIMEN_SEED,
} from "@/content/patra";
import { localePath } from "@/lib/i18n";
/* This page exists in English and Hindi only; see the tier note and the
   FULL_ONLY list at the top of src/lib/locales.ts. `Lang` here is therefore
   the full-depth pair and not the twelve locales the site serves. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   /patra, what the Jal Chihna is, what it records, what it refuses to claim,
   and how a stranger checks one without reading it.

   Set as almanac pages: ruled registers rather than card grids, index numerals
   in the spot colour, and the specimen sheet itself as the one illustration.

   Built for a 390px viewport first. Every register on this page is a stack of
   ruled rows at that width and only becomes columnar further up; the specimen
   sheet, which cannot reflow because it is a document, carries its own
   full-size viewer instead.
   --------------------------------------------------------------------------- */

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(n: number, lang: Lang, pad = 2): string {
  const s = String(n).padStart(pad, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

/** A hairline schematic of the sheet. The numbers key into the list beside it. */
function AnatomyDiagram({ title, id, lang }: { title: string; id: string; lang: Lang }) {
  const rule = (y: number) => (
    <line key={`r${y}`} x1={44} y1={y} x2={296} y2={y} stroke="var(--rule)" strokeWidth={1} />
  );

  const strongRule = (y: number) => (
    <line
      key={`s${y}`}
      x1={44}
      y1={y}
      x2={296}
      y2={y}
      stroke="var(--rule-strong)"
      strokeWidth={2}
    />
  );

  /** A text line: x, y, width, weight, opacity. */
  const bar = (x: number, y: number, w: number, sw = 3, o = 0.34) => (
    <line
      key={`b${x}-${y}-${w}`}
      x1={x}
      y1={y}
      x2={x + w}
      y2={y}
      stroke="var(--ink-2)"
      strokeWidth={sw}
      opacity={o}
    />
  );

  /** Centred bar, for the title / names / sankalp blocks. */
  const cbar = (y: number, w: number, sw = 3, o = 0.34) => bar(170 - w / 2, y, w, sw, o);

  /** One register cell: a label bar over two value bars. */
  const cell = (x: number, y: number) => (
    <g key={`c${x}-${y}`}>
      {bar(x, y + 10, 32, 2, 0.45)}
      {bar(x, y + 20, 62, 2.6, 0.32)}
      {bar(x, y + 28, 40, 2.6, 0.32)}
    </g>
  );

  /* The keys are struck as solid spot-colour slugs, the way a numbered plate is
     printed, not as outlined dots. */
  const marker = (n: number, x: number, y: number) => (
    <g key={`m${n}`}>
      <rect x={x - 10} y={y - 8} width={20} height={16} fill="var(--spot)" />
      <text
        x={x}
        y={y}
        dy="0.36em"
        textAnchor="middle"
        fill="var(--paper)"
        style={{
          fontFamily: "var(--font-eczar), Georgia, serif",
          fontWeight: 600,
          fontSize: "10px",
        }}
      >
        {numeral(n, lang, 1)}
      </text>
    </g>
  );

  const cols = [44, 128, 212];

  return (
    <svg
      viewBox="0 0 340 500"
      className="h-auto w-full"
      role="img"
      aria-labelledby={id}
      preserveAspectRatio="xMidYMin meet"
    >
      <title id={id}>{title}</title>

      {/* the sheet, double ruled */}
      <rect
        x={30}
        y={16}
        width={280}
        height={456}
        fill="var(--paper)"
        stroke="var(--rule-strong)"
        strokeWidth={1.5}
      />
      <rect x={38} y={24} width={264} height={440} fill="none" stroke="var(--rule)" strokeWidth={1} />

      {/* masthead */}
      <circle cx={52} cy={38} r={6} fill="none" stroke="var(--ink-2)" strokeWidth={1.2} />
      {bar(64, 38, 34, 2.6, 0.5)}
      {bar(224, 38, 52, 2, 0.34)}
      {/* the masthead rule: heavy over hairline */}
      <line x1={44} y1={54} x2={296} y2={54} stroke="var(--rule-strong)" strokeWidth={2.4} />
      {rule(58)}

      {/* title block: title, latin line, subtitle, sequence */}
      {cbar(76, 76, 4.5, 0.55)}
      {cbar(86, 46, 2.4, 0.34)}
      {cbar(96, 108, 2, 0.24)}
      {cbar(104, 84, 2, 0.2)}

      {/* names, gotra */}
      {cbar(128, 136, 5, 0.6)}
      {cbar(138, 92, 3, 0.34)}
      {cbar(150, 74, 3.4, 0.4)}
      {cbar(160, 64, 2.4, 0.3)}

      {/* sankalp */}
      <line x1={140} y1={174} x2={200} y2={174} stroke="var(--rule)" strokeWidth={1} />
      {cbar(184, 190, 2.6, 0.3)}
      {cbar(192, 150, 2.6, 0.3)}

      {/* the register, three ruled rows of three */}
      {strongRule(206)}
      {cols.map((x) => cell(x, 206))}
      {rule(244)}
      {cols.map((x) => cell(x, 244))}
      {rule(282)}
      {cols.map((x) => cell(x, 282))}
      {strongRule(320)}

      {/* the state line */}
      {bar(44, 330, 44, 2, 0.45)}
      {bar(44, 340, 226, 3, 0.4)}
      {bar(44, 348, 160, 3, 0.4)}

      {/* verification line and the colophon */}
      {rule(358)}
      {bar(44, 368, 40, 2, 0.45)}
      {bar(44, 378, 130, 2.6, 0.32)}
      <g>
        <circle cx={270} cy={372} r={17} fill="none" stroke="var(--ink-2)" strokeWidth={1} />
        <circle cx={270} cy={372} r={14} fill="none" stroke="var(--ink-2)" strokeWidth={2} />
        <circle cx={270} cy={367.5} r={4.4} fill="var(--spot)" />
        <g fill="var(--ink-2)">
          <rect x={263} y={374} width={14} height={1.8} />
          <rect x={259.5} y={377.5} width={21} height={1.8} />
        </g>
      </g>

      {/* attestation and the foot line */}
      {bar(44, 400, 240, 2.4, 0.34)}
      {bar(44, 408, 200, 2.4, 0.34)}
      {bar(44, 422, 248, 2, 0.18)}
      {bar(44, 430, 232, 2, 0.18)}
      {bar(44, 438, 180, 2, 0.18)}

      {/* the numbered keys */}
      {marker(1, 288, 38)}
      {marker(2, 52, 128)}
      {marker(3, 52, 160)}
      {marker(4, 52, 184)}
      {marker(5, 52, 206)}
      {marker(6, 136, 206)}
      {marker(7, 220, 206)}
      {marker(8, 136, 244)}
      {marker(9, 52, 282)}
      {marker(10, 220, 282)}
    </svg>
  );
}

export function ChihnaExplainer({ lang }: { lang: Lang }) {
  const t = chihnaContent[lang];

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath="/patra" />

      <main>
        {/* ------------------------------ hero ------------------------------ */}
        <section className="border-b-2 border-rulestrong">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-12 pb-16 sm:px-8 sm:pt-20 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <div className="ink-in">
                <Eyebrow>{t.hero.eyebrow}</Eyebrow>
              </div>
              <h1
                className="ink-in display mt-5 text-[2.6rem] sm:text-6xl"
                style={{ animationDelay: "80ms" }}
              >
                {t.hero.title}
              </h1>

              <div className="rule-double mt-7 max-w-md" />

              <p
                className="ink-in mt-6 max-w-xl text-[1.05rem] leading-[1.75] text-ink2"
                style={{ animationDelay: "160ms" }}
              >
                {t.hero.lede}
              </p>

              <p
                className="ink-in mt-6 max-w-xl border-l-2 border-spot pl-4 text-[0.95rem] leading-[1.7] text-ink"
                style={{ animationDelay: "200ms" }}
              >
                {t.hero.honesty}
              </p>

              <div
                className="ink-in mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                style={{ animationDelay: "240ms" }}
              >
                <LinkButton href={localePath(lang, "/patra/sample")}>{t.hero.primary}</LinkButton>
                <LinkButton href={localePath(lang, "/verify")} variant="ghost">
                  {t.hero.secondary}
                </LinkButton>
              </div>
            </div>

            <figure className="ink-in mx-auto w-full max-w-[26rem]" style={{ animationDelay: "320ms" }}>
              {/* the one misregistered impression on this page: the specimen
                  sheet, struck a few points off in the spot colour */}
              <ChihnaSheetViewer
                lang={lang}
                data={specimenChihna(lang)}
                watermark
                sheetClassName="misregister"
              />
              <figcaption className="label mt-6 text-center text-ink2">
                {t.hero.previewCaption}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* -------------------------- how to read --------------------------- */}
        <Section id="reading">
          <Reveal>
            <SectionHeader eyebrow={t.read.eyebrow} title={t.read.title} lede={t.read.lede} />

            <dl className="mt-10 border-t-2 border-rulestrong">
              {t.read.items.map((item, i) => (
                <div
                  key={item.h}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-rule py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-x-8"
                >
                  <span aria-hidden="true" className="display text-2xl text-spot">
                    {numeral(i + 1, lang)}
                  </span>
                  <div>
                    <dt className="display text-xl">{item.h}</dt>
                    <dd className="mt-2 max-w-2xl leading-[1.75] text-ink2">{item.b}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </Section>

        {/* ---------------------------- anatomy ----------------------------- */}
        <Section id="anatomy" tinted>
          <Reveal>
            <SectionHeader
              eyebrow={t.anatomy.eyebrow}
              title={t.anatomy.title}
              lede={t.anatomy.lede}
            />

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
              {/* On a phone the schematic is a small orientation drawing above
                  the list, not a thing to read; the list carries the content. */}
              <div className="mx-auto w-full max-w-[16rem] lg:sticky lg:top-24 lg:max-w-none lg:self-start">
                <AnatomyDiagram
                  title={t.anatomy.diagramTitle}
                  id="chihna-anatomy-title"
                  lang={lang}
                />
              </div>

              <ol className="border-t-2 border-rulestrong">
                {t.anatomy.items.map((item) => (
                  <li
                    key={item.n}
                    className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-rule py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-x-8"
                  >
                    <span aria-hidden="true" className="display text-2xl text-spot">
                      {numeral(item.n, lang)}
                    </span>
                    <div>
                      <h3 className="display text-xl">{item.name}</h3>
                      <p className="mt-2 max-w-xl leading-[1.75] text-ink2">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------- unforgeability ------------------------- */}
        <Section id="proof">
          <Reveal>
            <SectionHeader eyebrow={t.proof.eyebrow} title={t.proof.title} lede={t.proof.lede} />

            <ol className="mt-10 grid gap-px border-2 border-rulestrong bg-rule sm:grid-cols-3">
              {t.proof.steps.map((s, i) => (
                <li key={s.h} className="bg-paper p-6 sm:p-7">
                  <span aria-hidden="true" className="display block text-4xl text-spot">
                    {numeral(i + 1, lang)}
                  </span>
                  <div className="rule-thin mt-4" />
                  <h3 className="display mt-4 text-xl">{s.h}</h3>
                  <p className="mt-3 leading-[1.75] text-ink2">{s.b}</p>
                </li>
              ))}
            </ol>

            {/* The specimen's own canonical line, printed in full. It is here so
                that a reader can hash it and get the seed on the sheet, which
                is the entire argument of this section made checkable. */}
            <div className="mt-12 border-2 border-rulestrong">
              <p className="label border-b border-rule bg-paper2 px-5 py-3 text-ink2 sm:px-7">
                {t.proof.canonicalLabel}
              </p>
              <p
                className="tabular px-5 py-6 text-[0.8125rem] leading-[1.9] break-all text-ink sm:px-7 sm:text-sm"
                style={{ letterSpacing: "0.02em" }}
              >
                {SPECIMEN_CANONICAL}
              </p>
              <div className="flex flex-col gap-4 border-t border-rule px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                {/* The seed is hexadecimal and case-sensitive, so it is set
                    outside the label element rather than inside it: the `label`
                    utility uppercases, and somebody will type this off paper. */}
                <p className="flex items-baseline gap-3">
                  <span className="label text-ink2">{t.proof.seedLabel}</span>
                  <span className="tabular text-lg tracking-[0.08em] text-spot">
                    {SPECIMEN_SEED}
                  </span>
                </p>
                <p className="max-w-xl text-sm leading-[1.7] text-ink2">
                  {t.proof.canonicalNote}
                </p>
              </div>
            </div>

            <h3 className="label mt-14 border-b-2 border-rulestrong pb-3 text-spot">
              {t.proof.consequenceHeading}
            </h3>
            <ul>
              {t.proof.consequences.map((c) => (
                <li key={c} className="flex gap-4 border-b border-rule py-5 leading-[1.75] text-ink2">
                  <span aria-hidden="true" className="mt-[0.7rem] h-[3px] w-4 shrink-0 bg-spot" />
                  <span className="max-w-3xl">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* --------------------------- restraint ---------------------------- */}
        <Section tinted>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <SectionHeader
                eyebrow={t.restraint.eyebrow}
                title={t.restraint.title}
                lede={t.restraint.lede}
              />

              <div>
                <figure className="border-l-2 border-spot pl-5 sm:pl-6">
                  <p className="label text-spot">{t.restraint.attestationLabel}</p>
                  <blockquote className="display mt-4 text-[1.4rem] leading-snug sm:text-[1.75rem]">
                    {t.restraint.attestation}
                  </blockquote>
                </figure>

                <ul className="mt-10 border-t-2 border-rulestrong">
                  {t.restraint.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-4 border-b border-rule py-5 leading-[1.75] text-ink2"
                    >
                      <span aria-hidden="true" className="mt-[0.7rem] h-[3px] w-4 shrink-0 bg-spot" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* -------------------------- verification -------------------------- */}
        <Section id="verification">
          <Reveal>
            <SectionHeader eyebrow={t.verify.eyebrow} title={t.verify.title} lede={t.verify.lede} />

            <ol className="mt-10 grid gap-px border-2 border-rulestrong bg-rule sm:grid-cols-3">
              {t.verify.steps.map((s, i) => (
                <li key={s.h} className="bg-paper p-6 sm:p-7">
                  <span aria-hidden="true" className="display block text-4xl text-spot">
                    {numeral(i + 1, lang)}
                  </span>
                  <div className="rule-thin mt-4" />
                  <h3 className="display mt-4 text-xl">{s.h}</h3>
                  <p className="mt-3 leading-[1.75] text-ink2">{s.b}</p>
                </li>
              ))}
            </ol>

            <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
              <div className="grid gap-10 sm:grid-cols-2">
                <div>
                  <h3 className="label border-b-2 border-rulestrong pb-3 text-spot">
                    {t.verify.showsHeading}
                  </h3>
                  <ul>
                    {t.verify.shows.map((s) => (
                      <li
                        key={s}
                        className="flex gap-3 border-b border-rule py-3.5 leading-relaxed text-ink2"
                      >
                        <span aria-hidden="true" className="mt-[0.55rem] h-2 w-2 shrink-0 bg-spot" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="label border-b-2 border-rulestrong pb-3 text-ink2">
                    {t.verify.hidesHeading}
                  </h3>
                  <ul>
                    {t.verify.hides.map((s) => (
                      <li
                        key={s}
                        className="flex gap-3 border-b border-rule py-3.5 leading-relaxed text-ink2"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] h-2 w-2 shrink-0 border border-ink2"
                        />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* An illustration of the checking response, not a live one. */}
              <div>
                <Card>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="label text-ink2">{t.verify.demoLabel}</p>
                    <StatusBadge>{t.verify.demoStatus}</StatusBadge>
                  </div>

                  <p className="display mt-6 text-2xl tracking-wide sm:text-3xl">
                    {t.verify.demoName}
                  </p>
                  <p className="mt-3 text-ink2">{t.verify.demoRiver}</p>

                  <dl className="mt-7 border-t-2 border-rulestrong">
                    <div className="border-b border-rule py-3 sm:flex sm:items-baseline sm:justify-between sm:gap-4">
                      <dt className="label text-ink2">{t.verify.demoKeptLabel}</dt>
                      <dd className="tabular mt-1 text-ink sm:mt-0 sm:text-right">
                        {t.verify.demoKept}
                      </dd>
                    </div>
                    <div className="border-b border-rule py-3 sm:flex sm:items-baseline sm:justify-between sm:gap-4">
                      <dt className="label text-ink2">{t.verify.demoReadingLabel}</dt>
                      <dd className="tabular mt-1 text-ink sm:mt-0 sm:text-right">
                        {t.verify.demoReading}
                      </dd>
                    </div>
                    <div className="py-3 sm:flex sm:items-baseline sm:justify-between sm:gap-4">
                      <dt className="label text-ink2">{t.verify.demoSeedLabel}</dt>
                      <dd className="tabular mt-1 tracking-[0.08em] text-spot sm:mt-0 sm:text-right">
                        {SPECIMEN_SEED}
                      </dd>
                    </div>
                  </dl>
                </Card>
                <p className="mt-4 text-sm leading-relaxed text-ink2">{t.verify.demoCaption}</p>
                <Link
                  href={localePath(lang, "/verify")}
                  className="label mt-5 inline-flex min-h-11 items-center text-spot underline decoration-spot decoration-2 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                >
                  {t.verify.cta} →
                </Link>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ---------------------------- privacy ----------------------------- */}
        <Section tinted>
          <Reveal>
            <SectionHeader eyebrow={t.privacy.eyebrow} title={t.privacy.title} />
            <dl className="mt-10 grid gap-x-16 border-t-2 border-rulestrong sm:grid-cols-2">
              {t.privacy.items.map((item) => (
                <div key={item.h} className="border-b border-rule py-6">
                  <dt className="display text-xl">{item.h}</dt>
                  <dd className="mt-2 max-w-md leading-[1.75] text-ink2">{item.b}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Section>

        {/* ---------------------------- formats ----------------------------- */}
        <Section>
          <Reveal>
            <SectionHeader eyebrow={t.formats.eyebrow} title={t.formats.title} />

            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {t.formats.items.map((item, i) => (
                <div key={item.h} className="border-t-2 border-rulestrong pt-6">
                  <span aria-hidden="true" className="display block text-3xl text-spot">
                    {numeral(i + 1, lang)}
                  </span>
                  <h3 className="display mt-3 text-xl">{item.h}</h3>
                  <p className="mt-3 leading-[1.75] text-ink2">{item.b}</p>
                </div>
              ))}
            </div>

            <p className="tint mt-12 border-l-2 border-spot py-4 pr-5 pl-5 text-[1.05rem] leading-[1.75] text-ink sm:pr-6 sm:pl-6 sm:text-lg">
              {t.formats.nothingShipped}
            </p>
          </Reveal>
        </Section>

        {/* ---------------------------- closing ----------------------------- */}
        <Section tinted className="text-center">
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <div className="rule-double mx-auto max-w-[6rem]" />
              <h2 className="display mt-8 text-[2.2rem] sm:text-5xl">{t.closing.title}</h2>
              <p className="mt-6 leading-[1.75] text-ink2">{t.closing.lede}</p>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
                <LinkButton href={localePath(lang, "/patra/sample")}>{t.closing.primary}</LinkButton>
                <LinkButton href={localePath(lang, "/how-it-works")} variant="ghost">
                  {t.closing.secondary}
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </Section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
