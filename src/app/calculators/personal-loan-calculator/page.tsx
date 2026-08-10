import { Metadata } from "next";
import { PERSONAL_LOAN_CALCULATOR } from "@/calculators/finance/personal-loan";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Personal Loan Calculator – Amortization & Consolidation Suite",
    description:
      "Free Personal Loan Calculator. Calculate monthly payments, total interest, annual and monthly amortization schedules, fee options, debt consolidation APR savings, and early payoff acceleration.",
    slug: PERSONAL_LOAN_CALCULATOR.slug,
  });
}

export default function PersonalLoanCalculatorPage() {
  const { calculate, ...serializableDef } = PERSONAL_LOAN_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: PERSONAL_LOAN_CALCULATOR.title,
    description: PERSONAL_LOAN_CALCULATOR.description,
    slug: PERSONAL_LOAN_CALCULATOR.slug,
    category: PERSONAL_LOAN_CALCULATOR.category,
    faqs: PERSONAL_LOAN_CALCULATOR.faqs,
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
