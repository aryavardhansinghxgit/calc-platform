import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const lean_body_mass_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Lean Body Mass Calculator – LBM & Fat-Free Mass Estimates",
  description: "Calculate estimated lean body mass and fat-free mass using Boer, James, Hume and Janmahasatian equations, with a Peters pediatric model for eligible children. Compare formulas and review body-composition estimates.",
  slug: "lean-body-mass-calculator",
});
