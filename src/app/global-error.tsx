"use client";

import "./globals.css";
import { useParams } from "next/navigation";
import { errorContent } from "@/content/error";
import { DEFAULT_LANG, localeDef, localePath, parseLang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The last catch: the shell itself failed (src/app/[lang]/layout.tsx), so
   this replaces it and brings its own <html> and <body>.

   Plain on purpose. The fonts, the theme script and the pixel all live in the
   shell, and the shell is what broke, so this leans on the stylesheet alone:
   the paper, the ink, one press and one quiet link. The everyday failures
   are caught one level down, by src/app/[lang]/error.tsx, inside the shell.
   --------------------------------------------------------------------------- */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams<{ lang?: string }>();
  const lang = parseLang(params?.lang ?? "") ?? DEFAULT_LANG;
  const def = localeDef(lang);
  const t = errorContent[lang];

  return (
    <html lang={def.tag} dir={def.dir} data-script={def.script}>
      <body className="antialiased">
        <main className="grid min-h-screen place-items-center bg-paper px-5 text-ink">
          <div className="max-w-md text-center">
            <h1 className="display text-4xl leading-tight">{t.title}</h1>
            <p className="mt-5 text-sm leading-relaxed text-ink2">{t.lede}</p>
            <div className="mt-9 flex flex-col items-stretch gap-3">
              <button
                type="button"
                onClick={() => reset()}
                className="press w-full"
              >
                <span>{t.retry}</span>
                <span aria-hidden="true">→</span>
              </button>
              {/* A full load, not a client navigation: the router lives in
                  the shell that just failed. */}
              <a
                href={localePath(lang, "/")}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 font-bold text-ink underline decoration-ink decoration-2 underline-offset-4 active:text-sindoor"
              >
                {t.home}
              </a>
            </div>
            {error.digest && (
              <p className="mt-8 text-xs tabular-nums text-ink2">
                {t.ref} {error.digest}
              </p>
            )}
          </div>
        </main>
      </body>
    </html>
  );
}
