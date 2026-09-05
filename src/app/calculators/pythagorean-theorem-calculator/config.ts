import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePythagoreanTheoremCalculator } from "./calculator";
import { PythagoreanCalculator } from "@/components/calculator/pythagorean/PythagoreanCalculator";
import { PythagoreanContent } from "@/components/calculator/pythagorean/PythagoreanContent";
import { pythagorean_theorem_calculatorFaqs } from "./faq";

export const pythagorean_theorem_calculatorConfig: CalculatorModuleDefinition = {
  id: "pythagorean-theorem-calculator",
  title: "Pythagorean Theorem Calculator & Right Triangle Solver",
  slug: "pythagorean-theorem-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate a missing side of a right triangle instantly with the Pythagorean theorem: a² + b² = c². Enter any two known side lengths to solve for the third, or use the right-triangle side-and-angle solver when an acute angle is known. This calculator also provides triangle area, perimeter, altitude, exact radical results, 3D distance calculations, Pythagorean triples, and length-unit conversions.",
  iconName: "Triangle",
  featured: true,
  keywords: ["pythagorean theorem", "right triangle calculator", "hypotenuse calculator", "a2+b2=c2", "pythagorean triples", "right triangle solver"],
  priority: 1,
  relatedCalculators: ["right-triangle-calculator", "triangle-calculator", "distance-calculator", "area-calculator"],
  formulaDescription: "a² + b² = c²  =>  c = √(a² + b²)",
  faqs: pythagorean_theorem_calculatorFaqs,
  CustomComponent: PythagoreanCalculator,
  ContentComponent: PythagoreanContent,
  inputs: [
    {
      name: "sideA",
      label: "Side a",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 10000,
      step: 0.5
    },
    {
      name: "sideB",
      label: "Side b",
      type: "number",
      defaultValue: 4,
      min: 0,
      max: 10000,
      step: 0.5
    }
  ],
  outputs: [
    {
      name: "hypotenuseC",
      label: "Hypotenuse (c)",
      format: "number",
      highlight: true
    },
    {
      name: "area",
      label: "Right Triangle Area",
      format: "number"
    }
  ],
  calculate: calculatePythagoreanTheoremCalculator
};

export default pythagorean_theorem_calculatorConfig;
