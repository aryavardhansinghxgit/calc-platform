import { Metadata } from "next";
import { rounding_calculatorMetadata } from "./metadata";
import { rounding_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = rounding_calculatorMetadata;

export default function RoundingCalculatorPage() {
  const { calculate, ...serializableDef } = rounding_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: rounding_calculatorConfig.title,
    description: rounding_calculatorConfig.description,
    slug: rounding_calculatorConfig.slug,
    category: rounding_calculatorConfig.category,
    faqs: rounding_calculatorConfig.faqs,
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
