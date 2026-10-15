import Link from "next/link";
import { WaterBand } from "@/components/WaterBand";
import { desc, eq } from "drizzle-orm";
import { SignOutButton } from "@clerk/nextjs";
import { db, sittings, profiles, purchases } from "@/db";
import { accountContent } from "@/content/account";
import { morningsContent } from "@/content/mornings";
import { asTier, formatDay, formatMoney } from "@/lib/mornings";
import { sittingToday } from "@/lib/sitting";
import { getGhat } from "@/content/rivers";
import { waterName } from "@/content/names";
import { balance } from "@/lib/credits";
import { requireUser } from "@/lib/auth";
import { localePath, type Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, LinkButton, SubmitButton } from "@/components/ui";
import { Bindu } from "@/components/marks";
import { deleteAccount, setReminder } from "@/app/[lang]/(app)/account/actions";

/* ---------------------------------------------------------------------------
   /account, which is the register and nothing else.

   This page is read by somebody who already bought, so it sells nothing. It
   answers four questions in the order they get asked: how many mornings do I
   have left, what have I kept, what goes on my sheet, and when does the river
   reach me.

   The register is the point. One ruled line per morning, newest first (the
   one place on the page a rule stays, because the dates line up), each
   one a link to its own Sankalp Patra. It is the thing that makes eleven
   mornings feel like a practice rather than eleven purchases, so it is set as
   a ledger and not as cards.

   What was bought sits under the register, the same ruled rows: the pack, the
   day in the person's own zone, and what it cost in the currency it was paid
   in. With nothing left the way to the next pack becomes the primary button;
   with today already kept, the button to sit becomes the line that says so.
   --------------------------------------------------------------------------- */

