import { Metadata } from "next";
import { roman_numeral_converterMetadata } from "./metadata";
import { roman_numeral_converterConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = roman_numeral_converterMetadata;

export default function RomanNumeralConverterPage() {
  const { calculate, ...serializableDef } = roman_numeral_converterConfig;
  const schemas = generateJsonLdSchema({
    title: roman_numeral_converterConfig.title,
    description: roman_numeral_converterConfig.description,
    slug: roman_numeral_converterConfig.slug,
    category: roman_numeral_converterConfig.category,
    faqs: roman_numeral_converterConfig.faqs,
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
