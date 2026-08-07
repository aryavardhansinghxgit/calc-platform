import { Metadata } from "next";
import { hex_calculatorMetadata } from "./metadata";
import { hex_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = hex_calculatorMetadata;

export default function HexCalculatorPage() {
  const { calculate, ...serializableDef } = hex_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: hex_calculatorConfig.title,
    description: hex_calculatorConfig.description,
    slug: hex_calculatorConfig.slug,
    category: hex_calculatorConfig.category,
    faqs: hex_calculatorConfig.faqs,
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
