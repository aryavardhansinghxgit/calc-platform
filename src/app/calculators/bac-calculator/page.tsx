import { Metadata } from "next";
import { bac_calculatorMetadata } from "./metadata";
import { bac_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = bac_calculatorMetadata;

export default function BACCalculatorPage() {
  const { calculate, ...serializableDef } = bac_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: bac_calculatorConfig.title,
    description: bac_calculatorConfig.description,
    slug: bac_calculatorConfig.slug,
    category: bac_calculatorConfig.category,
    faqs: bac_calculatorConfig.faqs,
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
