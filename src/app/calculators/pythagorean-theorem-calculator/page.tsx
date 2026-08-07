import { Metadata } from "next";
import { pythagorean_theorem_calculatorMetadata } from "./metadata";
import { pythagorean_theorem_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = pythagorean_theorem_calculatorMetadata;

export default function PythagoreanTheoremCalculatorPage() {
  const { calculate, ...serializableDef } = pythagorean_theorem_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: pythagorean_theorem_calculatorConfig.title,
    description: pythagorean_theorem_calculatorConfig.description,
    slug: pythagorean_theorem_calculatorConfig.slug,
    category: pythagorean_theorem_calculatorConfig.category,
    faqs: pythagorean_theorem_calculatorConfig.faqs,
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
