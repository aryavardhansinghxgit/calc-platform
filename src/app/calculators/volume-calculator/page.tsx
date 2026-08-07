import { Metadata } from "next";
import { volume_calculatorMetadata } from "./metadata";
import { volume_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = volume_calculatorMetadata;

export default function VolumeCalculatorPage() {
  const { calculate, ...serializableDef } = volume_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: volume_calculatorConfig.title,
    description: volume_calculatorConfig.description,
    slug: volume_calculatorConfig.slug,
    category: volume_calculatorConfig.category,
    faqs: volume_calculatorConfig.faqs,
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
