import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const standard_deviation_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Standard Deviation Calculator — Sample, Population & Step-by-Step Variance",
    description: "Free online Standard Deviation Calculator & Descriptive Statistics Suite. Compute Sample (s) & Population (σ) Standard Deviation, Variance, Standard Error, CV %, interactive SVG Bell Curve, Box Plot, and step-by-step variance tables.",
    slug: "standard-deviation-calculator"
  }),
  keywords: [
    "Standard Deviation Calculator",
    "Sample Standard Deviation Calculator",
    "Population Standard Deviation",
    "Variance Calculator",
    "How to Calculate Standard Deviation",
    "Bell Curve Standard Deviation Calculator"
  ]
};
