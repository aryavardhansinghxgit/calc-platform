import { Metadata } from "next";
import { root_calculatorMetadata } from "./metadata";
import { root_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = root_calculatorMetadata;

export default function RootCalculatorPage() {
  const { calculate, ...serializableDef } = root_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: root_calculatorConfig.title,
    description: root_calculatorConfig.description,
    slug: root_calculatorConfig.slug,
    category: root_calculatorConfig.category,
    faqs: root_calculatorConfig.faqs,
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
