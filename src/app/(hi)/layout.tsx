import "../globals.css";
import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { content } from "@/lib/content";

const t = content.hi;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.snanify.com"),
  title: t.meta.title,
  description: t.meta.description,
  applicationName: "Snanify",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  alternates: {
    canonical: "/hi",
    languages: { en: "/", hi: "/hi" },
  },
  openGraph: {
    type: "website",
    url: "/hi",
    siteName: "Snanify",
    title: t.meta.title,
    description: t.meta.description,
    locale: "hi_IN",
    alternateLocale: ["en_IN"],
  },
  twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
};

export default function HiLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="hi">{children}</RootShell>;
}
