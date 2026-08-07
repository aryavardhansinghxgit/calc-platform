import { Metadata } from "next";
import { bra_size_calculatorMetadata } from "./metadata";
import { bra_size_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = bra_size_calculatorMetadata;

export default function BraSizeCalculatorPage() {
  const { calculate, ...serializableDef } = bra_size_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: bra_size_calculatorConfig.title,
    description: bra_size_calculatorConfig.description,
    slug: bra_size_calculatorConfig.slug,
    category: bra_size_calculatorConfig.category,
    faqs: bra_size_calculatorConfig.faqs,
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
