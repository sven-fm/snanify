import Link from "next/link";
import { localePath, type Lang } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow, Section } from "@/components/ui";
import { Mark } from "@/components/Logo";
import { howItWorksContent } from "@/content/trust";

/**
 * /how-it-works, the three landing-page steps at full length.
 *
 * Rhythm: masthead, then the "nothing is shipped to you" band (the single most
 * likely misunderstanding of this product, so it comes before the sequence),
 * then four phases on a hairline rail, then the honest empty slot where the
 * explainer film will go.
 */

export function HowItWorks({ lang }: { lang: Lang }) {
  const t = howItWorksContent[lang];

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/how-it-works" />

      <main>
        {/* ---------------- masthead ---------------- */}
        <header className="relative overflow-hidden border-b border-line/60">
          <div className="halo" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-24">
            <div className="max-w-3xl">
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h1 className="display mt-6 text-[2.7rem] leading-[1.12] sm:text-6xl">{t.title}</h1>
              <p className="mt-7 max-w-2xl text-[1.08rem] leading-[1.8] text-ink2">{t.lede}</p>
            </div>
          </div>
        </header>

        {/* ---------------- nothing is shipped ---------------- */}
        <section id="shipping" className="scroll-mt-20 border-b border-line/60 bg-bg2/50">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
            <div>
              <p className="inscription text-[0.62rem] text-sindoor">{t.shipping.eyebrow}</p>
              <h2 className="display mt-5 text-[2.1rem] leading-[1.12] sm:text-[2.7rem]">
                {t.shipping.title}
              </h2>
            </div>
            <div className="max-w-[40rem] self-center">
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
            <div className="gap-14 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
              <div>
                <div className="lg:sticky lg:top-24">
                  {/* Ghost numeral: decorative sequencing only, the label
                      beside it carries the meaning. /45 rather than /35 so it
                      is present in the light theme too, where gold darkens. */}
                  <span className="display block text-5xl text-gold/45 sm:text-6xl">{phase.n}</span>
                  <h2 className="display mt-4 text-[1.6rem] leading-[1.2] text-ink">
                    {phase.label}
                  </h2>
                </div>
              </div>

              <ol className="mt-10 border-l border-line/70 pl-7 sm:pl-9 lg:mt-2">
                {phase.steps.map((s, i) => (
                  <li key={s.t} className={`relative ${i === 0 ? "" : "mt-12"}`}>
                    <span
                      className="absolute top-2.5 -left-[31px] h-1.5 w-1.5 rounded-full bg-gold sm:-left-[39px]"
                      aria-hidden="true"
                    />
                    <h3 className="display text-[1.4rem] leading-snug text-ink sm:text-[1.6rem]">
                      {s.t}
                    </h3>
                    {s.d.map((p) => (
                      <p key={p} className="mt-3.5 text-[1.02rem] leading-[1.85] text-ink2">
                        {p}
                      </p>
                    ))}
                  </li>
                ))}
              </ol>
            </div>
          </Section>
        ))}

        {/* ---------------- the film that does not exist yet ----------------
            PLACEHOLDER: no rite has been recorded. This block states its own
            absence on purpose, it must never be filled with stock or
            generated footage. */}
        <Section>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-dashed border-line px-7 py-14 text-center sm:px-12">
              <Mark className="mx-auto h-8 w-8 text-ink2/50" />
              <p className="inscription mt-7 text-[0.62rem] text-ink2">{t.film.label}</p>
              <p className="mx-auto mt-5 max-w-xl text-[0.98rem] leading-[1.8] text-ink2">
                {t.film.body}
              </p>
            </div>
          </div>
        </Section>

        {/* ---------------- closing ---------------- */}
        <section className="border-t border-line/60 bg-bg2/40">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <h2 className="display text-[2rem] leading-[1.15] sm:text-[2.6rem]">
                {t.closing.title}
              </h2>
              <p className="mt-6 text-[1.02rem] leading-[1.85] text-ink2">{t.closing.body}</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:gap-10">
                <Link
                  href={localePath(lang, "/ethics")}
                  className="inline-flex min-h-[44px] items-center border-b border-gold/50 pb-1 text-[1.02rem] text-gold transition-colors hover:border-gold"
                >
                  {t.closing.ethicsLabel}
                </Link>
                <Link
                  href={localePath(lang, "/faq")}
                  className="inline-flex min-h-[44px] items-center border-b border-line pb-1 text-[1.02rem] text-ink2 transition-colors hover:border-gold hover:text-gold"
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
