import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHexCalculator } from "./calculator";
import { hex_calculatorFaqs } from "./faq";
import { HexCalculator } from "@/components/calculator/hex/HexCalculator";
import { HexContent } from "@/components/calculator/hex/HexContent";

export const hex_calculatorConfig: CalculatorModuleDefinition = {
  id: "hex-calculator",
  title: "Hex Calculator | Advanced Hexadecimal Math, Bitwise & Converter",
  slug: "hex-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Advanced Hexadecimal Calculator & Converter. Perform hex arithmetic (+, -, ×, ÷), bitwise logic (AND, OR, XOR, NOT, Shifts), IEEE 754 float inspection, and multi-base live sync.",
  iconName: "Binary",
  featured: true,
  keywords: [
    "hex calculator",
    "hexadecimal calculator",
    "hex addition subtraction",
    "hex to decimal converter",
    "bitwise hex calculator",
    "ieee 754 float hex",
    "hex color converter"
  ],
  priority: 1,
  relatedCalculators: ["binary-calculator", "ip-subnet-calculator", "scientific-calculator"],
  formulaDescription: "Executes base-16 arithmetic, bitwise shifts, two's complement representation, and column carry proofs.",
  faqs: hex_calculatorFaqs,
  inputs: [
    {
      name: "inputA",
      label: "Hex Input A",
      type: "text",
      defaultValue: "8AB"
    },
    {
      name: "inputB",
      label: "Hex Input B",
      type: "text",
      defaultValue: "B78"
    }
  ],
  outputs: [
    {
      name: "hexResult",
      label: "Hexadecimal Result",
      format: "text",
      highlight: true
    },
    {
      name: "decimalResult",
      label: "Decimal (Base 10)",
      format: "text"
    },
    {
      name: "binaryResult",
      label: "Binary (Base 2)",
      format: "text"
    }
  ],
  calculate: calculateHexCalculator,
  CustomComponent: HexCalculator,
  ContentComponent: HexContent,
};

export default hex_calculatorConfig;
