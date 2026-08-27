import { Metadata } from "next";
import { SOCIAL_SECURITY_CALCULATOR } from "@/calculators/finance/social-security";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Social Security Calculator – Estimate Benefits, Claiming Age & Break-Even",
    description:
      "Use our Social Security Calculator to compare claiming ages 62–70, estimate monthly and lifetime benefits, calculate Full Retirement Age, COLA growth, break-even age, spousal benefits and taxability.",
    slug: SOCIAL_SECURITY_CALCULATOR.slug,
  });
}

export default function SocialSecurityCalculatorPage() {
  const { calculate, ...serializableDef } = SOCIAL_SECURITY_CALCULATOR;

  const schemas = generateJsonLdSchema({
    title: SOCIAL_SECURITY_CALCULATOR.title,
    description: SOCIAL_SECURITY_CALCULATOR.description,
    slug: SOCIAL_SECURITY_CALCULATOR.slug,
    category: SOCIAL_SECURITY_CALCULATOR.category,
    faqs: SOCIAL_SECURITY_CALCULATOR.faqs,
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
