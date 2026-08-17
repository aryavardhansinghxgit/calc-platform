import { Metadata } from "next";
import { rentVsBuyMetadata } from "./metadata";
import { rentVsBuyConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = rentVsBuyMetadata;

export default function RentVsBuyCalculatorPage() {
  const { calculate, ...serializableDef } = rentVsBuyConfig;

  const schemas = generateJsonLdSchema({
    title: rentVsBuyConfig.title,
    description: rentVsBuyConfig.description,
    slug: rentVsBuyConfig.slug,
    category: rentVsBuyConfig.category,
    faqs: rentVsBuyConfig.faqs,
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
