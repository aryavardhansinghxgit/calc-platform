import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const hex_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Hex Calculator | Advanced Hexadecimal Math, Bitwise & Converter",
  description: "Free online Hex Calculator with step-by-step arithmetic, bitwise operations, IEEE 754 float inspection, and instant Hex-Dec-Bin conversion.",
  slug: "hex-calculator",
});

export default hex_calculatorMetadata;
