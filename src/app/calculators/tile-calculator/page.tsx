import { Metadata } from "next";
import { tile_calculatorMetadata } from "./metadata";
import { tile_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = tile_calculatorMetadata;

export default function TileCalculatorPage() {
  const { calculate, ...serializableDef } = tile_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: tile_calculatorConfig.title,
    description: tile_calculatorConfig.description,
    slug: tile_calculatorConfig.slug,
    category: tile_calculatorConfig.category,
    faqs: tile_calculatorConfig.faqs,
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
