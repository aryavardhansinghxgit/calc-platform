import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateCircleCalculator } from "./calculator";
import { circle_calculatorFaqs } from "./faq";

export const circle_calculatorConfig: CalculatorModuleDefinition = {
  id: "circle-calculator",
  title: "Circle Calculator",
  slug: "circle-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate circle radius, diameter, circumference, and area from any single known dimension.",
  iconName: "Circle",
  featured: true,
  keywords: ["circle calculator","circumference","circle area","radius","diameter"],
  priority: 1,
  relatedCalculators: ["area-calculator","volume-calculator"],
  formulaDescription: "Area = πr²; Circumference = 2πr; Diameter = 2r",
  faqs: circle_calculatorFaqs,
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
  calculate: calculateCircleCalculator,
};

export default circle_calculatorConfig;
