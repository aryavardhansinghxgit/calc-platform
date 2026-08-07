import { Metadata } from "next";
import { sleep_calculatorMetadata } from "./metadata";
import { sleep_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = sleep_calculatorMetadata;

export default function SleepCalculatorPage() {
  const { calculate, ...serializableDef } = sleep_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: sleep_calculatorConfig.title,
    description: sleep_calculatorConfig.description,
    slug: sleep_calculatorConfig.slug,
    category: sleep_calculatorConfig.category,
    faqs: sleep_calculatorConfig.faqs,
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
