import { Metadata } from "next";
import { DEBT_CONSOLIDATION_CALCULATOR } from "@/calculators/finance/debt-consolidation";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Debt Consolidation Calculator – Real APR & Refinance Suite",
    description:
      "Free Debt Consolidation Calculator. Calculate whether consolidating debts saves money, solve Real Effective APR with origination fees, test fee sensitivity thresholds, and compare 0% balance transfer cards.",
    slug: DEBT_CONSOLIDATION_CALCULATOR.slug,
  });
}

export default function DebtConsolidationCalculatorPage() {
  const { calculate, ...serializableDef } = DEBT_CONSOLIDATION_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: DEBT_CONSOLIDATION_CALCULATOR.title,
    description: DEBT_CONSOLIDATION_CALCULATOR.description,
    slug: DEBT_CONSOLIDATION_CALCULATOR.slug,
    category: DEBT_CONSOLIDATION_CALCULATOR.category,
    faqs: DEBT_CONSOLIDATION_CALCULATOR.faqs,
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
