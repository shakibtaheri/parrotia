import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { ChevronIcon } from "@/components/icons";

type BreadcrumbProps = {
  currentLabel: string;
};

export default async function Breadcrumb({ currentLabel }: BreadcrumbProps) {
  const t = await getTranslations("DiseaseDetail");

  const links = [
    { href: "/", label: t("home") },
    { href: "/diseases", label: t("diseases") },
  ] as const;

  return (
    <nav aria-label={t("breadcrumbLabel")} className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {links.map((path) => (
          <li className="flex items-center gap-2" key={path.href}>
            <Link href={path.href} className="transition-colors hover:text-ink">
              {path.label}
            </Link>
            <span>
              <ChevronIcon className=" h-4 w-4 shrink-0" aria-hidden="true" />
            </span>
          </li>
        ))}

        <li className="text-ink">
          <span aria-current="page">{currentLabel}</span>
        </li>
      </ol>
    </nav>
  );
}
