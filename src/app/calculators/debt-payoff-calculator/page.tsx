import { Metadata } from "next";
import { DEBT_PAYOFF_CALCULATOR } from "@/calculators/finance/debt-payoff";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Debt Payoff Calculator – Financial Freedom Acceleration Suite",
    description:
      "Free Debt Payoff Calculator. Calculate multi-debt payoff schedules, compare Debt Avalanche vs. Debt Snowball, test payment rollover reallocation, extra payments, and debt consolidation loan savings.",
    slug: DEBT_PAYOFF_CALCULATOR.slug,
  });
}

export default function DebtPayoffCalculatorPage() {
  const { calculate, ...serializableDef } = DEBT_PAYOFF_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: DEBT_PAYOFF_CALCULATOR.title,
    description: DEBT_PAYOFF_CALCULATOR.description,
    slug: DEBT_PAYOFF_CALCULATOR.slug,
    category: DEBT_PAYOFF_CALCULATOR.category,
    faqs: DEBT_PAYOFF_CALCULATOR.faqs,
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
