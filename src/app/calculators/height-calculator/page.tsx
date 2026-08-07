import { Metadata } from "next";
import { height_calculatorMetadata } from "./metadata";
import { height_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = height_calculatorMetadata;

export default function HeightCalculatorPage() {
  const { calculate, ...serializableDef } = height_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: height_calculatorConfig.title,
    description: height_calculatorConfig.description,
    slug: height_calculatorConfig.slug,
    category: height_calculatorConfig.category,
    faqs: height_calculatorConfig.faqs,
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
