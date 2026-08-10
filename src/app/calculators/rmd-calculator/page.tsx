import { Metadata } from "next";
import { RMD_CALCULATOR } from "@/calculators/finance/rmd";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "RMD Calculator – IRS Required Minimum Distribution & SECURE 2.0 Planner",
    description:
      "Free IRS RMD Calculator. Calculate Required Minimum Distributions from Traditional IRAs, 401(k)s, and 403(b)s under SECURE Act 2.0 (starting ages 73 & 75). Features Pub 590-B tables, multi-account aggregator, QCD tax saver, late penalty estimators, and lifetime schedule charts.",
    slug: RMD_CALCULATOR.slug,
  });
}

export default function RmdCalculatorPage() {
  const { calculate, ...serializableDef } = RMD_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: RMD_CALCULATOR.title,
    description: RMD_CALCULATOR.description,
    slug: RMD_CALCULATOR.slug,
    category: RMD_CALCULATOR.category,
    faqs: RMD_CALCULATOR.faqs,
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
