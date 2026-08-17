import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTriangleCalculator } from "./calculator";
import { TriangleCalculator } from "@/components/calculator/triangle/TriangleCalculator";
import { TriangleContent } from "@/components/calculator/triangle/TriangleContent";

export const triangle_calculatorConfig: CalculatorModuleDefinition = {
  id: "triangle-calculator",
  title: "Triangle Calculator & Trigonometric Solver Suite",
  slug: "triangle-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate sides, angles, area, perimeter, altitudes, medians, inradius (r), circumradius (R), and SSA ambiguous cases with interactive scale-accurate vector diagrams.",
  iconName: "Triangle",
  featured: true,
  keywords: ["triangle calculator", "triangle area", "law of sines", "law of cosines", "heron formula", "inradius", "circumradius", "pythagorean theorem"],
  priority: 1,
  relatedCalculators: ["pythagorean-theorem-calculator", "right-triangle-calculator", "area-calculator"],
  formulaDescription: "Law of Cosines: c² = a² + b² - 2ab cos(C); Heron's Formula: Area = √[ s(s-a)(s-b)(s-c) ]",
  faqs: [],
  CustomComponent: TriangleCalculator,
  ContentComponent: TriangleContent,
  inputs: [
    {
      "name": "sideA",
      "label": "Side a",
      "type": "number",
      "defaultValue": 3,
      "min": 0.1,
      "max": 10000,
      "step": 0.5
    },
    {
      "name": "sideB",
      "label": "Side b",
      "type": "number",
      "defaultValue": 4,
      "min": 0.1,
      "max": 10000,
      "step": 0.5
    },
    {
      "name": "sideC",
      "label": "Side c",
      "type": "number",
      "defaultValue": 5,
      "min": 0.1,
      "max": 10000,
      "step": 0.5
    }
  ],
  outputs: [
    {
      "name": "area",
      "label": "Triangle Area",
      "format": "number",
      "highlight": true
    },
    {
      "name": "perimeter",
      "label": "Perimeter",
      "format": "number"
    },
    {
      "name": "angleA",
      "label": "Angle A",
      "format": "number",
      "unit": "°"
    }
  ],
  calculate: calculateTriangleCalculator
};

export default triangle_calculatorConfig;
