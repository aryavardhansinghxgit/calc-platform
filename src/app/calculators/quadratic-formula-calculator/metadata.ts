import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const quadratic_formula_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Quadratic Formula Calculator — Free Online Math Calculator",
  description: "Solve quadratic equations ax² + bx + c = 0 and find real/complex roots and vertex points.",
  slug: "quadratic-formula-calculator",
});
