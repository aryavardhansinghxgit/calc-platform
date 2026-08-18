import { Metadata } from "next";
import { CREDIT_CARD_CALCULATOR } from "@/calculators/finance/credit-card";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Credit Card Calculator",
    description:
      "Free Credit Card Calculator. Calculate payoff months, total interest, minimum payment rules, extra monthly payments, 0% balance transfers, and Debt Avalanche vs. Snowball payoff strategies.",
    slug: CREDIT_CARD_CALCULATOR.slug,
  });
}

export default function CreditCardCalculatorPage() {
  const { calculate, ...serializableDef } = CREDIT_CARD_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: CREDIT_CARD_CALCULATOR.title,
    description: CREDIT_CARD_CALCULATOR.description,
    slug: CREDIT_CARD_CALCULATOR.slug,
    category: CREDIT_CARD_CALCULATOR.category,
    faqs: CREDIT_CARD_CALCULATOR.faqs,
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
