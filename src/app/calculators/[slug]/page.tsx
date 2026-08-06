import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCalculatorDefinition, getAllCalculatorDefinitions } from "@/lib/calculator-engine/registry";
import { getCalculatorBySlug, CALCULATORS } from "@/data/calculators";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";
import {
  MortgageCalculator,
  LoanCalculator,
  EmiCalculator,
  SipCalculator,
  CompoundInterestCalculator,
  BmiCalculator,
  PercentageCalculator,
} from "@/components/calculator";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const registryDefinitions = getAllCalculatorDefinitions();
  const slugs = new Set([
    ...registryDefinitions.map((d) => d.slug),
    ...CALCULATORS.map((c) => c.slug),
  ]);

  return Array.from(slugs).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const def = getCalculatorDefinition(slug);
  const dataCalc = getCalculatorBySlug(slug);

  const title = def?.title || dataCalc?.title;
  const description = def?.description || dataCalc?.description || "";

  if (!title) return { title: "Calculator Not Found" };

  return generateCalculatorMetadata({
    title,
    description,
    slug,
  });
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Look up calculator in CalculatorRegistry
  const definition = getCalculatorDefinition(slug);

  // 2. If definition is found in CalculatorRegistry -> Render generic CalculatorLayout!
  if (definition) {
    const { calculate, ...serializableDefinition } = definition;
    const schemas = generateJsonLdSchema({
      title: definition.title,
      description: definition.description,
      slug: definition.slug,
      faqs: definition.faqs,
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
        <CalculatorLayout definition={serializableDefinition} />
      </>
    );
  }

  // 3. Fallback for custom calculators registered in data/calculators
  const dataCalc = getCalculatorBySlug(slug);
  if (!dataCalc) {
    notFound();
  }

  // Render matching custom interactive component if available
  const renderFallbackComponent = (id: string) => {
    switch (id) {
      case "mortgage":
      case "mortgage-calculator":
        return <MortgageCalculator />;
      case "loan":
      case "loan-calculator":
        return <LoanCalculator />;
      case "emi":
      case "emi-calculator":
        return <EmiCalculator />;
      case "sip":
      case "sip-calculator":
        return <SipCalculator />;
      case "compound-interest":
      case "compound-interest-calculator":
        return <CompoundInterestCalculator />;
      case "bmi":
      case "bmi-calculator":
        return <BmiCalculator />;
      case "percentage":
      case "percentage-calculator":
        return <PercentageCalculator />;
      default:
        return <MortgageCalculator />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {renderFallbackComponent(dataCalc.id)}
    </div>
  );
}
