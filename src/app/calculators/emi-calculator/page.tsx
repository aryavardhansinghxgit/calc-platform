import { Metadata } from "next";
import { EMI_CALCULATOR } from "@/calculators/finance/emi";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "EMI Calculator – Monthly Loan Payment & Prepayment Analyzer",
    description: "Calculate exact monthly loan payments (EMI), compare Reducing Balance vs Flat Rate interest, model extra payment savings, and analyze total borrowing costs.",
    slug: EMI_CALCULATOR.slug,
  });
}

export default function EmiCalculatorPage() {
  const { calculate, ...serializableDef } = EMI_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: EMI_CALCULATOR.title,
    description: EMI_CALCULATOR.description,
    slug: EMI_CALCULATOR.slug,
    category: EMI_CALCULATOR.category,
    faqs: EMI_CALCULATOR.faqs,
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
