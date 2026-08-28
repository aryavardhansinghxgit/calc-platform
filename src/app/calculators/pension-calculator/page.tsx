import { Metadata } from "next";
import { PENSION_CALCULATOR } from "@/calculators/finance/pension";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Pension Calculator – Lump Sum, Monthly Pension, Survivor & Retirement Comparison",
    description:
      "Use this Pension Calculator to compare a lump sum vs monthly pension, calculate present value, breakeven age, single-life vs joint survivor payouts, and defined benefit formulas.",
    slug: PENSION_CALCULATOR.slug,
  });
}

export default function PensionCalculatorPage() {
  const { calculate, ...serializableDef } = PENSION_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: PENSION_CALCULATOR.title,
    description: PENSION_CALCULATOR.description,
    slug: PENSION_CALCULATOR.slug,
    category: PENSION_CALCULATOR.category,
    faqs: PENSION_CALCULATOR.faqs,
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
