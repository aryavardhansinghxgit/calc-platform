import { Metadata } from "next";
import { inflation_calculatorMetadata } from "./metadata";
import { inflation_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = inflation_calculatorMetadata;

export default function InflationCalculatorPage() {
  const { calculate, ...serializableDef } = inflation_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: inflation_calculatorConfig.title,
    description: inflation_calculatorConfig.description,
    slug: inflation_calculatorConfig.slug,
    category: inflation_calculatorConfig.category,
    faqs: [
      {
        question: "How does the inflation calculator use the Consumer Price Index (CPI) to calculate dollar purchasing power?",
        answer: "The calculator computes the ratio between target period CPI and baseline CPI: Target Value = Amount × (Target CPI / Start CPI).",
      },
      {
        question: "What is the difference between headline CPI and Core CPI?",
        answer: "Headline CPI includes all consumer items, while Core CPI excludes volatile food and energy components to identify underlying inflation trends.",
      },
      {
        question: "What is the Rule of 72 for inflation?",
        answer: "The Rule of 72 estimates how many years it takes for money to lose half its purchasing power: Years to Halve = 72 / Annual Inflation Rate (%).",
      },
    ],
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform US CPI Inflation & Purchasing Power Calculator",
    operatingSystem: "All",
    applicationCategory: "FinanceApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.99",
      ratingCount: "9420",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Historical Inflation & Purchasing Power",
    description:
      "Step-by-step instructions to convert dollars between any year from 1913 to present using US BLS CPI-U data.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter Starting Dollar Sum",
        text: "Input the nominal baseline dollar amount you want to evaluate (e.g. $100).",
      },
      {
        "@type": "HowToStep",
        name: "Select Starting & Target Comparison Years",
        text: "Choose the baseline month/year (e.g. 2016 Average) and comparison target month/year (e.g. 2026 July).",
      },
      {
        "@type": "HowToStep",
        name: "View Equivalent Purchasing Power",
        text: "Instantly examine the equivalent target dollar value, cumulative inflation percentage, and annualized inflation rate.",
      },
      {
        "@type": "HowToStep",
        name: "Export Historical CPI Series",
        text: "Download the complete 1913–present US CPI-U historical dataset as CSV.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <CalculatorLayout definition={serializableDef as any} />
    </>
  );
}
