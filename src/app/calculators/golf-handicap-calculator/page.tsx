import { Metadata } from "next";
import { golf_handicap_calculatorMetadata } from "./metadata";
import { golf_handicap_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = golf_handicap_calculatorMetadata;

export default function GolfHandicapCalculatorPage() {
  const { calculate, ...serializableDef } = golf_handicap_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: golf_handicap_calculatorConfig.title,
    description: golf_handicap_calculatorConfig.description,
    slug: golf_handicap_calculatorConfig.slug,
    category: golf_handicap_calculatorConfig.category,
    faqs: golf_handicap_calculatorConfig.faqs,
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
