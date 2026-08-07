import { Metadata } from "next";
import { electricity_calculatorMetadata } from "./metadata";
import { electricity_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = electricity_calculatorMetadata;

export default function ElectricityCalculatorPage() {
  const { calculate, ...serializableDef } = electricity_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: electricity_calculatorConfig.title,
    description: electricity_calculatorConfig.description,
    slug: electricity_calculatorConfig.slug,
    category: electricity_calculatorConfig.category,
    faqs: electricity_calculatorConfig.faqs,
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
