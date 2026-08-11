import { Fragment } from "react";
import { type Lang } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow } from "@/components/ui";
import { ETHICS_MAIL, ethicsContent } from "@/content/trust";

/**
 * /ethics, deliberately the quietest page on the site.
 *
 * A printed statement of policy: one measured column of ink, numbered sections
 * opened by a full-strength rule, the contents set as a ruled sidebar. No
 * cards, no icons, no CTA buttons anywhere except the one mailto. There is no
 * scroll motion here on purpose: eleven sections of binding argument should be
 * legible the instant the page loads, not staged.
 *
 * Section rhythm changes with the kind of statement being made (prose, a
 * numbered refusal, a stepped chain, a two-column register of remedies) so that
 * eleven sections of continuous argument stay readable.
 */

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(n: number, lang: Lang): string {
  const s = String(n).padStart(2, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

/** Prose column: ~68ch measure, generous leading. */
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 text-[1.02rem] leading-[1.85] text-ink2">{children}</p>;
}

/** A sub-head inside a section, set as a small ruled label. */
function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="label mt-14 border-t border-rule pt-4 text-ink">{children}</h3>
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
      <div className="flex items-center gap-5 border-t-2 border-rulestrong pt-5">
        <span className="display text-[1.5rem] leading-none text-spot">{n}</span>
        <span className="hidden h-px flex-1 bg-rule sm:block" aria-hidden="true" />
      </div>
      <h2 id={id} className="display mt-4 scroll-mt-24 text-[2rem] leading-[1.15] sm:text-[2.6rem]">
        {h}
      </h2>
      {lede && <p className="mt-5 text-[1.02rem] leading-[1.85] text-ink2">{lede}</p>}
    </>
  );
}

/** Hairline chain motif for the verification section, decorative only. */
function ChainRule() {
  return (
    <div className="mt-10 flex max-w-md items-center" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Fragment key={i}>
          {i > 0 && <span className="h-px flex-1 bg-rule" />}
          <span className="h-2.5 w-2.5 border border-ink2" />
        </Fragment>
      ))}
    </div>
  );
}

