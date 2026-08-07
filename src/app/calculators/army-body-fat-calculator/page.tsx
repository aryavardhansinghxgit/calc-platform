import { Metadata } from "next";
import { army_body_fat_calculatorMetadata } from "./metadata";
import { army_body_fat_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = army_body_fat_calculatorMetadata;

export default function ArmyBodyFatCalculatorPage() {
  const { calculate, ...serializableDef } = army_body_fat_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: army_body_fat_calculatorConfig.title,
    description: army_body_fat_calculatorConfig.description,
    slug: army_body_fat_calculatorConfig.slug,
    category: army_body_fat_calculatorConfig.category,
    faqs: army_body_fat_calculatorConfig.faqs,
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
