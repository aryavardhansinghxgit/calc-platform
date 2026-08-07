import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBigNumberCalculator } from "./calculator";
import { big_number_calculatorFaqs } from "./faq";

export const big_number_calculatorConfig: CalculatorModuleDefinition = {
  id: "big-number-calculator",
  title: "Big Number Calculator",
  slug: "big-number-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Perform arbitrary precision integer arithmetic on extremely large numbers.",
  iconName: "PlusCircle",
  featured: true,
  keywords: ["big number","large number calculator","bigint","arbitrary precision"],
  priority: 1,
  relatedCalculators: ["scientific-notation-calculator","scientific-calculator"],
  formulaDescription: "Arbitrary-Precision BigInt Arithmetic",
  faqs: big_number_calculatorFaqs,
  inputs: [
  {
    "name": "num1",
    "label": "Large Number 1",
    "type": "text",
    "defaultValue": "1234567890123456789"
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
      }
    ]
  },
  {
    "name": "num2",
    "label": "Large Number 2",
    "type": "text",
    "defaultValue": "9876543210987654321"
  }
],
  outputs: [
  {
    "name": "result",
    "label": "Big Integer Result",
    "format": "text",
    "highlight": true
  },
  {
    "name": "digitCount",
    "label": "Digit Count",
    "format": "number"
  }
],
  calculate: calculateBigNumberCalculator,
};

export default big_number_calculatorConfig;
