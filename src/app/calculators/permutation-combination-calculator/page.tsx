import { Metadata } from "next";
import { permutation_combination_calculatorMetadata } from "./metadata";
import { permutation_combination_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = permutation_combination_calculatorMetadata;

export default function PermutationCombinationCalculatorPage() {
  const { calculate, ...serializableDef } = permutation_combination_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: permutation_combination_calculatorConfig.title,
    description: permutation_combination_calculatorConfig.description,
    slug: permutation_combination_calculatorConfig.slug,
    category: permutation_combination_calculatorConfig.category,
    faqs: permutation_combination_calculatorConfig.faqs,
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
