import { Metadata } from "next";
import { age_calculatorMetadata } from "./metadata";
import { age_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = age_calculatorMetadata;

export default function AgeCalculatorPage() {
  const { calculate, ...serializableDef } = age_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: age_calculatorConfig.title,
    description: age_calculatorConfig.description,
    slug: age_calculatorConfig.slug,
    category: age_calculatorConfig.category,
    faqs: age_calculatorConfig.faqs,
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
