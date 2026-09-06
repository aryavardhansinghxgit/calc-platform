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
  description:
    "Free binary calculator for addition, subtraction, multiplication, division, modulo, AND, OR, XOR, NOT and shifts. Convert binary, decimal, hex and bases 2–36 with exact BigInt precision.",
  iconName: "Binary",
  featured: true,
  keywords: [
    "binary calculator",
    "binary calculator online",
    "binary arithmetic calculator",
    "binary addition calculator",
    "binary subtraction calculator",
    "binary multiplication calculator",
    "binary division calculator",
    "binary modulo calculator",
    "bitwise calculator",
    "bitwise AND OR XOR calculator",
    "binary shift calculator",
    "binary to decimal converter",
    "decimal to binary converter",
    "binary to hexadecimal converter",
    "binary to octal converter",
    "hexadecimal to binary converter",
    "base converter",
    "base 2 calculator",
    "base 16 calculator",
    "base 36 converter",
    "two's complement calculator",
    "signed binary calculator",
    "unsigned binary calculator",
    "binary number converter",
    "binary arithmetic with steps",
    "binary calculator with steps",
    "arbitrary precision binary calculator",
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
