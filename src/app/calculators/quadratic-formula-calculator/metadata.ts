import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const quadratic_formula_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Quadratic Formula Calculator with Steps & Interactive Graph",
  description: "Free online Quadratic Formula Calculator & Parabola Suite. Solve quadratic equations ax²+bx+c=0 with step-by-step formula, completing the square, and 2D graph.",
  slug: "quadratic-formula-calculator",
});

export default quadratic_formula_calculatorMetadata;
