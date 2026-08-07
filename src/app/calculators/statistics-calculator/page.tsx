import { Metadata } from "next";
import { statistics_calculatorMetadata } from "./metadata";
import { statistics_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = statistics_calculatorMetadata;

export default function StatisticsCalculatorPage() {
  const { calculate, ...serializableDef } = statistics_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: statistics_calculatorConfig.title,
    description: statistics_calculatorConfig.description,
    slug: statistics_calculatorConfig.slug,
    category: statistics_calculatorConfig.category,
    faqs: statistics_calculatorConfig.faqs,
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
