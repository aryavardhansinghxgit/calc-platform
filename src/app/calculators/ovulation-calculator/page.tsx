import { Metadata } from "next";
import { ovulation_calculatorMetadata } from "./metadata";
import { ovulation_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = ovulation_calculatorMetadata;

export default function OvulationCalculatorPage() {
  const { calculate, ...serializableDef } = ovulation_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: ovulation_calculatorConfig.title,
    description: ovulation_calculatorConfig.description,
    slug: ovulation_calculatorConfig.slug,
    category: ovulation_calculatorConfig.category,
    faqs: ovulation_calculatorConfig.faqs,
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
