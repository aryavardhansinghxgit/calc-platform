import { Metadata } from "next";
import { love_calculatorMetadata } from "./metadata";
import { love_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = love_calculatorMetadata;

export default function LoveCalculatorPage() {
  const { calculate, ...serializableDef } = love_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: love_calculatorConfig.title,
    description: love_calculatorConfig.description,
    slug: love_calculatorConfig.slug,
    category: love_calculatorConfig.category,
    faqs: love_calculatorConfig.faqs,
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
