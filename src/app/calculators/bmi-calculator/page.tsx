import { Metadata } from "next";
import { bmi_calculatorMetadata } from "./metadata";
import { bmi_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = bmi_calculatorMetadata;

export default function BMICalculatorPage() {
  const { calculate, ...serializableDef } = bmi_calculatorConfig;

  // Basic schemas generated from platform helpers
  const baseSchemas = generateJsonLdSchema({
    title: bmi_calculatorConfig.title,
    description: bmi_calculatorConfig.description,
    slug: bmi_calculatorConfig.slug,
    category: bmi_calculatorConfig.category,
    faqs: bmi_calculatorConfig.faqs,
  });

  // Additional Article & Medical WebPage Schema
  const medicalArticleSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Body Mass Index (BMI) Clinical & Pediatric Assessment Suite",
    "description": "Comprehensive clinical resource for calculating adult and pediatric Body Mass Index, WHO categories, CDC percentiles, BMI Prime, and ideal body weight.",
    "url": "https://calculator-platform.com/calculators/bmi-calculator",
    "aspect": ["Overview", "Calculation", "Diagnosis", "Risks"],
    "medicalAudience": {
      "@type": "MedicalAudience",
      "audienceType": "General Public & Healthcare Professionals"
    }
  };

  const allSchemas = [...baseSchemas, medicalArticleSchema];

  return (
    <>
      {allSchemas.map((schema, i) => (
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
