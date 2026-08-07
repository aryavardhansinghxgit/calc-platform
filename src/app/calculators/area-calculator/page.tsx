import { Metadata } from "next";
import { area_calculatorMetadata } from "./metadata";
import { area_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = area_calculatorMetadata;

export default function AreaCalculatorPage() {
  const { calculate, ...serializableDef } = area_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: area_calculatorConfig.title,
    description: area_calculatorConfig.description,
    slug: area_calculatorConfig.slug,
    category: area_calculatorConfig.category,
    faqs: area_calculatorConfig.faqs,
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
