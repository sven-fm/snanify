import { Eczar, Martel_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { themeScript } from "@/components/ThemeToggle";
import type { Lang } from "@/lib/content";

/**
 * Two families, both of which speak Devanagari and Latin natively, so the
 * Hindi and English editions are the same voice rather than two borrowed ones.
 *
 * Eczar (Vaibhav Singh, Indian Type Foundry) is a high-contrast display face
 * designed Devanagari-first. Martel Sans is its text companion.
 */
const eczar = Eczar({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-eczar",
  display: "swap",
});

const martelSans = Martel_Sans({
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-martel-sans",
  display: "swap",
});

const fontVars = `${eczar.variable} ${martelSans.variable}`;

export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
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
        {/* Vercel Web Analytics, no cookies, no cross-site identifiers. */}
        <Analytics />
      </body>
    </html>
  );
}
