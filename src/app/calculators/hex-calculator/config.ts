import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHexCalculator } from "./calculator";
import { hex_calculatorFaqs } from "./faq";

export const hex_calculatorConfig: CalculatorModuleDefinition = {
  id: "hex-calculator",
  title: "Hex Calculator",
  slug: "hex-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Perform hexadecimal addition, subtraction, and conversion between hex, binary, and decimal.",
  iconName: "Hash",
  featured: true,
  keywords: ["hex calculator","hexadecimal","base 16","hex to decimal"],
  priority: 1,
  relatedCalculators: ["binary-calculator","scientific-calculator"],
  formulaDescription: "Base-16 (Hexadecimal) Arithmetic & Conversion",
  faqs: hex_calculatorFaqs,
  inputs: [
  {
    "name": "hex1",
    "label": "Hex Number 1",
    "type": "text",
    "defaultValue": "1A"
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
    "name": "hex2",
    "label": "Hex Number 2",
    "type": "text",
    "defaultValue": "0F"
  }
],
  outputs: [
  {
    "name": "hexResult",
    "label": "Hexadecimal Result",
    "format": "text",
    "highlight": true
  },
  {
    "name": "decimalResult",
    "label": "Decimal Value",
    "format": "number"
  },
  {
    "name": "binaryResult",
    "label": "Binary Value",
    "format": "text"
  }
],
  calculate: calculateHexCalculator,
};

export default hex_calculatorConfig;
