import { Metadata } from "next";
import { ideal_weight_calculatorMetadata } from "./metadata";
import { ideal_weight_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = ideal_weight_calculatorMetadata;

export default function IdealWeightCalculatorPage() {
  const { calculate, ...serializableDef } = ideal_weight_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: ideal_weight_calculatorConfig.title,
    description: ideal_weight_calculatorConfig.description,
    slug: ideal_weight_calculatorConfig.slug,
    category: ideal_weight_calculatorConfig.category,
    faqs: ideal_weight_calculatorConfig.faqs,
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
