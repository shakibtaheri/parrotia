import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function DiseaseStickyNav() {
  const translate = await getTranslations("StickyNav");
  return (
    <div className="max-w-full h-12 bg-forest text-link flex justify-between items-center px-4 md:px-36">
      <div>
        <span>{translate("heading")}</span>
      </div>

      <div className="flex gap-4">
        <Link href="/diseases/powdery-mildew">
          {translate("identification")}
        </Link>
        <Link href="/diseases/powdery-mildew">{translate("diseaseCycle")}</Link>
        <Link href="/diseases/powdery-mildew">{translate("management")}</Link>
        <Link href="/diseases/powdery-mildew">
          {translate("relatedDisease")}
        </Link>
        <Link href="/diseases/powdery-mildew">{translate("Source")}</Link>
      </div>
    </div>
  );
}
