import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const ratio_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Ratio Calculator — Solve Proportions, Simplify & Scale Ratios",
  description: "Free online Ratio Calculator. Solve proportions A:B=C:D, simplify 2-part and 3-part ratios with GCD, partition total amounts, aspect ratios, and golden ratio.",
  slug: "ratio-calculator",
});

export default ratio_calculatorMetadata;
