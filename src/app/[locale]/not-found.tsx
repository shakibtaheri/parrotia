"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 ps-6 pe-6 text-center">
      <h1 className="text-start text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="text-start text-base">{t("description")}</p>
      <Link
        href="/"
        className="mt-4 rounded bg-forest px-4 py-2 text-sm font-medium text-cream hover:bg-forest/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {t("home")}
      </Link>
    </div>
  );
}