import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const half_life_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Half-Life Calculator: Step-by-Step Solver & Isotope Presets",
  description: "Free online Half-Life Calculator. Solve for remaining quantity, initial quantity, half-life, or time. Includes 10+ isotope presets, decay graphs, and step-by-step formulas.",
  slug: "half-life-calculator",
});

export default half_life_calculatorMetadata;
