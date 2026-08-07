import { Metadata } from "next";
import { protein_calculatorMetadata } from "./metadata";
import { protein_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = protein_calculatorMetadata;

export default function ProteinCalculatorPage() {
  const { calculate, ...serializableDef } = protein_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: protein_calculatorConfig.title,
    description: protein_calculatorConfig.description,
    slug: protein_calculatorConfig.slug,
    category: protein_calculatorConfig.category,
    faqs: protein_calculatorConfig.faqs,
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
