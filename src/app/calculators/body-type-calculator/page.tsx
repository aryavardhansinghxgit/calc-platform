import { Metadata } from "next";
import { body_type_calculatorMetadata } from "./metadata";
import { body_type_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = body_type_calculatorMetadata;

export default function BodyTypeCalculatorPage() {
  const { calculate, ...serializableDef } = body_type_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: body_type_calculatorConfig.title,
    description: body_type_calculatorConfig.description,
    slug: body_type_calculatorConfig.slug,
    category: body_type_calculatorConfig.category,
    faqs: body_type_calculatorConfig.faqs,
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