function formatKept(keptOn: string, lang: Lang): string {
  const date = new Date(`${keptOn}T00:00:00Z`);
  return new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export async function Account({
  lang,
  misstyped,
  remindersOff,
}: {
  lang: Lang;
  misstyped?: boolean;
  /** Arrived from the one-tap link in a reminder. */
  remindersOff?: boolean;
}) {
  const user = await requireUser(lang, "/account");
  const t = accountContent[lang].account;

  const [credits, kept, profile, bought] = await Promise.all([
    balance(db, user.id),
    db
      .select({
        id: sittings.id,
        keptOn: sittings.keptOn,
        waterSlug: sittings.waterSlug,
      })
      .from(sittings)
      .where(eq(sittings.userId, user.id))
      .orderBy(desc(sittings.keptAt))
      .limit(100),
    db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1),
    db
      .select({
        id: purchases.id,
        pack: purchases.pack,
        credits: purchases.credits,
        currency: purchases.currency,
        amountMinor: purchases.amountMinor,
        createdAt: purchases.createdAt,
      })
      .from(purchases)
      .where(eq(purchases.userId, user.id))
      .orderBy(desc(purchases.createdAt))
      .limit(100),
  ]);

  const setUp = profile[0]?.completedAt != null;
  const keptToday = setUp && profile[0] ? await sittingToday(user.id, profile[0].waterSlug, user.tz) : null;
  const m = morningsContent[lang];
  const locale = lang === "hi" ? "hi-IN" : "en-IN";
  const outHref = `${localePath(lang, "/begin")}?out=1`;

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath="/account" />

      <main className="mx-auto max-w-3xl px-5 py-10 pb-24 sm:px-8 sm:py-16 sm:pb-16">
        <h1 className="display text-[2.1rem] leading-[1.15] sm:text-4xl">{t.title}</h1>
        <WaterBand seed="account" className="mt-5 h-[68px] w-full" />

        {/* ---------------- what is in hand ---------------- */}
        <section className="warm mt-9 p-5 sm:p-6">
          <p className="display text-[1.4rem] leading-[1.3] text-ink">
            {credits === 0
              ? t.creditsZero
              : credits === 1
                ? t.creditsOne
                : t.creditsLine.replace("{n}", String(credits))}
          </p>

          {keptToday && (
            <p className="mt-4 flex items-center gap-2.5 text-[0.98rem] text-ink" data-kept-today>
              <Bindu className="shrink-0 text-[1rem]" />
              {t.keptToday}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {credits === 0 ? (
              <LinkButton href={outHref}>{m.more}</LinkButton>
            ) : keptToday ? (
              <LinkButton href={localePath(lang, `/p/${keptToday.id}`)} variant="ghost">
                {t.keptOpen}
              </LinkButton>
            ) : (
              <Link href={localePath(lang, setUp ? "/today" : "/setup")} className="block">
                <CTA className="w-full sm:w-auto">{setUp ? t.todayCta : t.setupCta}</CTA>
              </Link>
            )}
            {credits > 0 && (
              <LinkButton href={localePath(lang, "/begin")} variant="ghost">
                {t.buyCta}
              </LinkButton>
            )}
          </div>
        </section>

        {/* ---------------- the register ---------------- */}
        <section className="mt-14">
          <h2 className="display pb-2 text-xl text-ink">
            {t.registerHeading}
          </h2>

          {kept.length === 0 ? (
            <p className="mt-5 text-[1.02rem] leading-[1.75] text-ink2">{t.registerEmpty}</p>
          ) : (
            <ol className="mt-1">
              {kept.map((s) => {
                const ghat = getGhat(s.waterSlug);
                return (
                  <li key={s.id} className="border-b border-rule">
                    <Link
                      href={localePath(lang, `/p/${s.id}`)}
                      className="impress flex min-h-[52px] items-baseline justify-between gap-4 py-3.5 hover:text-spot active:text-spot"
                    >
                      <span className="text-[0.98rem] text-ink2 tabular-nums">
                        {formatKept(s.keptOn, lang)}
                      </span>
                      <span className="flex items-baseline gap-3 text-right text-[0.98rem] text-ink">
                        {ghat ? waterName(ghat, "river", lang) : s.waterSlug}
                        <span aria-hidden="true" className="text-spot">→</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          )}
        </section>

        {/* ---------------- what was bought ---------------- */}
        {bought.length > 0 && (
          <section className="mt-14">
            <h2 className="display pb-2 text-xl text-ink">
              {t.purchasesHeading}
            </h2>
            <ol className="mt-1">
              {bought.map((p) => {
                const tier = asTier(p.pack);
                return (
                  <li
                    key={p.id}
                    className="flex min-h-[52px] items-baseline justify-between gap-4 border-b border-rule py-3.5"
                    data-purchase
                  >
                    <span className="min-w-0">
                      <span className="block text-[0.98rem] text-ink">
                        {tier ? m.pack[tier] : String(p.credits)}
                      </span>
                      <span className="mt-0.5 block text-sm text-ink2 tabular-nums">
                        {formatDay(p.createdAt, user.tz, locale)}
                      </span>
                    </span>
                    <span className="shrink-0 text-right text-[0.98rem] text-ink tabular-nums">
                      {formatMoney(p.amountMinor, p.currency, "en-IN")}
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        {/* ---------------- the sheet, and the hour ---------------- */}
        <section className="mt-14 grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="display text-xl text-ink">{t.profileHeading}</h2>
            <p className="mt-4 text-[0.98rem] leading-[1.7] text-ink2">
              {setUp && profile[0]
                ? (profile[0].names as { name: string }[]).map((n) => n.name).join(", ")
                : t.profileEmpty}
            </p>
            <Link
              href={localePath(lang, "/setup")}
              className="mt-4 inline-flex min-h-[44px] items-center text-ink underline decoration-rule underline-offset-4 hover:decoration-spot"
            >
              {t.profileCta}
            </Link>
          </div>

          <div>
            <h2 className="display text-xl text-ink">{t.reminderHeading}</h2>
            {remindersOff && (
              <p className="warm mt-4 px-3 py-2 text-sm text-ink">{t.remindersOff}</p>
            )}

            <form action={setReminder.bind(null, lang)} className="mt-4">
              <select
                name="reminderHour"
                defaultValue={String(user.reminderHour)}
                className="field min-h-[48px] w-full text-[1.02rem] text-ink"
              >
                {Array.from({ length: 24 }, (_, hour) => (
                  <option key={hour} value={hour}>
                    {String(hour).padStart(2, "0")}:00
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-ink2">{user.tz}</p>

              <label className="mt-4 flex min-h-[44px] items-center gap-3 text-[0.98rem] text-ink">
                <input
                  type="checkbox"
                  name="reminderOn"
                  value="1"
                  defaultChecked={user.reminderOn}
                  
                />
                {t.reminderToggle}
              </label>

              <SubmitButton variant="ghost" className="mt-4 w-full">
                {t.save}
              </SubmitButton>
            </form>
            <a
              href={localePath(lang, "/account/reminder.ics")}
              className="impress mt-4 inline-flex min-h-[44px] items-center text-sm text-ink underline decoration-rule underline-offset-4 hover:decoration-spot active:text-spot"
            >
              {t.calendar}
            </a>
          </div>
        </section>

        {/* ---------------- deleting everything, under a fold ---------------- */}
        <details className="group mt-20" open={misstyped}>
          <summary className="impress flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-ink [&::-webkit-details-marker]:hidden">
            <span className="display text-xl">{t.accountHeading}</span>
            <span aria-hidden="true" className="display text-xl text-ink2 group-open:hidden">+</span>
            <span aria-hidden="true" className="display hidden text-xl text-ink2 group-open:inline">−</span>
          </summary>
          <section className="settle-panel mt-6">
          <h2 className="display text-lg text-ink">{t.deleteHeading}</h2>
          {credits > 0 && (
            <p className="tint mt-4 max-w-lg px-4 py-3 text-[0.98rem] leading-[1.7] text-ink">
              {credits === 1 ? t.deleteCreditsOne : t.deleteCredits.replace("{n}", String(credits))}
            </p>
          )}
          <p className="mt-4 max-w-lg text-[0.98rem] leading-[1.7] text-ink2">{t.deleteBody}</p>

          <form action={deleteAccount.bind(null, lang)} className="mt-5 max-w-sm">
            <input
              type="text"
              name="confirm"
              autoComplete="off"
              placeholder={t.deletePlaceholder}
              className="field min-h-[48px] w-full text-[1.02rem] text-ink"
            />
            {misstyped && (
              <p className="mt-2 text-sm font-bold text-spot">
                {t.deleteMisstyped}
              </p>
            )}
            <SubmitButton variant="ghost" className="mt-3 w-full">
              {t.deleteCta}
            </SubmitButton>
          </form>
          </section>
        </details>

        <div className="mt-12">
          <SignOutButton redirectUrl={localePath(lang, "/")}>
            <button
              type="button"
              className="min-h-[44px] text-ink2 underline decoration-rule underline-offset-4 transition-colors hover:text-spot"
            >
              {t.signOut}
            </button>
          </SignOutButton>
        </div>
      </main>

      <Footer lang={lang} />
    </>
  );
}
