import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const lean_body_mass_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Lean Body Mass Calculator – Boer, James, Hume, Janmahasatian & Peters Formulas",
  description: "Calculate your Lean Body Mass (LBM) using 5 clinical formulas (Boer 1984, James 1976, Hume 1966, Janmahasatian 2005, and Peters 2011 for children ≤14) with fat mass breakdown and muscle gain targets.",
  slug: "lean-body-mass-calculator",
});
