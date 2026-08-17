import { Metadata } from "next";
import { va_mortgageMetadata } from "./metadata";
import { va_mortgageConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = va_mortgageMetadata;

export default function VAMortgageCalculatorPage() {
  const { calculate, ...serializableDef } = va_mortgageConfig;

  const schemas = generateJsonLdSchema({
    title: va_mortgageConfig.title,
    description: va_mortgageConfig.description,
    slug: va_mortgageConfig.slug,
    category: va_mortgageConfig.category,
    faqs: va_mortgageConfig.faqs,
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
