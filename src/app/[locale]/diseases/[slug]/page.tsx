import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";

import Breadcrumb from "@/components/disease/Breadcrumb";
import DiseaseHero from "@/components/disease/DiseaseHero";
import Container from "@/components/Container";
import { routing } from "@/i18n/routing";
import { getAllDiseases, getDiseaseBySlug } from "@/lib/diseases";
import type { Locale } from "@/lib/types";

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

  return (
    <Container className="py-12 md:py-16">
      <Breadcrumb currentLabel={slug} />
      <div className="mt-8">
        <DiseaseHero disease={disease} locale={locale as Locale} />
      </div>
    </Container>
  );
}
