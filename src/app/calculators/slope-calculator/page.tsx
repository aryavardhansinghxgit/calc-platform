import { Metadata } from "next";
import { slope_calculatorMetadata } from "./metadata";
import { slope_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = slope_calculatorMetadata;

export default function SlopeCalculatorPage() {
  const { calculate, ...serializableDef } = slope_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: slope_calculatorConfig.title,
    description: slope_calculatorConfig.description,
    slug: slope_calculatorConfig.slug,
    category: slope_calculatorConfig.category,
    faqs: slope_calculatorConfig.faqs,
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
