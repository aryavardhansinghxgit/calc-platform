import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  isLocalePublished,
  getPublishedLocalesForCalculator,
  PUBLISHED_MATRIX,
} from "@/i18n/publishing";
import { getCalculatorOverlay } from "@/i18n/overlays";
import { getCalculatorLocalizedContent } from "@/i18n/content";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

// Calculator Configurations
import { MORTGAGE_CALCULATOR } from "@/calculators/finance/mortgage";
import { percentage_calculatorConfig } from "@/app/calculators/percentage-calculator/config";
import { bmi_calculatorConfig } from "@/app/calculators/bmi-calculator/config";
import { scientific_calculatorConfig } from "@/app/calculators/scientific-calculator/config";
import { date_calculatorConfig } from "@/app/calculators/date-calculator/config";
import { concrete_calculatorConfig } from "@/app/calculators/concrete-calculator/config";
import { currency_calculatorConfig } from "@/app/calculators/currency-calculator/config";
import { AUTO_LOAN_CONFIG } from "@/app/calculators/auto-loan-calculator/config";
import { ohms_law_calculatorConfig } from "@/app/calculators/ohms-law-calculator/config";
import { SPANISH_MORTGAGE_SEO, SPANISH_MORTGAGE_FAQS } from "@/i18n/content/mortgage/es";

const CONFIG_MAP: Record<string, any> = {
  "mortgage-calculator": MORTGAGE_CALCULATOR,
  "percentage-calculator": percentage_calculatorConfig,
  "bmi-calculator": bmi_calculatorConfig,
  "scientific-calculator": scientific_calculatorConfig,
  "date-calculator": date_calculatorConfig,
  "concrete-calculator": concrete_calculatorConfig,
  "currency-calculator": currency_calculatorConfig,
  "auto-loan-calculator": AUTO_LOAN_CONFIG,
  "ohms-law-calculator": ohms_law_calculatorConfig,
};

interface LocalizedPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const slug of Object.keys(PUBLISHED_MATRIX)) {
    const locales = getPublishedLocalesForCalculator(slug);
    for (const locale of locales) {
      if (locale !== "en") {
        params.push({ locale, slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocalePublished(locale, slug)) {
    notFound();
  }

  const def = CONFIG_MAP[slug];
  if (!def) {
    notFound();
  }

  if (slug === "mortgage-calculator" && locale === "es") {
    return generateCalculatorMetadata({
      title: SPANISH_MORTGAGE_SEO.title,
      description: SPANISH_MORTGAGE_SEO.description,
      slug: "mortgage-calculator",
      category: SPANISH_MORTGAGE_SEO.category,
      keywords: SPANISH_MORTGAGE_SEO.keywords,
      locale: "es",
    });
  }

  const localizedPack = getCalculatorLocalizedContent(slug, locale);
  if (localizedPack) {
    return generateCalculatorMetadata({
      title: localizedPack.seo.title,
      description: localizedPack.seo.description,
      slug,
      category: def.category,
      keywords: localizedPack.seo.keywords,
      locale,
    });
  }

  return generateCalculatorMetadata({
    title: def.title,
    description: def.description,
    slug: def.slug,
    locale,
  });
}

export default async function LocalizedCalculatorPage({ params }: LocalizedPageProps) {
  const { locale, slug } = await params;

  // Strict publishing gatekeeper: Reject any draft or unpublished locale/slug combinations
  if (!isLocalePublished(locale, slug)) {
    notFound();
  }

  const def = CONFIG_MAP[slug];
  if (!def) {
    notFound();
  }

  const { calculate, ContentComponent, ...serializableDef } = def;
  const localizedPack = getCalculatorLocalizedContent(slug, locale);

  let pageTitle = def.title;
  let pageDescription = def.description;
  let pageCategory = def.category;
  let pageFaqs = def.faqs;

  if (slug === "mortgage-calculator" && locale === "es") {
    pageTitle = SPANISH_MORTGAGE_SEO.title;
    pageDescription = SPANISH_MORTGAGE_SEO.description;
    pageCategory = SPANISH_MORTGAGE_SEO.category;
    pageFaqs = SPANISH_MORTGAGE_FAQS;
  } else if (localizedPack) {
    pageTitle = localizedPack.seo.title;
    pageDescription = localizedPack.seo.description;
    pageFaqs = localizedPack.faqs;
  }

  const schemas = generateJsonLdSchema({
    title: pageTitle,
    description: pageDescription,
    slug: def.slug,
    category: pageCategory,
    faqs: pageFaqs,
    locale,
  });

  const localizedDef = {
    ...serializableDef,
    title: pageTitle,
    description: pageDescription,
    faqs: pageFaqs,
  };

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CalculatorLayout definition={localizedDef} locale={locale} />
    </>
  );
}
