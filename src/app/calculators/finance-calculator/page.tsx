import { Metadata } from "next";
import { financeMetadata } from "./metadata";
import { financeConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = financeMetadata;

export default function FinanceCalculatorPage() {
  const { calculate, ...serializableDef } = financeConfig;

  const schemas = generateJsonLdSchema({
    title: financeConfig.title,
    description: financeConfig.description,
    slug: financeConfig.slug,
    category: financeConfig.category,
    faqs: financeConfig.faqs,
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
