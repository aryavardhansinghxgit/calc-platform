import { Metadata } from "next";
import { ROTH_IRA_CALCULATOR } from "@/calculators/finance/roth-ira";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Roth IRA Calculator – 100% Tax-Free Retirement Growth",
    description:
      "Free Roth IRA Calculator. Calculate tax-free growth, compare against regular taxable savings accounts, test 2025/2026 IRS contribution caps, and evaluate Backdoor Roth conversions.",
    slug: ROTH_IRA_CALCULATOR.slug,
  });
}

export default function RothIraCalculatorPage() {
  const { calculate, ...serializableDef } = ROTH_IRA_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: ROTH_IRA_CALCULATOR.title,
    description: ROTH_IRA_CALCULATOR.description,
    slug: ROTH_IRA_CALCULATOR.slug,
    category: ROTH_IRA_CALCULATOR.category,
    faqs: ROTH_IRA_CALCULATOR.faqs,
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
