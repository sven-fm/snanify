import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SankalpPatra } from "@/components/SankalpPatra";
import { Eyebrow, LinkButton } from "@/components/ui";
import { patraContent, specimenPatra } from "@/content/patra";
import { content, LANGS, type Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";

/* Public URL shape: English unprefixed, Hindi under /hi. Built through
   localePath so a route rename cannot strand one locale. */
const ROUTE = "/patra/sample";
const PATHS = { en: localePath("en", ROUTE), hi: localePath("hi", ROUTE) } as const;

/* Chrome is dropped when the specimen is printed, so a printed sheet is the
   document and nothing else. Scoped to this page; globals.css is untouched. */
const SAMPLE_PRINT_CSS = `
@media print{
  header, footer, .grain, [data-patra-hide]{ display:none !important; }
  /* The sheet fills the printable width of the page rather than the screen
     column it sits in, so it lands as one A4 page and not one and a bit. */
  [data-patra-page], [data-patra-page] > div{
    max-width:none !important; width:100% !important;
    padding:0 !important; margin:0 !important;
  }
}
`;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = patraContent[lang].sampleMeta;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: PATHS[lang],
      languages: { en: PATHS.en, hi: PATHS.hi },
    },
    openGraph: {
      type: "article",
      url: PATHS[lang],
      siteName: "Snanify",
      title: t.title,
      description: t.description,
      locale: lang === "en" ? "en_IN" : "hi_IN",
      alternateLocale: [lang === "en" ? "hi_IN" : "en_IN"],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = patraContent[lang].sample;
  const nav = content[lang].nav;
  const hero = patraContent[lang].hero;
  const hi = lang === "hi";
  /* The `display` utility sets line-height 0.98, which collides Devanagari
     matras at heading sizes. Inline style, so it wins over the utility. */
  const lead = hi ? { lineHeight: 1.2 } : undefined;
  const leadSm = hi ? { lineHeight: 1.35 } : undefined;

  /* "Sankalp" is a section of the home page, not a route of its own — the
     same anchor the rivers and rituals pages link to. */
  const home = localePath(lang, "/");

  const navLinks = [
    { href: localePath(lang, "/rivers"), label: nav.rivers },
    { href: localePath(lang, "/how-it-works"), label: nav.how },
    { href: localePath(lang, "/patra"), label: hero.eyebrow },
    { href: `${home}#sankalp`, label: nav.pricing },
  ];

  return (
    <>
      <style href="snanify-patra-sample-print" precedence="medium">
        {SAMPLE_PRINT_CSS}
      </style>

      <div className="grain" aria-hidden="true" />
      <Header lang={lang} links={navLinks} currentPath={ROUTE} />

      <main>
        {/* ------------------------------ intro ------------------------------ */}
        <section className="relative overflow-hidden border-b border-line/60" data-patra-hide>
          <div className="halo" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h1 className="display mt-6 text-[2.9rem] leading-[1.02] sm:text-6xl" style={lead}>
                {t.title}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink2">{t.lede}</p>
            </div>

            {/* The provenance of every value on the sheet, stated before it. */}
            <aside className="self-end rounded-2xl border border-sindoor/40 bg-bg2/50 p-7">
              <h2 className="inscription text-[0.62rem] text-sindoor">{t.noticeHeading}</h2>
              <ul className="mt-5 space-y-3">
                {t.noticeItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink2">
                    <span aria-hidden="true" className="mt-3 h-0.5 w-4 shrink-0 rounded-full bg-sindoor/80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* ---------------------------- the sheet ---------------------------- */}
        {/* The sheet keeps A4 proportions and scales as one block, so on a
            phone its type is genuinely small. Said plainly rather than left
            for the reader to discover — and the gutter is narrowed below `sm`
            so the sheet gets every pixel of the screen it can. */}
        <section
          data-patra-page
          className="mx-auto w-full max-w-6xl px-3 py-16 sm:px-8 sm:py-24"
        >
          <p
            className="mx-auto mb-6 max-w-[46rem] px-2 text-center text-xs leading-relaxed text-ink2 sm:hidden"
            data-patra-hide
          >
            {t.smallScreenHint}
          </p>

          <div className="mx-auto w-full max-w-[46rem]">
            <SankalpPatra lang={lang} data={specimenPatra(lang)} watermark />
          </div>
          <p
            className="mx-auto mt-8 max-w-[46rem] px-2 text-center text-xs text-ink2"
            data-patra-hide
          >
            {t.printHint}
          </p>
        </section>

        {/* ------------------------------ notes ------------------------------ */}
        <section className="border-t border-line/60 bg-bg2/40" data-patra-hide>
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
            <h2 className="display max-w-2xl text-3xl sm:text-4xl" style={lead}>
              {t.notesHeading}
            </h2>

            <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {t.notes.map((note) => (
                <div key={note.h} className="border-t border-line/60 pt-6">
                  <h3 className="display text-xl" style={leadSm}>
                    {note.h}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink2">{note.b}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-3">
              <LinkButton href={localePath(lang, "/patra")} variant="ghost">
                {t.back}
              </LinkButton>
              <LinkButton href={localePath(lang, "/verify")} variant="ghost">
                {t.verifyCta}
              </LinkButton>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
