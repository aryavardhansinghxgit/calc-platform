import { Metadata } from "next";
import { number_sequence_calculatorMetadata } from "./metadata";
import { number_sequence_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = number_sequence_calculatorMetadata;

export default function NumberSequenceCalculatorPage() {
  const { calculate, ...serializableDef } = number_sequence_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: number_sequence_calculatorConfig.title,
    description: number_sequence_calculatorConfig.description,
    slug: number_sequence_calculatorConfig.slug,
    category: number_sequence_calculatorConfig.category,
    faqs: number_sequence_calculatorConfig.faqs,
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
