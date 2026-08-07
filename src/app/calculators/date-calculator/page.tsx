import { Metadata } from "next";
import { date_calculatorMetadata } from "./metadata";
import { date_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = date_calculatorMetadata;

export default function DateCalculatorPage() {
  const { calculate, ...serializableDef } = date_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: date_calculatorConfig.title,
    description: date_calculatorConfig.description,
    slug: date_calculatorConfig.slug,
    category: date_calculatorConfig.category,
    faqs: date_calculatorConfig.faqs,
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
