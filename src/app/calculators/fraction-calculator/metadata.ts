import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const fraction_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Fraction Calculator — Free Online Math Calculator",
  description: "Add, subtract, multiply, and divide fractions with step-by-step reduction to simplest form.",
  slug: "fraction-calculator",
});
