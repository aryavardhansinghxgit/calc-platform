import { Metadata } from "next";
import { scientific_calculatorMetadata } from "./metadata";
import { scientific_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = scientific_calculatorMetadata;

export default function ScientificCalculatorPage() {
  const { calculate, CustomComponent, ContentComponent, ...serializableDef } =
    scientific_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: scientific_calculatorConfig.title,
    description: scientific_calculatorConfig.description,
    slug: scientific_calculatorConfig.slug,
    category: scientific_calculatorConfig.category,
    faqs: scientific_calculatorConfig.faqs,
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
