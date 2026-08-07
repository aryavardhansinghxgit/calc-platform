import { Metadata } from "next";
import { matrix_calculatorMetadata } from "./metadata";
import { matrix_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = matrix_calculatorMetadata;

export default function MatrixCalculatorPage() {
  const { calculate, ...serializableDef } = matrix_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: matrix_calculatorConfig.title,
    description: matrix_calculatorConfig.description,
    slug: matrix_calculatorConfig.slug,
    category: matrix_calculatorConfig.category,
    faqs: matrix_calculatorConfig.faqs,
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
