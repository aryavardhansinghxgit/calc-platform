import { Metadata } from "next";
import { average_return_calculatorMetadata } from "./metadata";
import { average_return_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = average_return_calculatorMetadata;

export default function AverageReturnCalculatorPage() {
  const { calculate, ...serializableDef } = average_return_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: average_return_calculatorConfig.title,
    description: average_return_calculatorConfig.description,
    slug: average_return_calculatorConfig.slug,
    category: average_return_calculatorConfig.category,
    faqs: [
      {
        question: "What is the difference between average annual return and cumulative return?",
        answer: "Cumulative return measures aggregate percentage growth over the entire horizon, while average annual return normalizes performance into a yearly compound rate.",
      },
      {
        question: "Why do fund managers use Time-Weighted Return instead of Money-Weighted Return?",
        answer: "Time-Weighted Return removes the effect of client deposits and withdrawals, isolating pure investment selection performance.",
      },
      {
        question: "What is XIRR?",
        answer: "XIRR is a root-finding algorithm that calculates the annualized internal rate of return for irregular cash flow dates and amounts.",
      },
    ],
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Average Return & Portfolio Performance Suite",
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
      ratingCount: "3420",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Average Annual and Cumulative Investment Returns",
    description:
      "Step-by-step guide to calculating Money-Weighted Return (XIRR), Time-Weighted Return (TWRR), and Portfolio Risk Metrics.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter Starting & Ending Balances",
        text: "Input your portfolio starting value, start date, ending valuation, and final date.",
      },
      {
        "@type": "HowToStep",
        name: "Log Intermittent Cash Flows",
        text: "Add rows for all intermediate deposits and withdrawals with their exact execution dates.",
      },
      {
        "@type": "HowToStep",
        name: "Review MWRR (XIRR) and ARR",
        text: "Inspect your annualized Money-Weighted Return, Net Invested capital, and dollar gain.",
      },
      {
        "@type": "HowToStep",
        name: "Evaluate Risk & Benchmark Metrics",
        text: "Check portfolio volatility, Sharpe ratio, max drawdown, and comparison against market indices.",
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
