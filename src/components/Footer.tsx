import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import Container from "@/components/Container";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { LeafMark } from "@/components/icons";
import { siteConfig } from "@/lib/site";

const exploreLinks = [
  { href: "/diseases", label: "exploreLinks.diseases" },
  { href: "/plants", label: "exploreLinks.plants" },
  { href: "/about", label: "exploreLinks.about" },
] as const;

const columnHeading =
  "mb-3 text-xs font-semibold uppercase tracking-wide text-muted rtl:tracking-normal";
const footerLink = "text-muted transition-colors hover:text-ink";

export default async function Footer() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper text-ink">
      <Container className="py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md text-forest"
            >
              <LeafMark className="h-7 w-7 shrink-0" aria-hidden="true" />
              <span className="font-serif text-2xl font-semibold tracking-tight">
                Parrotia
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">{t("tagline")}</p>
          </div>

          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className={columnHeading}>
              {t("explore")}
            </h2>
            <ul className="space-y-2 text-sm" role="list">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-connect">
            <h2 id="footer-connect" className={columnHeading}>
              {t("connect")}
            </h2>
            <ul className="space-y-2 text-sm" role="list">
              <li>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  {t("connectLinks.github")}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted">{t("rights", { year })}</p>
          <LanguageSwitcher labels="long" />
          <p className="text-xs text-muted">{t("madeWith")}</p>
        </div>
      </Container>
    </footer>
  );
}
