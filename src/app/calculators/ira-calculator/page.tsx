import { Metadata } from "next";
import { IRA_CALCULATOR } from "@/calculators/finance/ira";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "IRA Calculator – Traditional vs Roth Retirement Suite",
    description:
      "Free IRA Calculator. Compare Traditional IRA, Roth IRA, SEP IRA, SIMPLE IRA, and regular taxable savings side-by-side. Calculate pre-tax and post-tax balances and test 2025/2026 IRS contribution caps.",
    slug: IRA_CALCULATOR.slug,
  });
}

export default function IraCalculatorPage() {
  const { calculate, ...serializableDef } = IRA_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: IRA_CALCULATOR.title,
    description: IRA_CALCULATOR.description,
    slug: IRA_CALCULATOR.slug,
    category: IRA_CALCULATOR.category,
    faqs: IRA_CALCULATOR.faqs,
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
