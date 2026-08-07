import { Metadata } from "next";
import { probability_calculatorMetadata } from "./metadata";
import { probability_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = probability_calculatorMetadata;

export default function ProbabilityCalculatorPage() {
  const { calculate, ...serializableDef } = probability_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: probability_calculatorConfig.title,
    description: probability_calculatorConfig.description,
    slug: probability_calculatorConfig.slug,
    category: probability_calculatorConfig.category,
    faqs: probability_calculatorConfig.faqs,
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
