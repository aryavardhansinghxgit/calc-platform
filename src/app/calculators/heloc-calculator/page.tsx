import { Metadata } from "next";
import { helocMetadata } from "./metadata";
import { helocConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = helocMetadata;

export default function HELOCCalculatorPage() {
  const { calculate, ...serializableDef } = helocConfig;

  const schemas = generateJsonLdSchema({
    title: helocConfig.title,
    description: helocConfig.description,
    slug: helocConfig.slug,
    category: helocConfig.category,
    faqs: helocConfig.faqs,
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
