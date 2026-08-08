import { Metadata } from "next";
import { AMORTIZATION_CALCULATOR } from "@/calculators/finance/amortization";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: AMORTIZATION_CALCULATOR.title,
    description: AMORTIZATION_CALCULATOR.description,
    slug: AMORTIZATION_CALCULATOR.slug,
  });
}

export default function AmortizationCalculatorPage() {
  const { calculate, ...serializableDef } = AMORTIZATION_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: AMORTIZATION_CALCULATOR.title,
    description: AMORTIZATION_CALCULATOR.description,
    slug: AMORTIZATION_CALCULATOR.slug,
    category: AMORTIZATION_CALCULATOR.category,
    faqs: AMORTIZATION_CALCULATOR.faqs,
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
