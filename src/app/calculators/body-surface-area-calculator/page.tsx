import { Metadata } from "next";
import { body_surface_area_calculatorMetadata } from "./metadata";
import { body_surface_area_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = body_surface_area_calculatorMetadata;

export default function BodySurfaceAreaCalculatorPage() {
  const { calculate, ...serializableDef } = body_surface_area_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: body_surface_area_calculatorConfig.title,
    description: body_surface_area_calculatorConfig.description,
    slug: body_surface_area_calculatorConfig.slug,
    category: body_surface_area_calculatorConfig.category,
    faqs: body_surface_area_calculatorConfig.faqs,
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
