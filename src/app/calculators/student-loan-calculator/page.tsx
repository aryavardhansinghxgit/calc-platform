import { Metadata } from "next";
import { STUDENT_LOAN_CALCULATOR } from "@/calculators/finance/student-loan";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Student Loan Calculator – Repayment & Projection Suite",
    description:
      "Free Student Loan Calculator. Calculate monthly repayments, 4-way missing solvers, extra payment payoff acceleration, in-school debt projections, federal repayment plans, and refinancing savings.",
    slug: STUDENT_LOAN_CALCULATOR.slug,
  });
}

export default function StudentLoanCalculatorPage() {
  const { calculate, ...serializableDef } = STUDENT_LOAN_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: STUDENT_LOAN_CALCULATOR.title,
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
