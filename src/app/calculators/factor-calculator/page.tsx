import { Metadata } from "next";
import { factor_calculatorMetadata } from "./metadata";
import { factor_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = factor_calculatorMetadata;

export default function FactorCalculatorPage() {
  const { calculate, ...serializableDef } = factor_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: factor_calculatorConfig.title,
    description: factor_calculatorConfig.description,
    slug: factor_calculatorConfig.slug,
    category: factor_calculatorConfig.category,
    faqs: factor_calculatorConfig.faqs,
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
