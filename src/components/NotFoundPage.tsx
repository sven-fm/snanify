import Link from "next/link";
import { content } from "@/lib/content";
import { localePath, type Lang } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA } from "@/components/ui";
import { Capitals, QUIET } from "@/components/site/Reference";
import { navLabel } from "@/lib/nav";

/**
 * The 404, as a reference page in v3 (spec 6.6): the masthead on its strip,
 * the capitals headline with the ghat in sindoor, one plain sentence, the
 * one press back to the river, and the footer's full river under it.
 */
export function NotFoundPage({ lang }: { lang: Lang }) {
  const t = content[lang].notFound;

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath="/" />
      <main>
        <section>
          <div className="mx-auto max-w-md px-5 pt-8 pb-16 sm:max-w-3xl sm:px-8 sm:pt-14 sm:pb-20">
            <p className="text-sm text-ink2">{t.code}</p>
            <Capitals lang={lang} title={t.head.title} accent={t.head.accent} className="mt-2" />
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.6] text-ink">{t.lede}</p>
            <Link href={localePath(lang, "/")} className="mt-8 flex sm:inline-flex">
              <CTA className="w-full sm:w-auto">{t.cta}</CTA>
            </Link>
            <Link href={localePath(lang, "/rivers")} className={`${QUIET} mt-4`}>
              {navLabel(lang, "rivers")}
            </Link>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
