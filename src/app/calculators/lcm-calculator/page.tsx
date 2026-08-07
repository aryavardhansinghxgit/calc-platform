import { Metadata } from "next";
import { lcm_calculatorMetadata } from "./metadata";
import { lcm_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = lcm_calculatorMetadata;

export default function LeastCommonMultipleLCMCalculatorPage() {
  const { calculate, ...serializableDef } = lcm_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: lcm_calculatorConfig.title,
    description: lcm_calculatorConfig.description,
    slug: lcm_calculatorConfig.slug,
    category: lcm_calculatorConfig.category,
    faqs: lcm_calculatorConfig.faqs,
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
