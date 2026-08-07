import { Metadata } from "next";
import { quadratic_formula_calculatorMetadata } from "./metadata";
import { quadratic_formula_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = quadratic_formula_calculatorMetadata;

export default function QuadraticFormulaCalculatorPage() {
  const { calculate, ...serializableDef } = quadratic_formula_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: quadratic_formula_calculatorConfig.title,
    description: quadratic_formula_calculatorConfig.description,
    slug: quadratic_formula_calculatorConfig.slug,
    category: quadratic_formula_calculatorConfig.category,
    faqs: quadratic_formula_calculatorConfig.faqs,
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
