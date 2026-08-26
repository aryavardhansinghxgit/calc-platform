import { Metadata } from "next";
import { SALES_TAX_CALCULATOR } from "@/calculators/finance/sales-tax";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Sales Tax Calculator — Calculate Tax, Final Price & State Sales Tax",
    description:
      "Calculate sales tax in five ways, split taxable and exempt items, extract tax from gross business receipts, compare U.S. state rates, and estimate state-by-state tax differences.",
    slug: SALES_TAX_CALCULATOR.slug,
  });
}

export default function SalesTaxCalculatorPage() {
  const { calculate, ...serializableDef } = SALES_TAX_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: SALES_TAX_CALCULATOR.title,
    description: SALES_TAX_CALCULATOR.description,
    slug: SALES_TAX_CALCULATOR.slug,
    category: SALES_TAX_CALCULATOR.category,
    faqs: SALES_TAX_CALCULATOR.faqs,
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
