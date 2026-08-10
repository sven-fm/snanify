import Link from "next/link";
import { content } from "@/lib/content";
import { RIVERS } from "@/content/rivers";
import { DATED_OCCASIONS } from "@/content/muhurat";
import { localePath } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import { Mark, SealAnimated } from "@/components/Logo";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, Card, StatusBadge, Section, SectionHeader } from "@/components/ui";

export function Landing({ lang }: { lang: Lang }) {
  const t = content[lang];


  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/" ctaTo="#sankalp" />

      <main>
        {/* ---------------- hero ---------------- */}
        <section className="relative overflow-hidden">
          <div className="halo" aria-hidden="true" />

          {/* the waterline: concentric ripples receding to the horizon */}
          <svg
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full opacity-[0.5]"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {Array.from({ length: 9 }, (_, i) => (
              <ellipse
                key={i}
                cx="600"
                cy={400 - i * 6}
                rx={140 + i * 135}
                ry={26 + i * 11}
                fill="none"
                stroke="var(--teal)"
                strokeWidth="1"
                opacity={0.5 - i * 0.045}
              />
            ))}
          </svg>

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-16 pb-24 sm:px-8 sm:pt-24 sm:pb-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
            <div>
              <div className="rise-in" style={{ animationDelay: "60ms" }}>
                <StatusBadge>{t.hero.badge}</StatusBadge>
              </div>

              <h1
                className="rise-in display mt-7 text-[3.1rem] leading-[0.95] sm:text-7xl lg:text-[5.4rem]"
                style={{ animationDelay: "160ms" }}
              >
                {t.hero.titleA}
                <br />
                <span className="text-gold italic">{t.hero.titleB}</span>
              </h1>

              <p
                className="rise-in mt-7 max-w-lg text-[1.05rem] leading-relaxed text-ink2"
                style={{ animationDelay: "260ms" }}
              >
                {t.hero.lede}
              </p>

              <div
                className="rise-in mt-9 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "360ms" }}
              >
                <a href="#sankalp">
                  <CTA>{t.hero.ctaPrimary}</CTA>
                </a>
                <Link href={localePath(lang, "/how-it-works")}>
                  <CTA variant="ghost">{t.hero.ctaSecondary}</CTA>
                </Link>
              </div>

              <dl
                className="rise-in mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-line/60 pt-7"
                style={{ animationDelay: "460ms" }}
              >
                {t.hero.stats.map((s) => (
                  <div key={s.l}>
                    <dt className="display text-2xl text-ink sm:text-[1.75rem]">{s.n}</dt>
                    <dd className="mt-1 text-xs tracking-wide text-ink2">{s.l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div
              className="rise-in relative mx-auto w-full max-w-sm lg:max-w-none"
              style={{ animationDelay: "320ms" }}
            >
              <SealAnimated className="mx-auto w-full max-w-[24rem] text-ink" />

              {/* Pulled up into the seal's empty lower third so the card layers
                  over the bloom without ever covering the bindu. */}
              <div className="relative z-10 mx-auto -mt-10 w-full max-w-xs rounded-2xl border border-line/80 bg-bg2/85 p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)] backdrop-blur-xl lg:-mt-14 lg:mr-0 lg:ml-auto">
                <p className="inscription text-[0.6rem] text-ink2">{t.hero.card.label}</p>
                <p className="display mt-2 text-2xl text-ink">{t.hero.card.title}</p>
                <p className="mt-1.5 text-xs text-ink2">{t.hero.card.meta}</p>
                <div className="mt-4 flex items-center gap-2 border-t border-line/60 pt-3">
                  <Mark className="h-4 w-4 text-gold" />
                  <p className="text-xs text-gold">{t.hero.card.countdown}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- rivers ---------------- */}
        <Section id="rivers" tinted>
          <SectionHeader eyebrow={t.rivers.eyebrow} title={t.rivers.title} lede={t.rivers.lede} />

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/70 sm:grid-cols-2 lg:grid-cols-3">
            {RIVERS.map((r) => (
              <li key={r.slug} className="group relative bg-bg transition-colors duration-500 hover:bg-bg3">
                <Link href={localePath(lang, `/rivers/${r.slug}`)} className="block p-7">
                  <span className="inscription absolute top-6 right-6 text-[0.6rem] text-ink2/50">
                    {r.numeral}
                  </span>
                  <Mark className="h-7 w-7 text-ink2 transition-colors duration-500 group-hover:text-gold" />
                  <h3 className="display mt-6 text-2xl text-ink">{r.river[lang]}</h3>
                  <p className="mt-1.5 text-sm text-ink2">
                    {r.ghat[lang]}, {r.city[lang]}
                  </p>
                  <p className="mt-5 text-xs text-teal">{r.epithet[lang]}</p>
                </Link>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </li>
            ))}
          </ul>

        </Section>

        {/* ---------------- how ---------------- */}
        <Section id="how">
          <SectionHeader eyebrow={t.how.eyebrow} title={t.how.title} />

          <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {t.how.steps.map((s) => (
              <li key={s.n} className="relative md:pt-10">
                {/* the hairline that threads the three steps together */}
                <span className="rule-fade absolute inset-x-0 top-0 hidden md:block" />
                <span className="display block text-5xl text-gold/35">{s.n}</span>
                <h3 className="display mt-5 text-2xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink2">{s.d}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ---------------- muhurat ---------------- */}
        <Section id="muhurat" tinted>
          <SectionHeader
            eyebrow={t.muhurat.eyebrow}
            title={t.muhurat.title}
            lede={t.muhurat.lede}
          />

          {/* deliberately a list, not more cards — changes the page's rhythm.
              Reads the real calendar, so nothing here can drift from /muhurat. */}
          <ul className="mt-12 border-t border-line/60">
            {DATED_OCCASIONS.slice(0, 4).map((o) => (
              <li
                key={o.slug}
                className="group border-b border-line/60 transition-colors hover:bg-bg3/50"
              >
                <Link
                  href={localePath(lang, `/muhurat/${o.slug}`)}
                  className="grid grid-cols-1 items-baseline gap-1 py-6 sm:grid-cols-[1fr_auto] sm:gap-8 sm:py-7"
                >
                  <div className="sm:flex sm:items-baseline sm:gap-6">
                    <h3 className="display text-2xl transition-colors group-hover:text-gold sm:min-w-[15rem]">
                      {o.name[lang]}
                    </h3>
                    <p className="mt-1 text-sm text-ink2 sm:mt-0">{o.occurrence.note[lang]}</p>
                  </div>
                  <p className="inscription text-[0.66rem] text-ink2">
                    {o.occurrence.label[lang]}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-ink2/80">
            {lang === "en"
              ? "Provisional. Every timing is confirmed against the panchang before booking opens."
              : "अस्थायी। बुकिंग खुलने से पूर्व हर समय पंचांग से पुष्ट किया जाता है।"}
          </p>

        </Section>

        {/* ---------------- sankalp / pricing ---------------- */}
        <Section id="sankalp">
          <SectionHeader
            eyebrow={t.pricing.eyebrow}
            title={t.pricing.title}
            lede={t.pricing.lede}
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {t.pricing.plans.map((p, i) => {
              const featured = i === 1;
              return (
                <Card
                  key={p.name}
                  featured={featured}
                  className={`relative flex flex-col ${featured ? "lg:-translate-y-4" : ""}`}
                >
                  {featured && (
                    <span className="inscription absolute -top-2.5 left-8 rounded-full bg-gold px-3 py-1 text-[0.55rem] text-bg">
                      {t.pricing.popular}
                    </span>
                  )}

                  <h3 className="display text-2xl">{p.name}</h3>
                  <p className="mt-1 text-xs text-ink2">{p.sub}</p>

                  <p className="display mt-7 text-5xl text-gold">{p.price}</p>

                  <ul className="mt-8 flex-1 space-y-3.5 border-t border-line/60 pt-7">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm text-ink2">
                        <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <CTA variant={featured ? "solid" : "ghost"} className="w-full">
                      {t.pricing.cta} {p.name}
                    </CTA>
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* ---------------- closing ---------------- */}
        <section className="relative overflow-hidden border-t border-line/60 bg-bg2/40">
          <div className="halo" aria-hidden="true" />
          <div className="relative mx-auto max-w-3xl px-5 py-28 text-center sm:px-8 sm:py-36">
            <Mark className="mx-auto h-14 w-14 text-ink" />
            <h2 className="display mt-10 text-4xl leading-[1.08] sm:text-6xl">{t.closing.title}</h2>
            <p className="mx-auto mt-6 max-w-xl text-ink2">{t.closing.lede}</p>
            <a href="#sankalp" className="mt-10 inline-block">
              <CTA className="!px-9 !py-4 !text-base">{t.closing.cta}</CTA>
            </a>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
