import { Metadata } from "next";
import { day_counter_calculatorMetadata } from "./metadata";
import { day_counter_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = day_counter_calculatorMetadata;

export default function DayCounterPage() {
  const { calculate, ...serializableDef } = day_counter_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: day_counter_calculatorConfig.title,
    description: day_counter_calculatorConfig.description,
    slug: day_counter_calculatorConfig.slug,
    category: day_counter_calculatorConfig.category,
    faqs: day_counter_calculatorConfig.faqs,
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
