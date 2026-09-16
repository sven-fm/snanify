import Link from "next/link";
import { WaterBand } from "@/components/WaterBand";
import { localePath } from "@/lib/i18n";
import type { Lang } from "@/lib/locales";
import { ctaHref } from "@/lib/nav";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PriceText } from "@/components/ui";
import { ETHICS_MAIL, ethicsContent, faqContent } from "@/content/trust";

/**
 * /faq, <details>/<summary>, so every answer is reachable with JavaScript off
 * and every question is anchor-linkable (/faq#prices). No `name` attribute:
 * making the group exclusive would close an answer the reader is comparing
 * against another one.
 *
 * Set as a ruled register: hairline rows that open in place, the way an
 * almanac lists its entries. Unnumbered, because questions are not a sequence.
 *
 * MOBILE FIRST. One column at 390px, 56px summary rows, 16px answer type, and
 * the primary action on a thumb rail at the bottom of the viewport rather than
 * a button the reader has to scroll back up to find.
 */

/**
 * Questions whose long answer lives elsewhere: on /snan, or further down this
 * page, in "How it is made", which was its own page (/ethics) until
 * 16 September 2026. The fragment matters: a link that lands at a masthead is
 * a link that loses the reader. Every "#how-" id is a section id in
 * ethicsContent with that prefix, because the questions have a "river"
 * group of their own; the ids are identical in both locales on purpose.
 */
const DEEP_LINKS: Record<string, string> = {
  "what-happens": "/snan#form",
  "black-screen": "/snan#form",
  shipping: "/snan#form",
  mark: "/snan#patra",
  data: "#how-river",
  percentile: "#how-river",
  offline: "#how-river",
  verify: "#how-patra",
  "paying-for": "/snan#price",
  free: "/snan#price",
  prices: "/snan#price",
  eleven: "/snan#price",
  "sankalp-private": "#how-patra",
  delete: "#how-hands",
  tracking: "#how-hands",
  panchang: "#how-sky",
};

/** Prose column for the workshop section: ~68ch measure, generous leading. */
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 text-[1.02rem] leading-[1.8] text-ink2">{children}</p>;
}

/** A term over its value on a phone, a two-column ruled row from `sm` up. */
function RegisterRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid gap-1.5 border-b border-rule py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
      <dt className="label pt-1 text-ink2">{k}</dt>
      <dd className="text-[0.98rem] leading-[1.75] text-ink2">{v}</dd>
    </div>
  );
}

export function Faq({ lang }: { lang: Lang }) {
  const t = faqContent[lang];
  const made = ethicsContent[lang];
  const cta = ctaHref(lang);
  const index = [...t.groups.map((g) => ({ id: g.id, title: g.title })), { id: "how", title: made.title }];

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
              <h1 className="display text-[2.3rem] leading-[1.12] sm:text-6xl">
                {t.title}
              </h1>
              <div className="rule-double mt-7" />
              <WaterBand seed="faq" className="mt-5 h-14 w-full sm:h-16" />
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
                <p className="text-sm text-ink2">{t.indexLabel}</p>
                <ul className="mt-4 border-t-2 border-rulestrong">
                  {index.map((g) => (
                    <li key={g.id} className="border-b border-rule">
                      <a
                        href={`#${g.id}`}
                        className="block py-2.5 text-[0.9rem] leading-snug text-ink transition-colors hover:text-spot"
                      >
                        {g.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* ---------------- questions ---------------- */}
            <div className="max-w-[44rem] py-12 sm:py-20">
              {/* On a phone the sticky index is gone, so the six groups are
                  offered as a ruled jump list before the first question. */}
              <nav aria-label={t.indexLabel} className="mb-12 lg:hidden">
                <p className="text-sm text-ink2">{t.indexLabel}</p>
                <ul className="mt-3 border-t-2 border-rulestrong">
                  {index.map((g) => (
                    <li key={g.id} className="border-b border-rule">
                      <a
                        href={`#${g.id}`}
                        className="flex min-h-[44px] items-center py-2 text-[0.98rem] leading-snug text-ink"
                      >
                        {g.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {t.groups.map((group, gi) => (
                <section key={group.id} className={gi === 0 ? "" : "mt-16 sm:mt-20"}>
                    <h2
                      id={group.id}
                      className="display scroll-mt-20 border-t-2 border-rulestrong pt-4 text-[1.5rem] leading-tight text-ink sm:text-[1.8rem]"
                    >
                      {group.title}
                    </h2>

                    <div className="mt-5 border-t border-rule">
                      {group.items.map((item) => {
                        const to = DEEP_LINKS[item.id];
                        return (
                          <details
                            key={item.id}
                            id={item.id}
                            className="group scroll-mt-20 border-b border-rule"
                          >
                            <summary className="grid min-h-[56px] cursor-pointer list-none grid-cols-[minmax(0,1fr)_0.75rem] items-start gap-x-4 py-4 transition-colors hover:text-spot [&::-webkit-details-marker]:hidden">
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

                            <div className="pb-7">
                              {item.a.map((p) => (
                                <p
                                  key={p}
                                  className="mt-4 max-w-[38rem] text-[0.98rem] leading-[1.8] text-ink2 first:mt-0"
                                >
                                  <PriceText>{p}</PriceText>
                                </p>
                              ))}
                              {to && (
                                <p className="mt-5">
                                  <Link
                                    href={to.startsWith("#") ? to : localePath(lang, to)}
                                    className="inline-flex min-h-[44px] items-center text-[0.98rem] text-ink underline decoration-rule decoration-1 underline-offset-4 transition-colors hover:decoration-spot"
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

              {/* ---------------- how it is made ----------------
                  The workshop, once a page of its own at /ethics: the two
                  rules as the standard, the river, the sky, the sheet, and
                  the five companies that touch the product. */}
              <section id="how" className="mt-16 scroll-mt-20 sm:mt-20">
                <h2 className="display border-t-2 border-rulestrong pt-4 text-[1.5rem] leading-tight text-ink sm:text-[1.8rem]">
                  {made.title}
                </h2>
                <p className="mt-4 max-w-[38rem] text-[1rem] leading-[1.8] text-ink2">{made.lede}</p>
                <p className="mt-3 text-sm text-ink2">{made.version}</p>

                {[made.s1, made.s2, made.s3, made.s4].map((sec) => (
                  <section key={sec.id} id={`how-${sec.id}`} className="mt-12 scroll-mt-20">
                    <h3 className="display border-t border-rule pt-4 text-[1.25rem] leading-snug text-ink">{sec.h}</h3>
                    {sec.body.map((para) => (
                      <P key={para}>{para}</P>
                    ))}
                  </section>
                ))}

                <section id={`how-${made.s5.id}`} className="mt-12 scroll-mt-20">
                  <h3 className="display border-t border-rule pt-4 text-[1.25rem] leading-snug text-ink">{made.s5.h}</h3>
                  <P>{made.s5.lede}</P>
                  <dl className="mt-6 border-t-2 border-rulestrong">
                    {made.s5.rows.map((r) => (
                      <RegisterRow key={r.k} k={r.k} v={r.v} />
                    ))}
                  </dl>
                  {made.s5.body.map((para) => (
                    <P key={para}>{para}</P>
                  ))}
                </section>
              </section>

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
      <aside aria-label={t.ctaLabel} className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-rulestrong bg-paper sm:hidden">
        <a
          href={cta}
          className="label flex min-h-[3.75rem] items-center justify-center bg-spot px-5 text-paper"
        >
          {t.ctaLabel}
        </a>
      </aside>
    </>
  );
}
