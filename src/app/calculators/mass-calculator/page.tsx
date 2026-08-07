import { Metadata } from "next";
import { mass_calculatorMetadata } from "./metadata";
import { mass_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = mass_calculatorMetadata;

export default function MassCalculatorPage() {
  const { calculate, ...serializableDef } = mass_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: mass_calculatorConfig.title,
    description: mass_calculatorConfig.description,
    slug: mass_calculatorConfig.slug,
    category: mass_calculatorConfig.category,
    faqs: mass_calculatorConfig.faqs,
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
