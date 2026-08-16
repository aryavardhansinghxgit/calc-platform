import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateRightTriangleCalculator } from "./calculator";
import { RightTriangleCalculator } from "@/components/calculator/right-triangle/RightTriangleCalculator";
import { RightTriangleContent } from "@/components/calculator/right-triangle/RightTriangleContent";

export const right_triangle_calculatorConfig: CalculatorModuleDefinition = {
  id: "right-triangle-calculator",
  title: "Right Triangle Calculator & Trigonometric Solver Suite",
  slug: "right-triangle-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate sides, angles, area, perimeter, altitude, and 6 trigonometric ratios for right-angled triangles.",
  iconName: "Triangle",
  featured: true,
  keywords: ["right triangle calculator", "trigonometry calculator", "sine cosine tangent", "hypotenuse calculator", "soh cah toa"],
  priority: 1,
  relatedCalculators: ["pythagorean-theorem-calculator", "triangle-calculator", "distance-calculator"],
  formulaDescription: "c = √(a² + b²); α = arctan(a/b); β = 90° - α",
  faqs: [],
  CustomComponent: RightTriangleCalculator,
  ContentComponent: RightTriangleContent,
  inputs: [
    {
      "name": "sideA",
      "label": "Leg a",
      "type": "number",
      "defaultValue": 5,
      "min": 0.1,
      "max": 10000,
      "step": 0.5
    },
    {
      "name": "sideB",
      "label": "Leg b",
      "type": "number",
      "defaultValue": 12,
      "min": 0.1,
      "max": 10000,
      "step": 0.5
    }
  ],
  outputs: [
    {
      "name": "hypotenuseC",
      "label": "Hypotenuse c",
      "format": "number",
      "highlight": true
    },
    {
      "name": "angleA",
      "label": "Angle α",
      "format": "number",
      "unit": "°"
    },
    {
      "name": "angleB",
      "label": "Angle β",
      "format": "number",
      "unit": "°"
    },
    {
      "name": "area",
      "label": "Area",
      "format": "number"
    }
  ],
  calculate: calculateRightTriangleCalculator
};

export default right_triangle_calculatorConfig;
