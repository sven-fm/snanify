import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ChihnaSheetViewer } from "@/components/SankalpPatra";
import { Eyebrow, LinkButton } from "@/components/ui";
import { chihnaContent, specimenChihna } from "@/content/patra";
/* This route exists in English and Hindi only, because the deep content behind
   it does; see the tier note at the top of src/lib/locales.ts. `Lang` here is
   therefore the full-depth pair and not the twelve locales the site serves, and
   `FULL_LANGS` is what narrows the prerender set away from the layout default. */
import { FULL_LANGS, type FullLang as Lang } from "@/lib/locales";
import { localePath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

/* Public URL shape: English unprefixed, Hindi under /hi. Built through
   localePath so a route rename cannot strand one locale. The path stays
   /patra/sample because it is indexed; the sheet on it is the Jal Chihna. */
const ROUTE = "/patra/sample";

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
  return FULL_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = chihnaContent[lang].sampleMeta;

  return pageMetadata({
    lang,
    path: ROUTE,
    title: t.title,
    description: t.description,
    ogType: "article",
  });
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = chihnaContent[lang].sample;
  const hi = lang === "hi";
  /* The `display` utility sets line-height 1.06, which collides Devanagari
     matras at heading sizes. Inline style, so it wins over the utility. */
  const lead = hi ? { lineHeight: 1.2 } : undefined;
  const leadSm = hi ? { lineHeight: 1.35 } : undefined;

  return (
    <>
      <style href="snanify-chihna-sample-print" precedence="medium">
        {SAMPLE_PRINT_CSS}
      </style>

      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath={ROUTE} />

      <main>
        {/* ------------------------------ intro ------------------------------ */}
        <section className="border-b-2 border-rulestrong" data-patra-hide>
          <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pt-12 pb-14 sm:px-8 sm:pt-20 sm:pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h1 className="display mt-5 text-[2.5rem] leading-[1.02] sm:text-6xl" style={lead}>
                {t.title}
              </h1>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.75] text-ink2">{t.lede}</p>
            </div>

            {/* The provenance of every value on the sheet, stated before it. */}
            <aside className="self-end border-2 border-spot p-5 sm:p-7">
              <h2 className="label -mx-5 -mt-5 mb-5 bg-spot px-5 py-2.5 text-paper sm:-mx-7 sm:-mt-7 sm:px-7">
                {t.noticeHeading}
              </h2>
              <ul className="space-y-3">
                {t.noticeItems.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-ink2">
                    <span aria-hidden="true" className="mt-2.5 h-[2px] w-4 shrink-0 bg-spot" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* ---------------------------- the sheet ---------------------------- */}
        {/* The sheet keeps A4 proportions and scales as one block, so on a
            phone its type is genuinely small. The viewer under it is the
            answer: whole sheet, or reading size with the reader panning it,
            controls on the bottom edge where a thumb already is. The gutter is
            narrowed below `sm` so the sheet gets every pixel it can. */}
        <section data-patra-page className="mx-auto w-full max-w-6xl px-3 py-12 sm:px-8 sm:py-20">
          <p
            className="mx-auto mb-6 max-w-[46rem] px-2 text-center leading-relaxed text-ink2 sm:hidden"
            data-patra-hide
          >
            {t.smallScreenHint}
          </p>

          <div className="mx-auto w-full max-w-[46rem]">
            <ChihnaSheetViewer lang={lang} data={specimenChihna(lang)} watermark />
          </div>

          <p
            className="mx-auto mt-8 max-w-[46rem] px-2 text-center text-sm text-ink2"
            data-patra-hide
          >
            {t.printHint}
          </p>
        </section>

        {/* --------------------------- the engraving -------------------------- */}
        <section className="border-t-2 border-rulestrong" data-patra-hide>
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="max-w-3xl border-l-2 border-spot pl-5 sm:pl-6">
              <h2 className="display text-2xl sm:text-3xl" style={leadSm}>
                {t.plateHeading}
              </h2>
              <p className="mt-4 leading-[1.75] text-ink2">{t.plateBody}</p>
            </div>
          </div>
        </section>

        {/* ------------------------------ notes ------------------------------ */}
        <section className="tint border-t-2 border-rulestrong" data-patra-hide>
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <h2 className="display max-w-2xl text-[1.9rem] sm:text-4xl" style={lead}>
              {t.notesHeading}
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {t.notes.map((note) => (
                <div key={note.h} className="border-t-2 border-rulestrong pt-6">
                  <h3 className="display text-xl" style={leadSm}>
                    {note.h}
                  </h3>
                  <p className="mt-3 leading-[1.75] text-ink2">{note.b}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
