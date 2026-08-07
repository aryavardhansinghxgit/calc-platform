import { Metadata } from "next";
import { density_calculatorMetadata } from "./metadata";
import { density_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = density_calculatorMetadata;

export default function DensityCalculatorPage() {
  const { calculate, ...serializableDef } = density_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: density_calculatorConfig.title,
    description: density_calculatorConfig.description,
    slug: density_calculatorConfig.slug,
    category: density_calculatorConfig.category,
    faqs: density_calculatorConfig.faqs,
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
