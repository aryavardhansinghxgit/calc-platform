import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const root_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Root Calculator — Nth Root & Radical Simplifier with Steps",
    description: "Free online Root Calculator & Radical Simplifier. Calculate n-th roots, square roots, cube roots, simplify radicals into exact form, evaluate fractional exponents, and explore step-by-step derivations.",
    slug: "root-calculator",
  }),
  keywords: [
    "Root Calculator",
    "Nth Root Calculator",
    "Square Root Calculator",
    "Cube Root Calculator",
    "Radical Simplifier",
    "Simplify Radicals Calculator",
    "Fractional Exponent Calculator"
  ]
};
