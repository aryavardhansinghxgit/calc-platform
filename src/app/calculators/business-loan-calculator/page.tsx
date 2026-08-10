import { Metadata } from "next";
import { BUSINESS_LOAN_CALCULATOR } from "@/calculators/finance/business-loan";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Business Loan Calculator – Real APR & Commercial Suite",
    description:
      "Free Business Loan Calculator. Calculate monthly payback, total interest, origination and documentation fees, Real Rate (APR), SBA loan options, DSCR cash flow coverage, and amortization schedules.",
    slug: BUSINESS_LOAN_CALCULATOR.slug,
  });
}

export default function BusinessLoanCalculatorPage() {
  const { calculate, ...serializableDef } = BUSINESS_LOAN_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: BUSINESS_LOAN_CALCULATOR.title,
    description: BUSINESS_LOAN_CALCULATOR.description,
    slug: BUSINESS_LOAN_CALCULATOR.slug,
    category: BUSINESS_LOAN_CALCULATOR.category,
    faqs: BUSINESS_LOAN_CALCULATOR.faqs,
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
