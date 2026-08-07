import { Metadata } from "next";
import { gas_mileage_calculatorMetadata } from "./metadata";
import { gas_mileage_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = gas_mileage_calculatorMetadata;

export default function GasMileageCalculatorPage() {
  const { calculate, ...serializableDef } = gas_mileage_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: gas_mileage_calculatorConfig.title,
    description: gas_mileage_calculatorConfig.description,
    slug: gas_mileage_calculatorConfig.slug,
    category: gas_mileage_calculatorConfig.category,
    faqs: gas_mileage_calculatorConfig.faqs,
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
