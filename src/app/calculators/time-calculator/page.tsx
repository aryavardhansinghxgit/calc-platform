import { Metadata } from "next";
import { time_calculatorMetadata } from "./metadata";
import { time_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = time_calculatorMetadata;

export default function TimeCalculatorPage() {
  const { calculate, ...serializableDef } = time_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: time_calculatorConfig.title,
    description: time_calculatorConfig.description,
    slug: time_calculatorConfig.slug,
    category: time_calculatorConfig.category,
    faqs: time_calculatorConfig.faqs,
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
