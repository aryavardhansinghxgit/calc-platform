import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const hex_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Hex Calculator | Hexadecimal Math, Bitwise & Base Converter",
  description:
    "Free hex calculator for hexadecimal arithmetic, bitwise AND, OR, XOR, NOT and shifts. Convert hex to decimal, binary and octal with step-by-step results and 8–64-bit support.",
  slug: "hex-calculator",
});

export default hex_calculatorMetadata;
