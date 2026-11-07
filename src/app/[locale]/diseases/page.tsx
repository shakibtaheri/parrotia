import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

import { notFound } from "next/navigation";

import Container from "@/components/Container";

import { getAllDiseases } from "@/lib/diseases";
import { pick } from "@/lib/localize";
import { Link } from "@/i18n/navigation";

export default async function DiseasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations("DiseasesPage");
  const diseases = getAllDiseases();
  // console.log(diseases[0].slug, "powdery-mildew");
  return (
    <Container className="py-12 md:py-16">
      <h1 className="font-serif text-3xl font-semibold tracking-tight rtl:tracking-normal text-ink md:text-4xl">
        {t("title")}
      </h1>
      <Link href={`/diseases/${diseases[0].slug}`}>
        <ul className="mt-8 space-y-3 text-ink">
          {diseases.map((disease) => (
            <li key={disease.slug} className="text-start text-lg">
              {pick(disease.name, locale)}
            </li>
          ))}
        </ul>
      </Link>
    </Container>
  );
}
