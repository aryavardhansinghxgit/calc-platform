import { Metadata } from "next";
import { ratio_calculatorMetadata } from "./metadata";
import { ratio_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = ratio_calculatorMetadata;

export default function RatioCalculatorPage() {
  const { calculate, ...serializableDef } = ratio_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: ratio_calculatorConfig.title,
    description: ratio_calculatorConfig.description,
    slug: ratio_calculatorConfig.slug,
    category: ratio_calculatorConfig.category,
    faqs: ratio_calculatorConfig.faqs,
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
