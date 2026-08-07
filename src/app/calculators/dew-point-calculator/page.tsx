import { Metadata } from "next";
import { dew_point_calculatorMetadata } from "./metadata";
import { dew_point_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = dew_point_calculatorMetadata;

export default function DewPointCalculatorPage() {
  const { calculate, ...serializableDef } = dew_point_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: dew_point_calculatorConfig.title,
    description: dew_point_calculatorConfig.description,
    slug: dew_point_calculatorConfig.slug,
    category: dew_point_calculatorConfig.category,
    faqs: dew_point_calculatorConfig.faqs,
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
