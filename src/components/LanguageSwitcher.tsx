"use client";

import { Fragment } from "react";
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
  const t = useTranslations("Header");
  // console.log("locale:", locale, "router:", router, "routing:", routing);
  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label={t("language")}
    >
      {routing.locales.map((lang, index) => (
        <Fragment key={lang}>
          {index > 0 && ""}
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
        </Fragment>
      ))}
    </div>
  );
}
