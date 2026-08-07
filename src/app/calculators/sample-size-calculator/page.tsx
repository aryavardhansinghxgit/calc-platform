import { Metadata } from "next";
import { sample_size_calculatorMetadata } from "./metadata";
import { sample_size_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = sample_size_calculatorMetadata;

export default function SampleSizeCalculatorPage() {
  const { calculate, ...serializableDef } = sample_size_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: sample_size_calculatorConfig.title,
    description: sample_size_calculatorConfig.description,
    slug: sample_size_calculatorConfig.slug,
    category: sample_size_calculatorConfig.category,
    faqs: sample_size_calculatorConfig.faqs,
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
