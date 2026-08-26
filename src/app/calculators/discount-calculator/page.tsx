import { Metadata } from "next";
import { DISCOUNT_CALCULATOR } from "@/calculators/finance/discount";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Discount Calculator — Calculate Sale Price, Stacked Discounts & Coupons",
    description:
      "Calculate discounts, final sale prices, stacked percentage discounts, fixed coupons, and sales tax after discounts. Compare savings and solve reverse discount problems.",
    slug: DISCOUNT_CALCULATOR.slug,
  });
}

export default function DiscountCalculatorPage() {
  const { calculate, ...serializableDef } = DISCOUNT_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: DISCOUNT_CALCULATOR.title,
    description: DISCOUNT_CALCULATOR.description,
    slug: DISCOUNT_CALCULATOR.slug,
    category: DISCOUNT_CALCULATOR.category,
    faqs: DISCOUNT_CALCULATOR.faqs,
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
