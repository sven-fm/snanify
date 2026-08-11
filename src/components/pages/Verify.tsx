import Link from "next/link";
import type { Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";
import { EXAMPLE_ID_SHAPE, verifyContent } from "@/content/verify";
import { Reveal } from "@/components/Reveal";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, Eyebrow, Section } from "@/components/ui";
import { Mark } from "@/components/Logo";

export function Verify({ lang }: { lang: Lang }) {
  const t = verifyContent[lang];

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath="/verify" />

      <main>
        <section className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="ink-in">
              <Eyebrow>{t.eyebrow}</Eyebrow>
            </div>
            <h1
              className="ink-in display mt-5 text-4xl sm:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              {t.title}
            </h1>
            <div className="rule-double mt-8 max-w-md" />
            <p
              className="ink-in mt-6 max-w-xl text-lg leading-[1.75] text-ink2"
              style={{ animationDelay: "160ms" }}
            >
              {t.lede}
            </p>
          </div>
        </section>

        {/* The honest empty state, given top billing rather than hidden below. */}
        <Section tinted>
          <Reveal>
            <div className="boxed mx-auto max-w-2xl bg-paper p-8 text-center sm:p-12">
              <Mark className="mx-auto h-12 w-12 text-ink2" />
              <div className="rule-double mx-auto mt-8 max-w-[8rem]" />
              <h2 className="display mt-8 text-3xl">{t.statusTitle}</h2>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-[1.75] text-ink2">
                {t.statusBody}
              </p>
            </div>
          </Reveal>
        </Section>

        {/* The verification contract: what a lookup does and does not reveal,
            set as two ruled columns. */}
        <Section>
          <Reveal>
            <h2 className="display text-3xl sm:text-4xl">{t.contractTitle}</h2>

            <div className="mt-12 grid gap-px border-2 border-rulestrong bg-rule md:grid-cols-2">
              <div className="bg-paper p-7 sm:p-8">
                <h3 className="label text-ink2">{t.shows.heading}</h3>
                <ul className="mt-5 border-t border-rulestrong">
                  {t.shows.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border-b border-rule py-3.5 text-sm leading-[1.7] text-ink"
                    >
                      <span className="mt-[0.6rem] h-[3px] w-3 shrink-0 bg-ink" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-paper p-7 sm:p-8">
                <h3 className="label text-spot">{t.hides.heading}</h3>
                <ul className="mt-5 border-t border-rulestrong">
                  {t.hides.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border-b border-rule py-3.5 text-sm leading-[1.7] text-ink"
                    >
                      <span
                        className="mt-[0.6rem] h-[3px] w-3 shrink-0 bg-spot"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t-2 border-rulestrong pt-8">
              <h3 className="label text-ink2">{t.idLabel}</h3>
              <p className="mt-5 font-mono text-lg tracking-wider text-spot break-all">
                {EXAMPLE_ID_SHAPE}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-[1.75] text-ink2">{t.idNote}</p>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <Link href={localePath(lang, "/patra/sample")}>
                <CTA>{t.sampleCta}</CTA>
              </Link>
              <Link href={localePath(lang, "/patra")}>
                <CTA variant="ghost">{t.patraCta}</CTA>
              </Link>
            </div>
          </Reveal>
        </Section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
