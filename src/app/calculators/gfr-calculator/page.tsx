import { Metadata } from "next";
import { gfr_calculatorMetadata } from "./metadata";
import { gfr_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = gfr_calculatorMetadata;

export default function GFRCalculatorPage() {
  const { calculate, ...serializableDef } = gfr_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: gfr_calculatorConfig.title,
    description: gfr_calculatorConfig.description,
    slug: gfr_calculatorConfig.slug,
    category: gfr_calculatorConfig.category,
    faqs: gfr_calculatorConfig.faqs,
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
