import { Metadata } from "next";
import { square_footage_calculatorMetadata } from "./metadata";
import { square_footage_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = square_footage_calculatorMetadata;

export default function SquareFootageCalculatorPage() {
  const { calculate, ...serializableDef } = square_footage_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: square_footage_calculatorConfig.title,
    description: square_footage_calculatorConfig.description,
    slug: square_footage_calculatorConfig.slug,
    category: square_footage_calculatorConfig.category,
    faqs: square_footage_calculatorConfig.faqs,
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
