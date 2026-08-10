import { type Lang } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow } from "@/components/ui";
import { ETHICS_MAIL, ethicsContent } from "@/content/trust";

/**
 * /ethics — deliberately the quietest page on the site.
 *
 * Single measured column, no cards, no icons, no CTA buttons anywhere except
 * the one mailto. Section rhythm changes with the kind of statement being made
 * (prose, a numbered refusal, a stepped chain, a two-column table of remedies)
 * so that eleven sections of continuous argument stay readable.
 */

/** Prose column: ~68ch measure, generous leading. */
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 text-[1.02rem] leading-[1.85] text-ink2">{children}</p>;
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
      <div className="flex items-baseline gap-5">
        <span className="inscription text-[0.7rem] text-gold/70">{n}</span>
        <span className="rule-fade hidden flex-1 sm:block" />
      </div>
      <h2 id={id} className="display mt-5 scroll-mt-24 text-[2rem] leading-[1.15] sm:text-[2.6rem]">
        {h}
      </h2>
      {lede && <p className="mt-5 text-[1.02rem] leading-[1.85] text-ink2">{lede}</p>}
    </>
  );
}

/** Hairline chain motif for the verification section — decorative only. */
function ChainRule() {
  return (
    <svg
      viewBox="0 0 320 16"
      className="mt-10 h-4 w-full max-w-md text-ink2"
      aria-hidden="true"
      focusable={false}
    >
      <line x1="8" y1="8" x2="312" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      {[8, 84, 160, 236, 312].map((x) => (
        <circle
          key={x}
          cx={x}
          cy="8"
          r="3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.7"
        />
      ))}
    </svg>
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
        <header className="border-b border-line/60">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-20">
            <div className="max-w-[46rem]">
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h1 className="display mt-6 text-[2.6rem] leading-[1.12] sm:text-6xl">{t.title}</h1>
              <p className="mt-7 text-[1.1rem] leading-[1.8] text-ink2">{t.lede}</p>
              <p className="mt-8 max-w-lg border-t border-line/60 pt-5 text-xs leading-relaxed text-ink2">
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
                <p className="inscription text-[0.6rem] text-ink2">{t.tocLabel}</p>
                <ol className="mt-5 space-y-2.5">
                  {toc.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="flex gap-3 text-[0.82rem] leading-snug text-ink2 transition-colors hover:text-gold"
                      >
                        <span className="shrink-0 tabular-nums opacity-50">{s.n}</span>
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
                  offered collapsed — eleven sections is too many to navigate
                  by scrolling on a phone. */}
              <details className="group mb-16 border-y border-line/60 lg:hidden">
                <summary className="inscription flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-[0.62rem] text-ink [&::-webkit-details-marker]:hidden">
                  {t.tocLabel}
                  <span className="relative h-3 w-3 shrink-0 text-ink2" aria-hidden="true">
                    <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-current" />
                    <span className="absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <ol className="mt-1 space-y-3 pb-5">
                  {toc.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="flex gap-3 text-[0.9rem] leading-snug text-ink2"
                      >
                        <span className="shrink-0 tabular-nums opacity-60">{s.n}</span>
                        <span>{s.h}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </details>

              {/* 01 — the plain statement */}
              <section>
                <SectionHead n={t.s1.n} id={t.s1.id} h={t.s1.h} />
                {t.s1.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}
                <blockquote className="mt-10 border-l-2 border-gold/60 pl-6">
                  <p className="display text-[1.7rem] leading-[1.3] text-ink sm:text-[2rem]">
                    {t.s1.pull}
                  </p>
                </blockquote>
              </section>

              {/* 02 — precedent */}
              <section className="mt-24">
                <SectionHead n={t.s2.n} id={t.s2.id} h={t.s2.h} />
                {t.s2.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}
                <p className="display mt-9 text-[1.45rem] leading-snug text-gold sm:text-[1.7rem]">{t.s2.coda}</p>
              </section>

              {/* 03 — limits */}
              <section className="mt-24">
                <SectionHead n={t.s3.n} id={t.s3.id} h={t.s3.h} />
                {t.s3.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}
              </section>

              {/* 04 — the never-claim list, unadorned on purpose */}
              <section className="mt-24">
                <SectionHead n={t.s4.n} id={t.s4.id} h={t.s4.h} lede={t.s4.lede} />
                <ol className="mt-9 border-t border-line/60">
                  {t.s4.items.map((item, i) => (
                    <li
                      key={item}
                      className="flex gap-5 border-b border-line/60 py-4 text-[0.98rem] leading-[1.7] text-ink2"
                    >
                      <span className="inscription shrink-0 pt-1 text-[0.62rem] tabular-nums text-ink2/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                <P>{t.s4.report}</P>
              </section>

              {/* 05 — the verification chain */}
              <section className="mt-24">
                <SectionHead n={t.s5.n} id={t.s5.id} h={t.s5.h} lede={t.s5.lede} />
                <ChainRule />

                <ol className="mt-10 border-l border-line/70 pl-7 sm:pl-9">
                  {t.s5.steps.map((s, i) => (
                    <li key={s.t} className={`relative ${i === 0 ? "" : "mt-10"}`}>
                      <span
                        className="absolute top-2.5 -left-[31px] h-1.5 w-1.5 rounded-full bg-gold sm:-left-[39px]"
                        aria-hidden="true"
                      />
                      <h3 className="display text-[1.3rem] leading-snug text-ink">{s.t}</h3>
                      <p className="mt-3 text-[1.02rem] leading-[1.85] text-ink2">{s.d}</p>
                    </li>
                  ))}
                </ol>

                <h3 className="inscription mt-16 text-[0.66rem] text-ink">{t.s5.caveatsH}</h3>
                <dl className="mt-6 border-t border-line/60">
                  {t.s5.caveats.map((c) => (
                    <div key={c.t} className="border-b border-line/60 py-6">
                      <dt className="text-[0.98rem] text-ink">{c.t}</dt>
                      <dd className="mt-2.5 text-[0.98rem] leading-[1.8] text-ink2">{c.d}</dd>
                    </div>
                  ))}
                </dl>

                <h3 className="inscription mt-16 text-[0.66rem] text-ink">{t.s5.densityH}</h3>
                {t.s5.density.map((p) => (
                  <P key={p}>{p}</P>
                ))}
              </section>

              {/* 06 — officiants */}
              <section className="mt-24">
                <SectionHead n={t.s6.n} id={t.s6.id} h={t.s6.h} />
                {t.s6.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <h3 className="inscription mt-14 text-[0.66rem] text-ink">{t.s6.payH}</h3>
                <dl className="mt-5 border-t border-line/60">
                  {t.s6.pay.map((row) => (
                    <div
                      key={row.k}
                      className="grid gap-1 border-b border-line/60 py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6"
                    >
                      <dt className="text-[0.9rem] text-ink">{row.k}</dt>
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

                <h3 className="inscription mt-14 text-[0.66rem] text-ink">{t.s6.refusalH}</h3>
                {t.s6.refusal.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <h3 className="inscription mt-14 text-[0.66rem] text-ink">{t.s6.welfareH}</h3>
                {t.s6.welfare.map((p) => (
                  <P key={p}>{p}</P>
                ))}
              </section>

              {/* 07 — the remedy table */}
              <section className="mt-24">
                <SectionHead n={t.s7.n} id={t.s7.id} h={t.s7.h} lede={t.s7.lede} />
                <dl className="mt-9 border-t border-line/60">
                  {t.s7.rows.map((row) => (
                    <div key={row.w} className="border-b border-line/60 py-6">
                      <dt className="display text-[1.15rem] leading-snug text-ink">{row.w}</dt>
                      <dd className="mt-2.5 text-[0.98rem] leading-[1.8] text-ink2">{row.t}</dd>
                    </div>
                  ))}
                </dl>
                <P>{t.s7.note}</P>
              </section>

              {/* 08 — data dignity */}
              <section className="mt-24">
                <SectionHead n={t.s8.n} id={t.s8.id} h={t.s8.h} />
                {t.s8.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <h3 className="inscription mt-14 text-[0.66rem] text-ink">{t.s8.gotraH}</h3>
                {t.s8.gotra.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <h3 className="inscription mt-14 text-[0.66rem] text-ink">{t.s8.sankalpH}</h3>
                {t.s8.sankalp.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <h3 className="inscription mt-14 text-[0.66rem] text-ink">{t.s8.othersH}</h3>
                {t.s8.others.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <h3 className="inscription mt-14 text-[0.66rem] text-ink">{t.s8.retentionH}</h3>
                <dl className="mt-5 border-t border-line/60">
                  {t.s8.retention.map((row) => (
                    <div
                      key={row.k}
                      className="grid gap-1 border-b border-line/60 py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6"
                    >
                      <dt className="text-[0.9rem] text-ink">{row.k}</dt>
                      <dd className="text-[0.95rem] leading-relaxed text-ink2">{row.v}</dd>
                    </div>
                  ))}
                </dl>

                <h3 className="inscription mt-14 text-[0.66rem] text-ink">{t.s8.eraseH}</h3>
                {t.s8.erase.map((p) => (
                  <P key={p}>{p}</P>
                ))}

                <h3 className="inscription mt-14 text-[0.66rem] text-ink">{t.s8.trackingH}</h3>
                {t.s8.tracking.map((p) => (
                  <P key={p}>{p}</P>
                ))}
              </section>

              {/* 09 — the refusals, set tight */}
              <section className="mt-24">
                <SectionHead n={t.s9.n} id={t.s9.id} h={t.s9.h} />
                <ul className="mt-9 space-y-3.5">
                  {t.s9.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 text-[0.98rem] leading-[1.7] text-ink2"
                    >
                      <span
                        className="mt-[0.7rem] h-px w-4 shrink-0 bg-gold/60"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 10 — what we have not settled */}
              <section className="mt-24">
                <SectionHead n={t.s10.n} id={t.s10.id} h={t.s10.h} lede={t.s10.lede} />
                <dl className="mt-9">
                  {t.s10.rows.map((row) => (
                    <div key={row.q} className="border-t border-line/60 py-6">
                      <dt className="inscription text-[0.7rem] text-gold">{row.q}</dt>
                      <dd className="mt-3 text-[0.98rem] leading-[1.8] text-ink2">{row.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* 11 — the close */}
              <section className="mt-24 border-t border-line/60 pt-14">
                <SectionHead n={t.s11.n} id={t.s11.id} h={t.s11.h} />
                {t.s11.body.map((p) => (
                  <P key={p}>{p}</P>
                ))}
                {/* PLACEHOLDER: ethics@snanify.com must be a real, monitored inbox
                    before this page is published. */}
                <p className="mt-10">
                  <a
                    href={`mailto:${ETHICS_MAIL}`}
                    className="inline-flex min-h-[44px] items-center gap-3 border-b border-gold/50 pb-1 text-[1.05rem] text-gold transition-colors hover:border-gold"
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
