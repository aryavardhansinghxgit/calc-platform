import { Metadata } from "next";
import { HOUSE_AFFORDABILITY_CALCULATOR } from "@/calculators/finance/house-affordability";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = generateCalculatorMetadata({
    title: "House Affordability Calculator - How Much House Can I Afford?",
    description:
      "Estimate how much house you can afford using income, monthly debts, down payment, mortgage rate, housing costs, DTI, or a fixed monthly budget.",
    slug: HOUSE_AFFORDABILITY_CALCULATOR.slug,
  });

  return {
    ...baseMeta,
    keywords: [
      "house affordability calculator",
      "how much house can I afford",
      "home affordability calculator",
      "house affordability calculator by income",
      "house affordability calculator by monthly payment",
      "mortgage affordability calculator",
      "how much mortgage can I afford",
      "home price affordability calculator",
      "DTI home affordability calculator",
      "affordable home price calculator",
      "home buying budget calculator",
    ],
    openGraph: {
      ...baseMeta.openGraph,
      title: "House Affordability Calculator - How Much House Can I Afford?",
      description:
        "Estimate how much house you can afford using income, monthly debts, down payment, mortgage rate, housing costs, DTI, or a fixed monthly budget.",
    },
    twitter: {
      ...baseMeta.twitter,
      title: "House Affordability Calculator - How Much House Can I Afford?",
      description:
        "Estimate how much house you can afford using income, monthly debts, down payment, mortgage rate, housing costs, DTI, or a fixed monthly budget.",
    },
  };
}

export default function HouseAffordabilityCalculatorPage() {
  const { calculate, ...serializableDef } = HOUSE_AFFORDABILITY_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: "House Affordability Calculator - How Much House Can I Afford?",
    description: HOUSE_AFFORDABILITY_CALCULATOR.description,
    slug: HOUSE_AFFORDABILITY_CALCULATOR.slug,
    category: HOUSE_AFFORDABILITY_CALCULATOR.category,
    faqs: HOUSE_AFFORDABILITY_CALCULATOR.faqs,
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
