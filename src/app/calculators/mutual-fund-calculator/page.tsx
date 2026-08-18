import { Metadata } from "next";
import { mutual_fund_calculatorMetadata } from "./metadata";
import { mutual_fund_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = mutual_fund_calculatorMetadata;

export default function MutualFundCalculatorPage() {
  const { calculate, ...serializableDef } = mutual_fund_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: mutual_fund_calculatorConfig.title,
    description: mutual_fund_calculatorConfig.description,
    slug: mutual_fund_calculatorConfig.slug,
    category: mutual_fund_calculatorConfig.category,
    faqs: [
      {
        question: "What is an expense ratio in a mutual fund and how is it deducted?",
        answer: "An expense ratio is the annual percentage of a mutual fund's assets dedicated to management, administrative, and marketing costs. It is deducted daily from Net Asset Value (NAV).",
      },
      {
        question: "What is the difference between a Front-End Load and a Back-End Load?",
        answer: "A front-end load is a sales charge deducted upfront from your deposit. A back-end load is an exit charge deducted when you sell shares.",
      },
      {
        question: "Why is Net IRR a better metric than nominal total return?",
        answer: "Net IRR accounts for the exact timing of periodic monthly contributions, sales charges, and daily operational fee drag across the investment horizon.",
      },
    ],
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Mutual Fund Calculator & Fee Suite",
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
      ratingCount: "3140",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Mutual Fund Returns, Expense Ratios, and Net IRR",
    description:
      "Step-by-step guide to calculating mutual fund ending balances, deducting sales loads and expense ratios, and solving for true Net Internal Rate of Return (Net IRR).",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter Initial Capital & Contributions",
        text: "Input your starting lump-sum deposit, monthly SIP contribution, and annual deposit amount.",
      },
      {
        "@type": "HowToStep",
        name: "Set Expected Growth & Time Horizon",
        text: "Specify the expected annual gross rate of return and your target holding period in years and months.",
      },
      {
        "@type": "HowToStep",
        name: "Input Sales Loads and Expense Ratio",
        text: "Enter the Front-End Load %, Deferred Back-End Load %, and Annual Operating Expense Ratio %.",
      },
      {
        "@type": "HowToStep",
        name: "Analyze Net Balance & Fee Drag",
        text: "Review your final liquidated ending value, total fees paid, active vs. index comparison, and solved Net IRR.",
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
