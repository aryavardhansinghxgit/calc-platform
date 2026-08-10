import { Metadata } from "next";
import { GST_CALCULATOR } from "@/calculators/finance/gst";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "GST Calculator – Indian Goods & Services Tax Inclusive & Exclusive Estimator",
    description:
      "Free GST Calculator India. Calculate GST inclusive & exclusive amounts, reverse GST, CGST, SGST, IGST inter-state splits, multi-item tax invoices, and composition scheme tax savings.",
    slug: GST_CALCULATOR.slug,
  });
}

export default function GstCalculatorPage() {
  const { calculate, ...serializableDef } = GST_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: GST_CALCULATOR.title,
    description: GST_CALCULATOR.description,
    slug: GST_CALCULATOR.slug,
    category: GST_CALCULATOR.category,
    faqs: GST_CALCULATOR.faqs,
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
