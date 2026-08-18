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
    faqs: [
      {
        question: "How is my monthly loan payment calculated?",
        answer: "Monthly loan payments are calculated using standard amortization mathematics factoring in your principal balance, annual interest rate divided by 12, and the total number of monthly payments across the loan term.",
      },
      {
        question: "What is the difference between principal and interest in a loan payment?",
        answer: "Principal represents the actual borrowed money you are returning to the lender, while interest is the finance charge fee paid to the lender for borrowing those funds.",
      },
      {
        question: "What is an accelerated bi-weekly payment and how does it save money?",
        answer: "Accelerated bi-weekly payments divide your regular monthly payment in half and charge it every 14 days, resulting in 13 full monthly payments per year instead of 12.",
      },
    ],
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
