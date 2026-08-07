import { Metadata } from "next";
import { conversion_calculatorMetadata } from "./metadata";
import { conversion_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = conversion_calculatorMetadata;

export default function ConversionCalculatorPage() {
  const { calculate, ...serializableDef } = conversion_calculatorConfig;
  const schemas = generateJsonLdSchema({
    title: conversion_calculatorConfig.title,
    description: conversion_calculatorConfig.description,
    slug: conversion_calculatorConfig.slug,
    category: conversion_calculatorConfig.category,
    faqs: conversion_calculatorConfig.faqs,
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
