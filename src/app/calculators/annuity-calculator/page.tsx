import { Metadata } from "next";
import { ANNUITY_CALCULATOR } from "@/calculators/finance/annuity";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Annuity Calculator – Growth, Accumulation & Target Planner",
    description:
      "Free Annuity Calculator. Calculate accumulation growth for Ordinary Annuities and Annuities Due. Features compounding frequencies, Target Balance Planner, 4-plan scenario comparison, Recharts dashboards, and downloadable annual/monthly schedules.",
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
