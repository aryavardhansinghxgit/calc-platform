import { Metadata } from "next";
import { dti_calculatorMetadata } from "./metadata";
import { dti_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = dti_calculatorMetadata;

export default function DTICalculatorPage() {
  const { calculate, ...serializableDef } = dti_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: dti_calculatorConfig.title,
    description: dti_calculatorConfig.description,
    slug: dti_calculatorConfig.slug,
    category: dti_calculatorConfig.category,
    faqs: dti_calculatorConfig.faqs,
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
