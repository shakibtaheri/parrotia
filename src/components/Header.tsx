"use client";

import { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

import Container from "@/components/Container";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ChevronIcon, LeafMark } from "@/components/icons";

const navLinks = [
  { href: "/diseases", label: "nav.diseases" },
  { href: "/plants", label: "nav.plants" },
  { href: "/about", label: "nav.about" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations("Header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const isActivePath = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const closeMenu = () => setIsMenuOpen(false);

  // Escape closes the menu and returns focus to the hamburger button.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper ">
      <Container>
        <div className="flex h-18 items-center justify-between md:h-20.5">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md text-forest"
          >
            <LeafMark
              className="h-7 w-7 shrink-0 md:h-8 md:w-8"
              aria-hidden="true"
            />
            <span className="font-serif text-2xl font-semibold tracking-tight">
              Parrotia
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:block" aria-label={t("mainNavigation")}>
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = isActivePath(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive ? "text-link" : "text-muted hover:text-ink"
                      }`}
                    >
                      {t(link.label)}
                      {isActive && (
                        <span
                          className="absolute inset-x-0 bottom-0 h-0.5 bg-forest"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher labels="short" />
            </div>
            <ThemeToggle />

            <button
              ref={hamburgerRef}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-line md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            >
              <span className="relative block h-5.5 w-6" aria-hidden="true">
                <span
                  className={`absolute inset-x-0 h-0.5 bg-current transition-all duration-200 motion-reduce:transition-none ${
                    isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current transition-opacity duration-200 motion-reduce:transition-none ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 h-0.5 bg-current transition-all duration-200 motion-reduce:transition-none ${
                    isMenuOpen
                      ? "top-1/2 -translate-y-1/2 -rotate-45"
                      : "bottom-1"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        inert={true}
        className={`overflow-hidden border-t border-line transition-all duration-200 motion-reduce:transition-none md:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Container className="py-4">
          <nav aria-label={t("mobileNavigation")}>
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = isActivePath(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={closeMenu}
                      className={`flex items-center justify-between rounded-md px-3 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-forest/5 text-forest"
                          : "text-ink hover:bg-line"
                      }`}
                    >
                      <span>{t(link.label)}</span>
                      {isActive && (
                        <ChevronIcon
                          className="h-5 w-5 shrink-0 text-forest"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-4 border-t border-line pt-4">
            <LanguageSwitcher labels="long" />
          </div>
        </Container>
      </div>
    </header>
  );
}
