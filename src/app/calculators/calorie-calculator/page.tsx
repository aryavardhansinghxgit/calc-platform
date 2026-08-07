import { Metadata } from "next";
import { calorie_calculatorMetadata } from "./metadata";
import { calorie_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = calorie_calculatorMetadata;

export default function CalorieCalculatorPage() {
  const { calculate, ...serializableDef } = calorie_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: calorie_calculatorConfig.title,
    description: calorie_calculatorConfig.description,
    slug: calorie_calculatorConfig.slug,
    category: calorie_calculatorConfig.category,
    faqs: calorie_calculatorConfig.faqs,
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
