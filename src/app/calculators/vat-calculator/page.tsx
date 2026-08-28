import { Metadata } from "next";
import { VAT_CALCULATOR } from "@/calculators/finance/vat";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "VAT Calculator – Calculate VAT Inclusive, Exclusive & Reverse VAT",
    description:
      "Calculate VAT inclusive and exclusive prices, reverse VAT, tax amounts, supply-chain VAT and compare VAT with sales tax using our free global VAT calculator.",
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
