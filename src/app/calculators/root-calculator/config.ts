import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateRootCalculator } from "./calculator";
import { root_calculatorFaqs } from "./faq";

export const root_calculatorConfig: CalculatorModuleDefinition = {
  id: "root-calculator",
  title: "Root Calculator",
  slug: "root-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Calculate square roots, cube roots, and nth roots for any real positive number.",
  iconName: "Radical",
  featured: true,
  keywords: ["root calculator","square root","cube root","nth root","radical"],
  priority: 1,
  relatedCalculators: ["exponent-calculator","scientific-calculator"],
  formulaDescription: "ⁿ√X = X^(1/n)",
  faqs: root_calculatorFaqs,
  inputs: [
  {
    "name": "value",
    "label": "Radicand (X)",
    "type": "number",
    "defaultValue": 64,
    "min": 0,
    "max": 1000000000,
    "step": 1
  },
  {
    "name": "degree",
    "label": "Root Degree (n)",
    "type": "number",
    "defaultValue": 3,
    "min": 1,
    "max": 100,
    "step": 1
  }
],
  outputs: [
  {
    "name": "rootResult",
    "label": "nth Root Result (ⁿ√X)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "squareRoot",
    "label": "Square Root (√X)",
    "format": "number"
  }
],
  calculate: calculateRootCalculator,
};

export default root_calculatorConfig;
