import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/Reveal";
import { SankalpPatra } from "@/components/SankalpPatra";
import {
  Card,
  Eyebrow,
  LinkButton,
  Section,
  SectionHeader,
  StatusBadge,
} from "@/components/ui";
import { patraContent, specimenPatra } from "@/content/patra";
import { localePath, type Lang } from "@/lib/i18n";

/* ---------------------------------------------------------------------------
   /patra, what the Sankalp Patra is, what it records, what it refuses to
   claim, and how a third party verifies one without reading it.

   Set as almanac pages: ruled registers rather than card grids, index numerals
   in the spot colour, and the specimen sheet itself as the one illustration.
   --------------------------------------------------------------------------- */

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(n: number, lang: Lang, pad = 2): string {
  const s = String(n).padStart(pad, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

/** A hairline schematic of the document. The numbers key into the list beside it. */
function AnatomyDiagram({ title, id, lang }: { title: string; id: string; lang: Lang }) {
  const rule = (y: number) => (
    <line key={`r${y}`} x1={44} y1={y} x2={296} y2={y} stroke="var(--rule)" strokeWidth={1} />
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

  return (
    <svg
      viewBox="0 0 340 460"
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
        height={396}
        fill="var(--paper)"
        stroke="var(--rule-strong)"
        strokeWidth={1.5}
      />
      <rect
        x={38}
        y={24}
        width={264}
        height={380}
        fill="none"
        stroke="var(--rule)"
        strokeWidth={1}
      />

      {/* header */}
      <circle cx={52} cy={36} r={6} fill="none" stroke="var(--ink-2)" strokeWidth={1.2} />
      {bar(64, 36, 34, 2.6, 0.5)}
      {bar(224, 36, 52, 2, 0.34)}
      {/* the masthead rule: heavy over hairline */}
      <line x1={44} y1={51} x2={296} y2={51} stroke="var(--rule-strong)" strokeWidth={2.4} />
      {rule(55)}

      {/* title block */}
      {cbar(72, 84, 4.5, 0.55)}
      {cbar(82, 50, 2.4, 0.34)}
      {cbar(94, 104, 2, 0.24)}
      {rule(106)}

      {/* names + gotra */}
      {cbar(124, 140, 5, 0.6)}
      {cbar(136, 96, 3, 0.34)}
      {cbar(146, 56, 2, 0.24)}
      {cbar(156, 70, 2.4, 0.34)}
      {rule(180)}

      {/* sankalp */}
      {cbar(193, 190, 2.6, 0.3)}
      {cbar(201, 200, 2.6, 0.3)}
      {cbar(209, 150, 2.6, 0.3)}

      {/* fact grid, two rows of three, opened on the strong rule */}
      <line x1={44} y1={222} x2={296} y2={222} stroke="var(--rule-strong)" strokeWidth={2} />
      {[44, 128, 212].map((x) => (
        <g key={`c1-${x}`}>
          {bar(x, 232, 32, 2, 0.45)}
          {bar(x, 242, 62, 2.6, 0.32)}
          {bar(x, 250, 40, 2.6, 0.32)}
        </g>
      ))}
      {rule(262)}
      {[44, 128, 212].map((x) => (
        <g key={`c2-${x}`}>
          {bar(x, 272, 32, 2, 0.45)}
          {bar(x, 282, 62, 2.6, 0.32)}
          {bar(x, 290, 40, 2.6, 0.32)}
        </g>
      ))}
      <line x1={44} y1={302} x2={296} y2={302} stroke="var(--rule-strong)" strokeWidth={2} />

      {/* verification line + the colophon */}
      {bar(44, 314, 40, 2, 0.45)}
      {bar(44, 326, 130, 2.6, 0.32)}
      <g>
        <circle cx={272} cy={320} r={17} fill="none" stroke="var(--ink-2)" strokeWidth={1} />
        <circle cx={272} cy={320} r={14} fill="none" stroke="var(--ink-2)" strokeWidth={2} />
        <circle cx={272} cy={315.5} r={4.4} fill="var(--spot)" />
        <g fill="var(--ink-2)">
          <rect x={265} y={322} width={14} height={1.8} />
          <rect x={261.5} y={325.5} width={21} height={1.8} />
        </g>
      </g>
      {rule(344)}

      {/* attestation + footer line */}
      {bar(44, 354, 240, 2.4, 0.34)}
      {bar(44, 362, 200, 2.4, 0.34)}
      {bar(44, 376, 248, 2, 0.18)}
      {bar(44, 384, 220, 2, 0.18)}
      {bar(44, 392, 180, 2, 0.18)}

      {/* the numbered keys */}
      {marker(1, 288, 36)}
      {marker(2, 52, 106)}
      {marker(3, 52, 156)}
      {marker(4, 52, 180)}
      {marker(5, 52, 222)}
      {marker(6, 136, 222)}
      {marker(7, 220, 222)}
      {marker(8, 52, 262)}
      {marker(9, 136, 262)}
      {marker(10, 52, 302)}
    </svg>
  );
}

export function PatraExplainer({ lang }: { lang: Lang }) {
  const t = patraContent[lang];

  /* "Sankalp" is a section of the home page, not a route of its own, the
     same anchor the rivers and rituals pages link to. */

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath="/patra" />

      <main>
        {/* ------------------------------ hero ------------------------------ */}
        <section className="border-b-2 border-rulestrong">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="ink-in">
                <Eyebrow>{t.hero.eyebrow}</Eyebrow>
              </div>
              <h1
                className="ink-in display mt-6 text-[2.9rem] sm:text-6xl"
                style={{ animationDelay: "80ms" }}
              >
                {t.hero.title}
              </h1>

              <div className="rule-double mt-8 max-w-md" />

              <p
                className="ink-in mt-6 max-w-xl text-[1.05rem] leading-[1.75] text-ink2"
                style={{ animationDelay: "160ms" }}
              >
                {t.hero.lede}
              </p>
              <div
                className="ink-in mt-9 flex flex-wrap items-center gap-3"
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
              <div className="misregister">
                <SankalpPatra lang={lang} data={specimenPatra(lang)} watermark />
              </div>
              <figcaption className="label mt-7 text-center text-ink2">
                {t.hero.previewCaption}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---------------------------- anatomy ----------------------------- */}
        <Section id="anatomy">
          <Reveal>
            <SectionHeader
              eyebrow={t.anatomy.eyebrow}
              title={t.anatomy.title}
              lede={t.anatomy.lede}
            />

            <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <AnatomyDiagram
                  title={t.anatomy.diagramTitle}
                  id="patra-anatomy-title"
                  lang={lang}
                />
              </div>

              <ol className="border-t-2 border-rulestrong">
                {t.anatomy.items.map((item) => (
                  <li
                    key={item.n}
                    className="grid grid-cols-[2.75rem_1fr] gap-x-5 border-b border-rule py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-x-8"
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

        {/* --------------------------- restraint ---------------------------- */}
        <Section tinted>
          <Reveal>
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <SectionHeader
                eyebrow={t.restraint.eyebrow}
                title={t.restraint.title}
                lede={t.restraint.lede}
              />

              <div>
                <figure className="border-l-2 border-spot pl-6">
                  <p className="label text-spot">{t.restraint.attestationLabel}</p>
                  <blockquote className="display mt-4 text-2xl leading-snug sm:text-[1.75rem]">
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

            <ol className="mt-12 grid gap-px border-2 border-rulestrong bg-rule sm:grid-cols-3">
              {t.verify.steps.map((s, i) => (
                <li key={s.h} className="bg-paper p-7">
                  <span aria-hidden="true" className="display block text-4xl text-spot">
                    {numeral(i + 1, lang)}
                  </span>
                  <div className="rule-thin mt-4" />
                  <h3 className="display mt-4 text-xl">{s.h}</h3>
                  <p className="mt-3 text-sm leading-[1.75] text-ink2">{s.b}</p>
                </li>
              ))}
            </ol>

            <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
              <div className="grid gap-10 sm:grid-cols-2">
                <div>
                  <h3 className="label border-b-2 border-rulestrong pb-3 text-spot">
                    {t.verify.showsHeading}
                  </h3>
                  <ul>
                    {t.verify.shows.map((s) => (
                      <li
                        key={s}
                        className="flex gap-3 border-b border-rule py-3 text-sm leading-relaxed text-ink2"
                      >
                        <span aria-hidden="true" className="mt-[0.45rem] h-2 w-2 shrink-0 bg-spot" />
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
                        className="flex gap-3 border-b border-rule py-3 text-sm leading-relaxed text-ink2"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.45rem] h-2 w-2 shrink-0 border border-ink2"
                        />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* An illustration of the verification response, not a live one. */}
              <div>
                <Card>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="label text-ink2">{t.verify.demoLabel}</p>
                    <StatusBadge>{t.verify.demoStatus}</StatusBadge>
                  </div>

                  <p className="display mt-6 text-3xl tracking-wide">{t.verify.demoName}</p>
                  <p className="mt-3 text-sm text-ink2">{t.verify.demoRiver}</p>

                  <dl className="mt-7 border-t-2 border-rulestrong text-sm">
                    <div className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
                      <dt className="label text-ink2">{t.verify.demoDateLabel}</dt>
                      <dd className="tabular text-right text-ink">{t.verify.demoDate}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="label text-ink2">{t.verify.demoIssuedLabel}</dt>
                      <dd className="tabular text-right text-ink">{t.verify.demoIssued}</dd>
                    </div>
                  </dl>
                </Card>
                <p className="mt-4 text-xs leading-relaxed text-ink2">{t.verify.demoCaption}</p>
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
            <dl className="mt-12 grid gap-x-16 border-t-2 border-rulestrong sm:grid-cols-2">
              {t.privacy.items.map((item) => (
                <div key={item.h} className="border-b border-rule py-7">
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

            <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
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

            <p className="tint mt-14 border-l-2 border-spot py-4 pr-6 pl-6 text-lg leading-[1.75] text-ink">
              {t.formats.nothingShipped}
            </p>
          </Reveal>
        </Section>

        {/* ---------------------------- closing ----------------------------- */}
        <Section tinted className="text-center">
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <div className="rule-double mx-auto max-w-[6rem]" />
              <h2 className="display mt-10 text-4xl sm:text-5xl">{t.closing.title}</h2>
              <p className="mt-6 leading-[1.75] text-ink2">{t.closing.lede}</p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
