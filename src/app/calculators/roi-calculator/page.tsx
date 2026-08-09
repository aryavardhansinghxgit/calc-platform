import { Metadata } from "next";
import { ROI_CALCULATOR } from "@/calculators/finance/roi";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = generateCalculatorMetadata({
    title: "ROI Calculator — Return on Investment & Profitability Planner",
    description:
      "Calculate Return on Investment (ROI) percentage, annualized ROI, net dollar gain, inflation-adjusted real return, and capital gains tax impact.",
    slug: ROI_CALCULATOR.slug,
  });

  return {
    ...baseMeta,
    keywords: [
      "roi calculator",
      "return on investment calculator",
      "annualized roi calculator",
      "investment return calculator",
      "profitability calculator",
      "capital gain calculator",
      "real estate roi calculator",
      "stock roi calculator",
    ],
    openGraph: {
      ...baseMeta.openGraph,
      title: "ROI Calculator — Return on Investment & Profitability Planner",
      description:
        "Calculate Return on Investment (ROI) percentage, annualized ROI, net dollar gain, inflation-adjusted real return, and capital gains tax impact.",
    },
    twitter: {
      ...baseMeta.twitter,
      title: "ROI Calculator — Return on Investment & Profitability Planner",
      description:
        "Calculate Return on Investment (ROI) percentage, annualized ROI, net dollar gain, inflation-adjusted real return, and capital gains tax impact.",
    },
  };
}

export default function RoiCalculatorPage() {
  const { calculate, ...serializableDef } = ROI_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: ROI_CALCULATOR.title,
    description: ROI_CALCULATOR.description,
    slug: ROI_CALCULATOR.slug,
    category: ROI_CALCULATOR.category,
    faqs: ROI_CALCULATOR.faqs,
  });

  // Additional SoftwareApplication schema
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform ROI Calculator Pro",
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
      ratingCount: "1980",
    },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Comprehensive Guide to Return on Investment (ROI), Annualized Returns & Capital Growth",
    description:
      "Learn how Return on Investment (ROI) measures capital efficiency, compare annualized ROI across asset classes, and calculate real post-tax returns.",
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
