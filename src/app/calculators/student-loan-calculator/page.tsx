import { Metadata } from "next";
import { STUDENT_LOAN_CALCULATOR } from "@/calculators/finance/student-loan";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Student Loan Calculator – Payment, Interest, Payoff & Repayment Plans",
    description:
      "Calculate student loan payments, total interest, payoff time, extra-payment savings, in-school balance projections, refinancing scenarios, and federal repayment-plan options.",
    slug: STUDENT_LOAN_CALCULATOR.slug,
  });
}

export default function StudentLoanCalculatorPage() {
  const { calculate, ...serializableDef } = STUDENT_LOAN_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: "Student Loan Calculator – Payment, Interest, Payoff & Repayment Plans",
    description: STUDENT_LOAN_CALCULATOR.description,
    slug: STUDENT_LOAN_CALCULATOR.slug,
    category: STUDENT_LOAN_CALCULATOR.category,
    faqs: STUDENT_LOAN_CALCULATOR.faqs,
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
