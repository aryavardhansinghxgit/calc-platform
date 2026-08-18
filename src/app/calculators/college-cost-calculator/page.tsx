import { Metadata } from "next";
import { COLLEGE_COST_CALCULATOR } from "@/calculators/finance/college-cost";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "College Cost Calculator",
    description:
      "Free College Cost Calculator. Calculate future college costs with tuition inflation, estimate 529 savings plans, required monthly savings, student loan repayment burdens, and major ROI.",
    slug: COLLEGE_COST_CALCULATOR.slug,
  });
}

export default function CollegeCostCalculatorPage() {
  const { calculate, ...serializableDef } = COLLEGE_COST_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: COLLEGE_COST_CALCULATOR.title,
    description: COLLEGE_COST_CALCULATOR.description,
    slug: COLLEGE_COST_CALCULATOR.slug,
    category: COLLEGE_COST_CALCULATOR.category,
    faqs: COLLEGE_COST_CALCULATOR.faqs,
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
