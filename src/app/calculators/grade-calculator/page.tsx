import { Metadata } from "next";
import { grade_calculatorMetadata } from "./metadata";
import { grade_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = grade_calculatorMetadata;

export default function GradeCalculatorPage() {
  const { calculate, ...serializableDef } = grade_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: grade_calculatorConfig.title,
    description: grade_calculatorConfig.description,
    slug: grade_calculatorConfig.slug,
    category: grade_calculatorConfig.category,
    faqs: grade_calculatorConfig.faqs,
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
