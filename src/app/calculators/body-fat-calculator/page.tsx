import { Metadata } from "next";
import { body_fat_calculatorMetadata } from "./metadata";
import { body_fat_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = body_fat_calculatorMetadata;

export default function BodyFatCalculatorPage() {
  const { calculate, ...serializableDef } = body_fat_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: body_fat_calculatorConfig.title,
    description: body_fat_calculatorConfig.description,
    slug: body_fat_calculatorConfig.slug,
    category: body_fat_calculatorConfig.category,
    faqs: body_fat_calculatorConfig.faqs,
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
