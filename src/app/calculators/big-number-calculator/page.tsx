import { Metadata } from "next";
import { big_number_calculatorMetadata } from "./metadata";
import { big_number_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = big_number_calculatorMetadata;

export default function BigNumberCalculatorPage() {
  const { calculate, ...serializableDef } = big_number_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: big_number_calculatorConfig.title,
    description: big_number_calculatorConfig.description,
    slug: big_number_calculatorConfig.slug,
    category: big_number_calculatorConfig.category,
    faqs: big_number_calculatorConfig.faqs,
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
