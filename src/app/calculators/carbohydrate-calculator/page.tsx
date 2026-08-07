import { Metadata } from "next";
import { carbohydrate_calculatorMetadata } from "./metadata";
import { carbohydrate_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = carbohydrate_calculatorMetadata;

export default function CarbohydrateCalculatorPage() {
  const { calculate, ...serializableDef } = carbohydrate_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: carbohydrate_calculatorConfig.title,
    description: carbohydrate_calculatorConfig.description,
    slug: carbohydrate_calculatorConfig.slug,
    category: carbohydrate_calculatorConfig.category,
    faqs: carbohydrate_calculatorConfig.faqs,
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
