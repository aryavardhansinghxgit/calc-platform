import { Metadata } from "next";
import { pregnancy_weight_gain_calculatorMetadata } from "./metadata";
import { pregnancy_weight_gain_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = pregnancy_weight_gain_calculatorMetadata;

export default function PregnancyWeightGainCalculatorPage() {
  const { calculate, ...serializableDef } = pregnancy_weight_gain_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: pregnancy_weight_gain_calculatorConfig.title,
    description: pregnancy_weight_gain_calculatorConfig.description,
    slug: pregnancy_weight_gain_calculatorConfig.slug,
    category: pregnancy_weight_gain_calculatorConfig.category,
    faqs: pregnancy_weight_gain_calculatorConfig.faqs,
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
