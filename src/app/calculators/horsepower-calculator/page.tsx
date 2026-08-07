import { Metadata } from "next";
import { horsepower_calculatorMetadata } from "./metadata";
import { horsepower_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = horsepower_calculatorMetadata;

export default function HorsepowerCalculatorPage() {
  const { calculate, ...serializableDef } = horsepower_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: horsepower_calculatorConfig.title,
    description: horsepower_calculatorConfig.description,
    slug: horsepower_calculatorConfig.slug,
    category: horsepower_calculatorConfig.category,
    faqs: horsepower_calculatorConfig.faqs,
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
