import type { patraPageContent } from "@/content/patra-page";
import { LinkButton } from "@/components/ui";
import { localePath, type Lang } from "@/lib/locales";

type Copy = (typeof patraPageContent)["en"];

/**
 * The sheet as it arrives in a family group: the sheet, one line saying what
 * it is, and one sindoor press to start their own snan. The page holds the
 * shared image only, which has never carried anybody's sankalp.
 */
export function PatraGuest({
  lang,
  t,
  imageSrc,
  alt,
  line,
}: {
  lang: Lang;
  t: Copy;
  imageSrc: string;
  alt: string;
  line: string;
}) {
  return (
    <main className="mx-auto max-w-xl px-4 py-6 pb-16 sm:px-8 sm:py-14">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt={alt} width={1080} height={1920} className="pull block w-full bg-paper2" />

      <p className="pull mt-5 text-center text-[1rem] leading-[1.6] text-ink2" style={{ animationDelay: "320ms" }}>
        {line}
      </p>

      <section className="mt-12 text-center">
        <h2 className="display text-[1.7rem] leading-[1.2]">{t.visitTitle}</h2>
        <p className="mt-3 text-ink2">{t.visitBody}</p>
        <LinkButton href={localePath(lang, "/begin")} className="mt-6 w-full sm:w-auto">
          {t.visitCta}
        </LinkButton>
      </section>
    </main>
  );
}
