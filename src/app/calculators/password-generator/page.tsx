import { Metadata } from "next";
import { password_generatorMetadata } from "./metadata";
import { password_generatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = password_generatorMetadata;

export default function PasswordGeneratorPage() {
  const { calculate, ...serializableDef } = password_generatorConfig;
  const schemas = generateJsonLdSchema({
    title: password_generatorConfig.title,
    description: password_generatorConfig.description,
    slug: password_generatorConfig.slug,
    category: password_generatorConfig.category,
    faqs: password_generatorConfig.faqs,
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
