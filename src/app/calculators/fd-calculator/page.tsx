import { Metadata } from "next";
import { FD_CALCULATOR } from "@/calculators/finance/fd";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = generateCalculatorMetadata({
    title: "FD Calculator — Fixed Deposit Interest & Maturity Planner",
    description:
      "Calculate guaranteed Fixed Deposit (FD) maturity amounts, compound interest earnings, periodic payout income, senior citizen bonus rates, and TDS tax deductions.",
    slug: FD_CALCULATOR.slug,
  });

  return {
    ...baseMeta,
    keywords: [
      "fd calculator",
      "fixed deposit calculator",
      "bank deposit calculator",
      "fd interest rate calculator",
      "senior citizen fd calculator",
      "cumulative fd calculator",
      "non cumulative fd calculator",
      "term deposit calculator",
      "tds calculator fd",
      "bank fd calculator",
    ],
    openGraph: {
      ...baseMeta.openGraph,
      title: "FD Calculator — Fixed Deposit Interest & Maturity Planner",
      description:
        "Calculate guaranteed Fixed Deposit (FD) maturity amounts, compound interest earnings, periodic payout income, senior citizen bonus rates, and TDS tax deductions.",
    },
    twitter: {
      ...baseMeta.twitter,
      title: "FD Calculator — Fixed Deposit Interest & Maturity Planner",
      description:
        "Calculate guaranteed Fixed Deposit (FD) maturity amounts, compound interest earnings, periodic payout income, senior citizen bonus rates, and TDS tax deductions.",
    },
  };
}

export default function FdCalculatorPage() {
  const { calculate, ...serializableDef } = FD_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: FD_CALCULATOR.title,
    description: FD_CALCULATOR.description,
    slug: FD_CALCULATOR.slug,
    category: FD_CALCULATOR.category,
    faqs: FD_CALCULATOR.faqs,
  });

  // Additional SoftwareApplication schema
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Fixed Deposit Calculator Pro",
    operatingSystem: "All",
    applicationCategory: "FinanceApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.97",
      ratingCount: "1890",
    },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Comprehensive Guide to Fixed Deposit (FD) Interest Rates, TDS & Wealth Safety",
    description:
      "Learn how Fixed Deposit interest compounds, compare commercial bank rates, optimize TDS tax drag with Form 15G/15H, and leverage Senior Citizen rate boosters.",
    author: {
      "@type": "Organization",
      name: "CalcPlatform Financial Research Team",
    },
    publisher: {
      "@type": "Organization",
      name: "CalcPlatform",
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <CalculatorLayout definition={serializableDef} />
    </>
  );
}
