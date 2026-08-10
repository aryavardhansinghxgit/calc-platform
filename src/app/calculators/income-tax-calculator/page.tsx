import { Metadata } from "next";
import { INCOME_TAX_CALCULATOR } from "@/calculators/finance/income-tax";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Income Tax Calculator – 2026/2025 US Federal Tax & Refund Estimator",
    description:
      "Free advanced Income Tax Calculator. Calculate 2026 & 2025 federal tax liability, estimated tax refund, self-employment tax, capital gains rates, itemized vs standard deductions, and tax credit savings.",
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
