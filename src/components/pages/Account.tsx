import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { SignOutButton } from "@clerk/nextjs";
import { db, sittings, profiles } from "@/db";
import { accountContent } from "@/content/account";
import { getGhat } from "@/content/rivers";
import { waterName } from "@/content/names";
import { balance } from "@/lib/credits";
import { requireUser } from "@/lib/auth";
import { localePath, type FullLang as Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, LinkButton, SubmitButton } from "@/components/ui";
import { deleteAccount, setReminder } from "@/app/[lang]/(app)/account/actions";

/* ---------------------------------------------------------------------------
   /account, which is the register and nothing else.

   This page is read by somebody who already bought, so it sells nothing. It
   answers four questions in the order they get asked: how many mornings do I
   have left, what have I kept, what goes on my sheet, and when does the river
   reach me.

   The register is the point. One ruled line per morning, newest first, each
   one a link to its own Sankalp Patra. It is the thing that makes eleven
   mornings feel like a practice rather than eleven purchases, so it is set as
   a ledger and not as cards.
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

export async function Account({ lang, misstyped }: { lang: Lang; misstyped?: boolean }) {
  const user = await requireUser(lang, "/account");
  const t = accountContent[lang].account;

  const [credits, kept, profile] = await Promise.all([
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
  ]);

  const setUp = profile[0]?.completedAt != null;

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath="/account" />

      <main className="mx-auto max-w-3xl px-5 py-10 pb-24 sm:px-8 sm:py-16 sm:pb-16">
        <h1 className="display text-[2.1rem] leading-[1.15] sm:text-4xl">{t.title}</h1>
        <div className="rule-double mt-6" />

        {/* ---------------- what is in hand ---------------- */}
        <section className="mt-9 border-2 border-rulestrong p-5 sm:p-6">
          <p className="display text-[1.4rem] leading-[1.3] text-ink">
            {credits === 0
              ? t.creditsZero
              : credits === 1
                ? t.creditsOne
                : t.creditsLine.replace("{n}", String(credits))}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {credits > 0 && (
              <Link href={localePath(lang, setUp ? "/today" : "/setup")} className="block">
                <CTA className="w-full sm:w-auto">{setUp ? t.todayCta : t.setupCta}</CTA>
              </Link>
            )}
            <LinkButton href={localePath(lang, "/begin")} variant="ghost">
              {t.buyCta}
            </LinkButton>
          </div>
        </section>

        {/* ---------------- the register ---------------- */}
        <section className="mt-14">
          <h2 className="display border-b-2 border-rulestrong pb-3 text-xl text-ink">
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
                      className="flex min-h-[52px] items-baseline justify-between gap-4 py-3.5 transition-colors hover:text-spot"
                    >
                      <span className="text-[0.98rem] text-ink2 tabular-nums">
                        {formatKept(s.keptOn, lang)}
                      </span>
                      <span className="text-right text-[0.98rem] text-ink">
                        {ghat ? waterName(ghat, "river", lang) : s.waterSlug}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          )}
        </section>

        {/* ---------------- the sheet, and the hour ---------------- */}
        <section className="mt-14 grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="display border-b border-rule pb-3 text-xl text-ink">{t.profileHeading}</h2>
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
            <h2 className="display border-b border-rule pb-3 text-xl text-ink">{t.reminderHeading}</h2>

            <form action={setReminder.bind(null, lang)} className="mt-4">
              <select
                name="reminderHour"
                defaultValue={String(user.reminderHour)}
                className="min-h-[48px] w-full border border-rule bg-paper px-4 text-[1.02rem] text-ink outline-none focus:border-spot"
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
                  className="h-5 w-5 accent-[var(--color-spot,#b32620)]"
                />
                {t.reminderToggle}
              </label>

              <SubmitButton variant="ghost" className="mt-4 w-full">
                {t.save}
              </SubmitButton>
            </form>
          </div>
        </section>

        {/* ---------------- deleting everything ---------------- */}
        <section className="mt-16 border-t-2 border-rulestrong pt-6">
          <h2 className="display text-xl text-ink">{t.deleteHeading}</h2>
          <p className="mt-4 max-w-lg text-[0.98rem] leading-[1.7] text-ink2">{t.deleteBody}</p>

          <form action={deleteAccount.bind(null, lang)} className="mt-5 max-w-sm">
            <input
              type="text"
              name="confirm"
              autoComplete="off"
              placeholder={t.deletePlaceholder}
              className="min-h-[48px] w-full border border-rule bg-paper px-4 text-[1.02rem] text-ink outline-none focus:border-spot"
            />
            {misstyped && (
              <p className="mt-2 border-l-2 border-spot pl-3 text-sm text-spot">
                {t.deleteMisstyped}
              </p>
            )}
            <SubmitButton variant="ghost" className="mt-3 w-full">
              {t.deleteCta}
            </SubmitButton>
          </form>
        </section>

        <div className="mt-12 border-t border-rule pt-6">
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
