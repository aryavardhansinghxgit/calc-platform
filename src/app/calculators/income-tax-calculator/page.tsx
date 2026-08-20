import { Metadata } from "next";
import { INCOME_TAX_CALCULATOR } from "@/calculators/finance/income-tax";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "2026 Income Tax Calculator – Federal Tax & Refund Estimator",
    description:
      "Calculate your 2026 & 2025 US federal income tax liability, refund check, tax brackets, Child Tax Credit, standard vs. itemized deductions, and Form 1040 lines.",
    slug: INCOME_TAX_CALCULATOR.slug,
  });
}

export default function IncomeTaxCalculatorPage() {
  const { calculate, ...serializableDef } = INCOME_TAX_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: INCOME_TAX_CALCULATOR.title,
    description: INCOME_TAX_CALCULATOR.description,
    slug: INCOME_TAX_CALCULATOR.slug,
    category: INCOME_TAX_CALCULATOR.category,
    faqs: INCOME_TAX_CALCULATOR.faqs,
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CalculatorLayout definition={serializableDef} />
    </>
  );
}
