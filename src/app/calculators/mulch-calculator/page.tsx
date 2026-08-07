import { Metadata } from "next";
import { mulch_calculatorMetadata } from "./metadata";
import { mulch_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = mulch_calculatorMetadata;

export default function MulchCalculatorPage() {
  const { calculate, ...serializableDef } = mulch_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: mulch_calculatorConfig.title,
    description: mulch_calculatorConfig.description,
    slug: mulch_calculatorConfig.slug,
    category: mulch_calculatorConfig.category,
    faqs: mulch_calculatorConfig.faqs,
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
