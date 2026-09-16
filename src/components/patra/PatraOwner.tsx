import type { patraPageContent } from "@/content/patra-page";
import type { FullLang as Lang } from "@/lib/locales";
import type { PatraRecord } from "@/content/patra";
import { ShareButton } from "@/components/patra/ShareButton";
import { PatraSheetViewer } from "@/components/SankalpPatra";
import { SubmitButton } from "@/components/ui";
import { setPatraPublic } from "@/app/[lang]/(app)/p/[id]/actions";

type Copy = (typeof patraPageContent)["en"];

/**
 * The sheet for the person who kept it, straight after the morning. In this
 * order and nothing else: the sheet, the send button, their own words, the
 * controls. What the sheet already prints is not printed again underneath
 * it, and where its figures come from is said on /rivers and /faq, not here.
 */
export function PatraOwner({
  lang,
  t,
  id,
  imageSrc,
  alt,
  pageUrl,
  imageUrl,
  shareText,
  waterSlug,
  sankalp,
  isPublic,
  printable,
  auto,
}: {
  lang: Lang;
  t: Copy;
  id: string;
  imageSrc: string;
  alt: string;
  pageUrl: string;
  imageUrl: string;
  shareText: string;
  waterSlug: string;
  sankalp: string | null;
  isPublic: boolean;
  printable: PatraRecord;
  auto: boolean;
}) {
  return (
    <main className="mx-auto max-w-xl px-5 py-8 pb-16 sm:px-8 sm:py-14">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt={alt} width={1080} height={1920} className="w-full border-2 border-rulestrong" />

      <div className="mt-6">
        <ShareButton
          url={pageUrl}
          imageUrl={imageUrl}
          text={shareText}
          label={t.share}
          copiedLabel={t.shareCopied}
          water={waterSlug}
          lang={lang}
          auto={auto}
        />
      </div>

      {sankalp && (
        <section className="mt-12 border-t-2 border-rulestrong pt-6">
          <h2 className="display text-xl text-ink">{t.yours}</h2>
          <p className="display mt-4 text-[1.5rem] leading-[1.45]">{sankalp}</p>
          <p className="mt-4 text-sm text-ink2">{t.privateNote}</p>
        </section>
      )}

      <section className="mt-12 border-t border-rule pt-6">
        <h2 className="display text-xl text-ink">{t.ownerHeading}</h2>

        {!isPublic && <p className="mt-4 text-[0.98rem] text-ink">{t.privateNow}</p>}

        <form action={setPatraPublic.bind(null, lang, id, !isPublic)} className="mt-4">
          <SubmitButton variant="ghost">{isPublic ? t.makePrivate : t.makePublic}</SubmitButton>
        </form>

        {isPublic && <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink2">{t.privateWarning}</p>}

        {/* The A4 sheet, which carries the sankalp and is meant for paper.
            Its own viewer handles the phone case, where a fixed-ratio
            document rendered into 366 pixels would set body type at about
            six. */}
        <h3 className="display mt-10 border-t border-rule pt-5 text-xl text-ink">{t.printHeading}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink2">{t.printNote}</p>
        <div className="mt-5">
          <PatraSheetViewer lang={lang} data={printable} />
        </div>
      </section>
    </main>
  );
}
