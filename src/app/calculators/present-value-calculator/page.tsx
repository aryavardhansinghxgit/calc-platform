import { Metadata } from "next";
import { PRESENT_VALUE_CALCULATOR } from "@/calculators/finance/present-value";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Present Value Calculator – Discounted Cash Flow & NPV Model",
    description:
      "Free advanced Present Value Calculator. Calculate present value of future lump sums, annuities, growing cash flows, NPV, and discount rate sensitivity analysis.",
    slug: PRESENT_VALUE_CALCULATOR.slug,
  });
}

export default function PresentValueCalculatorPage() {
  const { calculate, ...serializableDef } = PRESENT_VALUE_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: PRESENT_VALUE_CALCULATOR.title,
    description: PRESENT_VALUE_CALCULATOR.description,
    slug: PRESENT_VALUE_CALCULATOR.slug,
    category: PRESENT_VALUE_CALCULATOR.category,
    faqs: PRESENT_VALUE_CALCULATOR.faqs,
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
