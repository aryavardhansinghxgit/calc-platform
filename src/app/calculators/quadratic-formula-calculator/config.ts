import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateQuadraticFormulaCalculator } from "./calculator";
import { quadratic_formula_calculatorFaqs } from "./faq";
import { QuadraticCalculator } from "@/components/calculator/quadratic/QuadraticCalculator";
import { QuadraticContent } from "@/components/calculator/quadratic/QuadraticContent";

export const quadratic_formula_calculatorConfig: CalculatorModuleDefinition = {
  id: "quadratic-formula-calculator",
  title: "Quadratic Formula Calculator",
  slug: "quadratic-formula-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Solve ax² + bx + c = 0 with our quadratic formula calculator. Find real or complex roots, discriminant, vertex, axis of symmetry, focus, directrix and see every algebra step with an interactive parabola graph.",
  iconName: "Superscript",
  featured: true,
  keywords: [
    "quadratic formula calculator",
    "quadratic equation solver",
    "solve quadratic equation with steps",
    "parabola vertex calculator",
    "discriminant calculator",
    "completing the square calculator"
  ],
  priority: 1,
  relatedCalculators: ["exponent-calculator", "root-calculator", "scientific-calculator"],
  formulaDescription: "Solves ax² + bx + c = 0 via quadratic formula x = [-b ± √(b² - 4ac)] / (2a) and completing the square with step-by-step proofs.",
  faqs: quadratic_formula_calculatorFaqs,
  CustomComponent: QuadraticCalculator,
  ContentComponent: QuadraticContent,
  inputs: [
    {
      name: "a",
      label: "Quadratic Coefficient (a)",
      type: "number",
      defaultValue: 1
    },
    {
      name: "b",
      label: "Linear Coefficient (b)",
      type: "number",
      defaultValue: -5
    },
    {
      name: "c",
      label: "Constant (c)",
      type: "number",
      defaultValue: 6
    }
  ],
  outputs: [
    {
      name: "root1",
      label: "First Root (x₁)",
      format: "text",
      highlight: true
    },
    {
      name: "root2",
      label: "Second Root (x₂)",
      format: "text",
      highlight: true
    },
    {
      name: "discriminant",
      label: "Discriminant (Δ)",
      format: "number"
    },
    {
      name: "vertex",
      label: "Vertex Point (h, k)",
      format: "text"
    }
  ],
  calculate: calculateQuadraticFormulaCalculator
} as any;

export default quadratic_formula_calculatorConfig;
