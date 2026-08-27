import { Metadata } from "next";
import { RMD_CALCULATOR } from "@/calculators/finance/rmd";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "RMD Calculator – Required Minimum Distribution, Tax & QCD Calculator",
    description:
      "Calculate required minimum distributions (RMDs) from IRAs and retirement accounts using IRS life-expectancy factors. Estimate RMD taxes, QCD savings, deadlines and future account balances.",
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
