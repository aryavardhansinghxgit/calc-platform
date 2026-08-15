import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBigNumberCalculator } from "./calculator";
import { BigNumberCalculator } from "@/components/calculator/big-number/BigNumberCalculator";
import { BigNumberContent } from "@/components/calculator/big-number/BigNumberContent";

export const big_number_calculatorConfig: CalculatorModuleDefinition = {
  id: "big-number-calculator",
  title: "Big Number Calculator — Arbitrary Precision Arithmetic",
  slug: "big-number-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Perform arbitrary-precision arithmetic (+, -, ×, /), modular exponentiation (A^B mod M), massive factorials (N!), trailing zero counts, Googology presets, and digit analytics for thousands of digits.",
  iconName: "PlusCircle",
  featured: true,
  keywords: [
    "Big Number Calculator",
    "Large Number Calculator",
    "Arbitrary Precision Calculator",
    "Large Factorial Calculator",
    "Googol Calculator",
    "Modular Exponentiation Calculator",
    "BigInt Calculator"
  ],
  priority: 1,
  relatedCalculators: ["scientific-notation-calculator", "scientific-calculator", "exponent-calculator"],
  formulaDescription: "Arbitrary-Precision BigInt Arithmetic",
  faqs: [],
  CustomComponent: BigNumberCalculator,
  ContentComponent: BigNumberContent,
  inputs: [
    {
      name: "num1",
      label: "Large Number 1",
      type: "text",
      defaultValue: "1000000000000000000000000000000"
    },
    {
      name: "operation",
      label: "Operator",
      type: "select",
      defaultValue: "*",
      options: [
        { label: "Addition (+)", value: "+" },
        { label: "Subtraction (-)", value: "-" },
        { label: "Multiplication (×)", value: "*" }
      ]
    },
    {
      name: "num2",
      label: "Large Number 2",
      type: "text",
      defaultValue: "98765432109876543210987654321"
    }
  ],
  outputs: [
    {
      name: "result",
      label: "Big Integer Result",
      format: "text",
      highlight: true
    },
    {
      name: "digitCount",
      label: "Digit Count",
      format: "number"
    }
  ],
  calculate: calculateBigNumberCalculator
} as any;

export default big_number_calculatorConfig;
