import type { patraPageContent } from "@/content/patra-page";
import type { Lang } from "@/lib/locales";
import type { PatraRecord } from "@/content/patra";
import { ShareButton } from "@/components/patra/ShareButton";
import { PrintButton } from "@/components/patra/PrintButton";
import { PatraSheet } from "@/components/SankalpPatra";
import { buttonClass, LinkButton, SubmitButton } from "@/components/ui";
import Link from "next/link";
import { morningsContent } from "@/content/mornings";
import { DOWNLOAD_NAME } from "@/lib/patra-download";
import { countLine } from "@/lib/mornings";
import { localePath } from "@/lib/locales";
import { setPatraPublic } from "@/app/[lang]/p/[id]/actions";

type Copy = (typeof patraPageContent)["en"];

/** What the owner has in hand, for the "next morning" block. */
export type OwnerNext = {
  credits: number;
  /** "05:00", or null when the reminders are off. */
  reminderHour: string | null;
  tz: string;
};

/**
 * The sheet for the person who kept it, straight after the morning. The
 * image they send, and under it the marigold press that sends it with a quiet
 * link to save it; then their next morning, the controls, and their own copy:
 * the same sheet in HTML with their sankalp under the names, ready to print.
 * One press on the page: everything else is a quiet link.
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
  isPublic,
  printable,
  auto,
  next,
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
  isPublic: boolean;
  printable: PatraRecord;
  auto: boolean;
  next: OwnerNext;
}) {
  const m = morningsContent[lang];
  return (
    <main className="mx-auto max-w-xl px-4 py-6 pb-16 sm:px-8 sm:py-14">
      {/* Pulled from the press, then the send button settles under it. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt={alt} width={1080} height={1920} className="pull block w-full bg-paper2" />

      <div className="pull mt-6" style={{ animationDelay: "320ms" }}>
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
        <div className="mt-3 text-center">
          <a href={`${imageSrc}?download=1`} download={DOWNLOAD_NAME} className={buttonClass("quiet")}>
            {t.download}
          </a>
        </div>
        {auto && <p className="mt-3 text-center text-sm text-ink2">{t.homeScreen}</p>}
      </div>

      <section className="mt-14" data-owner-next>
        <h2 className="display text-xl text-ink">{t.next.heading}</h2>
        <p className="mt-4 text-[1.02rem] text-ink">{countLine(m.left, next.credits)}</p>
        {/* The cron writes only to somebody with a morning in hand. */}
        {next.reminderHour && next.credits > 0 && (
          <p className="mt-2 text-sm leading-relaxed text-ink2">
            {t.next.reminder.replace("{hour}", next.reminderHour).replace("{tz}", next.tz)}
          </p>
        )}
        <div className="mt-3 flex flex-col items-start">
          {next.credits < 1 && (
            <LinkButton href={`${localePath(lang, "/begin")}?out=1`} variant="quiet">
              {m.more}
            </LinkButton>
          )}
          <Link href={localePath(lang, "/account")} className={buttonClass("quiet")}>
            {t.next.account}
          </Link>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="display text-xl text-ink">{t.ownerHeading}</h2>

        {!isPublic && <p className="mt-4 text-[0.98rem] text-ink">{t.privateNow}</p>}

        <form action={setPatraPublic.bind(null, lang, id, !isPublic)} className="mt-3">
          <SubmitButton variant="quiet">{isPublic ? t.makePrivate : t.makePublic}</SubmitButton>
        </form>

        {isPublic && <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink2">{t.privateWarning}</p>}
      </section>

      {/* The owner's copy: the same sheet, with their sankalp under the names. */}
      <section className="mt-14">
        <h2 className="display text-xl text-ink">{t.printHeading}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink2">{t.printNote}</p>
        <div className="mt-5">
          <PatraSheet data={printable} />
        </div>
        <div className="mt-3">
          <PrintButton label={t.print} />
        </div>
      </section>
    </main>
  );
}
