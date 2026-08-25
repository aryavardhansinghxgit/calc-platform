import { Metadata } from "next";
import { LEASE_CALCULATOR } from "@/calculators/finance/lease";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Lease Calculator - Payment, Residual Value, Money Factor & Lease vs Buy",
    description:
      "Calculate lease payments, residual value, money factor and APR, compare leasing vs buying, model equipment leases, depreciation, taxes and full lease schedules.",
    slug: LEASE_CALCULATOR.slug,
  });
}

export default function LeaseCalculatorPage() {
  const { calculate, ...serializableDef } = LEASE_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: "Lease Calculator - Payment, Residual Value, Money Factor & Lease vs Buy",
    description:
      "Calculate lease payments, residual value, money factor and APR, compare leasing vs buying, model equipment leases, depreciation, taxes and full lease schedules.",
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
