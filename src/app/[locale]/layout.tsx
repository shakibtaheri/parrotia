import type { Metadata } from "next";
import { Fraunces, Inter, Vazirmatn } from "next/font/google";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";

import { notFound } from "next/navigation";

import { ThemeProvider } from "next-themes";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "Parrotia",
  description: "Plant disease and plant health",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocale();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations("Header");

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${vazirmatn.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider>
            <Header />
            <main id="main" className="flex-1" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
