import { Metadata } from "next";
import { SIMPLE_INTEREST_CALCULATOR } from "@/calculators/finance/simple-interest";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Simple Interest Calculator – Calculate Interest, Principal, Rate & Time",
    description:
      "Use our Simple Interest Calculator to calculate interest, final balance, principal, rate, or time. Compare simple and compound interest with yearly schedules and step-by-step calculations.",
    slug: SIMPLE_INTEREST_CALCULATOR.slug,
  });
}

export default function SimpleInterestCalculatorPage() {
  const { calculate, ...serializableDef } = SIMPLE_INTEREST_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: SIMPLE_INTEREST_CALCULATOR.title,
    description: SIMPLE_INTEREST_CALCULATOR.description,
    slug: SIMPLE_INTEREST_CALCULATOR.slug,
    category: SIMPLE_INTEREST_CALCULATOR.category,
    faqs: SIMPLE_INTEREST_CALCULATOR.faqs,
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
