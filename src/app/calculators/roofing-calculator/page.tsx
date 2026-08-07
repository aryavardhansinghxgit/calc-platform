import { Metadata } from "next";
import { roofing_calculatorMetadata } from "./metadata";
import { roofing_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = roofing_calculatorMetadata;

export default function RoofingCalculatorPage() {
  const { calculate, ...serializableDef } = roofing_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: roofing_calculatorConfig.title,
    description: roofing_calculatorConfig.description,
    slug: roofing_calculatorConfig.slug,
    category: roofing_calculatorConfig.category,
    faqs: roofing_calculatorConfig.faqs,
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
