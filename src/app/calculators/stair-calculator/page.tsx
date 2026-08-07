import { Metadata } from "next";
import { stair_calculatorMetadata } from "./metadata";
import { stair_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = stair_calculatorMetadata;

export default function StairCalculatorPage() {
  const { calculate, ...serializableDef } = stair_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: stair_calculatorConfig.title,
    description: stair_calculatorConfig.description,
    slug: stair_calculatorConfig.slug,
    category: stair_calculatorConfig.category,
    faqs: stair_calculatorConfig.faqs,
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
