import { Metadata } from "next";
import { due_date_calculatorMetadata } from "./metadata";
import { due_date_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = due_date_calculatorMetadata;

export default function DueDateCalculatorPage() {
  const { calculate, ...serializableDef } = due_date_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: due_date_calculatorConfig.title,
    description: due_date_calculatorConfig.description,
    slug: due_date_calculatorConfig.slug,
    category: due_date_calculatorConfig.category,
    faqs: due_date_calculatorConfig.faqs,
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
