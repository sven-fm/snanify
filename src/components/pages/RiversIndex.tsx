import Link from "next/link";
import { localePath } from "@/lib/i18n";
import { deepLang, pickDeep, type Lang } from "@/lib/locales";
import { waterName } from "@/content/names";
import { Colophon, Mark } from "@/components/Logo";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, Section } from "@/components/ui";
import { RIVERS } from "@/content/rivers";
import { riversIndexContent } from "@/content/rivers-index";

/* ---------------------------------------------------------------------------
   /rivers. A register of six places and a page of advice on choosing one.

   WHAT WAS TAKEN OFF THIS PAGE, and must stay off: the caps label with a red
   dash above every heading, the fade-and-rise on every section, the numbered
   markers on a list that is a choice rather than a sequence, the boxed badge
   at the top, the middle dots between ghat and city, the red notice about
   "what Snanify does at these six places" and the two-column "this is / this
   is not" block. Each was a default, and together they made the page read as
   a template. The small caps voice appears only on a button.
   --------------------------------------------------------------------------- */

/* Six strands of water, cut as an engraving: solid ink, no fade, the front
   strand pulled heaviest the way a block cutter deepens the nearest line.
   Every coordinate is an integer literal so the server and the client
   serialise the same string. */
function Waterlines({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 180"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable={false}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = 18 + i * 26;
        const dip = 10 + i * 6;
        /* Literal widths, no arithmetic: a float that serialises differently on
           the server and the client is reported as a hydration mismatch. */
        const width = ["1", "1.4", "1.8", "2.2", "2.6", "3"][i];
        return (
          <path
            key={i}
            d={`M0 ${y} Q 300 ${y + dip} 600 ${y} T 1200 ${y}`}
            stroke="currentColor"
            strokeWidth={width}
          />
        );
      })}
    </svg>
  );
}

