import Link from "next/link";
import type { Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";
import { EXAMPLE_ID_SHAPE, verifyContent } from "@/content/verify";
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
        <section className="relative overflow-hidden border-b border-line/60">
          <div className="halo" aria-hidden="true" />
          <div className="relative mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-28">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 className="display mt-5 text-4xl sm:text-6xl">{t.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink2">{t.lede}</p>
          </div>
        </section>

        {/* The honest empty state, given top billing rather than hidden below. */}
        <Section tinted>
          <div className="mx-auto max-w-2xl rounded-2xl border border-line/70 bg-bg2/60 p-8 text-center sm:p-12">
            <Mark className="mx-auto h-12 w-12 text-ink2" />
            <h2 className="display mt-8 text-3xl">{t.statusTitle}</h2>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-ink2">
              {t.statusBody}
            </p>
          </div>
        </Section>

        {/* The verification contract: what a lookup does and does not reveal. */}
        <Section>
          <h2 className="display text-3xl sm:text-4xl">{t.contractTitle}</h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/70 md:grid-cols-2">
            <div className="bg-bg p-8">
              <h3 className="inscription text-[0.65rem] text-teal">{t.shows.heading}</h3>
              <ul className="mt-6 space-y-4">
                {t.shows.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ink2">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-bg p-8">
              <h3 className="inscription text-[0.65rem] text-sindoor">{t.hides.heading}</h3>
              <ul className="mt-6 space-y-4">
                {t.hides.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ink2">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-sindoor/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-line/60 pt-8">
            <h3 className="inscription text-[0.65rem] text-ink">{t.idLabel}</h3>
            <p className="mt-5 font-mono text-lg tracking-wider text-gold break-all">
              {EXAMPLE_ID_SHAPE}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink2">{t.idNote}</p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link href={localePath(lang, "/patra/sample")}>
              <CTA>{t.sampleCta}</CTA>
            </Link>
            <Link href={localePath(lang, "/patra")}>
              <CTA variant="ghost">{t.patraCta}</CTA>
            </Link>
          </div>
        </Section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
