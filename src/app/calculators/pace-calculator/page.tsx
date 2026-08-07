import { Metadata } from "next";
import { pace_calculatorMetadata } from "./metadata";
import { pace_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = pace_calculatorMetadata;

export default function PaceCalculatorPage() {
  const { calculate, ...serializableDef } = pace_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: pace_calculatorConfig.title,
    description: pace_calculatorConfig.description,
    slug: pace_calculatorConfig.slug,
    category: pace_calculatorConfig.category,
    faqs: pace_calculatorConfig.faqs,
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
