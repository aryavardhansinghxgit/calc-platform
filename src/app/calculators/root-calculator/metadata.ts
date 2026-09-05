import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const root_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Root Calculator & Radical Simplifier – nth Root Calculator",
    description: "Calculate square roots, cube roots, and nth roots with exact radical forms, decimal answers, step-by-step simplification, fractional exponents, and more.",
    slug: "root-calculator",
  }),
  keywords: [
    "root calculator",
    "nth root calculator",
    "radical calculator",
    "radical simplifier",
    "square root calculator",
    "cube root calculator",
    "simplify radicals"
  ]
};
