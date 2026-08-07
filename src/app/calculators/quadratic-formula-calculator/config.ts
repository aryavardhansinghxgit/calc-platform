import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateQuadraticFormulaCalculator } from "./calculator";
import { quadratic_formula_calculatorFaqs } from "./faq";

export const quadratic_formula_calculatorConfig: CalculatorModuleDefinition = {
  id: "quadratic-formula-calculator",
  title: "Quadratic Formula Calculator",
  slug: "quadratic-formula-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Solve quadratic equations ax² + bx + c = 0 and find real/complex roots and vertex points.",
  iconName: "Variable",
  featured: true,
  keywords: ["quadratic formula","quadratic equation","roots","discriminant","parabola vertex"],
  priority: 1,
  relatedCalculators: ["scientific-calculator","root-calculator"],
  formulaDescription: "x = (-b ± √(b² - 4ac)) / (2a)",
  faqs: quadratic_formula_calculatorFaqs,
  inputs: [
  {
    "name": "coeffA",
    "label": "Coefficient a",
    "type": "number",
    "defaultValue": 1,
    "min": -1000,
    "max": 1000,
    "step": 1
  },
  {
    "name": "coeffB",
    "label": "Coefficient b",
    "type": "number",
    "defaultValue": -5,
    "min": -1000,
    "max": 1000,
    "step": 1
  },
  {
    "name": "coeffC",
    "label": "Coefficient c",
    "type": "number",
    "defaultValue": 6,
    "min": -1000,
    "max": 1000,
    "step": 1
  }
],
  outputs: [
  {
    "name": "root1",
    "label": "Root x₁",
    "format": "text",
    "highlight": true
  },
  {
    "name": "root2",
    "label": "Root x₂",
    "format": "text"
  },
  {
    "name": "discriminant",
    "label": "Discriminant (Δ)",
    "format": "number"
  },
  {
    "name": "vertex",
    "label": "Parabola Vertex (h, k)",
    "format": "text"
  }
],
  calculate: calculateQuadraticFormulaCalculator,
};

export default quadratic_formula_calculatorConfig;
