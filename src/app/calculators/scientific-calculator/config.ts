import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateScientificCalculator } from "./calculator";
import { scientific_calculatorFaqs } from "./faq";

export const scientific_calculatorConfig: CalculatorModuleDefinition = {
  id: "scientific-calculator",
  title: "Scientific Calculator",
  slug: "scientific-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Perform advanced scientific calculations including trigonometry, logarithms, factorials, and exponents.",
  iconName: "Calculator",
  featured: true,
  keywords: ["scientific calculator","trigonometry","logarithm","sin cos tan","math solver"],
  priority: 1,
  relatedCalculators: ["exponent-calculator","log-calculator","root-calculator"],
  formulaDescription: "Scientific evaluation using standard mathematical & trigonometric functions.",
  faqs: scientific_calculatorFaqs,
  inputs: [
  {
    "name": "value1",
    "label": "First Number (X)",
    "type": "number",
    "defaultValue": 45,
    "min": -1000000000,
    "max": 1000000000,
    "step": 1
  },
  {
    "name": "operation",
    "label": "Operation",
    "type": "select",
    "defaultValue": "sin",
    "options": [
      {
        "label": "Sine (sin X)",
        "value": "sin"
      },
      {
        "label": "Cosine (cos X)",
        "value": "cos"
      },
      {
        "label": "Tangent (tan X)",
        "value": "tan"
      },
      {
        "label": "Natural Log (ln X)",
        "value": "ln"
      },
      {
        "label": "Square Root (√X)",
        "value": "sqrt"
      },
      {
        "label": "Factorial (X!)",
        "value": "factorial"
      }
    ]
  }
],
  outputs: [
  {
    "name": "result",
    "label": "Calculated Result",
    "format": "number",
    "highlight": true
  },
  {
    "name": "explanation",
    "label": "Operation Summary",
    "format": "text"
  }
],
  calculate: calculateScientificCalculator,
};

export default scientific_calculatorConfig;
