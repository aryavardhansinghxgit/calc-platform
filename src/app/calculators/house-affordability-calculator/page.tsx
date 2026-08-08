import { Metadata } from "next";
import { HOUSE_AFFORDABILITY_CALCULATOR } from "@/calculators/finance/house-affordability";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "House Affordability Calculator – How Much House Can I Afford?",
    description: "Calculate maximum home price and loan limits based on household income, DTI ratios (Conventional 28/36, FHA 31/43, VA 41%), property taxes, and monthly budget.",
    slug: HOUSE_AFFORDABILITY_CALCULATOR.slug,
  });
}

export default function HouseAffordabilityCalculatorPage() {
  const { calculate, ...serializableDef } = HOUSE_AFFORDABILITY_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: HOUSE_AFFORDABILITY_CALCULATOR.title,
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
