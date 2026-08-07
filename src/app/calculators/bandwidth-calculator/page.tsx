import { Metadata } from "next";
import { bandwidth_calculatorMetadata } from "./metadata";
import { bandwidth_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = bandwidth_calculatorMetadata;

export default function BandwidthCalculatorPage() {
  const { calculate, ...serializableDef } = bandwidth_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: bandwidth_calculatorConfig.title,
    description: bandwidth_calculatorConfig.description,
    slug: bandwidth_calculatorConfig.slug,
    category: bandwidth_calculatorConfig.category,
    faqs: bandwidth_calculatorConfig.faqs,
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
