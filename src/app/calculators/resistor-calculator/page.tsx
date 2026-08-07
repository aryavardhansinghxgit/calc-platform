import { Metadata } from "next";
import { resistor_calculatorMetadata } from "./metadata";
import { resistor_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = resistor_calculatorMetadata;

export default function ResistorCalculatorPage() {
  const { calculate, ...serializableDef } = resistor_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: resistor_calculatorConfig.title,
    description: resistor_calculatorConfig.description,
    slug: resistor_calculatorConfig.slug,
    category: resistor_calculatorConfig.category,
    faqs: resistor_calculatorConfig.faqs,
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
