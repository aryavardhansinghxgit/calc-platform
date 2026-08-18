import { Metadata } from "next";
import { BOAT_LOAN_CALCULATOR } from "@/calculators/finance/boat-loan";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Boat Loan Calculator",
    description:
      "Free Boat Loan & Marine Financing Calculator. Calculate monthly boat payments, finance interest, marina storage, insurance, fuel costs, and true total cost of vessel ownership.",
    slug: BOAT_LOAN_CALCULATOR.slug,
  });
}

export default function BoatLoanCalculatorPage() {
  const { calculate, ...serializableDef } = BOAT_LOAN_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: BOAT_LOAN_CALCULATOR.title,
    description: BOAT_LOAN_CALCULATOR.description,
    slug: BOAT_LOAN_CALCULATOR.slug,
    category: BOAT_LOAN_CALCULATOR.category,
    faqs: BOAT_LOAN_CALCULATOR.faqs,
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
