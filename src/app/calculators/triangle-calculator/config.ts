import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTriangleCalculator } from "./calculator";
import { triangle_calculatorFaqs } from "./faq";

export const triangle_calculatorConfig: CalculatorModuleDefinition = {
  id: "triangle-calculator",
  title: "Triangle Calculator",
  slug: "triangle-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate area, perimeter, side lengths, and internal angles of any triangle using Heron's formula.",
  iconName: "Triangle",
  featured: true,
  keywords: ["triangle calculator","triangle area","heron formula","triangle angles"],
  priority: 1,
  relatedCalculators: ["pythagorean-theorem-calculator","right-triangle-calculator","area-calculator"],
  formulaDescription: "Heron's Formula: Area = √[ s(s-a)(s-b)(s-c) ]",
  faqs: triangle_calculatorFaqs,
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
  calculate: calculateTriangleCalculator,
};

export default triangle_calculatorConfig;
