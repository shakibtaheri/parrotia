import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { routing } from "@/i18n/routing";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("Home");

  return (
    <main className="flex flex-1 flex-col items-start justify-center gap-6 py-16 ps-6 pe-6">
      <h1 className="text-start text-3xl font-semibold tracking-tight">
        {t("title")}
      </h1>
      <LanguageSwitcher />
    </main>
  );
}
