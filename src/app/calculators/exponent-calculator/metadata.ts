import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const exponent_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Exponent Calculator — Solve Powers, Radicals & Exponent Laws",
  description: "Free online Exponent Calculator. Solve base and power equations (bⁿ), fractional exponents, negative powers, scientific notation, and 8 exponent laws.",
  slug: "exponent-calculator",
});

export default exponent_calculatorMetadata;
