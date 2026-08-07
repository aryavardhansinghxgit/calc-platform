import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBinaryCalculator } from "./calculator";
import { binary_calculatorFaqs } from "./faq";

export const binary_calculatorConfig: CalculatorModuleDefinition = {
  id: "binary-calculator",
  title: "Binary Calculator",
  slug: "binary-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Perform binary arithmetic addition, subtraction, multiplication, and base conversions.",
  iconName: "Binary",
  featured: true,
  keywords: ["binary calculator","base 2","binary to decimal","binary arithmetic"],
  priority: 1,
  relatedCalculators: ["hex-calculator","scientific-calculator"],
  formulaDescription: "Base-2 (Binary) Arithmetic & Decimal Conversion",
  faqs: binary_calculatorFaqs,
  inputs: [
  {
    "name": "binary1",
    "label": "Binary Number 1",
    "type": "text",
    "defaultValue": "1010"
  },
  {
    "name": "operation",
    "label": "Operation",
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
      }
    ]
  },
  {
    "name": "binary2",
    "label": "Binary Number 2",
    "type": "text",
    "defaultValue": "0110"
  }
],
  outputs: [
  {
    "name": "binaryResult",
    "label": "Binary Result",
    "format": "text",
    "highlight": true
  },
  {
    "name": "decimalResult",
    "label": "Decimal Value",
    "format": "number"
  },
  {
    "name": "hexResult",
    "label": "Hexadecimal Value",
    "format": "text"
  }
],
  calculate: calculateBinaryCalculator,
};

export default binary_calculatorConfig;
