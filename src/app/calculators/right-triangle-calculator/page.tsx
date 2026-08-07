import { Metadata } from "next";
import { right_triangle_calculatorMetadata } from "./metadata";
import { right_triangle_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = right_triangle_calculatorMetadata;

export default function RightTriangleCalculatorPage() {
  const { calculate, ...serializableDef } = right_triangle_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: right_triangle_calculatorConfig.title,
    description: right_triangle_calculatorConfig.description,
    slug: right_triangle_calculatorConfig.slug,
    category: right_triangle_calculatorConfig.category,
    faqs: right_triangle_calculatorConfig.faqs,
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
