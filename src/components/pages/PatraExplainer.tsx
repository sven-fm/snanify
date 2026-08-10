import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SankalpPatra } from "@/components/SankalpPatra";
import { Card, Eyebrow, LinkButton, Section, SectionHeader } from "@/components/ui";
import { patraContent, specimenPatra } from "@/content/patra";
import { localePath, type Lang } from "@/lib/i18n";

/* ---------------------------------------------------------------------------
   /patra — what the Sankalp Patra is, what it records, what it refuses to
   claim, and how a third party verifies one without reading it.
   --------------------------------------------------------------------------- */

/** A hairline schematic of the document. The numbers key into the list beside it. */
function AnatomyDiagram({ title, id }: { title: string; id: string }) {
  const rule = (y: number) => (
    <line key={`r${y}`} x1={44} y1={y} x2={296} y2={y} stroke="var(--line)" strokeWidth={1} />
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
      strokeLinecap="round"
      opacity={o}
    />
  );

  /** Centred bar, for the title / names / sankalp blocks. */
  const cbar = (y: number, w: number, sw = 3, o = 0.34) => bar(170 - w / 2, y, w, sw, o);

  const marker = (n: number, x: number, y: number) => (
    <g key={`m${n}`}>
      <circle cx={x} cy={y} r={8} fill="var(--bg-2)" stroke="var(--gold)" strokeWidth={1} />
      <text
        x={x}
        y={y}
        dy="0.34em"
        textAnchor="middle"
        fill="var(--gold)"
        style={{ fontFamily: "var(--font-marcellus), Georgia, serif", fontSize: "9px" }}
      >
        {n}
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

      {/* the sheet */}
      <rect
        x={30}
        y={16}
        width={280}
        height={396}
        rx={4}
        fill="var(--bg-2)"
        stroke="var(--line)"
        strokeWidth={1}
      />
      <rect
        x={38}
        y={24}
        width={264}
        height={380}
        rx={2}
        fill="none"
        stroke="var(--line)"
        strokeWidth={1}
        opacity={0.6}
      />

      {/* header */}
      <circle cx={52} cy={36} r={6} fill="none" stroke="var(--gold)" strokeWidth={1.2} />
      {bar(64, 36, 34, 2.6, 0.5)}
      {bar(224, 36, 52, 2, 0.34)}
      {rule(52)}

      {/* title block */}
      {cbar(70, 84, 4.5, 0.55)}
      {cbar(80, 50, 2.4, 0.34)}
      {cbar(92, 104, 2, 0.24)}
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
      {rule(222)}

      {/* fact grid, two rows of three */}
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
      {rule(302)}

      {/* verification line + seal */}
      {bar(44, 312, 40, 2, 0.45)}
      {bar(44, 324, 130, 2.6, 0.32)}
      <circle cx={276} cy={322} r={14} fill="none" stroke="var(--gold)" strokeWidth={1} opacity={0.7} />
      <circle cx={276} cy={318} r={5} fill="var(--sun)" opacity={0.75} />
      <path
        d="M266 327q10 6 20 0"
        fill="none"
        stroke="var(--gold)"
        strokeWidth={1.4}
        strokeLinecap="round"
        opacity={0.8}
      />
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

function Numeral({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="inscription mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/50 text-[0.62rem] text-gold"
      style={{ letterSpacing: 0 }}
    >
      {n}
    </span>
  );
}

export function PatraExplainer({ lang }: { lang: Lang }) {
  const t = patraContent[lang];
  const hi = lang === "hi";
  /* The `display` utility sets line-height 0.98, which collides Devanagari
     matras at heading sizes. Inline style, so it wins over the utility. */
  const lead = hi ? { lineHeight: 1.2 } : undefined;
  const leadSm = hi ? { lineHeight: 1.35 } : undefined;

  /* "Sankalp" is a section of the home page, not a route of its own — the
     same anchor the rivers and rituals pages link to. */

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath="/patra" />

      <main>
        {/* ------------------------------ hero ------------------------------ */}
        <section className="relative overflow-hidden border-b border-line/60">
          <div className="halo" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="rise-in" style={{ animationDelay: "60ms" }}>
                <Eyebrow>{t.hero.eyebrow}</Eyebrow>
              </div>
              <h1
                className="rise-in display mt-6 text-[2.9rem] leading-[1.02] sm:text-6xl"
                style={{ animationDelay: "140ms", ...lead }}
              >
                {t.hero.title}
              </h1>
              <p
                className="rise-in mt-7 max-w-xl text-lg leading-relaxed text-ink2"
                style={{ animationDelay: "220ms" }}
              >
                {t.hero.lede}
              </p>
              <div
                className="rise-in mt-10 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "300ms" }}
              >
                <LinkButton href={localePath(lang, "/patra/sample")}>{t.hero.primary}</LinkButton>
                <LinkButton href={localePath(lang, "/verify")} variant="ghost">
                  {t.hero.secondary}
                </LinkButton>
              </div>
            </div>

            <figure className="rise-in mx-auto w-full max-w-[26rem]" style={{ animationDelay: "380ms" }}>
              <SankalpPatra lang={lang} data={specimenPatra(lang)} watermark />
              <figcaption className="mt-5 text-center text-xs text-ink2">
                {t.hero.previewCaption}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---------------------------- anatomy ----------------------------- */}
        <Section id="anatomy">
          <SectionHeader eyebrow={t.anatomy.eyebrow} title={t.anatomy.title} lede={t.anatomy.lede} />

          <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <AnatomyDiagram title={t.anatomy.diagramTitle} id="patra-anatomy-title" />
            </div>

            <ol className="space-y-0">
              {t.anatomy.items.map((item) => (
                <li
                  key={item.n}
                  className="flex gap-5 border-t border-line/60 py-6 first:border-t-0 first:pt-0"
                >
                  <Numeral n={item.n} />
                  <div>
                    <h3 className="display text-xl" style={leadSm}>
                      {item.name}
                    </h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-ink2">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* --------------------------- restraint ---------------------------- */}
        <Section tinted>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeader
              eyebrow={t.restraint.eyebrow}
              title={t.restraint.title}
              lede={t.restraint.lede}
            />

            <div>
              <figure className="border-l-2 border-gold/60 pl-6">
                <p className="inscription text-[0.62rem] text-gold">
                  {t.restraint.attestationLabel}
                </p>
                <blockquote className="display mt-4 text-2xl leading-snug sm:text-[1.75rem]">
                  {t.restraint.attestation}
                </blockquote>
              </figure>

              <ul className="mt-10">
                {t.restraint.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-4 border-t border-line/60 py-5 leading-relaxed text-ink2"
                  >
                    <span aria-hidden="true" className="mt-3 h-0.5 w-5 shrink-0 rounded-full bg-sindoor/80" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* -------------------------- verification -------------------------- */}
        <Section id="verification">
          <SectionHeader eyebrow={t.verify.eyebrow} title={t.verify.title} lede={t.verify.lede} />

          <ol className="mt-14 grid gap-8 sm:grid-cols-3">
            {t.verify.steps.map((s, i) => (
              <li key={s.h} className="border-t border-line/60 pt-6">
                <Numeral n={i + 1} />
                <h3 className="display mt-4 text-xl" style={leadSm}>
                  {s.h}
                </h3>
                <p className="mt-2 leading-relaxed text-ink2">{s.b}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h3 className="inscription text-[0.62rem] text-gold">{t.verify.showsHeading}</h3>
                <ul className="mt-5 space-y-3">
                  {t.verify.shows.map((s) => (
                    <li key={s} className="flex gap-3 text-sm leading-relaxed text-ink2">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="inscription text-[0.62rem] text-ink2">{t.verify.hidesHeading}</h3>
                <ul className="mt-5 space-y-3">
                  {t.verify.hides.map((s) => (
                    <li key={s} className="flex gap-3 text-sm leading-relaxed text-ink2">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sindoor" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* An illustration of the verification response, not a live one. */}
            <div>
              <Card>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="inscription text-[0.6rem] text-ink2">{t.verify.demoLabel}</p>
                  <p className="inscription rounded-full border border-teal/50 px-3 py-1 text-[0.58rem] text-teal">
                    {t.verify.demoStatus}
                  </p>
                </div>

                <p className="display mt-6 text-3xl tracking-wide">{t.verify.demoName}</p>
                <p className="mt-3 text-sm text-ink2">{t.verify.demoRiver}</p>

                <dl className="mt-7 grid grid-cols-2 gap-y-4 border-t border-line/60 pt-6 text-sm">
                  <dt className="inscription text-[0.58rem] text-gold">{t.verify.demoDateLabel}</dt>
                  <dd className="text-right">{t.verify.demoDate}</dd>
                  <dt className="inscription text-[0.58rem] text-gold">
                    {t.verify.demoIssuedLabel}
                  </dt>
                  <dd className="text-right">{t.verify.demoIssued}</dd>
                </dl>
              </Card>
              <p className="mt-4 text-xs leading-relaxed text-ink2">{t.verify.demoCaption}</p>
              <Link
                href={localePath(lang, "/verify")}
                className="mt-5 inline-flex min-h-11 items-center text-sm text-gold transition-colors hover:text-ink"
              >
                {t.verify.cta} →
              </Link>
            </div>
          </div>
        </Section>

        {/* ---------------------------- privacy ----------------------------- */}
        <Section tinted>
          <SectionHeader eyebrow={t.privacy.eyebrow} title={t.privacy.title} />
          <dl className="mt-12 grid gap-x-16 sm:grid-cols-2">
            {t.privacy.items.map((item) => (
              <div key={item.h} className="border-t border-line/60 py-7">
                <dt className="display text-xl" style={leadSm}>
                  {item.h}
                </dt>
                <dd className="mt-2 max-w-md leading-relaxed text-ink2">{item.b}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ---------------------------- formats ----------------------------- */}
        <Section>
          <SectionHeader eyebrow={t.formats.eyebrow} title={t.formats.title} />

          <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {t.formats.items.map((item) => (
              <div key={item.h} className="border-t border-gold/40 pt-6">
                <h3 className="display text-xl" style={leadSm}>
                  {item.h}
                </h3>
                <p className="mt-3 leading-relaxed text-ink2">{item.b}</p>
              </div>
            ))}
          </div>

          <p className="mt-14 border-l-2 border-teal/60 py-2 pl-6 text-lg leading-relaxed text-ink">
            {t.formats.nothingShipped}
          </p>
        </Section>

        {/* ---------------------------- closing ----------------------------- */}
        <Section tinted className="text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="display text-4xl sm:text-5xl" style={lead}>
              {t.closing.title}
            </h2>
            <p className="mt-6 text-ink2">{t.closing.lede}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <LinkButton href={localePath(lang, "/patra/sample")}>{t.closing.primary}</LinkButton>
              <LinkButton href={localePath(lang, "/how-it-works")} variant="ghost">
                {t.closing.secondary}
              </LinkButton>
            </div>
          </div>
        </Section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
