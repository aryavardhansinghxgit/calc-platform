import { Metadata } from "next";
import { BUDGET_CALCULATOR } from "@/calculators/finance/budget";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Budget Calculator – Free 50/30/20 & Expense Breakdown Suite",
    description:
      "Free advanced Budget Calculator. Calculate gross & after-tax income, itemized housing/living expenses, Debt-to-Income (DTI) ratio, 50/30/20 rule breakdown, inflation sensitivity, and generate printable PDF financial reports.",
    slug: BUDGET_CALCULATOR.slug,
  });
}

export default function BudgetCalculatorPage() {
  const { calculate, ...serializableDef } = BUDGET_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: BUDGET_CALCULATOR.title,
    description: BUDGET_CALCULATOR.description,
    slug: BUDGET_CALCULATOR.slug,
    category: BUDGET_CALCULATOR.category,
    faqs: BUDGET_CALCULATOR.faqs,
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
