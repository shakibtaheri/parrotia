import type { Locale, Localized } from "./types";

// Returns the text for the locale, falling back to English.
export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] || value.en;
}
