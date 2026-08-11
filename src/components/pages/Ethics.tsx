import { type Lang } from "@/lib/i18n";
import { ctaHref } from "@/lib/nav";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow } from "@/components/ui";
import { ETHICS_MAIL, ethicsContent } from "@/content/trust";

/**
 * /ethics, the manifesto. The loudest argument on the site, set in the
 * quietest type.
 *
 * A printed statement of position: one measured column of ink, numbered
 * sections opened by a full-strength rule, the contents set as a ruled
 * sidebar on desktop and a collapsed register on a phone. No cards, no icons,
 * no scroll motion: twelve sections of argument should be legible the instant
 * the page loads, not staged.
 *
 * MOBILE FIRST. Everything here is laid out for a 390px viewport and widened
 * afterwards: single column, nothing that can scroll sideways, 44px minimum on
 * every tap target, and the one primary action pinned within thumb reach at the
 * bottom of the viewport rather than lost at the top of the page.
 *
 * Section rhythm changes with the kind of statement being made (prose, a
 * numbered refusal, a ruled register of specifications, a two-column register
 * of open questions) so that twelve sections of continuous argument stay
 * readable.
 */

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(n: number, lang: Lang): string {
  const s = String(n).padStart(2, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

/** Prose column: ~68ch measure, generous leading, 16px floor on a phone. */
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 text-[1.02rem] leading-[1.8] text-ink2">{children}</p>;
}

/** A sub-head inside a section, set as a small ruled label. */
function SubHead({ children }: { children: React.ReactNode }) {
  return <h3 className="label mt-12 border-t border-rule pt-4 text-ink">{children}</h3>;
}

/**
 * The almanac's basic unit, and the reason there are no tables on this page:
 * a term over its value on a phone, a two-column ruled row from `sm` up.
 * Nothing here can ever become a horizontal scroller.
 */
function RegisterRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid gap-1.5 border-b border-rule py-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
      <dt className="label pt-1 text-spot">{k}</dt>
      <dd className="text-[0.98rem] leading-[1.75] text-ink2">{v}</dd>
    </div>
  );
}

