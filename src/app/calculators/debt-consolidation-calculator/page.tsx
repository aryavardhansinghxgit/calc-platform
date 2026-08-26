import { Metadata } from "next";
import { DEBT_CONSOLIDATION_CALCULATOR } from "@/calculators/finance/debt-consolidation";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Debt Consolidation Calculator — Compare Loans, APR, Fees & Savings",
    description:
      "Compare your current debts with a consolidation loan, calculate weighted APR, real effective APR, monthly savings, total interest, fees, balance-transfer costs, and payoff schedules.",
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
