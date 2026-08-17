import { Metadata } from "next";
import { home_equityMetadata } from "./metadata";
import { home_equityConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = home_equityMetadata;

export default function HomeEquityCalculatorPage() {
  const { calculate, ...serializableDef } = home_equityConfig;

  const schemas = generateJsonLdSchema({
    title: home_equityConfig.title,
    description: home_equityConfig.description,
    slug: home_equityConfig.slug,
    category: home_equityConfig.category,
    faqs: home_equityConfig.faqs,
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
