import { Metadata } from "next";
import { VAT_CALCULATOR } from "@/calculators/finance/vat";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "VAT Calculator – Global Value-Added Tax Inclusive & Exclusive Estimator",
    description:
      "Free VAT Calculator. Calculate VAT inclusive & exclusive amounts, reverse VAT, universal 4-way bi-directional solving, multi-stage supply chain tax maps, and global country rate presets.",
    slug: VAT_CALCULATOR.slug,
  });
}

export default function VatCalculatorPage() {
  const { calculate, ...serializableDef } = VAT_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: VAT_CALCULATOR.title,
    description: VAT_CALCULATOR.description,
    slug: VAT_CALCULATOR.slug,
    category: VAT_CALCULATOR.category,
    faqs: VAT_CALCULATOR.faqs,
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
