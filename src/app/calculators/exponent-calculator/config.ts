import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateExponentCalculator } from "./calculator";
import { exponent_calculatorFaqs } from "./faq";

export const exponent_calculatorConfig: CalculatorModuleDefinition = {
  id: "exponent-calculator",
  title: "Exponent Calculator",
  slug: "exponent-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Calculate powers, exponents, and base numbers raised to negative or fractional powers.",
  iconName: "Superscript",
  featured: true,
  keywords: ["exponent calculator","power calculator","base power","scientific notation"],
  priority: 1,
  relatedCalculators: ["scientific-notation-calculator","log-calculator","root-calculator"],
  formulaDescription: "Result = Base ^ Exponent",
  faqs: exponent_calculatorFaqs,
  inputs: [
  {
    "name": "base",
    "label": "Base (b)",
    "type": "number",
    "defaultValue": 2,
    "min": -100,
    "max": 100,
    "step": 1
  },
  {
    "name": "exponent",
    "label": "Exponent (n)",
    "type": "number",
    "defaultValue": 10,
    "min": -50,
    "max": 50,
    "step": 1
  }
],
  outputs: [
  {
    "name": "result",
    "label": "Calculated Power (b^n)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "scientificNotation",
    "label": "Scientific Notation",
    "format": "text"
  }
],
  calculate: calculateExponentCalculator,
};

export default exponent_calculatorConfig;
