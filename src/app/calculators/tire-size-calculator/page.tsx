import { Metadata } from "next";
import { tire_size_calculatorMetadata } from "./metadata";
import { tire_size_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = tire_size_calculatorMetadata;

export default function TireSizeCalculatorPage() {
  const { calculate, ...serializableDef } = tire_size_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: tire_size_calculatorConfig.title,
    description: tire_size_calculatorConfig.description,
    slug: tire_size_calculatorConfig.slug,
    category: tire_size_calculatorConfig.category,
    faqs: tire_size_calculatorConfig.faqs,
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
