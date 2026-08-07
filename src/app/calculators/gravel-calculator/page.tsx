import { Metadata } from "next";
import { gravel_calculatorMetadata } from "./metadata";
import { gravel_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = gravel_calculatorMetadata;

export default function GravelCalculatorPage() {
  const { calculate, ...serializableDef } = gravel_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: gravel_calculatorConfig.title,
    description: gravel_calculatorConfig.description,
    slug: gravel_calculatorConfig.slug,
    category: gravel_calculatorConfig.category,
    faqs: gravel_calculatorConfig.faqs,
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
