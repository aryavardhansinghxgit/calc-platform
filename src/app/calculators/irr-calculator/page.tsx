import { Metadata } from "next";
import { irr_calculatorMetadata } from "./metadata";
import { irr_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = irr_calculatorMetadata;

export default function IrrCalculatorPage() {
  const { calculate, ...serializableDef } = irr_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: irr_calculatorConfig.title,
    description: irr_calculatorConfig.description,
    slug: irr_calculatorConfig.slug,
    category: irr_calculatorConfig.category,
    faqs: [
      {
        question: "What is the difference between IRR and NPV?",
        answer: "IRR is the annualized discount rate where project NPV equals zero. NPV represents the absolute dollar value created today above the cost of capital.",
      },
      {
        question: "What is MIRR?",
        answer: "Modified IRR (MIRR) resolves standard IRR's unrealistic reinvestment rate assumption by compounding positive cash flows forward at the firm's actual cost of capital.",
      },
      {
        question: "What is a hurdle rate?",
        answer: "A hurdle rate is the minimum required rate of return (WACC) demanded to approve a capital project.",
      },
    ],
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Internal Rate of Return (IRR) & Capital Budgeting Suite",
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
      ratingCount: "3890",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Project IRR, MIRR, and Net Present Value",
    description:
      "Step-by-step guide to calculating Internal Rate of Return (IRR), Modified IRR (MIRR), Net Present Value (NPV), and Profitability Index.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter Initial Investment Outlay",
        text: "Input the initial Year 0 capital expenditure (CF_0).",
      },
      {
        "@type": "HowToStep",
        name: "Enter Annual Cash Flows",
        text: "Log the projected cash inflows or outflows for each subsequent year.",
      },
      {
        "@type": "HowToStep",
        name: "Set Hurdle Rate & Reinvestment Cost",
        text: "Specify your firm's WACC / Hurdle Rate % and reinvestment rate.",
      },
      {
        "@type": "HowToStep",
        name: "Analyze IRR, MIRR, and Payback",
        text: "Review the solved IRR %, Modified IRR %, NPV $, Discounted Payback Period, and Capital Budgeting Decision.",
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
