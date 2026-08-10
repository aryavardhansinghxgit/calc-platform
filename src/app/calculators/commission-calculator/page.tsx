import { Metadata } from "next";
import { COMMISSION_CALCULATOR } from "@/calculators/finance/commission";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Commission Calculator – Tiered & Sales Compensation Suite",
    description:
      "Free Commission Calculator. Calculate sales commission payout, 3-way missing solvers, base salary plus commission, graduated tiered brackets, real estate splits, and target sales goal planners.",
    slug: COMMISSION_CALCULATOR.slug,
  });
}

export default function CommissionCalculatorPage() {
  const { calculate, ...serializableDef } = COMMISSION_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: COMMISSION_CALCULATOR.title,
    description: COMMISSION_CALCULATOR.description,
    slug: COMMISSION_CALCULATOR.slug,
    category: COMMISSION_CALCULATOR.category,
    faqs: COMMISSION_CALCULATOR.faqs,
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
