import Link from "next/link";
import { localePath, type Lang } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow } from "@/components/ui";
import { ETHICS_MAIL, faqContent } from "@/content/trust";

/**
 * /faq, <details>/<summary>, so every answer is reachable with JavaScript off
 * and every question is anchor-linkable (/faq#refund). No `name` attribute:
 * making the group exclusive would close an answer the reader is comparing
 * against another one.
 */

/**
 * Questions whose long answer lives on another page. The fragment matters:
 * /ethics is eleven sections of continuous argument, so a link that lands at
 * its masthead is a link that loses the reader. Every id here is a section id
 * in ethicsContent / howItWorksContent, and those ids are identical in both
 * locales on purpose.
 */
const DEEP_LINKS: Record<string, string> = {
  "does-it-work": "/ethics#position",
  scam: "/ethics#proof",
  proof: "/how-it-works#after",
  punya: "/ethics#never",
  priest: "/ethics#officiants",
  shipping: "/how-it-works#shipping",
  patra: "/how-it-works#after",
  "who-else": "/ethics#proof",
  refund: "/ethics#failure",
  failure: "/ethics#failure",
  "sankalp-private": "/ethics#data",
  delete: "/ethics#data",
  tracking: "/ethics#data",
};

export function Faq({ lang }: { lang: Lang }) {
  const t = faqContent[lang];

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/faq" />

      <main>
        {/* ---------------- masthead ---------------- */}
        <header className="border-b border-line/60">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-20">
            <div className="max-w-3xl">
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h1 className="display mt-6 text-[2.6rem] leading-[1.12] sm:text-6xl">{t.title}</h1>
              <p className="mt-7 max-w-2xl text-[1.08rem] leading-[1.8] text-ink2">{t.lede}</p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="gap-16 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)]">
            {/* ---------------- group index ---------------- */}
            <nav aria-label={t.indexLabel} className="hidden lg:block">
              <div className="sticky top-24 py-20">
                <p className="inscription text-[0.6rem] text-ink2">{t.indexLabel}</p>
                <ol className="mt-5 space-y-2.5">
                  {t.groups.map((g) => (
                    <li key={g.id}>
                      <a
                        href={`#${g.id}`}
                        className="block text-[0.82rem] leading-snug text-ink2 transition-colors hover:text-gold"
                      >
                        {g.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            {/* ---------------- questions ---------------- */}
            <div className="max-w-[44rem] py-14 sm:py-20">
              {t.groups.map((group, gi) => (
                <section key={group.id} className={gi === 0 ? "" : "mt-20"}>
                  <h2
                    id={group.id}
                    className="inscription scroll-mt-24 text-[0.66rem] text-gold"
                  >
                    {group.title}
                  </h2>

                  <div className="mt-7 border-t border-line/60">
                    {group.items.map((item) => {
                      const to = DEEP_LINKS[item.id];
                      return (
                        <details
                          key={item.id}
                          id={item.id}
                          className="group scroll-mt-24 border-b border-line/60"
                        >
                          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-[1.02rem] leading-snug text-ink transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
                            <h3 className="display text-[1.15rem] leading-snug sm:text-[1.25rem]">
                              {item.q}
                            </h3>
                            <span
                              className="relative mt-1 h-3 w-3 shrink-0 self-start text-ink2 transition-colors group-hover:text-gold"
                              aria-hidden="true"
                            >
                              <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-current" />
                              <span className="absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:scale-y-0" />
                            </span>
                          </summary>

                          <div className="pb-7">
                            {item.a.map((p) => (
                              <p
                                key={p}
                                className="mt-4 max-w-[38rem] text-[0.98rem] leading-[1.85] text-ink2 first:mt-0"
                              >
                                {p}
                              </p>
                            ))}
                            {to && (
                              <p className="mt-5">
                                <Link
                                  href={localePath(lang, to)}
                                  className="inline-flex min-h-[44px] items-center border-b border-gold/40 pb-0.5 text-[0.92rem] text-gold transition-colors hover:border-gold"
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
                </section>
              ))}

              {/* ---------------- closing ---------------- */}
              <section className="mt-20 border-t border-line/60 pt-12">
                <h2 className="display text-[1.8rem] leading-[1.2] sm:text-[2.2rem]">
                  {t.closing.title}
                </h2>
                <p className="mt-5 max-w-[38rem] text-[1rem] leading-[1.85] text-ink2">
                  {t.closing.body}
                </p>
                {/* PLACEHOLDER: ethics@snanify.com must be a real, monitored inbox. */}
                <p className="mt-8">
                  <a
                    href={`mailto:${ETHICS_MAIL}`}
                    className="inline-flex min-h-[44px] items-center gap-3 border-b border-gold/50 pb-1 text-[1.02rem] text-gold transition-colors hover:border-gold"
                  >
                    <span>{t.closing.mailLabel}</span>
                    <span className="text-ink2">{ETHICS_MAIL}</span>
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </>
  );
}
