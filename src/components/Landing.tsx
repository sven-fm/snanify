import Link from "next/link";
import { content, type Lang } from "@/lib/content";
import { Logo, Mark, SealAnimated } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

/* --- small shared pieces ---------------------------------------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inscription flex items-center gap-3 text-[0.68rem] text-gold">
      <span className="h-px w-8 bg-gold/50" />
      {children}
    </p>
  );
}

function CTA({
  children,
  variant = "solid",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm transition-all duration-300 whitespace-nowrap";
  const styles =
    variant === "solid"
      ? "bg-gold text-bg font-medium hover:brightness-110 shadow-[0_8px_30px_-12px_var(--gold)] hover:shadow-[0_12px_36px_-10px_var(--gold)] hover:-translate-y-0.5"
      : "border border-line text-ink hover:border-gold hover:text-gold";
  return <span className={`${base} ${styles} ${className}`}>{children}</span>;
}

/* --- the page ---------------------------------------------------- */

export function Landing({ lang }: { lang: Lang }) {
  const t = content[lang];

  return (
    <>
      <div className="grain" aria-hidden="true" />

      {/* ---------------- nav ---------------- */}
      <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link href={lang === "hi" ? "/hi" : "/"} aria-label="Snanify">
            <Logo />
          </Link>

          <div className="hidden items-center gap-8 text-sm text-ink2 lg:flex">
            {(
              [
                ["#rivers", t.nav.rivers],
                ["#how", t.nav.how],
                ["#muhurat", t.nav.muhurat],
                ["#sankalp", t.nav.pricing],
              ] as const
            ).map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="relative transition-colors hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={t.switchHref}
              className="rounded-full border border-line/70 px-3 py-1.5 text-xs text-ink2 transition-colors hover:border-gold hover:text-gold"
            >
              {t.switchLabel}
            </Link>
            <ThemeToggle label={t.themeLabel} />
            <a href="#sankalp" className="hidden sm:block">
              <CTA className="!px-5 !py-2">{t.nav.cta}</CTA>
            </a>
          </div>
        </nav>
      </header>

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
              <p
                className="rise-in inscription inline-flex items-center gap-2.5 rounded-full border border-line/70 bg-bg2/60 px-4 py-1.5 text-[0.62rem] text-ink2"
                style={{ animationDelay: "60ms" }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-teal"
                  style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
                />
                {t.hero.badge}
              </p>

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
                <a href="#how">
                  <CTA variant="ghost">{t.hero.ctaSecondary}</CTA>
                </a>
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

            {/* seal + floating muhurat card */}
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
        <section id="rivers" className="scroll-mt-20 border-t border-line/60 bg-bg2/40">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
            <div className="max-w-2xl">
              <Eyebrow>{t.rivers.eyebrow}</Eyebrow>
              <h2 className="display mt-5 text-4xl sm:text-5xl">{t.rivers.title}</h2>
              <p className="mt-5 text-ink2">{t.rivers.lede}</p>
            </div>

            <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/70 sm:grid-cols-2 lg:grid-cols-3">
              {t.rivers.items.map((r, i) => (
                <li
                  key={r.name}
                  className="group relative bg-bg p-7 transition-colors duration-500 hover:bg-bg3"
                >
                  <span className="inscription absolute top-6 right-6 text-[0.6rem] text-ink2/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Mark className="h-7 w-7 text-ink2 transition-colors duration-500 group-hover:text-gold" />
                  <h3 className="display mt-6 text-2xl text-ink">{r.name}</h3>
                  <p className="mt-1.5 text-sm text-ink2">{r.place}</p>
                  <p className="mt-5 text-xs text-teal italic">{r.note}</p>
                  <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- how ---------------- */}
        <section id="how" className="scroll-mt-20 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
            <div className="max-w-2xl">
              <Eyebrow>{t.how.eyebrow}</Eyebrow>
              <h2 className="display mt-5 text-4xl sm:text-5xl">{t.how.title}</h2>
            </div>

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
          </div>
        </section>

        {/* ---------------- muhurat ---------------- */}
        <section id="muhurat" className="scroll-mt-20 border-t border-line/60 bg-bg2/40">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
            <div className="max-w-2xl">
              <Eyebrow>{t.muhurat.eyebrow}</Eyebrow>
              <h2 className="display mt-5 text-4xl sm:text-5xl">{t.muhurat.title}</h2>
              <p className="mt-5 text-ink2">{t.muhurat.lede}</p>
            </div>

            {/* deliberately a list, not more cards — changes the page's rhythm */}
            <ul className="mt-12 border-t border-line/60">
              {t.muhurat.items.map((m) => (
                <li
                  key={m.t}
                  className="group grid grid-cols-1 items-baseline gap-1 border-b border-line/60 py-6 transition-colors hover:bg-bg3/50 sm:grid-cols-[1fr_auto] sm:gap-8 sm:py-7"
                >
                  <div className="sm:flex sm:items-baseline sm:gap-6">
                    <h3 className="display text-2xl transition-colors group-hover:text-gold sm:min-w-[15rem]">
                      {m.t}
                    </h3>
                    <p className="mt-1 text-sm text-ink2 sm:mt-0">{m.d}</p>
                  </div>
                  <p className="inscription text-[0.66rem] text-ink2">{m.w}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- sankalp / pricing ---------------- */}
        <section id="sankalp" className="scroll-mt-20 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
            <div className="max-w-2xl">
              <Eyebrow>{t.pricing.eyebrow}</Eyebrow>
              <h2 className="display mt-5 text-4xl sm:text-5xl">{t.pricing.title}</h2>
              <p className="mt-5 text-ink2">{t.pricing.lede}</p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {t.pricing.plans.map((p, i) => {
                const featured = i === 1;
                return (
                  <div
                    key={p.name}
                    className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-500 ${
                      featured
                        ? "border-gold/60 bg-bg2 shadow-[0_30px_80px_-40px_var(--gold)] lg:-translate-y-4"
                        : "border-line/70 bg-bg2/40 hover:border-ink2/40"
                    }`}
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
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- closing ---------------- */}
        <section className="relative overflow-hidden border-t border-line/60 bg-bg2/40">
          <div className="halo" aria-hidden="true" />
          <div className="relative mx-auto max-w-3xl px-5 py-28 text-center sm:px-8 sm:py-36">
            <Mark className="mx-auto h-14 w-14 text-ink" />
            <h2 className="display mt-10 text-4xl leading-[1.08] sm:text-6xl">
              {t.closing.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ink2">{t.closing.lede}</p>
            <a href="#sankalp" className="mt-10 inline-block">
              <CTA className="!px-9 !py-4 !text-base">{t.closing.cta}</CTA>
            </a>
          </div>
        </section>
      </main>

      {/* ---------------- footer ---------------- */}
      <footer className="border-t border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
            <div>
              <Logo />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink2">{t.footer.tagline}</p>
            </div>

            {t.footer.cols.map((c) => (
              <div key={c.h}>
                <h3 className="inscription text-[0.62rem] text-ink">{c.h}</h3>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-ink2 transition-colors hover:text-gold">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-line/60 pt-7 text-xs text-ink2 sm:flex-row sm:items-center sm:justify-between">
            <p>{t.footer.made}</p>
            <p>{t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
