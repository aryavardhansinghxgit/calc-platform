import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const quadratic_formula_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Quadratic Formula Calculator: Solve Equations Step-by-Step & Graph",
    description: "Solve ax² + bx + c = 0 with our quadratic formula calculator. Find real or complex roots, discriminant, vertex, axis of symmetry, focus, directrix and see every algebra step with an interactive parabola graph.",
    slug: "quadratic-formula-calculator"
  }),
  keywords: [
    "quadratic formula calculator",
    "quadratic equation solver",
    "solve quadratic equation with steps",
    "parabola vertex calculator",
    "discriminant calculator",
    "completing the square calculator",
    "complex roots quadratic calculator",
    "parabola graph calculator"
  ]
};

export default quadratic_formula_calculatorMetadata;
