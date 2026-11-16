"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type LanguageSwitcherProps = { labels?: "short" | "long" };

const labelsByStyle = {
  short: { en: "EN", fa: "FA" },
  long: { en: "English", fa: "فارسی" },
} as const;

export default function LanguageSwitcher({
  labels = "short",
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const translate = useTranslations("Header");

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label={translate("language")}
    >
      {routing.locales.map((lang, index) => (
        <div key={index}>
          <button
            type="button"
            lang={lang}
            aria-pressed={locale === lang}
            onClick={() => router.replace(pathname, { locale: lang })}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              locale === lang
                ? "font-semibold text-forest"
                : "font-medium text-muted hover:text-ink"
            }`}
          >
            {labelsByStyle[labels][lang]}
          </button>
        </div>
      ))}
    </div>
  );
}
