import { Metadata } from "next";
import { one_rep_max_calculatorMetadata } from "./metadata";
import { one_rep_max_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = one_rep_max_calculatorMetadata;

export default function OneRepMaxCalculatorPage() {
  const { calculate, ...serializableDef } = one_rep_max_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: one_rep_max_calculatorConfig.title,
    description: one_rep_max_calculatorConfig.description,
    slug: one_rep_max_calculatorConfig.slug,
    category: one_rep_max_calculatorConfig.category,
    faqs: one_rep_max_calculatorConfig.faqs,
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
