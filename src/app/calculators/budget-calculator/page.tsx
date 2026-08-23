import { Metadata } from "next";
import { BUDGET_CALCULATOR } from "@/calculators/finance/budget";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Budget Calculator – Monthly Expenses, 50/30/20 & DTI",
    description:
      "Calculate after-tax income, monthly expenses, cash flow, debt-to-income ratios, 50/30/20 allocations, and budget stress scenarios.",
    slug: BUDGET_CALCULATOR.slug,
  });
}

export default function BudgetCalculatorPage() {
  const { calculate, ...serializableDef } = BUDGET_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: "Budget Calculator – Monthly Expenses, 50/30/20 & DTI",
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
