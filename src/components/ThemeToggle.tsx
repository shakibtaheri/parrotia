"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { MoonIcon, SunIcon } from "@/components/icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Header");

  return (
    <button
      type="button"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper transition-colors hover:bg-line "
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={t("toggleTheme")}
    >
      <MoonIcon className="h-5 w-5 dark:hidden" />
      <SunIcon className="h-5 w-5 hidden dark:block" />
    </button>
  );
}
