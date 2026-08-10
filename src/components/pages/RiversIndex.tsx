import Link from "next/link";
import { content } from "@/lib/content";
import { localePath, type Lang } from "@/lib/i18n";
import { Mark, SealAnimated } from "@/components/Logo";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, Eyebrow, Section, SectionHeader, StatusBadge } from "@/components/ui";
import { RIVERS, riversIndexContent } from "@/content/rivers";

/* Six strands of water, widest at the front. Every coordinate is an integer
   literal so the server and client serialise the same string. */
function Waterlines({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 260"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable={false}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = 40 + i * 36;
        const dip = 18 + i * 9;
        return (
          <path
            key={i}
            d={`M-40 ${y} Q 300 ${y + dip} 600 ${y} T 1240 ${y}`}
            stroke="var(--teal)"
            strokeWidth="1"
            opacity={0.55 - i * 0.07}
          />
        );
      })}
    </svg>
  );
}

/** A single strand, used as a row rule that reads as water rather than a line. */
function Strand({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 20"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable={false}
    >
      <path
        d="M0 10 Q 100 2 200 10 T 400 10"
        stroke="var(--teal)"
        strokeWidth="1.2"
        opacity="0.55"
      />
    </svg>
  );
}

export function RiversIndex({ lang }: { lang: Lang }) {
  const t = riversIndexContent[lang];
  const nav = content[lang].nav;
  const hi = lang === "hi";
  /* The `display` utility sets line-height 0.98, which collides Devanagari
     matras at hero sizes. Inline style, so it wins over the utility. */
  const lead = hi ? { lineHeight: 1.2 } : undefined;

  const home = localePath(lang, "/");
  const riversHref = localePath(lang, "/rivers");

  /* `home` is "/" or "/hi", so appending the fragment gives /#how and /hi#how. */
  const anchor = (id: string) => `${home}#${id}`;

  const navLinks = [
    { href: riversHref, label: nav.rivers },
    { href: anchor("how"), label: nav.how },
    { href: anchor("muhurat"), label: nav.muhurat },
    { href: anchor("sankalp"), label: nav.pricing },
  ];

  const first = RIVERS[0];
  const rest = RIVERS.slice(1);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} links={navLinks} currentPath="/rivers" />

      <main>
        {/* ------------------------------------------------ hero ------- */}
        <section className="relative overflow-hidden">
          <div className="halo" aria-hidden="true" />
          <Waterlines className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] w-full" />

          <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
            <div className="rise-in" style={{ animationDelay: "60ms" }}>
              <StatusBadge>{t.badge}</StatusBadge>
            </div>

            <h1
              className="rise-in display mt-7 max-w-4xl text-[2.7rem] sm:text-6xl lg:text-[4.6rem]"
              style={{ animationDelay: "150ms", ...lead }}
            >
              {t.title}
            </h1>

            <p
              className="rise-in mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-ink2"
              style={{ animationDelay: "250ms" }}
            >
              {t.lede}
            </p>

            {/* The permission disclosure sits above the fold on purpose. */}
            <div
              className="rise-in mt-12 max-w-3xl border-l-2 border-sindoor/50 pl-6 sm:pl-8"
              style={{ animationDelay: "340ms" }}
            >
              <h2 className="inscription text-[0.64rem] text-sindoor">{t.permission.label}</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink2">{t.permission.body}</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------- the lead water --- */}
        <section className="border-t border-line/60 bg-bg2/40">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
              <div>
                <Eyebrow>{t.lead.label}</Eyebrow>

                <p className="display mt-6 text-6xl text-gold/30 sm:text-7xl">{first.numeral}</p>

                <h2
                  className="display mt-2 text-4xl sm:text-5xl lg:text-6xl"
                  style={lead}
                >
                  {first.river[lang]}
                </h2>

                <p className="mt-4 text-lg text-ink2">
                  {first.ghat[lang]} · {first.city[lang]}, {first.state[lang]}
                </p>

                <p
                  className={`mt-8 max-w-xl text-xl text-teal sm:text-2xl ${hi ? "" : "italic"}`}
                  style={hi ? { lineHeight: 1.5 } : undefined}
                >
                  {first.epithet[lang]}
                </p>

                <p className="mt-6 max-w-xl leading-relaxed text-ink2">{first.standfirst[lang]}</p>

                <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink2">
                  {first.sacred[lang][0]}
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link href={localePath(lang, `/rivers/${first.slug}`)}>
                    <CTA>{t.lead.read}</CTA>
                  </Link>
                  <span className="inscription text-[0.62rem] text-ink2">
                    {t.formLabels[first.form]}
                  </span>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
                <SealAnimated className="mx-auto w-full max-w-[20rem] text-ink" />
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------- the other five -- */}
        <Section id="index">
          <SectionHeader eyebrow={t.index.label} title={t.index.title} lede={t.index.lede} />

          <ul className="mt-14 border-t border-line/60">
            {rest.map((r) => (
              <li key={r.slug}>
                <Link
                  href={localePath(lang, `/rivers/${r.slug}`)}
                  className="group grid grid-cols-1 items-start gap-x-8 gap-y-3 border-b border-line/60 py-8 transition-colors duration-500 hover:bg-bg3/40 md:grid-cols-[3.5rem_1fr_auto] md:py-10"
                >
                  <p className="display text-2xl text-gold/60 transition-colors duration-500 group-hover:text-gold sm:text-3xl">
                    {r.numeral}
                  </p>

                  <div>
                    <h3 className="display text-3xl text-ink sm:text-4xl" style={lead}>
                      {r.river[lang]}
                    </h3>
                    <p className="mt-1.5 text-sm text-ink2">
                      {r.ghat[lang]} · {r.city[lang]}, {r.state[lang]}
                    </p>
                    <p className={`mt-4 max-w-xl text-teal ${hi ? "" : "italic"}`}>
                      {r.epithet[lang]}
                    </p>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink2">
                      {r.standfirst[lang]}
                    </p>
                    <Strand className="mt-5 h-3 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  <div className="flex flex-col items-start gap-2 md:items-end md:text-right">
                    {r.form === "temple-tank" && (
                      <span className="inscription rounded-full border border-sindoor/60 px-3 py-1 text-[0.6rem] text-sindoor">
                        {t.notAGhat}
                      </span>
                    )}
                    <span className="inscription max-w-[11rem] text-[0.62rem] text-ink2">
                      {t.formLabels[r.form]}
                    </span>
                    <span className="inscription mt-1 text-[0.62rem] text-gold">
                      {t.index.read} →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* ----------------------------------------------- choosing ----- */}
        <Section tinted>
          <SectionHeader
            eyebrow={t.choosing.eyebrow}
            title={t.choosing.title}
            lede={t.choosing.lede}
          />

          <dl className="mt-14 border-t border-line/60">
            {t.choosing.rows.map((row) => (
              <div
                key={row.key}
                className="grid gap-3 border-b border-line/60 py-8 md:grid-cols-[15rem_1fr] md:gap-10 md:py-10"
              >
                <dt className="inscription text-[0.66rem] text-gold">{row.label}</dt>
                <dd className="max-w-2xl leading-relaxed text-ink2">{row.body}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ------------------------------------------------ honesty ----- */}
        <Section>
          <SectionHeader eyebrow={t.honesty.eyebrow} title={t.honesty.title} />

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/70 md:grid-cols-2">
            <div className="bg-bg p-8 sm:p-10">
              <h3 className="inscription text-[0.66rem] text-teal">{t.honesty.isLabel}</h3>
              <p className="mt-5 leading-relaxed text-ink2">{t.honesty.isBody}</p>
            </div>
            <div className="bg-bg3/60 p-8 sm:p-10">
              <h3 className="inscription text-[0.66rem] text-sindoor">{t.honesty.isNotLabel}</h3>
              <p className="mt-5 leading-relaxed text-ink2">{t.honesty.isNotBody}</p>
            </div>
          </div>
        </Section>

        {/* ------------------------------------------------ closing ----- */}
        <section className="relative overflow-hidden border-t border-line/60 bg-bg2/40">
          <div className="halo" aria-hidden="true" />
          <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
            <Mark className="mx-auto h-12 w-12 text-ink" />
            <h2 className="display mt-9 text-3xl sm:text-5xl" style={lead}>
              {t.closing.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ink2">{t.closing.lede}</p>
            <a href={anchor("sankalp")} className="mt-10 inline-block">
              <CTA className="!px-9 !py-4 !text-base">{t.closing.cta}</CTA>
            </a>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
