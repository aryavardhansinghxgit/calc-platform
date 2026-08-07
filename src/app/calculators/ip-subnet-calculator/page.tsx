import { Metadata } from "next";
import { ip_subnet_calculatorMetadata } from "./metadata";
import { ip_subnet_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = ip_subnet_calculatorMetadata;

export default function IPSubnetCalculatorPage() {
  const { calculate, ...serializableDef } = ip_subnet_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: ip_subnet_calculatorConfig.title,
    description: ip_subnet_calculatorConfig.description,
    slug: ip_subnet_calculatorConfig.slug,
    category: ip_subnet_calculatorConfig.category,
    faqs: ip_subnet_calculatorConfig.faqs,
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
