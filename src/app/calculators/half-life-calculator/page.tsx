import { Metadata } from "next";
import { half_life_calculatorMetadata } from "./metadata";
import { half_life_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = half_life_calculatorMetadata;

export default function HalfLifeCalculatorPage() {
  const { calculate, ...serializableDef } = half_life_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: half_life_calculatorConfig.title,
    description: half_life_calculatorConfig.description,
    slug: half_life_calculatorConfig.slug,
    category: half_life_calculatorConfig.category,
    faqs: half_life_calculatorConfig.faqs,
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
