import { Metadata } from "next";
import { hours_calculatorMetadata } from "./metadata";
import { hours_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = hours_calculatorMetadata;

export default function HoursCalculatorPage() {
  const { calculate, ...serializableDef } = hours_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: hours_calculatorConfig.title,
    description: hours_calculatorConfig.description,
    slug: hours_calculatorConfig.slug,
    category: hours_calculatorConfig.category,
    faqs: hours_calculatorConfig.faqs,
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
