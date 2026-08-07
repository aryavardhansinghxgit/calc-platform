import { Metadata } from "next";
import { btu_calculatorMetadata } from "./metadata";
import { btu_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = btu_calculatorMetadata;

export default function BTUCalculatorPage() {
  const { calculate, ...serializableDef } = btu_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: btu_calculatorConfig.title,
    description: btu_calculatorConfig.description,
    slug: btu_calculatorConfig.slug,
    category: btu_calculatorConfig.category,
    faqs: btu_calculatorConfig.faqs,
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
