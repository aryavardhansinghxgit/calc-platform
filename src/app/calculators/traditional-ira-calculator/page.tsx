import { Metadata } from "next";
import { IRA_CALCULATOR } from "@/calculators/finance/ira";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Traditional IRA Calculator – Pre-Tax Growth & Tax Optimizer",
    description:
      "Free Traditional IRA Calculator. Calculate pre-tax growth, after-tax retirement payouts, compare against Roth IRA and taxable savings side-by-side.",
    slug: "traditional-ira-calculator",
  });
}

export default function TraditionalIraCalculatorPage() {
  const { calculate, ...serializableDef } = IRA_CALCULATOR;

  const customDef = {
    ...serializableDef,
    title: "Traditional IRA Calculator",
    slug: "traditional-ira-calculator",
  };

  const schemas = generateJsonLdSchema({
    title: customDef.title,
    description: customDef.description,
    slug: customDef.slug,
    category: customDef.category,
    faqs: customDef.faqs,
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
      <CalculatorLayout definition={customDef} />
    </>
  );
}
