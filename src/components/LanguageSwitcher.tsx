"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Home");
  const nextLocale = locale === "fa" ? "en" : "fa";

  return (
    <button
      type="button"
      className="rounded-full border border-current ps-4 pe-4 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
    >
      {t("switch")}
    </button>
  );
}
