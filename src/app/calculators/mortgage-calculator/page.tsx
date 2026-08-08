import { Metadata } from "next";
import { MORTGAGE_CALCULATOR } from "@/calculators/finance/mortgage";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: MORTGAGE_CALCULATOR.title,
    description: MORTGAGE_CALCULATOR.description,
    slug: MORTGAGE_CALCULATOR.slug,
  });
}

export default function MortgageCalculatorPage() {
  const { calculate, ...serializableDef } = MORTGAGE_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: MORTGAGE_CALCULATOR.title,
    description: MORTGAGE_CALCULATOR.description,
    slug: MORTGAGE_CALCULATOR.slug,
    category: MORTGAGE_CALCULATOR.category,
    faqs: MORTGAGE_CALCULATOR.faqs,
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
