import { Metadata } from "next";
import { mean_median_mode_calculatorMetadata } from "./metadata";
import { mean_median_mode_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = mean_median_mode_calculatorMetadata;

export default function MeanMedianModeRangeCalculatorPage() {
  const { calculate, ...serializableDef } = mean_median_mode_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: mean_median_mode_calculatorConfig.title,
    description: mean_median_mode_calculatorConfig.description,
    slug: mean_median_mode_calculatorConfig.slug,
    category: mean_median_mode_calculatorConfig.category,
    faqs: mean_median_mode_calculatorConfig.faqs,
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
