import { Metadata } from "next";
import { LOAN_CALCULATOR } from "@/calculators/finance/loan";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Loan Calculator – Monthly, Biweekly & Extra Payment Payoff",
    description: "Calculate loan payments across monthly, biweekly, and weekly schedules. Model extra payments, generate complete amortization schedules, and solve for loan amount, term, or interest rate.",
    slug: LOAN_CALCULATOR.slug,
  });
}

export default function LoanCalculatorPage() {
  const { calculate, ...serializableDef } = LOAN_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: LOAN_CALCULATOR.title,
    description: LOAN_CALCULATOR.description,
    slug: LOAN_CALCULATOR.slug,
    category: LOAN_CALCULATOR.category,
    faqs: LOAN_CALCULATOR.faqs,
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
