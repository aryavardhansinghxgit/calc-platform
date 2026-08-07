import { Metadata } from "next";
import { voltage_drop_calculatorMetadata } from "./metadata";
import { voltage_drop_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = voltage_drop_calculatorMetadata;

export default function VoltageDropCalculatorPage() {
  const { calculate, ...serializableDef } = voltage_drop_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: voltage_drop_calculatorConfig.title,
    description: voltage_drop_calculatorConfig.description,
    slug: voltage_drop_calculatorConfig.slug,
    category: voltage_drop_calculatorConfig.category,
    faqs: voltage_drop_calculatorConfig.faqs,
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
