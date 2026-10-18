import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { RefClose, RefHead, W700 } from "@/components/site/Reference";
import type { Lang } from "@/lib/locales";
import { ctaHref } from "@/lib/nav";
import { ABOUT_ROUTE, aboutContent, FOUNDERS, type Founder } from "@/content/about";
import { ETHICS_MAIL } from "@/content/trust";

/**
 * /about, the two people behind the site.
 *
 * Set as the FAQ is set: the capitals headline, then one prose column of
 * sections set apart by space, at 38rem and 1.75. Each founder is a block of their own: an
 * optional square portrait on a plate, the name in the display face, a role
 * line, four or five short sentences, and their links as a short list.
 *
 * MOBILE FIRST. One column at 390px; the portrait sits above the name on a
 * phone and beside the text from `sm` up. The one press closes the page.
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
          <h3 className="display text-[1.5rem] leading-[1.2] text-ink sm:text-[1.8rem]" style={W700}>{f.name}</h3>
          <p className="mt-1 text-sm text-ink2">{f.role}</p>
          <p className="mt-5 max-w-[38rem] text-[1rem] leading-[1.75] text-ink2">{f.bio.join(" ")}</p>
        </div>
      </div>

      <ul className="mt-6">
        {f.links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              rel="noopener"
              className="flex min-h-[44px] items-center justify-between gap-4 py-2 text-[0.98rem] font-bold text-ink active:text-sindoor"
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

      <main>
        <RefHead lang={lang} title={t.head.title} accent={t.head.accent} plain={t.lede} />

        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="max-w-[38rem] pb-12 sm:pb-20">
            {/* ---------------- why ---------------- */}
            <section id="why" className="scroll-mt-20">
              <h2 className="display text-[1.5rem] leading-tight text-ink sm:text-[1.8rem]" style={W700}>
                {t.why.title}
              </h2>
              {t.why.body.map((p) => (
                <p key={p} className="mt-5 text-[1rem] leading-[1.75] text-ink2">
                  {p}
                </p>
              ))}
            </section>

            {/* ---------------- the founders ---------------- */}
            <section id="founders" className="mt-16 scroll-mt-20 sm:mt-20">
              <h2 className="display text-[1.5rem] leading-tight text-ink sm:text-[1.8rem]" style={W700}>
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
              <h2 className="display text-[1.5rem] leading-tight text-ink sm:text-[1.8rem]" style={W700}>
                {t.write.title}
              </h2>
              <p className="mt-5 max-w-[38rem] text-[1rem] leading-[1.75] text-ink2">{t.write.body}</p>
              <p className="mt-6">
                <a
                  href={`mailto:${ETHICS_MAIL}`}
                  className="inline-flex min-h-[44px] flex-wrap items-center gap-x-3 gap-y-1 border-b-2 border-sindoor pb-1 text-[1.02rem] font-bold text-sindoor active:text-ink"
                >
                  <span>{t.write.mailLabel}</span>
                  <span className="break-all text-ink2">{ETHICS_MAIL}</span>
                </a>
              </p>
            </section>
          </div>
        </div>

        <RefClose title={t.closing.title} body={t.closing.body} label={t.closing.cta} href={begin} />
      </main>

      <Footer lang={lang} />

    </>
  );
}