export function Ethics({ lang }: { lang: Lang }) {
  const t = ethicsContent[lang];

  const toc = [t.s1, t.s2, t.s3, t.s4, t.s5, t.s6, t.s7, t.s8, t.s9, t.s10, t.s11].map((s) => ({
    id: s.id,
    n: s.n,
    h: s.h,
  }));

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/ethics" />

      <main>
        {/* ---------------- masthead ---------------- */}
        <header className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-20">
            <div className="ink-in max-w-[46rem]">
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h1 className="display mt-6 text-[2.6rem] leading-[1.12] sm:text-6xl">{t.title}</h1>
              <div className="rule-double mt-8 max-w-xl" />
              <p className="mt-6 text-[1.1rem] leading-[1.8] text-ink2">{t.lede}</p>
              <p className="mt-8 max-w-lg border-t border-rule pt-5 text-xs leading-relaxed text-ink2">
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
            <article className="max-w-[42rem] py-16 sm:py-20">
              {/* Below lg the sticky column is gone, so the same contents are
                  offered collapsed, eleven sections is too many to navigate
                  by scrolling on a phone. */}
              <details className="group mb-16 border-y border-rulestrong lg:hidden">
                <summary className="label flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-ink [&::-webkit-details-marker]:hidden">
                  {t.tocLabel}
                  <span className="relative h-3 w-3 shrink-0 text-spot" aria-hidden="true">
                    <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-current" />
                    <span className="absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <ol className="border-t border-rule pb-5">
                  {toc.map((s) => (
                    <li key={s.id} className="border-b border-rule">
                      <a
                        href={`#${s.id}`}
                        className="flex min-h-[44px] items-center gap-3 py-2 text-[0.9rem] leading-snug text-ink2"
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
                <blockquote className="mt-10 border-l-2 border-spot pl-6">
                  <p className="display text-[1.7rem] leading-[1.3] text-ink sm:text-[2rem]">
                    {t.s1.pull}
                  </p>
                </blockquote>
              </section>

              {/* 02, precedent */}
              <section className="mt-24">
                <SectionHead n={t.s2.n} id={t.s2.id} h={t.s2.h} />
                {t.s2.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}
                <p className="display mt-9 text-[1.45rem] leading-snug text-spot sm:text-[1.7rem]">
                  {t.s2.coda}
                </p>
              </section>

              {/* 03, limits */}
              <section className="mt-24">
                <SectionHead n={t.s3.n} id={t.s3.id} h={t.s3.h} />
                {t.s3.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}
              </section>

              {/* 04, the never-claim list, unadorned on purpose */}
              <section className="mt-24">
                <SectionHead n={t.s4.n} id={t.s4.id} h={t.s4.h} lede={t.s4.lede} />
                <ol className="mt-9 border-t-2 border-rulestrong">
                  {t.s4.items.map((item, i) => (
                    <li
                      key={item}
                      className="flex gap-5 border-b border-rule py-4 text-[0.98rem] leading-[1.7] text-ink2"
                    >
                      <span className="display shrink-0 pt-[0.15rem] text-[1.05rem] leading-none text-spot tabular-nums">
                        {numeral(i + 1, lang)}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                <P>{t.s4.report}</P>
              </section>

              {/* 05, the verification chain */}
              <section className="mt-24">
                <SectionHead n={t.s5.n} id={t.s5.id} h={t.s5.h} lede={t.s5.lede} />
                <ChainRule />

                <ol className="mt-10 border-t-2 border-rulestrong">
                  {t.s5.steps.map((s, i) => (
                    <li
                      key={s.t}
                      className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 border-b border-rule py-7 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-x-7"
                    >
                      <span className="display text-[1.5rem] leading-none text-spot tabular-nums sm:text-[1.9rem]">
                        {numeral(i + 1, lang)}
                      </span>
                      <div>
                        <h3 className="display text-[1.3rem] leading-snug text-ink">{s.t}</h3>
                        <p className="mt-3 text-[1.02rem] leading-[1.85] text-ink2">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <SubHead>{t.s5.caveatsH}</SubHead>
                <dl className="mt-6 border-t-2 border-rulestrong">
                  {t.s5.caveats.map((c) => (
                    <div key={c.t} className="border-b border-rule py-6">
                      <dt className="text-[0.98rem] text-ink">{c.t}</dt>
                      <dd className="mt-2.5 text-[0.98rem] leading-[1.8] text-ink2">{c.d}</dd>
                    </div>
                  ))}
                </dl>

                <SubHead>{t.s5.densityH}</SubHead>
                {t.s5.density.map((p) => (
                  <P key={p}>{p}</P>
                ))}
              </section>

              {/* 06, officiants */}
              <section className="mt-24">
                <SectionHead n={t.s6.n} id={t.s6.id} h={t.s6.h} />
                {t.s6.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <SubHead>{t.s6.payH}</SubHead>
                <dl className="mt-5 border-t-2 border-rulestrong">
                  {t.s6.pay.map((row) => (
                    <div
                      key={row.k}
                      className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6"
                    >
                      <dt className="label pt-1 text-ink">{row.k}</dt>
                      <dd className="text-[0.95rem] leading-relaxed text-ink2">{row.v}</dd>
                    </div>
                  ))}
                </dl>
                {/* PLACEHOLDER: ₹1,800 / 20% / ₹4,000 are proposed figures from the
                    spec and have not been market-tested. The note below must stay
                    visible for as long as that is true. */}
                <p className="mt-5 text-[0.88rem] leading-[1.75] text-ink2 italic">
                  {t.s6.payNote}
                </p>

                <SubHead>{t.s6.refusalH}</SubHead>
                {t.s6.refusal.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <SubHead>{t.s6.welfareH}</SubHead>
                {t.s6.welfare.map((p) => (
                  <P key={p}>{p}</P>
                ))}
              </section>

              {/* 07, the remedy register */}
              <section className="mt-24">
                <SectionHead n={t.s7.n} id={t.s7.id} h={t.s7.h} lede={t.s7.lede} />
                <dl className="mt-9 border-t-2 border-rulestrong">
                  {t.s7.rows.map((row) => (
                    <div key={row.w} className="border-b border-rule py-6">
                      <dt className="display text-[1.15rem] leading-snug text-ink">{row.w}</dt>
                      <dd className="mt-2.5 text-[0.98rem] leading-[1.8] text-ink2">{row.t}</dd>
                    </div>
                  ))}
                </dl>
                <P>{t.s7.note}</P>
              </section>

              {/* 08, data dignity */}
              <section className="mt-24">
                <SectionHead n={t.s8.n} id={t.s8.id} h={t.s8.h} />
                {t.s8.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <SubHead>{t.s8.gotraH}</SubHead>
                {t.s8.gotra.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <SubHead>{t.s8.sankalpH}</SubHead>
                {t.s8.sankalp.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <SubHead>{t.s8.othersH}</SubHead>
                {t.s8.others.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <SubHead>{t.s8.retentionH}</SubHead>
                <dl className="mt-5 border-t-2 border-rulestrong">
                  {t.s8.retention.map((row) => (
                    <div
                      key={row.k}
                      className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6"
                    >
                      <dt className="label pt-1 text-ink">{row.k}</dt>
                      <dd className="text-[0.95rem] leading-relaxed text-ink2">{row.v}</dd>
                    </div>
                  ))}
                </dl>

                <SubHead>{t.s8.eraseH}</SubHead>
                {t.s8.erase.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <SubHead>{t.s8.trackingH}</SubHead>
                {t.s8.tracking.map((p) => (
                  <P key={p}>{p}</P>
                ))}
              </section>

              {/* 09, the refusals, set tight */}
              <section className="mt-24">
                <SectionHead n={t.s9.n} id={t.s9.id} h={t.s9.h} />
                <ul className="mt-9 space-y-3.5">
                  {t.s9.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 text-[0.98rem] leading-[1.7] text-ink2"
                    >
                      <span
                        className="mt-[0.6rem] h-[3px] w-4 shrink-0 bg-spot"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 10, what we have not settled */}
              <section className="mt-24">
                <SectionHead n={t.s10.n} id={t.s10.id} h={t.s10.h} lede={t.s10.lede} />
                <dl className="mt-9 border-t-2 border-rulestrong">
                  {t.s10.rows.map((row) => (
                    <div key={row.q} className="border-b border-rule py-6">
                      <dt className="label text-spot">{row.q}</dt>
                      <dd className="mt-3 text-[0.98rem] leading-[1.8] text-ink2">{row.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* 11, the close */}
              <section className="mt-24">
                <SectionHead n={t.s11.n} id={t.s11.id} h={t.s11.h} />
                {t.s11.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}
                {/* PLACEHOLDER: ethics@snanify.com must be a real, monitored inbox
                    before this page is published. */}
                <p className="mt-10">
                  <a
                    href={`mailto:${ETHICS_MAIL}`}
                    className="inline-flex min-h-[44px] flex-wrap items-center gap-3 border-b-2 border-spot pb-1 text-[1.05rem] text-spot transition-colors hover:border-rulestrong hover:text-ink"
                  >
                    <span>{t.s11.mailLabel}</span>
                    <span className="text-ink2">{ETHICS_MAIL}</span>
                  </a>
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </>
  );
}
