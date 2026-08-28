import { Metadata } from "next";
import { TRADITIONAL_IRA_CALCULATOR } from "@/calculators/finance/traditional-ira";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: TRADITIONAL_IRA_CALCULATOR.title,
    description: TRADITIONAL_IRA_CALCULATOR.description,
    slug: TRADITIONAL_IRA_CALCULATOR.slug,
  });
}

export default function TraditionalIraCalculatorPage() {
  const { calculate, ...serializableDef } = TRADITIONAL_IRA_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: TRADITIONAL_IRA_CALCULATOR.title,
    description: TRADITIONAL_IRA_CALCULATOR.description,
    slug: TRADITIONAL_IRA_CALCULATOR.slug,
    category: TRADITIONAL_IRA_CALCULATOR.category,
    faqs: TRADITIONAL_IRA_CALCULATOR.faqs,
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
