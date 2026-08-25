import { Metadata } from "next";
import { payment_calculatorMetadata } from "./metadata";
import { payment_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = payment_calculatorMetadata;

export default function PaymentCalculatorPage() {
  const { calculate, ...serializableDef } = payment_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: payment_calculatorConfig.title,
    description: payment_calculatorConfig.description,
    slug: payment_calculatorConfig.slug,
    category: payment_calculatorConfig.category,
    faqs: payment_calculatorConfig.faqs,
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Payment & Multi-Frequency Loan Amortization Calculator",
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
      ratingCount: "6420",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Monthly Loan Payments & Amortization",
    description:
      "Step-by-step instructions to calculate monthly loan payments, total interest, and accelerated payoff schedules.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter Loan Amount & Term",
        text: "Input the total borrowed loan amount and term in years (e.g., $200,000 for 15 years).",
      },
      {
        "@type": "HowToStep",
        name: "Specify Interest Rate & Frequency",
        text: "Enter the annual interest rate (e.g., 6.0%) and choose monthly or bi-weekly payment frequency.",
      },
      {
        "@type": "HowToStep",
        name: "Add Optional Prepayment",
        text: "Optionally add extra monthly or annual principal payments to see interest savings.",
      },
      {
        "@type": "HowToStep",
        name: "Review Amortization Schedule",
        text: "View monthly payments, total interest paid, and export the complete annual or monthly schedule as CSV.",
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
