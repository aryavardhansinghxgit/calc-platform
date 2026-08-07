import { Metadata } from "next";
import { fuel_cost_calculatorMetadata } from "./metadata";
import { fuel_cost_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = fuel_cost_calculatorMetadata;

export default function FuelCostCalculatorPage() {
  const { calculate, ...serializableDef } = fuel_cost_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: fuel_cost_calculatorConfig.title,
    description: fuel_cost_calculatorConfig.description,
    slug: fuel_cost_calculatorConfig.slug,
    category: fuel_cost_calculatorConfig.category,
    faqs: fuel_cost_calculatorConfig.faqs,
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
