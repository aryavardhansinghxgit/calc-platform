import { Metadata } from "next";
import { tdee_calculatorMetadata } from "./metadata";
import { tdee_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = tdee_calculatorMetadata;

export default function TDEECalculatorPage() {
  const { calculate, ...serializableDef } = tdee_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: tdee_calculatorConfig.title,
    description: tdee_calculatorConfig.description,
    slug: tdee_calculatorConfig.slug,
    category: tdee_calculatorConfig.category,
    faqs: tdee_calculatorConfig.faqs,
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
