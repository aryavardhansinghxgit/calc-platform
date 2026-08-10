import { Metadata } from "next";
import { ANNUITY_PAYOUT_CALCULATOR } from "@/calculators/finance/annuity-payout";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Annuity Payout Calculator – Guaranteed Retirement Income Suite",
    description:
      "Free Annuity Payout Calculator. Calculate guaranteed monthly income payouts for fixed length terms, fixed payments, single/joint life expectancy, inflation adjustments, and immediate vs deferred comparisons.",
    slug: ANNUITY_PAYOUT_CALCULATOR.slug,
  });
}

export default function AnnuityPayoutCalculatorPage() {
  const { calculate, ...serializableDef } = ANNUITY_PAYOUT_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: ANNUITY_PAYOUT_CALCULATOR.title,
    description: ANNUITY_PAYOUT_CALCULATOR.description,
    slug: ANNUITY_PAYOUT_CALCULATOR.slug,
    category: ANNUITY_PAYOUT_CALCULATOR.category,
    faqs: ANNUITY_PAYOUT_CALCULATOR.faqs,
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
