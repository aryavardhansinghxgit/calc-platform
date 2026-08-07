import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePythagoreanTheoremCalculator } from "./calculator";
import { pythagorean_theorem_calculatorFaqs } from "./faq";

export const pythagorean_theorem_calculatorConfig: CalculatorModuleDefinition = {
  id: "pythagorean-theorem-calculator",
  title: "Pythagorean Theorem Calculator",
  slug: "pythagorean-theorem-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Solve missing side lengths a, b, or c in right-angled triangles using a² + b² = c².",
  iconName: "Triangle",
  featured: true,
  keywords: ["pythagorean theorem","right triangle","hypotenuse","a2+b2=c2"],
  priority: 1,
  relatedCalculators: ["right-triangle-calculator","triangle-calculator"],
  formulaDescription: "a² + b² = c²  =>  c = √(a² + b²)",
  faqs: pythagorean_theorem_calculatorFaqs,
  inputs: [
  {
    "name": "sideA",
    "label": "Side a",
    "type": "number",
    "defaultValue": 3,
    "min": 0,
    "max": 10000,
    "step": 0.5
  },
  {
    "name": "sideB",
    "label": "Side b",
    "type": "number",
    "defaultValue": 4,
    "min": 0,
    "max": 10000,
    "step": 0.5
  }
],
  outputs: [
  {
    "name": "hypotenuseC",
    "label": "Hypotenuse (c)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "area",
    "label": "Right Triangle Area",
    "format": "number"
  }
],
  calculate: calculatePythagoreanTheoremCalculator,
};

export default pythagorean_theorem_calculatorConfig;
