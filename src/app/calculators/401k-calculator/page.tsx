import { Metadata } from "next";
import { FOUR_ZERO_ONE_K_CALCULATOR } from "@/calculators/finance/401k";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "401(k) Calculator - Retirement Growth, Employer Match & Withdrawal",
    description:
      "Estimate 401(k) growth with salary increases, employee contributions, employer matching, inflation-adjusted purchasing power and early-withdrawal scenarios.",
    slug: FOUR_ZERO_ONE_K_CALCULATOR.slug,
  });
}

export default function FourZeroOneKCalculatorPage() {
  const { calculate, ...serializableDef } = FOUR_ZERO_ONE_K_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: FOUR_ZERO_ONE_K_CALCULATOR.title,
    description: FOUR_ZERO_ONE_K_CALCULATOR.description,
    slug: FOUR_ZERO_ONE_K_CALCULATOR.slug,
    category: FOUR_ZERO_ONE_K_CALCULATOR.category,
    faqs: FOUR_ZERO_ONE_K_CALCULATOR.faqs,
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
