import { Metadata } from "next";
import { ANNUITY_CALCULATOR } from "@/calculators/finance/annuity";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Annuity Calculator — Growth, Accumulation, Annuity Due & Target Planner",
    description:
      "Calculate annuity growth, compare ordinary and due timing, solve contributions needed for a target balance, model monthly or annual deposits, compare scenarios, and see inflation-adjusted results.",
    slug: ANNUITY_CALCULATOR.slug,
  });
}

export default function AnnuityCalculatorPage() {
  const { calculate, ...serializableDef } = ANNUITY_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: ANNUITY_CALCULATOR.title,
    description: ANNUITY_CALCULATOR.description,
    slug: ANNUITY_CALCULATOR.slug,
    category: ANNUITY_CALCULATOR.category,
    faqs: ANNUITY_CALCULATOR.faqs,
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
