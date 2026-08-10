import { Metadata } from "next";
import { MARGIN_CALCULATOR } from "@/calculators/finance/margin";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Margin Calculator – Profit, Stock & Forex Leverage Suite",
    description:
      "Free Margin Calculator. Calculate gross profit margin, markup percentage, stock trading margin requirements, margin call trigger prices, and forex leverage requirements.",
    slug: MARGIN_CALCULATOR.slug,
  });
}

export default function MarginCalculatorPage() {
  const { calculate, ...serializableDef } = MARGIN_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: MARGIN_CALCULATOR.title,
    description: MARGIN_CALCULATOR.description,
    slug: MARGIN_CALCULATOR.slug,
    category: MARGIN_CALCULATOR.category,
    faqs: MARGIN_CALCULATOR.faqs,
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
