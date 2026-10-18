import Link from "next/link";
import { accountContent } from "@/content/account";
import { morningsContent } from "@/content/mornings";
import { countLine } from "@/lib/mornings";
import { localePath, type Lang } from "@/lib/locales";
import { buttonClass, SubmitButton } from "@/components/ui";
import { morningWords } from "@/components/kit";
import { RefHead } from "@/components/site/Reference";
import { ShareButton } from "@/components/patra/ShareButton";
import { deleteAccount, setReminder } from "@/app/[lang]/(app)/account/actions";

/* ---------------------------------------------------------------------------
   /account as it is drawn (spec 6.7), from what Account has already read: no
   database here, so the view renders in a unit test as it does on the page.

   Read by somebody who already bought, so it sells nothing. In one column, at
   390 first, in the order the questions get asked:

    1. the capitals headline, and under it the mornings left in plain words;
    2. the ONE press: the marigold "send today's sheet" when today's sheet
       exists, otherwise a sindoor press to sit (or to choose more, with
       nothing left). Everything else on the page is a quiet link or a field;
    3. the register: one ruled row per morning, newest first, the date, the
       water and the badge's ordinal in small sindoor. The ruled rows are the
       one place hairlines stay, because the dates line up;
    4. what was bought, the same ruled rows;
    5. the names on the sheet, and the hour of the reminder;
    6. deleting everything, under a fold, and signing out.
   --------------------------------------------------------------------------- */

export type RegisterRow = { id: string; day: string; water: string; n: number };
export type PurchaseRow = { id: string; pack: string; day: string; amount: string };
export type TodaySheet = {
  id: string;
  pageUrl: string;
  imageUrl: string;
  text: string;
  waterSlug: string;
};

const QUIET_LINK = `${buttonClass("quiet")} `;

