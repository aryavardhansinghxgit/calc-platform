import { Metadata } from "next";
import { time_zone_calculatorMetadata } from "./metadata";
import { time_zone_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = time_zone_calculatorMetadata;

export default function TimeZoneCalculatorPage() {
  const { calculate, ...serializableDef } = time_zone_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: time_zone_calculatorConfig.title,
    description: time_zone_calculatorConfig.description,
    slug: time_zone_calculatorConfig.slug,
    category: time_zone_calculatorConfig.category,
    faqs: time_zone_calculatorConfig.faqs,
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
