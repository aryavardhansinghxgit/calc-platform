import { Metadata } from "next";
import { weight_calculatorMetadata } from "./metadata";
import { weight_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = weight_calculatorMetadata;

export default function WeightCalculatorPage() {
  const { calculate, ...serializableDef } = weight_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: weight_calculatorConfig.title,
    description: weight_calculatorConfig.description,
    slug: weight_calculatorConfig.slug,
    category: weight_calculatorConfig.category,
    faqs: weight_calculatorConfig.faqs,
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
