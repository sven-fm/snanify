/* This page exists in English and Hindi only; see the tier note and the
   FULL_ONLY list at the top of src/lib/locales.ts. `Lang` here is therefore
   the full-depth pair and not the twelve locales the site serves. */
import type { FullLang as Lang } from "@/lib/locales";
import { ctaHref } from "@/lib/nav";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ETHICS_MAIL, ethicsContent } from "@/content/trust";

/**
 * /ethics, how it is made.
 *
 * This page was a twelve-section manifesto: what a digital snan is not, who it
 * is not for, claims we will never make, an invitation to ask someone whose
 * judgement you trust. Three thousand words of the product arguing with a
 * critic who was not in the room, which reads as doubt and sells nothing.
 *
 * It is now five sections and under four hundred words: the river and its
 * cadence, the sky and how it is computed, what the sheet records and how to
 * recompute it, and the five companies that touch the product. A maker showing
 * the workshop. The two rules are stated once, at the top, as the standard the
 * thing is built to.
 *
 * MOBILE FIRST. Single column, nothing that can scroll sideways, 44px minimum
 * on every tap target, and the primary action pinned within thumb reach at the
 * bottom of the viewport.
 */

/** Prose column: ~68ch measure, generous leading, 16px floor on a phone. */
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 text-[1.02rem] leading-[1.8] text-ink2">{children}</p>;
}

/**
 * The almanac's basic unit, and the reason there are no tables on this page:
 * a term over its value on a phone, a two-column ruled row from `sm` up.
 * Nothing here can ever become a horizontal scroller.
 */
function RegisterRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid gap-1.5 border-b border-rule py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
      <dt className="label pt-1 text-ink2">{k}</dt>
      <dd className="text-[0.98rem] leading-[1.75] text-ink2">{v}</dd>
    </div>
  );
}

/* Unnumbered: five sections a reader dips into are a list, not a sequence. */
function SectionHead({ id, h, lede }: { id: string; h: string; lede?: string }) {
  return (
    <>
      <h2
        id={id}
        className="display scroll-mt-20 border-t-2 border-rulestrong pt-5 text-[1.9rem] leading-[1.15] sm:pt-6 sm:text-[2.6rem]"
      >
        {h}
      </h2>
      {lede && <p className="mt-5 text-[1.02rem] leading-[1.8] text-ink2">{lede}</p>}
    </>
  );
}

export function Ethics({ lang }: { lang: Lang }) {
  const t = ethicsContent[lang];
  const cta = ctaHref(lang);

  const prose = [t.s1, t.s2, t.s3, t.s4];
  const toc = [...prose, t.s5].map((s) => ({ id: s.id, h: s.h }));

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/ethics" />

      {/* The bottom rail is 3.75rem tall on a phone; the page ends above it. */}
      <main className="pb-20 sm:pb-0">
        {/* ---------------- masthead ---------------- */}
        <header className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-10 pb-10 sm:px-8 sm:pt-24 sm:pb-20">
            <div className="ink-in max-w-[46rem]">
              <h1 className="display text-[2.3rem] leading-[1.12] sm:text-6xl">
                {t.title}
              </h1>
              <div className="rule-double mt-7 max-w-xl" />
              <p className="mt-6 text-[1.05rem] leading-[1.8] text-ink2 sm:text-[1.1rem]">
                {t.lede}
              </p>
              <p className="mt-8 max-w-lg border-t border-rule pt-5 text-[0.9rem] leading-relaxed text-ink2">
                {t.version}
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="gap-16 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)]">
            {/* ---------------- contents ---------------- */}
            <nav aria-label={t.tocLabel} className="hidden lg:block">
              <div className="sticky top-24 py-20">
                <p className="text-sm text-ink2">{t.tocLabel}</p>
                <ul className="mt-4 border-t-2 border-rulestrong">
                  {toc.map((s) => (
                    <li key={s.id} className="border-b border-rule">
                      <a
                        href={`#${s.id}`}
                        className="block py-2.5 text-[0.9rem] leading-snug text-ink transition-colors hover:text-spot"
                      >
                        {s.h}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* ---------------- the workshop ---------------- */}
            <article className="max-w-[42rem] py-12 sm:py-20">
              {prose.map((s, i) => (
                <section key={s.id} className={i === 0 ? undefined : "mt-20 sm:mt-24"}>
                  <SectionHead id={s.id} h={s.h} />
                  {s.body.map((p) => (
                    <P key={p}>{p}</P>
                  ))}
                </section>
              ))}

              {/* the hands the product passes through */}
              <section className="mt-20 sm:mt-24">
                <SectionHead id={t.s5.id} h={t.s5.h} lede={t.s5.lede} />
                <dl className="mt-8 border-t-2 border-rulestrong">
                  {t.s5.rows.map((r) => (
                    <RegisterRow key={r.k} k={r.k} v={r.v} />
                  ))}
                </dl>
                {t.s5.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}
                {/* PLACEHOLDER: ethics@snanify.com must be a real, monitored inbox
                    before this page is published. */}
                <p className="mt-9">
                  <a
                    href={`mailto:${ETHICS_MAIL}`}
                    className="inline-flex min-h-[44px] flex-wrap items-center gap-x-3 gap-y-1 border-b-2 border-spot pb-1 text-[1.02rem] text-spot transition-colors hover:border-rulestrong hover:text-ink"
                  >
                    <span>{t.s5.mailLabel}:</span>
                    <span className="break-all text-ink2">{ETHICS_MAIL}</span>
                  </a>
                </p>
              </section>
            </article>
          </div>
        </div>

        {/* ---------------- colophon ---------------- */}
        <section className="tint border-t-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <h2 className="display text-[1.8rem] leading-[1.18] sm:text-[2.6rem]">
                {t.closing.title}
              </h2>
              <p className="mt-5 text-[1.02rem] leading-[1.8] text-ink2">{t.closing.body}</p>
              {/* Desktop keeps the action inline; the phone gets it on the rail
                  below, where a thumb already is. */}
              <a
                href={cta}
                className="label mt-8 hidden min-h-[44px] items-center justify-center bg-spot px-8 py-4 text-paper transition-colors hover:bg-ink sm:inline-flex"
              >
                {t.closing.cta}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />

      {/* ---------------- thumb rail, phones only ---------------- */}
      <aside aria-label={t.closing.cta} className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-rulestrong bg-paper sm:hidden">
        <a
          href={cta}
          className="label flex min-h-[3.75rem] items-center justify-center bg-spot px-5 text-paper"
        >
          {t.closing.cta}
        </a>
      </aside>
    </>
  );
}
