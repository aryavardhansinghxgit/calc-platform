import { Metadata } from "next";
import { SALES_TAX_CALCULATOR } from "@/calculators/finance/sales-tax";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Sales Tax Calculator – U.S. State & Local Tax Estimator",
    description:
      "Free U.S. Sales Tax Calculator. Calculate state and local sales taxes, 5-way solving (Modes A–E), 50 US state tax rate directory, multi-item receipt builder, business tax collection solver, and what-if state tax savings comparison.",
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
