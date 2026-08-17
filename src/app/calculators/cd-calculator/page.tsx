import { Metadata } from "next";
import { cdMetadata } from "./metadata";
import { cdConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = cdMetadata;

export default function CdCalculatorPage() {
  const { calculate, ...serializableDef } = cdConfig;

  const schemas = generateJsonLdSchema({
    title: cdConfig.title,
    description: cdConfig.description,
    slug: cdConfig.slug,
    category: cdConfig.category,
    faqs: cdConfig.faqs,
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
