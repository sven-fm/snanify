import Link from "next/link";
import { WaterBand } from "@/components/WaterBand";
import { Mark } from "@/components/Logo";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { buttonClass } from "@/components/ui";
import type { Lang } from "@/lib/locales";
import { ctaHref } from "@/lib/nav";
import { ABOUT_ROUTE, aboutContent, FOUNDERS, type Founder } from "@/content/about";
import { ETHICS_MAIL } from "@/content/trust";

/**
 * /about, the two people behind the site.
 *
 * Set as the FAQ is set: a masthead with the water, then one prose column of
 * sections set apart by space. Each founder is a block of their own: an
 * optional square portrait on a plate, the name in the display face, a role
 * line, four or five short sentences, and their links as a short list.
 *
 * MOBILE FIRST. One column at 390px; the portrait sits above the name on a
 * phone and beside the text from `sm` up. The primary action closes the page
 * and rides a thumb rail on phones, as on /faq.
 */

function Portrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="plate relative aspect-square w-32 shrink-0 overflow-hidden sm:w-40">
      <div
        role="img"
        aria-label={alt}
        className="ink-picture absolute inset-0"
        style={{ ["--picture" as string]: `url(${src})` }}
      />
    </div>
  );
}

function FounderBlock({ f }: { f: Founder }) {
  const portrait = FOUNDERS[f.id].portrait;

  return (
    <article id={f.id} className="scroll-mt-20">
      <div className={portrait ? "sm:flex sm:gap-8" : ""}>
        {portrait && (
          <div className="mb-6 sm:mb-0">
            <Portrait src={portrait} alt={f.name} />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="display text-[1.6rem] leading-[1.2] text-ink sm:text-[1.9rem]">{f.name}</h3>
          <p className="mt-1 text-sm text-ink2">{f.role}</p>
          <p className="mt-5 max-w-[38rem] text-[1.02rem] leading-[1.8] text-ink2">{f.bio.join(" ")}</p>
        </div>
      </div>

      <ul className="mt-6">
        {f.links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              rel="noopener"
              className="impress flex min-h-[44px] items-center justify-between gap-4 py-2 text-[0.98rem] text-ink transition-colors hover:text-spot active:text-spot"
            >
              <span>{l.label}</span>
              <span aria-hidden="true" className="text-ink2">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function About({ lang }: { lang: Lang }) {
  const t = aboutContent[lang];
  const begin = ctaHref(lang);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath={ABOUT_ROUTE} />

      {/* The bottom rail is 3.75rem tall on a phone; the page ends above it. */}
      <main className="pb-20 sm:pb-0">
        {/* ---------------- masthead ---------------- */}
        <header>
          <div className="mx-auto max-w-6xl px-5 pt-10 pb-10 sm:px-8 sm:pt-24 sm:pb-20">
            <div className="ink-in max-w-3xl">
              <h1 className="display text-[2.3rem] leading-[1.12] sm:text-6xl">{t.title}</h1>
              <WaterBand seed="about" className="mt-8 h-14 w-full sm:h-16" />
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.8] text-ink2 sm:text-[1.08rem]">
                {t.lede}
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-[44rem] py-12 sm:py-20">
            {/* ---------------- why ---------------- */}
            <section id="why" className="scroll-mt-20">
              <h2 className="display text-[1.5rem] leading-tight text-ink sm:text-[1.8rem]">
                {t.why.title}
              </h2>
              {t.why.body.map((p) => (
                <p key={p} className="mt-5 text-[1.02rem] leading-[1.8] text-ink2">
                  {p}
                </p>
              ))}
            </section>

            {/* ---------------- the founders ---------------- */}
            <section id="founders" className="mt-16 scroll-mt-20 sm:mt-20">
              <h2 className="display text-[1.5rem] leading-tight text-ink sm:text-[1.8rem]">
                {t.founders.title}
              </h2>
              <div className="mt-8 space-y-14">
                {t.founders.people.map((f) => (
                  <FounderBlock key={f.id} f={f} />
                ))}
              </div>
            </section>

            {/* ---------------- write to us ---------------- */}
            <section id="write" className="mt-16 scroll-mt-20 sm:mt-20">
              <h2 className="display text-[1.5rem] leading-tight text-ink sm:text-[1.8rem]">
                {t.write.title}
              </h2>
              <p className="mt-5 max-w-[38rem] text-[1rem] leading-[1.8] text-ink2">{t.write.body}</p>
              <p className="mt-6">
                <a
                  href={`mailto:${ETHICS_MAIL}`}
                  className="inline-flex min-h-[44px] flex-wrap items-center gap-x-3 gap-y-1 border-b-2 border-spot pb-1 text-[1.02rem] text-spot transition-colors hover:border-rulestrong hover:text-ink"
                >
                  <span>{t.write.mailLabel}</span>
                  <span className="break-all text-ink2">{ETHICS_MAIL}</span>
                </a>
              </p>
            </section>
          </div>
        </div>

        {/* ---------------- colophon ---------------- */}
        <section>
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-24">
            <Mark className="mx-auto h-12 w-12 text-ink" />
            <h2 className="display mt-10 text-[1.9rem] leading-[1.2] sm:text-[2.9rem]">{t.closing.title}</h2>
            <p className="mx-auto mt-6 max-w-lg text-[1.05rem] leading-[1.85] text-ink2">{t.closing.body}</p>
            <Link href={begin} className={buttonClass("solid", "mt-9 min-h-[52px] w-full sm:w-auto")}>
              {t.closing.cta}
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={lang} />

      {/* ---------------- thumb rail, phones only ---------------- */}
      <aside aria-label={t.closing.cta} className="fixed inset-x-0 bottom-0 z-40 bg-paper sm:hidden">
        <a href={begin} className="label flex min-h-[3.75rem] items-center justify-center bg-spot px-5 text-paper">
          {t.closing.cta}
        </a>
      </aside>
    </>
  );
}