export function RiversIndex({ lang }: { lang: Lang }) {
  const t = riversIndexContent[lang];

  const first = RIVERS[0];
  const rest = RIVERS.slice(1);

  /* "Har Ki Pauri, Haridwar, Uttarakhand" */
  const place = (r: (typeof RIVERS)[number]) =>
    `${waterName(r, "ghat", lang)}, ${waterName(r, "city", lang)}, ${waterName(r, "state", lang)}`;

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/rivers" />

      <main>
        {/* ------------------------------------------------ front page --- */}
        <section className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-20">
            <h1 className="ink-in display max-w-4xl text-[2.7rem] sm:text-6xl lg:text-[4.6rem]">
              {t.title}
            </h1>

            <div className="rule-double mt-8 max-w-xl" />

            <p
              className="ink-in mt-6 max-w-2xl text-[1.05rem] leading-[1.75] text-ink2"
              style={{ animationDelay: "120ms" }}
            >
              {t.lede}
            </p>

            {/* the water itself, set as a ruled plate across the page */}
            <div className="mt-12 border-y-2 border-rulestrong py-5">
              <Waterlines className="h-20 w-full text-ink sm:h-24" />
            </div>
          </div>
        </section>

        {/* ------------------------------------------- the lead water --- */}
        <section className="tint border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="grid items-start gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
              <div>
                <div className="border-t-2 border-rulestrong pt-6">
                  <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
                    {waterName(first, "river", lang)}
                  </h2>
                  <p className="mt-3 text-sm text-ink2">{place(first)}</p>
                </div>

                {/* The six river descriptions are English and Hindi only: see
                    the tier note in src/lib/locales.ts. The name above is
                    localised, this prose is not, and the `lang` says so rather
                    than letting a screen reader read English with a Tamil
                    voice. */}
                <p
                  className="display mt-8 max-w-xl text-xl leading-[1.45] text-ink sm:text-2xl"
                  lang={deepLang(lang)}
                >
                  {pickDeep(first.epithet, lang)}
                </p>

                <p className="mt-5 max-w-xl leading-[1.75] text-ink2" lang={deepLang(lang)}>
                  {pickDeep(first.standfirst, lang)}
                </p>

                <p
                  className="mt-4 max-w-xl text-sm leading-[1.75] text-ink2"
                  lang={deepLang(lang)}
                >
                  {pickDeep(first.sacred, lang)[0]}
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-5">
                  <Link href={localePath(lang, `/rivers/${first.slug}`)}>
                    <CTA>{t.lead.read}</CTA>
                  </Link>
                  <span className="text-sm text-ink2">{t.formLabels[first.form]}</span>
                </div>
              </div>

              <div className="mx-auto w-full max-w-xs lg:max-w-none">
                <Colophon className="mx-auto w-full max-w-[18rem] text-ink" />
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------- the other five -- */}
        <Section id="index">
          <div className="max-w-3xl">
            <h2 className="display text-[2.1rem] sm:text-[2.9rem]">{t.index.title}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink2">{t.index.lede}</p>
          </div>

          {/* A register, unnumbered: five waters are a choice, not a sequence. */}
          <ul className="mt-10 border-t-2 border-rulestrong">
            {rest.map((r) => (
              <li key={r.slug}>
                <Link
                  href={localePath(lang, `/rivers/${r.slug}`)}
                  className="grid gap-y-4 border-b border-rule py-8 transition-colors hover:bg-paper3 md:grid-cols-[1fr_14rem] md:gap-x-8 md:py-10"
                >
                  <div>
                    <h3 className="display text-3xl text-ink sm:text-4xl">
                      {waterName(r, "river", lang)}
                    </h3>
                    <p className="mt-2 text-sm text-ink2">{place(r)}</p>
                    <p
                      className="display mt-5 max-w-xl text-lg leading-[1.45] text-ink"
                      lang={deepLang(lang)}
                    >
                      {pickDeep(r.epithet, lang)}
                    </p>
                    <p
                      className="mt-3 max-w-xl text-sm leading-[1.75] text-ink2"
                      lang={deepLang(lang)}
                    >
                      {pickDeep(r.standfirst, lang)}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-3 md:items-end md:text-right">
                    <span className="text-sm text-ink2 md:max-w-[12rem]">{t.formLabels[r.form]}</span>
                    <span className="text-sm text-ink underline decoration-spot decoration-2 underline-offset-4">
                      {t.index.read}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* ------------------------------------------------- offer ------
            The four things at every one of the six, as ruled rows: at 390px
            the name sits on its own line and the body runs full width under
            it, so nothing is set in a column narrower than the text needs. */}
        <Section id="offer" tinted>
          <div className="max-w-3xl">
            <h2 className="display text-[2.1rem] sm:text-[2.9rem]">{t.offer.title}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink2">{t.offer.lede}</p>
          </div>

          <ul className="mt-10 border-t-2 border-rulestrong">
            {t.offer.items.map((item) => (
              <li
                key={item.key}
                className="grid gap-y-2 border-b border-rule py-6 md:grid-cols-[15rem_1fr] md:gap-x-8 md:py-7"
              >
                <span className="display text-xl text-ink sm:text-2xl">{item.name}</span>
                <span className="max-w-2xl text-sm leading-[1.75] text-ink2">{item.body}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ----------------------------------------------- choosing ----- */}
        <Section>
          <div className="max-w-3xl">
            <h2 className="display text-[2.1rem] sm:text-[2.9rem]">{t.choosing.title}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink2">{t.choosing.lede}</p>
          </div>

          <dl className="mt-10 border-t-2 border-rulestrong">
            {t.choosing.rows.map((row) => (
              <div
                key={row.key}
                className="grid gap-3 border-b border-rule py-7 md:grid-cols-[15rem_1fr] md:gap-10 md:py-9"
              >
                <dt className="display text-xl text-ink">{row.label}</dt>
                <dd className="max-w-2xl leading-[1.75] text-ink2">{row.body}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ------------------------------------------------ closing ----- */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-24">
            <Mark className="mx-auto h-12 w-12 text-ink" />
            <div className="rule-double mt-8" />
            <h2 className="display mt-8 text-[2.2rem] leading-tight sm:text-[3.2rem]">
              {t.closing.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-[1.75] text-ink2">{t.closing.lede}</p>
            <Link href={localePath(lang, "/begin")} className="mt-9 inline-block">
              <CTA className="!px-10 !py-4">{t.closing.cta}</CTA>
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
