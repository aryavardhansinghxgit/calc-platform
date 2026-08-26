import { Metadata } from "next";
import { take_home_pay_calculatorMetadata } from "./metadata";
import { take_home_pay_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = take_home_pay_calculatorMetadata;

export default function TakeHomePayCalculatorPage() {
  const { calculate, ...serializableDef } = take_home_pay_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: take_home_pay_calculatorConfig.title,
    description: take_home_pay_calculatorConfig.description,
    slug: take_home_pay_calculatorConfig.slug,
    category: take_home_pay_calculatorConfig.category,
    faqs: take_home_pay_calculatorConfig.faqs,
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Take-Home Paycheck & Tax Withholding Calculator",
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
      ratingCount: "5320",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Your Net Take-Home Paycheck",
    description:
      "Step-by-step instructions to convert gross salary to net take-home pay after all tax withholdings and deductions.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter Gross Salary & Pay Frequency",
        text: "Specify gross wages and frequency (e.g. $80,000 annual or bi-weekly).",
      },
      {
        "@type": "HowToStep",
        name: "Select Filing Status & State",
        text: "Choose Single, Married Joint, or Head of Household, plus state and local tax rates.",
      },
      {
        "@type": "HowToStep",
        name: "Include Pre-Tax & Post-Tax Deductions",
        text: "Add 401(k), health insurance, HSA contributions, and Form W-4 dependent credits.",
      },
      {
        "@type": "HowToStep",
        name: "Review Itemized Paycheck Withholding",
        text: "View net take-home pay, federal/FICA/state taxes, and download itemized paystub report.",
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
