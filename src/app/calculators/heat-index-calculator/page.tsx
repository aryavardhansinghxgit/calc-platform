import { Metadata } from "next";
import { heat_index_calculatorMetadata } from "./metadata";
import { heat_index_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = heat_index_calculatorMetadata;

export default function HeatIndexCalculatorPage() {
  const { calculate, ...serializableDef } = heat_index_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: heat_index_calculatorConfig.title,
    description: heat_index_calculatorConfig.description,
    slug: heat_index_calculatorConfig.slug,
    category: heat_index_calculatorConfig.category,
    faqs: heat_index_calculatorConfig.faqs,
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
