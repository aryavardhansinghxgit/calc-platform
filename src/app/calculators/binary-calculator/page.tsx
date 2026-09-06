import { Metadata } from "next";
import { binary_calculatorMetadata } from "./metadata";
import { binary_calculatorConfig } from "./config";
import { binary_calculatorFaqs } from "./faq";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = binary_calculatorMetadata;

export default function BinaryCalculatorPage() {
  const { calculate, ...serializableDef } = binary_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: "Advanced Binary Calculator & Multi-Base Converter",
    description:
      "Free binary calculator for addition, subtraction, multiplication, division, modulo, AND, OR, XOR, NOT and shifts. Convert binary, decimal, hex and bases 2–36 with exact BigInt precision.",
    slug: binary_calculatorConfig.slug,
    category: binary_calculatorConfig.category,
    faqs: binary_calculatorFaqs,
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
