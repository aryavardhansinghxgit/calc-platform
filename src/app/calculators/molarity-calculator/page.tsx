import { Metadata } from "next";
import { molarity_calculatorMetadata } from "./metadata";
import { molarity_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = molarity_calculatorMetadata;

export default function MolarityCalculatorPage() {
  const { calculate, ...serializableDef } = molarity_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: molarity_calculatorConfig.title,
    description: molarity_calculatorConfig.description,
    slug: molarity_calculatorConfig.slug,
    category: molarity_calculatorConfig.category,
    faqs: molarity_calculatorConfig.faqs,
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
