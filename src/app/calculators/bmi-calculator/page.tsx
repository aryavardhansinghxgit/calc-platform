import { Metadata } from "next";
import { bmi_calculatorMetadata } from "./metadata";
import { bmi_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = bmi_calculatorMetadata;

export default function BMICalculatorPage() {
  const { calculate, ...serializableDef } = bmi_calculatorConfig;

  // Basic schemas generated from platform helpers
  const baseSchemas = generateJsonLdSchema({
    title: bmi_calculatorConfig.title,
    description: bmi_calculatorConfig.description,
    slug: bmi_calculatorConfig.slug,
    category: bmi_calculatorConfig.category,
    faqs: bmi_calculatorConfig.faqs,
  });

  const allSchemas = baseSchemas;

  return (
    <>
      {allSchemas.map((schema, i) => (
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
