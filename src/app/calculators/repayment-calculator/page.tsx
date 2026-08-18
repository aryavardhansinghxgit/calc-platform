import { Metadata } from "next";
import { REPAYMENT_CALCULATOR } from "@/calculators/finance/repayment";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Repayment Calculator",
    description:
      "Free Repayment Calculator. Calculate loan payments and debt payoff timelines with 8 compounding intervals, 8 payment frequencies, fixed term vs. fixed payment modes, extra payments, and bi-weekly accelerators.",
    slug: REPAYMENT_CALCULATOR.slug,
  });
}

export default function RepaymentCalculatorPage() {
  const { calculate, ...serializableDef } = REPAYMENT_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: REPAYMENT_CALCULATOR.title,
    description: REPAYMENT_CALCULATOR.description,
    slug: REPAYMENT_CALCULATOR.slug,
    category: REPAYMENT_CALCULATOR.category,
    faqs: REPAYMENT_CALCULATOR.faqs,
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
