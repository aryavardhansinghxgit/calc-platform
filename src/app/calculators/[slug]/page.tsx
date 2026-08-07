import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCalculatorDefinition, getAllCalculatorDefinitions } from "@/calculators";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const definitions = getAllCalculatorDefinitions();
  const slugs = new Set(definitions.map((d) => d.slug));

  return Array.from(slugs).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const def = getCalculatorDefinition(slug);

  if (!def) return { title: "Calculator Not Found" };

  return generateCalculatorMetadata({
    title: def.title,
    description: def.description,
    slug: def.slug,
  });
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const definition = getCalculatorDefinition(slug);

  if (!definition) {
    notFound();
  }

  const { calculate, ...serializableDefinition } = definition;
  const schemas = generateJsonLdSchema({
    title: definition.title,
    description: definition.description,
    slug: definition.slug,
    category: definition.category,
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
