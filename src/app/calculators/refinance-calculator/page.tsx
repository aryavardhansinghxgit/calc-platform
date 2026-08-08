import { Metadata } from "next";
import { REFINANCE_CALCULATOR } from "@/calculators/finance/refinance";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Refinance Calculator – Compare Loan Savings & Break-Even Point",
    description: "Compare your current loan with a refinanced loan. Calculate monthly savings, interest reduction, refinancing costs, and break-even period instantly.",
    slug: REFINANCE_CALCULATOR.slug,
  });
}

export default function RefinanceCalculatorPage() {
  const { calculate, ...serializableDef } = REFINANCE_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: REFINANCE_CALCULATOR.title,
    description: REFINANCE_CALCULATOR.description,
    slug: REFINANCE_CALCULATOR.slug,
    category: REFINANCE_CALCULATOR.category,
    faqs: REFINANCE_CALCULATOR.faqs,
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
