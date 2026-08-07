import { Metadata } from "next";
import { healthy_weight_calculatorMetadata } from "./metadata";
import { healthy_weight_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = healthy_weight_calculatorMetadata;

export default function HealthyWeightCalculatorPage() {
  const { calculate, ...serializableDef } = healthy_weight_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: healthy_weight_calculatorConfig.title,
    description: healthy_weight_calculatorConfig.description,
    slug: healthy_weight_calculatorConfig.slug,
    category: healthy_weight_calculatorConfig.category,
    faqs: healthy_weight_calculatorConfig.faqs,
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
