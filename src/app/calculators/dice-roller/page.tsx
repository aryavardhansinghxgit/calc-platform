import { Metadata } from "next";
import { dice_rollerMetadata } from "./metadata";
import { dice_rollerConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = dice_rollerMetadata;

export default function DiceRollerPage() {
  const { calculate, ...serializableDef } = dice_rollerConfig;
  const schemas = generateJsonLdSchema({
    title: dice_rollerConfig.title,
    description: dice_rollerConfig.description,
    slug: dice_rollerConfig.slug,
    category: dice_rollerConfig.category,
    faqs: dice_rollerConfig.faqs,
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
