import { Metadata } from "next";
import { gcf_calculatorMetadata } from "./metadata";
import { gcf_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = gcf_calculatorMetadata;

export default function GreatestCommonFactorGCFCalculatorPage() {
  const { calculate, ...serializableDef } = gcf_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: gcf_calculatorConfig.title,
    description: gcf_calculatorConfig.description,
    slug: gcf_calculatorConfig.slug,
    category: gcf_calculatorConfig.category,
    faqs: gcf_calculatorConfig.faqs,
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
