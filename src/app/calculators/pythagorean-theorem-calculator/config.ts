import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePythagoreanTheoremCalculator } from "./calculator";
import { PythagoreanCalculator } from "@/components/calculator/pythagorean/PythagoreanCalculator";
import { PythagoreanContent } from "@/components/calculator/pythagorean/PythagoreanContent";

export const pythagorean_theorem_calculatorConfig: CalculatorModuleDefinition = {
  id: "pythagorean-theorem-calculator",
  title: "Pythagorean Theorem Calculator & Right Triangle Suite",
  slug: "pythagorean-theorem-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Solve missing side lengths a, b, or c in right-angled triangles using a² + b² = c² with exact radical simplification, 3D distance, and triple generators.",
  iconName: "Triangle",
  featured: true,
  keywords: ["pythagorean theorem", "right triangle calculator", "hypotenuse calculator", "a2+b2=c2", "pythagorean triples"],
  priority: 1,
  relatedCalculators: ["right-triangle-calculator", "triangle-calculator", "distance-calculator"],
  formulaDescription: "a² + b² = c²  =>  c = √(a² + b²)",
  faqs: [],
  CustomComponent: PythagoreanCalculator,
  ContentComponent: PythagoreanContent,
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
  calculate: calculatePythagoreanTheoremCalculator
};

export default pythagorean_theorem_calculatorConfig;
