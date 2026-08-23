import { Metadata } from "next";
import { SAVINGS_CALCULATOR } from "@/calculators/finance/savings";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = generateCalculatorMetadata({
    title: "Savings Calculator - Compound Growth, Contributions & Savings Goals",
    description:
      "Calculate savings growth, compound interest, recurring contributions, goal amounts, inflation-adjusted value, and retirement/FIRE projections.",
    slug: SAVINGS_CALCULATOR.slug,
  });

  return {
    ...baseMeta,
    keywords: [
      "savings calculator",
      "savings account calculator",
      "savings interest calculator",
      "compound savings calculator",
      "savings goal calculator",
      "monthly savings calculator",
      "future value savings calculator",
      "savings calculator with contributions",
      "savings calculator with inflation",
      "savings calculator with tax",
      "savings growth calculator",
      "retirement savings calculator",
      "emergency savings calculator",
    ],
    openGraph: {
      ...baseMeta.openGraph,
      title: "Savings Calculator - Compound Growth, Contributions & Savings Goals",
      description:
        "Calculate savings growth, compound interest, recurring contributions, goal amounts, inflation-adjusted value, and retirement/FIRE projections.",
    },
    twitter: {
      ...baseMeta.twitter,
      title: "Savings Calculator - Compound Growth, Contributions & Savings Goals",
      description:
        "Calculate savings growth, compound interest, recurring contributions, goal amounts, inflation-adjusted value, and retirement/FIRE projections.",
    },
  };
}

export default function SavingsCalculatorPage() {
  const { calculate, ...serializableDef } = SAVINGS_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: "Savings Calculator - Compound Growth, Contributions & Savings Goals",
    description: SAVINGS_CALCULATOR.description,
    slug: SAVINGS_CALCULATOR.slug,
    category: SAVINGS_CALCULATOR.category,
    faqs: SAVINGS_CALCULATOR.faqs,
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
