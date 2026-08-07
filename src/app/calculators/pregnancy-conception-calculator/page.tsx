import { Metadata } from "next";
import { pregnancy_conception_calculatorMetadata } from "./metadata";
import { pregnancy_conception_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = pregnancy_conception_calculatorMetadata;

export default function PregnancyConceptionCalculatorPage() {
  const { calculate, ...serializableDef } = pregnancy_conception_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: pregnancy_conception_calculatorConfig.title,
    description: pregnancy_conception_calculatorConfig.description,
    slug: pregnancy_conception_calculatorConfig.slug,
    category: pregnancy_conception_calculatorConfig.category,
    faqs: pregnancy_conception_calculatorConfig.faqs,
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
