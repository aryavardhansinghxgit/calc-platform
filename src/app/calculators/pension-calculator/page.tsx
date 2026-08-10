import { Metadata } from "next";
import { PENSION_CALCULATOR } from "@/calculators/finance/pension";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Pension Calculator – Lump Sum, Joint Survivor & Early Retirement Suite",
    description:
      "Free Pension Calculator. Compare Lump Sum Payout vs Monthly Pension, Single-Life vs Joint-and-Survivor annuities, and Work Longer vs Retire Earlier trade-offs with COLA, present value math, and interactive charts.",
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
