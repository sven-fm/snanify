import Link from "next/link";
import type { patraPageContent } from "@/content/patra-page";
import { localePath, type Lang } from "@/lib/locales";

type Copy = (typeof patraPageContent)["en"];

/**
 * The sheet as it arrives in a family group: the sheet, one line saying what
 * it is, and the invitation. Nothing to manage and nothing to verify; the
 * sheet carries its own record line and its own address.
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
    <main className="mx-auto max-w-xl px-5 py-8 pb-16 sm:px-8 sm:py-14">
      {/* The offer first, one line and a button, then the sheet they were sent. */}
      <div className="mb-6 flex flex-col gap-4 border-2 border-rulestrong p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-[0.98rem] leading-[1.6] text-ink">{t.visitTop}</p>
        <Link
          href={localePath(lang, "/begin")}
          className="label impress inline-flex min-h-[48px] shrink-0 items-center justify-center bg-spot px-6 text-paper hover:bg-ink active:bg-ink"
        >
          {t.visitCta}
        </Link>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt={alt} width={1080} height={1920} className="pull w-full border-2 border-rulestrong" />

      <p className="pull mt-6 text-center text-[1.02rem] leading-[1.7] text-ink2" style={{ animationDelay: "320ms" }}>
        {line}
      </p>

      <section className="mt-12 border-t-2 border-rulestrong pt-8 text-center">
        <h2 className="display text-[1.7rem] leading-[1.25]">{t.visitTitle}</h2>
        <p className="mt-4 text-ink2">{t.visitBody}</p>
        <div className="mt-6">
          <Link
            href={localePath(lang, "/begin")}
            className="label impress inline-flex min-h-[56px] items-center justify-center bg-spot px-8 text-paper hover:bg-ink active:bg-ink"
          >
            {t.visitCta}
          </Link>
        </div>
      </section>
    </main>
  );
}
