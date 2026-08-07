import { Metadata } from "next";
import { time_card_calculatorMetadata } from "./metadata";
import { time_card_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = time_card_calculatorMetadata;

export default function TimeCardCalculatorPage() {
  const { calculate, ...serializableDef } = time_card_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: time_card_calculatorConfig.title,
    description: time_card_calculatorConfig.description,
    slug: time_card_calculatorConfig.slug,
    category: time_card_calculatorConfig.category,
    faqs: time_card_calculatorConfig.faqs,
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
