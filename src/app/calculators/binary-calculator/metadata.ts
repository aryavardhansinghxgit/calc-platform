import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const binary_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Advanced Binary Calculator & Multi-Base Converter",
  description: "Free online Binary Calculator & Multi-Base Converter. Perform binary addition, subtraction, bitwise operations, 2's complement, and instant decimal/hex conversions.",
  slug: "binary-calculator",
});

export default binary_calculatorMetadata;
