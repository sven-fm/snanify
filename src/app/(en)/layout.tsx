import "../globals.css";
import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { content } from "@/lib/content";

const t = content.en;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.snanify.com"),
  title: t.meta.title,
  description: t.meta.description,
  applicationName: "Snanify",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  alternates: {
    canonical: "/",
    languages: { en: "/", hi: "/hi" },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Snanify",
    title: t.meta.title,
    description: t.meta.description,
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
  },
  twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
