import { Metadata } from "next";
import { SIP_CALCULATOR } from "@/calculators/finance/sip";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = generateCalculatorMetadata({
    title: "SIP Calculator – Monthly Investment Growth Calculator",
    description:
      "Calculate future wealth from monthly recurring investments (SIP). Model Step-Up contributions, inflation purchasing power, tax drag, and SIP vs Lumpsum growth.",
    slug: SIP_CALCULATOR.slug,
  });

  return {
    ...baseMeta,
    keywords: [
      "sip calculator",
      "recurring investment calculator",
      "monthly investment calculator",
      "step up sip calculator",
      "investment growth calculator",
      "future value of monthly investments",
      "dollar cost averaging calculator",
      "mutual fund sip calculator",
      "systematic investment plan calculator",
    ],
    openGraph: {
      ...baseMeta.openGraph,
      title: "SIP Calculator – Monthly Investment Growth Calculator",
      description:
        "Calculate future wealth from monthly recurring investments (SIP). Model Step-Up contributions, inflation purchasing power, tax drag, and SIP vs Lumpsum growth.",
    },
    twitter: {
      ...baseMeta.twitter,
      title: "SIP Calculator – Monthly Investment Growth Calculator",
      description:
        "Calculate future wealth from monthly recurring investments (SIP). Model Step-Up contributions, inflation purchasing power, tax drag, and SIP vs Lumpsum growth.",
    },
  };
}

export default function SipCalculatorPage() {
  const { calculate, ...serializableDef } = SIP_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: SIP_CALCULATOR.title,
    description: SIP_CALCULATOR.description,
    slug: SIP_CALCULATOR.slug,
    category: SIP_CALCULATOR.category,
    faqs: SIP_CALCULATOR.faqs,
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
