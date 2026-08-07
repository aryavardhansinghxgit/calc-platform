import { Metadata } from "next";
import { ohms_law_calculatorMetadata } from "./metadata";
import { ohms_law_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = ohms_law_calculatorMetadata;

export default function OhmsLawCalculatorPage() {
  const { calculate, ...serializableDef } = ohms_law_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: ohms_law_calculatorConfig.title,
    description: ohms_law_calculatorConfig.description,
    slug: ohms_law_calculatorConfig.slug,
    category: ohms_law_calculatorConfig.category,
    faqs: ohms_law_calculatorConfig.faqs,
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
