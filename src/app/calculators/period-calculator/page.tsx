import { Metadata } from "next";
import { period_calculatorMetadata } from "./metadata";
import { period_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = period_calculatorMetadata;

export default function PeriodCalculatorPage() {
  const { calculate, ...serializableDef } = period_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: period_calculatorConfig.title,
    description: period_calculatorConfig.description,
    slug: period_calculatorConfig.slug,
    category: period_calculatorConfig.category,
    faqs: period_calculatorConfig.faqs,
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
