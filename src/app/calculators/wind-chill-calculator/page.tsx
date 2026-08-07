import { Metadata } from "next";
import { wind_chill_calculatorMetadata } from "./metadata";
import { wind_chill_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = wind_chill_calculatorMetadata;

export default function WindChillCalculatorPage() {
  const { calculate, ...serializableDef } = wind_chill_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: wind_chill_calculatorConfig.title,
    description: wind_chill_calculatorConfig.description,
    slug: wind_chill_calculatorConfig.slug,
    category: wind_chill_calculatorConfig.category,
    faqs: wind_chill_calculatorConfig.faqs,
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
