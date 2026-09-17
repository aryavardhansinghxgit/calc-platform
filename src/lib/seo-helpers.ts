/**
 * SEO & Structured Data (JSON-LD) Helper Module.
 * Automatically generates Page Title, Meta Description, Canonical URL, OpenGraph,
 * Twitter Cards, JSON-LD SoftwareApplication, FAQ Schema, and Breadcrumb Schema.
 * Full multilingual and hreflang support with strict publication gating.
 */

import { getPublishedLocalesForCalculator } from "@/i18n/publishing";

export interface CalculatorSeoProps {
  title: string;
  description: string;
  slug: string;
  category?: string;
  baseUrl?: string;
  keywords?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  locale?: string;
}

const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://calcplatform.com";

/**
 * Computes canonical URL for a given slug and locale.
 * English route is root canonical: /calculators/[slug]
 * Non-English routes are: /[locale]/calculators/[slug]
 */
export function getCalculatorCanonicalUrl(slug: string, locale?: string, baseUrl: string = DEFAULT_BASE_URL): string {
  if (!locale || locale === "en") {
    return `${baseUrl}/calculators/${slug}`;
  }
  return `${baseUrl}/${locale}/calculators/${slug}`;
}

export function generateCalculatorMetadata({
  title,
  description,
  slug,
  keywords,
  baseUrl = DEFAULT_BASE_URL,
  locale = "en",
}: CalculatorSeoProps) {
  const canonicalUrl = getCalculatorCanonicalUrl(slug, locale, baseUrl);
  const publishedLocales = getPublishedLocalesForCalculator(slug);

  const languageAlternates: Record<string, string> = {};
  publishedLocales.forEach((loc) => {
    languageAlternates[loc] = getCalculatorCanonicalUrl(slug, loc, baseUrl);
  });
  languageAlternates["x-default"] = getCalculatorCanonicalUrl(slug, "en", baseUrl);

  return {
    title: `${title} - Free Online Calculator | CalcPlatform`,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    openGraph: {
      title: `${title} | CalcPlatform`,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: `${baseUrl}/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | CalcPlatform`,
      description,
    },
  };
}

export function generateJsonLdSchema({
  title,
  description,
  slug,
  category = "Calculators",
  baseUrl = DEFAULT_BASE_URL,
  faqs = [],
  locale = "en",
}: CalculatorSeoProps) {
  const canonicalUrl = getCalculatorCanonicalUrl(slug, locale, baseUrl);
  const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
  const categoryUrl = !locale || locale === "en"
    ? `${baseUrl}/category/${categorySlug}`
    : `${baseUrl}/${locale}/category/${categorySlug}`;
  const homeUrl = !locale || locale === "en" ? baseUrl : `${baseUrl}/${locale}`;

  const isSpanish = locale === "es";
  const homeName = isSpanish ? "Inicio" : "Home";
  
  const getCategoryName = (cat: string, loc: string) => {
    if (loc === "es") {
      const lower = cat.toLowerCase();
      if (lower.includes("math")) return "Calculadoras de Matemáticas";
      if (lower.includes("health") || lower.includes("fitness")) return "Calculadoras de Salud";
      if (lower.includes("date") || lower.includes("time")) return "Calculadoras de Fecha y Hora";
      if (lower.includes("finance")) return "Calculadoras Financieras";
      return `Calculadoras de ${cat}`;
    }
    return `${cat} Calculators`;
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeName,
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: getCategoryName(category, locale),
        item: categoryUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: canonicalUrl,
      },
    ],
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description: description,
    url: canonicalUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return [breadcrumbSchema, calculatorSchema, faqSchema].filter(Boolean);
}
