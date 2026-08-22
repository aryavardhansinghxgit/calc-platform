import { Metadata } from "next";
import { CREDIT_CARD_CALCULATOR } from "@/calculators/finance/credit-card";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Credit Card Calculator – Payoff, Interest & Balance Transfer",
    description:
      "Calculate credit card payoff time, monthly interest, minimum payment effects, 0% balance transfer savings, Debt Avalanche vs. Snowball, and credit utilization.",
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
