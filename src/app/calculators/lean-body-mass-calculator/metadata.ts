import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const lean_body_mass_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Lean Body Mass Calculator — Free Online Health Calculator",
  description: "Calculate Lean Body Mass (LBM) without fat mass using Boer, James, and Hume formulas.",
  slug: "lean-body-mass-calculator",
});
