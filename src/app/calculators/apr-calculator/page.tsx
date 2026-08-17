import { Metadata } from "next";
import { apr_calculatorMetadata } from "./metadata";
import { apr_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = apr_calculatorMetadata;

export default function APRCalculatorPage() {
  const { calculate, ...serializableDef } = apr_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: apr_calculatorConfig.title,
    description: apr_calculatorConfig.description,
    slug: apr_calculatorConfig.slug,
    category: apr_calculatorConfig.category,
    faqs: apr_calculatorConfig.faqs,
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
