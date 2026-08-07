import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const ratio_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Ratio Calculator — Free Online Math Calculator",
  description: "Solve ratio proportions (A : B = C : X) and simplify ratios into lowest terms.",
  slug: "ratio-calculator",
});
