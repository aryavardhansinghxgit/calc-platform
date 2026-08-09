import { Metadata } from "next";
import { SAVINGS_CALCULATOR } from "@/calculators/finance/savings";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = generateCalculatorMetadata({
    title: "Savings Calculator — Compound Savings & Growth Planner",
    description:
      "Calculate how fast your savings will grow with compound interest, growing deposits, tax drag, inflation defense, goal seeking, FIRE planning, and Monte Carlo simulations.",
    slug: SAVINGS_CALCULATOR.slug,
  });

  return {
    ...baseMeta,
    keywords: [
      "savings calculator",
      "compound savings calculator",
      "interest calculator",
      "future savings calculator",
      "monthly savings calculator",
      "annual savings calculator",
      "savings growth calculator",
      "financial planning calculator",
      "retirement savings calculator",
      "FIRE calculator",
      "high yield savings calculator",
    ],
    openGraph: {
      ...baseMeta.openGraph,
      title: "Savings Calculator — Compound Savings & Growth Planner",
      description:
        "Calculate how fast your savings will grow with compound interest, growing deposits, tax drag, inflation defense, goal seeking, FIRE planning, and Monte Carlo simulations.",
    },
    twitter: {
      ...baseMeta.twitter,
      title: "Savings Calculator — Compound Savings & Growth Planner",
      description:
        "Calculate how fast your savings will grow with compound interest, growing deposits, tax drag, inflation defense, goal seeking, FIRE planning, and Monte Carlo simulations.",
    },
  };
}

export default function SavingsCalculatorPage() {
  const { calculate, ...serializableDef } = SAVINGS_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: SAVINGS_CALCULATOR.title,
    description: SAVINGS_CALCULATOR.description,
    slug: SAVINGS_CALCULATOR.slug,
    category: SAVINGS_CALCULATOR.category,
    faqs: SAVINGS_CALCULATOR.faqs,
  });

  // Additional SoftwareApplication schema for Financial Calculator
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Savings Calculator Pro",
    operatingSystem: "All",
    applicationCategory: "FinanceApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.95",
      ratingCount: "1280",
    },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Comprehensive Guide to Compound Savings and Wealth Growth",
    description: "Learn how compound interest, recurring contribution escalation, tax drag, and inflation affect your long-term savings projections.",
    author: {
      "@type": "Organization",
      name: "CalcPlatform Financial Team",
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
