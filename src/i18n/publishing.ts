import { Locale, LocalePublishingMetadata, SUPPORTED_LOCALES } from "./types";

/**
 * Authoritative Calculator Publication Status Registry.
 * A locale is only accessible/indexable when ALL subsystems
 * (UI overlay, educational content, SEO, FAQs) are 100% complete and verified.
 */
export const PUBLISHED_MATRIX: Record<string, Partial<Record<Locale, boolean>>> = {
  "mortgage-calculator": {
    en: true,
    es: true,
    fr: true,
    de: true,
    hi: true,
    pt: true,
  },
  "amortization-calculator": {
    en: true,
    es: true,
    fr: true,
    de: true,
    hi: true,
    pt: true,
  },
  "percentage-calculator": {
    en: true,
    es: true,
    fr: false,
    de: false,
    hi: false,
    pt: false,
  },
  "bmi-calculator": {
    en: true,
    es: true,
    fr: false,
    de: false,
    hi: false,
    pt: false,
  },
  "scientific-calculator": {
    en: true,
    es: true,
    fr: false,
    de: false,
    hi: false,
    pt: false,
  },
  "date-calculator": {
    en: true,
    es: true,
    fr: false,
    de: false,
    hi: false,
    pt: false,
  },
  "concrete-calculator": {
    en: true,
    es: false,
    fr: false,
    de: false,
    hi: false,
    pt: false,
  },
  "currency-calculator": {
    en: true,
    es: false,
    fr: false,
    de: false,
    hi: false,
    pt: false,
  },
  "auto-loan-calculator": {
    en: true,
    es: false,
    fr: false,
    de: false,
    hi: false,
    pt: false,
  },
  "ohms-law-calculator": {
    en: true,
    es: false,
    fr: false,
    de: false,
    hi: false,
    pt: false,
  },
  "fuel-cost-calculator": {
    en: true,
    es: true,
    fr: true,
    de: false,
    hi: false,
    pt: false,
  },
};

/**
 * Checks if a specific calculator is published in the requested locale.
 * English is always published. Non-English locales are strictly checked.
 */
export function isLocalePublished(locale: string, slug: string = "mortgage-calculator"): boolean {
  if (locale === "en") return true;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return false;
  return Boolean(PUBLISHED_MATRIX[slug]?.[locale as Locale]);
}

/**
 * Returns the list of all published locales for a given calculator.
 */
export function getPublishedLocalesForCalculator(slug: string = "mortgage-calculator"): Locale[] {
  const published: Locale[] = ["en"];
  const matrix = PUBLISHED_MATRIX[slug];
  if (matrix) {
    (Object.keys(matrix) as Locale[]).forEach((loc) => {
      if (loc !== "en" && matrix[loc] && !published.includes(loc)) {
        published.push(loc);
      }
    });
  }
  return published;
}

/**
 * Returns detailed publication metadata for audit and gatekeeping.
 */
export function getLocalePublishingMetadata(
  locale: Locale,
  slug: string = "mortgage-calculator"
): LocalePublishingMetadata {
  const isPublished = isLocalePublished(locale, slug);
  return {
    locale,
    calculatorSlug: slug,
    uiStatus: isPublished ? "PUBLISHED" : "DRAFT",
    contentStatus: isPublished ? "PUBLISHED" : "DRAFT",
    seoStatus: isPublished ? "PUBLISHED" : "DRAFT",
    isPublished,
    publishedAt: isPublished ? "2026-09-17T00:00:00Z" : undefined,
    lastUpdated: new Date().toISOString(),
  };
}