function SectionHead({
  n,
  id,
  h,
  lede,
}: {
  n: string;
  id: string;
  h: string;
  lede?: string;
}) {
  return (
    <>
      <div className="flex items-center gap-4 border-t-2 border-rulestrong pt-4 sm:gap-5 sm:pt-5">
        <span className="display text-[1.4rem] leading-none text-spot sm:text-[1.5rem]">{n}</span>
        <span className="hidden h-px flex-1 bg-rule sm:block" aria-hidden="true" />
      </div>
      <h2
        id={id}
        className="display mt-4 scroll-mt-20 text-[1.9rem] leading-[1.15] sm:text-[2.6rem]"
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

  const toc = [
    t.s1,
    t.s2,
    t.s3,
    t.s4,
    t.s5,
    t.s6,
    t.s7,
    t.s8,
    t.s9,
    t.s10,
    t.s11,
    t.s12,
  ].map((s) => ({ id: s.id, n: s.n, h: s.h }));

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
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h1 className="display mt-5 text-[2.3rem] leading-[1.12] sm:mt-6 sm:text-6xl">
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
                <p className="label text-spot">{t.tocLabel}</p>
                <ol className="mt-5 border-t-2 border-rulestrong">
                  {toc.map((s) => (
                    <li key={s.id} className="border-b border-rule">
                      <a
                        href={`#${s.id}`}
                        className="flex gap-3 py-2.5 text-[0.82rem] leading-snug text-ink2 transition-colors hover:text-spot"
                      >
                        <span className="shrink-0 tabular-nums text-spot">{s.n}</span>
                        <span>{s.h}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            {/* ---------------- the statement ---------------- */}
            <article className="max-w-[42rem] py-12 sm:py-20">
              {/* Below lg the sticky column is gone, so the same contents are
                  offered collapsed. Twelve sections is too many to navigate by
                  scrolling on a phone. */}
              <details className="group mb-12 border-y border-rulestrong lg:hidden">
                <summary className="label flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-ink [&::-webkit-details-marker]:hidden">
                  {t.tocLabel}
                  <span className="relative h-3 w-3 shrink-0 text-spot" aria-hidden="true">
                    <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-current" />
                    <span className="absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <ol className="border-t border-rule pb-4">
                  {toc.map((s) => (
                    <li key={s.id} className="border-b border-rule last:border-b-0">
                      <a
                        href={`#${s.id}`}
                        className="flex min-h-[44px] items-center gap-3 py-2 text-[0.92rem] leading-snug text-ink2"
                      >
                        <span className="shrink-0 tabular-nums text-spot">{s.n}</span>
                        <span>{s.h}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </details>

              {/* 01, the plain statement */}
              <section>
                <SectionHead n={t.s1.n} id={t.s1.id} h={t.s1.h} />
                {t.s1.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}
                <blockquote className="mt-9 border-l-2 border-spot pl-5 sm:pl-6">
                  <p className="display text-[1.5rem] leading-[1.3] text-ink sm:text-[2rem]">
                    {t.s1.pull}
                  </p>
                </blockquote>
              </section>

              {/* 02, the mechanic, stated as a specification */}
              <section className="mt-20 sm:mt-24">
                <SectionHead n={t.s2.n} id={t.s2.id} h={t.s2.h} />
                {t.s2.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <SubHead>{t.s2.specH}</SubHead>
                <dl className="mt-5 border-t-2 border-rulestrong">
                  {t.s2.spec.map((row) => (
                    <RegisterRow key={row.k} k={row.k} v={row.v} />
                  ))}
                </dl>

                <p className="display mt-9 text-[1.35rem] leading-snug text-spot sm:text-[1.7rem]">
                  {t.s2.coda}
                </p>
                <p className="mt-6 border-t border-rule pt-4 text-[0.9rem] leading-relaxed text-ink2">
                  {t.s2.credit}
                </p>
              </section>

              {/* 03, the precedent the tradition already ships */}
              <section className="mt-20 sm:mt-24">
                <SectionHead n={t.s3.n} id={t.s3.id} h={t.s3.h} />
                {t.s3.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <blockquote className="mt-9 border-y-2 border-rulestrong py-7">
                  {t.s3.verse.map((line) => (
                    <p
                      key={line}
                      className="display text-[1.25rem] leading-[1.7] text-ink sm:text-[1.55rem]"
                    >
                      {line}
                    </p>
                  ))}
                  <p className="mt-5 text-[0.98rem] leading-[1.75] text-ink2">{t.s3.verseGloss}</p>
                </blockquote>

                {t.s3.after.map((p) => (
                  <P key={p}>{p}</P>
                ))}
              </section>

              {/* 04, what it is not, itemised and unhedged */}
              <section className="mt-20 sm:mt-24">
                <SectionHead n={t.s4.n} id={t.s4.id} h={t.s4.h} />
                <dl className="mt-8 border-t-2 border-rulestrong">
                  {t.s4.items.map((item) => (
                    <div key={item.t} className="border-b border-rule py-6">
                      <dt className="display text-[1.2rem] leading-snug text-ink sm:text-[1.35rem]">
                        {item.t}
                      </dt>
                      <dd className="mt-2.5 text-[0.98rem] leading-[1.8] text-ink2">{item.d}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* 05, the objection, answered */}
              <section className="mt-20 sm:mt-24">
                <SectionHead n={t.s5.n} id={t.s5.id} h={t.s5.h} />
                {t.s5.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}
                <blockquote className="mt-9 border-l-2 border-spot pl-5 sm:pl-6">
                  <p className="display text-[1.5rem] leading-[1.3] text-ink sm:text-[2rem]">
                    {t.s5.pull}
                  </p>
                </blockquote>
                <P>{t.s5.close}</P>
              </section>

              {/* 06, the audiences, named */}
              <section className="mt-20 sm:mt-24">
                <SectionHead n={t.s6.n} id={t.s6.id} h={t.s6.h} />
                <ol className="mt-8 border-t-2 border-rulestrong">
                  {t.s6.items.map((item, i) => (
                    <li
                      key={item}
                      className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 border-b border-rule py-5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-6"
                    >
                      <span className="display text-[1.2rem] leading-none text-spot tabular-nums sm:text-[1.5rem]">
                        {numeral(i + 1, lang)}
                      </span>
                      <span className="text-[0.98rem] leading-[1.8] text-ink2">{item}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* 07, and who it is not for, which is what makes the rest true */}
              <section className="mt-20 sm:mt-24">
                <SectionHead n={t.s7.n} id={t.s7.id} h={t.s7.h} />
                <dl className="mt-8 border-t-2 border-rulestrong">
                  {t.s7.items.map((item) => (
                    <div key={item.t} className="border-b border-rule py-6">
                      <dt className="display text-[1.2rem] leading-snug text-spot sm:text-[1.35rem]">
                        {item.t}
                      </dt>
                      <dd className="mt-2.5 text-[0.98rem] leading-[1.8] text-ink2">{item.d}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* 08, the never-claim list, unadorned on purpose */}
              <section className="mt-20 sm:mt-24">
                <SectionHead n={t.s8.n} id={t.s8.id} h={t.s8.h} lede={t.s8.lede} />
                <ol className="mt-8 border-t-2 border-rulestrong">
                  {t.s8.items.map((item, i) => (
                    <li
                      key={item}
                      className="flex gap-4 border-b border-rule py-4 text-[0.98rem] leading-[1.7] text-ink2 sm:gap-5"
                    >
                      <span className="display shrink-0 pt-[0.15rem] text-[1.05rem] leading-none text-spot tabular-nums">
                        {numeral(i + 1, lang)}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                <P>{t.s8.report}</P>
              </section>

              {/* 09, the refusals, set tight */}
              <section className="mt-20 sm:mt-24">
                <SectionHead n={t.s9.n} id={t.s9.id} h={t.s9.h} />
                <ul className="mt-8 space-y-3.5">
                  {t.s9.items.map((item) => (
                    <li key={item} className="flex gap-4 text-[0.98rem] leading-[1.7] text-ink2">
                      <span
                        className="mt-[0.6rem] h-[3px] w-4 shrink-0 bg-spot"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 10, data dignity, which survived the pivot intact */}
              <section className="mt-20 sm:mt-24">
                <SectionHead n={t.s10.n} id={t.s10.id} h={t.s10.h} />
                {t.s10.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <SubHead>{t.s10.gotraH}</SubHead>
                {t.s10.gotra.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <SubHead>{t.s10.sankalpH}</SubHead>
                {t.s10.sankalp.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <SubHead>{t.s10.othersH}</SubHead>
                {t.s10.others.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <SubHead>{t.s10.retentionH}</SubHead>
                <dl className="mt-5 border-t-2 border-rulestrong">
                  {t.s10.retention.map((row) => (
                    <RegisterRow key={row.k} k={row.k} v={row.v} />
                  ))}
                </dl>

                <SubHead>{t.s10.eraseH}</SubHead>
                {t.s10.erase.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                {/* The analytics script is named here on purpose. If it is ever
                    removed, tighten this copy; never loosen it. */}
                <SubHead>{t.s10.trackingH}</SubHead>
                {t.s10.tracking.map((p) => (
                  <P key={p}>{p}</P>
                ))}
              </section>

              {/* 11, what is not settled, applied to ourselves */}
              <section className="mt-20 sm:mt-24">
                <SectionHead n={t.s11.n} id={t.s11.id} h={t.s11.h} lede={t.s11.lede} />
                <dl className="mt-8 border-t-2 border-rulestrong">
                  {t.s11.rows.map((row) => (
                    <div key={row.q} className="border-b border-rule py-6">
                      <dt className="label text-spot">{row.q}</dt>
                      <dd className="mt-3 text-[0.98rem] leading-[1.8] text-ink2">{row.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* 12, the close */}
              <section className="mt-20 sm:mt-24">
                <SectionHead n={t.s12.n} id={t.s12.id} h={t.s12.h} />
                {t.s12.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}
                {/* PLACEHOLDER: ethics@snanify.com must be a real, monitored inbox
                    before this page is published. */}
                <p className="mt-9">
                  <a
                    href={`mailto:${ETHICS_MAIL}`}
                    className="inline-flex min-h-[44px] flex-wrap items-center gap-x-3 gap-y-1 border-b-2 border-spot pb-1 text-[1.02rem] text-spot transition-colors hover:border-rulestrong hover:text-ink"
                  >
                    <span>{t.s12.mailLabel}</span>
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
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-rulestrong bg-paper sm:hidden">
        <a
          href={cta}
          className="label flex min-h-[3.75rem] items-center justify-center bg-spot px-5 text-paper"
        >
          {t.closing.cta}
        </a>
      </div>
    </>
  );
}
