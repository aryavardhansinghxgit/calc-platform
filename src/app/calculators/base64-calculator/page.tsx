import { Metadata } from "next";
import { base64_calculatorMetadata } from "./metadata";
import { base64_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = base64_calculatorMetadata;

export default function Base64EncodeDecodePage() {
  const { calculate, ...serializableDef } = base64_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: base64_calculatorConfig.title,
    description: base64_calculatorConfig.description,
    slug: base64_calculatorConfig.slug,
    category: base64_calculatorConfig.category,
    faqs: base64_calculatorConfig.faqs,
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
