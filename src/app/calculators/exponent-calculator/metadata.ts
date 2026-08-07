import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const exponent_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Exponent Calculator — Free Online Math Calculator",
  description: "Calculate powers, exponents, and base numbers raised to negative or fractional powers.",
  slug: "exponent-calculator",
});
