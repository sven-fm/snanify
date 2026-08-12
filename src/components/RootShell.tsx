import { Analytics } from "@vercel/analytics/next";
import { themeScript } from "@/components/ThemeToggle";
import { currencyScript } from "@/lib/currency";
import { fontClass } from "@/lib/fonts";
import { localeDef, type Lang } from "@/lib/locales";

/**
 * `data-script` rather than `lang` is what the type layer in globals.css keys
 * off, because Hindi and Marathi share Devanagari and Bengali and Assamese
 * share a script. `lang` still carries the locale, for screen readers,
 * hyphenation and Google.
 */
export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const def = localeDef(lang);

  return (
    <html
      lang={def.tag}
      dir={def.dir}
      data-script={def.script}
      className={fontClass(lang)}
      suppressHydrationWarning
    >
      {/* Must be a real <head> child: React refuses to hydrate a sync <script>
         placed directly under <html>. The lint rule below points at next/head,
         which is Pages Router only and does not apply here. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Stamps data-cur before first paint, so only the reader's own price
            is ever painted. See src/lib/currency.ts. */}
        <script dangerouslySetInnerHTML={{ __html: currencyScript }} />
      </head>
      <body className="antialiased">
        {children}
        {/* Vercel Web Analytics, no cookies, no cross-site identifiers. */}
        <Analytics />
      </body>
    </html>
  );
}
