import Link from "next/link";
import { localePath, type Lang } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow, Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Mark } from "@/components/Logo";
import { howItWorksContent } from "@/content/trust";

/**
 * /how-it-works, the three landing-page steps at full length.
 *
 * Set as a printed procedure: each phase opens with its numeral large in the
 * spot colour, and its steps run as a ruled register rather than a stack of
 * cards. Rhythm: masthead, then the "nothing is shipped to you" band (the
 * single most likely misunderstanding of this product, so it comes before the
 * sequence), then four phases, then the honest empty slot where the explainer
 * film will go.
 */

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(n: number, lang: Lang): string {
  const s = String(n).padStart(2, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

export function HowItWorks({ lang }: { lang: Lang }) {
  const t = howItWorksContent[lang];

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/how-it-works" />

      <main>
        {/* ---------------- masthead ---------------- */}
        <header className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-24">
            <div className="ink-in max-w-3xl">
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h1 className="display mt-6 text-[2.7rem] leading-[1.12] sm:text-6xl">{t.title}</h1>
              <div className="rule-double mt-8 max-w-xl" />
              <p className="mt-6 max-w-2xl text-[1.08rem] leading-[1.8] text-ink2">{t.lede}</p>
            </div>
          </div>
        </header>

        {/* ---------------- nothing is shipped ---------------- */}
        <section id="shipping" className="tint scroll-mt-20 border-b-2 border-rulestrong">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
            <div>
              <p className="label text-spot">{t.shipping.eyebrow}</p>
              <h2 className="display mt-5 text-[2.1rem] leading-[1.12] sm:text-[2.7rem]">
                {t.shipping.title}
              </h2>
            </div>
            <div className="max-w-[40rem] self-center border-t-2 border-rulestrong pt-6 lg:border-t-0 lg:pt-0">
              {t.shipping.body.map((p) => (
                <p key={p} className="mt-4 text-[1.02rem] leading-[1.85] text-ink2 first:mt-0">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- the sequence ---------------- */}
        {t.phases.map((phase, pi) => (
          <Section key={phase.id} id={phase.id} tinted={pi % 2 === 1}>
            <Reveal>
              <div className="gap-14 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
                <div>
                  <div className="lg:sticky lg:top-24">
                    {/* The phase numeral is typographic furniture: it sequences
                        the page, the label beside it carries the meaning. */}
                    <span className="display block text-6xl leading-none text-spot sm:text-7xl">
                      {phase.n}
                    </span>
                    <div className="rule-heavy mt-5" />
                    <h2 className="display mt-5 text-[1.6rem] leading-[1.2] text-ink">
                      {phase.label}
                    </h2>
                  </div>
                </div>

                <ol className="mt-10 border-t-2 border-rulestrong lg:mt-0">
                  {phase.steps.map((s, i) => (
                    <li
                      key={s.t}
                      className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 border-b border-rule py-8 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-8"
                    >
                      <span className="display text-[1.4rem] leading-none text-spot tabular-nums sm:text-[1.8rem]">
                        {numeral(i + 1, lang)}
                      </span>
                      <div>
                        <h3 className="display text-[1.4rem] leading-snug text-ink sm:text-[1.6rem]">
                          {s.t}
                        </h3>
                        {s.d.map((p) => (
                          <p key={p} className="mt-3.5 text-[1.02rem] leading-[1.85] text-ink2">
                            {p}
                          </p>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </Section>
        ))}

        {/* ---------------- the film that does not exist yet ----------------
            PLACEHOLDER: no rite has been recorded. This block states its own
            absence on purpose, it must never be filled with stock or
            generated footage. */}
        <Section>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <div className="border border-dashed border-rulestrong px-7 py-14 text-center sm:px-12">
                <Mark className="mx-auto h-8 w-8 text-ink2" />
                <p className="label mt-7 text-spot">{t.film.label}</p>
                <p className="mx-auto mt-5 max-w-xl text-[0.98rem] leading-[1.8] text-ink2">
                  {t.film.body}
                </p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ---------------- closing ---------------- */}
        <section className="tint border-t-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <h2 className="display text-[2rem] leading-[1.15] sm:text-[2.6rem]">
                {t.closing.title}
              </h2>
              <p className="mt-6 text-[1.02rem] leading-[1.85] text-ink2">{t.closing.body}</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:gap-10">
                <Link
                  href={localePath(lang, "/ethics")}
                  className="inline-flex min-h-[44px] items-center border-b-2 border-spot pb-1 text-[1.02rem] text-spot transition-colors hover:border-rulestrong hover:text-ink"
                >
                  {t.closing.ethicsLabel}
                </Link>
                <Link
                  href={localePath(lang, "/faq")}
                  className="inline-flex min-h-[44px] items-center border-b border-rule pb-1 text-[1.02rem] text-ink2 transition-colors hover:border-spot hover:text-spot"
                >
                  {t.closing.faqLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
