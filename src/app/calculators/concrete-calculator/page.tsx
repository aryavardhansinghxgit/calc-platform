import { Metadata } from "next";
import { concrete_calculatorMetadata } from "./metadata";
import { concrete_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = concrete_calculatorMetadata;

export default function ConcreteCalculatorPage() {
  const { calculate, ...serializableDef } = concrete_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: concrete_calculatorConfig.title,
    description: concrete_calculatorConfig.description,
    slug: concrete_calculatorConfig.slug,
    category: concrete_calculatorConfig.category,
    faqs: concrete_calculatorConfig.faqs,
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
