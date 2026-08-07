import { Metadata } from "next";
import { day_of_the_week_calculatorMetadata } from "./metadata";
import { day_of_the_week_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = day_of_the_week_calculatorMetadata;

export default function DayoftheWeekCalculatorPage() {
  const { calculate, ...serializableDef } = day_of_the_week_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: day_of_the_week_calculatorConfig.title,
    description: day_of_the_week_calculatorConfig.description,
    slug: day_of_the_week_calculatorConfig.slug,
    category: day_of_the_week_calculatorConfig.category,
    faqs: day_of_the_week_calculatorConfig.faqs,
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
