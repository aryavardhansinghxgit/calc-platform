import { Metadata } from "next";
import { macro_calculatorMetadata } from "./metadata";
import { macro_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = macro_calculatorMetadata;

export default function MacroCalculatorPage() {
  const { calculate, ...serializableDef } = macro_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: macro_calculatorConfig.title,
    description: macro_calculatorConfig.description,
    slug: macro_calculatorConfig.slug,
    category: macro_calculatorConfig.category,
    faqs: macro_calculatorConfig.faqs,
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
