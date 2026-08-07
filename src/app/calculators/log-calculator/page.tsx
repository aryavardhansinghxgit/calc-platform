import { Metadata } from "next";
import { log_calculatorMetadata } from "./metadata";
import { log_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = log_calculatorMetadata;

export default function LogCalculatorPage() {
  const { calculate, ...serializableDef } = log_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: log_calculatorConfig.title,
    description: log_calculatorConfig.description,
    slug: log_calculatorConfig.slug,
    category: log_calculatorConfig.category,
    faqs: log_calculatorConfig.faqs,
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
