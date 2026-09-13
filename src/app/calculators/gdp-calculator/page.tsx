import { Metadata } from "next";
import { GDP_CALCULATOR } from "@/calculators/other/gdp";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  const meta = generateCalculatorMetadata({
    title: "GDP Calculator – GDP, Real GDP, Growth & GDP Per Capita",
    description:
      "Calculate GDP using expenditure, income and production approaches. Also calculate real GDP, GDP growth, CAGR, GDP per capita and sector shares.",
    slug: GDP_CALCULATOR.slug,
    keywords: [
      "GDP calculator",
      "GDP calculation",
      "GDP formula",
      "how to calculate GDP",
      "expenditure approach GDP calculator",
      "C + I + G + (X - M)",
      "income approach GDP",
      "production approach GDP",
      "GVA calculator",
      "real GDP calculator",
      "GDP deflator calculator",
      "GDP growth calculator",
      "CAGR calculator",
      "GDP per capita calculator",
      "GDP per capita formula",
      "nominal GDP vs real GDP",
      "net exports GDP",
      "sector shares",
    ],
  });

  return {
    ...meta,
    title: "GDP Calculator – GDP, Real GDP, Growth & GDP Per Capita",
  };
}

export default function GDPCalculatorPage() {
  const { calculate, ...serializableDef } = GDP_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: GDP_CALCULATOR.title,
    description: GDP_CALCULATOR.description,
    slug: GDP_CALCULATOR.slug,
    category: GDP_CALCULATOR.category,
    faqs: GDP_CALCULATOR.faqs,
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
