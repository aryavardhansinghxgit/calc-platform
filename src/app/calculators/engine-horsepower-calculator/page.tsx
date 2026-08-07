import { Metadata } from "next";
import { engine_horsepower_calculatorMetadata } from "./metadata";
import { engine_horsepower_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = engine_horsepower_calculatorMetadata;

export default function EngineHorsepowerCalculatorPage() {
  const { calculate, ...serializableDef } = engine_horsepower_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: engine_horsepower_calculatorConfig.title,
    description: engine_horsepower_calculatorConfig.description,
    slug: engine_horsepower_calculatorConfig.slug,
    category: engine_horsepower_calculatorConfig.category,
    faqs: engine_horsepower_calculatorConfig.faqs,
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
