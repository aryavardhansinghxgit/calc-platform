import { Metadata } from "next";
import { RETIREMENT_CALCULATOR } from "@/calculators/finance/retirement";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Retirement Calculator – Nest Egg, Savings Gap & Income Planner",
    description:
      "Calculate your target retirement nest egg, projected savings gap, monthly withdrawal capacity, and portfolio longevity with a comprehensive retirement planning calculator.",
    slug: RETIREMENT_CALCULATOR.slug,
  });
}

export default function RetirementCalculatorPage() {
  const { calculate, ...serializableDef } = RETIREMENT_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: RETIREMENT_CALCULATOR.title,
    description: RETIREMENT_CALCULATOR.description,
    slug: RETIREMENT_CALCULATOR.slug,
    category: RETIREMENT_CALCULATOR.category,
    faqs: RETIREMENT_CALCULATOR.faqs,
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
