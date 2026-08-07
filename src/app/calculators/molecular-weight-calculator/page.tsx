import { Metadata } from "next";
import { molecular_weight_calculatorMetadata } from "./metadata";
import { molecular_weight_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = molecular_weight_calculatorMetadata;

export default function MolecularWeightCalculatorPage() {
  const { calculate, ...serializableDef } = molecular_weight_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: molecular_weight_calculatorConfig.title,
    description: molecular_weight_calculatorConfig.description,
    slug: molecular_weight_calculatorConfig.slug,
    category: molecular_weight_calculatorConfig.category,
    faqs: molecular_weight_calculatorConfig.faqs,
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
