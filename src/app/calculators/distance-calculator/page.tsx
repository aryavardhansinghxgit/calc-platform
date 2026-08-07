import { Metadata } from "next";
import { distance_calculatorMetadata } from "./metadata";
import { distance_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = distance_calculatorMetadata;

export default function DistanceCalculatorPage() {
  const { calculate, ...serializableDef } = distance_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: distance_calculatorConfig.title,
    description: distance_calculatorConfig.description,
    slug: distance_calculatorConfig.slug,
    category: distance_calculatorConfig.category,
    faqs: distance_calculatorConfig.faqs,
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
