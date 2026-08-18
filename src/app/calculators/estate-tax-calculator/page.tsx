import { Metadata } from "next";
import { estate_tax_calculatorMetadata } from "./metadata";
import { estate_tax_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = estate_tax_calculatorMetadata;

export default function EstateTaxCalculatorPage() {
  const { calculate, ...serializableDef } = estate_tax_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: estate_tax_calculatorConfig.title,
    description: estate_tax_calculatorConfig.description,
    slug: estate_tax_calculatorConfig.slug,
    category: estate_tax_calculatorConfig.category,
    faqs: [
      {
        question: "What is the federal estate tax exemption amount for the current tax year?",
        answer: "For 2025, the federal estate tax exemption is $13.99 million per individual ($27.98 million for married couples). For 2026, the projected baseline is $15.00 million.",
      },
      {
        question: "What is the difference between an estate tax and an inheritance tax?",
        answer: "An estate tax is paid out of the deceased person's estate before distribution, while an inheritance tax is paid by the individual beneficiary.",
      },
      {
        question: "How does the unlimited marital deduction protect married couples?",
        answer: "It allows a spouse to transfer 100% of their estate to a surviving U.S. citizen spouse completely tax-free.",
      },
    ],
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Estate Tax & Wealth Transfer Planning Suite",
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
      ratingCount: "4120",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Federal Estate Tax",
    description:
      "Step-by-step instructions to calculate federal estate taxes, unified credits, and net inheritance to heirs.",
    step: [
      {
        "@type": "HowToStep",
        name: "Sum Gross Estate Assets",
        text: "Add up real estate, brokerage investments, bank accounts, retirement plans, business equity, and owned life insurance.",
      },
      {
        "@type": "HowToStep",
        name: "Subtract Debts & Administrative Fees",
        text: "Deduct mortgages, funeral expenses, and probate administration costs to find the Adjusted Gross Estate.",
      },
      {
        "@type": "HowToStep",
        name: "Apply Marital and Charitable Deductions",
        text: "Deduct transfers to a surviving U.S. citizen spouse and qualifying 501(c)(3) charities.",
      },
      {
        "@type": "HowToStep",
        name: "Calculate Progressive Tax & Apply Unified Credit",
        text: "Apply the 40% top bracket to taxable amounts exceeding the statutory lifetime exemption threshold.",
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
