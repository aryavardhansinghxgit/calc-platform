import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBigNumberCalculator } from "./calculator";
import { BigNumberCalculator } from "@/components/calculator/big-number/BigNumberCalculator";
import { BigNumberContent } from "@/components/calculator/big-number/BigNumberContent";
import { big_number_calculatorFaqs } from "./faq";

export const big_number_calculatorConfig: CalculatorModuleDefinition = {
  id: "big-number-calculator",
  title: "Big Number Calculator — Arbitrary Precision Arithmetic",
  slug: "big-number-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Calculate huge integers exactly with arbitrary-precision arithmetic. Add, subtract, multiply, divide, modulo, powers, GCD, LCM, factorials, nPr, nCr and more.",
  iconName: "PlusCircle",
  featured: true,
  keywords: [
    "big number calculator",
    "arbitrary precision calculator",
    "large number calculator",
    "big integer calculator",
    "arbitrary precision arithmetic",
    "BigInt calculator",
    "large integer calculator",
    "big number multiplication",
    "big number addition",
    "big number division",
    "modular exponentiation calculator",
    "large factorial calculator",
    "nCr calculator",
    "nPr calculator",
    "GCD calculator for large numbers",
    "LCM calculator for large numbers",
    "large number primality test",
    "digit frequency calculator"
  ],
  priority: 1,
  relatedCalculators: [
    "scientific-notation-calculator",
    "factor-calculator",
    "permutation-combination-calculator",
    "gcf-calculator",
    "lcm-calculator"
  ],
  formulaDescription: "Arbitrary-Precision BigInt Arithmetic",
  faqs: big_number_calculatorFaqs,
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
