import { Metadata } from "next";
import { mileage_calculatorMetadata } from "./metadata";
import { mileage_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = mileage_calculatorMetadata;

export default function MileageCalculatorPage() {
  const { calculate, ...serializableDef } = mileage_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: mileage_calculatorConfig.title,
    description: mileage_calculatorConfig.description,
    slug: mileage_calculatorConfig.slug,
    category: mileage_calculatorConfig.category,
    faqs: mileage_calculatorConfig.faqs,
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
