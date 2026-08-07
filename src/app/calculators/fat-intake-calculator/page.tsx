import { Metadata } from "next";
import { fat_intake_calculatorMetadata } from "./metadata";
import { fat_intake_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = fat_intake_calculatorMetadata;

export default function FatIntakeCalculatorPage() {
  const { calculate, ...serializableDef } = fat_intake_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: fat_intake_calculatorConfig.title,
    description: fat_intake_calculatorConfig.description,
    slug: fat_intake_calculatorConfig.slug,
    category: fat_intake_calculatorConfig.category,
    faqs: fat_intake_calculatorConfig.faqs,
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
