import { Metadata } from "next";
import { rental_propertyMetadata } from "./metadata";
import { rental_propertyConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = rental_propertyMetadata;

export default function RentalPropertyCalculatorPage() {
  const { calculate, ...serializableDef } = rental_propertyConfig;

  const schemas = generateJsonLdSchema({
    title: rental_propertyConfig.title,
    description: rental_propertyConfig.description,
    slug: rental_propertyConfig.slug,
    category: rental_propertyConfig.category,
    faqs: rental_propertyConfig.faqs,
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
