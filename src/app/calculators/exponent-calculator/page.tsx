import { Metadata } from "next";
import { exponent_calculatorMetadata } from "./metadata";
import { exponent_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = exponent_calculatorMetadata;

export default function ExponentCalculatorPage() {
  const { calculate, ...serializableDef } = exponent_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: exponent_calculatorConfig.title,
    description: exponent_calculatorConfig.description,
    slug: exponent_calculatorConfig.slug,
    category: exponent_calculatorConfig.category,
    faqs: exponent_calculatorConfig.faqs,
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
