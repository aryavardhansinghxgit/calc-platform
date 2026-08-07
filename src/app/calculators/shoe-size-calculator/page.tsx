import { Metadata } from "next";
import { shoe_size_calculatorMetadata } from "./metadata";
import { shoe_size_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = shoe_size_calculatorMetadata;

export default function ShoeSizeConversionCalculatorPage() {
  const { calculate, ...serializableDef } = shoe_size_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: shoe_size_calculatorConfig.title,
    description: shoe_size_calculatorConfig.description,
    slug: shoe_size_calculatorConfig.slug,
    category: shoe_size_calculatorConfig.category,
    faqs: shoe_size_calculatorConfig.faqs,
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
