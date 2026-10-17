"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { errorContent } from "@/content/error";
import { DEFAULT_LANG, localePath, parseLang } from "@/lib/locales";
import { Mark } from "@/components/Logo";
import { LinkButton, buttonClass } from "@/components/ui";

/* ---------------------------------------------------------------------------
   A page that threw, caught inside the site's own shell.

   The masthead's fonts, the theme and the paper stay; only the page is
   replaced. The locale comes from the URL through useParams, because an error
   boundary is a client component and gets no `params` of its own. `reset`
   renders the segment again, which clears a passing fault (a cold database, a
   dropped connection) without a full reload. The digest is the server's id for
   the failure, printed small so a letter to us can name it.
   --------------------------------------------------------------------------- */

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams<{ lang?: string }>();
  const lang = parseLang(params?.lang ?? "") ?? DEFAULT_LANG;
  const t = errorContent[lang];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <main className="relative grid min-h-screen place-items-center overflow-hidden px-5">
        <div className="relative max-w-md text-center">
          <Mark className="mx-auto h-16 w-16 text-ink" />
          <p className="mt-10 text-sm text-ink2">{t.code}</p>
          <h1 className="display mt-4 text-4xl leading-tight sm:text-5xl">{t.title}</h1>
          <p className="mt-5 text-sm leading-relaxed text-ink2">{t.lede}</p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <button type="button" onClick={() => reset()} className={buttonClass("solid")}>
              {t.retry}
            </button>
            <LinkButton href={localePath(lang, "/")} variant="ghost">
              {t.home}
            </LinkButton>
          </div>
          <a
            href={localePath(lang, "/account")}
            className="impress mt-5 inline-flex min-h-[44px] items-center text-sm text-ink underline decoration-rule underline-offset-4 hover:decoration-sindoor"
          >
            {t.account}
          </a>

          {error.digest && (
            <p className="mt-8 text-xs tabular-nums text-ink2">
              {t.ref} {error.digest}
            </p>
          )}
        </div>
      </main>
    </>
  );
}
