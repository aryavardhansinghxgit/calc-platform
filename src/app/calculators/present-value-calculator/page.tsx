import { Metadata } from "next";
import { PRESENT_VALUE_CALCULATOR } from "@/calculators/finance/present-value";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Present Value Calculator — PV, Annuity, NPV & Discounted Cash Flow",
    description:
      "Calculate present value of future lump sums and recurring cash flows, compare annuities, evaluate NPV, test discount-rate sensitivity, and understand the time value of money.",
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
