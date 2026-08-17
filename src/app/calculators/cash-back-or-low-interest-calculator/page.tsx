import { Metadata } from "next";
import { cashBackMetadata } from "./metadata";
import { cashBackConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = cashBackMetadata;

export default function CashBackCalculatorPage() {
  const { calculate, ...serializableDef } = cashBackConfig;

  const schemas = generateJsonLdSchema({
    title: cashBackConfig.title,
    description: cashBackConfig.description,
    slug: cashBackConfig.slug,
    category: cashBackConfig.category,
    faqs: cashBackConfig.faqs,
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
