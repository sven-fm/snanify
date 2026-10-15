import type { patraPageContent } from "@/content/patra-page";
import type { Lang } from "@/lib/locales";
import type { PatraRecord } from "@/content/patra";
import { ShareButton } from "@/components/patra/ShareButton";
import { PatraSheetViewer } from "@/components/SankalpPatra";
import { LinkButton, SubmitButton } from "@/components/ui";
import Link from "next/link";
import { morningsContent } from "@/content/mornings";
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
 * The sheet for the person who kept it, straight after the morning. In this
 * order and nothing else: the sheet, the send button, their own words, the
 * controls. What the sheet already prints is not printed again underneath
 * it, and where its figures come from is said on /rivers and /faq, not here.
 *
 * Under the sankalp, a short block for what follows: the mornings left, the
 * hour of the next email, the account. The sitting moves on to this page as
 * the mark starts, so this is where the count is actually read. With none
 * left it carries the way to the next pack as the one solid button.
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
  sankalp: string | null;
  isPublic: boolean;
  printable: PatraRecord;
  auto: boolean;
  next: OwnerNext;
}) {
  const m = morningsContent[lang];
  return (
    <main className="mx-auto max-w-xl px-5 py-8 pb-16 sm:px-8 sm:py-14">
      {/* Pulled from the press, then the send button settles under it. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt={alt} width={1080} height={1920} className="pull w-full bg-paper2 p-2 sm:p-3" />

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
        {auto && <p className="mt-4 text-center text-sm text-ink2">{t.homeScreen}</p>}
      </div>

      {sankalp && (
        <section className="warm mt-12 p-5 sm:p-6">
          <h2 className="display text-xl text-ink">{t.yours}</h2>
          <p className="display mt-4 text-[1.5rem] leading-[1.45]">{sankalp}</p>
          <p className="mt-4 text-sm text-ink2">{t.privateNote}</p>
        </section>
      )}

      <section className="mt-14" data-owner-next>
        <h2 className="display text-xl text-ink">{t.next.heading}</h2>
        <p className="mt-4 text-[1.02rem] text-ink">{countLine(m.left, next.credits)}</p>
        {/* The cron writes only to somebody with a morning in hand. */}
        {next.reminderHour && next.credits > 0 && (
          <p className="mt-2 text-sm leading-relaxed text-ink2">
            {t.next.reminder.replace("{hour}", next.reminderHour).replace("{tz}", next.tz)}
          </p>
        )}
        {next.credits < 1 && (
          <LinkButton href={`${localePath(lang, "/begin")}?out=1`} className="mt-5 w-full">
            {m.more}
          </LinkButton>
        )}
        <Link
          href={localePath(lang, "/account")}
          className="impress mt-3 inline-flex min-h-[44px] items-center text-ink underline decoration-rule underline-offset-4 hover:decoration-spot active:text-spot"
        >
          {t.next.account}
        </Link>
      </section>

      <section className="mt-14">
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
        <h3 className="display mt-12 text-xl text-ink">{t.printHeading}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink2">{t.printNote}</p>
        <div className="mt-5">
          <PatraSheetViewer lang={lang} data={printable} />
        </div>
      </section>
    </main>
  );
}
