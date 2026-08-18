import { Metadata } from "next";
import { LEASE_CALCULATOR } from "@/calculators/finance/lease";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Lease Calculator",
    description:
      "Free Lease Calculator. Calculate monthly lease payments, total lease cost, depreciation charges, money factor to APR conversions, and compare leasing vs buying for vehicles, equipment, and property.",
    slug: LEASE_CALCULATOR.slug,
  });
}

export default function LeaseCalculatorPage() {
  const { calculate, ...serializableDef } = LEASE_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: LEASE_CALCULATOR.title,
    description: LEASE_CALCULATOR.description,
    slug: LEASE_CALCULATOR.slug,
    category: LEASE_CALCULATOR.category,
    faqs: LEASE_CALCULATOR.faqs,
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
