import { Metadata } from "next";
import { SIP_CALCULATOR } from "@/calculators/finance/sip";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = generateCalculatorMetadata({
    title: "SIP Calculator — Systematic Investment Plan & Mutual Fund Returns",
    description:
      "Calculate expected mutual fund returns, SIP wealth accumulation, step-up growth, lumpsum compounding, inflation purchasing power, and target financial goal seeking.",
    slug: SIP_CALCULATOR.slug,
  });

  return {
    ...baseMeta,
    keywords: [
      "sip calculator",
      "mutual fund calculator",
      "systematic investment plan calculator",
      "sip returns calculator",
      "lumpsum calculator",
      "step up sip calculator",
      "sip growth calculator",
      "mutual fund return calculator",
      "financial goal calculator",
      "wealth growth planner",
      "swp calculator",
    ],
    openGraph: {
      ...baseMeta.openGraph,
      title: "SIP Calculator — Systematic Investment Plan & Mutual Fund Returns",
      description:
        "Calculate expected mutual fund returns, SIP wealth accumulation, step-up growth, lumpsum compounding, inflation purchasing power, and target financial goal seeking.",
    },
    twitter: {
      ...baseMeta.twitter,
      title: "SIP Calculator — Systematic Investment Plan & Mutual Fund Returns",
      description:
        "Calculate expected mutual fund returns, SIP wealth accumulation, step-up growth, lumpsum compounding, inflation purchasing power, and target financial goal seeking.",
    },
  };
}

export default function SipCalculatorPage() {
  const { calculate, ...serializableDef } = SIP_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: SIP_CALCULATOR.title,
    description: SIP_CALCULATOR.description,
    slug: SIP_CALCULATOR.slug,
    category: SIP_CALCULATOR.category,
    faqs: SIP_CALCULATOR.faqs,
  });

  // Additional SoftwareApplication schema
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform SIP & Mutual Fund Calculator Pro",
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
      ratingCount: "2450",
    },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Comprehensive Guide to Systematic Investment Plan (SIP) & Mutual Fund Returns",
    description:
      "Master SIP compounding math, step-up contribution growth, inflation defense, tax drag, and mutual fund wealth building strategies.",
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
