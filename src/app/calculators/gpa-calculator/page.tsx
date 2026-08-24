import { Metadata } from "next";
import { gpa_calculatorMetadata } from "./metadata";
import { gpa_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = gpa_calculatorMetadata;

export default function GPACalculatorPage() {
  const { calculate, CustomComponent, ContentComponent, ...serializableDef } = gpa_calculatorConfig as any;
  const schemas = generateJsonLdSchema({
    title: gpa_calculatorConfig.title,
    description: gpa_calculatorConfig.description,
    slug: gpa_calculatorConfig.slug,
    category: gpa_calculatorConfig.category,
    faqs: gpa_calculatorConfig.faqs,
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
