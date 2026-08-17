import { Metadata } from "next";
import { rent_calculatorMetadata } from "./metadata";
import { rent_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = rent_calculatorMetadata;

export default function RentCalculatorPage() {
  const { calculate, ...serializableDef } = rent_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: rent_calculatorConfig.title,
    description: rent_calculatorConfig.description,
    slug: rent_calculatorConfig.slug,
    category: rent_calculatorConfig.category,
    faqs: rent_calculatorConfig.faqs,
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
