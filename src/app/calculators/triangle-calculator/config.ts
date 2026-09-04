import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTriangleCalculator } from "./calculator";
import { TriangleCalculator } from "@/components/calculator/triangle/TriangleCalculator";
import { TriangleContent } from "@/components/calculator/triangle/TriangleContent";
import { triangleFaqs } from "./faq";

export const triangle_calculatorConfig: CalculatorModuleDefinition = {
  id: "triangle-calculator",
  title: "Triangle Calculator — Solve Sides, Angles, Area & More",
  slug: "triangle-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Solve a triangle from known sides or angles. Calculate missing sides, angles, area, perimeter, altitudes, medians, inradius and circumradius step by step.",
  iconName: "Triangle",
  featured: true,
  keywords: ["triangle calculator", "triangle solver", "solve a triangle", "find missing side of a triangle", "find missing angle of a triangle", "triangle area calculator", "triangle perimeter calculator", "Heron's formula calculator", "right triangle calculator", "inradius calculator", "circumradius calculator", "Law of Sines", "Law of Cosines"],
  priority: 1,
  relatedCalculators: ["pythagorean-theorem-calculator", "right-triangle-calculator", "area-calculator"],
  formulaDescription: "Law of Cosines: c² = a² + b² - 2ab cos(C); Heron's Formula: Area = √[ s(s-a)(s-b)(s-c) ]",
  faqs: triangleFaqs,
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
