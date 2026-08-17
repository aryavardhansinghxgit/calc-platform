import { Metadata } from "next";
import { fha_loanMetadata } from "./metadata";
import { fha_loanConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = fha_loanMetadata;

export default function FHALoanCalculatorPage() {
  const { calculate, ...serializableDef } = fha_loanConfig;

  const schemas = generateJsonLdSchema({
    title: fha_loanConfig.title,
    description: fha_loanConfig.description,
    slug: fha_loanConfig.slug,
    category: fha_loanConfig.category,
    faqs: fha_loanConfig.faqs,
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
