import { Metadata } from "next";
import { percentage_calculatorMetadata } from "./metadata";
import { percentage_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = percentage_calculatorMetadata;

export default function PercentageCalculatorPage() {
  const { calculate, ...serializableDef } = percentage_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: percentage_calculatorConfig.title,
    description: percentage_calculatorConfig.description,
    slug: percentage_calculatorConfig.slug,
    category: percentage_calculatorConfig.category,
    faqs: percentage_calculatorConfig.faqs,
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
