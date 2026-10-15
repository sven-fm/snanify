import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db, users } from "@/db";
import { remindersOffContent } from "@/content/reminders-off";
import { verifyUnsubscribe } from "@/lib/unsubscribe";
import { LANGS, localePath, type Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LinkButton, SubmitButton } from "@/components/ui";
import { switchOffReminders } from "./actions";

/* ---------------------------------------------------------------------------
   /reminders/off, public, from the link at the foot of a reminder.

   WHY A PAGE AND NOT A ONE-TAP GET. A mail app opens links with no session,
   so the old landing on /account asked a person who wanted fewer emails to
   sign in first. And Outlook's Safe Links, and every scanner like it, fetch
   each link in a message before anybody taps it, so a GET that wrote to the
   database switched people off unasked. Opening this page writes nothing; the
   button does.

   The mail client's own one-click (RFC 8058, List-Unsubscribe-Post) still
   POSTs straight to /api/reminders/off and is answered there, unchanged.

   The signed pair (`u`, `t`) is the whole of the access check, the same HMAC
   the API route verifies. A bad pair is a 404, so the URL says nothing about
   whether an id is real. The page shows the row as it is: on, with the
   button, or off, with the way back to the account. Never indexed, and the
   token never leaves in a Referer.
   --------------------------------------------------------------------------- */

const ROUTE = "/reminders/off";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = remindersOffContent[lang].meta;
  return {
    title: t.title,
    description: t.description,
    robots: { index: false, follow: false },
    referrer: "no-referrer",
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ u?: string; t?: string }>;
}) {
  const [{ lang }, query] = await Promise.all([params, searchParams]);
  const t = remindersOffContent[lang];
  const u = query.u ?? "";
  const token = query.t ?? "";

  if (!verifyUnsubscribe(u, token)) notFound();

  const rows = await db
    .select({ reminderOn: users.reminderOn })
    .from(users)
    .where(eq(users.id, u))
    .limit(1);
  const person = rows[0];
  if (!person) notFound();

  const off = !person.reminderOn;

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath={ROUTE} />

      <main className="mx-auto max-w-md px-5 py-14 sm:py-20">
        <h1 className="display text-[2rem] leading-[1.2]">{off ? t.doneTitle : t.title}</h1>
        <p className="mt-5 text-[1.02rem] leading-[1.75] text-ink2">{off ? t.doneBody : t.body}</p>

        {off ? (
          <LinkButton href={localePath(lang, "/account")} className="mt-8 w-full">
            {t.account}
          </LinkButton>
        ) : (
          <form action={switchOffReminders.bind(null, lang)} className="mt-8">
            <input type="hidden" name="u" value={u} />
            <input type="hidden" name="t" value={token} />
            <SubmitButton className="w-full">{t.cta}</SubmitButton>
          </form>
        )}
      </main>

      <Footer lang={lang} />
    </>
  );
}
