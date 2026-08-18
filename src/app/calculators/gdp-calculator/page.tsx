import { Metadata } from "next";
import { GDP_CALCULATOR } from "@/calculators/other/gdp";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "GDP Calculator",
    description:
      "Free Gross Domestic Product (GDP) Calculator. Calculate national economic output using Expenditure Approach, Income Approach, Real vs. Nominal GDP Deflator, and GDP Per Capita.",
    slug: GDP_CALCULATOR.slug,
  });
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
