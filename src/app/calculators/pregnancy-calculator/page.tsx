import { Metadata } from "next";
import { pregnancy_calculatorMetadata } from "./metadata";
import { pregnancy_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = pregnancy_calculatorMetadata;

export default function PregnancyCalculatorPage() {
  const { calculate, ...serializableDef } = pregnancy_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: pregnancy_calculatorConfig.title,
    description: pregnancy_calculatorConfig.description,
    slug: pregnancy_calculatorConfig.slug,
    category: pregnancy_calculatorConfig.category,
    faqs: pregnancy_calculatorConfig.faqs,
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
