import { Metadata } from "next";
import { time_duration_calculatorMetadata } from "./metadata";
import { time_duration_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = time_duration_calculatorMetadata;

export default function TimeDurationCalculatorPage() {
  const { calculate, ...serializableDef } = time_duration_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: time_duration_calculatorConfig.title,
    description: time_duration_calculatorConfig.description,
    slug: time_duration_calculatorConfig.slug,
    category: time_duration_calculatorConfig.category,
    faqs: time_duration_calculatorConfig.faqs,
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
