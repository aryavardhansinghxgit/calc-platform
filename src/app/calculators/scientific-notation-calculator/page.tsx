import { Metadata } from "next";
import { scientific_notation_calculatorMetadata } from "./metadata";
import { scientific_notation_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = scientific_notation_calculatorMetadata;

export default function ScientificNotationCalculatorPage() {
  const { calculate, ...serializableDef } = scientific_notation_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: scientific_notation_calculatorConfig.title,
    description: scientific_notation_calculatorConfig.description,
    slug: scientific_notation_calculatorConfig.slug,
    category: scientific_notation_calculatorConfig.category,
    faqs: scientific_notation_calculatorConfig.faqs,
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