export function AccountView({
  lang,
  credits,
  setUp,
  names,
  rows,
  purchases,
  today,
  reminder,
  misstyped = false,
  remindersOff = false,
  signOut,
}: {
  lang: Lang;
  credits: number;
  setUp: boolean;
  names: string[];
  /** Newest first, already numbered. */
  rows: RegisterRow[];
  purchases: PurchaseRow[];
  /** Today's sheet, when this morning is kept. */
  today: TodaySheet | null;
  reminder: { hour: number; on: boolean; tz: string };
  misstyped?: boolean;
  /** Arrived from the one-tap link in a reminder. */
  remindersOff?: boolean;
  /** The sign-out control: a Clerk button, passed in so the view stays pure. */
  signOut: React.ReactNode;
}) {
  const t = accountContent[lang].account;
  const m = morningsContent[lang];
  const outHref = `${localePath(lang, "/begin")}?out=1`;
  const sitHref = localePath(lang, setUp ? "/today" : "/setup");

  return (
    <main className="overflow-x-clip">
      <RefHead lang={lang} title={t.title} accent={t.accent} plain={countLine(t.left, credits)} />

      <div className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
        {/* ---------------- the one press ---------------- */}
        <div className="max-w-md">
          {today ? (
            <>
              <p className="mb-4 font-bold text-ink">{t.keptToday}</p>
              <ShareButton
                url={today.pageUrl}
                imageUrl={today.imageUrl}
                text={today.text}
                label={t.share}
                copiedLabel={t.shareCopied}
                water={today.waterSlug}
                lang={lang}
              />
              <Link href={localePath(lang, `/p/${today.id}`)} className={buttonClass("quiet", "mt-2")}>
                {t.keptOpen}
              </Link>
            </>
          ) : (
            <Link href={credits === 0 ? outHref : sitHref} className={buttonClass("solid", "w-full")}>
              <span>{credits === 0 ? m.more : setUp ? t.todayCta : t.setupCta}</span>
              <span aria-hidden="true" className="shrink-0">
                →
              </span>
            </Link>
          )}
          {credits > 0 && (
            <div>
              <Link href={`${localePath(lang, "/begin")}?buy=1`} className={buttonClass("quiet", "mt-2")}>
                {t.buyCta}
              </Link>
            </div>
          )}
        </div>

        {/* ---------------- the register ---------------- */}
        <section className="mt-14">
          <h2 className="display text-[1.75rem] leading-[1.15] sm:text-[2.25rem]" style={{ fontWeight: 700 }}>
            {t.registerHeading}
          </h2>

          {rows.length === 0 ? (
            <p className="mt-4 text-[1.0625rem] leading-[1.6] text-ink">{t.registerEmpty}</p>
          ) : (
            <ol className="mt-4 border-b border-rule">
              {rows.map((row) => (
                <li key={row.id} className="border-t border-rule" data-register-row>
                  <Link
                    href={localePath(lang, `/p/${row.id}`)}
                    className="flex min-h-[56px] items-center justify-between gap-4 py-3 active:text-sindoor"
                  >
                    <span className="min-w-0">
                      <span className="block font-bold text-ink">{row.water}</span>
                      <span className="block text-sm text-ink2 tabular-nums">{row.day}</span>
                    </span>
                    <span className="shrink-0 text-right text-sm font-bold text-sindoor tabular-nums">
                      {morningWords(row.n, lang)}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </section>

        {/* ---------------- what was bought ---------------- */}
        {purchases.length > 0 && (
          <section className="mt-14">
            <h2 className="display text-[1.75rem] leading-[1.15] sm:text-[2.25rem]" style={{ fontWeight: 700 }}>
              {t.purchasesHeading}
            </h2>
            <ol className="mt-4 border-b border-rule">
              {purchases.map((p) => (
                <li
                  key={p.id}
                  className="flex min-h-[56px] items-center justify-between gap-4 border-t border-rule py-3"
                  data-purchase
                >
                  <span className="min-w-0">
                    <span className="block font-bold text-ink">{p.pack}</span>
                    <span className="block text-sm text-ink2 tabular-nums">{p.day}</span>
                  </span>
                  <span className="shrink-0 text-right font-bold text-ink tabular-nums">{p.amount}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* ---------------- the sheet, and the hour ---------------- */}
        <section className="mt-14 grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="display text-[1.25rem] leading-[1.3]" style={{ fontWeight: 700 }}>
              {t.profileHeading}
            </h2>
            <p className="mt-3 leading-[1.6] text-ink">{setUp && names.length > 0 ? names.join(", ") : t.profileEmpty}</p>
            <Link href={localePath(lang, "/setup")} className={QUIET_LINK + "mt-1"}>
              {t.profileCta}
            </Link>
          </div>

          <div>
            <h2 className="display text-[1.25rem] leading-[1.3]" style={{ fontWeight: 700 }}>
              {t.reminderHeading}
            </h2>
            {remindersOff && (
              <p role="status" className="mt-3 font-bold text-ink">
                {t.remindersOff}
              </p>
            )}

            <form action={setReminder.bind(null, lang)} className="mt-3">
              <select
                name="reminderHour"
                defaultValue={String(reminder.hour)}
                className="field min-h-[48px] w-full text-[1.0625rem] text-ink"
              >
                {Array.from({ length: 24 }, (_, hour) => (
                  <option key={hour} value={hour}>
                    {String(hour).padStart(2, "0")}:00
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-ink2">{reminder.tz}</p>

              <label className="mt-3 flex min-h-[44px] items-center gap-3 text-ink">
                <input type="checkbox" name="reminderOn" value="1" defaultChecked={reminder.on} />
                {t.reminderToggle}
              </label>

              <SubmitButton variant="quiet" className="mt-1">
                {t.save}
              </SubmitButton>
            </form>
            <a href={localePath(lang, "/account/reminder.ics")} className={QUIET_LINK + "mt-1"}>
              {t.calendar}
            </a>
          </div>
        </section>

        {/* ---------------- deleting everything, under a fold that says so ---------------- */}
        <details className="group mt-16" open={misstyped}>
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-ink active:text-sindoor [&::-webkit-details-marker]:hidden">
            <span className="display text-[1.25rem]" style={{ fontWeight: 700 }}>
              {t.deleteHeading}
            </span>
            <span aria-hidden="true" className="display text-xl text-ink2 group-open:hidden">
              +
            </span>
            <span aria-hidden="true" className="display hidden text-xl text-ink2 group-open:inline">
              −
            </span>
          </summary>
          <section className="settle-panel mt-1" aria-label={t.deleteHeading}>
            {credits > 0 && (
              <p className="mt-3 max-w-lg font-bold leading-[1.6] text-ink">
                {credits === 1 ? t.deleteCreditsOne : t.deleteCredits.replace("{n}", String(credits))}
              </p>
            )}
            <p className="mt-3 max-w-lg leading-[1.6] text-ink2">{t.deleteBody}</p>

            <form action={deleteAccount.bind(null, lang)} className="mt-4 max-w-sm">
              <input
                type="text"
                name="confirm"
                autoComplete="off"
                placeholder={t.deletePlaceholder}
                className="field min-h-[48px] w-full text-[1.0625rem] text-ink"
              />
              {misstyped && <p className="mt-2 text-sm font-bold text-sindoor">{t.deleteMisstyped}</p>}
              <SubmitButton variant="quiet" className="mt-2">
                {t.deleteCta}
              </SubmitButton>
            </form>
          </section>
        </details>

        <div className="mt-10">{signOut}</div>
      </div>
    </main>
  );
}
