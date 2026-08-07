import { Metadata } from "next";
import { tip_calculatorMetadata } from "./metadata";
import { tip_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = tip_calculatorMetadata;

export default function TipCalculatorPage() {
  const { calculate, ...serializableDef } = tip_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: tip_calculatorConfig.title,
    description: tip_calculatorConfig.description,
    slug: tip_calculatorConfig.slug,
    category: tip_calculatorConfig.category,
    faqs: tip_calculatorConfig.faqs,
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
