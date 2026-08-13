import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateFractionCalculator } from "./calculator";
import { FractionCalculator } from "@/components/calculator/fraction/FractionCalculator";
import { FractionContent } from "@/components/calculator/fraction/FractionContent";

export const fraction_calculatorConfig: CalculatorModuleDefinition = {
  id: "fraction-calculator",
  title: "Fraction Calculator",
  slug: "fraction-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Add, subtract, multiply, and divide fractions with step-by-step reduction, mixed numbers, SVG visualizers, and BigInt precision.",
  iconName: "Divide",
  featured: true,
  keywords: ["fraction calculator","fractions","add fractions","simplify fraction","mixed numbers","decimal to fraction","big number fraction"],
  priority: 1,
  relatedCalculators: ["ratio-calculator","percentage-calculator","scientific-calculator"],
  formulaDescription: "a/b ± c/d = (ad ± bc) / bd; simplified via Greatest Common Divisor.",
  ContentComponent: FractionContent,
  CustomComponent: FractionCalculator,
  inputs: [
  {
    "name": "num1",
    "label": "Numerator 1",
    "type": "number",
    "defaultValue": 3,
    "min": -1000,
    "max": 1000,
    "step": 1
  },
  {
    "name": "den1",
    "label": "Denominator 1",
    "type": "number",
    "defaultValue": 4,
    "min": 1,
    "max": 1000,
    "step": 1
  },
  {
    "name": "operation",
    "label": "Operator",
    "type": "select",
    "defaultValue": "+",
    "options": [
      {
        "label": "Addition (+)",
        "value": "+"
      },
      {
        "label": "Subtraction (-)",
        "value": "-"
      },
      {
        "label": "Multiplication (×)",
        "value": "*"
      },
      {
        "label": "Division (÷)",
        "value": "/"
      }
    ]
  },
  {
    "name": "num2",
    "label": "Numerator 2",
    "type": "number",
    "defaultValue": 1,
    "min": -1000,
    "max": 1000,
    "step": 1
  },
  {
    "name": "den2",
    "label": "Denominator 2",
    "type": "number",
    "defaultValue": 2,
    "min": 1,
    "max": 1000,
    "step": 1
  }
],
  outputs: [
  {
    "name": "resultFraction",
    "label": "Simplified Fraction",
    "format": "text",
    "highlight": true
  },
  {
    "name": "decimalValue",
    "label": "Decimal Equivalent",
    "format": "number"
  },
  {
    "name": "mixedNumber",
    "label": "Mixed Number",
    "format": "text"
  }
],
  calculate: calculateFractionCalculator,
};

export default fraction_calculatorConfig;
