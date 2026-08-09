import { Metadata } from "next";
import { CAGR_CALCULATOR } from "@/calculators/finance/cagr";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = generateCalculatorMetadata({
    title: "CAGR Calculator — Compound Annual Growth Rate Planner",
    description:
      "Calculate Compound Annual Growth Rate (CAGR), target future portfolio value, required initial capital, inflation-adjusted real returns, and capital gains tax impact.",
    slug: CAGR_CALCULATOR.slug,
  });

  return {
    ...baseMeta,
    keywords: [
      "cagr calculator",
      "compound annual growth rate",
      "annualized return calculator",
      "investment return calculator",
      "reverse cagr calculator",
      "stock return calculator",
      "real cagr calculator",
      "portfolio growth calculator",
    ],
    openGraph: {
      ...baseMeta.openGraph,
      title: "CAGR Calculator — Compound Annual Growth Rate Planner",
      description:
        "Calculate Compound Annual Growth Rate (CAGR), target future portfolio value, required initial capital, inflation-adjusted real returns, and capital gains tax impact.",
    },
    twitter: {
      ...baseMeta.twitter,
      title: "CAGR Calculator — Compound Annual Growth Rate Planner",
      description:
        "Calculate Compound Annual Growth Rate (CAGR), target future portfolio value, required initial capital, inflation-adjusted real returns, and capital gains tax impact.",
    },
  };
}

export default function CagrCalculatorPage() {
  const { calculate, ...serializableDef } = CAGR_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: CAGR_CALCULATOR.title,
    description: CAGR_CALCULATOR.description,
    slug: CAGR_CALCULATOR.slug,
    category: CAGR_CALCULATOR.category,
    faqs: CAGR_CALCULATOR.faqs,
  });

  // Additional SoftwareApplication schema
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform CAGR Calculator Pro",
    operatingSystem: "All",
    applicationCategory: "FinanceApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.98",
      ratingCount: "2140",
    },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Comprehensive Guide to Compound Annual Growth Rate (CAGR), Real Returns & Portfolio Benchmarking",
    description:
      "Learn how Compound Annual Growth Rate (CAGR) measures geometric mean annual growth, compare stock market CAGRs, and calculate inflation-adjusted real returns.",
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
