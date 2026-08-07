import { Metadata } from "next";
import { conception_calculatorMetadata } from "./metadata";
import { conception_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = conception_calculatorMetadata;

export default function ConceptionCalculatorPage() {
  const { calculate, ...serializableDef } = conception_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: conception_calculatorConfig.title,
    description: conception_calculatorConfig.description,
    slug: conception_calculatorConfig.slug,
    category: conception_calculatorConfig.category,
    faqs: conception_calculatorConfig.faqs,
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
