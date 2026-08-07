import { Metadata } from "next";
import { bmr_calculatorMetadata } from "./metadata";
import { bmr_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = bmr_calculatorMetadata;

export default function BMRCalculatorPage() {
  const { calculate, ...serializableDef } = bmr_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: bmr_calculatorConfig.title,
    description: bmr_calculatorConfig.description,
    slug: bmr_calculatorConfig.slug,
    category: bmr_calculatorConfig.category,
    faqs: bmr_calculatorConfig.faqs,
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
