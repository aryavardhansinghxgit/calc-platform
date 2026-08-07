import { Metadata } from "next";
import { lean_body_mass_calculatorMetadata } from "./metadata";
import { lean_body_mass_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = lean_body_mass_calculatorMetadata;

export default function LeanBodyMassCalculatorPage() {
  const { calculate, ...serializableDef } = lean_body_mass_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: lean_body_mass_calculatorConfig.title,
    description: lean_body_mass_calculatorConfig.description,
    slug: lean_body_mass_calculatorConfig.slug,
    category: lean_body_mass_calculatorConfig.category,
    faqs: lean_body_mass_calculatorConfig.faqs,
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
