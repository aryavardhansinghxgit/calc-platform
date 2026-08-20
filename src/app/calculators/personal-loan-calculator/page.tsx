import { Metadata } from "next";
import { PERSONAL_LOAN_CALCULATOR } from "@/calculators/finance/personal-loan";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Personal Loan Calculator – Payments, APR & Fees",
    description:
      "Calculate monthly personal loan payments, total interest, origination fees, actuarial APR, and amortization schedules with our free personal loan calculator.",
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
