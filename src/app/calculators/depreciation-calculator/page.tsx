import { Metadata } from "next";
import { DEPRECIATION_CALCULATOR } from "@/calculators/finance/depreciation";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Depreciation Calculator",
    description:
      "Free Asset Depreciation Calculator. Calculate depreciation schedules across Straight-Line, Double Declining Balance (DDB), 150% DB, Sum-of-Years' Digits (SYD), Units of Production, and MACRS IRS tax depreciation.",
    slug: DEPRECIATION_CALCULATOR.slug,
  });
}

export default function DepreciationCalculatorPage() {
  const { calculate, ...serializableDef } = DEPRECIATION_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: DEPRECIATION_CALCULATOR.title,
    description: DEPRECIATION_CALCULATOR.description,
    slug: DEPRECIATION_CALCULATOR.slug,
    category: DEPRECIATION_CALCULATOR.category,
    faqs: DEPRECIATION_CALCULATOR.faqs,
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
