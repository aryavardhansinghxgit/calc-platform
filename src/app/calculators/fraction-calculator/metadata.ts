import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const fraction_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Fraction Calculator - Add, Subtract, Multiply, Divide & Simplify Fractions",
  description:
    "Calculate, simplify and convert fractions with step-by-step solutions for addition, subtraction, multiplication, division, mixed numbers, decimals and large-number fractions.",
  slug: "fraction-calculator",
  keywords: [
    "fraction calculator",
    "fractions calculator",
    "add fractions calculator",
    "subtract fractions calculator",
    "multiply fractions calculator",
    "divide fractions calculator",
    "simplify fractions",
    "fraction simplifier",
    "mixed number calculator",
    "decimal to fraction calculator",
    "fraction to decimal calculator",
    "improper fraction calculator",
    "fraction to decimal",
    "Big Number fraction calculator",
    "fraction solver",
  ],
});
