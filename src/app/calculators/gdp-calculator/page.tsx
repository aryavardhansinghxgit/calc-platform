import { Metadata } from "next";
import { gdp_calculatorMetadata } from "./metadata";
import { gdp_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = gdp_calculatorMetadata;

export default function GDPCalculatorPage() {
  const { calculate, ...serializableDef } = gdp_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: gdp_calculatorConfig.title,
    description: gdp_calculatorConfig.description,
    slug: gdp_calculatorConfig.slug,
    category: gdp_calculatorConfig.category,
    faqs: gdp_calculatorConfig.faqs,
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
