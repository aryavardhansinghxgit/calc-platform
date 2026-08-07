import { Metadata } from "next";
import { percent_error_calculatorMetadata } from "./metadata";
import { percent_error_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = percent_error_calculatorMetadata;

export default function PercentErrorCalculatorPage() {
  const { calculate, ...serializableDef } = percent_error_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: percent_error_calculatorConfig.title,
    description: percent_error_calculatorConfig.description,
    slug: percent_error_calculatorConfig.slug,
    category: percent_error_calculatorConfig.category,
    faqs: percent_error_calculatorConfig.faqs,
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
