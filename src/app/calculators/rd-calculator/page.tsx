import { Metadata } from "next";
import { RD_CALCULATOR } from "@/calculators/finance/rd";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = generateCalculatorMetadata({
    title: "RD Calculator — Recurring Deposit Interest & Maturity Planner",
    description:
      "Calculate guaranteed Recurring Deposit (RD) total maturity value, quarterly compounding interest, step-up deposit growth, senior citizen rate bonuses, and TDS tax deductions.",
    slug: RD_CALCULATOR.slug,
  });

  return {
    ...baseMeta,
    keywords: [
      "rd calculator",
      "recurring deposit calculator",
      "bank rd calculator",
      "monthly deposit calculator",
      "post office rd calculator",
      "senior citizen rd calculator",
      "step up rd calculator",
      "rd interest calculator",
      "tds calculator rd",
      "rd maturity calculator",
    ],
    openGraph: {
      ...baseMeta.openGraph,
      title: "RD Calculator — Recurring Deposit Interest & Maturity Planner",
      description:
        "Calculate guaranteed Recurring Deposit (RD) total maturity value, quarterly compounding interest, step-up deposit growth, senior citizen rate bonuses, and TDS tax deductions.",
    },
    twitter: {
      ...baseMeta.twitter,
      title: "RD Calculator — Recurring Deposit Interest & Maturity Planner",
      description:
        "Calculate guaranteed Recurring Deposit (RD) total maturity value, quarterly compounding interest, step-up deposit growth, senior citizen rate bonuses, and TDS tax deductions.",
    },
  };
}

export default function RdCalculatorPage() {
  const { calculate, ...serializableDef } = RD_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: RD_CALCULATOR.title,
    description: RD_CALCULATOR.description,
    slug: RD_CALCULATOR.slug,
    category: RD_CALCULATOR.category,
    faqs: RD_CALCULATOR.faqs,
  });

  // Additional SoftwareApplication schema
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Recurring Deposit Calculator Pro",
    operatingSystem: "All",
    applicationCategory: "FinanceApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.96",
      ratingCount: "1620",
    },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Comprehensive Guide to Recurring Deposit (RD) Interest Rates, TDS & Monthly Savings",
    description:
      "Learn how Recurring Deposit quarterly compounding works, calculate monthly installment growth, compare commercial bank rates, and optimize TDS deductions with Form 15G/15H.",
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
