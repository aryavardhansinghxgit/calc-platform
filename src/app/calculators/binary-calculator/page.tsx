import { Metadata } from "next";
import { binary_calculatorMetadata } from "./metadata";
import { binary_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = binary_calculatorMetadata;

export default function BinaryCalculatorPage() {
  const { calculate, ...serializableDef } = binary_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: binary_calculatorConfig.title,
    description: binary_calculatorConfig.description,
    slug: binary_calculatorConfig.slug,
    category: binary_calculatorConfig.category,
    faqs: binary_calculatorConfig.faqs,
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
