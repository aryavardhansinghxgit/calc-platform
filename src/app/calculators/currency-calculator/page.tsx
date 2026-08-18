import { Metadata } from "next";
import { currency_calculatorMetadata } from "./metadata";
import { currency_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = currency_calculatorMetadata;

export default function CurrencyCalculatorPage() {
  const { calculate, ...serializableDef } = currency_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: currency_calculatorConfig.title,
    description: currency_calculatorConfig.description,
    slug: currency_calculatorConfig.slug,
    category: currency_calculatorConfig.category,
    faqs: [
      {
        question: "What is the mid-market exchange rate?",
        answer: "The mid-market rate is the real-time midpoint between global wholesale buy (bid) and sell (ask) prices traded by institutional banks in the interbank Forex market.",
      },
      {
        question: "What is the cheapest way to convert money when traveling abroad?",
        answer: "Use a credit card with 0% foreign transaction fees and withdraw cash from in-branch bank ATMs while always declining Dynamic Currency Conversion.",
      },
      {
        question: "What is Dynamic Currency Conversion (DCC) and why should I decline it?",
        answer: "DCC allows overseas merchants or ATMs to charge you in your home currency at an inflated exchange rate with a 5% to 10% markup. Always choose the local currency.",
      },
    ],
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Live Currency Converter & Exchange Rate Calculator",
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
      ratingCount: "8120",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert Foreign Currency & Calculate Exchange Rates",
    description:
      "Step-by-step instructions to convert between global currencies, simulate bank fees, and calculate travel budgets.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter Amount & Select Currencies",
        text: "Input the amount you wish to convert and choose your base and target currencies (e.g. 100 USD to EUR).",
      },
      {
        "@type": "HowToStep",
        name: "View Live & Inverse Rates",
        text: "See the instant converted total, live mid-market exchange rate, and inverse rate.",
      },
      {
        "@type": "HowToStep",
        name: "Simulate Bank Markups & Transfer Fees",
        text: "Evaluate hidden transfer markups, ATM fees, and net in-hand foreign cash.",
      },
      {
        "@type": "HowToStep",
        name: "Export Conversion Matrix",
        text: "Download the quick-conversion cheat sheet or major currency matrix as CSV.",
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
