import { Metadata } from "next";
import { interestRateMetadata } from "./metadata";
import { interestRateConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = interestRateMetadata;

export default function InterestRateCalculatorPage() {
  const { calculate, ...serializableDef } = interestRateConfig;

  const schemas = generateJsonLdSchema({
    title: interestRateConfig.title,
    description: interestRateConfig.description,
    slug: interestRateConfig.slug,
    category: interestRateConfig.category,
    faqs: interestRateConfig.faqs,
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
