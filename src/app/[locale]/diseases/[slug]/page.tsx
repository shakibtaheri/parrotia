import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";
import { getAllDiseases, getDiseaseBySlug } from "@/lib/diseases";
import { pick } from "@/lib/localize";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllDiseases().map((d) => ({ locale, slug: d.slug })),
  );
}

export default async function DiseaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const disease = getDiseaseBySlug(slug);
  if (!disease) notFound();

  // console.log("locale:", locale, "slug:", slug, "routing:", routing);
  return <h1>{pick(disease.name, locale)}</h1>;
}
