import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const sample_size_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Sample Size Calculator — Survey, Power Analysis & Margin of Error",
    description: "Free online Sample Size Calculator & Statistical Power Analysis Suite. Calculate survey sample sizes with Finite Population Correction (FPC), A/B testing conversion requirements, statistical power curves, and APA methodology text.",
    slug: "sample-size-calculator"
  }),
  keywords: [
    "Sample Size Calculator",
    "Survey Sample Size Calculator",
    "How to Calculate Sample Size",
    "Margin of Error Calculator",
    "A/B Test Sample Size Calculator",
    "Statistical Power Calculator"
  ]
};
