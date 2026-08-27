import { Metadata } from "next";
import { INTEREST_CALCULATOR } from "@/calculators/finance/interest";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Interest Calculator – Calculate Simple & Compound Interest Online",
    description:
      "Calculate simple or compound interest with annual, monthly, weekly, daily, and continuous compounding. Add recurring contributions, compare rates, adjust for tax and inflation, and estimate doubling time.",
    slug: INTEREST_CALCULATOR.slug,
  });
}

export default function InterestCalculatorPage() {
  const { calculate, ...serializableDef } = INTEREST_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: "Interest Calculator – Calculate Simple & Compound Interest Online",
    description:
      "Calculate simple or compound interest with annual, monthly, weekly, daily, and continuous compounding. Add recurring contributions, compare rates, adjust for tax and inflation, and estimate doubling time.",
    slug: INTEREST_CALCULATOR.slug,
    category: INTEREST_CALCULATOR.category,
    faqs: INTEREST_CALCULATOR.faqs,
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
