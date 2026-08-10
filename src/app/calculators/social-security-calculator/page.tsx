import { Metadata } from "next";
import { SOCIAL_SECURITY_CALCULATOR } from "@/calculators/finance/social-security";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({
    title: "Social Security Calculator – Ideal Claiming Age & Benefits Suite",
    description:
      "Free Social Security Benefits Calculator. Determine your ideal claiming age (62 vs FRA vs 70), compare two application ages, calculate Full Retirement Age (FRA) credits, estimate spousal/survivor benefits, and optimize taxation.",
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
