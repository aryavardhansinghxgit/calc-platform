import { Metadata } from "next";
import { triangle_calculatorMetadata } from "./metadata";
import { triangle_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = triangle_calculatorMetadata;

export default function TriangleCalculatorPage() {
  const { calculate, ...serializableDef } = triangle_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: triangle_calculatorConfig.title,
    description: triangle_calculatorConfig.description,
    slug: triangle_calculatorConfig.slug,
    category: triangle_calculatorConfig.category,
    faqs: triangle_calculatorConfig.faqs,
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
