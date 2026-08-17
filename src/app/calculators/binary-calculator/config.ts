import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBinaryCalculator } from "./calculator";
import { binary_calculatorFaqs } from "./faq";
import { BinaryCalculator } from "@/components/calculator/binary/BinaryCalculator";
import { BinaryContent } from "@/components/calculator/binary/BinaryContent";

export const binary_calculatorConfig: CalculatorModuleDefinition = {
  id: "binary-calculator",
  title: "Advanced Binary Calculator & Multi-Base Converter",
  slug: "binary-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Perform binary arithmetic (+, -, ×, ÷), bitwise operations (AND, OR, XOR, NOT, Shifts), 2's complement, and instant multi-base conversions.",
  iconName: "Binary",
  featured: true,
  keywords: [
    "binary calculator",
    "binary arithmetic calculator",
    "binary addition with steps",
    "binary to decimal converter",
    "2's complement calculator",
    "bitwise operation calculator",
    "binary subtraction",
    "hex to binary converter"
  ],
  priority: 1,
  relatedCalculators: ["hex-calculator", "ip-subnet-calculator", "scientific-calculator"],
  formulaDescription: "Executes binary arithmetic, 2's complement signed representation, and bitwise logic operations with column carry proofs.",
  faqs: binary_calculatorFaqs,
  inputs: [
    {
      name: "inputA",
      label: "Binary Input A",
      type: "text",
      defaultValue: "10101010"
    },
    {
      name: "inputB",
      label: "Binary Input B",
      type: "text",
      defaultValue: "00001111"
    }
  ],
  outputs: [
    {
      name: "binaryResult",
      label: "Binary Result",
      format: "text",
      highlight: true
    },
    {
      name: "decimalResult",
      label: "Decimal (Base-10)",
      format: "text"
    },
    {
      name: "hexResult",
      label: "Hexadecimal (Base-16)",
      format: "text"
    }
  ],
  calculate: calculateBinaryCalculator,
  CustomComponent: BinaryCalculator,
  ContentComponent: BinaryContent,
};

export default binary_calculatorConfig;
