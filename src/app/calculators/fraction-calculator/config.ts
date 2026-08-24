import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateFractionCalculator } from "./calculator";
import { fraction_calculatorFaqs } from "./faq";
import { FractionCalculator } from "@/components/calculator/fraction/FractionCalculator";
import { FractionContent } from "@/components/calculator/fraction/FractionContent";

export const fraction_calculatorConfig: CalculatorModuleDefinition = {
  id: "fraction-calculator",
  title: "Fraction Calculator",
  slug: "fraction-calculator",
  category: "Math",
  subcategory: "General Math",
  description:
    "Calculate, simplify and convert fractions with step-by-step solutions for addition, subtraction, multiplication, division, mixed numbers, decimals and large-number fractions.",
  iconName: "Divide",
  featured: true,
  keywords: [
    "fraction calculator",
    "fractions calculator",
    "add fractions calculator",
    "subtract fractions calculator",
    "multiply fractions calculator",
    "divide fractions calculator",
    "simplify fractions",
    "fraction simplifier",
    "mixed number calculator",
    "decimal to fraction calculator",
    "fraction to decimal calculator",
    "improper fraction calculator",
    "fraction to decimal",
    "Big Number fraction calculator",
    "fraction solver",
  ],
  priority: 1,
  relatedCalculators: [
    "percentage-calculator",
    "ratio-calculator",
    "scientific-calculator",
    "percent-error-calculator",
    "exponent-calculator",
    "root-calculator",
    "pythagorean-theorem-calculator",
  ],
  formulaDescription:
    "a/b ± c/d = (ad ± bc) / bd; simplified via Greatest Common Divisor.",
  faqs: fraction_calculatorFaqs,
  ContentComponent: FractionContent,
  CustomComponent: FractionCalculator,
  inputs: [
    {
      name: "num1",
      label: "Numerator 1",
      type: "number",
      defaultValue: 2,
      min: -1000,
      max: 1000,
      step: 1,
    },
    {
      name: "den1",
      label: "Denominator 1",
      type: "number",
      defaultValue: 7,
      min: 1,
      max: 1000,
      step: 1,
    },
    {
      name: "operation",
      label: "Operator",
      type: "select",
      defaultValue: "+",
      options: [
        {
          label: "Addition (+)",
          value: "+",
        },
        {
          label: "Subtraction (-)",
          value: "-",
        },
        {
          label: "Multiplication (×)",
          value: "*",
        },
        {
          label: "Division (÷)",
          value: "/",
        },
      ],
    },
    {
      name: "num2",
      label: "Numerator 2",
      type: "number",
      defaultValue: 3,
      min: -1000,
      max: 1000,
      step: 1,
    },
    {
      name: "den2",
      label: "Denominator 2",
      type: "number",
      defaultValue: 8,
      min: 1,
      max: 1000,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "resultFraction",
      label: "Simplified Fraction",
      format: "text",
      highlight: true,
    },
    {
      name: "decimalValue",
      label: "Decimal Equivalent",
      format: "number",
    },
    {
      name: "mixedNumber",
      label: "Mixed Number",
      format: "text",
    },
  ],
  calculate: calculateFractionCalculator,
};

export default fraction_calculatorConfig;
