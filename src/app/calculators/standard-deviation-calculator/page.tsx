import { Metadata } from "next";
import { standard_deviation_calculatorMetadata } from "./metadata";
import { standard_deviation_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = standard_deviation_calculatorMetadata;

export default function StandardDeviationCalculatorPage() {
  const { calculate, ...serializableDef } = standard_deviation_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: standard_deviation_calculatorConfig.title,
    description: standard_deviation_calculatorConfig.description,
    slug: standard_deviation_calculatorConfig.slug,
    category: standard_deviation_calculatorConfig.category,
    faqs: standard_deviation_calculatorConfig.faqs,
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
