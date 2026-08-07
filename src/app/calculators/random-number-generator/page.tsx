import { Metadata } from "next";
import { random_number_generatorMetadata } from "./metadata";
import { random_number_generatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = random_number_generatorMetadata;

export default function RandomNumberGeneratorPage() {
  const { calculate, ...serializableDef } = random_number_generatorConfig;
  const schemas = generateJsonLdSchema({
    title: random_number_generatorConfig.title,
    description: random_number_generatorConfig.description,
    slug: random_number_generatorConfig.slug,
    category: random_number_generatorConfig.category,
    faqs: random_number_generatorConfig.faqs,
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
