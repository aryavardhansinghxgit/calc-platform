import { Metadata } from "next";
import { fraction_calculatorMetadata } from "./metadata";
import { fraction_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = fraction_calculatorMetadata;

export default function FractionCalculatorPage() {
  const { calculate, CustomComponent, ContentComponent, ...serializableDef } =
    fraction_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: fraction_calculatorConfig.title,
    description: fraction_calculatorConfig.description,
    slug: fraction_calculatorConfig.slug,
    category: fraction_calculatorConfig.category,
    faqs: fraction_calculatorConfig.faqs,
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
