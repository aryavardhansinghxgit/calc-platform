import { Metadata } from "next";
import { downPaymentMetadata } from "./metadata";
import { downPaymentConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = downPaymentMetadata;

export default function DownPaymentCalculatorPage() {
  const { calculate, ...serializableDef } = downPaymentConfig;

  const schemas = generateJsonLdSchema({
    title: downPaymentConfig.title,
    description: downPaymentConfig.description,
    slug: downPaymentConfig.slug,
    category: downPaymentConfig.category,
    faqs: downPaymentConfig.faqs,
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
