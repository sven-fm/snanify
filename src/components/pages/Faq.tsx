import Link from "next/link";
import { localePath } from "@/lib/i18n";
/* This page exists in English and Hindi only; see the tier note and the
   FULL_ONLY list at the top of src/lib/locales.ts. `Lang` here is therefore
   the full-depth pair and not the twelve locales the site serves. */
import type { FullLang as Lang } from "@/lib/locales";
import { ctaHref } from "@/lib/nav";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ETHICS_MAIL, faqContent } from "@/content/trust";

/**
 * /faq, <details>/<summary>, so every answer is reachable with JavaScript off
 * and every question is anchor-linkable (/faq#prices). No `name` attribute:
 * making the group exclusive would close an answer the reader is comparing
 * against another one.
 *
 * Set as a ruled register: numbered hairline rows that open in place, the way
 * an almanac lists its entries.
 *
 * MOBILE FIRST. One column at 390px, 56px summary rows, 16px answer type, and
 * the primary action on a thumb rail at the bottom of the viewport rather than
 * a button the reader has to scroll back up to find.
 */

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(n: number, lang: Lang): string {
  const s = String(n).padStart(2, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

/**
 * Questions whose long answer lives on another page. The fragment matters:
 * the manifesto is twelve sections of continuous argument, so a link that
 * lands at its masthead is a link that loses the reader. Every id here is a
 * section id in ethicsContent / howItWorksContent, and those ids are identical
 * in both locales on purpose.
 */
const DEEP_LINKS: Record<string, string> = {
  "does-it-work": "/ethics#position",
  priest: "/ethics#is-not",
  religious: "/ethics#precedent",
  "same-as-bathing": "/ethics#is-not",
  scam: "/ethics#river",
  punya: "/ethics#never",
  "who-for": "/ethics#for",
  "what-happens": "/how-it-works#form",
  "black-screen": "/how-it-works#stillness",
  sound: "/how-it-works#sound",
  shipping: "/how-it-works#shipping",
  mark: "/how-it-works#keep",
  data: "/ethics#river",
  percentile: "/ethics#river",
  offline: "/ethics#river",
  gauge: "/ethics#unsettled",
  camera: "/ethics#never",
  "paying-for": "/how-it-works#price",
  free: "/how-it-works#price",
  prices: "/how-it-works#price",
  eleven: "/how-it-works#price",
  "sankalp-private": "/ethics#data",
  delete: "/ethics#data",
  tracking: "/ethics#data",
  panchang: "/ethics#unsettled",
};

export function Faq({ lang }: { lang: Lang }) {
  const t = faqContent[lang];
  const cta = ctaHref(lang);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/faq" />

      {/* The bottom rail is 3.75rem tall on a phone; the page ends above it. */}
      <main className="pb-20 sm:pb-0">
        {/* ---------------- masthead ---------------- */}
        <header className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-10 pb-10 sm:px-8 sm:pt-24 sm:pb-20">
            <div className="ink-in max-w-3xl">
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h1 className="display mt-5 text-[2.3rem] leading-[1.12] sm:mt-6 sm:text-6xl">
                {t.title}
              </h1>
              <div className="rule-double mt-7 max-w-xl" />
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.8] text-ink2 sm:text-[1.08rem]">
                {t.lede}
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="gap-16 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)]">
            {/* ---------------- group index ---------------- */}
            <nav aria-label={t.indexLabel} className="hidden lg:block">
              <div className="sticky top-24 py-20">
                <p className="label text-spot">{t.indexLabel}</p>
                <ol className="mt-5 border-t-2 border-rulestrong">
                  {t.groups.map((g, gi) => (
                    <li key={g.id} className="border-b border-rule">
                      <a
                        href={`#${g.id}`}
                        className="flex gap-3 py-2.5 text-[0.82rem] leading-snug text-ink2 transition-colors hover:text-spot"
                      >
                        <span className="shrink-0 tabular-nums text-spot">
                          {numeral(gi + 1, lang)}
                        </span>
                        <span>{g.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            {/* ---------------- questions ---------------- */}
            <div className="max-w-[44rem] py-12 sm:py-20">
              {/* On a phone the sticky index is gone, so the six groups are
                  offered as a ruled jump list before the first question. */}
              <nav aria-label={t.indexLabel} className="mb-12 lg:hidden">
                <p className="label text-spot">{t.indexLabel}</p>
                <ol className="mt-4 border-t-2 border-rulestrong">
                  {t.groups.map((g, gi) => (
                    <li key={g.id} className="border-b border-rule">
                      <a
                        href={`#${g.id}`}
                        className="flex min-h-[44px] items-center gap-3 py-2 text-[0.92rem] leading-snug text-ink2"
                      >
                        <span className="shrink-0 tabular-nums text-spot">
                          {numeral(gi + 1, lang)}
                        </span>
                        <span>{g.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {t.groups.map((group, gi) => (
                <section key={group.id} className={gi === 0 ? "" : "mt-16 sm:mt-20"}>
                  <Reveal>
                    <div className="flex items-center gap-4 border-t-2 border-rulestrong pt-4 sm:gap-5">
                      <span className="display text-[1.2rem] leading-none text-spot tabular-nums">
                        {numeral(gi + 1, lang)}
                      </span>
                      <h2 id={group.id} className="label scroll-mt-20 text-ink">
                        {group.title}
                      </h2>
                    </div>

                    <div className="mt-6 border-t border-rule">
                      {group.items.map((item, i) => {
                        const to = DEEP_LINKS[item.id];
                        return (
                          <details
                            key={item.id}
                            id={item.id}
                            className="group scroll-mt-20 border-b border-rule"
                          >
                            <summary className="grid min-h-[56px] cursor-pointer list-none grid-cols-[2.25rem_minmax(0,1fr)_0.75rem] items-start gap-x-3 py-4 transition-colors hover:text-spot sm:gap-x-4 [&::-webkit-details-marker]:hidden">
                              <span className="display pt-[0.2rem] text-[1rem] leading-none text-spot tabular-nums">
                                {numeral(i + 1, lang)}
                              </span>
                              <h3 className="display text-[1.1rem] leading-snug text-ink transition-colors group-hover:text-spot sm:text-[1.25rem]">
                                {item.q}
                              </h3>
                              <span
                                className="relative mt-1.5 h-3 w-3 shrink-0 text-ink2 transition-colors group-hover:text-spot"
                                aria-hidden="true"
                              >
                                <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-current" />
                                <span className="absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:scale-y-0" />
                              </span>
                            </summary>

                            <div className="pb-7 pl-0 sm:pl-[2.25rem]">
                              {item.a.map((p) => (
                                <p
                                  key={p}
                                  className="mt-4 max-w-[38rem] text-[0.98rem] leading-[1.8] text-ink2 first:mt-0"
                                >
                                  {p}
                                </p>
                              ))}
                              {to && (
                                <p className="mt-5">
                                  <Link
                                    href={localePath(lang, to)}
                                    className="label inline-flex min-h-[44px] items-center border-b-2 border-spot pb-0.5 text-spot transition-colors hover:border-rulestrong hover:text-ink"
                                  >
                                    {t.moreLabel}
                                  </Link>
                                </p>
                              )}
                            </div>
                          </details>
                        );
                      })}
                    </div>
                  </Reveal>
                </section>
              ))}

              {/* ---------------- closing ---------------- */}
              <section className="mt-16 border-t-2 border-rulestrong pt-10 sm:mt-20 sm:pt-12">
                <h2 className="display text-[1.7rem] leading-[1.2] sm:text-[2.2rem]">
                  {t.closing.title}
                </h2>
                <p className="mt-5 max-w-[38rem] text-[1rem] leading-[1.8] text-ink2">
                  {t.closing.body}
                </p>
                {/* PLACEHOLDER: ethics@snanify.com must be a real, monitored inbox. */}
                <p className="mt-8">
                  <a
                    href={`mailto:${ETHICS_MAIL}`}
                    className="inline-flex min-h-[44px] flex-wrap items-center gap-x-3 gap-y-1 border-b-2 border-spot pb-1 text-[1.02rem] text-spot transition-colors hover:border-rulestrong hover:text-ink"
                  >
                    <span>{t.closing.mailLabel}</span>
                    <span className="break-all text-ink2">{ETHICS_MAIL}</span>
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} />

      {/* ---------------- thumb rail, phones only ---------------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-rulestrong bg-paper sm:hidden">
        <a
          href={cta}
          className="label flex min-h-[3.75rem] items-center justify-center bg-spot px-5 text-paper"
        >
          {t.ctaLabel}
        </a>
      </div>
    </>
  );
}
