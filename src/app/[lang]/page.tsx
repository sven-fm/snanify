import { Landing } from "@/components/Landing";
import type { Lang } from "@/lib/content";

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return <Landing lang={lang} />;
}
