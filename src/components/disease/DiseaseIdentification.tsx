import Image from "next/image";
import { getTranslations } from "next-intl/server";

import Container from "@/components/Container";
import { ArrowIcon, CheckIcon } from "@/components/icons";

import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/localize";
import type { Disease, Locale } from "@/lib/types";

type DiseaseIdentificationProps = {
  disease: Disease;
  locale: Locale;
};

const severityStyles: Record<Disease["severity"], string> = {
  low: "border-line text-muted",
  moderate: "border-forest/30 text-forest",
  high: "border-crimson/30 text-crimson",
};

export default async function DiseaseIdentification({
  disease,
  locale,
}: DiseaseIdentificationProps) {
  const [translate, tDetail] = await Promise.all([
    getTranslations("DiseaseIdentification"),
    getTranslations("DiseaseDetail"),
  ]);

  const { identification } = disease;
  const listSeparator = locale === "fa" ? "، " : ", ";
  const keySigns = pick(identification.keySigns, locale);
  const caption = identification.image.caption
    ? pick(identification.image.caption, locale)
    : undefined;
  const hosts = pick(disease.hosts, locale).join(listSeparator);
  const plantParts = disease.plantParts
    .map((part) => translate(`plantParts.${part}`))
    .join(listSeparator);

  const quickFacts = [
    {
      label: translate("pathogenType"),
      value: tDetail(`pathogenType.${disease.pathogenType}`),
    },
    { label: translate("commonHosts"), value: hosts },
    {
      label: translate("favorableConditions"),
      value: pick(disease.favorableConditions, locale),
    },
    { label: translate("plantPartsAffected"), value: plantParts },
  ];

  return (
    <section
      id="identification"
      aria-labelledby="identification-heading"
      className="border-t border-line"
    >
      <Container className="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:items-start lg:gap-14 xl:gap-16">
          {/* Main article column */}
          <div className="min-w-0">
            <header className="flex items-start justify-between gap-6 border-b border-line pb-6">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest rtl:tracking-normal">
                  {translate("eyebrow")}
                </p>
                <h2
                  id="identification-heading"
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
              {pick(identification.lead, locale)}
            </p>

            <p className="mt-5 max-w-prose leading-relaxed text-muted">
              {pick(identification.body, locale)}
            </p>

            <aside
              aria-labelledby="diagnostic-note-heading"
              className="mt-8 rounded-2xl bg-soft-green p-6 md:p-8"
            >
              <h3
                id="diagnostic-note-heading"
                className="text-xs font-semibold uppercase tracking-widest text-forest rtl:tracking-normal"
              >
                {translate("diagnosticNote")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink md:text-base">
                {pick(identification.diagnosticNote, locale)}
              </p>
            </aside>

            {/* Image and key signs */}
            <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-start ">
              <figure>
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-line">
                  <Image
                    src={identification.image.src}
                    alt={pick(identification.image.alt, locale)}
                    fill
                    className="object-fill"
                    loading="eager"
                    sizes="(min-width: 1024px) 35vw, (min-width: 768px) 45vw, 100vw"
                  />
                </div>

                <figcaption className="mt-3 flex flex-col gap-1 text-xs text-muted">
                  {caption ? <span>{caption}</span> : null}
                  <a
                    href={identification.image.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit underline-offset-2 hover:text-ink hover:underline"
                  >
                    {tDetail("photoCredit", {
                      author: identification.image.author,
                      license: identification.image.license,
                    })}
                  </a>
                </figcaption>
              </figure>

              <div className="self-center ">
                <h3 className="font-serif text-2xl font-medium tracking-tight text-ink rtl:tracking-normal">
                  {translate("keySigns")}
                </h3>
                <ul className="mt-5 space-y-4" role="list">
                  {keySigns.map((sign) => (
                    <li key={sign} className="flex gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-soft-green text-forest">
                        <CheckIcon className="size-3" aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-relaxed text-ink">
                        {sign}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside
            aria-label={translate("sidebarLabel")}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-1"
          >
            <div className="rounded-2xl border border-line bg-paper p-6">
              <h3 className="font-serif text-xl font-medium tracking-tight text-ink rtl:tracking-normal">
                {translate("quickFacts")}
              </h3>

              <dl className="mt-5 divide-y divide-line">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="py-3 first:pt-0 last:pb-0">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted rtl:tracking-normal">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}

                <div className="py-3 last:pb-0">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted rtl:tracking-normal">
                    {translate("severity")}
                  </dt>
                  <dd className="mt-2">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${severityStyles[disease.severity]}`}
                    >
                      {translate(`severityLevels.${disease.severity}`)}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl bg-forest p-6 text-white dark:bg-forest-deep">
              <h3 className="font-serif text-xl font-medium tracking-tight rtl:tracking-normal">
                {translate("symptomChecker.heading")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                {translate("symptomChecker.body")}
              </p>
              <Link
                href="/diseases"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-white/90 dark:text-forest-deep"
              >
                {translate("symptomChecker.button")}
                <ArrowIcon className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
