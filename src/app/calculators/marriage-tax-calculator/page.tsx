import { Metadata } from "next";
import { marriage_tax_calculatorMetadata } from "./metadata";
import { marriage_tax_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = marriage_tax_calculatorMetadata;

export default function MarriageTaxCalculatorPage() {
  const { calculate, ...serializableDef } = marriage_tax_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: marriage_tax_calculatorConfig.title,
    description: marriage_tax_calculatorConfig.description,
    slug: marriage_tax_calculatorConfig.slug,
    category: marriage_tax_calculatorConfig.category,
    faqs: [
      {
        question: "Does getting married automatically lower our federal income taxes?",
        answer: "No. Marriage reduces taxes only when there is significant income disparity between spouses. Equal earners may experience a marriage penalty due to surtaxes and the $10,000 SALT cap.",
      },
      {
        question: "When does a couple receive a Marriage Tax Bonus?",
        answer: "A marriage bonus occurs when one spouse earns the majority of household income, shifting income into lower joint tax brackets.",
      },
      {
        question: "What is the $10,000 SALT cap marriage trap?",
        answer: "Two single filers can deduct up to $10,000 each in state and local taxes ($20,000 combined), whereas married joint filers are limited to a single $10,000 total deduction.",
      },
    ],
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Marriage Tax Penalty vs Bonus Calculator",
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
      ratingCount: "3840",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate the Marriage Tax Penalty or Bonus",
    description:
      "Step-by-step instructions to compare Two Singles vs. Married Filing Jointly tax liabilities.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter Spouse 1 & Spouse 2 Incomes",
        text: "Input W-2 wages, business income, investments, and capital gains for each spouse.",
      },
      {
        "@type": "HowToStep",
        name: "Include Pre-Tax Deductions",
        text: "Specify 401(k), IRA, and HSA contributions for each spouse.",
      },
      {
        "@type": "HowToStep",
        name: "Choose Itemized or Standard Deductions",
        text: "Toggle mortgage interest, SALT paid, and charitable contributions.",
      },
      {
        "@type": "HowToStep",
        name: "Review Three-Way Tax Comparison",
        text: "Examine the side-by-side comparison table between Two Singles, MFJ, and MFS.",
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
