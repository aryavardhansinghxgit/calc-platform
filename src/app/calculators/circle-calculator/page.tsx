import { Metadata } from "next";
import { circle_calculatorMetadata } from "./metadata";
import { circle_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = circle_calculatorMetadata;

export default function CircleCalculatorPage() {
  const { calculate, ...serializableDef } = circle_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: circle_calculatorConfig.title,
    description: circle_calculatorConfig.description,
    slug: circle_calculatorConfig.slug,
    category: circle_calculatorConfig.category,
    faqs: circle_calculatorConfig.faqs,
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
