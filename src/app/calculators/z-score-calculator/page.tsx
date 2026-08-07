import { Metadata } from "next";
import { z_score_calculatorMetadata } from "./metadata";
import { z_score_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = z_score_calculatorMetadata;

export default function ZScoreCalculatorPage() {
  const { calculate, ...serializableDef } = z_score_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: z_score_calculatorConfig.title,
    description: z_score_calculatorConfig.description,
    slug: z_score_calculatorConfig.slug,
    category: z_score_calculatorConfig.category,
    faqs: z_score_calculatorConfig.faqs,
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
