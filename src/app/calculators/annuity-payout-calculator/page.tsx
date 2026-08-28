import { Metadata } from "next";
import { ANNUITY_PAYOUT_CALCULATOR } from "@/calculators/finance/annuity-payout";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Annuity Payout Calculator – Calculate Monthly Income, Payout Duration & Retirement Withdrawals",
    description:
      "Use this Annuity Payout Calculator to estimate monthly retirement income, fixed length payouts, fund depletion schedules, life expectancy projections, and immediate vs deferred comparisons.",
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
