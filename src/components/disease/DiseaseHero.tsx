import { getFormatter, getTranslations } from "next-intl/server";

import { CheckIcon } from "@/components/icons";
import { pick } from "@/lib/localize";
import type { Disease, Locale } from "@/lib/types";

type DiseaseHeroProps = {
  disease: Disease;
  locale: Locale;
};

export default async function DiseaseHero({
  disease,
  locale,
}: DiseaseHeroProps) {
  const t = await getTranslations("DiseaseDetail");
  const format = await getFormatter();
  const updatedDate = format.dateTime(new Date(disease.updatedAt), {
    dateStyle: "long",
  });

  return (
    <header className="mt-8 space-y-4 md:space-y-6">
      <div className="flex items-center gap-2">
        <span
          className="size-1.5 shrink-0 rounded-full bg-forest"
          aria-hidden="true"
        />
        <span className="text-xs font-semibold uppercase tracking-widest rtl:tracking-normal text-forest bg-line p-2 rounded-full">
          {t(`pathogenType.${disease.pathogenType}`)}
        </span>
      </div>

      <h1 className="font-serif text-5xl font-medium leading-none tracking-tight rtl:leading-tight rtl:tracking-normal text-ink md:text-7xl">
        {pick(disease.name, locale)}
      </h1>

      <p className="font-serif text-lg text-forest">
        {t.rich("causedBy", {
          name: disease.pathogenName,
          em: (chunks) => <em>{chunks}</em>,
        })}
      </p>

      <p className="max-w-prose text-base leading-relaxed text-muted">
        {pick(disease.summary, locale)}
      </p>

      <div className="flex items-start gap-3 border-t border-line pt-6 text-sm text-muted">
        <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-forest">
          <CheckIcon className="h-4 w-4 text-white" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <p className="text-ink">
            {t("writtenBy", {
              name: disease.author.name,
              credentials: disease.author.credentials,
            })}
          </p>
          <p>{t("updated", { date: updatedDate })}</p>
        </div>
      </div>
    </header>
  );
}
