import { Metadata } from "next";
import { surface_area_calculatorMetadata } from "./metadata";
import { surface_area_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = surface_area_calculatorMetadata;

export default function SurfaceAreaCalculatorPage() {
  const { calculate, ...serializableDef } = surface_area_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: surface_area_calculatorConfig.title,
    description: surface_area_calculatorConfig.description,
    slug: surface_area_calculatorConfig.slug,
    category: surface_area_calculatorConfig.category,
    faqs: surface_area_calculatorConfig.faqs,
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
