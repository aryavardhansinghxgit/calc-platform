import { Metadata } from "next";
import { speed_calculatorMetadata } from "./metadata";
import { speed_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = speed_calculatorMetadata;

export default function SpeedCalculatorPage() {
  const { calculate, ...serializableDef } = speed_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: speed_calculatorConfig.title,
    description: speed_calculatorConfig.description,
    slug: speed_calculatorConfig.slug,
    category: speed_calculatorConfig.category,
    faqs: speed_calculatorConfig.faqs,
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
