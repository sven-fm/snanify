import { Marcellus, Karla, Tiro_Devanagari_Hindi, Mukta } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { themeScript } from "@/components/ThemeToggle";
import type { Lang } from "@/lib/content";

/* Latin: inscriptional display + a grotesque with some grit in it.
   Devanagari: a real calligraphic pair, never a substituted fallback. */

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

const tiro = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-tiro",
  display: "swap",
});

const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mukta",
  display: "swap",
});

const fontVars = `${marcellus.variable} ${karla.variable} ${tiro.variable} ${mukta.variable}`;

export function RootShell({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} className={fontVars} suppressHydrationWarning>
      {/* Must be a real <head> child: React refuses to hydrate a sync <script>
         placed directly under <html>. The lint rule below points at next/head,
         which is Pages Router only and does not apply here. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        {children}
        {/* Vercel Web Analytics — no cookies, no cross-site identifiers. */}
        <Analytics />
      </body>
    </html>
  );
}
