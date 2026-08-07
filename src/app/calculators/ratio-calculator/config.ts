import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateRatioCalculator } from "./calculator";
import { ratio_calculatorFaqs } from "./faq";

export const ratio_calculatorConfig: CalculatorModuleDefinition = {
  id: "ratio-calculator",
  title: "Ratio Calculator",
  slug: "ratio-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Solve ratio proportions (A : B = C : X) and simplify ratios into lowest terms.",
  iconName: "Scale",
  featured: true,
  keywords: ["ratio calculator","proportions","simplify ratio","ratio scale"],
  priority: 1,
  relatedCalculators: ["fraction-calculator","percentage-calculator"],
  formulaDescription: "A / B = C / X  =>  X = (B × C) / A",
  faqs: ratio_calculatorFaqs,
  inputs: [
  {
    "name": "valA",
    "label": "Value A",
    "type": "number",
    "defaultValue": 4,
    "min": 0.01,
    "max": 10000,
    "step": 1
  },
  {
    "name": "valB",
    "label": "Value B",
    "type": "number",
    "defaultValue": 16,
    "min": 0.01,
    "max": 10000,
    "step": 1
  },
  {
    "name": "valC",
    "label": "Value C",
    "type": "number",
    "defaultValue": 10,
    "min": 0.01,
    "max": 10000,
    "step": 1
  }
],
  outputs: [
  {
    "name": "valX",
    "label": "Solved Value X (A:B = C:X)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "simplifiedRatio",
    "label": "Simplified Ratio (A:B)",
    "format": "text"
  }
],
  calculate: calculateRatioCalculator,
};

export default ratio_calculatorConfig;
