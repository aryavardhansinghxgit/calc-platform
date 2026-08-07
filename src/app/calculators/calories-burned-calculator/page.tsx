import { Metadata } from "next";
import { calories_burned_calculatorMetadata } from "./metadata";
import { calories_burned_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = calories_burned_calculatorMetadata;

export default function CaloriesBurnedCalculatorPage() {
  const { calculate, ...serializableDef } = calories_burned_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: calories_burned_calculatorConfig.title,
    description: calories_burned_calculatorConfig.description,
    slug: calories_burned_calculatorConfig.slug,
    category: calories_burned_calculatorConfig.category,
    faqs: calories_burned_calculatorConfig.faqs,
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
