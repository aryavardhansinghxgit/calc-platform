import { Metadata } from "next";
import { RETIREMENT_CALCULATOR } from "@/calculators/finance/retirement";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Retirement Calculator – Financial Independence Suite",
    description:
      "Free Retirement Calculator. Calculate your target retirement nest egg, annual savings gap, monthly withdrawal capacity, nest egg longevity, and test the 4% Trinity Rule.",
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
