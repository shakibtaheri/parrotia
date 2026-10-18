import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Container from "@/components/Container";
import { routing } from "@/i18n/routing";
import { getAllDiseases } from "@/lib/diseases";
import { pick } from "@/lib/localize";
import type { Locale } from "@/lib/types";

export default async function DiseasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("DiseasesPage");
  const diseases = getAllDiseases();

  return (
    <Container className="py-12 md:py-16">
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {t("title")}
      </h1>
      <ul className="mt-8 space-y-3 text-ink">
        {diseases.map((disease) => (
          <li key={disease.slug} className="text-start text-lg">
            {pick(disease.name, locale as Locale)}
          </li>
        ))}
      </ul>
    </Container>
  );
}
