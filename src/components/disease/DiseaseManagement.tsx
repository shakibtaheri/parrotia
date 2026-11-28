import { Disease, Locale } from "@/lib/types";
import Container from "../Container";

import { pick } from "@/lib/localize";

import { useTranslations } from "next-intl";
import DiseaseManagementPanel from "./DiseaseManagementPanel";

type DiseaseManagementProps = { disease: Disease; locale: Locale };

export default function DiseaseManagement({
  disease,
  locale,
}: DiseaseManagementProps) {
  const { management } = disease;
  const translate = useTranslations("Management");

  return (
    <section
      id="management"
      aria-labelledby="management-heading"
      className="border-t border-line"
    >
      <Container className="py-16 md:py-24">
        <div className="max-w-3xl">
          <header className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-forest rtl:tracking-normal">
                {translate("eyebrow")}
              </p>
              <h2
                id="management-heading"
                className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink rtl:tracking-normal sm:text-4xl md:text-5xl"
              >
                {translate("heading")}
              </h2>
            </div>
            <span
              aria-hidden="true"
              className="shrink-0 select-none font-serif text-3xl leading-none text-line sm:text-4xl md:text-5xl"
            >
              {translate("sectionNumber")}
            </span>
          </header>
          <p className="mt-8 max-w-prose font-serif text-xl leading-relaxed text-ink md:text-2xl">
            {pick(management.lead, locale)}
          </p>

          <div className="mt-12 md:mt-14">
            <DiseaseManagementPanel disease={disease} locale={locale} />
            <aside
              aria-labelledby="management-warning-heading"
              className="mt-8 rounded-2xl border border-crimson/25 bg-crimson/5 p-6 md:p-8"
            >
              <h3
                id="management-warning-heading"
                className="text-xs font-semibold uppercase tracking-widest text-crimson rtl:tracking-normal"
              >
                {pick(management.warning.title, locale)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink md:text-base">
                {pick(management.warning.text, locale)}
              </p>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
