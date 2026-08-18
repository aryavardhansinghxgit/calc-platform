import { Metadata } from "next";
import { salary_calculatorMetadata } from "./metadata";
import { salary_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = salary_calculatorMetadata;

export default function SalaryCalculatorPage() {
  const { calculate, ...serializableDef } = salary_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: salary_calculatorConfig.title,
    description: salary_calculatorConfig.description,
    slug: salary_calculatorConfig.slug,
    category: salary_calculatorConfig.category,
    faqs: [
      {
        question: "How do I calculate my annual salary from an hourly wage?",
        answer: "Multiply your hourly rate by the number of hours worked per week, then multiply by 52 weeks (e.g., $35/hr * 40 hrs/wk * 52 wks = $72,800/yr).",
      },
      {
        question: "What is the difference between bi-weekly and semi-monthly pay periods?",
        answer: "Bi-weekly pays every 2 weeks resulting in 26 paychecks per year, whereas semi-monthly pays twice a month resulting in exactly 24 paychecks per year.",
      },
      {
        question: "How many working hours are in a typical full-time work year?",
        answer: "A standard full-time labor year consists of 2,080 hours (40 hours per week * 52 weeks).",
      },
    ],
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Salary Calculator & Paycheck Converter Suite",
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
      ratingCount: "5890",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert Hourly Wage to Annual Salary",
    description:
      "Step-by-step instructions to convert an hourly wage to unadjusted and adjusted annual compensation.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter Pay Amount & Frequency",
        text: "Input your hourly wage or salary amount and select the corresponding pay unit.",
      },
      {
        "@type": "HowToStep",
        name: "Configure Hours & Days per Week",
        text: "Specify standard full-time hours (default 40 hours) and days per week (default 5 days).",
      },
      {
        "@type": "HowToStep",
        name: "Include Paid Time Off and Holidays",
        text: "Enter paid company holidays and vacation days to calculate adjusted earnings.",
      },
      {
        "@type": "HowToStep",
        name: "View Full Conversion Matrix & Take-Home Pay",
        text: "Review the side-by-side conversion table and net take-home tax breakdown.",
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
