import { Metadata } from "next";
import { confidence_interval_calculatorMetadata } from "./metadata";
import { confidence_interval_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = confidence_interval_calculatorMetadata;

export default function ConfidenceIntervalCalculatorPage() {
  const { calculate, ...serializableDef } = confidence_interval_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: confidence_interval_calculatorConfig.title,
    description: confidence_interval_calculatorConfig.description,
    slug: confidence_interval_calculatorConfig.slug,
    category: confidence_interval_calculatorConfig.category,
    faqs: confidence_interval_calculatorConfig.faqs,
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
