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
import { CreditsLink } from "@/components/live/CreditsLink";
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
 * The sheet for the person who kept it, straight after the morning. ONE
 * SHEET: the HTML sheet, pulled from the press, with their sankalp standing
 * under it; under that the marigold press that sends the image with quiet
 * links to save it and to print the sheet and the sankalp on one page; then
 * their next morning and the controls. One press on the page: everything
 * else is a quiet link.
 */
export function PatraOwner({
  lang,
  t,
  id,
  imageSrc,
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
      <div className="pull">
        <PatraSheet data={printable} />
      </div>

      <div className="pull mt-8" style={{ animationDelay: "320ms" }}>
        <ShareButton
          url={pageUrl}
          imageUrl={imageUrl}
          text={shareText}
          label={t.share}
          copiedLabel={t.shareCopied}
          water={waterSlug}
          lang={lang}
          auto={auto}
          fetchInView
        />
        <div className="mt-3 flex flex-col items-center">
          <a href={`${imageSrc}?download=1`} download={DOWNLOAD_NAME} className={buttonClass("quiet")}>
            {t.download}
          </a>
          <PrintButton label={t.print} />
        </div>
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

      <p className="mt-10 print:hidden">
        <CreditsLink lang={lang} />
      </p>
    </main>
  );
}
