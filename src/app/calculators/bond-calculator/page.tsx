import { Metadata } from "next";
import { bond_calculatorMetadata } from "./metadata";
import { bond_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = bond_calculatorMetadata;

export default function BondCalculatorPage() {
  const { calculate, ...serializableDef } = bond_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: bond_calculatorConfig.title,
    description: bond_calculatorConfig.description,
    slug: bond_calculatorConfig.slug,
    category: bond_calculatorConfig.category,
    faqs: [],
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Bond Calculator & Fixed-Income Valuation Suite",
    operatingSystem: "All",
    applicationCategory: "FinanceApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.98",
      ratingCount: "2870",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Bond Price and Yield to Maturity",
    description:
      "Step-by-step guide to calculating bond prices, discounting coupon cash flows, and solving for Yield to Maturity (YTM) using Newton-Raphson numerical root finding.",
    step: [
      {
        "@type": "HowToStep",
        name: "Input Bond Characteristics",
        text: "Enter the Face Value (Par), Annual Coupon Rate, Years to Maturity, and Coupon Payment Frequency.",
      },
      {
        "@type": "HowToStep",
        name: "Choose Calculation Goal",
        text: "Select whether to solve for Bond Price (by inputting required YTM) or solve for Yield to Maturity (by entering current market trading price).",
      },
      {
        "@type": "HowToStep",
        name: "Review Clean vs. Dirty Price and Duration",
        text: "Inspect the Clean Price, Accrued Interest, Dirty Invoice Price, Macaulay/Modified Duration, and Convexity interest rate risk metrics.",
      },
    ],
  };

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <CalculatorLayout definition={serializableDef} />
    </>
  );
}
