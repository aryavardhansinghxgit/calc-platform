import { Metadata } from "next";
import { AUTO_LEASE_CALCULATOR } from "@/calculators/finance/auto-lease";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Auto Lease Calculator – Monthly Payment, Money Factor, Residual Value & Lease Cost",
    description:
      "Use this Auto Lease Calculator to estimate monthly lease payments, depreciation, money factor, residual value, taxes, fees, mileage penalties, total lease cost, and lease vs. buy savings.",
    slug: AUTO_LEASE_CALCULATOR.slug,
  });
}

export default function AutoLeaseCalculatorPage() {
  const { calculate, ...serializableDef } = AUTO_LEASE_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: AUTO_LEASE_CALCULATOR.title,
    description: AUTO_LEASE_CALCULATOR.description,
    slug: AUTO_LEASE_CALCULATOR.slug,
    category: AUTO_LEASE_CALCULATOR.category,
    faqs: AUTO_LEASE_CALCULATOR.faqs,
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
