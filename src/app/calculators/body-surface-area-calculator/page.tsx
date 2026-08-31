import React from "react";
import { body_surface_area_calculatorConfig } from "./config";
import { bsaMetadata } from "./metadata";
import { bsaFaqs } from "./faq";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";

export const metadata = bsaMetadata;

export default function BodySurfaceAreaCalculatorPage() {
  const { calculate, icon, ...serializableDef } = body_surface_area_calculatorConfig;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: bsaFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Body Surface Area (BSA) Calculator & Clinical Dosing Suite",
    description:
      "Clinical Body Surface Area (BSA) calculator supporting Mosteller, Du Bois, Haycock, Schlich 3D, Chemotherapy dosing, Cardiac Index, and GFR normalization.",
    url: "https://calculator-platform.com/calculators/body-surface-area-calculator",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Clinicians, Oncologists, Nephrologists, Pediatricians, Patients",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://calculator-platform.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Health Calculators",
        item: "https://calculator-platform.com/category/health",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Body Surface Area Calculator",
        item: "https://calculator-platform.com/calculators/body-surface-area-calculator",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CalculatorLayout definition={serializableDef} />
    </>
  );
}
