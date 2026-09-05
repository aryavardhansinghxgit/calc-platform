import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateCircleCalculator } from "./calculator";
import { CircleCalculator } from "@/components/calculator/circle/CircleCalculator";
import { CircleContent } from "@/components/calculator/circle/CircleContent";

export const circle_calculatorConfig: CalculatorModuleDefinition = {
  id: "circle-calculator",
  title: "Circle Calculator: Area, Circumference, Radius & Diameter",
  slug: "circle-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate the radius, diameter, circumference and area of a circle from any known measurement. This free Circle Calculator also solves sector area, arc length, circular segment and sagitta, annulus area, circle equations, circumcircles and common circle-unit conversions with step-by-step formulas and visual diagrams.",
  iconName: "Circle",
  featured: true,
  keywords: ["circle calculator", "circumference calculator", "circle area", "arc length", "sector area", "chord sagitta", "circle equation"],
  priority: 1,
  relatedCalculators: ["area-calculator", "volume-calculator", "triangle-calculator", "distance-calculator", "pythagorean-theorem-calculator"],
  formulaDescription: "Area A = πr²; Circumference C = 2πr; Sector L = (θ/360)2πr",
  faqs: [],
  CustomComponent: CircleCalculator,
  ContentComponent: CircleContent,
  inputs: [
    {
      "name": "radius",
      "label": "Radius (r)",
      "type": "number",
      "defaultValue": 5,
      "min": 0.01,
      "max": 10000,
      "step": 0.5
    }
  ],
  outputs: [
    {
      "name": "area",
      "label": "Circle Area",
      "format": "number",
      "highlight": true
    },
    {
      "name": "circumference",
      "label": "Circumference",
      "format": "number"
    },
    {
      "name": "diameter",
      "label": "Diameter",
      "format": "number"
    }
  ],
  calculate: calculateCircleCalculator
};

export default circle_calculatorConfig;
