import { Metadata } from "next";
import { target_heart_rate_calculatorMetadata } from "./metadata";
import { target_heart_rate_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = target_heart_rate_calculatorMetadata;

export default function TargetHeartRateCalculatorPage() {
  const { calculate, ...serializableDef } = target_heart_rate_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: target_heart_rate_calculatorConfig.title,
    description: target_heart_rate_calculatorConfig.description,
    slug: target_heart_rate_calculatorConfig.slug,
    category: target_heart_rate_calculatorConfig.category,
    faqs: target_heart_rate_calculatorConfig.faqs,
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
