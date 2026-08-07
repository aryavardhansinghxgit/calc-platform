import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateSquareFootageCalculator } from "./calculator";
import { square_footage_calculatorFaqs } from "./faq";

export const square_footage_calculatorConfig: CalculatorModuleDefinition = {
  id: "square-footage-calculator",
  title: "Square Footage Calculator",
  slug: "square-footage-calculator",
  category: "construction",
  subcategory: "Housing / Building",
  description: "Calculate total floor, wall, or land square footage and estimated material costs.",
  iconName: "Box",
  featured: true,
  keywords: ["square footage","sq ft calculator","area calculator","floor space"],
  priority: 1,
  relatedCalculators: ["tile-calculator","roofing-calculator"],
  formulaDescription: "Square Feet = Length (ft) × Width (ft)",
  faqs: square_footage_calculatorFaqs,
  inputs: [
  {
    "name": "lengthFt",
    "label": "Length (feet)",
    "type": "number",
    "defaultValue": 12,
    "min": 0.1,
    "max": 1000,
    "step": 0.5
  },
  {
    "name": "widthFt",
    "label": "Width (feet)",
    "type": "number",
    "defaultValue": 15,
    "min": 0.1,
    "max": 1000,
    "step": 0.5
  },
  {
    "name": "pricePerSqFt",
    "label": "Price per Sq Ft ($)",
    "type": "number",
    "defaultValue": 5,
    "min": 0,
    "max": 500,
    "step": 0.5
  }
],
  outputs: [
  {
    "name": "squareFeet",
    "label": "Total Area (Sq Ft)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "squareMeters",
    "label": "Area in Sq Meters",
    "format": "number"
  },
  {
    "name": "totalCost",
    "label": "Estimated Material Cost",
    "format": "currency"
  }
],
  calculate: calculateSquareFootageCalculator,
};

export default square_footage_calculatorConfig;
