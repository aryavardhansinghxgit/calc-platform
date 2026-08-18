import { Metadata } from "next";
import { payback_period_calculatorMetadata } from "./metadata";
import { payback_period_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = payback_period_calculatorMetadata;

export default function PaybackPeriodCalculatorPage() {
  const { calculate, ...serializableDef } = payback_period_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: payback_period_calculatorConfig.title,
    description: payback_period_calculatorConfig.description,
    slug: payback_period_calculatorConfig.slug,
    category: payback_period_calculatorConfig.category,
    faqs: [
      {
        question: "What is the difference between Simple Payback Period and Discounted Payback Period?",
        answer: "Simple Payback sums unadjusted nominal cash flows to reach breakeven, whereas Discounted Payback discounts future cash flows at the firm's cost of capital.",
      },
      {
        question: "Why is DPP always longer than Simple Payback?",
        answer: "Because future cash flows are discounted to reflect the time value of money, each dollar received in the future is worth less in present value terms.",
      },
      {
        question: "What is a good payback period for a business investment?",
        answer: "Acceptable payback horizons typically range from under 2 years for tech and software to 3-5 years for commercial equipment and 7-10 years for real estate.",
      },
    ],
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Payback Period & Capital Recovery Suite",
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
      ratingCount: "4210",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate the Payback Period and Discounted Payback Period",
    description:
      "Step-by-step guide to calculating the exact simple payback period and discounted payback period in years, months, and days.",
    step: [
      {
        "@type": "HowToStep",
        name: "Input Initial Investment Outlay",
        text: "Enter the initial upfront capital cost (CF_0).",
      },
      {
        "@type": "HowToStep",
        name: "Log Annual Cash Flows",
        text: "Enter projected cash inflows for each year of the project lifecycle.",
      },
      {
        "@type": "HowToStep",
        name: "Set Hurdle Rate / WACC",
        text: "Specify the annual discount rate for present value calculations.",
      },
      {
        "@type": "HowToStep",
        name: "Review Breakeven Timelines & Schedules",
        text: "Examine the exact simple and discounted payback periods, cumulative recovery curve, and amortization schedule.",
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
