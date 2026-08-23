import { Metadata } from "next";
import { FUTURE_VALUE_CALCULATOR } from "@/calculators/finance/future-value";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Future Value Calculator - Compound Growth, Contributions & Goal Planner",
    description:
      "Calculate future value for a lump sum and recurring contributions with compounding, contribution timing, inflation, taxes, scenarios, goal planning and model-based Monte Carlo analysis.",
    slug: FUTURE_VALUE_CALCULATOR.slug,
  });
}

export default function FutureValueCalculatorPage() {
  const { calculate, ...serializableDef } = FUTURE_VALUE_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: FUTURE_VALUE_CALCULATOR.title,
    description: FUTURE_VALUE_CALCULATOR.description,
    slug: FUTURE_VALUE_CALCULATOR.slug,
    category: FUTURE_VALUE_CALCULATOR.category,
    faqs: FUTURE_VALUE_CALCULATOR.faqs,
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
