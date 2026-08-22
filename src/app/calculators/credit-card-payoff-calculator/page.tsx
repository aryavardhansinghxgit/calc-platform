import { Metadata } from "next";
import { CREDIT_CARD_PAYOFF_CALCULATOR } from "@/calculators/finance/credit-card-payoff";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Credit Card Payoff Calculator – Payoff Time, Payments & Multi-Card Plans",
    description:
      "Calculate credit card payoff time, required monthly payments for target dates, multi-card Debt Avalanche vs. Snowball plans, and 0% balance transfer savings.",
    slug: CREDIT_CARD_PAYOFF_CALCULATOR.slug,
  });
}

export default function CreditCardPayoffCalculatorPage() {
  const { calculate, ...serializableDef } = CREDIT_CARD_PAYOFF_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: CREDIT_CARD_PAYOFF_CALCULATOR.title,
    description: CREDIT_CARD_PAYOFF_CALCULATOR.description,
    slug: CREDIT_CARD_PAYOFF_CALCULATOR.slug,
    category: CREDIT_CARD_PAYOFF_CALCULATOR.category,
    faqs: CREDIT_CARD_PAYOFF_CALCULATOR.faqs,
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
